
ALTER TABLE public.eligibility_leads
  ADD COLUMN IF NOT EXISTS age_range text,
  ADD COLUMN IF NOT EXISTS grade_classification text,
  ADD COLUMN IF NOT EXISTS study_gap text,
  ADD COLUMN IF NOT EXISTS study_gap_reason text,
  ADD COLUMN IF NOT EXISTS english_test text,
  ADD COLUMN IF NOT EXISTS english_score text,
  ADD COLUMN IF NOT EXISTS study_level text,
  ADD COLUMN IF NOT EXISTS needs_scholarship text,
  ADD COLUMN IF NOT EXISTS visa_refused text,
  ADD COLUMN IF NOT EXISTS visa_refused_country text,
  ADD COLUMN IF NOT EXISTS current_visa text,
  ADD COLUMN IF NOT EXISTS preferred_start text;
