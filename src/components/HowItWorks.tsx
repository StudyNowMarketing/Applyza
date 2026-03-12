import { useState, useEffect, useCallback, useRef } from "react";
import { Search, MessageCircle, FileCheck, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    icon: Search,
    label: "Discover",
    title: "Discover Your Path",
    description:
      "Explore thousands of courses across top universities. Use our AI-powered search to find ones that match your goals and budget.",
    cta: "Find a Course →",
    ctaLink: "/find-a-course",
  },
  {
    icon: MessageCircle,
    label: "Connect",
    title: "Connect With Experts",
    description:
      "Book a free consultation with an expert counsellor. Video call, phone, or face-to-face — we're here to help.",
    cta: "Book a Consultation →",
    ctaLink: "/contact",
  },
  {
    icon: FileCheck,
    label: "Apply",
    title: "We Handle Everything",
    description:
      "We handle the heavy lifting — documents, applications, and visa process. Our team takes care of it all.",
    cta: "Our Services →",
    ctaLink: "/services",
  },
  {
    icon: Plane,
    label: "Arrive",
    title: "Start Your Journey",
    description:
      "Touch down with confidence. We support you with accommodation guidance, pre-departure tips, and ongoing assistance.",
    cta: "Study Destinations →",
    ctaLink: "/study-destinations",
  },
];

/* ── Step visuals (right column) ── */

const DiscoverVisual = () => (
  <div className="relative w-full max-w-xs mx-auto">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-[-40px] relative"
        style={{
          transform: `rotate(${(i - 1) * 3}deg) translateX(${(i - 1) * 8}px)`,
          zIndex: 3 - i,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs" style={{ backgroundColor: "rgba(46,196,182,0.12)" }}>🎓</div>
          <div>
            <div className="text-xs font-bold" style={{ color: "#1B2150" }}>
              {["BSc Computer Science", "MA International Business", "MSc Data Analytics"][i]}
            </div>
            <div className="text-[10px] text-gray-400">
              {["University of London", "TU Munich", "Trinity College Dublin"][i]}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ConnectVisual = () => (
  <div className="w-full max-w-xs mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
    <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: "rgba(107,63,160,0.10)" }}>
      <MessageCircle size={28} style={{ color: "#6B3FA0" }} />
    </div>
    <div className="text-sm font-bold mb-1" style={{ color: "#1B2150" }}>Live Counselling</div>
    <div className="text-xs text-gray-400 mb-3">Video · Phone · In-Person</div>
    <div className="flex items-center justify-center gap-1">
      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#22c55e" }} />
      <span className="text-[10px] font-medium text-gray-500">Counsellors online now</span>
    </div>
  </div>
);

const ApplyVisual = () => {
  const items = ["Documents Prepared", "Application Submitted", "Visa Filed", "Offer Received"];
  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
      {items.map((item, i) => (
        <div key={item} className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ backgroundColor: "#2EC4B6" }}>✓</div>
          <span className="text-sm font-medium" style={{ color: "#1B2150" }}>{item}</span>
        </div>
      ))}
    </div>
  );
};

const ArriveVisual = () => (
  <div className="w-full max-w-xs mx-auto text-center relative py-4">
    <div className="relative inline-block">
      <div className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-4xl" style={{ backgroundColor: "rgba(46,196,182,0.10)" }}>
        🎓
      </div>
      {/* Confetti dots */}
      {[
        { top: "-8px", left: "-12px", bg: "#2EC4B6" },
        { top: "-4px", right: "-16px", bg: "#6B3FA0" },
        { bottom: "-6px", left: "-8px", bg: "#d9a032" },
        { bottom: "0px", right: "-10px", bg: "#2EC4B6" },
        { top: "4px", left: "-20px", bg: "#6B3FA0" },
        { top: "-12px", right: "4px", bg: "#d9a032" },
      ].map((s, i) => (
        <div key={i} className="absolute w-2 h-2 rounded-full" style={{ ...s, opacity: 0.7 }} />
      ))}
    </div>
    <div className="text-sm font-bold mt-4" style={{ color: "#1B2150" }}>Welcome to your new university!</div>
    <div className="text-xs text-gray-400 mt-1">Your future starts here</div>
  </div>
);

const visuals = [DiscoverVisual, ConnectVisual, ApplyVisual, ArriveVisual];

/* ── Main Component ── */

const AUTO_INTERVAL = 5000;
const PAUSE_DURATION = 15000;

const HowItWorks = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const pausedUntilRef = useRef(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % 4);
    setProgress(0);
  }, []);

  // Auto-play timer
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      if (now < pausedUntilRef.current) return;
      setProgress((p) => {
        if (p >= 100) {
          advance();
          return 0;
        }
        return p + 2; // 50 ticks * 100ms = 5s
      });
    };
    progressRef.current = setInterval(tick, 100);
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [advance]);

  const handleClick = (i: number) => {
    setActive(i);
    setProgress(0);
    pausedUntilRef.current = Date.now() + PAUSE_DURATION;
  };

  const StepVisual = visuals[active];

  return (
    <section style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-3xl font-extrabold text-foreground">
            Your Journey in{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #2EC4B6, #6B3FA0)" }}
            >
              Four Steps
            </span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto text-sm">
            From your first search to your first day on campus — we guide you through every step.
          </p>
        </div>

        {/* Step selector */}
        <div className="flex items-center justify-center mb-8 px-4">
          <div className="relative flex items-center w-full max-w-lg">
            {/* Background line */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 z-0" />
            {/* Active progress line */}
            <div
              className="absolute top-6 left-6 h-0.5 z-[1] transition-all duration-300"
              style={{
                width: `${(active / 3) * (100 - (12 / 5))}%`,
                background: "linear-gradient(to right, #2EC4B6, #6B3FA0)",
              }}
            />

            <div className="relative z-10 flex items-center justify-between w-full">
              {steps.map((step, i) => (
                <button
                  key={step.label}
                  onClick={() => handleClick(i)}
                  className="flex flex-col items-center gap-2 group"
                >
                  {/* Circle with optional progress ring */}
                  <div className="relative">
                    {/* Progress ring for active step */}
                    {i === active && (
                      <svg className="absolute -inset-1 w-14 h-14" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="26" fill="none" stroke="rgba(46,196,182,0.15)" strokeWidth="2" />
                        <circle
                          cx="28" cy="28" r="26" fill="none" stroke="#2EC4B6" strokeWidth="2"
                          strokeDasharray={`${2 * Math.PI * 26}`}
                          strokeDashoffset={`${2 * Math.PI * 26 * (1 - progress / 100)}`}
                          strokeLinecap="round"
                          transform="rotate(-90 28 28)"
                          className="transition-all duration-100"
                        />
                      </svg>
                    )}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        i === active
                          ? "text-white scale-110 shadow-lg"
                          : "bg-white border-2 border-gray-200 text-gray-400 hover:border-gray-300"
                      }`}
                      style={i === active ? {
                        background: "linear-gradient(135deg, #2EC4B6, #6B3FA0)",
                        boxShadow: "0 8px 24px rgba(46,196,182,0.3)",
                      } : {}}
                    >
                      {i + 1}
                    </div>
                  </div>
                  <span
                    className={`text-sm transition-all duration-300 ${
                      i === active ? "font-bold" : "text-gray-400"
                    }`}
                    style={i === active ? { color: "#1B2150" } : {}}
                  >
                    {step.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              {/* Left: text */}
              <div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: active % 2 === 0 ? "rgba(46,196,182,0.12)" : "rgba(107,63,160,0.12)" }}
                >
                  {(() => {
                    const Icon = steps[active].icon;
                    return <Icon size={24} style={{ color: active % 2 === 0 ? "#2EC4B6" : "#6B3FA0" }} />;
                  })()}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#1B2150" }}>
                  {steps[active].title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {steps[active].description}
                </p>
                <Link
                  to={steps[active].ctaLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-colors"
                  style={{ backgroundColor: "#2EC4B6" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#25a89c")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2EC4B6")}
                >
                  {steps[active].cta}
                </Link>
              </div>

              {/* Right: visual */}
              <div className="flex items-center justify-center py-4">
                <StepVisual />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
