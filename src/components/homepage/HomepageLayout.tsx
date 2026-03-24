import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HomepageLayoutProps {
  children: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Floating object definitions                                               */
/* -------------------------------------------------------------------------- */

interface FloatingObject {
  id: string;
  image: string;
  size: number;
}

const OBJECTS: FloatingObject[] = [
  { id: "globe", image: "/glass-globe.png", size: 280 },
  { id: "airplane", image: "/glass-airplane.png", size: 220 },
  { id: "passport", image: "/glass-passport.png", size: 180 },
  { id: "university", image: "/glass-university.png", size: 260 },
];

/* -------------------------------------------------------------------------- */
/*  Keyframe map                                                              */
/* -------------------------------------------------------------------------- */

interface ObjectKeyframe {
  x: string;
  y: string;
  scale: number;
  rotation: number;
  opacity: number;
}

type ObjectKeyframes = Record<string, ObjectKeyframe[]>;

const KEYFRAMES: ObjectKeyframes = {
  globe: [
    { x: "15vw", y: "30vh", scale: 1.3, rotation: 0, opacity: 0.85 },
    { x: "5vw", y: "25vh", scale: 0.7, rotation: -10, opacity: 0.6 },
    { x: "8vw", y: "45vh", scale: 0.6, rotation: -15, opacity: 0.5 },
    { x: "10vw", y: "55vh", scale: 0.5, rotation: -20, opacity: 0.45 },
    { x: "70vw", y: "20vh", scale: 0.35, rotation: 10, opacity: 0.35 },
    { x: "35vw", y: "35vh", scale: 1.2, rotation: 0, opacity: 0.8 },
    { x: "15vw", y: "60vh", scale: 0.5, rotation: 5, opacity: 0.4 },
    { x: "20vw", y: "25vh", scale: 0.65, rotation: 0, opacity: 0.55 },
    { x: "60vw", y: "50vh", scale: 0.5, rotation: 15, opacity: 0.4 },
    { x: "60vw", y: "55vh", scale: 0.45, rotation: 20, opacity: 0.3 },
  ],
  airplane: [
    { x: "75vw", y: "10vh", scale: 0.7, rotation: -20, opacity: 0.7 },
    { x: "80vw", y: "15vh", scale: 0.6, rotation: -15, opacity: 0.6 },
    { x: "10vw", y: "20vh", scale: 0.9, rotation: 10, opacity: 0.75 },
    { x: "85vw", y: "30vh", scale: 0.5, rotation: 25, opacity: 0.5 },
    { x: "20vw", y: "65vh", scale: 0.35, rotation: -5, opacity: 0.35 },
    { x: "55vw", y: "15vh", scale: 0.7, rotation: 30, opacity: 0.65 },
    { x: "70vw", y: "45vh", scale: 0.4, rotation: -10, opacity: 0.4 },
    { x: "75vw", y: "25vh", scale: 0.6, rotation: 0, opacity: 0.55 },
    { x: "40vw", y: "20vh", scale: 1.3, rotation: -35, opacity: 0.9 },
    { x: "45vw", y: "10vh", scale: 1.4, rotation: -45, opacity: 0.85 },
  ],
  passport: [
    { x: "50vw", y: "80vh", scale: 0, rotation: 0, opacity: 0 },
    { x: "50vw", y: "80vh", scale: 0, rotation: 0, opacity: 0 },
    { x: "80vw", y: "70vh", scale: 0.7, rotation: 10, opacity: 0.65 },
    { x: "75vw", y: "60vh", scale: 0.6, rotation: 5, opacity: 0.55 },
    { x: "10vw", y: "45vh", scale: 0.35, rotation: -8, opacity: 0.35 },
    { x: "20vw", y: "65vh", scale: 0.5, rotation: 12, opacity: 0.45 },
    { x: "60vw", y: "70vh", scale: 0.4, rotation: -5, opacity: 0.35 },
    { x: "30vw", y: "70vh", scale: 0.6, rotation: 0, opacity: 0.55 },
    { x: "25vw", y: "55vh", scale: 0.5, rotation: 8, opacity: 0.4 },
    { x: "25vw", y: "60vh", scale: 0.45, rotation: 10, opacity: 0.3 },
  ],
  university: [
    { x: "85vw", y: "75vh", scale: 0, rotation: 0, opacity: 0 },
    { x: "85vw", y: "75vh", scale: 0, rotation: 0, opacity: 0 },
    { x: "85vw", y: "65vh", scale: 0.3, rotation: 0, opacity: 0.25 },
    { x: "75vw", y: "35vh", scale: 1, rotation: 5, opacity: 0.75 },
    { x: "55vw", y: "50vh", scale: 0.35, rotation: -3, opacity: 0.35 },
    { x: "70vw", y: "60vh", scale: 0.5, rotation: 0, opacity: 0.45 },
    { x: "40vw", y: "30vh", scale: 1, rotation: -5, opacity: 0.8 },
    { x: "65vw", y: "65vh", scale: 0.65, rotation: 0, opacity: 0.55 },
    { x: "70vw", y: "70vh", scale: 0.45, rotation: 5, opacity: 0.35 },
    { x: "72vw", y: "72vh", scale: 0.4, rotation: 8, opacity: 0.25 },
  ],
};

const PROGRESS_STOPS = [0, 0.1, 0.2, 0.35, 0.45, 0.55, 0.65, 0.75, 0.9, 1.0];

function viewportToPx(value: string): number {
  if (value.endsWith("vw")) return (parseFloat(value) / 100) * window.innerWidth;
  if (value.endsWith("vh")) return (parseFloat(value) / 100) * window.innerHeight;
  return parseFloat(value);
}

const SVG_PATH =
  "M-100,500 C200,200 400,600 600,350 S900,150 1100,400 S1400,600 1600,300 S1850,500 2020,250";

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

const HomepageLayout: React.FC<HomepageLayoutProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const objectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    // NO Lenis — it conflicts with CSS position:sticky used by StackingCards.
    // Use CSS scroll-behavior: smooth on <html> instead (set below).
    document.documentElement.style.scrollBehavior = "smooth";

    // --- Animated gradient background ---
    const gradientEl = gradientRef.current;
    if (gradientEl) {
      gradientEl.style.setProperty("--grad-stop1", "#060918");
      gradientEl.style.setProperty("--grad-stop2", "#0a1a2e");
      gradientEl.style.setProperty("--grad-stop3", "#060918");

      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Higher = smoother
        onUpdate: (self) => {
          const p = self.progress;
          const r1 = Math.round(6 + p * 10);
          const g1 = Math.round(9 + p * 40);
          const b1 = Math.round(24 + p * 30);
          const r2 = Math.round(10 + p * 3);
          const g2 = Math.round(26 + p * 35);
          const b2 = Math.round(46 - p * 7);
          const r3 = Math.round(6 + p * 20);
          const g3 = Math.round(9 + p * 7);
          const b3 = Math.round(24 + p * 40);
          gradientEl.style.setProperty("--grad-stop1", `rgb(${r1},${g1},${b1})`);
          gradientEl.style.setProperty("--grad-stop2", `rgb(${r2},${g2},${b2})`);
          gradientEl.style.setProperty("--grad-stop3", `rgb(${r3},${g3},${b3})`);
        },
      });
    }

    // --- Moving glow ---
    const glowEl = glowRef.current;
    if (glowEl) {
      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        onUpdate: (self) => {
          const p = self.progress;
          const glowX = 30 + p * 40;
          const glowY = 20 + p * 60;
          const glowSize = 40 + p * 20;
          glowEl.style.background = `radial-gradient(ellipse ${glowSize}% ${glowSize * 0.8}% at ${glowX}% ${glowY}%, rgba(46,196,182,0.12) 0%, transparent 70%)`;
        },
      });
    }

    // --- SVG path draw-on ---
    const svgPath = svgPathRef.current;
    if (svgPath) {
      const pathLength = svgPath.getTotalLength();
      gsap.set(svgPath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
      gsap.to(svgPath, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });
    }

    // --- Floating 3D objects ---
    const objectTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    OBJECTS.forEach((obj) => {
      const el = objectRefs.current[obj.id];
      if (!el) return;
      const keyframes = KEYFRAMES[obj.id];
      if (!keyframes || keyframes.length === 0) return;

      const first = keyframes[0];
      gsap.set(el, {
        x: viewportToPx(first.x),
        y: viewportToPx(first.y),
        scale: first.scale,
        rotation: first.rotation,
        opacity: first.opacity,
      });

      for (let i = 1; i < keyframes.length; i++) {
        const kf = keyframes[i];
        const duration = PROGRESS_STOPS[i] - PROGRESS_STOPS[i - 1];
        objectTimeline.to(
          el,
          {
            x: viewportToPx(kf.x),
            y: viewportToPx(kf.y),
            scale: kf.scale,
            rotation: kf.rotation,
            opacity: kf.opacity,
            duration,
            ease: "power1.inOut",
          },
          PROGRESS_STOPS[i - 1]
        );
      }
    });

    // --- Section reveals (simple fade-in, no scrub jitter) ---
    const sections = scrollContainerRef.current?.querySelectorAll(".scroll-section");
    if (sections) {
      sections.forEach((section, index) => {
        if (index === 0) {
          gsap.set(section, { opacity: 1, y: 0 });
          return;
        }
        // Skip sections that have their own GSAP pin animations
        const sectionName = section.getAttribute("data-section");
        if (sectionName === "services" || sectionName === "how-it-works") {
          gsap.set(section, { opacity: 1, y: 0 });
          return;
        }

        // Simple toggleActions reveal — no scrub, just play once
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    // --- Resize handler ---
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      objectTimeline.kill();
      ScrollTrigger.killAll();
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative min-h-screen">
      {/* Animated gradient background */}
      <div
        ref={gradientRef}
        className="fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(160deg, var(--grad-stop1, #060918) 0%, var(--grad-stop2, #0a1a2e) 50%, var(--grad-stop3, #060918) 100%)",
        }}
      />

      {/* Dark overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Moving glow */}
      <div
        ref={glowRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 30% 20%, rgba(46,196,182,0.12) 0%, transparent 70%)",
        }}
      />

      {/* SVG connection line */}
      <svg
        className="fixed inset-0 z-[1] pointer-events-none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100vw", height: "100vh" }}
      >
        <path
          ref={svgPathRef}
          d={SVG_PATH}
          stroke="rgba(46,196,182,0.25)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M-50,700 C250,500 500,800 750,550 S1100,350 1350,600 S1650,750 1970,450"
          stroke="rgba(139,92,246,0.12)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="8 12"
        />
      </svg>

      {/* Floating 3D glass objects */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        {OBJECTS.map((obj) => (
          <div
            key={obj.id}
            ref={(el) => {
              objectRefs.current[obj.id] = el;
            }}
            className="absolute will-change-transform"
            style={{ width: obj.size, height: obj.size, left: 0, top: 0 }}
          >
            <img
              src={obj.image}
              alt={obj.id}
              className="w-full h-full object-contain select-none"
              style={{ filter: "drop-shadow(0 0 30px rgba(46, 196, 182, 0.35))" }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Particles */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute w-1 h-1 rounded-full bg-white/20 animate-float" style={{ top: "15%", left: "10%" }} />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-teal-400/15 animate-float" style={{ top: "30%", left: "85%", animationDelay: "1s" }} />
        <div className="absolute w-1 h-1 rounded-full bg-white/15 animate-float-delayed" style={{ top: "60%", left: "20%", animationDelay: "2s" }} />
        <div className="absolute w-0.5 h-0.5 rounded-full bg-teal-400/20 animate-float" style={{ top: "75%", left: "70%", animationDelay: "0.5s" }} />
        <div className="absolute w-1 h-1 rounded-full bg-white/10 animate-float-delayed" style={{ top: "45%", left: "50%", animationDelay: "3s" }} />
      </div>

      {/* Scroll content */}
      <div ref={scrollContainerRef} className="relative z-[2]">
        {children}
      </div>
    </div>
  );
};

export default HomepageLayout;
