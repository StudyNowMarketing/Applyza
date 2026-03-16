import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Clock } from "lucide-react";

const renderContent = (content: string) => {
  const paragraphs = content.split("\n\n");
  return paragraphs.map((p, i) => {
    const trimmed = p.trim();
    if (!trimmed) return null;
    const isSubheading =
      trimmed.length < 80 &&
      !trimmed.endsWith(".") &&
      (/^\d+\./.test(trimmed) || /^[A-Z]/.test(trimmed)) &&
      !trimmed.includes(". ");
    if (isSubheading) {
      return <h2 key={i} className="text-xl font-bold text-primary mt-8 mb-3">{trimmed}</h2>;
    }
    return <p key={i} className="text-muted-foreground leading-[1.8] mb-4">{trimmed}</p>;
  });
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();

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
        .limit(2);
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

  const estimateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
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
              <div className="h-48 bg-muted rounded-xl mt-6" />
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${post.title} | Applyza Blog`}
        description={(post.excerpt || post.content).substring(0, 155)}
        path={`/blog/${post.slug}`}
        ogImage={post.featured_image_url || undefined}
      />
      <Navbar solid />

      {/* Dark Hero */}
      <section className="relative overflow-hidden py-8" style={{ background: "#0a0d24" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.3), transparent 70%)" }} />
        </div>
        <div className="container max-w-3xl relative z-10 pt-20">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/blog" className="text-white/40 hover:text-white/60 text-sm">Blog</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm line-clamp-1">{post.title}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Article */}
      <article className="bg-background py-10 flex-1">
        <div className="container max-w-3xl">
          {post.category && (
            <span className="inline-block border border-secondary text-secondary text-[10px] font-semibold px-2.5 py-0.5 rounded-full mb-4">
              {post.category}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-3 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-8">
            {post.author && <span>{post.author}</span>}
            {post.published_at && <span>·  {format(new Date(post.published_at), "MMMM d, yyyy")}</span>}
            <span className="flex items-center gap-1"><Clock size={11} /> {estimateReadTime(post.content)}</span>
          </div>

          <div className="prose-content">{renderContent(post.content)}</div>

          {/* Share */}
          <div className="border-t border-border mt-10 pt-6">
            <p className="text-xs font-semibold text-primary mb-3">Share this article</p>
            <div className="flex gap-2">
              <a href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + shareUrl)}`} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-primary"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#1877F2]"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <button onClick={copyLink}
                className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current text-muted-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>
            </div>
          </div>

          {/* Related Posts */}
          {related && related.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-bold text-primary mb-4">Related Posts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link key={r.id} to={`/blog/${r.slug}`} className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 border border-border">
                    <div className="h-28 bg-gradient-to-br from-primary/10 via-secondary/8 to-accent/8" />
                    <div className="p-4">
                      <h4 className="font-bold text-primary text-sm group-hover:text-secondary transition-colors line-clamp-2">{r.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{r.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 rounded-xl p-6 text-center" style={{ background: "linear-gradient(135deg, hsl(169 63% 47% / 0.1), hsl(265 44% 44% / 0.08))" }}>
            <h3 className="text-base font-bold text-primary mb-1.5">Need personalised guidance?</h3>
            <p className="text-xs text-muted-foreground mb-4">Our expert counsellors are here to help — completely free.</p>
            <Button size="sm" className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6" asChild>
              <Link to="/book-a-consultation">Book a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
