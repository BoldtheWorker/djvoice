-- Create storage bucket for site images
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true);

-- Create media library table to track all site images
CREATE TABLE public.media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  category VARCHAR(50) NOT NULL, -- 'hero', 'logo', 'mixtape', 'portfolio', 'event', 'other'
  alt_text TEXT,
  width INTEGER,
  height INTEGER,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

-- Public can view media
CREATE POLICY "Public can view media"
ON public.media_library
FOR SELECT
USING (true);

-- Admins can manage media
CREATE POLICY "Admins can manage media"
ON public.media_library
FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Storage policies for site-images bucket
CREATE POLICY "Public can view site images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'site-images');

CREATE POLICY "Admins can upload site images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'));

-- Trigger to update updated_at
CREATE TRIGGER update_media_library_updated_at
BEFORE UPDATE ON public.media_library
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();