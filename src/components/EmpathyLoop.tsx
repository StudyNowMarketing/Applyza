import { useEffect, useRef, useState, useCallback } from "react";
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

const OrbitDesktop = () => {
  const [angle, setAngle] = useState(0);
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [displayedIdx, setDisplayedIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const speedRef = useRef(360 / 30); // degrees per second (30s full rotation)
  const hoveredRef = useRef(false);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const manualOverrideRef = useRef(false);

  const getSpotlightFromAngle = useCallback((a: number) => {
    // The image closest to the top (270 deg in standard math, but we position from top=0)
    // Each image is at angle offset i * 60
    // Position angle for image i = a + i * 60
    // We want the one whose position mod 360 is closest to 0 (top)
    let best = 0;
    let bestDist = 999;
    for (let i = 0; i < 6; i++) {
      const pos = ((a + i * 60) % 360 + 360) % 360;
      const dist = Math.min(pos, 360 - pos);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    return best;
  }, []);

  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const speed = hoveredRef.current ? 360 / 80 : 360 / 30;
      speedRef.current = speed;

      setAngle((prev) => {
        const next = (prev + speed * dt) % 360;
        if (!manualOverrideRef.current) {
          const newSpot = getSpotlightFromAngle(next);
          setSpotlightIdx(newSpot);
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [getSpotlightFromAngle]);

  // Fade transition for center text
  useEffect(() => {
    if (spotlightIdx !== displayedIdx) {
      setFading(true);
      const t = setTimeout(() => {
        setDisplayedIdx(spotlightIdx);
        setFading(false);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [spotlightIdx, displayedIdx]);

  const handleClick = (idx: number) => {
    setSpotlightIdx(idx);
    manualOverrideRef.current = true;
    setTimeout(() => {
      manualOverrideRef.current = false;
    }, 3000);
  };

  const current = steps[displayedIdx];

  return (
    <div
      className="relative mx-auto"
      style={{ width: RADIUS * 2 + SPOTLIGHT_SIZE + 40, height: RADIUS * 2 + SPOTLIGHT_SIZE + 40 }}
      onMouseEnter={() => (hoveredRef.current = true)}
      onMouseLeave={() => (hoveredRef.current = false)}
    >
      {/* Orbit track */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${RADIUS * 2 + SPOTLIGHT_SIZE + 40} ${RADIUS * 2 + SPOTLIGHT_SIZE + 40}`}
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

      {/* Center spotlight */}
      <div
        className="absolute flex flex-col items-center justify-center text-center px-4"
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
          className="transition-opacity duration-[400ms]"
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

      {/* Orbiting images */}
      {steps.map((step, i) => {
        const deg = angle + i * 60;
        const rad = (deg * Math.PI) / 180;
        const cx = (RADIUS * 2 + SPOTLIGHT_SIZE + 40) / 2;
        const cy = cx;
        const x = cx + RADIUS * Math.sin(rad);
        const y = cy - RADIUS * Math.cos(rad);
        const isSpot = i === spotlightIdx;
        const size = isSpot ? SPOTLIGHT_SIZE : NORMAL_SIZE;

        return (
          <div
            key={i}
            className="absolute cursor-pointer"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
              zIndex: isSpot ? 10 : 5,
              transition: "filter 0.4s",
              filter: isSpot ? "none" : "brightness(0.85)",
            }}
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
                transition: "width 0.4s, height 0.4s, border-color 0.4s, box-shadow 0.4s",
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
