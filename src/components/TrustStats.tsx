import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 3000, suffix: "+", label: "Students Placed", sublabel: "Worldwide" },
  { value: 150, suffix: "+", label: "Partner Universities", sublabel: "UK, Europe & beyond" },
  { value: 99, suffix: "%", label: "Visa Success", sublabel: "Approval rate" },
  { value: 10, suffix: "+", label: "Years Experience", sublabel: "Industry expertise" },
];

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const doneRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          runAnimation();
        }
        // Snap to final if scrolled past before animation completes
        if (!entry.isIntersecting && startedRef.current && !doneRef.current) {
          doneRef.current = true;
          setCount(target);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    const startTime = { current: 0 };
    let rafId: number;

    function runAnimation() {
      startTime.current = performance.now();
      const step = (now: number) => {
        if (doneRef.current) return;
        const elapsed = now - startTime.current;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic for snappy feel
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        setCount(current);
        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          doneRef.current = true;
        }
      };
      rafId = requestAnimationFrame(step);
    }

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, duration]);

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
    <div ref={ref} className="text-center px-4 py-6">
      <div className="text-4xl md:text-5xl font-bold italic" style={{ color: "#2EC4B6" }}>
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-white font-semibold text-sm mt-2">{label}</div>
      <div className="text-white/50 text-xs mt-0.5">{sublabel}</div>
    </div>
  );
};

const TrustStats = () => {
  return (
    <section className="relative" style={{ backgroundColor: "#0a0d24" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container relative z-10 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative -mb-px">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z"
            fill="#f8f9fa"
          />
        </svg>
      </div>
    </section>
  );
};

export default TrustStats;
