import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon!",
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="text-primary" size={24} />,
      title: "Email",
      info: "djvoicegh548@gmail.com",
      link: "mailto:djvoicegh548@gmail.com",
    },
    {
      icon: <Phone className="text-primary" size={24} />,
      title: "Phone",
      info: "+233 55 031 8587",
      link: "https://wa.me/233550318587",
    },
    {
      icon: <MapPin className="text-primary" size={24} />,
      title: "Location",
      info: "Akosombo, Ghana",
      link: "#",
    },
  ];

  const socialLinks = [
    { icon: <Instagram size={24} />, href: "https://www.instagram.com/djvoice_gh?igsh=MTEyamt1OWk5dnRvbA%3D%3D&utm_source=qr", label: "Instagram" },
    { icon: <Music size={24} />, href: "https://www.tiktok.com/@dj.voice.gh", label: "TikTok" },
    { icon: <Facebook size={24} />, href: "https://www.facebook.com/djvoicegh", label: "Facebook" },
    { icon: <Twitter size={24} />, href: "https://twitter.com/djvoicegh", label: "Twitter" },
    { icon: <Youtube size={24} />, href: "https://www.youtube.com/@djvoicegh", label: "YouTube" },
  ];

  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
            <Mail className="text-primary" size={20} />
            <span className="text-foreground font-medium">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Book Your <span className="text-primary">Event</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to make your event unforgettable? Contact us today to discuss your booking.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="p-8 bg-card border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    First Name
                  </label>
                  <Input
                    placeholder="John"
                    required
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Last Name
                  </label>
                  <Input
                    placeholder="Doe"
                    required
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="bg-background border-border"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Phone
                </label>
                <Input
                  type="tel"
                  placeholder="+233 XX XXX XXXX"
                  required
                  className="bg-background border-border"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Event Date
                </label>
                <Input
                  type="date"
                  required
                  className="bg-background border-border"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Message
                </label>
                <Textarea
                  placeholder="Tell us about your event..."
                  required
                  rows={4}
                  className="bg-background border-border resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 shadow-red-glow"
                size="lg"
              >
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <Card key={index} className="p-6 bg-card border-border hover:shadow-card-hover transition-all duration-300">
                  <a href={item.link} className="flex items-center gap-4 group">
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/30 group-hover:bg-primary/20 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.info}</p>
                    </div>
                  </a>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <Card className="p-8 bg-card border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">Follow Us</h3>
              <p className="text-muted-foreground mb-6">
                Stay updated with the latest mixtapes, events, and news.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-3 bg-primary/10 rounded-lg border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </Card>

            {/* Business Hours */}
            <Card className="p-8 bg-card border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">Business Hours</h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-foreground font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-foreground font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-foreground font-medium">Closed</span>
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
