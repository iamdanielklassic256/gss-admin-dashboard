import {
  BookOpen,
  Bell,
  Home,
} from "lucide-react"

export const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    description: "Overview & Analytics",
    badge: null,
    color: "emerald"
  },
  {
    title: "School Profile",
    url: "/school-profile",
    icon: BookOpen,
    description: "About & Leadership",
    badge: null,
    color: "amber",
    dropdown: [
      { title: "About School", url: "/school-history/about" },
      { title: "Leadership", url: "/school-history/leadership" },
      { title: "Mission & Vision", url: "/school-history/mission" },
      { title: "Achievements", url: "/school-history/achievements" },
      { title: "Gallery", url: "/school-history/gallery" },
    ]
  },
  // {
  //   title: "Students",
  //   url: "/students",
  //   icon: Users,
  //   description: "Student Management",
  //   badge: "1,234",
  //   color: "blue",
  //   dropdown: [
  //     { title: "All Students", url: "/students" },
  //     { title: "Student Records", url: "/students/records" },
  //     { title: "Attendance", url: "/students/attendance" },
  //     { title: "Performance", url: "/students/performance" },
  //   ]
  // },
  // {
  //   title: "Staff",
  //   url: "/staff",
  //   icon: UserCheck,
  //   description: "Faculty & Staff",
  //   badge: "89",
  //   color: "purple",
  //   dropdown: [
  //     { title: "All Staff", url: "/staff" },
  //     { title: "Teachers", url: "/staff/teachers" },
  //     { title: "Administration", url: "/staff/admin" },
  //     { title: "Support Staff", url: "/staff/support" },
  //   ]
  // },
  // {
  //   title: "Academics",
  //   url: "/academics",
  //   icon: BookOpen,
  //   description: "Courses & Curriculum",
  //   badge: null,
  //   color: "orange",
  //   dropdown: [
  //     { title: "Courses", url: "/academics/courses" },
  //     { title: "Curriculum", url: "/academics/curriculum" },
  //     { title: "Grades", url: "/academics/grades" },
  //     { title: "Timetable", url: "/academics/timetable" },
  //   ]
  // },
  // {
  //   title: "Admissions",
  //   url: "/admissions",
  //   icon: GraduationCap,
  //   description: "Applications & Enrollment",
  //   badge: "23",
  //   color: "pink",
  //   dropdown: [
  //     { title: "Applications", url: "/admissions/applications" },
  //     { title: "Enrollment", url: "/admissions/enrollment" },
  //     { title: "Registration", url: "/admissions/registration" },
  //   ]
  // },
  // {
  //   title: "Events",
  //   url: "/events",
  //   icon: Calendar,
  //   description: "Calendar & Events",
  //   badge: "5",
  //   color: "indigo"
  // },
  // {
  //   title: "Finance",
  //   url: "/finance",
  //   icon: DollarSign,
  //   description: "Fees & Payments",
  //   badge: null,
  //   color: "green",
  //   dropdown: [
  //     { title: "Fee Structure", url: "/finance/fees" },
  //     { title: "Payments", url: "/finance/payments" },
  //     { title: "Invoices", url: "/finance/invoices" },
  //     { title: "Financial Reports", url: "/finance/reports" },
  //   ]
  // },
  // {
  //   title: "Communications",
  //   url: "/communications",
  //   icon: MessageSquare,
  //   description: "News & Announcements",
  //   badge: "12",
  //   color: "cyan"
  // },
  // {
  //   title: "Reports",
  //   url: "/reports",
  //   icon: FileText,
  //   description: "Analytics & Reports",
  //   badge: null,
  //   color: "slate",
  //   dropdown: [
  //     { title: "Academic Reports", url: "/reports/academic" },
  //     { title: "Financial Reports", url: "/reports/financial" },
  //     { title: "Attendance Reports", url: "/reports/attendance" },
  //     { title: "Performance Reports", url: "/reports/performance" },
  //   ]
  // },

]

export const systemItems = [
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
    description: "System Alerts",
    badge: "8"
  },
]