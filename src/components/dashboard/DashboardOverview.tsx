import { 
  Users,  
  BookOpen, 
  DollarSign,
  Calendar,
  TrendingUp,
  Award,
  UserCheck,
  ArrowUp,
  Clock,
  Eye,
  Download
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const metrics = [
  {
    title: "Total Students",
    value: "2,847",
    icon: Users,
    trend: { value: 12, isPositive: true },
    description: "Active enrollment",
    color: "blue"
  },
  {
    title: "Faculty Members",
    value: "156",
    icon: UserCheck,
    trend: { value: 3, isPositive: true },
    description: "Teaching & support staff",
    color: "purple"
  },
  {
    title: "Active Courses",
    value: "89",
    icon: BookOpen,
    trend: { value: 8, isPositive: true },
    description: "This semester",
    color: "orange"
  },
  {
    title: "Revenue (Monthly)",
    value: "$847K",
    icon: DollarSign,
    trend: { value: 15, isPositive: true },
    description: "Fees collected",
    color: "green"
  },
]

const recentActivities = [
  {
    title: "New Student Registration",
    description: "Sarah Johnson submitted application for Grade 10",
    time: "2 hours ago",
    type: "success",
    icon: Users
  },
  {
    title: "Fee Payment Received",
    description: "Monthly fees collected from Grade 8 students",
    time: "4 hours ago",
    type: "info",
    icon: DollarSign
  },
  {
    title: "Staff Meeting Scheduled",
    description: "Department heads meeting on Friday at 2 PM",
    time: "1 day ago",
    type: "warning",
    icon: UserCheck
  },
  {
    title: "Exam Results Published",
    description: "Mid-term examination results are now available",
    time: "2 days ago",
    type: "success",
    icon: Award
  },
]

const upcomingEvents = [
  {
    title: "Parent-Teacher Conference",
    date: "Dec 15, 2024",
    time: "9:00 AM - 5:00 PM",
    attendees: 45,
    type: "academic"
  },
  {
    title: "Science Fair",
    date: "Dec 18, 2024",
    time: "10:00 AM - 3:00 PM",
    attendees: 120,
    type: "event"
  },
  {
    title: "Winter Break Begins",
    date: "Dec 20, 2024",
    time: "Last day of classes",
    attendees: 2847,
    type: "holiday"
  },
]

const quickStats = [
  {
    title: "Attendance Rate",
    value: "94.2%",
    progress: 94.2,
    trend: "+2.1%",
    isPositive: true,
    description: "Current week average"
  },
  {
    title: "Grade Performance",
    value: "3.7/4.0",
    progress: 92.5,
    trend: "+0.2",
    isPositive: true,
    description: "Average GPA"
  },
  {
    title: "Fee Collection",
    value: "87%",
    progress: 87,
    trend: "+5%",
    isPositive: true,
    description: "Monthly target"
  }
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative">
        <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-r from-emerald-600 to-green-600 border-none">
          <div className="absolute inset-0 bg-black/10" />
          <CardContent className="relative z-10 p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="text-white mb-6 lg:mb-0">
                <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
                <p className="text-emerald-100 text-lg mb-4">
                  Here's what's happening at your school today
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm hover:bg-white/30">
                    <Calendar className="w-3 h-3 mr-2" />
                    Today: December 12, 2024
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm hover:bg-white/30">
                    <TrendingUp className="w-3 h-3 mr-2" />
                    School Performance: Excellent
                  </Badge>
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="bg-white/20 text-white border-0 backdrop-blur-sm hover:bg-white/30">
                  <Eye className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
                <Button className="bg-white text-emerald-600 hover:bg-white/90 border-0">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</h3>
                  <div className="flex items-center gap-1">
                    <ArrowUp className={`w-4 h-4 ${metric.trend.isPositive ? 'text-emerald-600' : 'text-red-600'} rotate-45`} />
                    <span className={`text-sm font-medium ${metric.trend.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                      {metric.trend.value}%
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${
                  metric.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  metric.color === 'purple' ? 'from-purple-500 to-purple-600' :
                  metric.color === 'orange' ? 'from-orange-500 to-orange-600' :
                  'from-emerald-500 to-emerald-600'
                }`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 border-0 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="w-5 h-5 text-emerald-600" />
                  Recent Activities
                </CardTitle>
                <CardDescription>
                  Latest updates and activities in your school
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-emerald-200 transition-all duration-200 group hover:shadow-sm">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                    activity.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                    'bg-blue-50 text-blue-600'
                  } group-hover:scale-110 transition-transform`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1">{activity.title}</h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>
                  Important dates and events
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                View Calendar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-4 rounded-xl border border-gray-100 hover:border-emerald-200 transition-all duration-200 group hover:shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {event.title}
                    </h4>
                    <Badge variant="outline" className={`
                      ${event.type === 'academic' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                        event.type === 'event' ? 'bg-purple-50 text-purple-700 border-purple-200' : 
                        'bg-amber-50 text-amber-700 border-amber-200'}
                    `}>
                      {event.type}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-gray-500">
                        {event.attendees.toLocaleString()} attendees
                      </span>
                      <Button size="sm" variant="ghost" className="h-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className={`text-sm font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.trend}
                  </span>
                </div>
                <Progress value={stat.progress} className="h-2 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-emerald-600" />
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Insights */}
      <Card className=" shadow-sm bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
            <div className="mb-4 lg:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Need more detailed insights?
              </h3>
              <p className="text-gray-600">
                Access comprehensive reports and analytics for deeper analysis
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-white">
                Generate Report
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 border-0">
                Advanced Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}