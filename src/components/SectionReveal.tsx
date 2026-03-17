import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps a section and applies a scroll-triggered fade-up reveal.
 * Uses IntersectionObserver, triggers once, GPU-accelerated via CSS.
 */
const SectionReveal = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 50 && rect.bottom > 0) {
      setVisible(true);
      return;
    }

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
  }, []);

  return (
    <div ref={ref} data-section-reveal={visible ? "visible" : ""}>
      {children}
    </div>
  );
};

export default SectionReveal;
