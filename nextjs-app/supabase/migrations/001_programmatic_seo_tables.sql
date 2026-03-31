-- ============================================================
-- Applyza Programmatic SEO Tables (Phase 1 — Next.js App)
-- Run in Supabase SQL Editor or via `supabase db push`
-- ============================================================

-- ── competitor_comparisons ────────────────────────────────
-- Powers /vs/[competitor] pages

create table if not exists public.competitor_comparisons (
  id                     uuid primary key default gen_random_uuid(),
  slug                   text not null unique,
  name                   text not null,
  tagline                text,
  their_fee_model        text not null default 'Varies — may charge students',
  our_fee_model          text not null default '100% free for students — universities pay us',
  their_aqf              boolean not null default false,
  their_university_count integer,
  our_university_count   integer not null default 200,
  their_services         text[] not null default '{}',
  our_services           text[] not null default '{}',
  verdict                text,
  faq                    jsonb,
  status                 text not null default 'published' check (status in ('published','draft')),
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

-- ── course_subjects ───────────────────────────────────────
-- Powers /courses/[subject] pages

create table if not exists public.course_subjects (
  id                      uuid primary key default gen_random_uuid(),
  slug                    text not null unique,
  name                    text not null,
  description             text,
  overview                text,
  why_study               text,
  top_countries           text[] not null default '{}',
  top_universities        text[] not null default '{}',
  career_outcomes         text[] not null default '{}',
  average_duration        text,
  average_tuition_range   text,
  entry_requirements      text,
  faq                     jsonb,
  status                  text not null default 'published' check (status in ('published','draft')),
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

-- ── RLS policies ──────────────────────────────────────────

alter table public.competitor_comparisons enable row level security;
alter table public.course_subjects enable row level security;

-- Public read access for published rows
create policy "Public can read published competitors"
  on public.competitor_comparisons for select
  using (status = 'published');

create policy "Public can read published subjects"
  on public.course_subjects for select
  using (status = 'published');

-- ── Seed: competitor comparison rows ─────────────────────

insert into public.competitor_comparisons
  (slug, name, tagline, their_fee_model, their_aqf, their_university_count, their_services, verdict)
values
  (
    'idp-education',
    'IDP Education',
    'Large global network, fee varies by region',
    'Free for some services; fees apply for premium packages in some regions',
    false,
    750,
    array['University applications','IELTS test centre','Visa processing','Accommodation help'],
    'IDP is a well-known brand with a large university network. However, some services carry fees and IDP is not AQF-certified. Applyza offers a comparable service completely free, with AQF government-regulated quality assurance.'
  ),
  (
    'si-uk',
    'SI-UK',
    'UK-focused, premium positioning',
    'Charges students a service fee (typically £150–£400)',
    false,
    150,
    array['UK university applications','Visa advice','Personal statement help','Scholarship guidance'],
    'SI-UK specialises in UK university applications and charges students a direct fee. Applyza covers the same UK application process — plus international destinations — entirely free of charge, and holds AQF certification from the British Council.'
  ),
  (
    'kaplan-international',
    'Kaplan International',
    'Language schools and pathway programmes',
    'Tuition-based (pathway programmes); application support free',
    false,
    null,
    array['Language courses','Pathway programmes','University progression','Visa support'],
    'Kaplan and Applyza serve different needs: Kaplan primarily sells language courses and pathways, while Applyza focuses on direct university degree applications. If you already meet entry requirements, Applyza gets you to a top university faster and at no cost.'
  )
on conflict (slug) do nothing;

-- ── Seed: course subject rows ─────────────────────────────

insert into public.course_subjects
  (slug, name, description, top_countries, top_universities, career_outcomes, average_duration, average_tuition_range)
values
  (
    'medicine',
    'Medicine',
    'Study medicine abroad and qualify as a doctor recognised worldwide. Explore MBBS and MD programmes across the UK, Europe and beyond.',
    array['United Kingdom','Ireland','Germany','Poland','Hungary'],
    array['University of Edinburgh','University of Glasgow','RCSI Dublin','Semmelweis University','Jagiellonian University'],
    array['General Practitioner','Hospital Specialist','Surgeon','Medical Researcher','Public Health Doctor'],
    '5–6 years',
    '£8,000–£38,000/year'
  ),
  (
    'law',
    'Law',
    'Earn an LLB or LLM from a top international university. Study English law, international law, or comparative law in the UK, US, Canada or Australia.',
    array['United Kingdom','United States','Canada','Australia','Netherlands'],
    array['University of Oxford','University of Cambridge','LSE','University of Toronto','University of Melbourne'],
    array['Barrister','Solicitor','Corporate Lawyer','International Law Advisor','Legal Consultant'],
    '3 years (LLB), 1 year (LLM)',
    '£15,000–£45,000/year'
  ),
  (
    'mba',
    'MBA',
    'Accelerate your business career with a globally-recognised MBA. Compare programmes in the UK, US, Canada and beyond.',
    array['United Kingdom','United States','Canada','Australia','Singapore'],
    array['London Business School','Wharton','Harvard Business School','INSEAD','Rotman School'],
    array['Management Consultant','Investment Banker','Entrepreneur','Operations Director','Strategy Lead'],
    '1–2 years',
    '£25,000–£90,000'
  ),
  (
    'computer-science',
    'Computer Science',
    'Study computer science at a world-leading university. Choose from BSc, MSc and MEng programmes specialising in AI, cybersecurity, software engineering and more.',
    array['United Kingdom','United States','Canada','Germany','Australia'],
    array['University of Cambridge','Imperial College London','University of Toronto','ETH Zurich','University of Melbourne'],
    array['Software Engineer','Data Scientist','AI/ML Engineer','Cybersecurity Analyst','Product Manager'],
    '3–4 years (BSc), 1 year (MSc)',
    '£18,000–£38,000/year'
  ),
  (
    'nursing',
    'Nursing',
    'Qualify as a registered nurse overseas with a globally-recognised degree. Study in the UK, Australia or Ireland and fast-track your nursing career.',
    array['United Kingdom','Australia','Ireland','Canada','New Zealand'],
    array['King''s College London','University of Manchester','University of Sydney','University of Melbourne','University of Auckland'],
    array['Registered Nurse','Specialist Nurse','Nursing Manager','Community Health Nurse','Nurse Educator'],
    '3 years',
    '£9,250–£18,000/year'
  )
on conflict (slug) do nothing;
