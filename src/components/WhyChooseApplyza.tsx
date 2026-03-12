import { Bot, CircleDollarSign, ShieldCheck, Heart, Globe, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: CircleDollarSign,
    title: "100% Free Service",
    text: "We assess every student's background, goals, and intent before recommending programmes. Our goal is your long-term success.",
    stat: "3,000+ students helped completely free",
    tint: "rgba(46,196,182,0.08)",
    iconBg: "rgba(46,196,182,0.15)",
    iconColor: "#2EC4B6",
    large: true,
  },
  {
    icon: ShieldCheck,
    title: "99% Visa Success Rate",
    text: "Our compliance team knows what immigration officers look for — and we make sure your application ticks every box.",
    tint: "rgba(107,63,160,0.05)",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
  },
  {
    icon: Trophy,
    title: "Accredited & Trusted",
    text: "Backed by British Council and leading education bodies with over a decade of experience.",
    tint: "rgba(217,160,50,0.05)",
    iconBg: "rgba(217,160,50,0.12)",
    iconColor: "#d9a032",
  },
  {
    icon: Globe,
    title: "Global Office Network",
    text: "Offices in Lagos, Delhi, London, and Dhaka — global scale with a local personal touch.",
    tint: "rgba(27,33,80,0.04)",
    iconBg: "rgba(27,33,80,0.10)",
    iconColor: "#1B2150",
  },
  {
    icon: Heart,
    title: "Expert Counsellors",
    text: "Our counsellors understand your background, ambitions, and concerns. You're not just a number.",
    tint: "rgba(107,63,160,0.05)",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
  },
  {
    icon: Bot,
    title: "AI-Powered Matching",
    text: "Our smart engine analyses your qualifications and goals to recommend courses with the best chance of acceptance.",
    tint: "rgba(46,196,182,0.05)",
    iconBg: "rgba(46,196,182,0.12)",
    iconColor: "#2EC4B6",
  },
];

const WhyChooseApplyza = () => {
  return (
    <section className="bg-white">
      {/* Subtle top separator */}
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
              <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full"
                style={{ backgroundColor: "#2EC4B6" }} />
            </span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto text-sm">
            Trusted by thousands of students worldwide for honest, expert guidance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`relative rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                r.large ? "md:col-span-1 lg:row-span-2" : ""
              }`}
            >
              {r.large && (
                <div className="h-20"
                  style={{ background: `linear-gradient(135deg, ${r.tint}, rgba(46,196,182,0.15))` }} />
              )}

              <div className={`p-5 ${r.large ? "" : "pt-5"}`}>
                <span className="absolute top-3 right-3 text-xs font-bold text-gray-300">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: r.iconBg }}>
                  <r.icon size={20} style={{ color: r.iconColor }} />
                </div>

                <h3 className="text-base font-bold text-foreground mb-1.5">{r.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{r.text}</p>

                {r.stat && (
                  <div className="mt-4 px-3 py-2 rounded-lg text-xs font-semibold"
                    style={{ backgroundColor: "rgba(46,196,182,0.08)", color: "#2EC4B6" }}>
                    {r.stat}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseApplyza;
