import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram,
  ArrowRight
} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Gulu Secondary School</h3>
                <p className="text-primary-foreground/80 text-sm">Excellence in Education</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Empowering tomorrow's leaders through quality education, academic excellence, 
              and holistic development in the heart of Gulu, Uganda.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="hover:bg-white/20">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: 'About Us', href: '#about' },
                { name: 'Academic Programs', href: '#programs' },
                { name: 'Admissions', href: '#contact' },
                { name: 'School Life', href: '#school-life' },
                { name: 'Alumni', href: '#' },
                { name: 'News & Events', href: '#' },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-primary-foreground/80 hover:text-white transition-colors hover:translate-x-1 transform transition-transform"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Academic Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Academic Excellence</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-sm font-bold">
                  100%
                </div>
                <span className="text-sm text-primary-foreground/80">O-Level Pass Rate</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-sm font-bold">
                  25
                </div>
                <span className="text-sm text-primary-foreground/80">A-Level Champions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-sm font-bold">
                  500+
                </div>
                <span className="text-sm text-primary-foreground/80">Active Students</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground/80 text-sm">
                    Gulu City, Northern Uganda
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <p className="text-primary-foreground/80 text-sm">
                  +256 XXX XXX XXX
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <p className="text-primary-foreground/80 text-sm">
                  info@guluss.sc.ug
                </p>
              </div>
            </div>
            
            <Button 
              variant="secondary" 
              className="w-full bg-white text-primary hover:bg-white/90 mt-4"
            >
              Apply Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator className="bg-white/20 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-primary-foreground/80 text-sm">
              © {currentYear} Gulu Secondary School. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 text-xs mt-1">
              Building excellence since our founding | Empowering future leaders
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
            <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
              Student Handbook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};