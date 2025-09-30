import { BookOpen } from "lucide-react"

interface BrandSectionProps {
  schoolName?: string
}

export function BrandSection({ schoolName = "Gulu Secondary School" }: BrandSectionProps) {
  return (
    <div className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-600 items-center justify-center p-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 text-center text-white max-w-lg">
        <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/30">
          <BookOpen className="w-12 h-12 text-white" />
        </div>

        <h2 className="text-4xl font-bold mb-6">
          Welcome to <span className="text-emerald-200">{schoolName}</span>
        </h2>

        <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
          Streamline your school management with our comprehensive admin dashboard.
          Manage students, staff, academics, and finances all in one place.
        </p>

        {/* Features List */}
        <div className="grid grid-cols-2 gap-4 text-left">
          {[
            "Student Management",
            "Academic Tracking",
            "Fee Collection",
            "Staff Directory",
            "Event Calendar",
            "Real-time Reports"
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-3 text-emerald-100">
              <div className="w-2 h-2 bg-emerald-200 rounded-full"></div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-white/20">
          {[
            { number: "50K+", label: "Students" },
            { number: "2K+", label: "Schools" },
            { number: "99%", label: "Satisfaction" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.number}</div>
              <div className="text-sm text-emerald-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}