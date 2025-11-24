-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  venue VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  event_time VARCHAR(100),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Public can read events
CREATE POLICY "Public read events"
ON public.events
FOR SELECT
USING (true);

-- Admins can manage events
CREATE POLICY "Admins can manage events"
ON public.events
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));