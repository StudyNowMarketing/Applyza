import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import WordByWord from "@/components/WordByWord";
import { MovingBorderButton } from "@/components/ui/MovingBorder";
import { useIsMobile } from "@/hooks/use-mobile";
import { InfiniteSlider } from "@/components/ui/InfiniteSlider";

const steps = [
  {
    img: "/emojis/dream.png",
    color: "#2EC4B6",
    num: "01",
    title: "The Dream",
    text: "You dream of studying abroad — a better future, a world-class degree, a new life.",
  },
  {
    img: "/emojis/overwhelm.png",
    color: "#6B3FA0",
    num: "02",
    title: "The Overwhelm",
    text: "You start researching but there are thousands of courses, hundreds of universities. Where do you even begin?",
  },
  {
    img: "/emojis/maze.png",
    color: "#E67E22",
    num: "03",
    title: "The Maze",
    text: "Visa rules, tuition fees, deadlines, entry requirements — every answer leads to ten more questions.",
  },
  {
    img: "/emojis/doubt.png",
    color: "#E74C3C",
    num: "04",
    title: "The Doubt",
    text: "You don't know who to trust. Agents promising everything. Websites contradicting each other.",
  },
  {
    img: "/emojis/drift.png",
    color: "#95A5A6",
    num: "05",
    title: "The Drift",
    text: "Time passes. Your friends are moving forward. Your dream feels further away every day.",
  },
  {
    img: "/emojis/reset.png",
    color: "#1B2150",
    num: "06",
    title: "The Reset",
    text: "You tell yourself you'll try again next year. And the loop starts over...",
  },
];

const DELAY_STEP = 30 / 6; // 5s per image

const OrbitDesktop = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayedIdx, setDisplayedIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const manualRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-cycle spotlight every 5s when not hovered
  useEffect(() => {
    if (hovered) return;
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % 6);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hovered]);

  // Fade transition for center text
  useEffect(() => {
    if (activeIdx !== displayedIdx) {
      setFading(true);
      const t = setTimeout(() => {
        setDisplayedIdx(activeIdx);
        setFading(false);
      }, 150);
      return () => clearTimeout(t);
    }
  }, [activeIdx, displayedIdx]);

  const handleHoverEnter = (idx: number) => {
    setHovered(true);
    setActiveIdx(idx);
    if (manualRef.current) clearTimeout(manualRef.current);
  };

  const handleHoverLeave = () => {
    setHovered(false);
  };

  const handleClick = (idx: number) => {
    setActiveIdx(idx);
    setHovered(true);
    if (manualRef.current) clearTimeout(manualRef.current);
    manualRef.current = setTimeout(() => {
      setHovered(false);
    }, 5000);
  };

  const current = steps[displayedIdx];

  return (
    <div className="empathy-orbit-container">
      {/* Dashed circle path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 440 440">
        <circle cx="220" cy="220" r="180" fill="none" stroke="#1B2150" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.1" />
      </svg>

      {/* Center text */}
      <div className="absolute z-20 flex flex-col items-center justify-center text-center" style={{ width: 200, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/20 mb-2">THE LOOP</span>
        <div className="transition-opacity duration-300" style={{ opacity: fading ? 0 : 1 }}>
          <span className="text-xs font-bold inline-block px-2 py-0.5 rounded-full text-white mb-1.5" style={{ backgroundColor: current.color }}>
            Step {current.num}
          </span>
          <h3 className="text-lg font-bold text-foreground mb-1">{current.title}</h3>
          <p className="text-[13px] text-muted-foreground leading-snug">{current.text}</p>
        </div>
      </div>

      {/* Orbiting images */}
      {steps.map((step, i) => {
        const isActive = i === activeIdx;
        return (
          <div
            key={i}
            className="empathy-orbit-img"
            style={{ animationDelay: `${-i * DELAY_STEP}s`, zIndex: isActive ? 10 : 5 }}
            onMouseEnter={() => handleHoverEnter(i)}
            onMouseLeave={handleHoverLeave}
            onClick={() => handleClick(i)}
          >
            <div
              className="rounded-full overflow-hidden bg-background"
              style={{
                width: isActive ? 85 : 60,
                height: isActive ? 85 : 60,
                border: `3px solid ${isActive ? step.color : "white"}`,
                boxShadow: isActive
                  ? `0 0 18px 4px ${step.color}44, 0 2px 8px rgba(0,0,0,0.12)`
                  : "0 2px 8px rgba(0,0,0,0.1)",
                filter: isActive ? "none" : "brightness(0.85)",
                transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease",
              }}
            >
              <img src={step.img} alt={step.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            {/* Badge */}
            <div
              className="absolute flex items-center justify-center rounded-full text-white font-bold"
              style={{
                width: 20,
                height: 20,
                fontSize: 10,
                backgroundColor: step.color,
                top: -2,
                right: isActive ? -2 : -4,
                border: "2px solid white",
                transition: "right 0.3s ease",
              }}
            >
              {step.num}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const MobileCarousel = () => (
  <InfiniteSlider gap={16} duration={25} durationOnHover={80} direction="horizontal">
    {steps.map((step, i) => (
      <div
        key={i}
        className="bg-background rounded-xl shadow-sm p-4 shrink-0 flex flex-col items-center text-center gap-3"
        style={{ width: 220, borderTop: `3px solid ${step.color}` }}
      >
        <div className="rounded-full overflow-hidden" style={{ width: 80, height: 80, border: `3px solid ${step.color}` }}>
          <img src={step.img} alt={step.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: step.color }}>
          Step {step.num}
        </span>
        <h4 className="text-sm font-bold text-foreground">{step.title}</h4>
        <p className="text-xs text-muted-foreground leading-snug">{step.text}</p>
      </div>
    ))}
  </InfiniteSlider>
);

const EmpathyLoop = () => {
  const isMobile = useIsMobile();

  return (
    <section className="bg-background py-10 md:py-14">
      <div className="container">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center leading-tight mb-8 text-foreground">
          <WordByWord text="Do You Feel Stuck in a Loop?" underlineWord="Stuck" />
        </h2>
      </div>

      {isMobile ? (
        <MobileCarousel />
      ) : (
        <div className="flex justify-center items-center mb-6">
          <OrbitDesktop />
        </div>
      )}

      <div className="container text-center mt-6 max-w-xl mx-auto">
        <p className="text-sm md:text-base text-muted-foreground">Sound familiar? You're not alone.</p>
        <p className="text-base md:text-lg font-bold mt-2 text-foreground">That's exactly why we built Applyza.</p>
        <div className="mt-5 flex justify-center">
          <MovingBorderButton to="/book-a-consultation" duration={3000}>
            Break the Loop <ArrowRight size={16} className="ml-1" />
          </MovingBorderButton>
        </div>
      </div>
    </section>
  );
};

export default EmpathyLoop;
