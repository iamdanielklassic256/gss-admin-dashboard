import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Microscope, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';
import libraryImage from '@/assets/library-students.jpg';
import scienceImage from '@/assets/science-lab.jpg';

export const Programs = () => {
  const programs = [
    {
      icon: <Microscope className="h-12 w-12 text-primary" />,
      title: "Science Program",
      description: "Explore biology, chemistry, physics, mathematics, and beyond with hands-on laboratory experience and modern equipment.",
      subjects: ["Biology", "Chemistry", "Physics", "Mathematics", "Computer Science"],
      image: scienceImage,
      color: "primary"
    },
    {
      icon: <BookOpen className="h-12 w-12 text-secondary" />,
      title: "Arts Program",
      description: "Discover History, Geography, Literature, Fine Art, Acoli language, and develop critical thinking through humanities.",
      subjects: ["History", "Geography", "Literature", "Fine Art", "Acoli", "Religious Studies"],
      image: libraryImage,
      color: "secondary"
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-accent" />,
      title: "Business Program",
      description: "Learn commerce, entrepreneurship, economics, and business management to prepare for the modern economy.",
      subjects: ["Commerce", "Entrepreneurship", "Economics", "Accounting", "Business Management"],
      image: libraryImage,
      color: "accent"
    }
  ];

  return (
    <section id="programs" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Academic Programs
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Curriculum 
            <span className="hero-gradient bg-clip-text text-transparent"> Overview</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive O-Level and A-Level curriculum is designed to provide students with 
            a strong foundation across multiple disciplines, preparing them for university and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="group overflow-hidden border-0 shadow-elegant hover:shadow-hero transition-all duration-500 hover:-translate-y-2">
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={`${program.title} students`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    {program.icon}
                  </div>
                </div>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {program.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {program.description}
                </p>

                {/* Subjects */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Key Subjects
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {program.subjects.map((subject, subIndex) => (
                      <Badge 
                        key={subIndex} 
                        variant="secondary" 
                        className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="border-0 bg-muted/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Comprehensive Educational Pathways
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Our programs are designed to cater to diverse interests and career aspirations, 
                ensuring every student finds their path to success in higher education and beyond.
              </p>
              <Button size="lg" className="shadow-elegant">
                View Full Curriculum
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};