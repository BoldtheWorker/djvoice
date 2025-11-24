-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policy for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Update mixtapes policies for admin
CREATE POLICY "Admins can manage mixtapes"
ON public.mixtapes
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update portfolio policies for admin
CREATE POLICY "Admins can manage portfolio"
ON public.portfolio
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update posts policies for admin
CREATE POLICY "Admins can manage posts"
ON public.posts
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update bookings policies for admin
CREATE POLICY "Admins can view bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update bookings"
ON public.bookings
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete bookings"
ON public.bookings
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Update subscribers policies for admin
CREATE POLICY "Admins can view subscribers"
ON public.subscribers
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage subscribers"
ON public.subscribers
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update listen_events policies for admin
CREATE POLICY "Admins can view listen_events"
ON public.listen_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Update quotes policies for admin
CREATE POLICY "Admins can view quotes"
ON public.quotes
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));