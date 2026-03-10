import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceHero from "@/components/ServiceHero";
import ServiceCTA from "@/components/ServiceCTA";
import { GraduationCap, Shield, Users, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

const Services = () => (
  <div className="min-h-screen">
    <Navbar />
    <ServiceHero
      heading="World-Class Support. Zero Cost."
      subtext="From your first question to your first lecture — Applyza supports you through every stage of the study abroad journey. And we never charge you for it."
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Services" },
      ]}
    />

    {/* Why Free? */}
    <section className="bg-secondary/5">
      <div className="container py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-4">Why Free?</h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4">
            Our partner universities fund our services because we deliver qualified, well-prepared students who are ready to succeed. That means you get expert guidance, application support, and visa assistance — all at absolutely no cost to you.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            Our counsellors are trained and certified under the UK Agent Quality Framework. We provide impartial advice based on each student's individual circumstances.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Service Cards */}
    <section className="bg-background">
      <div className="container py-12 md:py-20">
        <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
                <s.icon className="text-secondary" size={26} />
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.text}</p>
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

    <ServiceCTA label="Book a Free Consultation" />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Services;
