import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Target, Eye, Heart, Award } from "lucide-react"

const AboutPage = () => {
  const coreValues = [
    {
      title: "Excellence",
      description: "We strive for the highest standards in education and character development.",
      icon: Award
    },
    {
      title: "Integrity",
      description: "We uphold honesty, transparency, and ethical conduct in all our endeavors.",
      icon: Heart
    },
    {
      title: "Innovation",
      description: "We embrace creative thinking and modern approaches to education.",
      icon: Target
    },
    {
      title: "Community",
      description: "We foster a supportive environment where everyone belongs and thrives.",
      icon: Heart
    },
    {
      title: "Respect",
      description: "We value diversity and treat everyone with dignity and consideration.",
      icon: Award
    },
    {
      title: "Leadership",
      description: "We develop future leaders who make positive impacts in society.",
      icon: Target
    }
  ]

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-3">About Gulu Secondary School</h1>
            <p className="text-emerald-100 text-lg">Empowering minds, shaping futures</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
          
          {/* Background Section */}
          <section className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Background</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                Established in 1965, Gulu Secondary School has been a cornerstone of educational excellence 
                in Northern Uganda for over five decades. Founded with the vision of providing quality education 
                to the youth of Gulu and surrounding districts, our institution has grown from a modest beginning 
                to become one of the region's most respected educational institutions.
              </p>
              <p className="mb-4">
                Throughout our history, we have remained committed to nurturing young minds and developing 
                well-rounded individuals who contribute meaningfully to society. Our alumni have gone on to 
                become leaders in various fields including medicine, law, education, business, and public service.
              </p>
              <p>
                Today, Gulu Secondary School serves over 1,200 students with a dedicated staff of 89 teachers 
                and support personnel. We continue to uphold our tradition of academic excellence while embracing 
                modern teaching methodologies and technologies to prepare our students for the challenges of the 21st century.
              </p>
            </div>
          </section>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Vision */}
            <section className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl shadow-sm p-8 border border-emerald-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be a leading center of academic excellence that nurtures innovative, responsible, and 
                compassionate leaders who transform their communities and contribute to national development.
              </p>
            </section>

            {/* Mission */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm p-8 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide holistic, quality education that empowers students with knowledge, skills, and values 
                necessary for academic excellence, personal growth, and meaningful contribution to society through 
                innovative teaching, strong character formation, and a supportive learning environment.
              </p>
            </section>
          </div>

          {/* Core Values */}
          <section className="bg-white rounded-2xl shadow-sm p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Core Values</h2>
              <p className="text-gray-600">
                These fundamental principles guide our actions and decisions as an institution
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((value, index) => (
                <div 
                  key={index}
                  className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/20">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </DashboardLayout>
  )
}

export default AboutPage