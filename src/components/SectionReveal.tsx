import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps a section and applies a scroll-triggered fade-up reveal.
 * Uses IntersectionObserver, triggers once, GPU-accelerated via CSS.
 */
const SectionReveal = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true); // Start visible to prevent invisible sections

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    // Only animate sections that start below the viewport
    if (rect.top > window.innerHeight) {
      setVisible(false);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0, rootMargin: "0px 0px 100px 0px" }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div ref={ref} data-no-scroll-parent data-section-reveal={visible ? "visible" : ""}>
      {children}
    </div>
  );
};

export default SectionReveal;
