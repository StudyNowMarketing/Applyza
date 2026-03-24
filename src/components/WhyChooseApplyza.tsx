import { Bot, CircleDollarSign, ShieldCheck, Heart, Globe, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: Bot,
    title: "AI-Powered Course Matching",
    text: "Our smart search engine analyses your qualifications, interests, and goals to recommend courses where you have the best chance of acceptance. No more guesswork.",
  },
  {
    icon: CircleDollarSign,
    title: "Committed to Genuine Students",
    text: "We carefully assess every student's academic background, career goals, and study intent before recommending programmes. Our goal is not just placement — it's your long-term success.",
  },
  {
    icon: ShieldCheck,
    title: "99% Visa Success Rate",
    text: "Our experienced compliance team has helped thousands of students secure their visas. We know what immigration officers look for — and we make sure your application ticks every box.",
  },
  {
    icon: Heart,
    title: "Expert Counsellors, Real Conversations",
    text: "You're not just a number. Our counsellors take the time to understand your background, your ambitions, and your concerns.",
  },
  {
    icon: Globe,
    title: "Global Reach, Local Presence",
    text: "With our headquarters in Cyprus and teams across multiple regions, we combine the scale of a global platform with the personal touch of a local office.",
  },
  {
    icon: Trophy,
    title: "Backed by Experience",
    text: "Applyza is built by the team behind Study Now — a consultancy that has placed over 3,000 students at 150+ universities with a 99% visa success rate.",
  },
];

const WhyChooseApplyza = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
            Why Students Choose Applyza
          </h2>
          <div className="w-12 h-1 bg-secondary rounded-full mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl p-6 border-l-4 border-l-secondary/40 hover:border-l-secondary border border-white/10 transition-all duration-300 group"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(46,196,182,0.2) 0%, rgba(46,196,182,0.05) 100%)",
                  border: "1px solid rgba(46,196,182,0.15)",
                }}
              >
                <r.icon className="text-secondary" size={26} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{r.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseApplyza;
