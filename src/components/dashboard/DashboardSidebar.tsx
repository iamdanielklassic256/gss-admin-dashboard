import {
  BarChart3,
  Users,
  GraduationCap,
  Calendar,
  FileText,
  BookOpen,
  DollarSign,
  UserCheck,
  Bell,
  Home,
  MessageSquare,
  ChevronDown,
  Search,
} from "lucide-react"
import { useState } from "react"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    description: "Overview & Analytics",
    badge: null,
    color: "emerald"
  },
  {
    title: "Students",
    url: "/students",
    icon: Users,
    description: "Student Management",
    badge: "1,234",
    color: "blue"
  },
  {
    title: "Staff",
    url: "/staff",
    icon: UserCheck,
    description: "Faculty & Staff",
    badge: "89",
    color: "purple"
  },
  {
    title: "Academics",
    url: "/academics",
    icon: BookOpen,
    description: "Courses & Curriculum",
    badge: null,
    color: "orange"
  },
  {
    title: "Admissions",
    url: "/admissions",
    icon: GraduationCap,
    description: "Applications & Enrollment",
    badge: "23",
    color: "pink"
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
    description: "Calendar & Events",
    badge: "5",
    color: "indigo"
  },
  {
    title: "Finance",
    url: "/finance",
    icon: DollarSign,
    description: "Fees & Payments",
    badge: null,
    color: "green"
  },
  {
    title: "Communications",
    url: "/communications",
    icon: MessageSquare,
    description: "News & Announcements",
    badge: "12",
    color: "cyan"
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
    description: "Analytics & Reports",
    badge: null,
    color: "slate"
  },
]

const systemItems = [
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
    description: "System Alerts",
    badge: "8"
  },
]

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [currentPath, setCurrentPath] = useState("/")
  const [searchQuery, setSearchQuery] = useState("")

  const isActive = (path: any) => currentPath === path

  const handleNavClick = (path: any) => {
    setCurrentPath(path)
  }

  const filteredMenuItems = menuItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isCollapsed ? 'w-20' : 'w-80'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-xl flex-shrink-0`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                <BarChart3 className="w-7 h-7 text-white relative z-10" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    SchoolHub
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">
                    Admin Dashboard Pro
                  </p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 flex items-center justify-center transition-all"
              >
                <ChevronDown className="w-4 h-4 rotate-90" />
              </button>
            )}
          </div>

          {/* Search Bar */}
          {!isCollapsed && (
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Main Menu */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3 px-3">
              <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Main Menu
              </h3>
            </div>
            <nav className="space-y-1">
              {filteredMenuItems.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleNavClick(item.url)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                    isActive(item.url)
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                      : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  {isActive(item.url) && (
                    <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                  )}
                  <item.icon className={`w-5 h-5 relative z-10 ${isActive(item.url) ? 'text-white' : 'text-gray-500 group-hover:text-emerald-600'} transition-all group-hover:scale-110`} />
                  {!isCollapsed && (
                    <>
                      <div className="flex-1 text-left relative z-10">
                        <div className="font-semibold text-sm">{item.title}</div>
                        <div className={`text-xs ${isActive(item.url) ? 'text-white/80' : 'text-gray-500'}`}>
                          {item.description}
                        </div>
                      </div>
                      {item.badge && (
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold relative z-10 ${
                          isActive(item.url)
                            ? 'bg-white/20 text-white'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* System Items */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-3">
              <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                System
              </h3>
            </div>
            <nav className="space-y-1">
              {systemItems.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleNavClick(item.url)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive(item.url)
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  <item.icon className="w-5 h-5 transition-all group-hover:scale-110" />
                  {!isCollapsed && (
                    <>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-sm">{item.title}</div>
                        <div className={`text-xs ${isActive(item.url) ? 'text-white/80' : 'text-gray-500'}`}>
                          {item.description}
                        </div>
                      </div>
                      {item.badge && (
                        <span className="px-2.5 py-1 bg-red-500 text-white rounded-lg text-xs font-bold animate-pulse">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          {!isCollapsed ? (
            <>
              {/* Footer content when expanded */}
            </>
          ) : (
            <button
              onClick={() => setIsCollapsed(false)}
              className="w-full flex items-center justify-center p-3 rounded-xl hover:bg-gray-100 transition-all"
            >
              <ChevronDown className="w-5 h-5 text-gray-600 -rotate-90" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}