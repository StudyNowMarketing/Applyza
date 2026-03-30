import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ella I.",
    country: "Nigeria",
    university: "York St. John University",
    initials: "EI",
    color: "#2EC4B6",
    quote:
      "Applyza made the whole process feel effortless. From choosing my course to getting my visa — I never felt lost.",
    hasVideo: true,
  },
  {
    name: "Fausat O.",
    country: "Nigeria",
    university: "York St. John University",
    initials: "FO",
    color: "#6B3FA0",
    quote:
      "I was overwhelmed by all the options. My counsellor helped me find the perfect programme and I got accepted within weeks.",
    hasVideo: true,
  },
  {
    name: "David A.",
    country: "Ghana",
    university: "University of Sunderland",
    initials: "DA",
    color: "#E67E22",
    quote:
      "The visa process was the part I was most nervous about. Applyza handled everything and I got approved on the first try.",
    hasVideo: true,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    startTimer();
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
    startTimer();
  };

  const next = () => {
    setDirection(1);
    setCurrent((p) => (p + 1) % testimonials.length);
    startTimer();
  };

  const t = testimonials[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24" style={{ background: "transparent" }}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(46,196,182,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container relative z-10">
        <div className="text-center mb-14">
          <p className="text-secondary/60 uppercase tracking-[0.2em] text-xs font-semibold mb-3">
            Student Journeys
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
            Their Dream Became Reality
          </h2>
          <div className="w-12 h-1 bg-secondary rounded-full mx-auto mb-4" />
          <p className="text-white/40 max-w-xl mx-auto text-sm">
            Real students. Real transformations. See how they broke out of the loop.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <button
            onClick={prev}
            className="absolute -left-4 md:-left-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 md:-right-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="rounded-2xl border border-white/10 overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_320px]">
                  {/* Left — text content */}
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-5">
                      {/* Larger photo placeholder */}
                      <div className="relative w-[72px] h-[72px] shrink-0">
                        <svg
                          className="absolute inset-0 w-full h-full animate-spin"
                          style={{ animationDuration: "8s" }}
                          viewBox="0 0 76 76"
                        >
                          <circle
                            cx="38"
                            cy="38"
                            r="36"
                            fill="none"
                            stroke={t.color}
                            strokeWidth="2"
                            strokeDasharray="24 14"
                            strokeLinecap="round"
                            opacity={0.6}
                          />
                        </svg>
                        <div
                          className="absolute inset-[5px] rounded-full flex items-center justify-center text-lg font-bold text-white"
                          style={{
                            background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                          }}
                        >
                          {t.initials}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{t.name}</h3>
                        <p className="text-white/40 text-sm">
                          {t.country} → {t.university}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <Quote size={14} className="text-secondary/20 absolute -top-1 -left-1" />
                      <p className="italic text-white/70 leading-relaxed text-[15px] pl-5">
                        "{t.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Right — landscape video thumbnail */}
                  {t.hasVideo && (
                    <div
                      className="relative cursor-pointer group border-t md:border-t-0 md:border-l border-white/10 aspect-video md:aspect-auto"
                      style={{ background: `${t.color}08` }}
                    >
                      {/* 16:9 ratio enforcer for desktop */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                            style={{
                              background: `${t.color}22`,
                              border: `2px solid ${t.color}55`,
                            }}
                          >
                            <Play size={20} className="text-white ml-0.5" />
                          </div>
                          <span className="text-[11px] text-white/30 font-medium">
                            Watch video review
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "scale-125" : "bg-white/15 hover:bg-white/25"
                }`}
                style={i === current ? { background: t.color } : undefined}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
