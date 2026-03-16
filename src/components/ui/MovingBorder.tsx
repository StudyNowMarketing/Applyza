"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val).y
  );
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

interface MovingBorderButtonProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderRadius?: string;
  duration?: number;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  to?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export const MovingBorderButton = ({
  children,
  className,
  containerClassName,
  borderRadius = "9999px",
  duration = 3000,
  onClick,
  href,
  to,
  type = "button",
  disabled = false,
  ...props
}: MovingBorderButtonProps) => {
  const innerStyle = { borderRadius: `calc(${borderRadius} * 0.96)` };

  const inner = (
    <div
      className={cn(
        "relative bg-secondary border border-secondary/30 text-secondary-foreground flex items-center justify-center w-full h-full text-sm font-semibold antialiased px-7 py-3 gap-2",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={innerStyle}
    >
      {children}
    </div>
  );

  const container = (
    <div
      className="absolute inset-0"
      style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
    >
      <MovingBorder duration={duration} rx="30%" ry="30%">
        <div className="h-20 w-20 opacity-[0.8] bg-[radial-gradient(hsl(var(--secondary))_40%,transparent_60%)]" />
      </MovingBorder>
    </div>
  );

  const wrapperClass = cn(
    "bg-transparent relative p-[2px] overflow-hidden inline-flex",
    disabled && "pointer-events-none",
    containerClassName
  );
  const wrapperStyle = { borderRadius };

  if (to) {
    return (
      <Link
        to={to}
        className={wrapperClass}
        style={wrapperStyle}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        {...(props as any)}
      >
        {container}
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={wrapperClass}
        style={wrapperStyle}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        {...(props as any)}
      >
        {container}
        {inner}
      </a>
    );
  }

  return (
    <button
      className={wrapperClass}
      style={wrapperStyle}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...(props as any)}
    >
      {container}
      {inner}
    </button>
  );
};
