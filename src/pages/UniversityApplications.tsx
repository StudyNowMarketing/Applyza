import { useState } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/ServiceHero";
import ServiceCTA from "@/components/ServiceCTA";
import OtherServices from "@/components/OtherServices";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare, Brain, FileText, Send, BarChart3, ArrowRight,
  Check, Award, Building2, Percent, Banknote, ChevronDown,
  ShieldCheck, Cpu, ClipboardList,
} from "lucide-react";

const stats = [
  { icon: ClipboardList, value: "5,000+", label: "Applications Managed" },
  { icon: Percent, value: "95%", label: "Offer Rate" },
  { icon: Building2, value: "200+", label: "Partner Universities" },
  { icon: Banknote, value: "Free", label: "No Hidden Fees" },
];

const steps = [
  { title: "Consultation", desc: "We learn about your academic background, goals, budget, and career ambitions — and use that to build a clear picture of the best options for you." },
  { title: "Course Matching", desc: "Our counsellors recommend programmes across 200+ universities where your profile gives you the strongest chance of an offer." },
  { title: "Application Preparation", desc: "We guide you through every document — personal statement, references, transcripts — and review everything before it leaves your hands." },
  { title: "Submission & Tracking", desc: "We submit your application directly and keep you updated with status changes from admissions teams in real time." },
  { title: "Offer Management", desc: "When offers arrive, we help you compare them — fees, rankings, location, career outcomes — so you can make a confident decision." },
  { title: "Handover to Visa Team", desc: "Once you've accepted an offer, we introduce you to our visa team who takes over and handles the next stage seamlessly." },
];

const included = [
  "One-on-one consultation with a certified counsellor",
  "AI-powered course and university matching",
  "Personal statement writing guidance and review",
  "Full application management and submission",
  "Document preparation and compliance check",
  "Direct liaison with admissions offices",
  "Offer tracking and comparison support",
  "Seamless handover to visa team",
];

const whyApplyza = [
  {
    icon: Award,
    title: "Certified International Advisors",
    desc: "Our counsellors hold internationally recognised certifications in student advising and adhere to the National Code of Ethical Practice for Education Agents. You're in trained, accountable hands.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Course Matching",
    desc: "We combine counsellor expertise with intelligent matching to find programmes where your academic profile genuinely fits — not just where vacancies exist.",
  },
  {
    icon: ShieldCheck,
    title: "End-to-End Management",
    desc: "We don't hand you a list and wish you luck. We manage every step — from your first conversation to your conditional offer — with nothing falling through the cracks.",
  },
];

const faqs = [
  {
    q: "How do I apply to a UK university as an international student?",
    a: "Most UK undergraduate applications go through UCAS, while postgraduate applications are often made directly to the university. Applyza guides you through the right route for your programme — managing every stage from choosing eligible courses to responding to offers.",
  },
  {
    q: "How long does the application process take?",
    a: "Timelines vary by institution and programme. For UK universities, UCAS typically closes in January for September entry. We recommend starting your consultation at least 6–9 months before your target intake to give your application the strongest chance.",
  },
  {
    q: "What if I get rejected?",
    a: "Rejections happen, even to strong candidates. We'll review what happened, identify alternative options, and help you reapply or pivot to a programme that's a better fit — at no additional cost.",
  },
  {
    q: "Is university application help really free?",
    a: "Yes, completely. Our service is completely free. You will never be asked to pay a fee — not at the start, not at any stage.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://applyza.com" },
    { "@type": "ListItem", "position": 2, "name": "Our Services", "item": "https://applyza.com/services" },
    { "@type": "ListItem", "position": 3, "name": "University Applications", "item": "https://applyza.com/services/university-applications" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "University Application Support",
  "description": "Free university application support — course matching, document preparation, personal statement guidance, and offer management. Expert help, zero cost.",
  "provider": { "@type": "Organization", "name": "Applyza", "url": "https://applyza.com" },
  "areaServed": "Worldwide",
  "audience": { "@type": "Audience", "audienceType": "International Students" },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP", "description": "Completely free for students" },
  "url": "https://applyza.com/services/university-applications",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

const Divider = () => (
  <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />
);

const UniversityApplications = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <SEO
        title="University Application Support for International Students | Applyza"
        description="Free university application support — course matching, document preparation, personal statement guidance, and offer management. Expert help, zero cost."
        path="/services/university-applications"
        jsonLd={[breadcrumbSchema, serviceSchema, faqSchema]}
      />
      <Navbar />
      <ServiceHero
        badge="Free University Application Service"
        heading="University Application Support for International Students"
        subtext="We've helped thousands of students secure offers at top universities across the UK and Europe. Let us manage your entire application — from first consultation to offer acceptance. Completely free."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: "University Applications" },
        ]}
        ctaPrimary={{ label: "Book a Free Consultation", to: "/book-a-consultation" }}
        ctaSecondary={{ label: "View Our Services", to: "/services" }}
      />

      {/* Stats Strip */}
      <section style={{ background: "#0f1230" }}>
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
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

      {/* The Challenge */}
      <section className="bg-background">
        <div className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto border-l-4 border-secondary pl-6"
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">
              Applying to universities abroad is genuinely complex. Different countries have different application systems, deadlines vary by institution, personal statements need to be precisely calibrated, and a single oversight can set you back an entire intake cycle.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Most students navigate this alone, relying on incomplete online information. We exist to change that — bringing expert guidance, direct admissions relationships, and end-to-end support to every student we work with, regardless of their budget.
            </p>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* Our Process */}
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
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 text-white text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, hsl(169 63% 47%), hsl(169 63% 40%))" }}
                  >
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-secondary/20 mt-1" />}
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

      <Divider />

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
                className="flex items-start gap-3 bg-card rounded-lg p-3 border border-border card-glow"
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

      <Divider />

      {/* Why Applyza */}
      <section className="bg-background">
        <div className="container py-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-2">Why Applyza?</h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-lg mx-auto">
            There are many consultancies. Here's what sets us apart.
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {whyApplyza.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-all duration-300 card-glow text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="text-secondary" size={18} />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1.5">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* FAQ */}
      <section className="bg-background">
        <div className="container py-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="border border-border rounded-xl overflow-hidden bg-card"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                >
                  <span className="font-semibold text-foreground text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className="text-muted-foreground shrink-0 transition-transform duration-200"
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <OtherServices currentPath="/services/university-applications" />
      <ServiceCTA label="Start Your Application — Free" />
      <Footer />
    </div>
  );
};

export default UniversityApplications;
