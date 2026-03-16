import { useState, useEffect, useRef, useCallback } from "react";
import { Bot, CircleDollarSign, ShieldCheck, Clock, Globe, Heart } from "lucide-react";
import { motion, useInView } from "framer-motion";

const reasons = [
  {
    icon: CircleDollarSign,
    title: "100% Free Service",
    text: "We assess every student's background, goals, and intent before recommending programmes. Our goal is your long-term success.",
    iconBg: "rgba(46,196,182,0.15)",
    iconColor: "#2EC4B6",
    hoverIconBg: "#2EC4B6",
    hoverGradient: "linear-gradient(135deg, #ffffff 0%, #f8fcfb 100%)",
    num: 1,
  },
  {
    icon: ShieldCheck,
    title: "99% Visa Success Rate",
    text: "Our compliance team knows what immigration officers look for — and we make sure your application ticks every box.",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
    hoverIconBg: "#2EC4B6",
    hoverGradient: "linear-gradient(135deg, #ffffff 0%, #f9f7fc 100%)",
    num: 2,
  },
  {
    icon: Clock,
    title: "Fast Response",
    text: "Get a response within 24 hours. We know your time is valuable when you're planning your future.",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6b3fa0",
    hoverIconBg: "#2EC4B6",
    hoverGradient: "linear-gradient(135deg, #ffffff 0%, #f9f7fc 100%)",
    num: 3,
  },
  {
    icon: Globe,
    title: "Global Office Network",
    text: "Offices in Nicosia, Lagos, Accra, Nairobi, Doha, and Istanbul — global scale with a local personal touch.",
    iconBg: "rgba(27,33,80,0.10)",
    iconColor: "#1B2150",
    hoverIconBg: "#2EC4B6",
    hoverGradient: "linear-gradient(135deg, #ffffff 0%, #f8fcfb 100%)",
    num: 4,
  },
  {
    icon: Heart,
    title: "Expert Counsellors",
    text: "Our counsellors understand your background, ambitions, and concerns. You're not just a number.",
    iconBg: "rgba(46,196,182,0.15)",
    iconColor: "#2EC4B6",
    hoverIconBg: "#2EC4B6",
    hoverGradient: "linear-gradient(135deg, #ffffff 0%, #f8fcfb 100%)",
    num: 5,
  },
  {
    icon: Bot,
    title: "AI-Powered Matching",
    text: "Our smart engine analyses your qualifications and goals to recommend courses with the best chance of acceptance.",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
    hoverIconBg: "#2EC4B6",
    hoverGradient: "linear-gradient(135deg, #ffffff 0%, #f9f7fc 100%)",
    num: 6,
  },
];

const headingWords = ["Why", "Choose", "Applyza?"];

function CountUpNumber({ target, trigger }: { target: number; trigger: boolean }) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;
    const duration = 500;
    const steps = 15;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.round((step / steps) * target));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [trigger, target]);

  return <>{String(value).padStart(2, "0")}</>;
}

const WhyChooseApplyza = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const overlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.4, delay: 0.3 + i * 0.15, ease: "easeOut" },
    }),
  };

  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, delay: 0.3 + headingWords.length * 0.15, ease: "easeOut" },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.5, delay: 0.3 + headingWords.length * 0.15 + 0.3 },
    },
  };

  const getCardVariants = useCallback((i: number) => {
    const isLeftRow = i < 3;
    return {
      hidden: { opacity: 0, x: isLeftRow ? -60 : 60 },
      visible: {
        opacity: 1, x: 0,
        transition: {
          duration: 0.6,
          delay: (i % 3) * 0.15 + (isLeftRow ? 0 : 0.1),
          ease: "easeOut",
        },
      },
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        animation: "why-bg-shift 8s ease-in-out infinite",
      }}
    >
      {/* Decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-extrabold tracking-wider"
          style={{ fontSize: "250px", opacity: 0.02, color: "#1B2150", lineHeight: 1 }}
        >
          WHY US
        </span>
      </div>

      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

      <div className="container py-12 md:py-16 relative z-10">
        {/* Heading block */}
        <div className="text-center mb-8">
          <motion.span
            variants={overlineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="inline-block text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-3"
            style={{ color: "#6B3FA0", backgroundColor: "rgba(107,63,160,0.08)" }}
          >
            Why Students Trust Us
          </motion.span>

          <h2 className="text-xl md:text-3xl font-extrabold text-foreground mb-2 flex items-center justify-center gap-2 flex-wrap">
            {headingWords.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-block"
              >
                {word === "Applyza?" ? (
                  <span className="relative inline-block">
                    {word}
                    <motion.span
                      variants={underlineVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      className="absolute -bottom-1 left-0 right-0 h-1 rounded-full origin-left"
                      style={{ backgroundColor: "#2EC4B6" }}
                    />
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h2>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-muted-foreground mt-2 max-w-lg mx-auto text-sm"
          >
            Trusted by thousands of students worldwide for honest, expert guidance.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r, i) => {
            const isHovered = hovered === i;
            return (
              <motion.div
                key={r.title}
                variants={getCardVariants(i)}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative rounded-xl border border-gray-100 shadow-sm cursor-pointer card-glow"
                style={{
                  background: isHovered ? r.hoverGradient : "white",
                  transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                  boxShadow: isHovered ? "0 16px 40px -12px rgba(0,0,0,0.15)" : undefined,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Animated left border */}
                <div
                  className="absolute left-0 top-0 w-[3px] rounded-l-xl"
                  style={{
                    backgroundColor: "#2EC4B6",
                    height: isHovered ? "100%" : "0%",
                    transition: "height 0.3s ease",
                  }}
                />

                <div className="p-5">
                  <span
                    className="absolute top-3 right-3 text-xs font-bold transition-colors duration-300"
                    style={{ color: isHovered ? "#6B3FA0" : "#d1d5db" }}
                  >
                    <CountUpNumber target={r.num} trigger={isInView} />
                  </span>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: isHovered ? r.hoverIconBg : r.iconBg,
                        transform: isHovered ? "scale(1.2)" : "scale(1)",
                        animation: !isHovered ? `icon-pulse 3s ease-in-out infinite` : "none",
                        animationDelay: `${i * 0.5}s`,
                        transition: "background-color 0.3s ease, transform 0.3s ease",
                      }}
                    >
                      <r.icon
                        size={26}
                        style={{
                          color: isHovered ? "#ffffff" : r.iconColor,
                          transition: "color 0.3s ease",
                        }}
                      />
                    </div>
                    <h3
                      className="text-base font-bold"
                      style={{ color: "#1B2150" }}
                    >
                      {r.title}
                    </h3>
                  </div>

                  <div className="mt-3">
                    <p
                      className="text-sm leading-relaxed pl-[72px] transition-colors duration-300"
                      style={{ color: isHovered ? "#374151" : "#6b7280" }}
                    >
                      {r.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseApplyza;
