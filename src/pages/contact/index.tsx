import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  // const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // toast({
    //   title: "Message Sent!",
    //   description: "Thank you for contacting us. We'll get back to you soon.",
    // });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+256742032451", "+256762631517"],
      color: "primary"
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["info@itoningaabudala.com"],
      color: "accent"
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Uganda, East Africa"],
      color: "trust"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 8:00 AM - 5:00 PM", "Saturday: 9:00 AM - 2:00 PM"],
      color: "warm"
    }
  ];

  return (
    <div className="min-h-screen font-inter">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-arabic mb-6 animate-fade-in">
              Contact Us
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-95">
              We'd love to hear from you. Whether you have questions about our programs, 
              want to get involved, or need assistance, we're here to help.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Get In Touch</h2>
              <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Reach out to us through any of the following channels. We're committed to 
                responding promptly and helping you in any way we can.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <Card
                  key={info.title}
                  className="text-center shadow-medium hover:shadow-large transition-all duration-300 hover:-translate-y-2 border-0 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-${info.color} rounded-full mb-6`}>
                      <info.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-4">{info.title}</h3>
                    <div className="space-y-2">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="animate-slide-up">
                <Card className="shadow-large border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl text-foreground">Send Us a Message</CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                          placeholder="What is this about?"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                          placeholder="Tell us more about your inquiry..."
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 rounded-full shadow-medium hover:shadow-large transition-all duration-300"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8 animate-fade-in">
                <Card className="shadow-medium border-0 bg-gradient-to-br from-primary to-primary-light text-white">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Visit Our Office</h3>
                    <p className="opacity-95 leading-relaxed mb-6">
                      We welcome visitors to our main office in Uganda. Please call ahead 
                      to schedule an appointment and ensure someone is available to meet with you.
                    </p>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-accent" />
                        <span>Main Office: Uganda, East Africa</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-accent" />
                        <span>Monday - Friday: 8:00 AM - 5:00 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-medium border-0">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-foreground mb-4">Emergency Contact</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      For urgent matters or emergency situations, please don't hesitate to 
                      call us directly. We're committed to responding quickly to those in need.
                    </p>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center text-foreground font-medium">
                        <Phone className="h-5 w-5 mr-2 text-primary" />
                        <span>Emergency: +256742032451</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-medium border-0 bg-gradient-warm">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-bold text-foreground mb-4">Join Our Community</h3>
                    <p className="text-muted-foreground mb-6">
                      Stay connected with our latest updates, programs, and community events.
                    </p>
                    <Button 
                      asChild
                      className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-full"
                    >
                      <a href="#newsletter">Subscribe to Newsletter</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer/>
    </div>
  );
};

export default ContactPage;