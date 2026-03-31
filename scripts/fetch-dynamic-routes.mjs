/**
 * Fetches dynamic route slugs from Supabase so the pre-render script
 * can build /blog/:slug, /find-a-course/:slug, /study-destinations/:slug.
 *
 * Requires VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in the environment
 * (or a .env file read via --env-file).
 *
 * Usage: called automatically by scripts/prerender.mjs
 */

import { createClient } from "@supabase/supabase-js";

export async function fetchDynamicRoutes() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      "[prerender] ⚠  VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY not set — " +
        "skipping dynamic route pre-render (blog, courses, destinations)."
    );
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const routes = [];

  try {
    // Blog posts
    const { data: posts, error: postsError } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("status", "published");
    if (postsError) throw postsError;
    for (const post of posts ?? []) {
      routes.push(`/blog/${post.slug}`);
    }
    console.log(`[prerender] Found ${posts?.length ?? 0} published blog posts.`);

    // Courses
    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select("slug")
      .eq("status", "published");
    if (coursesError) throw coursesError;
    for (const course of courses ?? []) {
      routes.push(`/find-a-course/${course.slug}`);
    }
    console.log(`[prerender] Found ${courses?.length ?? 0} published courses.`);

    // Study destinations
    const { data: destinations, error: destError } = await supabase
      .from("study_destinations")
      .select("slug")
      .eq("status", "published");
    if (destError) throw destError;
    for (const dest of destinations ?? []) {
      routes.push(`/study-destinations/${dest.slug}`);
    }
    console.log(
      `[prerender] Found ${destinations?.length ?? 0} published destinations.`
    );
  } catch (err) {
    console.error("[prerender] Failed to fetch dynamic routes:", err.message);
  }

  return routes;
}
