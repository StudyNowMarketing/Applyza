import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Applyza made the whole process feel effortless. From choosing my course to getting my visa — I never felt lost.",
    name: "Ella I.",
    country: "Nigeria",
    countryFlag: "🇳🇬",
    university: "York St. John University",
    destFlag: "🇬🇧",
    programme: "Business Management",
    year: "2025",
    rating: 5,
    photo: "/Student_review_headshot.png",
    videoUrl: "https://www.youtube.com/embed/7sM4WPCsgnQ?si=EWmEPwaN5LRjN6ZX" as string | null,
  },
  {
    quote:
      "I was overwhelmed by all the options. My counsellor helped me find the perfect programme and I got accepted within weeks.",
    name: "Fausat O.",
    country: "Nigeria",
    countryFlag: "🇳🇬",
    university: "York St. John University",
    destFlag: "🇬🇧",
    programme: "International Relations",
    year: "2025",
    rating: 5,
    photo: "/Student_review_headshot.png",
    videoUrl: "https://www.youtube.com/embed/7sM4WPCsgnQ?si=EWmEPwaN5LRjN6ZX" as string | null,
  },
  {
    quote:
      "The visa process was the part I was most nervous about. Applyza handled everything and I got approved on the first try.",
    name: "David A.",
    country: "Ghana",
    countryFlag: "🇬🇭",
    university: "University of Sunderland",
    destFlag: "🇬🇧",
    programme: "Computer Science",
    year: "2024",
    rating: 5,
    photo: "/Student_review_headshot.png",
    videoUrl: "https://www.youtube.com/embed/7sM4WPCsgnQ?si=EWmEPwaN5LRjN6ZX" as string | null,
  },
];

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={11}
        style={{
          color: i < count ? "#f59e0b" : "rgba(255,255,255,0.15)",
          fill: i < count ? "#f59e0b" : "transparent",
        }}
      />
    ))}
  </div>
);

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 56 : -56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -56 : 56, opacity: 0 }),
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [playing, setPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Autoplay when section scrolls into view; pause when it leaves
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
        } else {
          setPlaying(false);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
    setPlaying(false);
  };

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
    setPlaying(false);
  };

  const t = testimonials[current];
  const initials = t.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 md:py-24">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(46,196,182,0.07) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-2"
              style={{ color: "#2EC4B6" }}
            >
              Student Stories
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
              Real Stories.
              <br />
              Real Results.
            </h2>
          </div>
          <div className="hidden sm:flex items-baseline gap-1 select-none">
            <span className="text-5xl font-extrabold leading-none text-white/90">
              {pad(current + 1)}
            </span>
            <span className="text-lg font-light text-white/20">
              /{pad(testimonials.length)}
            </span>
          </div>
        </div>

        {/* Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Prev */}
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            style={{
              background: "rgba(10,15,30,0.8)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              color: "rgba(255,255,255,0.5)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)")}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(160deg, rgba(22,38,50,0.97) 0%, rgba(12,20,30,0.99) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "0 0 0 1px rgba(46,196,182,0.06), 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <div className="flex flex-col md:flex-row">

                {/* ── Left: Quote + identity ── */}
                <div className="flex-1 relative p-8 md:p-10 lg:p-12 overflow-hidden">
                  {/* Decorative opener */}
                  <div
                    className="absolute -top-4 -left-2 select-none pointer-events-none font-bold"
                    style={{
                      fontSize: "180px",
                      lineHeight: 1,
                      color: "rgba(46,196,182,0.06)",
                      fontFamily: "Georgia, serif",
                    }}
                    aria-hidden
                  >
                    &ldquo;
                  </div>

                  <div className="relative z-10 mb-5">
                    <StarRating count={t.rating} />
                  </div>

                  <blockquote
                    className="relative z-10 mb-8 leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.82)",
                      fontSize: "clamp(1rem, 2.2vw, 1.175rem)",
                      fontStyle: "italic",
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      letterSpacing: "0.012em",
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Identity */}
                  <div className="flex items-center gap-4 relative z-10">
                    {/*
                      Container: 80×80px
                      Image: inset 3px → 74px diameter, radius 37 from center
                      Ring:  r=38, strokeWidth=1.5 → inner stroke edge at 37.25px
                             Gap between photo edge (37px) and ring inner edge (37.25px) = 0.25px
                             Ring sits flush just outside the photo — no dark halo, tight hug
                    */}
                    <div className="relative shrink-0" style={{ width: 80, height: 80 }}>
                      {t.photo ? (
                        <img
                          src={t.photo}
                          alt={t.name}
                          className="absolute rounded-full object-cover object-top"
                          style={{ inset: 3 }}
                        />
                      ) : (
                        <div
                          className="absolute rounded-full flex items-center justify-center font-bold text-white text-sm"
                          style={{
                            inset: 3,
                            background: "linear-gradient(135deg, #2EC4B6 0%, #1a8a80 100%)",
                          }}
                        >
                          {initials}
                        </div>
                      )}
                      {/*
                        Static SVG — no rotation transform, no transform-origin issues.
                        Dashes flow along the path via strokeDashoffset animation instead.
                        r=38, strokeWidth=2 → inner stroke edge at r=37 = photo edge (inset 3, radius 37).
                        Ring sits flush just outside the photo circle.
                        Circumference = 2π×38 ≈ 238.76px
                      */}
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 80 80"
                        fill="none"
                        style={{
                          filter:
                            "drop-shadow(0 0 4px #2EC4B6) drop-shadow(0 0 8px rgba(46,196,182,0.55))",
                        }}
                      >
                        <motion.circle
                          cx="40"
                          cy="40"
                          r="38"
                          stroke="#2EC4B6"
                          strokeWidth="2"
                          strokeDasharray="5 4"
                          strokeLinecap="round"
                          opacity="0.85"
                          initial={{ strokeDashoffset: 0 }}
                          animate={{ strokeDashoffset: -239 }}
                          transition={{ duration: 14, ease: "linear", repeat: Infinity }}
                        />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-white text-sm leading-tight">{t.name}</p>
                      <p className="text-xs mt-0.5 flex flex-wrap items-center gap-x-1.5" style={{ color: "rgba(255,255,255,0.38)" }}>
                        <span>{t.countryFlag} {t.country}</span>
                        <span style={{ color: "rgba(255,255,255,0.2)" }}>→</span>
                        <span>{t.destFlag} {t.university}</span>
                      </p>
                      <p className="text-xs mt-1 font-medium" style={{ color: "rgba(46,196,182,0.55)" }}>
                        {t.programme} · {t.year}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Gradient divider */}
                <div
                  className="hidden md:block shrink-0"
                  style={{
                    width: 1,
                    margin: "28px 0",
                    background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)",
                  }}
                />
                <div
                  className="md:hidden shrink-0"
                  style={{
                    height: 1,
                    margin: "0 28px",
                    background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)",
                  }}
                />

                {/* ── Right: Inline video panel ── */}
                <div className="relative md:w-56 overflow-hidden" style={{ minHeight: 200 }}>
                  <AnimatePresence mode="wait">
                    {playing && t.videoUrl ? (
                      /* ── Playing state: iframe fills the panel ── */
                      <motion.div
                        key="video"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0"
                      >
                        <iframe
                          src={`${t.videoUrl}&autoplay=1`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={`${t.name} video review`}
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            border: "none",
                          }}
                        />
                        {/* Stop button */}
                        <button
                          onClick={() => setPlaying(false)}
                          aria-label="Stop video"
                          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-colors z-10"
                          style={{ background: "rgba(0,0,0,0.65)", color: "rgba(255,255,255,0.8)" }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.9)")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.65)")}
                        >
                          <X size={12} />
                        </button>
                      </motion.div>
                    ) : (
                      /* ── Idle state: play button ── */
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center p-8"
                      >
                        {/* Scanline texture */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)",
                          }}
                        />
                        {/* Corner brackets */}
                        {(
                          [
                            ["top-3 left-3", "top left"],
                            ["top-3 right-3", "top right"],
                            ["bottom-3 left-3", "bottom left"],
                            ["bottom-3 right-3", "bottom right"],
                          ] as const
                        ).map(([pos, corner]) => (
                          <div
                            key={corner}
                            className={`absolute ${pos} w-3.5 h-3.5 pointer-events-none`}
                            style={{
                              borderTop: corner.includes("top") ? "1px solid rgba(255,255,255,0.12)" : undefined,
                              borderBottom: corner.includes("bottom") ? "1px solid rgba(255,255,255,0.12)" : undefined,
                              borderLeft: corner.includes("left") ? "1px solid rgba(255,255,255,0.12)" : undefined,
                              borderRight: corner.includes("right") ? "1px solid rgba(255,255,255,0.12)" : undefined,
                            }}
                          />
                        ))}

                        <div className="relative z-10 text-center">
                          <button
                            onClick={() => t.videoUrl && setPlaying(true)}
                            aria-label={t.videoUrl ? "Watch video review" : "Video coming soon"}
                            className="relative flex items-center justify-center mx-auto mb-3.5 transition-all duration-300"
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: "50%",
                              background: t.videoUrl ? "rgba(46,196,182,0.12)" : "rgba(255,255,255,0.04)",
                              border: `1.5px solid ${t.videoUrl ? "rgba(46,196,182,0.45)" : "rgba(255,255,255,0.1)"}`,
                              cursor: t.videoUrl ? "pointer" : "default",
                            }}
                            onMouseEnter={(e) => {
                              if (!t.videoUrl) return;
                              const btn = e.currentTarget as HTMLButtonElement;
                              btn.style.background = "rgba(46,196,182,0.22)";
                              btn.style.boxShadow = "0 0 28px rgba(46,196,182,0.35)";
                              btn.style.transform = "scale(1.08)";
                            }}
                            onMouseLeave={(e) => {
                              const btn = e.currentTarget as HTMLButtonElement;
                              btn.style.background = t.videoUrl ? "rgba(46,196,182,0.12)" : "rgba(255,255,255,0.04)";
                              btn.style.boxShadow = "none";
                              btn.style.transform = "scale(1)";
                            }}
                          >
                            <Play
                              size={18}
                              className="ml-0.5"
                              style={{
                                color: t.videoUrl ? "#2EC4B6" : "rgba(255,255,255,0.25)",
                                fill: t.videoUrl ? "#2EC4B6" : "rgba(255,255,255,0.25)",
                              }}
                            />
                          </button>
                          <p
                            className="font-medium tracking-widest uppercase"
                            style={{
                              fontSize: "9px",
                              color: t.videoUrl ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)",
                              letterSpacing: "0.18em",
                            }}
                          >
                            {t.videoUrl ? "Watch story" : "Coming soon"}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next */}
          <button
            onClick={() => navigate(1)}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            style={{
              background: "rgba(10,15,30,0.8)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              color: "rgba(255,255,255,0.5)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)")}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Progress pills */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="transition-all duration-300"
              style={{
                height: 6,
                width: i === current ? 28 : 6,
                borderRadius: 3,
                background:
                  i === current
                    ? "#2EC4B6"
                    : i < current
                    ? "rgba(46,196,182,0.3)"
                    : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Testimonials;
