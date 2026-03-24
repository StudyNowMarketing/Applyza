CREATE TABLE public.eligibility_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  country TEXT,
  education_level TEXT,
  subjects TEXT,
  destinations TEXT,
  budget TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.eligibility_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert eligibility leads"
  ON public.eligibility_leads
  FOR INSERT
  TO anon, public
  WITH CHECK (true);

CREATE POLICY "Authenticated can read eligibility leads"
  ON public.eligibility_leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update eligibility leads"
  ON public.eligibility_leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);