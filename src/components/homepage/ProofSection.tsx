import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const CircularProgress = ({ value }: { value: number }) => {
  const { count, ref } = useCountUp(value);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (count / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#2EC4B6"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 0.1s" }}
        />
        <text
          x="60"
          y="60"
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize="28"
          fontWeight="800"
        >
          {count}%
        </text>
      </svg>
      <span className="text-white/80 text-sm mt-2">Visa Success Rate</span>
    </div>
  );
};

const ProofSection = () => (
  <section className="py-20 md:py-28" style={{ backgroundColor: "#1B2150" }}>
    <div className="container px-6">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-[48px] font-bold text-white leading-tight">
            Your Success Is Our Track Record
          </h2>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <CircularProgress value={99} />

          <div className="text-center md:text-left">
            <p className="text-white text-xl font-bold mb-1">
              3,000+ Students Across 150+ Universities
            </p>
            <p className="text-white/60 text-sm">
              Placed across the UK, Europe, and beyond
            </p>
          </div>

          <div className="text-center md:text-left">
            <p className="text-white font-bold mb-2">From 10+ Countries</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {["🇳🇬", "🇬🇭", "🇰🇪", "🇹🇷", "🇶🇦", "🇨🇾", "🇮🇳", "🇵🇰"].map(
                (flag) => (
                  <span key={flag} className="text-2xl">
                    {flag}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ProofSection;
