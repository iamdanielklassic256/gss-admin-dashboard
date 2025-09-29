import { Bell, Search, User, Menu, Sun, Moon, Settings, LogOut, HelpCircle, Sparkles, ChevronDown, Calendar, Mail, Activity } from "lucide-react"
import { useState } from "react"

export default function DashboardHeader() {
  const [darkMode, setDarkMode] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  const notifications = [
    { id: 1, title: "New student enrollment", time: "5 min ago", type: "info", unread: true },
    { id: 2, title: "Payment received", time: "1 hour ago", type: "success", unread: true },
    { id: 3, title: "Staff meeting reminder", time: "2 hours ago", type: "warning", unread: true },
    { id: 4, title: "Report generated", time: "Yesterday", type: "info", unread: false },
    { id: 5, title: "System update available", time: "2 days ago", type: "info", unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm backdrop-blur-sm flex-shrink-0">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Search */}
        <div className="flex items-center gap-4 flex-1">
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-all">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="relative max-w-xl w-full">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all ${searchFocused ? 'text-emerald-600' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search students, staff, courses, events..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-full pl-12 pr-4 py-3 bg-gray-50 border-2 rounded-2xl text-sm transition-all ${
                searchFocused 
                  ? 'border-emerald-500 bg-white shadow-lg shadow-emerald-500/10' 
                  : 'border-transparent hover:bg-gray-100'
              } focus:outline-none`}
            />
            {searchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-3 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Searches</p>
                </div>
                <div className="p-2">
                  {['John Smith', 'Finance Reports', 'Math Department'].map((item, idx) => (
                    <button key={idx} className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-all group">
                      <div className="flex items-center gap-3">
                        <Search className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="text-xs text-gray-500">Active Now</p>
                <p className="text-sm font-bold text-gray-800">234</p>
              </div>
            </div>
            <div className="w-px h-8 bg-emerald-200"></div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="text-xs text-gray-500">Today</p>
                <p className="text-sm font-bold text-gray-800">Mon, Sep 29</p>
              </div>
            </div>
          </div>

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
          <div className="relative">
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
              <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
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
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-all cursor-pointer ${
                        notif.unread ? 'bg-emerald-50/50' : ''
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

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 p-2 pr-4 hover:bg-gray-100 rounded-xl transition-all group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  JD
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                  John Doe
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
            </button>

            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
                {/* Profile Header */}
                <div className="p-6 bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                      JD
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">John Doe</h3>
                      <p className="text-sm text-white/80">admin@school.edu</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-3">
                      <p className="text-xs text-white/80">Role</p>
                      <p className="font-semibold text-sm">Admin</p>
                    </div>
                    <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-3">
                      <p className="text-xs text-white/80">Status</p>
                      <p className="font-semibold text-sm">Active</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-all group">
                    <User className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />
                    <span className="text-sm font-medium text-gray-700">My Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-all group">
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
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl transition-all group">
                    <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}