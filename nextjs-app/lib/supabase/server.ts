/**
 * Supabase client for use in Next.js Server Components, Server Actions,
 * and Route Handlers.
 *
 * Uses @supabase/ssr with cookie-based session storage — no localStorage —
 * so auth state works correctly on the server.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll is called from a Server Component — cookies can only be
            // set from middleware or Route Handlers. This is expected; the
            // middleware handles session refresh.
          }
        },
      },
    }
  );
}
