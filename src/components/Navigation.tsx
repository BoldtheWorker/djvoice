import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import djLogo from "@/assets/dj-voice-logo.jpg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Mixtapes", href: "#mixtapes" },
    { name: "About", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <img 
              src={djLogo} 
              alt="DJ Voice GH Logo" 
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-foreground">DJ VOICE GH</h1>
              <p className="text-xs text-muted-foreground">The Tune Murderer</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {link.name}
              </a>
            ))}
            <Button variant="default" className="bg-primary hover:bg-primary/90 shadow-red-glow">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button variant="default" className="w-full bg-primary hover:bg-primary/90">
              Book Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
