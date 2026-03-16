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
import { Clock } from "lucide-react";

const categories = ["All", "Study Abroad Guide", "Visa Guide", "Course Guide", "Application Guide", "News"];

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

  const filtered = activeCategory === "All" ? posts : posts?.filter((p) => p.category === activeCategory);
  const featured = filtered?.[0];
  const rest = filtered?.slice(1);

  const estimateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="Blog | Study Abroad Guides, Visa Tips & Insights | Applyza" description="Expert guides on university applications, visa processes, scholarships, and student life abroad." path="/blog" />
      <Navbar solid />

      {/* Dark Hero */}
      <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.4), transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(265 44% 44% / 0.3), transparent 70%)" }} />
        </div>
        <div className="container relative z-10 pt-20">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">Blog</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">Guides, Tips & Insights</h1>
          <p className="text-white/60 text-sm sm:text-base max-w-xl">
            Everything you need to make informed decisions about your international education.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="bg-card border-b border-border">
        <div className="container py-3 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <section className="bg-background py-10 flex-1">
        <div className="container">
          {isLoading ? (
            <div className="space-y-6">
              {/* Featured skeleton */}
              <div className="bg-card rounded-xl overflow-hidden shadow-sm animate-pulse border border-border flex flex-col md:flex-row">
                <div className="h-48 md:h-auto md:w-2/5 bg-muted" />
                <div className="p-6 flex-1 space-y-3">
                  <div className="h-4 w-20 bg-muted rounded-full" />
                  <div className="h-6 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-3 w-1/3 bg-muted rounded" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-xl overflow-hidden shadow-sm animate-pulse border border-border">
                    <div className="h-36 bg-muted" />
                    <div className="p-4 space-y-2">
                      <div className="h-3 w-16 bg-muted rounded-full" />
                      <div className="h-4 w-3/4 bg-muted rounded" />
                      <div className="h-3 w-full bg-muted rounded" />
                      <div className="h-3 w-1/3 bg-muted rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filtered && filtered.length > 0 ? (
            <>
              {/* Featured post */}
              {featured && (
                <Link to={`/blog/${featured.slug}`} className="group block bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-border mb-8">
                  <div className="flex flex-col md:flex-row">
                    <div className="h-48 md:h-auto md:w-2/5 bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/10 flex items-center justify-center">
                      {featured.featured_image_url ? (
                        <img src={featured.featured_image_url} alt={featured.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-muted-foreground/30 text-xs">Applyza Blog</span>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-center">
                      {featured.category && (
                        <span className="inline-block w-fit border border-secondary text-secondary text-[10px] font-semibold px-2.5 py-0.5 rounded-full mb-3">
                          {featured.category}
                        </span>
                      )}
                      <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors line-clamp-2">{featured.title}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">{featured.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {featured.author && <span>{featured.author}</span>}
                        {featured.published_at && <span>{format(new Date(featured.published_at), "MMM d, yyyy")}</span>}
                        <span className="flex items-center gap-1"><Clock size={11} /> {estimateReadTime(featured.content)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Rest of posts */}
              {rest && rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((post, i) => (
                    <motion.div key={post.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                      <Link to={`/blog/${post.slug}`} className="group block bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border border-border">
                        <div className="h-36 bg-gradient-to-br from-primary/10 via-secondary/8 to-accent/8 flex items-center justify-center">
                          {post.featured_image_url ? (
                            <img src={post.featured_image_url} alt={post.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-muted-foreground/20 text-xs">Applyza Blog</span>
                          )}
                        </div>
                        <div className="p-4">
                          {post.category && (
                            <span className="inline-block border border-secondary text-secondary text-[10px] font-medium px-2 py-0.5 rounded-full mb-2">
                              {post.category}
                            </span>
                          )}
                          <h3 className="text-sm font-bold text-primary mb-1.5 group-hover:text-secondary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                            {post.published_at && <span>{format(new Date(post.published_at), "MMM d, yyyy")}</span>}
                            <span className="flex items-center gap-1"><Clock size={10} /> {estimateReadTime(post.content)}</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm mb-2">We're working on new content. Check back soon!</p>
              <Link to="/" className="text-secondary text-sm font-semibold hover:underline">Back to Home →</Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
