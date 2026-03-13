import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("search", query.trim());
    navigate(`/find-a-course${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#1B2150" }}
    >
      {/* Gradient glows */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(46,196,182,0.12)", filter: "blur(140px)" }}
      />
      <div
        className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(107,63,160,0.15)", filter: "blur(120px)" }}
      />

      <div className="container relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold text-white leading-tight mb-6"
        >
          The Smartest Way to{" "}
          <span style={{ color: "#2EC4B6" }}>Study Abroad</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="text-white/80 text-base md:text-xl max-w-[600px] mx-auto mb-10 leading-relaxed"
        >
          AI-powered course matching. Expert counsellors. 150+ partner
          universities. Completely free for students.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="max-w-[620px] mx-auto mb-8"
        >
          <div
            className="flex items-center rounded-full overflow-hidden"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2"
                style={{ color: "#9CA3AF" }}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search courses, universities, or subjects..."
                className="w-full pl-12 pr-4 py-4 text-sm md:text-base outline-none bg-transparent"
                style={{ color: "#1B2150" }}
              />
            </div>
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 px-6 md:px-8 py-4 text-sm md:text-base font-semibold text-white shrink-0 transition-colors"
              style={{ backgroundColor: "#2EC4B6" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#25a89c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#2EC4B6")
              }
            >
              Search
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2"
        >
          {[
            "✓ AQF Certified Agent",
            "✓ 99% Visa Success",
            "✓ 3,000+ Students Placed",
          ].map((badge) => (
            <span
              key={badge}
              className="text-white/60 text-xs md:text-sm font-medium"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
