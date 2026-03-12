import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 3000, suffix: "+", label: "Students Placed", sublabel: "Worldwide" },
  { value: 150, suffix: "+", label: "Partner Universities", sublabel: "UK, Europe & beyond" },
  { value: 99, suffix: "%", label: "Visa Success", sublabel: "Approval rate" },
  { value: 10, suffix: "+", label: "Years Experience", sublabel: "Industry expertise" },
];

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { count, ref };
}

const StatItem = ({
  value,
  suffix,
  label,
  sublabel,
}: {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}) => {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center px-4 py-8">
      <div
        className="text-5xl md:text-6xl font-bold italic"
        style={{ color: "#2EC4B6" }}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-white font-semibold text-base mt-3">{label}</div>
      <div className="text-white/50 text-sm mt-1">{sublabel}</div>
    </div>
  );
};

const TrustStats = () => {
  return (
    <section className="relative" style={{ backgroundColor: "#0a0d24" }}>
      {/* Dot grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative -mb-px">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
            fill="#f8f9fa"
          />
        </svg>
      </div>
    </section>
  );
};

export default TrustStats;
