/**
 * Supabase client for Client Components ("use client") in Next.js.
 * Uses browser cookies (not localStorage) so auth state is shared with the
 * server-side session — no hydration mismatch.
 */

"use client";

import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
