import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  DollarSign,
  Calendar,
  TrendingUp,
  Award,
  UserCheck
} from "lucide-react"
import { MetricCard } from "./MetricCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import dashboardHero from "@/assets/dashboard-hero.jpg"

const metrics = [
  {
    title: "Total Students",
    value: "2,847",
    icon: Users,
    trend: { value: 12, isPositive: true },
    description: "Active enrollment"
  },
  {
    title: "Faculty Members",
    value: "156",
    icon: UserCheck,
    trend: { value: 3, isPositive: true },
    description: "Teaching & support staff"
  },
  {
    title: "Active Courses",
    value: "89",
    icon: BookOpen,
    trend: { value: 8, isPositive: true },
    description: "This semester"
  },
  {
    title: "Revenue (Monthly)",
    value: "$847K",
    icon: DollarSign,
    trend: { value: 15, isPositive: true },
    description: "Fees collected"
  },
]

const recentActivities = [
  {
    title: "New Student Registration",
    description: "Sarah Johnson submitted application for Grade 10",
    time: "2 hours ago",
    type: "success"
  },
  {
    title: "Fee Payment Received",
    description: "Monthly fees collected from Grade 8 students",
    time: "4 hours ago",
    type: "info"
  },
  {
    title: "Staff Meeting Scheduled",
    description: "Department heads meeting on Friday at 2 PM",
    time: "1 day ago",
    type: "warning"
  },
  {
    title: "Exam Results Published",
    description: "Mid-term examination results are now available",
    time: "2 days ago",
    type: "success"
  },
]

const upcomingEvents = [
  {
    title: "Parent-Teacher Conference",
    date: "Dec 15, 2024",
    time: "9:00 AM - 5:00 PM",
    attendees: 45
  },
  {
    title: "Science Fair",
    date: "Dec 18, 2024",
    time: "10:00 AM - 3:00 PM",
    attendees: 120
  },
  {
    title: "Winter Break Begins",
    date: "Dec 20, 2024",
    time: "Last day of classes",
    attendees: 2847
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative">
        <Card className="border-0 shadow-elevated overflow-hidden">
          <div className="relative h-48 bg-gradient-primary">
            <img 
              src={dashboardHero} 
              alt="Dashboard Analytics"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
            <CardContent className="relative z-10 h-full flex items-center p-8">
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">Welcome back, Admin</h1>
                <p className="text-primary-foreground/80 text-lg">
                  Here's what's happening at your school today
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <Calendar className="w-3 h-3 mr-1" />
                    Today: December 12, 2024
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    School Performance: Excellent
                  </Badge>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 shadow-card border-0 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest updates and activities in your school
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-success' :
                    activity.type === 'warning' ? 'bg-warning' :
                    'bg-primary'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="shadow-card border-0 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Upcoming Events
            </CardTitle>
            <CardDescription>
              Important dates and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                  <p className="text-xs text-muted-foreground mb-1">
                    {event.date}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {event.time}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {event.attendees} attendees
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card border-0 bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current Week</span>
                <span className="font-medium">94.2%</span>
              </div>
              <Progress value={94.2} className="h-2" />
              <p className="text-xs text-muted-foreground">
                +2.1% from last week
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Grade Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Average GPA</span>
                <span className="font-medium">3.7/4.0</span>
              </div>
              <Progress value={92.5} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Excellent performance
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Fee Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>This Month</span>
                <span className="font-medium">87%</span>
              </div>
              <Progress value={87} className="h-2" />
              <p className="text-xs text-muted-foreground">
                $847K collected
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}