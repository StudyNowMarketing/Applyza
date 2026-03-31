import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/ServiceHero";
import ServiceCTA from "@/components/ServiceCTA";
import GenuineStudentBanner from "@/components/GenuineStudentBanner";
import { GraduationCap, Shield, Users, Home, Award, Globe, Star, Banknote } from "lucide-react";
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
    stat: "5,000+ applications managed",
  },
  {
    icon: Shield,
    title: "Student Visa Applications",
    text: "Your student visa application is one of the most important steps in your study abroad journey. With a 99% success rate, our compliance team handles your documents, financials, and timelines — giving your application the strongest possible chance of approval.",
    to: "/services/visa-immigration",
    gradient: "linear-gradient(135deg, #2EC4B6, #20A89A)",
    iconBg: "rgba(46,196,182,0.12)",
    iconColor: "#2EC4B6",
    stat: "99% student visa success rate",
  },
  {
    icon: Users,
    title: "Student Counselling",
    text: "Not sure which path to take? Our counsellors help you explore your options — from choosing between undergraduate and postgraduate programmes to mapping out a career you'll love. No pressure, just honest guidance.",
    to: "/services/student-counselling",
    gradient: "linear-gradient(135deg, #1B2150, #2D3570)",
    iconBg: "rgba(27,33,80,0.10)",
    iconColor: "#1B2150",
    stat: "10,000+ students counselled",
  },
  {
    icon: Home,
    title: "Accommodation Support",
    text: "A great education deserves a comfortable home. We help you find safe, affordable housing near your university so you can focus on what matters — your studies.",
    to: "/services/accommodation",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    iconBg: "rgba(245,158,11,0.12)",
    iconColor: "#D97706",
    stat: "3,000+ students housed",
  },
];

const trustStats = [
  { icon: Star, value: "10,000+", label: "Students Helped" },
  { icon: Shield, value: "99%", label: "Visa Success Rate" },
  { icon: Globe, value: "200+", label: "Partner Universities" },
  { icon: Banknote, value: "Free", label: "Always & Forever" },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://applyza.com" },
    { "@type": "ListItem", "position": 2, "name": "Our Services", "item": "https://applyza.com/services" },
  ],
};

const Services = () => (
  <div className="min-h-screen">
    <SEO
      title="Free Study Abroad Services | Applications, Student Visa Support & Counselling | Applyza"
      description="Free university applications, student visa application support with 99% success rate, student counselling, and accommodation guidance — all from Applyza's certified consultants."
      path="/services"
      jsonLd={breadcrumbSchema}
    />
    <Navbar />
    <ServiceHero
      badge="All Services Free for Students"
      heading="Expert Support for Every Step of Your Study Abroad Journey"
      subtext="From first question to first lecture — university applications, student visa application support, counselling, and accommodation, all managed by certified consultants. All completely free."
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      ctaPrimary={{ label: "Book a Free Consultation", to: "/book-a-consultation" }}
      ctaSecondary={{ label: "Explore Services", to: "#services" }}
    />

    {/* Trust Stats Strip */}
    <section style={{ background: "#0f1230" }}>
      <div className="container py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {trustStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-white/50 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

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
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Why Is It Free?</h2>
          <p className="text-muted-foreground leading-relaxed text-sm mb-3">
            Our service is completely free for students at every stage — no consultation fees, no application charges, and no hidden costs. Expert guidance, university application support, and student visa application assistance, all included.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Our counsellors hold professional certifications in international student advising and adhere to the National Code of Ethical Practice for Education Agents. We provide impartial, personalised advice based on each student's individual circumstances and goals.
          </p>
          <Link
            to="/how-to-choose-a-study-abroad-consultancy"
            className="inline-block mt-4 text-sm font-semibold text-secondary hover:underline"
          >
            Not sure what to look for in a consultancy? Read our guide →
          </Link>
        </motion.div>
      </div>
    </section>

    <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

    {/* Service Cards */}
    <section className="bg-background" id="services">
      <div className="container py-12">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-2">Our Services</h2>
        <p className="text-muted-foreground text-sm text-center mb-8 max-w-lg mx-auto">
          Four specialised services. One joined-up journey. Everything you need to study abroad, handled by people who know what they're doing.
        </p>
        <div className="grid sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col card-glow group"
            >
              {/* Colour bar */}
              <div className="h-1.5 w-full rounded-t-xl" style={{ background: s.gradient }} />
              <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.iconBg }}>
                    <s.icon size={20} style={{ color: s.iconColor }} />
                  </div>
                  <span
                    className="text-xs font-semibold rounded-full px-2.5 py-1"
                    style={{ background: s.iconBg, color: s.iconColor }}
                  >
                    {s.stat}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{s.text}</p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
                  <Link
                    to={s.to}
                    className="text-foreground text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all group-hover:text-primary"
                  >
                    Learn More →
                  </Link>
                  <Link
                    to="/book-a-consultation"
                    className="text-secondary text-sm font-semibold transition-colors hover:underline"
                  >
                    Get Started Free
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

    <div className="container max-w-3xl">
      <GenuineStudentBanner />
    </div>

    <ServiceCTA label="Book a Free Consultation" />
    <Footer />
  </div>
);

export default Services;
