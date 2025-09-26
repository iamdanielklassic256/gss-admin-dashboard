import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Target, Eye } from "lucide-react";

const AboutPage = () => {
  const leadership = [
    {
      name: "Sheikh Abdullah Itoninga",
      role: "Founder & Chairman",
      description: "Visionary leader with over 20 years of community service experience."
    },
    {
      name: "Imam Hassan Mukasa",
      role: "Religious Director",
      description: "Spiritual guide overseeing our religious programs and mosque construction."
    },
    {
      name: "Sister Fatima Namukwaya",
      role: "Community Outreach Coordinator",
      description: "Leading our Ramadan aid and family support initiatives."
    }
  ];

  return (
    <div className="min-h-screen font-inter">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-arabic mb-6 animate-fade-in">
              About Our Foundation
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-95">
              Learn about our journey, mission, and the dedicated people working to build 
              stronger communities through faith and compassion across Uganda.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="animate-slide-up">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="w-16 h-1 bg-gradient-primary mb-6"></div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The Itoninga Abudallah Charity Foundation was born from a deep-rooted commitment 
                  to serve humanity through the principles of Islam. Founded with the vision of 
                  creating a stronger, more united Muslim community in Uganda, our organization 
                  has grown from humble beginnings to become a beacon of hope for thousands.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  What started as a small community initiative has evolved into a comprehensive 
                  foundation that touches lives across the nation. From constructing mosques in 
                  remote villages to providing emergency relief during crises, we have remained 
                  steadfast in our commitment to serve those in need.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we continue to bridge the gap between generous hearts and vulnerable 
                  communities, ensuring that every act of charity becomes a source of blessing 
                  and positive change.
                </p>
              </div>
              
              <div className="relative animate-scale-in">
                <div className="bg-gradient-primary rounded-3xl p-8 text-white text-center">
                  <Heart className="h-16 w-16 mx-auto mb-6 opacity-80" />
                  <h3 className="text-2xl font-bold mb-4">Our Foundation</h3>
                  <p className="text-lg opacity-95">
                    Built on the pillars of compassion, unity, faith, and service to humanity.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="shadow-large border-0 hover:shadow-xl transition-all duration-300 animate-scale-in">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To nurture the growth of Islam in Uganda through mosque construction, community 
                    support, and charitable initiatives that embody the principles of compassion, 
                    brotherhood, and service to humanity.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-large border-0 hover:shadow-xl transition-all duration-300 animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To build a united, compassionate society where every community has access to 
                    places of worship, and where the values of faith, charity, and mutual support 
                    flourish throughout Uganda.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Leadership Team */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Leadership</h2>
              <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the dedicated individuals who guide our mission and ensure our programs 
                reach those who need them most.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {leadership.map((leader, index) => (
                <Card 
                  key={leader.name}
                  className="text-center shadow-medium hover:shadow-large transition-all duration-300 hover:-translate-y-2 border-0 animate-scale-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-8">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{leader.name}</h3>
                    <p className="text-primary font-medium mb-4">{leader.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {leader.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-secondary to-muted">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Join Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Whether through donations, volunteering, or spreading awareness, there are many 
                ways to support our work and make a meaningful impact in communities across Uganda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/donate"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-primary text-white font-semibold rounded-full shadow-large hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Support Our Cause
                </a>
                <a 
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Get Involved
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;