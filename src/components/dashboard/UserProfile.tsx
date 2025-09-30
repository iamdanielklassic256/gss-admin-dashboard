import {  User,  Settings, LogOut, HelpCircle, Sparkles, ChevronDown } from "lucide-react"
import { useState, useRef } from "react"
import { useAuthStore } from "@/stores/authStore"
import { useNavigate } from "react-router-dom"

const UserProfile = () => {
	const [showProfile, setShowProfile] = useState(false)
	const { user, logout } = useAuthStore()
	const navigate = useNavigate()
	const profileRef = useRef<HTMLDivElement>(null)

const getUserInitials = () => {
		if (!user?.name) return "AD"
		return user.name
			.split(' ')
			.map(word => word[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)
	}

	// Handle logout
	const handleLogout = () => {
		logout()
		setShowProfile(false)
		navigate('/auth/sign-in')
	}

	// Handle profile navigation
	const handleProfileClick = () => {
		setShowProfile(false)
		// Navigate to profile page - update the path as needed
		navigate('/profile')
	}

	// Handle settings navigation
	const handleSettingsClick = () => {
		setShowProfile(false)
		// Navigate to settings page - update the path as needed
		navigate('/settings')
	}

	

	// Get current date formatted
	
	return (
		<div className="relative" ref={profileRef}>
			<button
				onClick={() => setShowProfile(!showProfile)}
				className="flex items-center gap-3 p-2 pr-4 hover:bg-gray-100 rounded-xl transition-all group"
			>
				<div className="relative">
					<div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
						{getUserInitials()}
					</div>
					<div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
				</div>
				<div className="hidden md:block text-left">
					<p className="text-sm font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
						{user?.name || 'Admin'}
					</p>
					<p className="text-xs text-gray-500">{user?.role || 'Administrator'}</p>
				</div>
				<ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
			</button>

			{showProfile && (
				<div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50">
					{/* Profile Header */}
					<div className="p-6 bg-gradient-to-br from-emerald-500 to-green-600 text-white">
						<div className="flex items-center gap-4 mb-4">
							<div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
								{getUserInitials()}
							</div>
							<div>
								<h3 className="font-bold text-lg">{user?.name || 'Admin User'}</h3>
								<p className="text-sm text-white/80">{user?.email || 'admin@school.edu'}</p>
							</div>
						</div>
						<div className="flex gap-2">
							<div className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-3">
								<p className="text-xs text-white/80">Role</p>
								<p className="font-semibold text-sm">{user?.role || 'Admin'}</p>
							</div>
							<div className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-3">
								<p className="text-xs text-white/80">Status</p>
								<p className="font-semibold text-sm">Active</p>
							</div>
						</div>
					</div>

					{/* Menu Items */}
					<div className="p-2">
						<button
							onClick={handleProfileClick}
							className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-all group"
						>
							<User className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />
							<span className="text-sm font-medium text-gray-700">My Profile</span>
						</button>
						<button
							onClick={handleSettingsClick}
							className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-all group"
						>
							<Settings className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />
							<span className="text-sm font-medium text-gray-700">Settings</span>
						</button>
						<button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-all group">
							<HelpCircle className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />
							<span className="text-sm font-medium text-gray-700">Help & Support</span>
						</button>
					</div>

					{/* Upgrade Section */}
					<div className="mx-2 mb-2 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
						<div className="flex items-center gap-2 mb-2">
							<Sparkles className="w-4 h-4 text-amber-600" />
							<span className="text-xs font-bold text-amber-900">Premium Feature</span>
						</div>
						<p className="text-xs text-gray-600 mb-3">Upgrade to unlock advanced analytics</p>
						<button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-lg text-xs font-bold hover:shadow-lg transition-all">
							Upgrade Now
						</button>
					</div>

					{/* Logout */}
					<div className="p-2 border-t border-gray-100">
						<button
							onClick={handleLogout}
							className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl transition-all group"
						>
							<LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
							<span className="text-sm font-medium text-gray-700 group-hover:text-red-600">Logout</span>
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default UserProfile