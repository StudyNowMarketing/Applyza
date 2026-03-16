import { GraduationCap, Shield, Users, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const allServices = [
  {
    icon: GraduationCap,
    title: "University Applications",
    to: "/services/university-applications",
    gradient: "linear-gradient(135deg, #6B3FA0, #8B5FC0)",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
  },
  {
    icon: Shield,
    title: "Visa & Immigration",
    to: "/services/visa-immigration",
    gradient: "linear-gradient(135deg, #2EC4B6, #20A89A)",
    iconBg: "rgba(46,196,182,0.12)",
    iconColor: "#2EC4B6",
  },
  {
    icon: Users,
    title: "Student Counselling",
    to: "/services/student-counselling",
    gradient: "linear-gradient(135deg, #1B2150, #2D3570)",
    iconBg: "rgba(27,33,80,0.10)",
    iconColor: "#1B2150",
  },
  {
    icon: Home,
    title: "Accommodation",
    to: "/services/accommodation",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    iconBg: "rgba(245,158,11,0.12)",
    iconColor: "#D97706",
  },
];

const OtherServices = ({ currentPath }: { currentPath: string }) => {
  const others = allServices.filter((s) => s.to !== currentPath);

  return (
    <section className="bg-background">
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />
      <div className="container py-12">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">
          Explore Our Other Services
        </h2>
        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {others.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={s.to}
                className="bg-card rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden group block border border-border card-glow"
              >
                <div className="h-8 w-full" style={{ background: s.gradient }} />
                <div className="p-5 flex flex-col items-center text-center">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: s.iconBg }}
                  >
                    <s.icon size={18} style={{ color: s.iconColor }} />
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-1">{s.title}</h3>
                  <span className="text-secondary text-xs font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherServices;
