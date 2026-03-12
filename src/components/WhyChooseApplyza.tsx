import { Bot, CircleDollarSign, ShieldCheck, Heart, Globe, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: CircleDollarSign,
    title: "100% Free Service",
    text: "We carefully assess every student's academic background, career goals, and study intent before recommending programmes. Our goal is not just placement — it's your long-term success.",
    stat: "3,000+ students helped completely free",
    tint: "rgba(46,196,182,0.08)",
    iconBg: "rgba(46,196,182,0.15)",
    iconColor: "#2EC4B6",
    large: true,
  },
  {
    icon: ShieldCheck,
    title: "99% Visa Success Rate",
    text: "Our experienced compliance team has helped thousands of students secure their visas. We know what immigration officers look for — and we make sure your application ticks every box.",
    tint: "rgba(107,63,160,0.05)",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
  },
  {
    icon: Trophy,
    title: "Accredited & Trusted",
    text: "Applyza is built by the team behind Study Now — a consultancy backed by British Council and leading education bodies with over a decade of experience.",
    tint: "rgba(217,160,50,0.05)",
    iconBg: "rgba(217,160,50,0.12)",
    iconColor: "#d9a032",
  },
  {
    icon: Globe,
    title: "Global Office Network",
    text: "With offices in Lagos, Delhi, London, and Dhaka, we combine the scale of a global platform with the personal touch of a local office.",
    tint: "rgba(27,33,80,0.04)",
    iconBg: "rgba(27,33,80,0.10)",
    iconColor: "#1B2150",
  },
  {
    icon: Heart,
    title: "Expert Counsellors",
    text: "You're not just a number. Our counsellors take the time to understand your background, your ambitions, and your concerns.",
    tint: "rgba(107,63,160,0.05)",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
  },
  {
    icon: Bot,
    title: "AI-Powered Matching",
    text: "Our smart search engine analyses your qualifications, interests, and goals to recommend courses where you have the best chance of acceptance. No more guesswork.",
    tint: "rgba(46,196,182,0.05)",
    iconBg: "rgba(46,196,182,0.12)",
    iconColor: "#2EC4B6",
  },
];

const WhyChooseApplyza = () => {
  return (
    <section className="bg-white">
      <div className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4"
            style={{ color: "#6B3FA0", backgroundColor: "rgba(107,63,160,0.08)" }}
          >
            Why Students Trust Us
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground">
            Why Choose{" "}
            <span className="relative inline-block">
              Applyza?
              <span
                className="absolute -bottom-1 left-0 right-0 h-1 rounded-full"
                style={{ backgroundColor: "#2EC4B6" }}
              />
            </span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Trusted by thousands of students worldwide for honest, expert guidance.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`relative rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                r.large ? "md:col-span-1 lg:row-span-2" : ""
              }`}
            >
              {/* Tinted top bar */}
              {r.large && (
                <div
                  className="h-28"
                  style={{
                    background: `linear-gradient(135deg, ${r.tint}, rgba(46,196,182,0.15))`,
                  }}
                />
              )}

              <div className={`p-6 ${r.large ? "" : "pt-6"}`}>
                {/* Number badge */}
                <span
                  className="absolute top-4 right-4 text-xs font-bold text-gray-300"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: r.iconBg }}
                >
                  <r.icon size={24} style={{ color: r.iconColor }} />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">{r.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>

                {/* Stat for large card */}
                {r.stat && (
                  <div
                    className="mt-6 px-4 py-3 rounded-lg text-sm font-semibold"
                    style={{
                      backgroundColor: "rgba(46,196,182,0.08)",
                      color: "#2EC4B6",
                    }}
                  >
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
