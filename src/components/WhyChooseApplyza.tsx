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
    <section className="bg-card">
      <div className="container py-16 md:py-24">
        <h2 className="text-2xl md:text-4xl font-extrabold text-primary text-center mb-12">
          Why Students Choose Applyza
        </h2>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-4">
                <r.icon className="text-secondary" size={26} />
              </div>
              <h3 className="text-base font-bold text-primary mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseApplyza;
