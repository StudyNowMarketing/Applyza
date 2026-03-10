ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS modules text,
  ADD COLUMN IF NOT EXISTS career_prospects text,
  ADD COLUMN IF NOT EXISTS scholarship_details text,
  ADD COLUMN IF NOT EXISTS application_deadline text,
  ADD COLUMN IF NOT EXISTS source_url text;