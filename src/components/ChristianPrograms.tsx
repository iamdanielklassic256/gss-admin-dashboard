import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Baby, Users, BookOpen, ArrowRight, Clock, Heart } from 'lucide-react';
import nurseryImage from '@/assets/nursery-classroom.jpg';
import primaryImage from '@/assets/primary-classroom.jpg';

export const ChristianPrograms = () => {
  const programs = [
    {
      icon: <Baby className="h-12 w-12 text-love" />,
      title: "Nursery Program",
      ageRange: "Ages 3-5",
      description: "A loving foundation for your little ones with play-based learning, Christian stories, and character development in a safe, nurturing environment.",
      features: [
        "Play-based Learning",
        "Bible Stories & Songs",
        "Social Skills Development",
        "Creative Arts & Crafts",
        "Early Literacy & Numeracy",
        "Outdoor Play & Activities"
      ],
      image: nurseryImage,
      schedule: "Monday - Friday, 8:00 AM - 12:00 PM",
      color: "love"
    },
    {
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      title: "Primary Program",
      ageRange: "Ages 6-12",
      description: "Comprehensive primary education combining academic excellence with Christian values, preparing students for secondary education and life.",
      features: [
        "Core Academic Subjects",
        "Christian Religious Education",
        "Science & Mathematics",
        "English & Local Languages",
        "Computer Skills",
        "Sports & Physical Education"
      ],
      image: primaryImage,
      schedule: "Monday - Friday, 7:30 AM - 4:00 PM",
      color: "primary"
    }
  ];

  const subjects = [
    { name: "Mathematics", icon: "📊" },
    { name: "English", icon: "📚" },
    { name: "Science", icon: "🔬" },
    { name: "Social Studies", icon: "🌍" },
    { name: "Christian Religious Education", icon: "✝️" },
    { name: "Art & Crafts", icon: "🎨" },
    { name: "Music", icon: "🎵" },
    { name: "Physical Education", icon: "⚽" },
  ];

  return (
    <section id="programs" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Our Programs
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nurturing Growth at 
            <span className="hero-gradient bg-clip-text text-transparent"> Every Stage</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From our tender nursery care to comprehensive primary education, we provide age-appropriate 
            programs that honor God while building strong academic foundations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {programs.map((program, index) => (
            <Card key={index} className="group overflow-hidden border-0 shadow-elegant hover:shadow-hero transition-all duration-500 hover:-translate-y-2">
              {/* Image Header */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={program.image}
                  alt={`${program.title} classroom`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    {program.icon}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-foreground">
                    {program.ageRange}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {program.title}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  {program.schedule}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {program.description}
                </p>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Program Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {program.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Heart className="h-3 w-3 text-love flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-elegant"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subjects Overview */}
        <Card className="border-0 bg-muted/50 backdrop-blur-sm mb-16">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Comprehensive Curriculum
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our balanced curriculum integrates academic subjects with Christian education, 
                ensuring holistic development of mind, body, and spirit.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {subjects.map((subject, index) => (
                <div key={index} className="text-center p-4 rounded-lg hover:bg-background transition-colors">
                  <div className="text-3xl mb-2">{subject.icon}</div>
                  <div className="text-xs font-medium text-foreground">{subject.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enrollment CTA */}
        <div className="text-center">
          <Card className="border-0 love-gradient text-white shadow-hero">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Join Our Family?
              </h3>
              <p className="text-xl mb-6 max-w-2xl mx-auto">
                Give your child the gift of quality Christian education in a loving, 
                nurturing environment where they can grow and thrive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 shadow-elegant"
                >
                  Start Enrollment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Schedule Visit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};