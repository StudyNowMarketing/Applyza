import { useState } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/ServiceHero";
import ServiceCTA from "@/components/ServiceCTA";
import OtherServices from "@/components/OtherServices";
import GenuineStudentBanner from "@/components/GenuineStudentBanner";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck, FileText, Wallet, FileCheck, MessageCircle, HeartHandshake,
  AlertTriangle, ChevronDown, TrendingUp, Globe, BadgeCheck, Banknote,
  ShieldCheck, BookOpen, PhoneCall,
} from "lucide-react";

const stats = [
  { value: "99%", label: "Visa Success Rate" },
  { value: "5,000+", label: "Visas Processed" },
  { value: "8+", label: "Destinations Covered" },
  { value: "£0", label: "Hidden Fees" },
];

const destinations = [
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇫🇷", name: "France" },
  { flag: "🇮🇪", name: "Ireland" },
  { flag: "🇲🇹", name: "Malta" },
  { flag: "🇳🇱", name: "Netherlands" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇺🇸", name: "USA" },
];

const steps = [
  { title: "Eligibility Check", desc: "We assess your full profile — academic background, finances, ties to home country — and confirm whether you're ready to apply or identify gaps to address first." },
  { title: "Document Preparation", desc: "We produce a personalised checklist and guide you through gathering every required document — from bank statements to offer letters to translation requirements." },
  { title: "Financial Evidence Guidance", desc: "We advise on exactly how to present your funding evidence, which formats are acceptable, and how to avoid the most common financial refusal triggers." },
  { title: "Application Completion", desc: "We prepare and review your full visa application before submission — ensuring nothing is missing, incorrect, or inconsistently stated across documents." },
  { title: "Interview Preparation", desc: "Where required, we run mock interviews with real questions, coach you on how to answer confidently, and help you anticipate what immigration officers are looking for." },
  { title: "Post-Decision Support", desc: "Whether your visa is approved or refused, we're with you. We help you understand the decision, explore next steps, and — if needed — build a stronger reapplication." },
];

const refusalReasons = [
  { title: "Insufficient Financial Evidence", desc: "Failing to demonstrate you can fund your tuition and living costs is one of the most common refusal reasons. Presentation matters as much as the amount." },
  { title: "Inconsistent or Incomplete Documents", desc: "Missing documents, incorrect translations, or mismatched information across your application can raise immediate red flags with caseworkers." },
  { title: "Weak Ties to Home Country", desc: "If the embassy isn't convinced you intend to return after your studies, your application may be refused — regardless of your academic credentials." },
  { title: "Poor Interview Performance", desc: "Vague, nervous, or inconsistent answers in your visa interview can undermine an otherwise strong application. Preparation is everything." },
];

const whyApplyza = [
  {
    icon: TrendingUp,
    title: "Proven 99% Success Rate",
    desc: "Our success rate isn't luck — it's the result of thorough eligibility screening, meticulous document preparation, and refusing to submit applications that aren't ready.",
  },
  {
    icon: ShieldCheck,
    title: "UKVI Compliance Expertise",
    desc: "Our team stays current with immigration policy changes so your application always meets the latest Home Office requirements, not last year's guidance.",
  },
  {
    icon: HeartHandshake,
    title: "With You Whatever the Outcome",
    desc: "Most consultancies disappear after a refusal. We don't. We analyse what went wrong, help you appeal or reapply, and stay with you until you get the outcome you deserve.",
  },
];

const faqs = [
  {
    q: "How long does a UK student visa take to process?",
    a: "UK student visa applications typically take 3–4 weeks if submitted from outside the UK. You can apply up to 6 months before your course starts. We'll advise you on the ideal submission window based on your specific situation.",
  },
  {
    q: "What documents do I need for a student visa?",
    a: "Requirements vary by destination, but typically include your Confirmation of Acceptance for Studies (CAS), financial evidence showing sufficient funds, your passport, academic transcripts, and English language test results. We'll give you a personalised checklist.",
  },
  {
    q: "What if my visa is refused?",
    a: "A refusal isn't the end. We'll carefully review the refusal letter, identify the reason, and advise on whether to appeal or reapply. Many of our students have successfully obtained visas after an initial refusal when we've addressed the underlying issue.",
  },
  {
    q: "Is visa support really free?",
    a: "Yes, completely free — no upfront fees, no success fees, no hidden charges at any stage.",
  },
  {
    q: "Can you help with dependent visas?",
    a: "Yes. If you plan to bring a partner or children, we can provide guidance on dependent visa requirements alongside your own student visa application.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://applyza.com" },
    { "@type": "ListItem", "position": 2, "name": "Our Services", "item": "https://applyza.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Visa Support", "item": "https://applyza.com/services/visa-immigration" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Student Visa Support",
  "description": "Expert student visa application support with a 99% success rate. Free document preparation, financial evidence guidance, and compliance support for UK, Germany, France and more.",
  "provider": { "@type": "Organization", "name": "Applyza", "url": "https://applyza.com" },
  "areaServed": "Worldwide",
  "audience": { "@type": "Audience", "audienceType": "International Students" },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP", "description": "Completely free for students" },
  "url": "https://applyza.com/services/visa-immigration",
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

const VisaImmigration = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <SEO
        title="Student Visa Support | 99% Success Rate | Free Help | Applyza"
        description="Expert student visa application support with a 99% success rate. Free document preparation, financial evidence guidance, and compliance support for UK, Germany, France and more."
        path="/services/visa-immigration"
        jsonLd={[breadcrumbSchema, serviceSchema, faqSchema]}
      />
      <Navbar />
      <ServiceHero
        badge="99% Visa Success Rate"
        heading="Student Visa Support — Expert Guidance, Zero Stress"
        subtext="Our compliance team handles every aspect of your student visa application — eligibility, documents, financials, interview prep. Thousands of approvals. No hidden fees. Ever."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: "Student Visa Applications" },
        ]}
        ctaPrimary={{ label: "Book a Free Visa Consultation", to: "/book-a-consultation" }}
        ctaSecondary={{ label: "All Services", to: "/services" }}
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

      {/* Important Information */}
      <section className="bg-background">
        <div className="container py-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="text-amber-600" size={16} />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground mb-1">Important Information</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Applyza only supports visa applications for students with a genuine intention to study who meet the academic and financial requirements of their chosen programme. We provide guidance based on publicly available information and professional experience — we are not immigration lawyers and do not provide legal advice. All visa decisions are made solely by UK Visas and Immigration (UKVI) or the relevant immigration authority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Destinations */}
      <section className="bg-background">
        <div className="container py-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-2">Destinations We Cover</h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-md mx-auto">
            Student visa requirements differ significantly by country. We know each one in detail.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl mx-auto">
            {destinations.map((d) => (
              <motion.span
                key={d.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-sm text-sm font-semibold text-foreground border border-border"
              >
                <span className="text-base">{d.flag}</span> {d.name}
              </motion.span>
            ))}
          </div>
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

      {/* Why Applyza */}
      <section className="bg-background">
        <div className="container py-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">Why Our Success Rate Is 99%</h2>
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

      {/* Common Refusal Reasons */}
      <section className="bg-background">
        <div className="container py-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-2">Why Visas Get Refused</h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-md mx-auto">
            Understanding the most common refusal reasons is the first step to avoiding them.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {refusalReasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card rounded-xl p-5 shadow-sm border border-destructive/10 hover:shadow-md transition-all duration-300 card-glow"
              >
                <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center mb-3">
                  <AlertTriangle className="text-destructive" size={14} />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1.5">{r.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
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

      <OtherServices currentPath="/services/visa-immigration" />
      <div className="container max-w-3xl">
        <GenuineStudentBanner />
      </div>
      <ServiceCTA label="Book a Free Visa Consultation" />
      <Footer />
    </div>
  );
};

export default VisaImmigration;
