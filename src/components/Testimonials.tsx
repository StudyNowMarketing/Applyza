import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ella I.",
    country: "Nigeria",
    university: "York St. John University",
    photo: "EI",
    color: "#2EC4B6",
    quote:
      "Applyza made the whole process feel effortless. From choosing my course to getting my visa — I never felt lost.",
    before: "Confused about where to start, overwhelmed by options, and unsure about visa requirements.",
    after: "Enrolled at York St. John University with a clear plan, visa approved on first attempt.",
    videoPlaceholder: true,
  },
  {
    name: "Fausat O.",
    country: "Nigeria",
    university: "York St. John University",
    photo: "FO",
    color: "#6B3FA0",
    quote:
      "I was overwhelmed by all the options. My counsellor helped me find the perfect programme and I got accepted within weeks.",
    before: "Didn't know which programme suited my career goals. Applied to wrong courses twice before.",
    after: "Accepted into her ideal programme within 3 weeks of working with Applyza.",
    videoPlaceholder: true,
  },
  {
    name: "David A.",
    country: "Ghana",
    university: "University of Sunderland",
    photo: "DA",
    color: "#E67E22",
    quote:
      "The visa process was the part I was most nervous about. Applyza handled everything and I got approved on the first try.",
    before: "Terrified of visa rejection after hearing stories from friends. Had no idea how to prepare documents.",
    after: "Visa approved on the first try. Now studying at the University of Sunderland with confidence.",
    videoPlaceholder: true,
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
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24" style={{ background: "transparent" }}>
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(46,196,182,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container relative z-10">
        {/* Heading */}
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

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
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
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
                  {/* Left — Student Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Photo with rotating border */}
                    <div className="relative w-28 h-28 mb-5">
                      <svg
                        className="absolute inset-0 w-full h-full animate-spin"
                        style={{ animationDuration: "8s" }}
                        viewBox="0 0 120 120"
                      >
                        <circle
                          cx="60"
                          cy="60"
                          r="56"
                          fill="none"
                          stroke={t.color}
                          strokeWidth="3"
                          strokeDasharray="40 20"
                          strokeLinecap="round"
                          opacity={0.6}
                        />
                      </svg>
                      <div
                        className="absolute inset-2 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                        style={{
                          background: `linear-gradient(135deg, ${t.color} 0%, ${t.color}88 100%)`,
                        }}
                      >
                        {t.photo}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white">{t.name}</h3>
                    <p className="text-white/40 text-sm">
                      {t.country} → {t.university}
                    </p>

                    {/* Quote */}
                    <div className="mt-5 relative px-4">
                      <Quote size={16} className="text-secondary/30 absolute -top-1 -left-0" />
                      <p className="italic text-white/60 text-sm leading-relaxed">
                        {t.quote}
                      </p>
                    </div>

                    {/* Video placeholder */}
                    {t.videoPlaceholder && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.35, duration: 0.3 }}
                        className="mt-6 w-48 h-28 rounded-xl border border-white/10 flex items-center justify-center cursor-pointer group relative overflow-hidden"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{ background: `${t.color}33`, border: `2px solid ${t.color}66` }}
                        >
                          <Play size={16} className="text-white ml-0.5" />
                        </div>
                        <span className="absolute bottom-2 text-[10px] text-white/30 font-medium">
                          Watch video review
                        </span>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Right — Before / After cards */}
                  <div className="flex flex-col gap-4 relative">
                    {/* Connecting arrow SVG */}
                    <svg
                      className="absolute left-6 top-[calc(50%-20px)] w-1 h-10 hidden md:block"
                      viewBox="0 0 2 40"
                    >
                      <motion.line
                        x1="1" y1="0" x2="1" y2="40"
                        stroke={t.color}
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      />
                    </svg>

                    {/* Before card */}
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="rounded-2xl p-6 border border-white/10"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: "#E74C3C44", border: "1.5px solid #E74C3C66" }}
                        >
                          B
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-red-400/70">
                          Before Applyza
                        </span>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed">{t.before}</p>
                    </motion.div>

                    {/* Arrow between cards */}
                    <div className="flex justify-center">
                      <motion.svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                      >
                        <path
                          d="M12 4 L12 18 M6 14 L12 20 L18 14"
                          fill="none"
                          stroke={t.color}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </div>

                    {/* After card */}
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                      className="rounded-2xl p-6 border"
                      style={{
                        background: `${t.color}08`,
                        borderColor: `${t.color}22`,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: `${t.color}44`, border: `1.5px solid ${t.color}66` }}
                        >
                          A
                        </span>
                        <span
                          className="text-xs font-semibold uppercase tracking-wider"
                          style={{ color: `${t.color}aa` }}
                        >
                          After Applyza
                        </span>
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed">{t.after}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "scale-125"
                    : "bg-white/15 hover:bg-white/25"
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
