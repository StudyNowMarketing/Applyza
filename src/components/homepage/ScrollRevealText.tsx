import React, { useRef, type ElementType } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  /** The HTML element to render. Defaults to "p". */
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

// ---------------------------------------------------------------------------
// Single word component
// ---------------------------------------------------------------------------

interface WordProps {
  word: string;
  scrollYProgress: MotionValue<number>;
  /** Normalised range [start, end] within which this word transitions 0.15→1 */
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ word, scrollYProgress, range }) => {
  const opacity = useTransform(scrollYProgress, range, [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  );
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  text,
  className,
  as: Tag = "p",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start revealing when the top of the element hits the bottom of the
    // viewport; finish when the bottom of the element reaches the center.
    offset: ["start end", "end center"],
  });

  const words = text.split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  // We use a motion-compatible wrapper. Because framer-motion does not export
  // a typed motion[Tag] for every tag, we cast via ElementType.
  const MotionTag = motion[Tag as keyof typeof motion] as React.ComponentType<
    React.ComponentProps<typeof motion.p>
  >;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <MotionTag className="flex flex-wrap leading-snug">
        {words.map((word, i) => {
          // Each word maps to a sub-range of the overall scroll progress.
          // Ranges overlap slightly so the reveal feels smooth.
          const start = i / totalWords;
          const end = (i + 1) / totalWords;
          return (
            <Word
              key={`${word}-${i}`}
              word={word}
              scrollYProgress={scrollYProgress}
              range={[start, end]}
            />
          );
        })}
      </MotionTag>
    </div>
  );
};

export default ScrollRevealText;
