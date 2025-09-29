import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardSidebar from "./DashboardSidebar"
import DashboardHeader from "./DashboardHeader"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-0 h-screen z-50">
          <DashboardSidebar />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ml-0 transition-all duration-300 md:ml-80">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}