import { useState } from "react";
import { Search, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SparklesCore } from "@/components/ui/SparklesCore";

const filters = [
  { emoji: "🇬🇧", label: "UK", country: "United Kingdom" },
  { emoji: "🇩🇪", label: "Germany", country: "Germany" },
  { emoji: "🇫🇷", label: "France", country: "France" },
  { emoji: "🇮🇪", label: "Ireland", country: "Ireland" },
  { emoji: "🌍", label: "All", country: "" },
];

const badges = [
  "✓ AQF Certified Agent",
  "✓ AI-Powered Matching",
  "✓ Expert Counsellors",
  "✓ End-to-End Support",
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
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ backgroundColor: "#0a0d24" }}
    >
      {/* Animated radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none animate-gradient-shift"
        style={{
          background:
            "radial-gradient(ellipse at top left, #1a1f4d 0%, #0a0d24 50%, #050714 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Subtle moving dot pattern */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Teal glow — top right */}
      <div
        className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(46,196,182,0.20)", filter: "blur(120px)" }}
      />

      {/* Purple glow — center left */}
      <div
        className="absolute top-[30%] left-[-8%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(107,63,160,0.30)", filter: "blur(100px)" }}
      />

      {/* Teal glow — bottom right */}
      <div
        className="absolute bottom-[-5%] right-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(46,196,182,0.15)", filter: "blur(100px)" }}
      />

      {/* Sparkles */}
      <SparklesCore
        className="absolute inset-0 z-[1]"
        background="transparent"
        particleColor="#2EC4B6"
        particleDensity={60}
        minSize={0.4}
        maxSize={1.5}
        speed={1.5}
      />

      <div className="container relative z-10 pt-24 pb-12 lg:pt-28 lg:pb-16 flex justify-center">
        <div className="w-full max-w-[800px]">
          <div className="flex flex-col gap-5">
            {/* Video Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer"
              style={{ border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #1B2150 0%, #0a0d24 100%)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div
                className="absolute top-[10%] right-[15%] w-32 h-32 rounded-full pointer-events-none"
                style={{ backgroundColor: "rgba(46,196,182,0.12)", filter: "blur(50px)" }}
              />
              <div
                className="absolute bottom-[15%] left-[10%] w-24 h-24 rounded-full pointer-events-none"
                style={{ backgroundColor: "rgba(107,63,160,0.15)", filter: "blur(40px)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 lg:w-18 lg:h-18 rounded-full bg-white/90 flex items-center justify-center shadow-lg shadow-white/10 transition-transform group-hover:scale-110">
                  <Play size={24} className="ml-1" style={{ color: "#0a0d24" }} fill="#0a0d24" />
                </div>
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <span className="text-white/80 text-xs font-medium">Watch: How Applyza Works</span>
                <span className="text-white/50 text-[10px] font-medium">2:30</span>
              </div>
            </motion.div>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-xl p-1.5"
              style={{
                backgroundColor: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.20)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search courses, universities, or subjects..."
                    className="w-full pl-9 pr-4 py-2.5 text-sm text-white rounded-lg outline-none hero-search-input"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shrink-0 transition-colors"
                  style={{ backgroundColor: "#2EC4B6" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#25a89c")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2EC4B6")}
                >
                  Search
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Country pills */}
              <div className="flex flex-wrap gap-2 mt-2 px-1">
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
                    className="text-white/60 hover:text-white/90 hover:bg-white/10 text-xs font-medium px-3 py-1.5 rounded-full transition-all"
                    style={{ border: "1px solid rgba(255,255,255,0.10)" }}
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
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-x-4 gap-y-1"
            >
              {badges.map((b) => (
                <span key={b} className="text-white/70 text-xs font-medium">
                  {b}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
