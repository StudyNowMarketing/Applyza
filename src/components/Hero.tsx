import { useState } from "react";
import { Search, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
      style={{
        background: "linear-gradient(135deg, #0a0d24 0%, #0f1235 100%)",
      }}
    >
      {/* Teal glow - top right */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(46,196,182,0.20) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      {/* Purple glow - left */}
      <div
        className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(107,63,160,0.30) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="container relative z-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Video Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1B2150 0%, #0a0d24 100%)",
              }}
            >
              {/* Play button */}
              <div className="w-[72px] h-[72px] rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors shadow-lg shadow-white/10">
                <Play size={28} className="text-[#0a0d24] ml-1" fill="#0a0d24" />
              </div>
              <span className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-xs font-medium tracking-wide">
                Watch: How Applyza Works
              </span>
            </motion.div>

            {/* Search bar - glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex rounded-xl overflow-hidden border border-white/20"
              style={{
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search courses, universities, or subjects..."
                className="flex-1 px-5 py-3.5 text-sm text-white bg-transparent outline-none placeholder:text-white/40 min-w-0"
              />
              <Button variant="teal" className="rounded-xl m-1 px-5 shrink-0" onClick={handleSearch}>
                <Search size={18} />
              </Button>
            </motion.div>

            {/* Filter pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
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
                  className="text-white/60 hover:text-white hover:bg-white/20 text-xs font-medium px-3.5 py-1.5 rounded-full transition-all border border-white/10 hover:border-white/20"
                >
                  {f.emoji} {f.label}
                </button>
              ))}
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-x-4 gap-y-1 mt-2"
            >
              {badges.map((b) => (
                <span key={b} className="text-white/70 text-xs font-medium">
                  {b}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative hidden md:flex items-center justify-center min-h-[400px]">
            {/* Decorative concentric circles */}
            <div className="absolute w-[320px] h-[320px] rounded-full border border-white/5" />
            <div className="absolute w-[220px] h-[220px] rounded-full border border-white/5" />

            {/* Badge: 99% Visa Success - top */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute top-4 right-4 rounded-xl border border-white/20 px-5 py-3.5"
              style={{
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-white text-sm font-semibold">99% Visa Success</span>
              </div>
            </motion.div>

            {/* Badge: 3,000+ Students Placed - center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="rounded-xl border border-white/20 px-7 py-5 text-center"
              style={{
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <div className="text-3xl font-extrabold" style={{ color: "#2EC4B6" }}>
                3,000+
              </div>
              <div className="text-white/70 text-sm font-medium mt-1">Students Placed</div>
            </motion.div>

            {/* Badge: 150+ Universities - bottom */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="absolute bottom-8 left-4 rounded-xl border border-white/20 px-5 py-3.5"
              style={{
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🎓</span>
                <span className="text-white text-sm font-semibold">150+ Universities</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
