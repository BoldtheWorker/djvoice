import { Music2, Mail, Phone, MapPin } from "lucide-react";
import djLogo from "@/assets/dj-voice-logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: "Home", href: "#home" },
      { name: "Mixtapes", href: "#mixtapes" },
      { name: "About", href: "#about" },
      { name: "Events", href: "#events" },
      { name: "Contact", href: "#contact" },
    ],
    services: [
      { name: "Wedding DJ", href: "#" },
      { name: "Corporate Events", href: "#" },
      { name: "Private Parties", href: "#" },
      { name: "Club Nights", href: "#" },
      { name: "Festival Performances", href: "#" },
    ],
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={djLogo} alt="DJ Voice GH" className="h-16 w-auto" />
              <div>
                <h3 className="text-xl font-bold text-foreground">DJ VOICE GH</h3>
                <p className="text-sm text-primary">The Tune Murderer</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Ghana's premier DJ bringing unforgettable musical experiences to every event. 
              From intimate gatherings to massive festivals, we deliver excellence.
            </p>
            <div className="space-y-3">
              <a href="mailto:djvoicegh548@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail size={18} />
                <span className="text-sm">djvoicegh548@gmail.com</span>
              </a>
              <a href="https://wa.me/233550318587" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone size={18} />
                <span className="text-sm">+233 55 031 8587</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={18} />
                <span className="text-sm">Akosombo, Ghana</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} DJ Voice GH. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
