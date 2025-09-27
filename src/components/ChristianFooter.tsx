import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram,
  ArrowRight,
  Cross,
  Clock,
  Users
} from 'lucide-react';

export const ChristianFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg relative">
                <Heart className="h-8 w-8 text-primary" />
                <Cross className="h-4 w-4 text-accent absolute -top-1 -right-1" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Hope of Glory</h3>
                <p className="text-primary-foreground/80 text-sm">Christian School</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Nurturing young hearts and minds in a Christ-centered environment, 
              providing excellent education for nursery and primary students.
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
                { name: 'Our Programs', href: '#programs' },
                { name: 'Christian Values', href: '#values' },
                { name: 'Enrollment', href: '#contact' },
                { name: 'Parent Portal', href: '#' },
                { name: 'School Calendar', href: '#' },
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

          {/* Programs & Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Programs</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-love text-love-foreground rounded-full p-2">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Nursery Program</div>
                  <div className="text-xs text-primary-foreground/70">Ages 3-5</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-accent text-accent-foreground rounded-full p-2">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Primary Program</div>
                  <div className="text-xs text-primary-foreground/70">Ages 6-12</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">School Hours</div>
                  <div className="text-xs text-primary-foreground/70">7:30 AM - 4:00 PM</div>
                </div>
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
                    Hope of Glory Christian School
                  </p>
                  <p className="text-primary-foreground/70 text-xs">
                    [School Address]
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
                  info@hopeofglory.edu
                </p>
              </div>
            </div>
            
            <Button 
              variant="secondary" 
              className="w-full bg-white text-primary hover:bg-white/90 mt-4"
            >
              Enroll Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator className="bg-white/20 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-primary-foreground/80 text-sm">
              © {currentYear} Hope of Glory Christian School. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 text-xs mt-1 flex items-center justify-center md:justify-start space-x-2">
              <Cross className="h-3 w-3" />
              <span>"Train up a child in the way he should go" - Proverbs 22:6</span>
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
            <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
              School Policies
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
              Parent Handbook
            </a>
          </div>
        </div>

        {/* Biblical Quote */}
        <div className="mt-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-primary-foreground/90 italic text-sm">
              "Let the little children come to me, and do not hinder them, 
              for the kingdom of heaven belongs to such as these."
            </p>
            <p className="text-primary-foreground/70 text-xs mt-1">- Matthew 19:14</p>
          </div>
        </div>
      </div>
    </footer>
  );
};