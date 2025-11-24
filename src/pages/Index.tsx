import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Mixtapes from "@/components/Mixtapes";
import About from "@/components/About";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Mixtapes />
      <About />
      <Events />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
