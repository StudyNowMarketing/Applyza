import { useState, useEffect, useRef } from "react";
import { Bot, CircleDollarSign, ShieldCheck, Clock, Globe, Trophy, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { CardGlow } from "@/components/ui/CardGlow";

const reasons = [
  {
    icon: CircleDollarSign,
    title: "100% Free Service",
    text: "We assess every student's background, goals, and intent before recommending programmes. Our goal is your long-term success.",
    iconBg: "rgba(46,196,182,0.15)",
    iconColor: "#2EC4B6",
  },
  {
    icon: ShieldCheck,
    title: "99% Visa Success Rate",
    text: "Our compliance team knows what immigration officers look for — and we make sure your application ticks every box.",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
  },
  {
    icon: Clock,
    title: "Fast Response",
    text: "Get a response within 24 hours. We know your time is valuable when you're planning your future.",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6b3fa0",
  },
  {
    icon: Globe,
    title: "Global Office Network",
    text: "Offices in Nicosia, Lagos, Accra, Nairobi, Doha, and Istanbul — global scale with a local personal touch.",
    iconBg: "rgba(27,33,80,0.10)",
    iconColor: "#1B2150",
  },
  {
    icon: Heart,
    title: "Expert Counsellors",
    text: "Our counsellors understand your background, ambitions, and concerns. You're not just a number.",
    iconBg: "rgba(46,196,182,0.15)",
    iconColor: "#2EC4B6",
  },
  {
    icon: Bot,
    title: "AI-Powered Matching",
    text: "Our smart engine analyses your qualifications and goals to recommend courses with the best chance of acceptance.",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
  },
];

const WhyChooseApplyza = () => {
  const [hoveredDesktop, setHoveredDesktop] = useState<number | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMobileTap = (i: number) => {
    setExpandedMobile((prev) => (prev === i ? null : i));
  };

  return (
    <section className="bg-white" ref={sectionRef}>
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />
      <div className="container py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span
            className="inline-block text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-3"
            style={{ color: "#6B3FA0", backgroundColor: "rgba(107,63,160,0.08)" }}
          >
            Why Students Trust Us
          </span>
          <h2 className="text-xl md:text-3xl font-extrabold text-foreground mb-2">
            Why Choose{" "}
            <span className="relative inline-block">
              Applyza?
              <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full" style={{ backgroundColor: "#2EC4B6" }} />
            </span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto text-sm">
            Trusted by thousands of students worldwide for honest, expert guidance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r, i) => {
            const isExpanded = hoveredDesktop === i || expandedMobile === i;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 cursor-pointer overflow-hidden hover-lift"
                style={{
                  borderLeft: isExpanded ? `4px solid ${r.iconColor}` : "4px solid transparent",
                  boxShadow: isExpanded ? "0 10px 30px -10px rgba(0,0,0,0.12)" : undefined,
                }}
                onMouseEnter={() => setHoveredDesktop(i)}
                onMouseLeave={() => setHoveredDesktop(null)}
                onClick={() => handleMobileTap(i)}
              >
                <CardGlow spread={30} proximity={48} borderWidth={2} />
                  <span className="absolute top-3 right-3 text-xs font-bold text-gray-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300"
                      style={{
                        backgroundColor: r.iconBg,
                        transform: isExpanded ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      <r.icon size={26} style={{ color: r.iconColor }} />
                    </div>
                    <h3 className="text-base font-bold" style={{ color: "#1B2150" }}>{r.title}</h3>
                  </div>

                  {/* Description — always visible on lg, animated on smaller */}
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isExpanded ? "200px" : "0px",
                      opacity: isExpanded ? 1 : 0,
                      marginTop: isExpanded ? "12px" : "0px",
                    }}
                  >
                    <p className="text-sm text-gray-500 leading-relaxed pl-[72px]">{r.text}</p>
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
