import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Heart, Users, BookOpen, Star } from 'lucide-react';
import heroImage from '@/assets/christian-school-hero.jpg';

export const ChristianHero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Hope of Glory Christian School children learning and playing together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-secondary/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium shadow-elegant">
            ✨ Nurturing Young Hearts & Minds
          </Badge>

          {/* Main Headlines */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Hope of 
            <span className="block accent-gradient bg-clip-text text-transparent">
              Glory
            </span>
            <span className="text-4xl md:text-5xl block mt-2">Christian School</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Building strong foundations in faith, character, and learning for our nursery and primary students. 
            Where every child is loved, valued, and empowered to shine their light.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-hero px-8 py-4 text-lg font-semibold transition-bounce"
            >
              Discover Our Programs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold transition-bounce"
            >
              Schedule a Visit
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-bounce hover:bg-white/30">
                <Heart className="h-8 w-8 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">150+</div>
                <div className="text-white/80">Happy Students</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-bounce hover:bg-white/30">
                <Users className="h-8 w-8 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">20+</div>
                <div className="text-white/80">Caring Teachers</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-bounce hover:bg-white/30">
                <Star className="h-8 w-8 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">10+</div>
                <div className="text-white/80">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
};