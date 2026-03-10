import { GraduationCap, Shield, Users, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const allServices = [
  { icon: GraduationCap, title: "University Applications", to: "/services/university-applications" },
  { icon: Shield, title: "Visa & Immigration", to: "/services/visa-immigration" },
  { icon: Users, title: "Student Counselling", to: "/services/student-counselling" },
  { icon: Home, title: "Accommodation", to: "/services/accommodation" },
];

const OtherServices = ({ currentPath }: { currentPath: string }) => {
  const others = allServices.filter((s) => s.to !== currentPath);

  return (
    <section className="bg-card">
      <div className="container py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary text-center mb-10">
          Explore Our Other Services
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
                className="bg-background rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group block"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <s.icon className="text-secondary" size={22} />
                </div>
                <h3 className="font-bold text-primary text-sm mb-1">{s.title}</h3>
                <span className="text-secondary text-xs font-semibold group-hover:underline">
                  Learn More →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherServices;
