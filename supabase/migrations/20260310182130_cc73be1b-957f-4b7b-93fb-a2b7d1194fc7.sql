
-- Courses: authenticated full access (currently only public SELECT exists)
CREATE POLICY "Authenticated full access courses"
ON public.courses FOR ALL TO authenticated
USING (true) WITH CHECK (true);

-- Blog posts already have authenticated full access

-- Events already have authenticated full access

-- Scholarships already have authenticated full access
