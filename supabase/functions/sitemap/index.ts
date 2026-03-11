import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BASE_URL = "https://applyza.com";

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/services", priority: "0.8", changefreq: "monthly" },
  { path: "/services/university-applications", priority: "0.7", changefreq: "monthly" },
  { path: "/services/visa-immigration", priority: "0.7", changefreq: "monthly" },
  { path: "/services/student-counselling", priority: "0.7", changefreq: "monthly" },
  { path: "/services/accommodation", priority: "0.7", changefreq: "monthly" },
  { path: "/find-a-course", priority: "0.9", changefreq: "daily" },
  { path: "/study-destinations", priority: "0.8", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "daily" },
  { path: "/events", priority: "0.7", changefreq: "weekly" },
  { path: "/scholarships", priority: "0.7", changefreq: "weekly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  { path: "/book-a-consultation", priority: "0.8", changefreq: "monthly" },
  { path: "/for-institutions", priority: "0.6", changefreq: "monthly" },
  { path: "/for-partners", priority: "0.6", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms-and-conditions", priority: "0.3", changefreq: "yearly" },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch dynamic content in parallel
    const [coursesRes, blogsRes, destinationsRes] = await Promise.all([
      supabase.from("courses").select("slug, updated_at").eq("status", "published"),
      supabase.from("blog_posts").select("slug, updated_at").eq("published", true),
      supabase.from("study_destinations").select("slug, updated_at").eq("status", "published"),
    ]);

    const courses = coursesRes.data || [];
    const blogs = blogsRes.data || [];
    const destinations = destinationsRes.data || [];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Static pages
    for (const page of staticPages) {
      xml += `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    }

    // Courses
    for (const course of courses) {
      xml += `  <url>
    <loc>${BASE_URL}/find-a-course/${course.slug}</loc>
    <lastmod>${course.updated_at ? new Date(course.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }

    // Blog posts
    for (const post of blogs) {
      xml += `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.updated_at ? new Date(post.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    }

    // Destinations
    for (const dest of destinations) {
      xml += `  <url>
    <loc>${BASE_URL}/study-destinations/${dest.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }

    xml += `</urlset>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    return new Response("Error generating sitemap", {
      status: 500,
      headers: corsHeaders,
    });
  }
});
