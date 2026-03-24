import React, { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type BlurSize = "sm" | "md" | "lg";
type TintColor = "navy" | "teal" | "purple";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  blur?: BlurSize;
  tint?: TintColor;
  glow?: boolean;
  hoverLift?: boolean;
}

// ---------------------------------------------------------------------------
// Mappings
// ---------------------------------------------------------------------------

const BLUR_MAP: Record<BlurSize, string> = {
  sm: "backdrop-blur-sm",   // 4px
  md: "backdrop-blur-md",   // 12px
  lg: "backdrop-blur-lg",   // 16px
};

const TINT_MAP: Record<TintColor, string> = {
  navy: "bg-[rgba(6,9,24,0.45)]",
  teal: "bg-[rgba(13,61,61,0.35)]",
  purple: "bg-[rgba(26,16,64,0.40)]",
};

const GLOW_BORDER =
  "border border-white/[0.12] shadow-[0_0_20px_rgba(100,200,255,0.08)]";
const DEFAULT_BORDER = "border border-white/[0.08]";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      blur = "md",
      tint = "navy",
      glow = false,
      hoverLift = true,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Layout
          "rounded-2xl overflow-hidden",
          // Backdrop blur
          BLUR_MAP[blur],
          // Semi-transparent tinted background
          TINT_MAP[tint],
          // Border & optional glow
          glow ? GLOW_BORDER : DEFAULT_BORDER,
          // Transition for hover
          "transition-all duration-300 ease-out",
          // Hover states
          hoverLift &&
            "hover:-translate-y-1 hover:shadow-lg hover:backdrop-blur-lg hover:border-white/[0.18]",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
