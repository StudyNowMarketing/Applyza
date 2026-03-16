import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Clock, ArrowRight } from "lucide-react";

const categories = ["All", "Study Abroad Guide", "Visa Guide", "Course Guide", "Application Guide", "News"];

const placeholderPosts = [
  { id: "p1", title: "How to Choose the Right University Abroad", category: "Study Guide", excerpt: "Choosing a university is one of the biggest decisions you'll make. Here's a practical framework to narrow down your options.", featured_image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80", published_at: "2026-03-10", content: "placeholder content for read time estimation words words words words words words words words words words words words words words words words words words words words", slug: "choose-right-university", author: "Applyza Team", published: true },
  { id: "p2", title: "UK Student Visa Guide 2026", category: "Visa Tips", excerpt: "From documents to timelines, here's your complete guide to the UK student visa process.", featured_image_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80", published_at: "2026-03-08", content: "placeholder content words words words words words words words words words words", slug: "uk-visa-guide-2026", author: "Applyza Team", published: true },
  { id: "p3", title: "Top Scholarships for International Students", category: "Scholarships", excerpt: "Discover funding opportunities that can make your study abroad dreams a reality.", featured_image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80", published_at: "2026-03-05", content: "placeholder content words words words words words words words words", slug: "top-scholarships", author: "Applyza Team", published: true },
  { id: "p4", title: "Writing a Personal Statement That Stands Out", category: "Applications", excerpt: "Tips and strategies to craft a compelling personal statement for university applications.", featured_image_url: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80", published_at: "2026-03-01", content: "placeholder content words words words words words words", slug: "personal-statement-tips", author: "Applyza Team", published: true },
  { id: "p5", title: "Study Abroad on a Budget", category: "Finance", excerpt: "You don't need a fortune to get a world-class education abroad.", featured_image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80", published_at: "2026-02-25", content: "placeholder content words words words words", slug: "study-abroad-budget", author: "Applyza Team", published: true },
  { id: "p6", title: "Foundation Programmes Explained", category: "Study Guide", excerpt: "Everything you need to know about foundation year programmes and pathways.", featured_image_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80", published_at: "2026-02-20", content: "placeholder content words words words", slug: "foundation-programmes", author: "Applyza Team", published: true },
];

const estimateReadTime = (content: string) => {
  const words = content.split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const BlogCard = ({ post, featured = false, index = 0 }: { post: any; featured?: boolean; index?: number }) => {
  const height = featured ? "h-[300px] md:h-[450px]" : "h-[300px]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: featured ? 0 : index * 0.07 }}
      className={featured ? "col-span-full" : ""}
    >
      <Link
        to={`/blog/${post.slug}`}
        className={`group relative block ${height} rounded-[20px] overflow-hidden card-glow`}
        style={{ transition: "transform 0.3s ease" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: post.featured_image_url
              ? `url(${post.featured_image_url})`
              : "linear-gradient(135deg, rgba(46,196,182,0.2), rgba(107,63,160,0.2), hsl(230 33% 20%))",
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          }}
        />
        {/* Hover: gradient expands */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.2) 100%)",
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
          {post.category && (
            <span
              className="inline-block w-fit text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-md mb-3 backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
            >
              {post.category}
            </span>
          )}
          <h3
            className={`font-bold text-white leading-tight mb-2 line-clamp-2 ${
              featured ? "text-xl md:text-[32px] md:leading-[1.2]" : "text-lg md:text-xl"
            }`}
          >
            {post.title}
          </h3>
          {featured && post.excerpt && (
            <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-2 mb-3 max-w-2xl">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 text-xs text-white/60">
            {post.published_at && <span>{format(new Date(post.published_at), "MMM d, yyyy")}</span>}
            {post.content && (
              <span className="flex items-center gap-1">
                <Clock size={11} /> {estimateReadTime(post.content)}
              </span>
            )}
          </div>
          {featured && (
            <div className="flex items-center gap-1.5 mt-4 text-sm font-semibold" style={{ color: "#2EC4B6" }}>
              Read article
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </div>
          )}
          {!featured && (
            <div className="absolute bottom-5 right-5 md:bottom-7 md:right-7">
              <ArrowRight size={16} className="text-white/50 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-white" />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const allPosts = posts && posts.length > 0 ? posts : placeholderPosts;
  const filtered = activeCategory === "All" ? allPosts : allPosts?.filter((p) => p.category === activeCategory);
  const featured = filtered?.[0];
  const rest = filtered?.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Blog | Study Abroad Guides, Visa Tips & Insights | Applyza"
        description="Expert guides on university applications, visa processes, scholarships, and student life abroad."
        path="/blog"
      />
      <Navbar solid />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24" style={{ background: "#0a0d24" }}>
        <SparklesCore
          className="absolute inset-0 z-[1]"
          background="transparent"
          particleColor="#2EC4B6"
          particleDensity={60}
          minSize={0.4}
          maxSize={1.5}
          speed={1.5}
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.4), transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(265 44% 44% / 0.3), transparent 70%)" }} />
        </div>
        <div className="container relative z-10 pt-16">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white/60 text-sm">Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span
              className="inline-block text-xs font-semibold uppercase mb-4 mt-4"
              style={{ color: "#2EC4B6", letterSpacing: "2px" }}
            >
              LATEST INSIGHTS
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-[56px] md:leading-[1.1] font-bold text-white mb-4">
              From the Applyza Blog
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl">
              Guides, tips, and insights to help you navigate your study abroad journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <div className="bg-card border-b border-border">
        <div className="container py-3 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border"
              style={
                activeCategory === cat
                  ? { background: "#2EC4B6", borderColor: "#2EC4B6", color: "white" }
                  : { background: "transparent", borderColor: "#2EC4B6", color: "#2EC4B6" }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <section className="bg-background py-12 md:py-16 flex-1 relative overflow-hidden">
        {/* Large faded BLOG text */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{
            fontSize: "clamp(150px, 20vw, 300px)",
            fontWeight: 900,
            color: "#1B2150",
            opacity: 0.025,
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
        >
          BLOG
        </div>

        <div className="container relative z-10">
          {isLoading ? (
            <div className="space-y-6">
              <div className="h-[450px] rounded-[20px] bg-muted animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-[300px] rounded-[20px] bg-muted animate-pulse" />
                ))}
              </div>
            </div>
          ) : filtered && filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured && <BlogCard post={featured} featured />}
              {rest?.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm mb-2">No posts found in this category.</p>
              <button onClick={() => setActiveCategory("All")} className="text-sm font-semibold hover:underline" style={{ color: "#2EC4B6" }}>
                View all posts →
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
