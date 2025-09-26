import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Building } from "lucide-react";
import heroImage from "@/assets/hero-mosque.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mosque construction bringing communities together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-trust/80 via-primary/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-arabic mb-6 leading-tight">
            Building Communities
            <span className="block text-accent">Through Faith</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 font-inter leading-relaxed max-w-3xl mx-auto opacity-95">
            The Itoninga Abudallah Charity Foundation is a community-based, non-profit organization 
            committed to nurturing the growth of Islam in Uganda through mosque construction, 
            Ramadan aid, and compassionate service to humanity.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              asChild 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-foreground font-semibold px-8 py-3 rounded-full shadow-large hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link to="/donate" className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Donate Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline"
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center animate-scale-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Building className="h-8 w-8 text-accent" />
              </div>
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-sm opacity-90">Mosques Built</div>
            </div>
            
            <div className="text-center animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-sm opacity-90">Families Supported</div>
            </div>
            
            <div className="text-center animate-scale-in" style={{ animationDelay: "0.4s" }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-sm opacity-90">Years of Service</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;