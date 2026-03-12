import { useState } from "react";
import { Search, ArrowRight, Play } from "lucide-react";
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
      style={{ backgroundColor: "#0a0d24" }}
    >
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top left, #1a1f4d 0%, #0a0d24 50%, #050714 100%)",
        }}
      />

      {/* Teal glow — top right */}
      <div
        className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          backgroundColor: "rgba(46,196,182,0.20)",
          filter: "blur(120px)",
        }}
      />

      {/* Purple glow — center left */}
      <div
        className="absolute top-[30%] left-[-8%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          backgroundColor: "rgba(107,63,160,0.30)",
          filter: "blur(100px)",
        }}
      />

      {/* Teal glow — bottom right */}
      <div
        className="absolute bottom-[-5%] right-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          backgroundColor: "rgba(46,196,182,0.15)",
          filter: "blur(100px)",
        }}
      />

      <div className="container relative z-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {/* Video Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer"
              style={{ border: "1px solid rgba(255,255,255,0.10)" }}
            >
              {/* Video bg gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #1B2150 0%, #0a0d24 100%)",
                }}
              />
              {/* Bottom overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Decorative blurred circles inside */}
              <div
                className="absolute top-[10%] right-[15%] w-32 h-32 rounded-full pointer-events-none"
                style={{
                  backgroundColor: "rgba(46,196,182,0.12)",
                  filter: "blur(50px)",
                }}
              />
              <div
                className="absolute bottom-[15%] left-[10%] w-24 h-24 rounded-full pointer-events-none"
                style={{
                  backgroundColor: "rgba(107,63,160,0.15)",
                  filter: "blur(40px)",
                }}
              />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg shadow-white/10 transition-transform group-hover:scale-110">
                  <Play
                    size={28}
                    className="ml-1"
                    style={{ color: "#0a0d24" }}
                    fill="#0a0d24"
                  />
                </div>
              </div>
              {/* Bottom text */}
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <span className="text-white/80 text-xs font-medium">
                  Watch: How Applyza Works
                </span>
                <span className="text-white/50 text-[10px] font-medium">
                  2:30
                </span>
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
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search courses, universities, or subjects..."
                    className="w-full pl-9 pr-4 py-3 text-sm text-white rounded-lg outline-none"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      "::placeholder": { color: "rgba(255,255,255,0.4)" },
                    } as React.CSSProperties}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="flex items-center gap-1.5 rounded-lg px-5 py-3 text-sm font-semibold text-white shrink-0 transition-colors"
                  style={{ backgroundColor: "#2EC4B6" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#25a89c")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2EC4B6")
                  }
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
          <div className="relative hidden lg:flex items-center justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              {/* Decorative concentric circles */}
              <div
                className="absolute w-[320px] h-[320px] rounded-full"
                style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              />
              <div
                className="absolute w-[220px] h-[220px] rounded-full"
                style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              />

              {/* Badge 1: 99% Visa Success — top center */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-xl px-5 py-3.5 backdrop-blur-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(46,196,182,0.20) 0%, rgba(46,196,182,0.10) 100%)",
                  border: "1px solid rgba(46,196,182,0.30)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#4ade80" }} />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: "#22c55e" }} />
                  </span>
                  <span className="text-white text-sm font-semibold whitespace-nowrap">
                    99% Visa Success
                  </span>
                </div>
              </motion.div>

              {/* Badge 2: 3,000+ Students Placed — center */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="rounded-2xl p-5 text-center backdrop-blur-xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.20)",
                }}
              >
                <div
                  className="text-4xl font-bold"
                  style={{ color: "#2EC4B6" }}
                >
                  3,000+
                </div>
                <div className="text-white/60 text-sm font-medium mt-1">
                  Students Placed
                </div>
              </motion.div>

              {/* Badge 3: 150+ Universities — bottom left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="absolute bottom-4 left-0 rounded-xl p-3 backdrop-blur-xl flex items-center gap-3"
                style={{
                  backgroundColor: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.20)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                  style={{ backgroundColor: "rgba(107,63,160,0.30)" }}
                >
                  🎓
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">
                    150+ Universities
                  </div>
                  <div className="text-white/50 text-[10px] font-medium">
                    UK, Europe & beyond
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
