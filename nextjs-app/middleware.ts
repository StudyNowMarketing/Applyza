import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Next.js middleware — runs on every request before the page renders.
 *
 * Responsibilities:
 *  1. Refresh the Supabase auth session token stored in cookies so it never
 *     expires mid-session (required by @supabase/ssr cookie-based auth).
 *  2. Any future auth-gate redirects for protected routes can be added here.
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Run middleware on all routes EXCEPT:
     * - _next/static  (static files)
     * - _next/image   (image optimisation)
     * - favicon.ico, robots.txt, sitemap.xml
     * - Public assets (.png, .svg, .jpg, .webp)
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)).*)",
  ],
};
