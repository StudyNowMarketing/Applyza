import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";

const FloatingCTA = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const heroRef = useRef<Element | null>(null);

  useEffect(() => {
    if (dismissed) return;

    // Observe the hero section
    const tryObserve = () => {
      const hero = document.querySelector("section");
      if (!hero) return;
      heroRef.current = hero;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setShow(!entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      observer.observe(hero);
      return () => observer.disconnect();
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(tryObserve, 500);
    return () => clearTimeout(timer);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-500"
      style={{
        opacity: show ? 1 : 0,
        transform: `translate(-50%, ${show ? "0" : "100%"})`,
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <div
        className="flex items-center gap-3 rounded-full px-5 py-2.5 shadow-xl max-w-[90vw]"
        style={{
          backgroundColor: "#1B2150",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <span className="text-white/80 text-sm font-medium whitespace-nowrap">Ready to start?</span>
        <Link
          to="/book-a-consultation"
          className="inline-flex items-center gap-1.5 text-sm font-bold whitespace-nowrap rounded-full px-4 py-1.5 transition-all"
          style={{ backgroundColor: "#2EC4B6", color: "white" }}
        >
          Book Consultation <ArrowRight size={14} />
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/40 hover:text-white/80 transition-colors ml-1"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default FloatingCTA;
