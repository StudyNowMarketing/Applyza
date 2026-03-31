# Applyza — SSR Migration Plan & Status

## Architecture Overview

```
study-abroad-navigator/          ← Vite SPA (existing)
  src/                           ← React CSR app
  scripts/
    prerender.mjs                ← Phase 0: Playwright pre-render bridge
    static-routes.mjs            ← List of all static routes
    fetch-dynamic-routes.mjs     ← Fetches blog/course/destination slugs
  nextjs-app/                    ← Phase 1: Next.js App Router (new)
    app/
      study-in/[country]/        ← Programmatic country guides
      vs/[competitor]/           ← Competitor comparison pages
      courses/[subject]/         ← Subject guide pages
    lib/supabase/
      server.ts                  ← Cookie-based SSR client
      client.ts                  ← Browser client (Client Components)
      middleware.ts              ← Session refresh helper
    middleware.ts                ← Auth session refresh on every request
    supabase/migrations/
      001_programmatic_seo_tables.sql  ← New tables for programmatic pages
```

---

## Phase 0 — Static Pre-render Bridge ✅ DONE

**What it does:** Runs Playwright headless browser against the Vite build,
visits every public route, captures the full rendered HTML (with Helmet meta
tags), and writes `dist/{route}/index.html`. Crawlers get real HTML instead
of a blank React shell.

**How to use:**

```bash
# Full build + pre-render in one command
npm run build:seo

# Pre-render only (reuses existing dist/)
npm run prerender
```

**What gets pre-rendered:**
- 25 static public routes (homepage, about, services, guides, etc.)
- Dynamic routes: `/blog/:slug`, `/find-a-course/:slug`, `/study-destinations/:slug`
  (fetched from Supabase — requires env vars)

**Requirements:**
- `@playwright/test` already in devDependencies ✅
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env` for dynamic routes

**Deploy:** Push the `/dist` folder as normal. Each route now has a
pre-rendered `index.html` with correct `<title>`, meta description, OG tags,
and JSON-LD schema.

---

## Phase 1 — Next.js Scaffold ✅ DONE

**What it does:** Runs alongside the Vite SPA as a separate deployment unit.
Houses programmatic SEO pages as React Server Components — real SSR, no
pre-render workarounds needed.

**Setup:**

```bash
cd nextjs-app
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

npm install
npm run dev   # runs on port 3001
```

**Run migration in Supabase:**
Paste `supabase/migrations/001_programmatic_seo_tables.sql` into the
Supabase SQL Editor to create the `competitor_comparisons` and
`course_subjects` tables (seeded with initial data).

**Programmatic pages:**

| Route | Template | Description |
|-------|----------|-------------|
| `/study-in/[country]` | `app/study-in/[country]/page.tsx` | Country guides from `study_destinations` table |
| `/vs/[competitor]` | `app/vs/[competitor]/page.tsx` | Competitor comparisons from `competitor_comparisons` table |
| `/courses/[subject]` | `app/courses/[subject]/page.tsx` | Subject guides from `course_subjects` table |

**Seeded competitor pages:**
- `/vs/idp-education`
- `/vs/si-uk`
- `/vs/kaplan-international`

**Seeded course pages:**
- `/courses/medicine`
- `/courses/law`
- `/courses/mba`
- `/courses/computer-science`
- `/courses/nursing`

---

## Phase 2 — Migrate Existing Pages (Next Steps)

Priority order for migrating existing Vite pages to Next.js:

1. **Homepage** (`/`) — highest traffic, most SEO value
2. **Blog index + BlogPost** (`/blog`, `/blog/:slug`) — content SEO
3. **Services pages** — University Applications, Visa, Counselling, Accommodation
4. **Guide pages** — HowToChooseConsultancy, FreeVsPaidConsultancies, AQFCertification
5. **Study Destinations** (`/study-destinations`, `/study-destinations/:slug`)
6. **Find a Course** (`/find-a-course`, `/find-a-course/:slug`)

**Key migration challenges:**
- `AuthContext` uses `localStorage` via Supabase — replace with `@supabase/ssr`
  cookie-based auth in middleware
- Three.js / R3F Scene — wrap in `dynamic(() => import(...), { ssr: false })`
- Lenis smooth scroll — same dynamic import treatment
- GSAP animations — safe in Client Components with `useEffect`
- `framer-motion` — use `motion` from `framer-motion`, works with Next.js

---

## Phase 3 — Full Consolidation

- Migrate admin section (ProtectedRoute → Next.js middleware auth gates)
- Decommission Vite SPA
- Single Next.js deployment on Vercel

---

## Deployment Strategy

**Option A: Subdomain split (recommended while migrating)**
```
applyza.com          → Vite SPA (existing Vercel project)
next.applyza.com     → Next.js App (new Vercel project)
```
Use Vercel rewrites at the CDN edge to proxy `/study-in/*`, `/vs/*`,
`/courses/*` from `next.applyza.com` → appearing at `applyza.com`.

**Option B: Path-based on one domain (after full migration)**
```
applyza.com          → Next.js App (single Vercel project)
```

---

## Browser API Risk Register

Files that use browser-only APIs and need `ssr: false` or `useEffect` guards:

| File | API | Migration approach |
|------|-----|--------------------|
| `src/integrations/supabase/client.ts` | `localStorage` | Replace with `@supabase/ssr` |
| `src/contexts/AuthContext.tsx` | `localStorage` | Replace with middleware + server client |
| `src/components/3d/Scene.tsx` | `WebGL` / R3F | `dynamic(..., { ssr: false })` ✅ guarded |
| `src/components/ChatWidget.tsx` | `window`, `sessionStorage` | `dynamic(..., { ssr: false })` |
| `src/components/ScrollAnimator.tsx` | `IntersectionObserver` | Already in `useEffect` ✅ |
| `src/lib/sanitize.ts` | `sessionStorage` | `useEffect` guard or server-side equivalent |
