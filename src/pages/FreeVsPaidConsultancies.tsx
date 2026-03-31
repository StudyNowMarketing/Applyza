import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, CircleDollarSign, BadgeCheck, ShieldAlert, ListChecks } from "lucide-react";
import { Link } from "react-router-dom";

/* ── Schema ── */
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://applyza.com" },
    { "@type": "ListItem", position: 2, name: "Study Abroad Advice", item: "https://applyza.com/blog" },
    { "@type": "ListItem", position: 3, name: "Free vs Paid Consultancies", item: "https://applyza.com/free-vs-paid-study-abroad-consultancies" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do study abroad consultancies charge fees?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some do and some don't. Many certified education consultancies operate under a university partnership model — which means the service is funded through institutional partnerships rather than student fees. Some consultancies still charge students directly on top of this. Under the standard model for certified consultancies, there is no reason for a student to pay.",
      },
    },
    {
      "@type": "Question",
      name: "Why is Applyza free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Applyza works in partnership with universities to provide its service at no cost to students. This is the standard model for internationally certified education consultancies. We never charge students — not for consultations, applications, visa support, or accommodation guidance.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to use a free study abroad consultancy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — provided the consultancy is certified by a recognised international education body or professional quality framework. A certified consultancy being free is not a red flag; it is the standard operating model. The risk lies in using unregulated agents who lack professional oversight, not in using free services that operate transparently.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a free and paid study abroad consultancy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The core difference is not service quality — it is who pays. Some consultancies charge students directly; others operate under a partnership model that allows them to offer the service for free. A genuinely free consultancy service should include initial consultation, course matching, application preparation, visa support, and accommodation guidance — all at no cost to the student.",
      },
    },
  ],
};

/* ── Content data ── */
const sections = [
  {
    number: "01",
    icon: CircleDollarSign,
    accent: "#2EC4B6",
    heading: "How education consultancies earn money",
    body: "Many certified education consultancies operate under a university partnership model — meaning the cost of the service is covered through institutional partnerships, not by students. Under this model, there is no reason for a student to pay consultancy fees. The service is funded through the consultancy's university relationships.",
  },
  {
    number: "02",
    icon: CircleDollarSign,
    accent: "#8B5CF6",
    heading: "Why some consultancies still charge fees",
    body: "Some consultancies charge students directly for their services. They may argue their fees reflect a premium service level, and in some cases this may be true. But it is worth asking: what specifically do the fees cover that a free service does not? And does paying upfront change the consultancy's incentives in any way?",
  },
  {
    number: "03",
    icon: ListChecks,
    accent: "#2EC4B6",
    heading: "What \"free\" should actually include",
    body: "A genuinely free consultancy service should cover: initial consultation and eligibility assessment, AI-powered course matching, personal statement guidance, full application preparation and submission, university offer management, visa application support and documentation, and accommodation guidance. If any of these are behind a paid tier, they are not a free service.",
  },
  {
    number: "04",
    icon: ShieldAlert,
    accent: "#8B5CF6",
    heading: "What to watch out for",
    body: "The risk of 'free' services from unregulated agents is real — particularly in markets like Nigeria, Ghana, Kenya, and Egypt where unregistered agents operate without quality standards. The answer is not to pay fees; it is to verify certification. Certified agents (regulated by internationally recognised education bodies) are free for students AND held to strict quality and ethical standards.",
  },
];

const checklist = [
  "No invoice at any stage — not for consultation, applications, or visas",
  "Certification from a recognised international education body you can verify independently",
  "Named counsellors with contactable details",
  "Published visa success rate",
  "Physical office presence in your region",
];

/* ── Page ── */
const FreeVsPaidConsultancies = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Free vs Paid Study Abroad Consultancies — Do You Need to Pay?"
        description="Some study abroad consultancies charge hundreds of pounds. Others are completely free. Here's why — and what it means for you as a student."
        path="/free-vs-paid-study-abroad-consultancies"
        jsonLd={[breadcrumbSchema, faqSchema]}
      />
      <Navbar solid />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
        <SparklesCore
          className="absolute inset-0 z-[1]"
          background="transparent"
          particleColor="#8B5CF6"
          particleDensity={50}
          minSize={0.4}
          maxSize={1.4}
          speed={1.2}
        />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[120px]" style={{ background: "hsl(169 63% 47%)" }} />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-[100px]" style={{ background: "hsl(265 44% 44%)" }} />

        <div className="container relative z-10 pt-20 pb-10 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-white/60 transition-colors">Study Abroad Advice</Link>
            <span>/</span>
            <span className="text-white/60">Free vs Paid Consultancies</span>
          </nav>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <span
              className="inline-block text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
              style={{ color: "#8B5CF6", borderColor: "rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.08)" }}
            >
              Student Guide
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6"
          >
            Free vs Paid Study Abroad Consultancies:{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #2EC4B6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Do You Need to Pay for Expert Guidance?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
          >
            If you've been researching study abroad consultancies, you've probably noticed that some charge fees and
            others don't. The difference can be significant — hundreds of pounds in some cases. Before you pay
            anything, it's worth understanding how the industry works and what you're actually entitled to expect
            for free.
          </motion.p>

        </div>
      </section>

      {/* ── FOUR SECTIONS ── */}
      <section className="bg-background py-14 md:py-20">
        <div className="container max-w-3xl mx-auto">
          <div className="space-y-5">
            {sections.map((s, i) => (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-card rounded-xl border border-border p-6 md:p-8 card-glow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-2 shrink-0 pt-0.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}30` }}
                    >
                      <s.icon size={18} style={{ color: s.accent }} />
                    </div>
                    <span className="text-[10px] font-bold tabular-nums" style={{ color: `${s.accent}80` }}>
                      {s.number}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-foreground text-base md:text-lg leading-snug mb-2">
                      {s.heading}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

      {/* ── CHECKLIST ── */}
      <section className="bg-background py-14 md:py-20">
        <div className="container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span
              className="inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4"
              style={{ color: "#2EC4B6", background: "rgba(46,196,182,0.08)" }}
            >
              Checklist
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Signs You're Getting a Genuine Free Service
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Use this before committing to any consultancy — free or paid.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-6 md:p-8"
          >
            <ul className="space-y-4">
              {checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "#2EC4B6" }} />
                  <span className="text-foreground text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

      {/* ── WHY APPLYZA ── */}
      <section className="bg-background py-14 md:py-20">
        <div className="container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4"
              style={{ color: "#8B5CF6", background: "hsl(265 44% 44% / 0.1)" }}
            >
              About Applyza
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
              Applyza: Professionally Certified and Free at Every Stage
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Applyza works in partnership with universities to deliver its service at no cost to students. This
              is the standard partnership model — it means our guidance, your application, and your visa
              support are completely free. No invoices. No hidden tiers. No fees at any stage.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { icon: BadgeCheck, label: "Professionally Certified", detail: "Our counsellors hold internationally recognised education advising certifications." },
                { icon: CheckCircle2, label: "100% Free", detail: "No fees for consultation, applications, or visas." },
                { icon: CheckCircle2, label: "99% Visa Success Rate", detail: "Published and verifiable." },
                { icon: CheckCircle2, label: "6 Global Offices", detail: "Local presence in your home market." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-card rounded-xl border border-border p-4 card-glow">
                  <item.icon size={16} className="shrink-0 mt-0.5" style={{ color: "#2EC4B6" }} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Learn more on our{" "}
              <Link to="/about" className="text-secondary font-semibold hover:underline">
                About page
              </Link>
              , or read our guide on{" "}
              <Link to="/how-to-choose-a-study-abroad-consultancy" className="text-secondary font-semibold hover:underline">
                how to choose a study abroad consultancy
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

      {/* ── RELATED GUIDES ── */}
      <section className="bg-background py-10 md:py-14">
        <div className="container max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Related Guides</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/how-to-choose-a-study-abroad-consultancy"
              className="group flex flex-col gap-1 bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 card-glow"
            >
              <span className="text-sm font-bold text-foreground group-hover:text-secondary transition-colors">How to Choose a Study Abroad Consultancy</span>
              <span className="text-xs text-muted-foreground leading-relaxed">7 questions to ask before you commit to any consultancy.</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, hsl(265 44% 44%), hsl(169 63% 47%))" }}
        />
        <div className="container relative z-10 py-14 text-center max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-bold text-white mb-3"
          >
            Applyza is AQF Certified and completely free for students at every stage.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/80 text-sm mb-7"
          >
            Book a consultation and see the difference.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="rounded-full bg-white text-primary font-bold px-8 hover:bg-white/90 shadow-lg"
              asChild
            >
              <Link to="/book-a-consultation">
                Book a Free Consultation
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FreeVsPaidConsultancies;
