import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import WordByWord from "@/components/WordByWord";

const steps = [
  { emoji: "🌟", text: "You dream of studying abroad", accent: true },
  { emoji: "🔍", text: "Researching but overwhelmed by options" },
  { emoji: "😰", text: "Visa rules, fees, deadlines — a maze" },
  { emoji: "😟", text: "Don't know who to trust" },
  { emoji: "⏳", text: "Time passes, dream feels further away" },
  { emoji: "🔄", text: "Rinse and repeat..." },
];

const EmpathyLoop = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [showPunchline, setShowPunchline] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          steps.forEach((_, i) => {
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, i]);
            }, i * 330);
          });
          // Punchline after all cards + pause
          setTimeout(() => setShowPunchline(true), steps.length * 330 + 600);
          setTimeout(() => setShowButton(true), steps.length * 330 + 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-10 md:py-14" ref={sectionRef}>
      <div className="container">
        <h2
          className="text-2xl md:text-4xl font-extrabold text-center leading-tight mb-8"
          style={{ color: "hsl(var(--foreground))" }}
        >
          <WordByWord text="Do You Feel Stuck in a Loop?" underlineWord="Stuck" />
        </h2>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative flex items-center justify-center gap-0 max-w-5xl mx-auto">
            {steps.map((step, i) => {
              const isVisible = visibleSteps.includes(i);
              const isLast = i === steps.length - 1;
              return (
                <div key={i} className="flex items-center">
                  {/* Card */}
                  <div
                    className="flex flex-col items-center text-center px-3 py-4 rounded-xl bg-white shadow-md border border-gray-100 relative shrink-0 transition-all duration-500"
                    style={{
                      width: "155px",
                      minHeight: "140px",
                      opacity: isVisible ? 1 : 0,
                      transform: `scale(${isVisible ? 1 : 0.8})`,
                      borderLeft: step.accent ? "3px solid hsl(172, 67%, 45%)" : undefined,
                    }}
                  >
                    <span className="text-2xl mb-1">{step.emoji}</span>
                    <span className="text-[10px] font-bold mb-1 text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-xs font-medium leading-snug text-foreground">
                      {step.text}
                    </p>
                  </div>
                  {/* Dashed connector line */}
                  {!isLast && (
                    <svg width="32" height="2" className="shrink-0 mx-1">
                      <line
                        x1="0" y1="1" x2="32" y2="1"
                        stroke="hsl(172, 67%, 45%)"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                        strokeDashoffset={isVisible && visibleSteps.includes(i + 1) ? 0 : 32}
                        style={{ transition: "stroke-dashoffset 0.4s ease" }}
                      />
                    </svg>
                  )}
                </div>
              );
            })}
            {/* Loop-back arrow */}
            <svg
              width="60" height="50"
              className="absolute -bottom-8 right-[5%] transition-opacity duration-500"
              style={{ opacity: visibleSteps.length === 6 ? 0.5 : 0 }}
              viewBox="0 0 60 50"
            >
              <path
                d="M55 10 C55 40, 5 40, 5 10"
                fill="none"
                stroke="hsl(172, 67%, 45%)"
                strokeWidth="2"
                strokeDasharray="6 4"
                markerEnd="url(#arrowLoop)"
              />
              <defs>
                <marker id="arrowLoop" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="hsl(172, 67%, 45%)" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          <div className="flex items-center gap-3 w-max">
            {steps.map((step, i) => {
              const isVisible = visibleSteps.includes(i);
              return (
                <div key={i} className="flex items-center snap-center">
                  <div
                    className="flex flex-col items-center text-center px-3 py-3 rounded-xl bg-white shadow-sm border border-gray-100 shrink-0 transition-all duration-500"
                    style={{
                      width: "160px",
                      minHeight: "130px",
                      opacity: isVisible ? 1 : 0,
                      transform: `translateY(${isVisible ? 0 : 20}px)`,
                      borderLeft: step.accent ? "3px solid hsl(172, 67%, 45%)" : undefined,
                    }}
                  >
                    <span className="text-xl mb-1">{step.emoji}</span>
                    <span className="text-[10px] font-bold mb-1 text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-xs font-medium leading-snug text-foreground">
                      {step.text}
                    </p>
                  </div>
                  {i < steps.length - 1 && (
                    <span className="text-muted-foreground mx-1 text-xs">- - -</span>
                  )}
                </div>
              );
            })}
            <span className="text-muted-foreground text-lg pl-1">↻</span>
          </div>
        </div>

        {/* Punchline */}
        <div
          className="text-center mt-8 max-w-xl mx-auto transition-all duration-700"
          style={{
            opacity: showPunchline ? 1 : 0,
            transform: `translateY(${showPunchline ? 0 : 16}px)`,
          }}
        >
          <p className="text-sm md:text-base text-muted-foreground">
            Sound familiar? You're not alone. Thousands of students feel exactly the same way.
          </p>
          <p className="text-base md:text-lg font-bold mt-2 text-foreground">
            That's exactly why we built Applyza.
          </p>
          <div
            className="mt-5 transition-all duration-500"
            style={{
              opacity: showButton ? 1 : 0,
              transform: `translateY(${showButton ? 0 : 10}px)`,
            }}
          >
            <Button
              size="lg"
              className="rounded-full font-bold px-8 text-sm text-white animate-[pulse_1.5s_ease-in-out_1]"
              style={{ backgroundColor: "hsl(172, 67%, 45%)" }}
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
