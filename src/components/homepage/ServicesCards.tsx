import { motion } from "framer-motion";
import { GraduationCap, Plane, Users, Home } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: GraduationCap,
    title: "University Applications",
    description: "Expert support from course selection to enrolment confirmation.",
    link: "/university-applications",
  },
  {
    icon: Plane,
    title: "Visa & Immigration",
    description: "99% success rate with end-to-end visa application guidance.",
    link: "/visa-immigration",
  },
  {
    icon: Users,
    title: "Student Counselling",
    description: "One-on-one sessions with experienced education counsellors.",
    link: "/student-counselling",
  },
  {
    icon: Home,
    title: "Accommodation",
    description: "Find safe, affordable housing near your university campus.",
    link: "/accommodation",
  },
];

const ServicesCards = () => (
  <section className="py-20 md:py-28" style={{ backgroundColor: "#1B2150" }}>
    <div className="container px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-[48px] font-bold text-white leading-tight mb-4">
          How We Help You
        </h2>
        <p className="text-white/70 text-base md:text-lg">
          Everything you need for your study abroad journey
        </p>
      </motion.div>

      <div className="flex gap-5 overflow-x-auto md:overflow-visible md:grid md:grid-cols-4 snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Link
              to={service.link}
              className="block min-w-[260px] md:min-w-0 bg-white rounded-2xl p-8 snap-start group transition-all duration-300 hover:-translate-y-1"
              style={{
                borderTop: "3px solid transparent",
                borderImage: "linear-gradient(to right, #2EC4B6, #6B3FA0) 1",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)";
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(46,196,182,0.1)" }}
              >
                <service.icon size={24} style={{ color: "#2EC4B6" }} />
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: "#1B2150" }}
              >
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                {service.description}
              </p>
              <span
                className="text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                style={{ color: "#2EC4B6" }}
              >
                Learn more →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesCards;
