import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 3000, suffix: "+", label: "Students Placed Worldwide" },
  { value: 150, suffix: "+", label: "Partner Universities" },
  { value: 99, suffix: "%", label: "Visa Success Rate" },
  { value: 100, suffix: "%", label: "Free for Students" },
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
  isLast,
}: {
  value: number;
  suffix: string;
  label: string;
  isLast: boolean;
}) => {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="flex items-center">
      <div className="text-center px-4 py-6 flex-1">
        <div className="text-3xl md:text-5xl font-extrabold text-primary">
          {count.toLocaleString()}
          {suffix}
        </div>
        <div className="text-sm text-muted-foreground mt-1">{label}</div>
      </div>
      {!isLast && (
        <div className="hidden md:block w-px h-12 bg-border shrink-0" />
      )}
    </div>
  );
};

const TrustStats = () => {
  return (
    <section className="bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <StatItem key={s.label} {...s} isLast={i === stats.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
