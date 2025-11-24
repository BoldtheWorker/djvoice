-- Phase 1 & 2 Database Schema

-- Mixtapes table
CREATE TABLE IF NOT EXISTS public.mixtapes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  cover_url TEXT,
  audio_url TEXT,
  duration INTEGER,
  genre VARCHAR(100),
  vibe VARCHAR(50), -- 'warm-up', 'peak-hour', 'late-night', 'chill', 'high-energy', 'deep', 'party', 'melodic', 'dark'
  release_date DATE DEFAULT CURRENT_DATE,
  tracklist JSONB,
  download_count INTEGER DEFAULT 0,
  play_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT NOT NULL,
  attendance INTEGER,
  budget_range VARCHAR(50),
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  category VARCHAR(100),
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio items table
CREATE TABLE IF NOT EXISTS public.portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'photo', 'video', 'flyer'
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  event_name VARCHAR(255),
  event_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email subscribers table (Phase 2)
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  source VARCHAR(100), -- 'download', 'newsletter', 'booking'
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  preferences JSONB
);

-- Listening analytics table (Phase 2)
CREATE TABLE IF NOT EXISTS public.listen_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mixtape_id UUID REFERENCES public.mixtapes(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  event_type VARCHAR(50), -- 'play', 'pause', 'seek', 'complete'
  position INTEGER,
  user_agent TEXT,
  geo_country VARCHAR(100),
  geo_city VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quote calculations table (Phase 2)
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100),
  duration_hours INTEGER,
  distance_km INTEGER,
  date_type VARCHAR(50),
  equipment_included BOOLEAN,
  estimated_min INTEGER,
  estimated_max INTEGER,
  converted_to_booking BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Continue listening progress (Phase 2)
CREATE TABLE IF NOT EXISTS public.listening_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) NOT NULL,
  mixtape_id UUID REFERENCES public.mixtapes(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, mixtape_id)
);

-- Enable RLS on all tables
ALTER TABLE public.mixtapes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listen_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listening_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access (all data is public for a DJ website)
CREATE POLICY "Public read mixtapes" ON public.mixtapes FOR SELECT USING (true);
CREATE POLICY "Public read posts" ON public.posts FOR SELECT USING (published = true);
CREATE POLICY "Public read portfolio" ON public.portfolio FOR SELECT USING (true);

-- RLS Policies for public inserts (anyone can submit bookings, subscribe, track analytics)
CREATE POLICY "Public insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert subscribers" ON public.subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert listen_events" ON public.listen_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert quotes" ON public.quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public upsert listening_progress" ON public.listening_progress FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX idx_mixtapes_slug ON public.mixtapes(slug);
CREATE INDEX idx_mixtapes_vibe ON public.mixtapes(vibe);
CREATE INDEX idx_mixtapes_featured ON public.mixtapes(featured);
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_posts_published ON public.posts(published);
CREATE INDEX idx_listen_events_mixtape ON public.listen_events(mixtape_id);
CREATE INDEX idx_listening_progress_session ON public.listening_progress(session_id);

-- Trigger to update updated_at on posts
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();