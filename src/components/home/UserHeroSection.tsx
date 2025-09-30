import { 
  Calendar,
  TrendingUp,
  Eye,
  Download,
  User
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/stores/authStore"

const UserHeroSection = () => {
  const { user, } = useAuthStore()


  console.log('userrrrr',user)
  
  // Get current date formatted
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const handleExportData = () => {
    // Implement export data functionality
    console.log('Export data clicked')
  }

  const handleViewReports = () => {
    // Implement view reports functionality
    console.log('View reports clicked')
  }

  return (
    <div className="relative">
      <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-r from-emerald-600 to-green-600 border-none">
        <div className="absolute inset-0 bg-black/10" />
        <CardContent className="relative z-10 p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="text-white mb-6 lg:mb-0">
              <div className="flex items-center gap-3 mb-2">
               
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
                    <User className="w-5 h-5 text-white" />
                  </div>
            
                <div>
                  <h1 className="text-3xl font-bold">
                    {getGreeting()}, {user?.name || 'Admin'}! 👋
                  </h1>
                  <p className="text-emerald-100 text-sm mt-1">
                    {user?.role ? `${user.role} • ${user.email}` : 'Administrator'}
                  </p>
                </div>
              </div>
              <p className="text-emerald-100 text-lg mb-4">
                Here's what's happening at your school today
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm hover:bg-white/30">
                  <Calendar className="w-3 h-3 mr-2" />
                  Today: {getCurrentDate()}
                </Badge>
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm hover:bg-white/30">
                  <TrendingUp className="w-3 h-3 mr-2" />
                  School Performance: Excellent
                </Badge>
                {/* {user?.lastLogin && (
                  <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm hover:bg-white/30">
                    Last login: {new Date(user.lastLogin).toLocaleDateString()}
                  </Badge>
                )} */}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleViewReports}
                className="bg-white/20 text-white border-0 backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Reports
              </Button>
              <Button 
                onClick={handleExportData}
                className="bg-white text-emerald-600 hover:bg-white/90 border-0 transition-all duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
          
          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
            {[
              { label: 'Total Students', value: '1,247', trend: '+12%' },
              { label: 'Staff Members', value: '68', trend: '+2' },
              { label: 'Today\'s Attendance', value: '94%', trend: '+3%' },
              { label: 'Pending Tasks', value: '12', trend: '-4' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-emerald-100 text-sm">{stat.label}</div>
                <div className={`text-xs mt-1 ${
                  stat.trend.startsWith('+') 
                    ? 'text-green-200' 
                    : stat.trend.startsWith('-')
                    ? 'text-red-200'
                    : 'text-emerald-200'
                }`}>
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserHeroSection