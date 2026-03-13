
-- Create page_seo table
CREATE TABLE public.page_seo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text UNIQUE NOT NULL,
  page_name text NOT NULL,
  title text,
  description text,
  og_image text,
  focus_keyword text,
  updated_at timestamptz DEFAULT now(),
  updated_by text
);

ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read page_seo" ON public.page_seo FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert page_seo" ON public.page_seo FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update page_seo" ON public.page_seo FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public can read page_seo" ON public.page_seo FOR SELECT TO public USING (true);

-- Create page_content table
CREATE TABLE public.page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL,
  section_key text NOT NULL,
  content text,
  updated_at timestamptz DEFAULT now(),
  updated_by text,
  UNIQUE (page_slug, section_key)
);

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read page_content" ON public.page_content FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert page_content" ON public.page_content FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update page_content" ON public.page_content FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public can read page_content" ON public.page_content FOR SELECT TO public USING (true);

-- Create admin_users table (NOT referencing auth.users)
CREATE TABLE public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  role text NOT NULL DEFAULT 'editor',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read admin_users" ON public.admin_users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert admin_users" ON public.admin_users FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update admin_users" ON public.admin_users FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete admin_users" ON public.admin_users FOR DELETE TO authenticated USING (true);
