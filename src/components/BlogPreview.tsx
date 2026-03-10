import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    category: "Study Abroad Guide",
    title: "How to Choose the Right University: A Step-by-Step Guide",
    excerpt: "Choosing a university is one of the biggest decisions you'll make. Here's a practical framework to narrow down your options and find the perfect fit.",
  },
  {
    category: "Visa Guide",
    title: "UK Student Visa 2026: Everything You Need to Know",
    excerpt: "From documents to timelines, here's your complete guide to the UK student visa process — including recent policy updates for 2026.",
  },
  {
    category: "Budgeting",
    title: "Studying Abroad on a Budget: 5 Countries Where Education Won't Break the Bank",
    excerpt: "You don't need a fortune to get a world-class education. These five destinations offer quality programmes at surprisingly affordable costs.",
  },
];

const BlogPreview = () => {
  return (
    <section className="bg-background">
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-4">
            Guides, Tips & Insights
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-40 bg-gradient-to-br from-accent/10 via-secondary/10 to-muted flex items-center justify-center">
                <BookOpen className="text-accent/20" size={40} />
              </div>
              <div className="p-5">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2.5 py-1 rounded-full mb-3">
                  {post.category}
                </span>
                <h3 className="font-bold text-primary text-sm leading-snug mb-2">{post.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <Link to="/blog" className="text-secondary text-xs font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/blog" className="text-secondary font-semibold text-sm hover:underline">
            Visit the Blog →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
