import { Bell, Sun, Moon,Mail, } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import UserProfile from "./UserProfile"

const HeaderRightSection = () => {
	const [darkMode, setDarkMode] = useState(false)
	const [showNotifications, setShowNotifications] = useState(false)
	const [showProfile, setShowProfile] = useState(false)
	
	const notificationsRef = useRef<HTMLDivElement>(null)
	const profileRef = useRef<HTMLDivElement>(null)

	const notifications = [
		{ id: 1, title: "New student enrollment", time: "5 min ago", type: "info", unread: true },
		{ id: 2, title: "Payment received", time: "1 hour ago", type: "success", unread: true },
		{ id: 3, title: "Staff meeting reminder", time: "2 hours ago", type: "warning", unread: true },
		{ id: 4, title: "Report generated", time: "Yesterday", type: "info", unread: false },
		{ id: 5, title: "System update available", time: "2 days ago", type: "info", unread: false },
	]

	const unreadCount = notifications.filter(n => n.unread).length

	// Get user initials for avatar
	
	

	// Close dropdowns when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
				setShowNotifications(false)
			}
			if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
				setShowProfile(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	// Get current date formatted
	

	return (
		<div className="flex items-center gap-3">
			
			

			{/* Theme Toggle */}
			<button
				onClick={() => setDarkMode(!darkMode)}
				className="p-3 hover:bg-gray-100 rounded-xl transition-all group relative overflow-hidden"
				title="Toggle theme"
			>
				<div className="relative z-10">
					{darkMode ? (
						<Sun className="w-5 h-5 text-gray-600 group-hover:text-yellow-600 transition-colors" />
					) : (
						<Moon className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
					)}
				</div>
			</button>

			{/* Messages */}
			<button className="p-3 hover:bg-gray-100 rounded-xl transition-all group relative" title="Messages">
				<Mail className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-colors" />
				<span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
					5
				</span>
			</button>

			{/* Notifications */}
			<div className="relative" ref={notificationsRef}>
				<button
					onClick={() => setShowNotifications(!showNotifications)}
					className="p-3 hover:bg-gray-100 rounded-xl transition-all group relative"
					title="Notifications"
				>
					<Bell className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-colors" />
					{unreadCount > 0 && (
						<span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
							{unreadCount}
						</span>
					)}
				</button>

				{showNotifications && (
					<div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50">
						<div className="p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-green-50">
							<div className="flex items-center justify-between mb-2">
								<h3 className="font-bold text-gray-800">Notifications</h3>
								<span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg">
									{unreadCount} new
								</span>
							</div>
							<div className="flex gap-2">
								<button className="px-3 py-1 bg-white text-xs font-medium rounded-lg hover:bg-emerald-50 transition-all">
									All
								</button>
								<button className="px-3 py-1 text-xs font-medium text-gray-600 rounded-lg hover:bg-white transition-all">
									Unread
								</button>
								<button className="px-3 py-1 text-xs font-medium text-gray-600 rounded-lg hover:bg-white transition-all">
									Important
								</button>
							</div>
						</div>

						<div className="max-h-96 overflow-y-auto">
							{notifications.map((notif) => (
								<div
									key={notif.id}
									className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-all cursor-pointer ${notif.unread ? 'bg-emerald-50/50' : ''
										}`}
								>
									<div className="flex items-start gap-3">
										<div className={`w-2 h-2 rounded-full mt-2 ${notif.unread ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
										<div className="flex-1">
											<p className={`text-sm ${notif.unread ? 'font-semibold text-gray-800' : 'text-gray-700'}`}>
												{notif.title}
											</p>
											<p className="text-xs text-gray-500 mt-1">{notif.time}</p>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="p-3 border-t border-gray-100 bg-gray-50">
							<button className="w-full py-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-all">
								View All Notifications
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Divider */}
			<div className="w-px h-8 bg-gray-200"></div>

			<UserProfile />
			
		</div>
	)
}

export default HeaderRightSection