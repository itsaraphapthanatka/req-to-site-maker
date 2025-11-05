import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import facebook from "@/assets/social/facebook.png";
import instagram from "@/assets/social/instagram.png";
import line from "@/assets/social/line.png";
import youtube from "@/assets/social/youtube.png";
import tiktok from "@/assets/social/tiktok.png";
import twitter from "@/assets/social/twitter.png";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Factory Address",
      details: ["SARANYA CLOTHING Factory", "Bangkok, Thailand"],
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: ["02-XXX-XXXX", "089-XXX-XXXX"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@saranyaclothing.com", "sales@saranyaclothing.com"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Monday - Friday: 8:00 - 17:00", "Saturday: 8:00 - 12:00"],
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to answer any questions you have.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="p-8 shadow-elegant">
            <h3 className="text-2xl font-bold mb-6">Quote Request</h3>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name">Name-Surname *</Label>
                <Input id="name" placeholder="Enter your name" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="example@email.com" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="08X-XXX-XXXX" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="type">Product Type *</Label>
                <Input id="type" placeholder="T-shirt, pants, dress, etc." className="mt-2" />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity / Size *</Label>
                <Input id="quantity" placeholder="e.g. 100-500 pieces" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="service">Service Type *</Label>
                <select
                  id="service"
                  className="w-full mt-2 px-3 py-2 border border-input rounded-lg bg-background"
                >
                  <option value="">Select Service</option>
                  <option value="odm">ODM - Design and produce full cycle</option>
                  <option value="oem">OEM - Produce according to the customer's model</option>
                </select>
              </div>
              <div>
                <Label htmlFor="message">Additional Details</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project..."
                  className="mt-2 min-h-32"
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send Quote Request
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, idx) => (
              <Card key={idx} className="p-6 hover:shadow-soft transition-smooth">
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-primary/10 mr-4">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{info.title}</h4>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </Card>
            ))}

            {/* Social Links */}
            <Card className="p-6">
              <h4 className="font-bold text-lg mb-4">Contact via other channels</h4>
              <div className="mt-4 flex space-x-2">
              <div className="flex flex-wrap gap-3">
                <a href="https://www.facebook.com/saranyaclothing" target="_blank" rel="noopener noreferrer">
                  <img src={facebook} alt="Facebook" className="w-8 h-8" />
                </a>
                <a href="https://www.instagram.com/saranyaclothing" target="_blank" rel="noopener noreferrer">
                  <img src={instagram} alt="Instagram" className="w-8 h-8" />
                </a>
                <a href="https://line.me/R/ti/p/%40saranyaclothing" target="_blank" rel="noopener noreferrer">
                  <img src={line} alt="Line" className="w-8 h-8" />
                </a>
                <a href="https://www.youtube.com/saranyaclothing" target="_blank" rel="noopener noreferrer">
                  <img src={youtube} alt="YouTube" className="w-8 h-8" />
                </a>
                <a href="https://www.tiktok.com/@saranyaclothing" target="_blank" rel="noopener noreferrer">
                  <img src={tiktok} alt="TikTok" className="w-8 h-8" />
                </a>
                <a href="https://twitter.com/saranyaclothing" target="_blank" rel="noopener noreferrer">
                  <img src={twitter} alt="Twitter" className="w-8 h-8" />
                </a>
              </div>
               
              </div>
            </Card>

            {/* Map Placeholder */}
            <Card className="p-6">
              <h4 className="font-bold text-lg mb-4">Map</h4>
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Google Maps</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
