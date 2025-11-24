import { Music } from "lucide-react";
import MixtapeCard from "./MixtapeCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Mixtapes = () => {
  const [mixtapes, setMixtapes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMixtapes();
  }, []);

  const loadMixtapes = async () => {
    const { data, error } = await supabase
      .from("mixtapes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMixtapes(data);
    }
    setLoading(false);
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="mixtapes" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
            <Music className="text-primary" size={20} />
            <span className="text-foreground font-medium">Latest Releases</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Exclusive <span className="text-primary">Mixtapes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stream and download the hottest mixtapes curated by DJ Voice GH. 
            From club bangers to chill vibes, there's something for every mood.
          </p>
        </div>

        {/* Mixtapes Grid */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading mixtapes...
          </div>
        ) : mixtapes.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No mixtapes available yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mixtapes.map((mixtape) => (
              <MixtapeCard 
                key={mixtape.id} 
                title={mixtape.title}
                description={mixtape.genre || mixtape.vibe || ""}
                duration={formatDuration(mixtape.duration)}
                date={formatDate(mixtape.release_date)}
                image={mixtape.cover_url || "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80"}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Mixtapes;
