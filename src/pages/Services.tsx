import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/ServiceHero";
import ServiceCTA from "@/components/ServiceCTA";
import GenuineStudentBanner from "@/components/GenuineStudentBanner";
import { GraduationCap, Shield, Users, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  {
    icon: GraduationCap,
    title: "University Applications",
    text: "Finding the right university shouldn't feel like guesswork. We match you with programmes that fit your academic profile, career goals, and budget — then manage every detail of your application from start to finish.",
    to: "/services/university-applications",
    gradient: "linear-gradient(135deg, #6B3FA0, #8B5FC0)",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
  },
  {
    icon: Shield,
    title: "Visa & Immigration",
    text: "Visa applications can be stressful. Ours don't have to be. With a 99% success rate, our compliance team ensures your documents are accurate, your timelines are met, and your application has the strongest chance of approval.",
    to: "/services/visa-immigration",
    gradient: "linear-gradient(135deg, #2EC4B6, #20A89A)",
    iconBg: "rgba(46,196,182,0.12)",
    iconColor: "#2EC4B6",
  },
  {
    icon: Users,
    title: "Student Counselling",
    text: "Not sure which path to take? Our counsellors help you explore your options — from choosing between undergraduate and postgraduate programmes to mapping out a career you'll love. No pressure, just honest guidance.",
    to: "/services/student-counselling",
    gradient: "linear-gradient(135deg, #1B2150, #2D3570)",
    iconBg: "rgba(27,33,80,0.10)",
    iconColor: "#1B2150",
  },
  {
    icon: Home,
    title: "Accommodation Support",
    text: "A great education deserves a comfortable home. We help you find safe, affordable housing near your university so you can focus on what matters — your studies.",
    to: "/services/accommodation",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    iconBg: "rgba(245,158,11,0.12)",
    iconColor: "#D97706",
  },
];

const Services = () => (
  <div className="min-h-screen">
    <SEO title="Our Services | Free University Applications, Visa Support & Counselling | Applyza" description="Applyza offers free university application support, visa assistance with a 99% success rate, student counselling, and accommodation help." path="/services" />
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
    <section className="bg-background">
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto border-l-4 border-secondary pl-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Why Free?</h2>
          <p className="text-muted-foreground leading-relaxed text-sm mb-3">
            Our partner universities fund our services because we deliver qualified, well-prepared students who are ready to succeed. That means you get expert guidance, application support, and visa assistance — all at absolutely no cost to you.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Our counsellors are trained and certified under the UK Agent Quality Framework. We provide impartial advice based on each student's individual circumstances.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Section separator */}
    <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

    {/* Service Cards */}
    <section className="bg-background">
      <div className="container py-12">
        <div className="grid sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 min-h-[280px] flex flex-col overflow-hidden"
            >
              <div className="h-10 w-full" style={{ background: s.gradient }} />
              <div className="p-5 md:p-6 flex flex-col flex-1">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: s.iconBg }}
                >
                  <s.icon size={20} style={{ color: s.iconColor }} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{s.text}</p>
                <div className="flex items-center gap-4 mt-auto">
                  <Link
                    to={s.to}
                    className="text-foreground text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Learn More →
                  </Link>
                  <Link
                    to="/book-a-consultation"
                    className="text-secondary text-sm font-semibold transition-colors"
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

    <div className="container max-w-3xl">
      <GenuineStudentBanner />
    </div>

    <ServiceCTA label="Book a Free Consultation" />
    <Footer />
  </div>
);

export default Services;
