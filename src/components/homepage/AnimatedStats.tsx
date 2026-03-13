import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 3000, suffix: "+", label: "Students Placed", gradient: "linear-gradient(135deg, rgba(46,196,182,0.85), rgba(46,196,182,0.4))" },
  { value: 150, suffix: "+", label: "Partner Universities", gradient: "linear-gradient(135deg, rgba(107,63,160,0.85), rgba(107,63,160,0.4))" },
  { value: 99, suffix: "%", label: "Visa Success Rate", gradient: "linear-gradient(135deg, rgba(46,196,182,0.85), rgba(46,196,182,0.4))" },
  { value: 6, suffix: "", label: "Global Offices", gradient: "linear-gradient(135deg, rgba(27,33,80,0.85), rgba(27,33,80,0.4))" },
  { value: 10, suffix: "+", label: "Years Experience", gradient: "linear-gradient(135deg, rgba(107,63,160,0.85), rgba(107,63,160,0.4))" },
];

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const StatCard = ({
  value,
  suffix,
  label,
  gradient,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  gradient: string;
  index: number;
}) => {
  const { count, ref } = useCountUp(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative min-w-[260px] md:min-w-0 w-[260px] md:w-auto h-[360px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer group flex-shrink-0"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
    >
      {/* Background placeholder + gradient overlay */}
      <div className="absolute inset-0 bg-gray-800" />
      <div className="absolute inset-0" style={{ background: gradient }} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
        <span className="text-5xl md:text-6xl font-extrabold text-white mb-3">
          {count.toLocaleString()}
          {suffix}
        </span>
        <span className="text-white/90 text-base md:text-lg font-semibold text-center">
          {label}
        </span>
      </div>

      {/* Hover scale effect */}
      <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105" />
    </motion.div>
  );
};

const AnimatedStats = () => (
  <section className="py-20 md:py-28 bg-white">
    <div className="container px-6">
      <div className="flex gap-5 overflow-x-auto md:overflow-visible md:grid md:grid-cols-5 snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default AnimatedStats;
