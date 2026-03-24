import { useEffect, useRef, useState } from "react";

const HandUnderline = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`hand-underline${visible ? " visible" : ""}`}>
      {children}
    </span>
  );
};

export default HandUnderline;
