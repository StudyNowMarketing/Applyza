import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Applyza made the whole process feel effortless. From choosing my course to getting my visa — I never felt lost.",
    name: "Ella I.",
    country: "Nigeria",
    university: "York St. John University",
    course: "BSc Business Management",
    flag: "🇳🇬",
  },
  {
    quote: "I was overwhelmed by all the options. My counsellor helped me find the perfect programme and I got accepted within weeks.",
    name: "Fausat O.",
    country: "Nigeria",
    university: "York St. John University",
    course: "MSc International Relations",
    flag: "🇳🇬",
  },
  {
    quote: "The visa process was the part I was most nervous about. Applyza handled everything and I got approved on the first try.",
    name: "David A.",
    country: "Ghana",
    university: "University of Sunderland",
    course: "MSc Computer Science",
    flag: "🇬🇭",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((prev) => (prev + 1) % testimonials.length),
    []
  );

  const prev = useCallback(
    () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length),
    []
  );

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden" style={{ background: "#0a0d24" }}>
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[120px]" style={{ background: "#2EC4B6" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-[100px]" style={{ background: "#6B3FA0" }} />

      <div className="container relative z-10 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{ background: "rgba(46,196,182,0.15)", color: "#2EC4B6" }}>
            Student Stories
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            What Our{" "}
            <span style={{ color: "#2EC4B6" }}>Students</span>{" "}
            Say
          </h2>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            Don't just take our word for it. Hear from students who trusted us to guide their journey.
          </p>
        </div>

        {/* Cards */}
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop: show 3 */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="rounded-2xl p-5 backdrop-blur-md"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {/* Video placeholder */}
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4"
                  style={{ background: "linear-gradient(135deg, #1a1f4d, #0a0d24)" }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
                      style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                      <Play size={20} fill="white" className="text-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded"
                    style={{ background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.7)" }}>
                    2:30
                  </div>
                </div>

                {/* Info */}
                <p className="font-bold text-white text-sm">{t.name}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{t.course}</p>
                <p className="text-[11px] font-medium mt-0.5" style={{ color: "#2EC4B6" }}>{t.university}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{t.flag} {t.country}</p>

                {/* Stars */}
                <div className="flex gap-0.5 mt-2.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12} fill="#FBBF24" className="text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs leading-relaxed mt-3" style={{ color: "rgba(255,255,255,0.7)" }}>
                  "{t.quote}"
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile: carousel */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl p-5 backdrop-blur-md"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4"
                  style={{ background: "linear-gradient(135deg, #1a1f4d, #0a0d24)" }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
                      style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                      <Play size={20} fill="white" className="text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <p className="font-bold text-white text-sm">{testimonials[current].name}</p>
                <p className="text-[11px] font-medium mt-0.5" style={{ color: "#2EC4B6" }}>{testimonials[current].university}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{testimonials[current].flag} {testimonials[current].country}</p>
                <div className="flex gap-0.5 mt-2.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12} fill="#FBBF24" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs leading-relaxed mt-3" style={{ color: "rgba(255,255,255,0.7)" }}>
                  "{testimonials[current].quote}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
              aria-label="Previous testimonial">
              <ChevronLeft size={18} className="text-white" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "scale-125" : "opacity-40"}`}
                  style={{ background: i === current ? "#2EC4B6" : "rgba(255,255,255,0.5)" }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
              aria-label="Next testimonial">
              <ChevronRight size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
