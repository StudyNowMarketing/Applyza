import React, { useEffect, useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

// ---------------------------------------------------------------------------
// Color stops & interpolation helpers
// ---------------------------------------------------------------------------

interface RGB {
  r: number;
  g: number;
  b: number;
}

const COLOR_STOPS: { at: number; color: RGB }[] = [
  { at: 0.0, color: { r: 6, g: 9, b: 24 } },     // #060918  navy
  { at: 0.25, color: { r: 10, g: 42, b: 42 } },   // #0a2a2a  teal-navy
  { at: 0.5, color: { r: 13, g: 61, b: 61 } },    // #0d3d3d  teal
  { at: 0.75, color: { r: 26, g: 16, b: 64 } },   // #1a1040  purple
  { at: 1.0, color: { r: 15, g: 10, b: 40 } },    // #0f0a28  deep purple
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function interpolateColor(progress: number): RGB {
  const clamped = Math.max(0, Math.min(1, progress));

  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const curr = COLOR_STOPS[i];
    const next = COLOR_STOPS[i + 1];

    if (clamped >= curr.at && clamped <= next.at) {
      const t = (clamped - curr.at) / (next.at - curr.at);
      return {
        r: Math.round(lerp(curr.color.r, next.color.r, t)),
        g: Math.round(lerp(curr.color.g, next.color.g, t)),
        b: Math.round(lerp(curr.color.b, next.color.b, t)),
      };
    }
  }

  return COLOR_STOPS[COLOR_STOPS.length - 1].color;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const GradientBackground: React.FC = () => {
  const { progressRef } = useScrollProgress();
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let prev = -1;

    function tick() {
      const p = progressRef.current;
      // Only write when the value actually changed (avoid layout thrash)
      if (Math.abs(p - prev) > 0.0005) {
        prev = p;
        const { r, g, b } = interpolateColor(p);

        // Glow position shifts from top-left → bottom-right with scroll
        const glowX = lerp(30, 70, p);
        const glowY = lerp(20, 80, p);

        el.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        el.style.setProperty("--glow-x", `${glowX}%`);
        el.style.setProperty("--glow-y", `${glowY}%`);
      }
      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [progressRef]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{
        backgroundColor: "rgb(6, 9, 24)",
        "--glow-x": "30%",
        "--glow-y": "20%",
      } as React.CSSProperties}
    >
      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at var(--glow-x) var(--glow-y), rgba(100,200,255,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
};

export default GradientBackground;
