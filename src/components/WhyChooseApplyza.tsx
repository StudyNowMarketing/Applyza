import { Bot, CircleDollarSign, ShieldCheck, Heart, Globe, Trophy } from "lucide-react";
import { motion } from "framer-motion";

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
    icon: Trophy,
    title: "Accredited & Trusted",
    text: "Backed by British Council and leading education bodies with over a decade of experience.",
    iconBg: "rgba(217,160,50,0.12)",
    iconColor: "#d9a032",
  },
  {
    icon: Globe,
    title: "Global Office Network",
    text: "Offices in Lagos, Abuja, London, and Dhaka — global scale with a local personal touch.",
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
  return (
    <section className="bg-white">
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
              className="relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5 min-h-[200px]"
            >
              <span className="absolute top-3 right-3 text-xs font-bold text-gray-300">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: r.iconBg }}>
                <r.icon size={20} style={{ color: r.iconColor }} />
              </div>

              <h3 className="text-base font-bold mt-3" style={{ color: "#1B2150" }}>{r.title}</h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseApplyza;
