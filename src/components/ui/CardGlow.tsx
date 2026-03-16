import { useEffect, useState } from "react";
import { GlowingEffect } from "@/components/ui/GlowingEffect";

interface CardGlowProps {
  spread?: number;
  proximity?: number;
  borderWidth?: number;
}

/**
 * Drop this inside any card that has position:relative.
 * Automatically disabled on mobile (< 768px).
 */
export const CardGlow = ({ spread = 30, proximity = 48, borderWidth = 2 }: CardGlowProps) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <GlowingEffect
      spread={spread}
      glow
      disabled={isMobile}
      proximity={proximity}
      inactiveZone={0.01}
      borderWidth={borderWidth}
    />
  );
};
