import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });

    if (error) {
      console.error("Error loading events:", error);
    } else {
      setUpcomingEvents(data || []);
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <section id="events" className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
            <Calendar className="text-primary" size={20} />
            <span className="text-foreground font-medium">Upcoming Shows</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Live <span className="text-primary">Events</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't miss the chance to experience DJ Voice GH live. Book your spot at these upcoming events.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {upcomingEvents.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
            </div>
          ) : (
            upcomingEvents.map((event) => (
              <Card key={event.id} className="bg-card border-border overflow-hidden group hover:shadow-card-hover transition-all duration-300">
                {/* Event Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={event.image_url || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-overlay"></div>
                  <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full">
                    <span className="text-primary-foreground text-sm font-bold">LIVE</span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin size={18} className="text-primary" />
                      <span className="text-sm">{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar size={18} className="text-primary" />
                      <span className="text-sm">{formatDate(event.event_date)}</span>
                    </div>
                    {event.event_time && (
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock size={18} className="text-primary" />
                        <span className="text-sm">{event.event_time}</span>
                      </div>
                    )}
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 shadow-red-glow"
                    onClick={() => event.event_link && window.open(event.event_link, '_blank')}
                    disabled={!event.event_link}
                  >
                    <Ticket size={18} className="mr-2" />
                    Get Tickets
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Want to book DJ Voice GH for your private event or party?
          </p>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Book for Your Event
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
