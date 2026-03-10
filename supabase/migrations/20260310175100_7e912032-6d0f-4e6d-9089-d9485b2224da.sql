
CREATE TABLE public.study_destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL,
  slug text UNIQUE NOT NULL,
  overview text,
  language text,
  degree_duration text,
  tuition_range text,
  post_study_visa text,
  top_cities text,
  why_study_here_1_title text,
  why_study_here_1_desc text,
  why_study_here_2_title text,
  why_study_here_2_desc text,
  why_study_here_3_title text,
  why_study_here_3_desc text,
  why_study_here_4_title text,
  why_study_here_4_desc text,
  visa_requirements text,
  visa_fee text,
  visa_work_rights text,
  cost_city_1 text,
  cost_city_2 text,
  cost_city_3 text,
  partner_count integer,
  status text DEFAULT 'published',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.study_destinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published destinations"
  ON public.study_destinations
  FOR SELECT
  TO public
  USING (status = 'published');
