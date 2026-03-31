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
  { id: "airplane", image: "/glass-airplane.png", size: 280 },
  { id: "passport", image: "/glass-passport.png", size: 280 },
  { id: "university", image: "/glass-university.png", size: 280 },
];

/* -------------------------------------------------------------------------- */
/*  Wave-following config                                                     */
/* -------------------------------------------------------------------------- */

// Order: university → airplane → passport → globe (left to right along wave)
// pathOffset spaced 0.20 apart so objects are well separated across the full path
// Globe leads the parade (enters left first), university closes it (exits right last)
// Negative offsets place trailing objects off-screen left at scroll=0
const OBJECT_WAVE = [
  { id: "globe",      pathOffset:  0.00, rotations: [5,   0,  -8,  3, 12, -5,   8, 2,  15, 20] },
  { id: "passport",   pathOffset: -0.14, rotations: [0,   5,  12,  3, -8, 15,  -3, 8,   6, 10] },
  { id: "airplane",   pathOffset: -0.28, rotations: [-20, -15, -28, 22, -8, 32, -18, 3, -38, -45] },
  { id: "university", pathOffset: -0.42, rotations: [3,  0, -3,  8, -5,  2, -8,  3,  6,  8] },
];

// Full path traversal: globe exits right, university ends at right edge
const WAVE_TRAVEL = 1.42;
const PROGRESS_STOPS = [0, 0.1, 0.2, 0.35, 0.45, 0.55, 0.65, 0.75, 0.9, 1.0];

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
        scrub: 1.5,
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

    // --- Floating 3D objects — follow the wave path ---
    const objectTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    const svgPathForObjects = svgPathRef.current;
    if (svgPathForObjects) {
      const svgEl = svgPathForObjects.ownerSVGElement;
      const pathTotalLen = svgPathForObjects.getTotalLength();

      // Helper: convert an SVG point to screen coords via CTM
      const toScreen = (svgX: number, svgY: number): { x: number; y: number } => {
        if (!svgEl) return { x: (svgX / 1920) * window.innerWidth, y: (svgY / 1080) * window.innerHeight };
        const ctm = svgEl.getScreenCTM();
        if (!ctm) return { x: (svgX / 1920) * window.innerWidth, y: (svgY / 1080) * window.innerHeight };
        const sp = svgEl.createSVGPoint();
        sp.x = svgX; sp.y = svgY;
        const s = sp.matrixTransform(ctm);
        return { x: s.x, y: s.y };
      };

      // Sample tangent direction at each end for extrapolation
      const delta = pathTotalLen * 0.01;
      const startPt  = svgPathForObjects.getPointAtLength(0);
      const startPt2 = svgPathForObjects.getPointAtLength(delta);
      const startDx = (startPt2.x - startPt.x) / delta;
      const startDy = (startPt2.y - startPt.y) / delta;
      const endPt  = svgPathForObjects.getPointAtLength(pathTotalLen);
      const endPt2 = svgPathForObjects.getPointAtLength(pathTotalLen - delta);
      const endDx = (endPt.x - endPt2.x) / delta;
      const endDy = (endPt.y - endPt2.y) / delta;

      const getWavePoint = (t: number): { x: number; y: number } => {
        if (t < 0) {
          // Extrapolate backwards from path start along its tangent
          const dist = t * pathTotalLen; // negative distance
          return toScreen(startPt.x + dist * startDx, startPt.y + dist * startDy);
        }
        if (t > 1) {
          // Extrapolate forwards from path end along its tangent
          const dist = (t - 1) * pathTotalLen;
          return toScreen(endPt.x + dist * endDx, endPt.y + dist * endDy);
        }
        const pt = svgPathForObjects.getPointAtLength(t * pathTotalLen);
        return toScreen(pt.x, pt.y);
      };

      OBJECTS.forEach((obj) => {
        const el = objectRefs.current[obj.id];
        if (!el) return;
        const cfg = OBJECT_WAVE.find((c) => c.id === obj.id);
        if (!cfg) return;

        const getKF = (scrollStop: number, rotIdx: number) => {
          const t = cfg.pathOffset + scrollStop * WAVE_TRAVEL;
          const { x, y } = getWavePoint(t);
          const yNorm = Math.max(0, Math.min(1, y / window.innerHeight));
          const half = obj.size / 2;
          const fadeZone = obj.size * 0.6;
          const rightEdge = x + half;
          const leftEdge  = x - half;
          let xOpacity = 1;
          if (rightEdge < 0) xOpacity = 0;
          else if (leftEdge < 0) xOpacity = Math.min(1, rightEdge / fadeZone);
          else if (leftEdge > window.innerWidth) xOpacity = 0;
          else if (rightEdge > window.innerWidth) xOpacity = Math.min(1, (window.innerWidth - leftEdge) / fadeZone);
          return {
            x: leftEdge,
            y: y - half,
            scale: 0.55 + yNorm * 0.65,
            opacity: xOpacity * (0.45 + yNorm * 0.50),
            rotation: cfg.rotations[rotIdx],
          };
        };

        const first = getKF(0, 0);
        gsap.set(el, { x: first.x, y: first.y, scale: first.scale, rotation: first.rotation, opacity: first.opacity });

        for (let i = 1; i < PROGRESS_STOPS.length; i++) {
          const kf = getKF(PROGRESS_STOPS[i], i);
          const duration = PROGRESS_STOPS[i] - PROGRESS_STOPS[i - 1];
          objectTimeline.to(el, { x: kf.x, y: kf.y, scale: kf.scale, rotation: kf.rotation, opacity: kf.opacity, duration, ease: "power1.inOut" }, PROGRESS_STOPS[i - 1]);
        }
      });
    }

    // --- Section reveals ---
    const sections = scrollContainerRef.current?.querySelectorAll(".scroll-section");
    if (sections) {
      sections.forEach((section, index) => {
        if (index === 0) {
          gsap.set(section, { opacity: 1, y: 0 });
          return;
        }
        const sectionName = section.getAttribute("data-section");
        if (sectionName === "services" || sectionName === "how-it-works") {
          gsap.set(section, { opacity: 1, y: 0 });
          return;
        }
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
