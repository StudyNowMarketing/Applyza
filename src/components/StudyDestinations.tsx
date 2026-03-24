import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import ukImg from "@/assets/destinations/uk.jpg";
import germanyImg from "@/assets/destinations/germany.jpg";
import franceImg from "@/assets/destinations/france.jpg";
import irelandImg from "@/assets/destinations/ireland.jpg";
import maltaImg from "@/assets/destinations/malta.jpg";
import netherlandsImg from "@/assets/destinations/netherlands.jpg";

const destinations = [
  { name: "United Kingdom", flag: "🇬🇧", image: ukImg, slug: "united-kingdom", unis: "150+ Universities", courses: "50,000+ Courses" },
  { name: "Germany", flag: "🇩🇪", image: germanyImg, slug: "germany", unis: "80+ Universities", courses: "20,000+ Courses" },
  { name: "France", flag: "🇫🇷", image: franceImg, slug: "france", unis: "70+ Universities", courses: "15,000+ Courses" },
  { name: "Ireland", flag: "🇮🇪", image: irelandImg, slug: "ireland", unis: "30+ Universities", courses: "8,000+ Courses" },
  { name: "Malta", flag: "🇲🇹", image: maltaImg, slug: "malta", unis: "10+ Universities", courses: "3,000+ Courses" },
  { name: "Netherlands", flag: "🇳🇱", image: netherlandsImg, slug: "netherlands", unis: "40+ Universities", courses: "12,000+ Courses" },
];

const StudyDestinations = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    // Observe heading
    const headingObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeadingVisible(true);
      },
      { rootMargin: "-10% 0px", threshold: 0.1 }
    );
    if (headingRef.current) headingObs.observe(headingRef.current);

    // Observe each card with staggered reveal
    const cardObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            setVisibleCards((prev) => new Set(prev).add(idx));
          }
        });
      },
      { rootMargin: "-5% 0px", threshold: 0.15 }
    );
    cardRefs.current.forEach((card) => {
      if (card) cardObs.observe(card);
    });

    return () => {
      headingObs.disconnect();
      cardObs.disconnect();
    };
  }, []);

  return (
    <div ref={sectionRef} className="py-20 md:py-32">
      <div className="container">
        {/* Heading */}
        <div
          ref={headingRef}
          className="text-center mb-16"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full border"
            style={{
              color: "#2EC4B6",
              borderColor: "rgba(46,196,182,0.3)",
              background: "rgba(46,196,182,0.08)",
            }}
          >
            Study Destinations
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Where Will You{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2EC4B6, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Study?
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
            Choose from top study destinations across Europe with world-class universities and vibrant student communities.
          </p>
        </div>

        {/* Cards grid — 3 columns on desktop, staggered reveal on scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d, i) => {
            const isVisible = visibleCards.has(i);
            const staggerDelay = i * 0.1;

            return (
              <div
                key={d.name}
                ref={(el) => { cardRefs.current[i] = el; }}
                data-index={i}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(50px) scale(0.95)",
                  transition: `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}s`,
                }}
              >
                <Link
                  to={`/study-destinations/${d.slug}`}
                  className="group relative block rounded-2xl overflow-hidden h-72 md:h-80 border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500"
                >
                  {/* Background image */}
                  <img
                    src={d.image}
                    alt={d.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(180deg, rgba(6,9,24,0.1) 0%, rgba(6,9,24,0.4) 40%, rgba(6,9,24,0.85) 100%)",
                    }}
                  />

                  {/* Hover teal glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(180deg, transparent 50%, rgba(46,196,182,0.15) 100%)",
                    }}
                  />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{d.flag}</span>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {d.name}
                      </h3>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs text-white/60 font-medium">{d.unis}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="text-xs text-white/60 font-medium">{d.courses}</span>
                    </div>

                    {/* CTA */}
                    <span
                      className="inline-flex items-center gap-1 text-sm font-semibold transition-all duration-300 group-hover:gap-2"
                      style={{ color: "#2EC4B6" }}
                    >
                      Explore courses
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>

                  {/* Top-right badge for hover */}
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1"
                    style={{
                      background: "rgba(46,196,182,0.2)",
                      color: "#2EC4B6",
                      border: "1px solid rgba(46,196,182,0.3)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    Popular
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* See all link */}
        <div className="text-center mt-12">
          <Link
            to="/study-destinations"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all duration-300 text-sm font-semibold"
          >
            See All Destinations
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudyDestinations;
