import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { format } from "date-fns";

const categories = ["All", "Study Abroad Guide", "Visa Guide", "Course Guide", "Application Guide"];

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar solid />

      {/* Hero */}
      <section className="bg-primary" style={{ minHeight: "35vh", display: "flex", alignItems: "flex-end" }}>
        <div className="container pb-12 pt-28">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/60">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem><BreadcrumbPage className="text-primary-foreground/80">Blog</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mt-4 mb-3">Guides, Tips & Insights</h1>
          <p className="text-primary-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Everything you need to make informed decisions about your international education.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="bg-background border-b">
        <div className="container py-4 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <section className="bg-background py-12 md:py-16 flex-1">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-44 bg-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 w-24 bg-muted rounded" />
                    <div className="h-5 w-3/4 bg-muted rounded" />
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-3 w-1/3 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered && filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Link to={`/blog/${post.slug}`} className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="h-44 bg-gradient-to-br from-accent/20 via-secondary/15 to-primary/10 flex items-center justify-center">
                      <span className="text-primary/30 text-xs font-medium">Applyza Blog</span>
                    </div>
                    <div className="p-5">
                      {post.category && (
                        <span className="inline-block border border-secondary text-secondary text-xs font-medium px-2.5 py-0.5 rounded-full mb-3">
                          {post.category}
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.author}</span>
                        {post.published_at && <span>{format(new Date(post.published_at), "MMM d, yyyy")}</span>}
                      </div>
                      <span className="inline-block text-secondary text-sm font-medium mt-3 group-hover:underline">
                        Read More →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-12">No posts found in this category.</p>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
