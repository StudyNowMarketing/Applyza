import { GraduationCap, Shield, Users, Home } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    icon: GraduationCap,
    title: "University Applications",
    text: "Finding the right university shouldn't feel like guesswork. We match you with programmes that fit your academic profile, career goals, and budget — then manage every detail of your application from start to finish.",
    to: "/services/university-applications",
    tint: "rgba(107,63,160,0.06)",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
  },
  {
    icon: Shield,
    title: "Visa & Immigration",
    text: "Visa applications can be stressful. Ours don't have to be. With a 99% success rate, our compliance team ensures your documents are accurate, your timelines are met, and your application has the strongest chance of approval.",
    to: "/services/visa-immigration",
    tint: "rgba(46,196,182,0.06)",
    iconBg: "rgba(46,196,182,0.12)",
    iconColor: "#2EC4B6",
  },
  {
    icon: Users,
    title: "Student Counselling",
    text: "Not sure which path to take? Our counsellors help you explore your options — from choosing between undergraduate and postgraduate programmes to mapping out a career you'll love. No pressure, just honest guidance.",
    to: "/services/student-counselling",
    tint: "rgba(27,33,80,0.04)",
    iconBg: "rgba(27,33,80,0.10)",
    iconColor: "#1B2150",
  },
  {
    icon: Home,
    title: "Accommodation Support",
    text: "A great education deserves a comfortable home. We help you find safe, affordable housing near your university so you can focus on what matters — your studies.",
    to: "/services/accommodation",
    tint: "rgba(217,160,50,0.06)",
    iconBg: "rgba(217,160,50,0.12)",
    iconColor: "#d9a032",
  },
];

const ServicesOverview = () => {
  return (
    <section className="bg-white">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4"
            style={{
              color: "#2EC4B6",
              backgroundColor: "rgba(46,196,182,0.10)",
            }}
          >
            Our Services
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4">
            Everything You Need to Study Abroad
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From course selection to visa approval — we provide expert, impartial guidance at every stage of your study abroad journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-h-[360px] flex flex-col overflow-hidden"
            >
              {/* Tinted top area */}
              <div
                className="h-2 w-full"
                style={{ backgroundColor: s.tint }}
              />

              <div className="p-6 flex flex-col flex-1">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: s.iconBg }}
                >
                  <s.icon size={24} style={{ color: s.iconColor }} />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                  {s.text}
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <Link
                    to={s.to}
                    className="text-foreground text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Learn More →
                  </Link>
                  <Link
                    to="/book-a-consultation"
                    className="text-sm font-semibold transition-colors"
                    style={{ color: "#2EC4B6" }}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
