# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start dev server on localhost:8080
npm run build        # Production build (tsc + vite build)
npm run build:dev    # Development build
npm run lint         # ESLint check
npm run test         # Run tests once (Vitest)
npm run test:watch   # Run tests in watch mode
npm run preview      # Preview production build
```

Run a single test file: `npx vitest run src/path/to/file.test.ts`

E2E tests use Playwright: `npx playwright test`

## Environment Variables

Required in `.env` (all prefixed with `VITE_` for Vite exposure):
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` — Supabase anon/public key
- `VITE_SUPABASE_PROJECT_ID` — Supabase project ID

## Architecture

**Stack:** React 18 + TypeScript + Vite SPA with Supabase (PostgreSQL) backend. UI built with shadcn/ui (Radix primitives + Tailwind CSS).

### Backend Integration

Single Supabase client in `src/integrations/supabase/client.ts`. Auto-generated TypeScript types in `src/integrations/supabase/types.ts` define the schema for all 10 database tables.

All data fetching uses TanStack Query (`useQuery`/`useMutation`) calling `supabase.from(table)` directly in page components — there is no API layer or service abstraction. Cache invalidation happens via `queryClient.invalidateQueries()` in mutation `onSuccess` callbacks.

### Authentication

Supabase email/password auth managed through `src/contexts/AuthContext.tsx`. The `useAuth()` hook provides session/user state. Admin routes (`/admin/*`) are guarded by `src/components/admin/ProtectedRoute.tsx` which redirects unauthenticated users to `/admin/login`.

### Database Schema (10 tables)

**Content tables** (admin CRUD, public read where `status='published'`):
- `courses`, `blog_posts`, `events`, `scholarships`, `study_destinations`

**Form submission tables** (public insert, admin read/update status):
- `consultation_requests`, `contact_messages`, `institution_enquiries`, `partner_enquiries`, `event_subscribers`

All tables use UUID primary keys, RLS is enabled on every table. No foreign key relationships — tables connect implicitly by fields like `country`.

Database migrations live in `supabase/migrations/`. One edge function exists: `supabase/functions/sitemap/` (generates XML sitemap).

### Form Security

Public forms use a two-layer protection system:
1. **Sanitization** (`src/lib/sanitize.ts`): HTML stripping, character escaping, field length limits
2. **Rate limiting** (`src/hooks/useFormProtection.ts`): 3 submissions per 5 minutes, 60-second cooldown, email-based duplicate prevention via sessionStorage

### Routing

Public pages and admin pages are defined in `src/App.tsx`. Admin pages follow a CRUD pattern: list page (`AdminCourses`) + form page (`AdminCourseForm`) for each content type. The provider hierarchy is: HelmetProvider → QueryClientProvider → AuthProvider → TooltipProvider → ErrorBoundary.

### Path Alias

`@` maps to `./src` (configured in both `vite.config.ts` and `tsconfig.json`). Use `@/components/...`, `@/pages/...`, etc.

## Code Conventions

- shadcn/ui components live in `src/components/ui/` — add new ones via the shadcn CLI, don't hand-write them
- Form validation uses Zod schemas colocated in page components
- Toast notifications use Sonner (`sonner` package) via the `toast()` function
- TypeScript is configured non-strictly (`noImplicitAny: false`, `strictNullChecks: false`)
- `@typescript-eslint/no-unused-vars` is disabled in ESLint config
- Dark mode uses class-based toggling via `next-themes`
- Custom font: Plus Jakarta Sans (configured in `tailwind.config.ts`)
