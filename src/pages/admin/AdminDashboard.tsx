import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Image, FileText, Calendar, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    mixtapes: 0,
    portfolio: 0,
    posts: 0,
    bookings: 0,
    subscribers: 0,
    totalPlays: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [mixtapes, portfolio, posts, bookings, subscribers, plays] = await Promise.all([
      supabase.from("mixtapes").select("id", { count: "exact", head: true }),
      supabase.from("portfolio").select("id", { count: "exact", head: true }),
      supabase.from("posts").select("id", { count: "exact", head: true }),
      supabase.from("bookings").select("id", { count: "exact", head: true }),
      supabase.from("subscribers").select("id", { count: "exact", head: true }),
      supabase.from("mixtapes").select("play_count"),
    ]);

    const totalPlays = plays.data?.reduce((sum, m) => sum + (m.play_count || 0), 0) || 0;

    setStats({
      mixtapes: mixtapes.count || 0,
      portfolio: portfolio.count || 0,
      posts: posts.count || 0,
      bookings: bookings.count || 0,
      subscribers: subscribers.count || 0,
      totalPlays,
    });
  };

  const statCards = [
    { icon: Music, label: "Mixtapes", value: stats.mixtapes, color: "text-cyan-500" },
    { icon: Image, label: "Portfolio Items", value: stats.portfolio, color: "text-purple-500" },
    { icon: FileText, label: "Blog Posts", value: stats.posts, color: "text-green-500" },
    { icon: Calendar, label: "Bookings", value: stats.bookings, color: "text-orange-500" },
    { icon: Users, label: "Subscribers", value: stats.subscribers, color: "text-blue-500" },
    { icon: TrendingUp, label: "Total Plays", value: stats.totalPlays, color: "text-pink-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
