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
    title: "Visa & Immigration",
    text: "Visa applications can be stressful. Ours don't have to be. With a 99% success rate, our compliance team ensures your documents are accurate, your timelines are met, and your application has the strongest chance of approval.",
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
    <section className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-4">
            Everything You Need. Zero Fees.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From course selection to visa approval — we handle it all. And we never charge students.
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
              className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <s.icon className="text-accent mb-4" size={32} />
              <h3 className="text-lg font-bold text-primary mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.text}</p>
              <a
                href="#"
                className="text-secondary text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                Learn More →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
