import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const BlogPreviewSection = () => {
  const { data: posts } = useQuery({
    queryKey: ["blog-preview-homepage"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("slug, title, excerpt, featured_image_url, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(3);
      return data || [];
    },
  });

  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#F5F6FA" }}>
      <div className="container px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-[40px] font-bold text-center leading-tight mb-14"
          style={{ color: "#1B2150" }}
        >
          Latest from the Blog
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block bg-white rounded-2xl overflow-hidden group transition-shadow hover:shadow-lg"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gray-200 overflow-hidden">
                  {post.featured_image_url ? (
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      Blog Image
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3
                    className="font-bold text-lg mb-2 line-clamp-2"
                    style={{ color: "#1B2150" }}
                  >
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                  )}
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#2EC4B6" }}
                  >
                    Read more →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
