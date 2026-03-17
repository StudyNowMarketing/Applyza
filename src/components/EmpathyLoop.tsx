import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Search, FileWarning, ShieldQuestion, Hourglass, RotateCcw } from "lucide-react";
import WordByWord from "@/components/WordByWord";
import { useIsMobile } from "@/hooks/use-mobile";

const steps = [
  { icon: Sparkles, text: "You dream of studying abroad", label: "Dream" },
  { icon: Search, text: "Overwhelmed by options", label: "Research" },
  { icon: FileWarning, text: "Visa, fees, deadlines — a maze", label: "Confusion" },
  { icon: ShieldQuestion, text: "Don't know who to trust", label: "Doubt" },
  { icon: Hourglass, text: "Dream feels further away", label: "Waiting" },
  { icon: RotateCcw, text: "Rinse and repeat", label: "Repeat" },
];

const EmpathyLoop = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [showText, setShowText] = useState(false);
  const [mobileVisible, setMobileVisible] = useState<number[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
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

        {/* Desktop: orbiting circles */}
        {!isMobile && (
          <div
            className="relative mx-auto flex items-center justify-center"
            style={{ width: 500, height: 500 }}
          >
            {/* Orbital track rings */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
              <circle cx="250" cy="250" r="120" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.08" strokeWidth="1.5" strokeDasharray="6 4" />
              <circle cx="250" cy="250" r="210" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.08" strokeWidth="1.5" strokeDasharray="6 4" />
            </svg>

            {/* Center label */}
            <div className="absolute z-10 flex flex-col items-center justify-center animate-pulse">
              <span className="text-xl font-extrabold text-foreground tracking-tight">The Loop</span>
            </div>

            {/* Inner orbit — steps 0,1,2 */}
            {steps.slice(0, 3).map((step, i) => {
              const Icon = step.icon;
              const isHovered = hovered === i;
              const delay = (i * (30 / 3)).toFixed(1);
              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 -ml-[30px] -mt-[30px] animate-orbit"
                  style={{
                    "--radius": 120,
                    "--duration": 30,
                    animationDelay: `-${delay}s`,
                    animationPlayState: paused ? "paused" : "running",
                    willChange: "transform",
                  } as React.CSSProperties}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className="w-[60px] h-[60px] rounded-full shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer relative"
                    style={{
                      background: isHovered ? "hsl(var(--secondary))" : "hsl(var(--background))",
                      transform: isHovered ? "scale(1.3)" : "scale(1)",
                      border: "1px solid hsl(var(--border))",
                    }}
                  >
                    <Icon size={24} className="transition-colors duration-300" style={{ color: isHovered ? "hsl(var(--secondary-foreground))" : "hsl(var(--foreground))" }} />
                    {isHovered && (
                      <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 bg-foreground text-background text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg z-20">
                        <span className="text-secondary font-bold mr-1">0{i + 1}</span>{step.text}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Outer orbit — steps 3,4,5 (counter-clockwise via negative duration trick) */}
            {steps.slice(3).map((step, idx) => {
              const i = idx + 3;
              const Icon = step.icon;
              const isHovered = hovered === i;
              const delay = (idx * (40 / 3)).toFixed(1);
              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 -ml-[35px] -mt-[35px] animate-orbit"
                  style={{
                    "--radius": 210,
                    "--duration": 40,
                    animationDelay: `-${delay}s`,
                    animationDirection: "reverse",
                    animationPlayState: paused ? "paused" : "running",
                    willChange: "transform",
                  } as React.CSSProperties}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className="w-[70px] h-[70px] rounded-full shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer relative"
                    style={{
                      background: isHovered ? "hsl(var(--secondary))" : "hsl(var(--background))",
                      transform: isHovered ? "scale(1.3)" : "scale(1)",
                      border: "1px solid hsl(var(--border))",
                    }}
                  >
                    <Icon size={28} className="transition-colors duration-300" style={{ color: isHovered ? "hsl(var(--secondary-foreground))" : "hsl(var(--foreground))" }} />
                    {isHovered && (
                      <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 bg-foreground text-background text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg z-20">
                        <span className="text-secondary font-bold mr-1">0{i + 1}</span>{step.text}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile: vertical list */}
        {isMobile && (
          <div className="flex flex-col items-center gap-0 relative px-4">
            {/* Vertical dotted line */}
            <div className="absolute top-0 bottom-8 left-1/2 -translate-x-1/2 w-px border-l-2 border-dashed border-muted-foreground/20" />
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isVisible = mobileVisible.includes(i);
              return (
                <div
                  key={i}
                  className="relative z-10 flex items-center gap-3 mb-4 transition-all duration-500"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: `translateY(${isVisible ? 0 : 20}px)`,
                  }}
                >
                  <div className="w-11 h-11 rounded-full bg-background shadow-sm border border-border flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-foreground" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground">0{i + 1}</span>
                    <p className="text-xs font-medium text-foreground leading-snug">{step.text}</p>
                  </div>
                </div>
              );
            })}
            {/* Loop arrow */}
            <RotateCcw size={20} className="text-muted-foreground mt-1 animate-spin" style={{ animationDuration: "4s" }} />
          </div>
        )}

        {/* Punchline */}
        <div
          className="text-center mt-8 max-w-xl mx-auto transition-all duration-700"
          style={{ opacity: showText ? 1 : 0, transform: `translateY(${showText ? 0 : 16}px)` }}
        >
          <p className="text-sm md:text-base text-muted-foreground">
            Sound familiar? You're not alone.
          </p>
          <p className="text-base md:text-lg font-bold mt-2 text-foreground">
            That's exactly why we built Applyza.
          </p>
          <div className="mt-5">
            <Button
              size="lg"
              variant="teal"
              className="rounded-full font-bold px-8 text-sm"
              asChild
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
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
