
-- Table 1: institution_enquiries
CREATE TABLE public.institution_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_name text NOT NULL,
  contact_name text NOT NULL,
  job_title text,
  email text NOT NULL,
  phone text,
  country text,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.institution_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert institution enquiries"
ON public.institution_enquiries
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Authenticated users can read institution enquiries"
ON public.institution_enquiries
FOR SELECT
TO authenticated
USING (true);

-- Table 2: partner_enquiries
CREATE TABLE public.partner_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company_name text,
  email text NOT NULL,
  phone text,
  country text,
  students_per_year text,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.partner_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert partner enquiries"
ON public.partner_enquiries
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Authenticated users can read partner enquiries"
ON public.partner_enquiries
FOR SELECT
TO authenticated
USING (true);
