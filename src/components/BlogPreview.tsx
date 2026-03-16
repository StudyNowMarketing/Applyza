import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const posts = [
  {
    category: "Study Abroad Guide",
    title: "How to Choose the Right University: A Step-by-Step Guide",
    excerpt: "Choosing a university is one of the biggest decisions you'll make. Here's a practical framework to narrow down your options and find the perfect fit.",
    date: "Mar 5, 2026",
    readTime: "6 min read",
  },
  {
    category: "Visa Guide",
    title: "UK Student Visa 2026: Everything You Need to Know",
    excerpt: "From documents to timelines, here's your complete guide to the UK student visa process — including recent policy updates for 2026.",
    date: "Feb 28, 2026",
    readTime: "8 min read",
  },
  {
    category: "Budgeting",
    title: "Studying Abroad on a Budget: 5 Countries Where Education Won't Break the Bank",
    excerpt: "You don't need a fortune to get a world-class education. These five destinations offer quality programmes at surprisingly affordable costs.",
    date: "Feb 20, 2026",
    readTime: "5 min read",
  },
];

const BlogPreview = () => {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <section style={{ background: "#f8f9fa" }}>
      {/* Subtle top separator */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />
      <div className="container py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3"
              style={{ background: "rgba(46,196,182,0.1)", color: "#2EC4B6" }}>
              <BookOpen size={12} /> Resources & Guides
            </span>
            <h2 className="text-xl md:text-3xl font-extrabold text-primary mb-2">
              From Our Blog
            </h2>
            <p className="text-muted-foreground max-w-xl text-sm">
              Expert guides, tips, and insights to help you navigate your study abroad journey.
            </p>
          </div>
          <Button className="rounded-full shrink-0" style={{ background: "#1B2150" }} asChild>
            <Link to="/blog">View All Posts →</Link>
          </Button>
        </div>

        {/* Bento layout */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-5">
          {/* Featured post */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/blog" className="group block">
              <div className="relative rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-lg transition-all duration-300 card-glow"
                style={{ border: "1px solid hsl(230 25% 93%)" }}>
                <div className="h-48 md:h-56 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, rgba(46,196,182,0.15), rgba(107,63,160,0.15), hsl(230 33% 94%))" }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(46,196,182,0.15)" }}>
                      <BookOpen size={28} style={{ color: "#2EC4B6", opacity: 0.4 }} />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "#2EC4B6" }}>
                    <ArrowUpRight size={14} style={{ color: "#0a0d24" }} />
                  </div>
                </div>

                <div className="p-5">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2"
                    style={{ background: "rgba(46,196,182,0.1)", color: "#2EC4B6" }}>
                    {featured.category}
                  </span>
                  <h3 className="font-bold text-primary text-base leading-snug mb-1.5 group-hover:text-secondary transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2 line-clamp-2">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span>{featured.date}</span>
                    <span className="inline-flex items-center gap-1"><Clock size={9} /> {featured.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Smaller posts */}
          <div className="flex flex-col gap-5">
            {rest.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <Link to="/blog" className="group flex gap-3 bg-card rounded-xl p-3 hover:shadow-md transition-all duration-300 card-glow"
                  style={{ border: "1px solid hsl(230 25% 93%)" }}>
                  <div className="shrink-0 w-24 h-20 rounded-lg overflow-hidden flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(107,63,160,0.1), rgba(46,196,182,0.1))" }}>
                    <BookOpen size={18} className="text-muted-foreground/30" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#2EC4B6" }}>
                      {post.category}
                    </span>
                    <h3 className="font-bold text-primary text-sm leading-snug mb-1 line-clamp-2 group-hover:text-secondary transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span>{post.date}</span>
                      <span className="inline-flex items-center gap-1"><Clock size={9} /> {post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Link to="/blog" className="font-semibold text-sm hover:underline" style={{ color: "#2EC4B6" }}>
            Explore all articles →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
