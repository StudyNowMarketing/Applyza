import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/ServiceHero";
import ServiceCTA from "@/components/ServiceCTA";
import OtherServices from "@/components/OtherServices";
import { motion } from "framer-motion";
import { MessageSquare, Brain, FileText, Send, BarChart3, ArrowRight, Check } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "Consultation", desc: "We learn about your academic background, goals, and preferences." },
  { icon: Brain, title: "Course Matching", desc: "Our AI recommends programmes where you have strong admission prospects." },
  { icon: FileText, title: "Application Preparation", desc: "We help you prepare documents, personal statements, and references." },
  { icon: Send, title: "Submission & Tracking", desc: "We submit your application and keep you updated at every stage." },
  { icon: BarChart3, title: "Offer Management", desc: "We help you compare offers and make the best decision." },
  { icon: ArrowRight, title: "Next Steps", desc: "We hand you over to our visa team to continue the journey." },
];

const included = [
  "One-on-one consultation",
  "AI-powered course matching",
  "Full application management",
  "Document preparation and review",
  "Direct communication with admissions",
  "Offer tracking and acceptance support",
];

const UniversityApplications = () => (
  <div className="min-h-screen">
    <SEO title="University Application Support | Apply with Expert Help | Applyza" description="Get expert help with your university application — completely free. Course matching, document preparation, and application management." path="/services/university-applications" />
    <Navbar />
    <ServiceHero
      heading="Your Application, Our Expertise"
      subtext="We've helped thousands of students get accepted into top universities. Let us do the same for you — completely free."
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Services", to: "/services" },
        { label: "University Applications" },
      ]}
    />

    {/* The Challenge */}
    <section className="bg-background">
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">The Challenge</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Applying to universities abroad is complex — different countries have different requirements, deadlines vary by institution, and a single mistake on your application can cost you months. Most students don't know where to start, and even fewer have access to someone who can guide them through it properly.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm mt-3">
            That's where we come in. With thousands of successful applications under our belt, we know exactly what admissions teams are looking for — and how to position your application for success.
          </p>
        </motion.div>
      </div>
    </section>

    <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

    {/* Our Process — Vertical Timeline */}
    <section className="bg-background">
      <div className="container py-12">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">Our Process</h2>
        <div className="max-w-2xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4 relative"
            >
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, hsl(169 63% 47%), hsl(169 63% 40%))" }}>
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-secondary/20 mt-1" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-bold text-foreground text-base">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

    {/* What's Included */}
    <section className="bg-background">
      <div className="container py-12">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">What's Included</h2>
        <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-3">
          {included.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="flex items-start gap-3 bg-card rounded-lg p-3 border border-border"
            >
              <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="text-secondary" size={12} />
              </div>
              <span className="text-sm text-foreground">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <OtherServices currentPath="/services/university-applications" />
    <ServiceCTA label="Book a Free Consultation →" />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default UniversityApplications;
