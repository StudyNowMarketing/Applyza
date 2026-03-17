import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Search, FileWarning, ShieldQuestion, Hourglass, RotateCcw } from "lucide-react";
import WordByWord from "@/components/WordByWord";
import { useIsMobile } from "@/hooks/use-mobile";

const steps = [
  { icon: Sparkles, text: "You dream of studying abroad" },
  { icon: Search, text: "Overwhelmed by all the options" },
  { icon: FileWarning, text: "Visa rules, fees, deadlines — a maze" },
  { icon: ShieldQuestion, text: "Don't know who to trust" },
  { icon: Hourglass, text: "Time passes, dream feels further away" },
  { icon: RotateCcw, text: "Rinse and repeat..." },
];

const INNER_R = 130;
const OUTER_R = 230;
const INNER_DUR = 35;
const OUTER_DUR = 45;

const OrbitItem = ({
  step,
  index,
  radius,
  duration,
  reverse,
  paused,
}: {
  step: (typeof steps)[0];
  index: number;
  radius: number;
  duration: number;
  reverse: boolean;
  paused: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = step.icon;
  const count = reverse ? 3 : 3;
  const delay = ((index % 3) * (duration / count)).toFixed(1);
  const size = reverse ? 80 : 70;
  const half = size / 2;

  return (
    <div
      className="absolute left-1/2 top-1/2 animate-orbit"
      style={{
        marginLeft: -half,
        marginTop: -half,
        width: size,
        height: size,
        "--radius": radius,
        "--duration": duration,
        animationDelay: `-${delay}s`,
        animationDirection: reverse ? "reverse" : "normal",
        animationPlayState: paused ? "paused" : "running",
        willChange: "transform",
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Counter-rotate wrapper keeps content upright */}
      <div
        className="w-full h-full"
        style={{
          animation: `${reverse ? "counter-orbit-reverse" : "counter-orbit"} ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <div
          className="flex flex-col items-center transition-transform duration-300"
          style={{ transform: hovered ? "scale(1.4)" : "scale(1)" }}
        >
          {/* Circle + badge */}
          <div
            className="rounded-full shadow-md flex items-center justify-center relative border border-border transition-colors duration-300"
            style={{
              width: size,
              height: size,
              background: hovered ? "hsl(var(--secondary))" : "hsl(var(--background))",
            }}
          >
            <Icon
              size={24}
              className="transition-colors duration-300"
              style={{ color: hovered ? "hsl(var(--secondary-foreground))" : "hsl(var(--foreground))" }}
            />
            {/* Step number badge */}
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold flex items-center justify-center"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Permanent label */}
          <div
            className="mt-2 bg-background rounded-lg shadow-sm px-3 py-1.5 text-center transition-all duration-300"
            style={{
              maxWidth: 150,
              borderLeft: hovered ? "3px solid hsl(var(--secondary))" : "3px solid transparent",
              fontSize: hovered ? 15 : 13,
            }}
          >
            <span className="font-medium text-foreground leading-tight block">{step.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmpathyLoop = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showText, setShowText] = useState(false);
  const [mobileVisible, setMobileVisible] = useState<number[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (isMobile) {
      steps.forEach((_, i) => {
        setTimeout(() => setMobileVisible((p) => [...p, i]), i * 300);
      });
      setTimeout(() => setShowText(true), steps.length * 300 + 400);
    } else {
      setTimeout(() => setShowText(true), 800);
    }
  }, [inView, isMobile]);

  return (
    <section className="bg-background py-10 md:py-14" ref={sectionRef}>
      <div className="container">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center leading-tight mb-8 text-foreground">
          <WordByWord text="Do You Feel Stuck in a Loop?" underlineWord="Stuck" />
        </h2>

        {/* Desktop orbit */}
        {!isMobile && (
          <div className="relative mx-auto flex items-center justify-center" style={{ width: 540, height: 580 }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 540 580">
              <circle cx="270" cy="290" r={INNER_R} fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="6 4" />
              <circle cx="270" cy="290" r={OUTER_R} fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="6 4" />
            </svg>

            {/* Center */}
            <div className="absolute z-10 flex flex-col items-center justify-center">
              <span
                className="text-[28px] font-extrabold text-foreground tracking-tight"
                style={{ textShadow: "0 0 20px hsl(var(--secondary) / 0.4)" }}
              >
                The Loop
              </span>
            </div>

            {/* Inner orbit */}
            {steps.slice(0, 3).map((step, i) => (
              <OrbitItem key={i} step={step} index={i} radius={INNER_R} duration={INNER_DUR} reverse={false} paused={paused} />
            ))}

            {/* Outer orbit */}
            {steps.slice(3).map((step, idx) => (
              <OrbitItem key={idx + 3} step={step} index={idx + 3} radius={OUTER_R} duration={OUTER_DUR} reverse paused={paused} />
            ))}
          </div>
        )}

        {/* Mobile fallback */}
        {isMobile && (
          <div className="flex flex-col items-center gap-0 relative px-4">
            <div className="absolute top-0 bottom-8 left-1/2 -translate-x-1/2 w-px border-l-2 border-dashed border-muted-foreground/20" />
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isVisible = mobileVisible.includes(i);
              return (
                <div key={i} className="relative z-10 flex items-center gap-3 mb-4 transition-all duration-500" style={{ opacity: isVisible ? 1 : 0, transform: `translateY(${isVisible ? 0 : 20}px)` }}>
                  <div className="w-11 h-11 rounded-full bg-background shadow-sm border border-border flex items-center justify-center shrink-0 relative">
                    <Icon size={20} className="text-foreground" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary text-secondary-foreground text-[9px] font-bold flex items-center justify-center">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="text-xs font-medium text-foreground leading-snug">{step.text}</p>
                </div>
              );
            })}
            <RotateCcw size={20} className="text-muted-foreground mt-1 animate-spin" style={{ animationDuration: "4s" }} />
          </div>
        )}

        {/* Punchline */}
        <div className="text-center mt-8 max-w-xl mx-auto transition-all duration-700" style={{ opacity: showText ? 1 : 0, transform: `translateY(${showText ? 0 : 16}px)` }}>
          <p className="text-sm md:text-base text-muted-foreground">Sound familiar? You're not alone.</p>
          <p className="text-base md:text-lg font-bold mt-2 text-foreground">That's exactly why we built Applyza.</p>
          <div className="mt-5">
            <Button size="lg" variant="teal" className="rounded-full font-bold px-8 text-sm" asChild onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
              <Link to="/book-a-consultation">Break the Loop <ArrowRight size={16} className="ml-1" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmpathyLoop;
