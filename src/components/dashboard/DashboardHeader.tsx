import { Search,  Menu, } from "lucide-react"
import { useState } from "react"
import HeaderRightSection from "./HeaderRightSection"

export default function DashboardHeader() {
  
  const [searchFocused, setSearchFocused] = useState(false)

 

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

        <HeaderRightSection />
        
      </div>
    </header>
  )
}