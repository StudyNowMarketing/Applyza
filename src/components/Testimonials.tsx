import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "Applyza made the whole process feel effortless. From choosing my course to getting my visa — I never felt lost.",
    name: "Ella I.",
    country: "Nigeria",
    university: "York St. John University",
  },
  {
    quote:
      "I was overwhelmed by all the options. My counsellor helped me find the perfect programme and I got accepted within weeks.",
    name: "Fausat O.",
    country: "Nigeria",
    university: "York St. John University",
  },
  {
    quote:
      "The visa process was the part I was most nervous about. Applyza handled everything and I got approved on the first try.",
    name: "David A.",
    country: "Ghana",
    university: "University of Sunderland",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const next = useCallback(
    () => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
      setProgress(0);
    },
    []
  );

  useEffect(() => {
    const timer = setInterval(next, 5000);
    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, 100);
    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [next, current]);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(46,196,182,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container relative z-10 py-16 md:py-24">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
            Real Stories. Real Results.
          </h2>
          <div className="w-12 h-1 bg-secondary rounded-full mx-auto mb-4" />
          <p className="text-white/40 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from students who trusted us
            to guide their journey.
          </p>
        </div>

        <div className="relative max-w-[700px] mx-auto min-h-[280px]">
          {/* Large decorative quotation mark */}
          <div className="absolute -top-4 left-4 md:left-8 text-[120px] leading-none font-serif text-secondary/10 pointer-events-none select-none">
            &ldquo;
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl p-10 md:p-14 text-center border border-white/10"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <p className="italic text-white/80 leading-relaxed mb-8 text-base md:text-lg">
                "{testimonials[current].quote}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white ring-2 ring-secondary/50"
                  style={{
                    background: "linear-gradient(135deg, #2EC4B6 0%, #1a8a80 100%)",
                  }}
                >
                  {testimonials[current].name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-bold text-white text-sm">
                    {testimonials[current].name}
                  </p>
                  <p className="text-xs text-white/40">
                    {testimonials[current].country} →{" "}
                    {testimonials[current].university}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots with progress */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setProgress(0); }}
              className="relative w-8 h-1.5 rounded-full overflow-hidden transition-all bg-white/10"
              aria-label={`Go to testimonial ${i + 1}`}
            >
              {i === current && (
                <div
                  className="absolute inset-y-0 left-0 bg-secondary rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              )}
              {i < current && (
                <div className="absolute inset-0 bg-secondary/40 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
