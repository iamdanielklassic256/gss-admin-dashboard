import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Heart, Lightbulb, Trophy } from 'lucide-react';

export const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Academic Excellence",
      description: "Committed to providing high-quality education that prepares students for 21st century success"
    },
    {
      icon: <Heart className="h-8 w-8 text-secondary" />,
      title: "Nurturing Environment",
      description: "Creating a supportive community where every student feels valued and inspired to achieve their dreams"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-accent" />,
      title: "Critical Thinking",
      description: "Developing students' analytical skills and cultivating a lifelong love of learning"
    },
    {
      icon: <Trophy className="h-8 w-8 text-success" />,
      title: "Holistic Development",
      description: "Balancing academics with extracurricular activities for well-rounded educational experience"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            About Us
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Welcome to the 
            <span className="hero-gradient bg-clip-text text-transparent"> Gulu Secondary School </span>
            Family
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Gulu Secondary School is a leading institution dedicated to providing a high-quality education 
            that prepares students for success in the 21st century. We foster a nurturing and challenging 
            learning environment where students develop critical thinking skills, cultivate a love of learning, 
            and grow into responsible and engaged citizens.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-elegant mb-16 border border-border/50">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              At Gulu Secondary School, we believe in the potential of every student. Our dedicated faculty 
              and staff are passionate about empowering students to reach their full potential, both academically 
              and personally. We strive to create a strong sense of community where students feel supported 
              and inspired to achieve their dreams.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-smooth">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievement Highlight */}
        <Card className="border-0 hero-gradient text-white shadow-hero">
          <CardContent className="p-8 md:p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h3>
            <p className="text-xl mb-6 max-w-3xl mx-auto">
              Gulu Secondary School continues its commitment to academic excellence in 2025. 
              Our strong foundation is built upon past successes, including outstanding results 
              achieved by our students.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold text-accent mb-2">100%</div>
                <div className="text-lg">First-Grade Pass Rate at O-Level</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold text-accent mb-2">25</div>
                <div className="text-lg">Students with Maximum A-Level Points</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};