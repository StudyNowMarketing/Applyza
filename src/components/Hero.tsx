import { useState } from "react";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ScrollRevealText from "@/components/homepage/ScrollRevealText";
const filters = [
  { emoji: "\u{1F1EC}\u{1F1E7}", label: "UK", country: "United Kingdom" },
  { emoji: "\u{1F1E9}\u{1F1EA}", label: "Germany", country: "Germany" },
  { emoji: "\u{1F1EB}\u{1F1F7}", label: "France", country: "France" },
  { emoji: "\u{1F1EE}\u{1F1EA}", label: "Ireland", country: "Ireland" },
  { emoji: "\u{1F30D}", label: "All", country: "" },
];

const badges = [
  "AI-Powered Matching",
  "Expert Counsellors",
  "End-to-End Support",
];

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("search", query.trim());
    navigate(`/find-a-course${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden">
      <div className="container relative z-10 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/70 text-sm font-medium">Trusted by 3,000+ students worldwide</span>
          </motion.div>

          {/* Main headline — scroll reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
              <span className="text-white">Speed to</span>
              <br />
              <span className="text-gradient">your dreams</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Discover thousands of courses across 150+ universities — completely free.
            AI-powered matching, expert counselling, and end-to-end student visa application support.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              variant="teal"
              size="lg"
              className="rounded-full text-base px-8 py-6 shadow-lg shadow-secondary/20"
              onClick={() => navigate("/book-a-consultation")}
            >
              Book a Free Consultation
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base px-8 py-6 border-white/20 text-white bg-transparent hover:bg-white/10"
              onClick={() => navigate("/eligibility-check")}
            >
              <Sparkles className="mr-2" size={18} />
              Check Your Eligibility
            </Button>
          </motion.div>

          {/* Search bar — glass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="max-w-2xl mx-auto"
          >
            <div
              className="flex rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/20"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search courses, universities, or subjects..."
                className="flex-1 px-6 py-4 text-sm text-white bg-transparent outline-none placeholder:text-white/30 min-w-0"
              />
              <Button variant="teal" className="rounded-xl m-1.5 px-6 shrink-0" onClick={handleSearch}>
                <Search size={18} />
              </Button>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {filters.map((f) => (
                <button
                  key={f.label}
                  onClick={() =>
                    navigate(
                      f.country
                        ? `/find-a-course?country=${encodeURIComponent(f.country)}`
                        : "/find-a-course"
                    )
                  }
                  className="text-white/40 hover:text-white hover:bg-white/10 text-xs font-medium px-3.5 py-1.5 rounded-full transition-all border border-white/5 hover:border-white/20"
                >
                  {f.emoji} {f.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-12"
          >
            {badges.map((b) => (
              <span key={b} className="text-white/30 text-xs font-medium flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-secondary/60" />
                {b}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
