import { Award, Users, Headphones, Calendar } from "lucide-react";
import djLogo from "@/assets/dj-voice-logo.jpg";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const About = () => {
  // Fetch real statistics from database
  const { data: stats } = useQuery({
    queryKey: ['site-stats'],
    queryFn: async () => {
      const [subscribersResult, mixtapesResult, eventsResult] = await Promise.all([
        supabase.from('subscribers').select('id', { count: 'exact', head: true }),
        supabase.from('mixtapes').select('id', { count: 'exact', head: true }),
        supabase.from('events').select('id', { count: 'exact', head: true }),
      ]);

      return {
        subscribers: subscribersResult.count || 0,
        mixtapes: mixtapesResult.count || 0,
        events: eventsResult.count || 0,
      };
    },
  });

  const achievements = [
    {
      icon: <Award className="text-primary" size={32} />,
      title: "Award Winner",
      description: "Best DJ in Ghana 2023",
    },
    {
      icon: <Users className="text-primary" size={32} />,
      title: `${stats?.subscribers || 0}+ Fans`,
      description: "Growing community worldwide",
    },
    {
      icon: <Headphones className="text-primary" size={32} />,
      title: `${stats?.mixtapes || 0}+ Mixtapes`,
      description: "Released since 2020",
    },
    {
      icon: <Calendar className="text-primary" size={32} />,
      title: `${stats?.events || 0}+ Events`,
      description: "Performed across Ghana",
    },
  ];

  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden border-2 border-primary shadow-red-glow">
              <img 
                src={djLogo}
                alt="DJ Voice GH"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
          </div>

          {/* Content Side */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-foreground font-medium">About Me</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet <span className="text-primary">The Tune Murderer</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground mb-8">
              <p className="text-lg leading-relaxed">
                DJ Voice GH, also known as "The Tune Murderer," is one of Ghana's most celebrated DJs, 
                known for delivering electrifying performances that set dance floors on fire.
              </p>
              <p className="text-lg leading-relaxed">
                With over 5 years of experience in the industry, DJ Voice GH has mastered the art of 
                reading crowds and creating unforgettable musical experiences. From intimate gatherings 
                to massive festivals, every set is crafted with passion and precision.
              </p>
              <p className="text-lg leading-relaxed">
                Specializing in Afrobeat, Hip Hop, Dancehall, and House music, DJ Voice GH brings 
                together diverse sounds to create unique sonic journeys that resonate with audiences 
                across all demographics.
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((item, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
