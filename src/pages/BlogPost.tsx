import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MovingBorderButton } from "@/components/ui/MovingBorder";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Clock, ArrowUp, ChevronDown, ChevronUp, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const estimateReadTime = (content: string) => {
  const words = content.split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const isHeading = (text: string) =>
  text.length < 100 &&
  !text.endsWith(".") &&
  (/^\d+\./.test(text) || /^[A-Z]/.test(text)) &&
  !text.includes(". ");

const toId = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const extractHeadings = (content: string) => {
  return content
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p && isHeading(p))
    .map((text) => ({ text, id: toId(text) }));
};

const InlineCTA = () => (
  <div className="my-8 rounded-xl px-6 py-5 flex flex-col sm:flex-row items-center gap-4 border" style={{ background: "linear-gradient(135deg, rgba(46,196,182,0.08), rgba(107,63,160,0.07))", borderColor: "rgba(46,196,182,0.25)" }}>
    <div className="flex-1 text-center sm:text-left">
      <p className="font-semibold text-primary text-sm mb-0.5">Not sure where to start?</p>
      <p className="text-xs text-muted-foreground">Get free, personalised guidance from our expert counsellors.</p>
    </div>
    <Link to="/book-a-consultation" className="shrink-0 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105 whitespace-nowrap"
      style={{ background: "linear-gradient(135deg, #2EC4B6, #6B3FA0)" }}>
      Book Free Consultation
    </Link>
  </div>
);

const renderContent = (content: string) => {
  const blocks = content.split("\n\n");
  const elements: (JSX.Element | null)[] = [];
  let paragraphCount = 0;
  let ctaInserted = false;

  blocks.forEach((p, i) => {
    const trimmed = p.trim();
    if (!trimmed) return;
    if (isHeading(trimmed)) {
      elements.push(
        <h2 key={i} id={toId(trimmed)} className="text-xl md:text-2xl font-bold text-primary mt-10 mb-4 scroll-mt-24 leading-snug">
          {trimmed}
        </h2>
      );
    } else {
      paragraphCount++;
      elements.push(
        <p key={i} className="text-muted-foreground leading-[1.9] mb-5 text-[15px] md:text-base">
          {trimmed}
        </p>
      );
      if (paragraphCount === 4 && !ctaInserted) {
        ctaInserted = true;
        elements.push(<InlineCTA key="inline-cta" />);
      }
    }
  });
  return elements;
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [stickyCTADismissed, setStickyCTADismissed] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const article = articleRef.current;
      if (article) {
        const { top, height } = article.getBoundingClientRect();
        const total = height - window.innerHeight;
        const scrolled = -top;
        const pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
        setScrollProgress(pct);
        setShowStickyCTA(pct > 20 && pct < 85);
      }
      setShowBackTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug!)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: related } = useQuery({
    queryKey: ["blog-related", post?.category, post?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .eq("category", post!.category!)
        .neq("id", post!.id)
        .limit(3);
      if (error) throw error;
      return data;
    },
    enabled: !!post?.category && !!post?.id,
  });

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({ title: "Link copied!", description: "The article link has been copied to your clipboard." });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar solid />
        <div className="flex-1 pt-20">
          <div className="h-28" style={{ background: "#0a0d24" }} />
          <div className="container max-w-3xl py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-24 bg-muted rounded-full" />
              <div className="h-8 w-3/4 bg-muted rounded" />
              <div className="h-3 w-1/3 bg-muted rounded" />
              <div className="h-64 bg-muted rounded-xl mt-6" />
              <div className="space-y-3 mt-6">
                {[1,2,3,4].map(i => <div key={i} className="h-4 bg-muted rounded" style={{ width: `${85 - i * 8}%` }} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar solid />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-3">Post not found</h1>
            <Link to="/blog" className="text-secondary text-sm hover:underline">← Back to Blog</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const headings = extractHeadings(post.content);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://applyza.com" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://applyza.com/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://applyza.com/blog/${post.slug}` }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featured_image_url || "https://applyza.com/og-default.jpg",
    "datePublished": post.published_at,
    "dateModified": post.updated_at || post.published_at,
    "author": { "@type": "Person", "name": post.author || "Applyza Team" },
    "publisher": {
      "@type": "Organization",
      "name": "Applyza",
      "logo": { "@type": "ImageObject", "url": "https://applyza.com/logo.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://applyza.com/blog/${post.slug}` }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${post.title} | Applyza Blog`}
        description={(post.excerpt || post.content).substring(0, 155)}
        path={`/blog/${post.slug}`}
        ogImage={post.featured_image_url || undefined}
        ogType="article"
        jsonLd={[breadcrumbSchema, articleSchema]}
      />
      <Navbar solid />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent">
        <motion.div
          className="h-full origin-left"
          style={{
            background: "linear-gradient(90deg, #2EC4B6, #6B3FA0)",
            scaleX: scrollProgress / 100,
            transformOrigin: "left",
          }}
        />
      </div>

      {/* Dark Hero */}
      <section className="relative overflow-hidden" style={{ background: "#0a0d24" }}>
        <SparklesCore
          className="absolute inset-0 z-[1]"
          background="transparent"
          particleColor="#2EC4B6"
          particleDensity={50}
          minSize={0.4}
          maxSize={1.4}
          speed={1.2}
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.3), transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(265 44% 44% / 0.25), transparent 70%)" }} />
        </div>
        <div className="container max-w-3xl relative z-10 pt-24 pb-10">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/blog" className="text-white/40 hover:text-white/60 text-sm">Blog</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm line-clamp-1">{post.title}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {post.category && (
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-md mb-4 backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.12)", color: "#2EC4B6", letterSpacing: "1.5px" }}>
              {post.category}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-[42px] md:leading-[1.15] font-bold text-white mb-5 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-2xl mb-6">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-white/50">
            {post.author && <span className="font-medium text-white/70">{post.author}</span>}
            {post.published_at && <span>· {format(new Date(post.published_at), "MMMM d, yyyy")}</span>}
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {estimateReadTime(post.content)}
            </span>
          </div>
        </div>

        {/* Hero Image */}
        {post.featured_image_url && (
          <div className="relative h-[260px] md:h-[400px] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.featured_image_url})` }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, #0a0d24 0%, rgba(10,13,36,0.3) 50%, rgba(10,13,36,0.5) 100%)" }} />
          </div>
        )}
      </section>

      {/* Article */}
      <article ref={articleRef} className="bg-background py-10 flex-1">
        <div className="container max-w-3xl">

          {/* Table of Contents */}
          {headings.length > 2 && (
            <div className="mb-10 rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-primary text-sm">Table of Contents</span>
                {tocOpen ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
              </button>
              <AnimatePresence>
                {tocOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <nav className="px-5 pb-5 pt-1 border-t border-border">
                      <ol className="space-y-2">
                        {headings.map((h, i) => (
                          <li key={i}>
                            <a
                              href={`#${h.id}`}
                              onClick={() => setTocOpen(false)}
                              className="flex items-start gap-3 text-sm text-muted-foreground hover:text-secondary transition-colors group"
                            >
                              <span className="font-mono text-[11px] text-secondary/60 mt-0.5 shrink-0 group-hover:text-secondary">{String(i + 1).padStart(2, "0")}</span>
                              <span className="leading-snug">{h.text}</span>
                            </a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Content */}
          <div className="prose-content">
            {renderContent(post.content)}
          </div>

          {/* Share */}
          <div className="border-t border-border mt-12 pt-7">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">Share this article</p>
            <div className="flex items-center gap-2.5">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                title="Share on WhatsApp"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.25)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                title="Share on X"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(15,20,25,0.12)", border: "1px solid rgba(15,20,25,0.2)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-foreground"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                target="_blank" rel="noopener noreferrer"
                title="Share on LinkedIn"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(10,102,194,0.12)", border: "1px solid rgba(10,102,194,0.25)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#0A66C2]"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                title="Share on Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(24,119,242,0.12)", border: "1px solid rgba(24,119,242,0.25)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#1877F2]"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <button
                onClick={copyLink}
                title="Copy link"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(128,128,128,0.1)", border: "1px solid rgba(128,128,128,0.2)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current text-muted-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>
            </div>
          </div>

          {/* Related Posts */}
          {related && related.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-bold text-primary mb-5">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to={`/blog/${r.slug}`}
                    className="group rounded-xl overflow-hidden border border-border hover:border-secondary/40 transition-all hover:-translate-y-1 hover:shadow-lg"
                    style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease" }}
                  >
                    <div
                      className="h-32 bg-cover bg-center relative overflow-hidden"
                      style={{
                        backgroundImage: r.featured_image_url
                          ? `url(${r.featured_image_url})`
                          : "linear-gradient(135deg, rgba(46,196,182,0.2), rgba(107,63,160,0.2))",
                      }}
                    >
                      <div className="absolute inset-0 group-hover:opacity-80 transition-opacity" style={{ background: "rgba(6,9,24,0.35)" }} />
                      {r.category && (
                        <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-sm"
                          style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
                          {r.category}
                        </span>
                      )}
                    </div>
                    <div className="p-4 bg-card">
                      <h4 className="font-semibold text-primary text-sm group-hover:text-secondary transition-colors line-clamp-2 leading-snug">{r.title}</h4>
                      {r.published_at && (
                        <p className="text-[11px] text-muted-foreground mt-1.5">{format(new Date(r.published_at), "MMM d, yyyy")}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 rounded-2xl p-7 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(169 63% 47% / 0.1), hsl(265 44% 44% / 0.08))" }}>
            <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(46,196,182,0.2), transparent 70%)" }} />
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#2EC4B6" }}>FREE GUIDANCE</p>
              <h3 className="text-xl font-bold text-primary mb-2">Ready to start your study abroad journey?</h3>
              <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">Our expert counsellors guide you from university selection to visa approval — completely free.</p>
              <MovingBorderButton to="/book-a-consultation" className="px-7 py-2.5 text-sm">
                Book a Free Consultation
              </MovingBorderButton>
            </div>
          </div>
        </div>
      </article>

      {/* Sticky Bottom CTA Bar */}
      <AnimatePresence>
        {showStickyCTA && !stickyCTADismissed && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-3 pointer-events-none"
          >
            <div className="max-w-2xl mx-auto flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl pointer-events-auto"
              style={{ background: "linear-gradient(135deg, #1a2444, #0f1a35)", border: "1px solid rgba(46,196,182,0.3)" }}>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">Ready to apply to your dream university?</p>
                <p className="text-white/55 text-xs hidden sm:block">Our expert counsellors guide you for free.</p>
              </div>
              <Link to="/book-a-consultation"
                className="shrink-0 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #2EC4B6, #6B3FA0)" }}>
                Book Free →
              </Link>
              <button onClick={() => setStickyCTADismissed(true)} className="shrink-0 text-white/40 hover:text-white/70 transition-colors ml-1">
                <X size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            style={{ background: "linear-gradient(135deg, #2EC4B6, #6B3FA0)" }}
            title="Back to top"
          >
            <ArrowUp size={18} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default BlogPost;
