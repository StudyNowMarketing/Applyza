
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  date date NOT NULL,
  location text,
  city text,
  country text,
  description text,
  registration_url text,
  status text DEFAULT 'published',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published events"
ON public.events FOR SELECT TO public
USING (status = 'published');

CREATE POLICY "Authenticated full access events"
ON public.events FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE TABLE public.scholarships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  university_name text NOT NULL,
  country text,
  amount text,
  study_level text,
  eligibility text,
  deadline text,
  description text,
  status text DEFAULT 'published',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published scholarships"
ON public.scholarships FOR SELECT TO public
USING (status = 'published');

CREATE POLICY "Authenticated full access scholarships"
ON public.scholarships FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE TABLE public.event_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.event_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to events"
ON public.event_subscribers FOR INSERT TO public
WITH CHECK (true);

CREATE POLICY "Authenticated can read subscribers"
ON public.event_subscribers FOR SELECT TO authenticated
USING (true);
