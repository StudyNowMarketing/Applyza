-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  university_name TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  subject_area TEXT NOT NULL,
  study_level TEXT NOT NULL,
  duration TEXT,
  tuition_fee INTEGER,
  intake_dates TEXT,
  entry_requirements TEXT,
  english_requirements TEXT,
  description TEXT,
  scholarship_available BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published courses
CREATE POLICY "Anyone can view published courses"
  ON public.courses
  FOR SELECT
  USING (status = 'published');

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();