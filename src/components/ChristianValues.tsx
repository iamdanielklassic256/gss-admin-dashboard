import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cross, Heart, Shield, Star, Handshake, Smile, BookHeart, Users } from 'lucide-react';
import communityImage from '@/assets/school-community.jpg';

export const ChristianValues = () => {
  const coreValues = [
    {
      icon: <Cross className="h-8 w-8 text-primary" />,
      title: "Faith",
      verse: "Trust in the Lord with all your heart",
      description: "Building strong foundations in God's love and Biblical truth",
      color: "primary"
    },
    {
      icon: <Heart className="h-8 w-8 text-love" />,
      title: "Love",
      verse: "Love one another as I have loved you",
      description: "Showing Christ's love through care, compassion, and kindness",
      color: "love"
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: "Integrity",
      verse: "Let your yes be yes and your no be no",
      description: "Living truthfully with honesty and moral excellence",
      color: "secondary"
    },
    {
      icon: <Star className="h-8 w-8 text-accent" />,
      title: "Excellence",
      verse: "Whatever you do, do it all for the glory of God",
      description: "Pursuing excellence in all areas of life and learning",
      color: "accent"
    },
    {
      icon: <Handshake className="h-8 w-8 text-primary" />,
      title: "Respect",
      verse: "Honor one another above yourselves",
      description: "Treating everyone with dignity and Christian respect",
      color: "primary"
    },
    {
      icon: <Smile className="h-8 w-8 text-accent" />,
      title: "Joy",
      verse: "The joy of the Lord is our strength",
      description: "Celebrating life with gladness and thanksgiving",
      color: "accent"
    }
  ];

  const principles = [
    {
      icon: <BookHeart className="h-6 w-6 text-primary" />,
      title: "Christ-Centered Learning",
      description: "Every subject is taught through the lens of Biblical truth and Christian worldview"
    },
    {
      icon: <Users className="h-6 w-6 text-secondary" />,
      title: "Community Partnership",
      description: "Working together with families and church community to support each child's growth"
    },
    {
      icon: <Heart className="h-6 w-6 text-love" />,
      title: "Individual Worth",
      description: "Recognizing that every child is fearfully and wonderfully made by God"
    },
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: "Character Formation",
      description: "Developing godly character traits that will serve students throughout their lives"
    }
  ];

  return (
    <section id="values" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Our Values
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Built on 
            <span className="hero-gradient bg-clip-text text-transparent"> Christian Foundation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our core values shape everything we do, creating a Christ-centered environment 
            where children can grow in faith, character, and knowledge.
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {coreValues.map((value, index) => (
            <Card key={index} className="border-0 shadow-elegant hover:shadow-hero transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-muted p-4 rounded-full group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm italic text-muted-foreground mb-3 font-medium">
                  "{value.verse}"
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Image Section */}
        <div className="mb-16">
          <Card className="overflow-hidden border-0 shadow-hero">
            <div className="relative h-96 md:h-[500px]">
              <img
                src={communityImage}
                alt="Hope of Glory Christian School community gathering"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-2xl px-4">
                  <Cross className="h-16 w-16 text-accent mx-auto mb-6" />
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    United in Faith and Learning
                  </h3>
                  <p className="text-lg mb-6">
                    Our school community comes together in worship, fellowship, and shared commitment 
                    to raising children who will make a positive impact in the world for Christ.
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      "Let the little children come to me" - Matthew 19:14
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Educational Principles */}
        <Card className="border-0 bg-card shadow-elegant">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Educational Principles
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These guiding principles shape our approach to education and help us create 
                an environment where faith and learning work hand in hand.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    {principle.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {principle.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};