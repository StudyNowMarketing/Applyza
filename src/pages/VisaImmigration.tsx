import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceHero from "@/components/ServiceHero";
import ServiceCTA from "@/components/ServiceCTA";
import OtherServices from "@/components/OtherServices";
import GenuineStudentBanner from "@/components/GenuineStudentBanner";
import { motion } from "framer-motion";
import { ClipboardCheck, FileText, Wallet, FileCheck, MessageCircle, HeartHandshake, AlertTriangle } from "lucide-react";

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
  { icon: ClipboardCheck, title: "Eligibility Check", desc: "We assess your profile to confirm you meet the visa requirements for your chosen destination." },
  { icon: FileText, title: "Document Preparation", desc: "We guide you through gathering and organising every required document — from bank statements to offer letters." },
  { icon: Wallet, title: "Financial Guidance", desc: "We advise you on the financial requirements and help you present your funding evidence clearly." },
  { icon: FileCheck, title: "Application Support", desc: "We prepare your visa application with precision, ensuring nothing is missed or incorrectly completed." },
  { icon: MessageCircle, title: "Interview Prep", desc: "We coach you for your visa interview so you feel confident and prepared to answer any question." },
  { icon: HeartHandshake, title: "Post-Decision Support", desc: "Whether approved or refused, we're with you — helping with next steps, appeals, or reapplication strategies." },
];

const refusalReasons = [
  { title: "Insufficient Financial Evidence", desc: "Failing to demonstrate that you can fund your tuition and living costs is one of the most common reasons for refusal." },
  { title: "Inconsistent or Incomplete Documents", desc: "Missing documents, incorrect translations, or mismatched information can raise red flags with immigration officers." },
  { title: "Weak Ties to Home Country", desc: "If the embassy isn't convinced you intend to return home after your studies, your application may be denied." },
  { title: "Poor Interview Performance", desc: "Vague or inconsistent answers during your visa interview can undermine an otherwise strong application." },
];

const VisaImmigration = () => (
  <div className="min-h-screen">
    <SEO title="Visa & Immigration Support | 99% Success Rate | Applyza" description="Expert visa application support with a 99% success rate. Document preparation, financial guidance, and compliance support." path="/services/visa-immigration" />
    <Navbar />
    <ServiceHero
      heading="99% Success Rate. Every Application, Every Time."
      subtext="Visa applications are stressful. They don't have to be. Our compliance experts have the experience and attention to detail to give your application the best possible chance."
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Services", to: "/services" },
        { label: "Visa & Immigration" },
      ]}
    />

    {/* Important Information */}
    <section className="bg-background">
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="text-amber-600" size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground mb-1">Important Information</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Applyza only supports visa applications for students who have a genuine intention to study and who meet the academic and financial requirements of their chosen programme. We provide guidance based on publicly available information and our professional experience — we are not immigration lawyers and do not provide legal advice. All visa decisions are made solely by UK Visas and Immigration (UKVI) or the relevant immigration authority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

    {/* Destinations We Cover */}
    <section className="bg-background">
      <div className="container py-12">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">Destinations We Cover</h2>
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

    {/* Common Reasons for Refusal */}
    <section className="bg-background">
      <div className="container py-12">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">Common Reasons for Visa Refusal</h2>
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {refusalReasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card rounded-xl p-5 shadow-sm border border-destructive/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
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

    <OtherServices currentPath="/services/visa-immigration" />
    <div className="container max-w-3xl">
      <GenuineStudentBanner />
    </div>
    <ServiceCTA label="Book a Free Visa Consultation →" />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default VisaImmigration;
