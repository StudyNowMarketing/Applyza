import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import React from "react";
import Lenis from "lenis";
import { scrollProgressRef as globalScrollRef } from "@/components/3d/scrollStore";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface ScrollProgressContextValue {
  /** Reactive state – triggers re-renders (use sparingly). */
  progress: number;
  /** Stable ref – read inside useFrame / rAF without causing re-renders. */
  progressRef: React.MutableRefObject<number>;
  /** The Lenis instance itself, in case consumers need scrollTo etc. */
  lenis: Lenis | null;
}

const ScrollProgressContext = createContext<ScrollProgressContextValue>({
  progress: 0,
  progressRef: { current: 0 },
  lenis: null,
});

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface ScrollProgressProviderProps {
  children: ReactNode;
}

export function ScrollProgressProvider({ children }: ScrollProgressProviderProps) {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);
  const rafId = useRef<number>(0);

  // Stable callback so we never re-create the Lenis listener
  const handleScroll = useCallback((e: { progress: number }) => {
    progressRef.current = e.progress;
    globalScrollRef.current = e.progress; // Update global ref for R3F useFrame
    setProgress(e.progress);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", handleScroll);

    function raf(time: number) {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    }
    rafId.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [handleScroll]);

  const value: ScrollProgressContextValue = {
    progress,
    progressRef,
    lenis: lenisRef.current,
  };

  return React.createElement(ScrollProgressContext.Provider, { value }, children);
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useScrollProgress() {
  return useContext(ScrollProgressContext);
}
