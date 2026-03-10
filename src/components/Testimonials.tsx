import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

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

  const next = useCallback(
    () => setCurrent((prev) => (prev + 1) % testimonials.length),
    []
  );

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="bg-muted">
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-4">
            Real Stories. Real Results.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Hear from students who trusted us
            to guide their journey.
          </p>
        </div>

        <div className="relative max-w-[700px] mx-auto min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-2xl shadow-sm p-10 md:p-14 text-center"
            >
              <Quote className="mx-auto mb-5 text-secondary/40" size={48} />
              <p className="italic text-foreground leading-relaxed mb-8 text-base md:text-lg">
                "{testimonials[current].quote}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-primary">
                  {testimonials[current].name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-bold text-primary text-sm">
                    {testimonials[current].name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonials[current].country} →{" "}
                    {testimonials[current].university}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? "bg-secondary scale-125" : "bg-muted-foreground/30"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
