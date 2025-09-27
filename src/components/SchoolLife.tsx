import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Music, Trophy, Users, Camera, ArrowRight } from 'lucide-react';
import performingArtsImage from '@/assets/performing-arts.jpg';

export const SchoolLife = () => {
  const activities = [
    {
      icon: <Activity className="h-8 w-8 text-primary" />,
      title: "Athletics & Sports",
      description: "Our students are passionate about sports and athletics and have the freedom to choose the one they like and wish to take up.",
      features: ["Football", "Basketball", "Track & Field", "Volleyball", "Swimming", "Tennis"],
      gradient: "hero-gradient"
    },
    {
      icon: <Music className="h-8 w-8 text-secondary" />,
      title: "Performing Arts & Music",
      description: "With professionals on board, we take pride in training our students in art forms like dance, drama, painting and more.",
      features: ["Traditional Dance", "Drama Club", "Music Band", "Choir", "Art & Painting", "Cultural Events"],
      gradient: "hero-gradient"
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Student Leadership",
      description: "Developing leadership skills through student council, prefect system, and various student-led initiatives.",
      features: ["Student Council", "Prefect System", "Debate Club", "Model UN", "Peer Mentoring", "Community Service"],
      gradient: "accent-gradient"
    },
    {
      icon: <Trophy className="h-8 w-8 text-success" />,
      title: "Competitions & Awards",
      description: "Regular participation in inter-school competitions, academic contests, and recognition programs.",
      features: ["Academic Competitions", "Science Fairs", "Art Exhibitions", "Sports Championships", "Leadership Awards", "Scholarships"],
      gradient: "hero-gradient"
    }
  ];

  return (
    <section id="school-life" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            School Life
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Co-curricular 
            <span className="hero-gradient bg-clip-text text-transparent"> Activities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Beyond academics, we provide a rich array of extracurricular activities that help students 
            discover their passions, develop new skills, and build lasting friendships.
          </p>
        </div>

        {/* Featured Image Section */}
        <div className="mb-16">
          <Card className="overflow-hidden border-0 shadow-hero">
            <div className="relative h-96 md:h-[500px]">
              <img
                src={performingArtsImage}
                alt="Students performing traditional dance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-2xl px-4">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    Celebrating Our Culture
                  </h3>
                  <p className="text-lg mb-6">
                    Our performing arts program showcases the rich cultural heritage of Uganda 
                    while fostering creativity and artistic expression.
                  </p>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 shadow-elegant"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    View Gallery
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {activities.map((activity, index) => (
            <Card key={index} className="border-0 shadow-elegant hover:shadow-hero transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-muted p-3 rounded-full">
                    {activity.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {activity.title}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Activities Include
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {activity.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Join Activity
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="border-0 hero-gradient text-white shadow-hero">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Discover Your Passion
              </h3>
              <p className="text-xl mb-6 max-w-2xl mx-auto">
                With over 20 different clubs and activities, there's something for everyone at 
                Gulu Secondary School. Join us and unlock your potential beyond the classroom.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 shadow-elegant"
                >
                  View All Activities
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