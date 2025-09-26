import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Gift, HeartHandshake, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ramadanImage from "@/assets/ramadan-aid.jpg";
import mosqueImage from "@/assets/completed-mosque.jpg";

const Programs = () => {
  const programs = [
    {
      icon: Building,
      title: "Mosque Construction",
      description: "Building and renovating places of worship in remote communities across Uganda, ensuring every Muslim has access to a dignified place for prayer and community gathering.",
      image: mosqueImage,
      features: ["New mosque construction", "Renovation of existing facilities", "Community consultation", "Sustainable building practices"],
      color: "primary"
    },
    {
      icon: Gift,
      title: "Ramadan Aid",
      description: "During the holy month of Ramadan, we distribute food, clothing, and essential supplies to fasting families, orphans, elderly, and struggling households.",
      image: ramadanImage,
      features: ["Food distribution", "Clothing donations", "Essential supplies", "Special care for orphans"],
      color: "accent"
    },
    {
      icon: HeartHandshake,
      title: "Emergency Relief",
      description: "In times of hardship and crisis, we are among the first to respond, offering aid, comfort, and hope to communities in need.",
      image: null,
      features: ["Disaster response", "Medical assistance", "Temporary shelter", "Community support"],
      color: "trust"
    },
    {
      icon: Users,
      title: "Community Development",
      description: "Supporting educational initiatives, skill development programs, and community infrastructure projects that strengthen our communities.",
      image: null,
      features: ["Educational support", "Skill training", "Youth programs", "Women empowerment"],
      color: "warm"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-arabic">
            Our Programs
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Through our comprehensive programs, we serve communities across Uganda with faith, 
            compassion, and dedication to improving lives and strengthening Islamic values.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {programs.map((program, index) => (
            <Card 
              key={program.title}
              className="group overflow-hidden border-0 shadow-medium hover:shadow-large transition-all duration-500 hover:-translate-y-1 animate-scale-in bg-white"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {program.image && (
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-${program.color} rounded-full`}>
                      <program.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              )}
              
              <CardHeader className={!program.image ? "pt-8" : ""}>
                {!program.image && (
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${program.color} to-${program.color}-light rounded-full mb-4`}>
                    <program.icon className="h-8 w-8 text-white" />
                  </div>
                )}
                <CardTitle className="text-2xl text-foreground">{program.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="pb-8">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {program.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {program.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className={`w-2 h-2 bg-${program.color} rounded-full mr-3 flex-shrink-0`}></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button 
                  asChild
                  variant="outline" 
                  className={`group/btn border-${program.color} text-${program.color} hover:bg-${program.color} hover:text-white transition-all duration-300`}
                >
                  <Link to="/programs" className="flex items-center gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in">
          <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Join Us in Making a Difference
            </h3>
            <p className="text-lg md:text-xl opacity-95 mb-8 max-w-2xl mx-auto">
              Your support helps us continue our mission of building communities, 
              supporting families, and spreading compassion throughout Uganda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-foreground font-semibold px-8 py-3 rounded-full shadow-large hover:shadow-xl transition-all duration-300"
              >
                <Link to="/donate" className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Donate Now
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 rounded-full backdrop-blur-sm"
              >
                <Link to="/contact">Get Involved</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;