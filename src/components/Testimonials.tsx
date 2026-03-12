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
      {/* Subtle top separator */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />

      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-20 blur-[120px]" style={{ background: "#2EC4B6" }} />
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full opacity-15 blur-[100px]" style={{ background: "#6B3FA0" }} />

      <div className="container relative z-10 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3"
            style={{ background: "rgba(46,196,182,0.15)", color: "#2EC4B6" }}>
            Student Stories
          </span>
          <h2 className="text-xl md:text-3xl font-extrabold text-white mb-2">
            What Our{" "}
            <span style={{ color: "#2EC4B6" }}>Students</span>{" "}
            Say
          </h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            Hear from students who trusted us to guide their journey.
          </p>
        </div>

        {/* Cards */}
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop: show 3 */}
          <div className="hidden md:grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="rounded-xl p-4 backdrop-blur-md"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {/* Video placeholder */}
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3"
                  style={{ background: "linear-gradient(135deg, #1a1f4d, #0a0d24)" }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
                      style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                      <Play size={18} fill="white" className="text-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 text-[9px] font-medium px-2 py-0.5 rounded"
                    style={{ background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.7)" }}>
                    2:30
                  </div>
                </div>

                <p className="font-bold text-white text-sm">{t.name}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{t.course}</p>
                <p className="text-[10px] font-medium mt-0.5" style={{ color: "#2EC4B6" }}>{t.university}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{t.flag} {t.country}</p>

                <div className="flex gap-0.5 mt-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={11} fill="#FBBF24" className="text-yellow-400" />
                  ))}
                </div>

                <p className="text-xs leading-relaxed mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>
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
                className="rounded-xl p-4 backdrop-blur-md"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3"
                  style={{ background: "linear-gradient(135deg, #1a1f4d, #0a0d24)" }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
                      style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                      <Play size={18} fill="white" className="text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <p className="font-bold text-white text-sm">{testimonials[current].name}</p>
                <p className="text-[10px] font-medium mt-0.5" style={{ color: "#2EC4B6" }}>{testimonials[current].university}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{testimonials[current].flag} {testimonials[current].country}</p>
                <div className="flex gap-0.5 mt-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={11} fill="#FBBF24" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs leading-relaxed mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                  "{testimonials[current].quote}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
              aria-label="Previous testimonial">
              <ChevronLeft size={16} className="text-white" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? "scale-125" : "opacity-40"}`}
                  style={{ background: i === current ? "#2EC4B6" : "rgba(255,255,255,0.5)" }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
              aria-label="Next testimonial">
              <ChevronRight size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
