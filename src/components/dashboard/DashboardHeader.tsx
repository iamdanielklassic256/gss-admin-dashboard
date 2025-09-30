import {  Menu, } from "lucide-react"
import HeaderRightSection from "./HeaderRightSection"

export default function DashboardHeader() {
  

 

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm backdrop-blur-sm flex-shrink-0">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Search */}
        <div className="flex items-center gap-4 flex-1">
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-all">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          
        </div>

        <HeaderRightSection />
        
      </div>
    </header>
  )
}