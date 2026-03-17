import { useEffect, useRef, useState } from "react";

interface WordByWordProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** Wrap specific words with HandUnderline */
  underlineWord?: string;
}

/**
 * Splits text into words and animates each one in sequence
 * when scrolled into view via IntersectionObserver.
 */
const WordByWord = ({ text, className, style, underlineWord }: WordByWordProps) => {
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

  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={style} data-no-scroll-parent="">
      {words.map((word, i) => {
        const isUnderlineTarget = underlineWord && word.replace(/[^a-zA-Z]/g, "") === underlineWord;
        return (
          <span
            key={i}
            className="word-animate"
            style={{
              transitionDelay: `${i * 0.1}s`,
              ...(visible ? { opacity: 1, transform: "translateY(0)" } : {}),
            }}
          >
            {isUnderlineTarget ? (
              <span className={`hand-underline${visible ? " visible" : ""}`}>{word}</span>
            ) : (
              word
            )}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
};

export default WordByWord;
