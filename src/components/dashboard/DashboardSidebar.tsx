import {
  BarChart3,
  Users,
  GraduationCap,
  Calendar,
  FileText,
  Settings,
  BookOpen,
  DollarSign,
  UserCheck,
  Bell,
  Home,
  MessageSquare
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    description: "Overview & Analytics"
  },
  {
    title: "Students",
    url: "/students",
    icon: Users,
    description: "Student Management"
  },
  {
    title: "Staff",
    url: "/staff",
    icon: UserCheck,
    description: "Faculty & Staff"
  },
  {
    title: "Academics",
    url: "/academics",
    icon: BookOpen,
    description: "Courses & Curriculum"
  },
  {
    title: "Admissions",
    url: "/admissions",
    icon: GraduationCap,
    description: "Applications & Enrollment"
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
    description: "Calendar & Events"
  },
  {
    title: "Finance",
    url: "/finance",
    icon: DollarSign,
    description: "Fees & Payments"
  },
  {
    title: "Communications",
    url: "/communications",
    icon: MessageSquare,
    description: "News & Announcements"
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
    description: "Analytics & Reports"
  },
]

const systemItems = [
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
    description: "System Alerts"
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    description: "System Configuration"
  },
]

export function DashboardSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isCollapsed = state === "collapsed"
  const isActive = (path: string) => currentPath === path

  const getNavClasses = (path: string) => cn(
    "w-full justify-start gap-3 transition-all duration-200",
    "hover:bg-dashboard-nav-hover hover:text-dashboard-nav-foreground",
    isActive(path) 
      ? "bg-dashboard-nav-active text-dashboard-nav-foreground font-medium shadow-sm" 
      : "text-dashboard-nav-foreground/70"
  )

  return (
    <Sidebar className="border-r border-border/40 bg-dashboard-nav">
      <SidebarHeader className="border-b border-dashboard-nav-hover/50 p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-semibold text-dashboard-nav-foreground">
                SchoolHub
              </h1>
              <p className="text-sm text-dashboard-nav-foreground/60">
                Admin Dashboard
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-dashboard-nav-foreground/50 text-xs uppercase tracking-wider mb-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink 
                      to={item.url} 
                      className={getNavClasses(item.url)}
                    >
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && (
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs opacity-60">{item.description}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-dashboard-nav-foreground/50 text-xs uppercase tracking-wider mb-2">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink 
                      to={item.url} 
                      className={getNavClasses(item.url)}
                    >
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && (
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs opacity-60">{item.description}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}