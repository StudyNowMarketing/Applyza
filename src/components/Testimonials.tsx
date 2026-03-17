import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import HandUnderline from "@/components/HandUnderline";

const stories = [
  {
    name: "Ella I.",
    country: "Nigeria",
    flag: "🇳🇬",
    before: "Overwhelmed by options, no guidance",
    after: "BSc Business Management",
    university: "York St John University",
    quote: "Applyza made the whole process feel effortless. From choosing my course to getting my visa — I never felt lost.",
    beforeEmoji: "😰",
    afterEmoji: "🎉",
  },
  {
    name: "Fausat O.",
    country: "Nigeria",
    flag: "🇳🇬",
    before: "Confused about visa requirements",
    after: "MSc International Relations",
    university: "York St John University",
    quote: "I was overwhelmed by all the options. My counsellor helped me find the perfect programme and I got accepted within weeks.",
    beforeEmoji: "😟",
    afterEmoji: "🎓",
  },
  {
    name: "David A.",
    country: "Ghana",
    flag: "🇬🇭",
    before: "Nervous about visa rejection",
    after: "MSc Computer Science",
    university: "University of Sunderland",
    quote: "The visa process was the part I was most nervous about. Applyza handled everything and I got approved on the first try.",
    beforeEmoji: "😥",
    afterEmoji: "✈️",
  },
  {
    name: "Ahmed K.",
    country: "Türkiye",
    flag: "🇹🇷",
    before: "Didn't think I could afford to study in the UK",
    after: "MBA (with scholarship)",
    university: "University of Wolverhampton",
    quote: "Applyza found me a scholarship I didn't even know existed. Completely changed my life.",
    beforeEmoji: "💸",
    afterEmoji: "🏆",
  },
  {
    name: "Grace M.",
    country: "Kenya",
    flag: "🇰🇪",
    before: "Applied alone twice and got rejected",
    after: "BSc Nursing",
    university: "University of East London",
    quote: "After two rejections on my own, Applyza got me accepted on the first try. I wish I'd found them sooner.",
    beforeEmoji: "😞",
    afterEmoji: "🎊",
  },
];

const AUTO_INTERVAL = 8000;

const StarRow = ({ delay }: { delay: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, j) => (
      <motion.div
        key={j}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + j * 0.1, duration: 0.2 }}
      >
        <Star size={14} fill="#FBBF24" className="text-yellow-400" />
      </motion.div>
    ))}
  </div>
);

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setCurrent((p) => (p + 1) % stories.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + stories.length) % stories.length), []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, AUTO_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next, isPaused, current]);

  const s = stories[current];

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#F5F6FA" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-extrabold uppercase"
          style={{ fontSize: "250px", color: "rgba(0,0,0,0.02)", lineHeight: 1 }}
        >
          STORIES
        </span>
      </div>

      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

      <div className="container relative z-10 py-14 md:py-20">
        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3"
            style={{ background: "rgba(46,196,182,0.12)", color: "#2EC4B6" }}
          >
            Student Stories
          </span>
          <h2 className="text-xl md:text-3xl font-extrabold mb-2" style={{ color: "#1B2150" }}>
            Their Dream Became <HandUnderline>Reality</HandUnderline>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Real students. Real journeys. Real transformations.
          </p>
        </div>

        {/* Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_0.8fr] gap-6 lg:gap-8 items-center max-w-6xl mx-auto"
          >
            {/* ── LEFT: Student info ── */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative mb-4"
              >
                {/* Rotating border ring */}
                <div
                  className="absolute -inset-2 rounded-full animate-spin"
                  style={{
                    border: "2px dashed #2EC4B6",
                    animationDuration: "12s",
                  }}
                />
                <div
                  className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] rounded-full flex items-center justify-center text-5xl lg:text-6xl"
                  style={{ backgroundColor: "rgba(46,196,182,0.08)", border: "3px solid #2EC4B6" }}
                >
                  {s.flag}
                </div>
              </motion.div>

              <h3 className="text-xl lg:text-2xl font-bold" style={{ color: "#1B2150" }}>{s.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.flag} {s.country}</p>

              <div className="mt-3">
                <StarRow delay={0.8} />
              </div>
            </div>

            {/* ── MIDDLE: Before / After ── */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 relative">
              {/* Before */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex-1 rounded-xl p-5 card-glow"
                style={{ backgroundColor: "#f0f0f3", border: "1px solid #e5e5ea" }}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#EF4444" }}>Before</span>
                <div className="text-3xl mt-2 mb-2">{s.beforeEmoji}</div>
                <p className="text-sm font-medium" style={{ color: "#6b7280" }}>{s.before}</p>
              </motion.div>

              {/* Arrow */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="hidden sm:flex items-center justify-center px-1"
                style={{ transformOrigin: "left" }}
              >
                <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
                  <path d="M0 12h40m0 0l-8-8m8 8l-8 8" stroke="#2EC4B6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              {/* Mobile arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="sm:hidden flex justify-center -my-1"
              >
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                  <path d="M12 0v24m0 0l-7-7m7 7l7-7" stroke="#2EC4B6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>

              {/* After */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex-1 rounded-xl p-5 card-glow"
                style={{ backgroundColor: "rgba(46,196,182,0.08)", border: "1px solid rgba(46,196,182,0.25)" }}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#22c55e" }}>After</span>
                <div className="text-3xl mt-2 mb-2">{s.afterEmoji}</div>
                <p className="text-sm font-bold" style={{ color: "#1B2150" }}>{s.after}</p>
                <p className="text-xs font-semibold mt-1" style={{ color: "#2EC4B6" }}>{s.university}</p>
              </motion.div>
            </div>

            {/* ── RIGHT: Quote + video ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-col items-center lg:items-start"
            >
              <Quote size={36} style={{ color: "#2EC4B6", opacity: 0.3 }} className="mb-2" />
              <p className="italic text-sm leading-relaxed mb-4" style={{ color: "#4b5563" }}>
                "{s.quote}"
              </p>

              {/* Video placeholder */}
              <div
                className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer group"
                style={{ background: "linear-gradient(135deg, #1B2150, #0a0d24)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
                  >
                    <Play size={16} fill="white" className="text-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-3 text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Watch {s.name.split(" ")[0]}'s Story
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(27,33,80,0.08)", border: "1px solid rgba(27,33,80,0.12)" }}
            aria-label="Previous story"
          >
            <ChevronLeft size={16} style={{ color: "#1B2150" }} />
          </button>
          <div className="flex gap-2">
            {stories.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{
                  background: i === current ? "#2EC4B6" : "rgba(27,33,80,0.15)",
                  transform: i === current ? "scale(1.3)" : "scale(1)",
                }}
                aria-label={`Go to story ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(27,33,80,0.08)", border: "1px solid rgba(27,33,80,0.12)" }}
            aria-label="Next story"
          >
            <ChevronRight size={16} style={{ color: "#1B2150" }} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
