import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Lightbulb, Users, Cross, BookOpen } from 'lucide-react';

export const ChristianAbout = () => {
  const values = [
    {
      icon: <Cross className="h-8 w-8 text-primary" />,
      title: "Faith Foundation",
      description: "Grounding every aspect of learning in Christian values and Biblical principles"
    },
    {
      icon: <Heart className="h-8 w-8 text-love" />,
      title: "Loving Care",
      description: "Providing a nurturing environment where every child feels loved, safe, and valued"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-accent" />,
      title: "Academic Excellence",
      description: "Delivering quality education that develops curious minds and critical thinking skills"
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: "Character Building",
      description: "Shaping young hearts with integrity, kindness, and Christian character traits"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            About Our School
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Welcome to Our 
            <span className="hero-gradient bg-clip-text text-transparent"> Christian Family</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Hope of Glory Christian School is dedicated to providing quality early childhood and primary education 
            rooted in Christian values. We believe that every child is a precious gift from God, uniquely created 
            with special talents and purposes to fulfill.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-elegant mb-16 border border-border/50">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              To nurture young hearts and minds in a Christ-centered environment, providing excellent education 
              that develops the whole child - academically, spiritually, socially, and emotionally - preparing 
              them to be faithful leaders and positive contributors to society.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>"Train up a child in the way he should go"</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Proverbs 22:6</span>
              </div>
            </div>
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

        {/* Why Choose Us */}
        <Card className="border-0 hero-gradient text-white shadow-hero">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Hope of Glory?</h3>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                We combine academic excellence with Christian values, creating an environment where 
                children can grow in wisdom, stature, and favor with God and man.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                <Users className="h-8 w-8 text-accent mx-auto mb-3" />
                <h4 className="text-lg font-semibold mb-2">Small Class Sizes</h4>
                <p className="text-sm">Individual attention for every child's unique learning needs</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                <Shield className="h-8 w-8 text-accent mx-auto mb-3" />
                <h4 className="text-lg font-semibold mb-2">Safe Environment</h4>
                <p className="text-sm">Secure, nurturing space where children feel protected and loved</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                <Heart className="h-8 w-8 text-accent mx-auto mb-3" />
                <h4 className="text-lg font-semibold mb-2">Holistic Development</h4>
                <p className="text-sm">Nurturing spirit, mind, and body for complete child development</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};