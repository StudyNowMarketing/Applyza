import { Search, MessageCircle, FileCheck, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description:
      "Explore thousands of courses across top universities in the UK, Europe, and beyond. Use our AI-powered search to find the ones that match your goals, qualifications, and budget.",
    accent: "#2EC4B6",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Connect",
    description:
      "Book a free consultation with one of our expert counsellors. Whether you prefer a video call, phone call, or face-to-face meeting — we're here to help you make the right choice.",
    accent: "#8B5CF6",
  },
  {
    icon: FileCheck,
    number: "03",
    title: "Apply",
    description:
      "We take care of the heavy lifting. From preparing your documents and submitting university applications to guiding you through your student visa application — our team handles it all.",
    accent: "#2EC4B6",
  },
  {
    icon: Plane,
    number: "04",
    title: "Arrive",
    description:
      "Touch down at your new university with confidence. We support you with accommodation guidance, pre-departure tips, and ongoing assistance.",
    accent: "#8B5CF6",
  },
];

const HowItWorks = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(idx);
          }
        });
      },
      {
        // Each card activates when it's roughly centered in viewport
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* LEFT — sticky heading */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[20vh]">
              <span
                className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full border"
                style={{
                  color: "#2EC4B6",
                  borderColor: "rgba(46,196,182,0.3)",
                  background: "rgba(46,196,182,0.08)",
                }}
              >
                How It Works
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Your Journey
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #2EC4B6, #8B5CF6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  in Four Steps
                </span>
              </h2>
              <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                From discovering your dream course to landing at your new university — we guide you through every step.
              </p>

              {/* Progress bar + step labels */}
              <div className="flex items-start gap-4 mb-10">
                <div className="relative w-[3px] flex-shrink-0" style={{ height: `${steps.length * 56}px` }}>
                  <div className="absolute inset-0 bg-white/10 rounded-full" />
                  <div
                    className="absolute top-0 left-0 w-full rounded-full origin-top"
                    style={{
                      height: "100%",
                      background: "linear-gradient(180deg, #2EC4B6, #8B5CF6)",
                      transform: `scaleY(${activeIndex >= 0 ? (activeIndex + 1) / steps.length : 0})`,
                      transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  {steps.map((step, i) => (
                    <div
                      key={step.number}
                      className="flex items-center gap-3"
                      style={{
                        opacity: activeIndex === i ? 1 : 0.3,
                        transform: activeIndex === i ? "translateX(6px)" : "translateX(0)",
                        transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      <span className="text-sm font-bold" style={{ color: activeIndex === i ? step.accent : "rgba(255,255,255,0.4)" }}>
                        {step.number}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: activeIndex === i ? "#fff" : "rgba(255,255,255,0.4)" }}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="purple" size="lg" className="rounded-full shadow-lg shadow-accent/20" asChild>
                <Link to="/book-a-consultation">Start Your Journey</Link>
              </Button>
            </div>
          </div>

          {/* RIGHT — scrolling cards */}
          <div className="lg:col-span-7 space-y-8 py-[20vh]">
            {steps.map((step, i) => {
              const isActive = activeIndex === i;
              const isPast = activeIndex > i;

              return (
                <div
                  key={step.title}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  data-index={i}
                  className="rounded-2xl p-8 md:p-10 border transition-all duration-700"
                  style={{
                    background: isActive
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.02)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderColor: isActive
                      ? `${step.accent}30`
                      : "rgba(255,255,255,0.05)",
                    opacity: isActive ? 1 : isPast ? 0.4 : 0.5,
                    transform: isActive
                      ? "scale(1) translateY(0)"
                      : isPast
                      ? "scale(0.97) translateY(-8px)"
                      : "scale(0.97) translateY(8px)",
                    boxShadow: isActive
                      ? `0 0 60px ${step.accent}10, 0 0 120px ${step.accent}05`
                      : "none",
                  }}
                >
                  {/* Glow on active */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background: `radial-gradient(600px circle at 30% 30%, ${step.accent}08, transparent 60%)`,
                      }}
                    />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700"
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${step.accent}25, ${step.accent}10)`
                            : `linear-gradient(135deg, ${step.accent}12, ${step.accent}05)`,
                          border: `1px solid ${isActive ? step.accent + "40" : step.accent + "15"}`,
                        }}
                      >
                        <step.icon
                          size={28}
                          style={{
                            color: isActive ? step.accent : `${step.accent}60`,
                            transition: "color 0.5s",
                          }}
                        />
                      </div>
                      <div>
                        <span
                          className="text-xs font-bold tracking-wider uppercase block mb-1"
                          style={{ color: `${step.accent}80` }}
                        >
                          Step {step.number}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-lg">{step.description}</p>
                    <div
                      className="mt-8 h-px w-full transition-opacity duration-700"
                      style={{
                        background: `linear-gradient(90deg, ${step.accent}30, transparent)`,
                        opacity: isActive ? 1 : 0.3,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
