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

const RADIUS = 180;
const NORMAL_SIZE = 60;
const SPOTLIGHT_SIZE = 85;
const BADGE_SIZE = 20;
const CONTAINER = RADIUS * 2 + SPOTLIGHT_SIZE + 40;

const OrbitDesktop = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayedIdx, setDisplayedIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [slow, setSlow] = useState(false);
  const [paused, setPaused] = useState(false);
  const manualRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isManualRef = useRef(false);

  // Auto-rotate spotlight based on CSS animation timing
  useEffect(() => {
    if (isManualRef.current) return;
    // The CSS animation rotates 360deg in 30s (or 90s when slow)
    // Each step occupies 60deg, so spotlight changes every 5s (or 15s)
    const interval = slow ? 20000 : 7500;
    const timer = setInterval(() => {
      if (!isManualRef.current) {
        setActiveIdx((prev) => (prev + 1) % 6);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [slow]);

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

  const setManualSpotlight = (idx: number, durationMs: number) => {
    setActiveIdx(idx);
    isManualRef.current = true;
    if (manualRef.current) clearTimeout(manualRef.current);
    manualRef.current = setTimeout(() => {
      isManualRef.current = false;
    }, durationMs);
  };

  const handleHoverEnter = (idx: number) => {
    setSlow(true);
    setManualSpotlight(idx, 999999); // stays until hover leaves
  };

  const handleHoverLeave = () => {
    setSlow(false);
    isManualRef.current = false;
    if (manualRef.current) clearTimeout(manualRef.current);
  };

  const handleClick = (idx: number) => {
    setManualSpotlight(idx, 5000);
  };

  const current = steps[displayedIdx];
  const cx = CONTAINER / 2;

  const orbitClass = paused
    ? "empathy-orbit empathy-orbit--paused"
    : slow
      ? "empathy-orbit empathy-orbit--slow"
      : "empathy-orbit";

  return (
    <div
      className="relative mx-auto"
      style={{ width: CONTAINER, height: CONTAINER }}
    >
      {/* Orbit track */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${CONTAINER} ${CONTAINER}`}
      >
        <circle
          cx="50%"
          cy="50%"
          r={RADIUS}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          opacity="0.3"
        />
      </svg>

      {/* Center spotlight text */}
      <div
        className="absolute flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        style={{
          width: RADIUS * 1.4,
          height: RADIUS * 1.4,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/20 mb-2">
          THE LOOP
        </span>
        <div
          className="transition-opacity duration-300"
          style={{ opacity: fading ? 0 : 1 }}
        >
          <span
            className="text-xs font-bold inline-block px-2 py-0.5 rounded-full text-white mb-1.5"
            style={{ backgroundColor: current.color }}
          >
            Step {current.num}
          </span>
          <h3 className="text-lg font-bold text-foreground mb-1">{current.title}</h3>
          <p className="text-[13px] text-muted-foreground leading-snug">{current.text}</p>
        </div>
      </div>

      {/* Rotating wrapper — single CSS animation drives all images */}
      <div
        className={orbitClass}
        style={{
          position: "absolute",
          width: CONTAINER,
          height: CONTAINER,
          top: 0,
          left: 0,
        }}
      >
        {steps.map((step, i) => {
          const angleDeg = i * 60; // static position, rotation comes from parent
          const rad = (angleDeg * Math.PI) / 180;
          const x = cx + RADIUS * Math.sin(rad);
          const y = cx - RADIUS * Math.cos(rad);
          const isSpot = i === activeIdx;
          const size = isSpot ? SPOTLIGHT_SIZE : NORMAL_SIZE;

          return (
            <div
              key={i}
              className="absolute empathy-counter-spin cursor-pointer"
              style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
                zIndex: isSpot ? 10 : 5,
              }}
              onMouseEnter={() => handleHoverEnter(i)}
              onMouseLeave={handleHoverLeave}
              onClick={() => handleClick(i)}
            >
              <div
                className="rounded-full overflow-hidden bg-background"
                style={{
                  width: size,
                  height: size,
                  border: `3px solid ${isSpot ? step.color : "white"}`,
                  boxShadow: isSpot
                    ? `0 0 18px 4px ${step.color}44, 0 2px 8px rgba(0,0,0,0.12)`
                    : "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "width 0.4s ease, height 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                  filter: isSpot ? "none" : "brightness(0.85)",
                }}
              >
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Badge */}
              <div
                className="absolute flex items-center justify-center rounded-full text-white font-bold"
                style={{
                  width: BADGE_SIZE,
                  height: BADGE_SIZE,
                  fontSize: 10,
                  backgroundColor: step.color,
                  top: -2,
                  right: isSpot ? -2 : -4,
                  border: "2px solid white",
                  transition: "right 0.4s ease",
                }}
              >
                {step.num}
              </div>
            </div>
          );
        })}
      </div>

      {/* Invisible hover zone for "Break the Loop" pause — handled via prop */}
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
        <div
          className="rounded-full overflow-hidden"
          style={{
            width: 80,
            height: 80,
            border: `3px solid ${step.color}`,
          }}
        >
          <img src={step.img} alt={step.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: step.color }}
        >
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

      {isMobile ? <MobileCarousel /> : (
        <div className="flex justify-center mb-6">
          <OrbitDesktop />
        </div>
      )}

      <div className="container text-center mt-6 max-w-xl mx-auto">
        <p className="text-sm md:text-base text-muted-foreground">
          Sound familiar? You're not alone.
        </p>
        <p className="text-base md:text-lg font-bold mt-2 text-foreground">
          That's exactly why we built Applyza.
        </p>
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
