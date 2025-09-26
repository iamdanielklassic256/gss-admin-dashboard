import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Building, HandHeart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "Rooted in Islamic principles of mercy and kindness, we serve all with an open heart."
    },
    {
      icon: Users,
      title: "Unity",
      description: "Building bridges between communities and fostering brotherhood across Uganda."
    },
    {
      icon: Building,
      title: "Development",
      description: "Constructing and maintaining places of worship in even the most remote areas."
    },
    {
      icon: HandHeart,
      title: "Service",
      description: "Dedicated to humanitarian aid, especially during Ramadan and times of crisis."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary to-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-arabic">
            Our Mission & Vision
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Inspired by the principles of Islam—compassion, brotherhood, and service to humanity—we stand as 
            a beacon of hope and guidance, committed to nurturing the growth of faith and community in Uganda.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-3xl shadow-large p-8 md:p-12 mb-16 animate-slide-up">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">Our Sacred Mission</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We are devoted to supervising and supporting the development of faith through the construction, 
                renovation, and maintenance of Mosques, ensuring that every community, even in the most remote 
                areas, has a safe and dignified place of worship.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission extends to coordinating donations and charitable support for those in need, 
                especially during the holy month of Ramadan, when we distribute food, clothing, and other 
                necessities to fasting families, orphans, the elderly, and struggling households.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <Building className="h-16 w-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-semibold">"One mosque, one family,<br />one united community"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card 
              key={value.title} 
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-2 animate-scale-in border-0 bg-white/80 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bridge Statement */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 font-arabic">
              A Bridge Between Hearts
            </h3>
            <p className="text-lg md:text-xl opacity-95 max-w-3xl mx-auto leading-relaxed">
              Itoninga Abudallah Charity Foundation serves as a bridge between generous donors and 
              vulnerable communities. Through transparency, dedication, and faith, we ensure every 
              act of giving becomes a blessing multiplied.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;