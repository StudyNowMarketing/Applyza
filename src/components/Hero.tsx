import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SparklesCore } from "@/components/ui/SparklesCore";
import ScrollExpandHero from "@/components/ui/ScrollExpandHero";

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
    <div className="relative">
      {/* Sparkles behind everything */}
      <SparklesCore
        className="absolute inset-0 z-[1] pointer-events-none"
        background="transparent"
        particleColor="#2EC4B6"
        particleDensity={60}
        minSize={0.4}
        maxSize={1.5}
        speed={1.5}
      />

      <ScrollExpandHero
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1280&q=80"
        bgImageSrc="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
        title="The Smartest Way to Study Abroad"
        subtitle="AI-powered course matching. Expert counsellors. 150+ partner universities. Completely free for students."
        scrollHint="↓ Scroll to explore"
      >
        <div className="flex flex-col items-center gap-5 max-w-[800px] mx-auto">
          {/* Search bar */}
          <div
            className="w-full rounded-xl p-1.5"
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
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {badges.map((b) => (
              <span key={b} className="text-white/70 text-xs font-medium">
                {b}
              </span>
            ))}
          </div>
        </div>
      </ScrollExpandHero>
    </div>
  );
};

export default Hero;
