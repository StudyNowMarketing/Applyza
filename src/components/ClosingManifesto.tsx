import { useEffect, useRef, useState } from "react";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { MovingBorderButton } from "@/components/ui/MovingBorder";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import WordByWord from "@/components/WordByWord";

const ClosingManifesto = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < 6; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, i]);
            }, i * 300);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const itemStyle = (i: number): React.CSSProperties => ({
    opacity: visibleItems.includes(i) ? 1 : 0,
    transform: `translateY(${visibleItems.includes(i) ? 0 : 20}px)`,
    transition: "opacity 0.6s ease, transform 0.6s ease",
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ backgroundColor: "#1B2150" }}>
      <SparklesCore
        className="absolute inset-0 z-[1]"
        background="transparent"
        particleColor="#2EC4B6"
        particleDensity={30}
        minSize={0.3}
        maxSize={1}
        speed={1}
      />

      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-[700px] mx-auto text-center">
          {/* Overline */}
          <div style={itemStyle(0)}>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[2px] mb-6"
              style={{ color: "#2EC4B6" }}
            >
              Your Story
            </span>
          </div>

          {/* Paragraph 1 */}
          <div style={itemStyle(1)}>
            <p className="text-lg md:text-xl italic text-white leading-relaxed mb-5">
              Every student who's ever dreamed of studying abroad has felt what you're feeling right now.
            </p>
          </div>

          {/* Paragraph 2 */}
          <div style={itemStyle(2)}>
            <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.8)" }}>
              The excitement. The doubt. The overwhelm. The late nights researching universities, comparing visa requirements, wondering if you're good enough.
            </p>
          </div>

          {/* Paragraph 3 */}
          <div style={itemStyle(3)}>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>
              We've seen it thousands of times. And every single time, the student who took that first step — who reached out, who asked for help — ended up exactly where they were meant to be.
            </p>
          </div>

          {/* Big quote */}
          <div style={itemStyle(4)}>
            <blockquote className="text-xl md:text-[28px] font-bold text-white leading-snug mb-8">
              "<WordByWord text="Your story was always meant to be shared with the world. Let us help you write the next chapter." />"
            </blockquote>
          </div>

          {/* Image */}
          <div style={itemStyle(4)} className="mb-10">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80"
              alt="Diverse graduating students celebrating"
              className="w-full rounded-2xl"
              style={{ boxShadow: "0 0 60px rgba(46,196,182,0.15)" }}
              loading="lazy"
            />
          </div>

          {/* CTAs */}
          <div style={itemStyle(5)} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <MovingBorderButton to="/eligibility-check" className="px-7 py-3.5 text-sm">
              Start Your Journey
            </MovingBorderButton>
            <Button
              size="lg"
              className="rounded-full font-bold px-8 text-sm"
              style={{ background: "transparent", border: "2px solid rgba(255,255,255,0.5)", color: "white" }}
              asChild
            >
              <Link to="/book-a-consultation">Book a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingManifesto;
