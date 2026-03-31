import { GraduationCap, Shield, Users, Home } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    icon: GraduationCap,
    title: "University Applications",
    text: "Finding the right university shouldn't feel like guesswork. We match you with programmes that fit your academic profile, career goals, and budget — then manage every detail of your application from start to finish.",
    to: "/services/university-applications",
  },
  {
    icon: Shield,
    title: "Student Visa Applications",
    text: "Your student visa application is one of the most important steps in your study abroad journey. With a 99% success rate, our compliance team handles your documents, financials, and timelines — giving your application the strongest possible chance of approval.",
    to: "/services/visa-immigration",
  },
  {
    icon: Users,
    title: "Student Counselling",
    text: "Not sure which path to take? Our counsellors help you explore your options — from choosing between undergraduate and postgraduate programmes to mapping out a career you'll love. No pressure, just honest guidance.",
    to: "/services/student-counselling",
  },
  {
    icon: Home,
    title: "Accommodation Support",
    text: "A great education deserves a comfortable home. We help you find safe, affordable housing near your university so you can focus on what matters — your studies.",
    to: "/services/accommodation",
  },
];

const ServicesOverview = () => {
  return (
    <section className="relative">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
            Honest Guidance for Genuine Students
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            From course selection to student visa approval — we provide expert, impartial guidance at every stage of your study abroad journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-6 border border-white/10 hover:border-secondary/30 hover:-translate-y-1 transition-all duration-300 group"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <s.icon className="text-secondary/70 mb-4 group-hover:text-secondary transition-colors" size={32} />
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-4">{s.text}</p>
              <Link
                to={s.to}
                className="text-secondary text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
