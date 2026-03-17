import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HandUnderline from "@/components/HandUnderline";

const steps = [
  { emoji: "🌟", text: "You dream of studying abroad", accent: true },
  { emoji: "🔍", text: "You start researching but get overwhelmed by options" },
  { emoji: "😰", text: "Visa rules, tuition fees, deadlines — it feels like a maze" },
  { emoji: "😟", text: "You don't know who to trust or where to start" },
  { emoji: "⏳", text: "Time passes and your dream feels further away" },
  { emoji: "🔄", text: "Rinse and repeat..." },
];

const EmpathyLoop = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          steps.forEach((_, i) => {
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, i]);
            }, i * 300);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Calculate positions in a circle
  const getPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radiusX = 42; // % from center
    const radiusY = 38;
    return {
      left: `${50 + radiusX * Math.cos(angle)}%`,
      top: `${50 + radiusY * Math.sin(angle)}%`,
    };
  };

  return (
    <section className="bg-white py-16 md:py-20" ref={sectionRef}>
      <div className="container">
        <h2 className="text-2xl md:text-[44px] font-extrabold text-center leading-tight mb-12" style={{ color: "#1B2150" }}>
          Do You Feel <HandUnderline>Stuck</HandUnderline> in a Loop?
        </h2>

        {/* Circular loop — desktop */}
        <div className="hidden md:block relative mx-auto" style={{ maxWidth: "700px", height: "500px" }}>
          {/* Dotted circle path */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 500">
            <ellipse cx="350" cy="250" rx="290" ry="190" fill="none" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="8 8" />
            {/* Arrows along the path */}
            {steps.map((_, i) => {
              const angle = (i / steps.length) * 2 * Math.PI - Math.PI / 2;
              const nextAngle = ((i + 1) / steps.length) * 2 * Math.PI - Math.PI / 2;
              const midAngle = (angle + nextAngle) / 2;
              const ax = 350 + 290 * Math.cos(midAngle);
              const ay = 250 + 190 * Math.sin(midAngle);
              const rot = (midAngle * 180) / Math.PI + 90;
              return (
                <text
                  key={i}
                  x={ax}
                  y={ay}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#d1d5db"
                  fontSize="16"
                  transform={`rotate(${rot}, ${ax}, ${ay})`}
                >
                  ›
                </text>
              );
            })}
          </svg>

          {steps.map((step, i) => {
            const pos = getPosition(i, steps.length);
            const isVisible = visibleSteps.includes(i);
            return (
              <div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                style={{
                  left: pos.left,
                  top: pos.top,
                  opacity: isVisible ? 1 : 0,
                  transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.8})`,
                }}
              >
                <div
                  className="flex flex-col items-center text-center px-3 py-4 rounded-xl bg-white shadow-md border border-gray-100"
                  style={{
                    width: "160px",
                    borderLeft: step.accent ? "3px solid #2EC4B6" : undefined,
                  }}
                >
                  <span className="text-2xl mb-1">{step.emoji}</span>
                  <span className="text-[11px] font-bold mb-1" style={{ color: "#9ca3af" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-xs font-medium leading-snug" style={{ color: "#1B2150" }}>
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical list */}
        <div className="md:hidden space-y-3 max-w-sm mx-auto">
          {steps.map((step, i) => {
            const isVisible = visibleSteps.includes(i);
            return (
              <div key={i} className="relative">
                <div
                  className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-gray-100 transition-all duration-500"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: `translateY(${isVisible ? 0 : 20}px)`,
                    borderLeft: step.accent ? "3px solid #2EC4B6" : undefined,
                  }}
                >
                  <span className="text-xl">{step.emoji}</span>
                  <div>
                    <span className="text-[10px] font-bold" style={{ color: "#9ca3af" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-medium leading-snug" style={{ color: "#1B2150" }}>
                      {step.text}
                    </p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="w-px h-4 bg-gray-200" />
                  </div>
                )}
              </div>
            );
          })}
          {/* Loop back arrow */}
          <div className="flex justify-center">
            <span className="text-gray-300 text-lg">↻</span>
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center mt-10 max-w-xl mx-auto">
          <p className="text-sm md:text-base" style={{ color: "#6b7280" }}>
            Sound familiar? You're not alone. Thousands of students feel exactly the same way.
          </p>
          <p className="text-base md:text-lg font-bold mt-3" style={{ color: "#1B2150" }}>
            That's exactly why we built Applyza.
          </p>
          <div className="mt-6">
            <Button
              size="lg"
              className="rounded-full font-bold px-8 text-sm text-white"
              style={{ backgroundColor: "#2EC4B6" }}
              asChild
            >
              <Link to="/book-a-consultation">
                Break the Loop <ArrowRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmpathyLoop;
