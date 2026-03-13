import { useEffect } from "react";

/**
 * Global scroll-triggered animation observer.
 * Mount once in App.tsx — it will auto-animate any element with
 * the class `animate-on-scroll` or `animate-on-scroll-scale`
 * when they enter the viewport.
 */
const useScrollAnimations = () => {
  useEffect(() => {
    const targets = document.querySelectorAll(
      ".animate-on-scroll, .animate-on-scroll-scale"
    );

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default useScrollAnimations;
