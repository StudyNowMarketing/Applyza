import { useState } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/ServiceHero";
import ServiceCTA from "@/components/ServiceCTA";
import OtherServices from "@/components/OtherServices";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle, Briefcase, Users, Compass,
  Heart, MessageSquare, Target, ChevronDown,
  PhoneCall, Search, Map, CheckCircle, LifeBuoy,
  Award, Globe, Banknote,
} from "lucide-react";

const stats = [
  { value: "10,000+", label: "Students Counselled" },
  { value: "50+", label: "Certified Counsellors" },
  { value: "16", label: "Study Destinations" },
  { value: "Free", label: "Always" },
];

const whoForCards = [
  { icon: HelpCircle, title: "Unsure Students", desc: "Students unsure about what or where to study who need guidance to explore their options without pressure." },
  { icon: Briefcase, title: "Working Professionals", desc: "Professionals considering returning to education to advance or change their career path." },
  { icon: Users, title: "Parents & Guardians", desc: "Parents exploring study abroad options for their child and wanting trusted, impartial expert advice." },
  { icon: Compass, title: "Overwhelmed Applicants", desc: "Anyone feeling overwhelmed by the sheer number of countries, courses, and universities on offer." },
];

const steps = [
  { title: "Discovery Call", desc: "A relaxed, no-pressure conversation where we get to know you — your background, interests, goals, and any concerns you have about studying abroad." },
  { title: "Profile Assessment", desc: "We review your academic history, qualifications, and any test scores to understand what's possible and identify the strongest pathway for your profile." },
  { title: "Options Mapping", desc: "We map out your options across destinations, subject areas, and university types — presenting a shortlist that genuinely fits your goals and budget." },
  { title: "Informed Recommendation", desc: "We give you our honest recommendation — based entirely on what we believe gives you the best chance of a fulfilling study experience." },
  { title: "Ongoing Support", desc: "You can return with questions at any point. Our counsellors stay available as your thinking evolves and your decision becomes clearer." },
];

const differentiators = [
  {
    icon: Heart,
    title: "No Pressure, Ever",
    desc: "We don't push you toward any university or programme. Our job is to help you make a decision that's right for you — even if that means taking more time or waiting a cycle.",
  },
  {
    icon: MessageSquare,
    title: "Honest Conversations",
    desc: "We'll tell you what you need to hear, not just what you want to hear. That honesty — even when it's uncomfortable — is what makes our guidance genuinely valuable.",
  },
  {
    icon: Target,
    title: "Tailored Recommendations",
    desc: "We don't give generic advice. Every recommendation is based on your specific academic profile, career goals, financial situation, and personal preferences.",
  },
];

const faqs = [
  {
    q: "What's the difference between counselling and applying?",
    a: "Counselling comes first. It's the stage where we help you figure out what to study, where, and why — before any applications are submitted. Once you have clarity and a shortlist, we then move into the application process. Both services are free.",
  },
  {
    q: "How long does a counselling session last?",
    a: "Initial discovery sessions typically run 30–45 minutes. Follow-up sessions are usually shorter and more focused. There's no limit on the number of sessions — we'll keep meeting with you until you feel confident in your decision.",
  },
  {
    q: "Can I get counselling even if I'm not sure I want to study abroad?",
    a: "Absolutely. Many students come to us still weighing up whether studying abroad is right for them at all. We'll give you an honest picture — including the challenges — so you can make an informed decision, whatever it turns out to be.",
  },
  {
    q: "Is there a cost for counselling?",
    a: "No. Our counselling service is completely free — just like all our other services. There's no fee at any stage.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://applyza.com" },
    { "@type": "ListItem", "position": 2, "name": "Our Services", "item": "https://applyza.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Student Counselling", "item": "https://applyza.com/services/student-counselling" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "International Student Counselling",
  "description": "Not sure what or where to study? Our certified counsellors provide honest, personalised guidance — completely free.",
  "provider": { "@type": "Organization", "name": "Applyza", "url": "https://applyza.com" },
  "areaServed": "Worldwide",
  "audience": { "@type": "Audience", "audienceType": "International Students" },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP", "description": "Completely free for students" },
  "url": "https://applyza.com/services/student-counselling",
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

const StudentCounselling = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <SEO
        title="Student Counselling | Free Academic Guidance | Applyza"
        description="Not sure what or where to study? Our certified counsellors provide honest, personalised guidance — completely free."
        path="/services/student-counselling"
        jsonLd={[breadcrumbSchema, serviceSchema, faqSchema]}
      />
      <Navbar />
      <ServiceHero
        badge="Free Student Counselling"
        heading="Find the Right Path — With Honest Guidance, Zero Pressure"
        subtext="Not sure what or where to study? Our certified counsellors help you explore your options at your own pace — from choosing a subject to mapping out your whole study abroad journey. No pressure, no agenda, no cost."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: "Student Counselling" },
        ]}
        ctaPrimary={{ label: "Book a Free Counselling Session", to: "/book-a-consultation" }}
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

      {/* Who This Is For */}
      <section className="bg-background">
        <div className="container py-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-2">Who This Is For</h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-md mx-auto">
            You don't need to have everything figured out to book a session. That's exactly what we're here for.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whoForCards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-border card-glow"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-3">
                  <c.icon className="text-secondary" size={18} />
                </div>
                <h3 className="font-bold text-foreground text-base mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Our Process */}
      <section className="bg-background">
        <div className="container py-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">How Our Counselling Works</h2>
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

      {/* What Makes Our Counselling Different */}
      <section className="bg-background">
        <div className="container py-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">What Makes Our Counselling Different</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-xl p-5 shadow-sm text-center border border-border hover:shadow-md transition-all duration-300 card-glow"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                  <d.icon className="text-secondary" size={18} />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1.5">{d.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
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

      <OtherServices currentPath="/services/student-counselling" />
      <ServiceCTA label="Book a Free Counselling Session" />
      <Footer />
    </div>
  );
};

export default StudentCounselling;
