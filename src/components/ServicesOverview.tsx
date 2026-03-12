import { GraduationCap, Shield, Users, Home } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    icon: GraduationCap,
    title: "University Applications",
    text: "We match you with programmes that fit your academic profile, career goals, and budget — then manage every detail of your application.",
    to: "/services/university-applications",
    gradient: "linear-gradient(135deg, #6B3FA0, #8B5FC0)",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
  },
  {
    icon: Shield,
    title: "Visa & Immigration",
    text: "With a 99% success rate, our compliance team ensures your documents are accurate, timelines are met, and your application is strong.",
    to: "/services/visa-immigration",
    gradient: "linear-gradient(135deg, #2EC4B6, #20A89A)",
    iconBg: "rgba(46,196,182,0.12)",
    iconColor: "#2EC4B6",
  },
  {
    icon: Users,
    title: "Student Counselling",
    text: "Our counsellors help you explore options — from choosing programmes to mapping out a career you'll love. No pressure, just guidance.",
    to: "/services/student-counselling",
    gradient: "linear-gradient(135deg, #1B2150, #2D3570)",
    iconBg: "rgba(27,33,80,0.10)",
    iconColor: "#1B2150",
  },
  {
    icon: Home,
    title: "Accommodation Support",
    text: "We help you find safe, affordable housing near your university so you can focus on what matters — your studies.",
    to: "/services/accommodation",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    iconBg: "rgba(245,158,11,0.12)",
    iconColor: "#D97706",
  },
];

const ServicesOverview = () => {
  return (
    <section className="bg-white">
      {/* Subtle top separator */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />
      <div className="container py-12 md:py-16">
        <div className="text-center mb-8">
          <span
            className="inline-block text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-3"
            style={{ color: "#2EC4B6", backgroundColor: "rgba(46,196,182,0.10)" }}
          >
            Our Services
          </span>
          <h2 className="text-xl md:text-3xl font-extrabold text-foreground mb-2">
            Everything You Need to Study Abroad
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            From course selection to visa approval — expert, impartial guidance at every stage.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 min-h-[280px] flex flex-col overflow-hidden"
            >
              {/* Gradient banner */}
              <div className="h-10 w-full" style={{ background: s.gradient }} />

              <div className="p-5 md:p-6 flex flex-col flex-1">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: s.iconBg }}
                >
                  <s.icon size={20} style={{ color: s.iconColor }} />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1.5">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
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
