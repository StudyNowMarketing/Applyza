import { useState } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/ServiceHero";
import ServiceCTA from "@/components/ServiceCTA";
import OtherServices from "@/components/OtherServices";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, ChevronDown, Home, MapPin, Clock, Banknote,
  ShieldCheck, Navigation, PiggyBank, Search, MessageSquare,
  Eye, FileText, HeartHandshake,
} from "lucide-react";

const stats = [
  { value: "3,000+", label: "Students Housed" },
  { value: "15+", label: "Cities Covered" },
  { value: "48hr", label: "Response Time" },
  { value: "Free", label: "No Fees" },
];

const steps = [
  { title: "Share Your Preferences", desc: "Tell us your university, budget, move-in date, and any requirements — private room, en-suite, proximity to campus, flatmate preferences. The more you share, the better we can match." },
  { title: "Options Shortlist", desc: "We put together a shortlist of accommodation options that match your criteria — university halls, purpose-built student housing, and vetted private rentals near campus." },
  { title: "Virtual Tours & Research", desc: "Where available, we arrange virtual walkthroughs and share detailed neighbourhood research — transport links, safety, local amenities — so you can make an informed choice from home." },
  { title: "Contracts & Deposit Guidance", desc: "Before you sign anything, we review the tenancy agreement with you, flag anything unusual, and advise on your rights and responsibilities as a tenant in that country." },
  { title: "Post-Arrival Check-In", desc: "We follow up once you've arrived to make sure everything is as expected and support you through any teething issues with your accommodation." },
];

const included = [
  "Guidance on university-managed accommodation",
  "Help with private housing searches near campus",
  "Advice on contracts, deposits, and tenancy rights",
  "Support with roommate matching preferences",
  "Safety and neighbourhood research",
  "Pre-arrival virtual tours and walkthroughs",
  "Post-arrival check-in and adjustment support",
  "Budget planning and cost comparison",
];

const whyItMatters = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    desc: "We only recommend accommodation that meets our basic safety standards. We research neighbourhoods, verify landlords where possible, and flag anything that concerns us.",
  },
  {
    icon: Navigation,
    title: "Near Your Campus",
    desc: "Long commutes add stress and cost to student life. We prioritise options within reasonable distance of your university, so your daily routine stays manageable.",
  },
  {
    icon: PiggyBank,
    title: "Honest on Cost",
    desc: "We'll give you a realistic picture of what accommodation costs in your chosen city — including hidden costs like utility bills, deposits, and transport — so you can budget properly.",
  },
];

const faqs = [
  {
    q: "When should I start looking for accommodation?",
    a: "As early as possible — ideally 3–6 months before your course starts. University halls in particular fill up quickly, and popular private student housing near campus can go even faster. We'll advise you on the right timeline for your specific city and university.",
  },
  {
    q: "Is university accommodation always the best option?",
    a: "Not necessarily. University halls are convenient for first-year students but can be more expensive than private housing. We'll help you compare all your options objectively based on your budget, lifestyle preferences, and what's actually available.",
  },
  {
    q: "What if I have a problem with my landlord after moving in?",
    a: "We'll advise you on your tenant rights in that country and help you understand your options. While we're not a legal service, we can help you navigate disputes and point you to the right resources.",
  },
  {
    q: "Is accommodation support free?",
    a: "Yes, completely free. Just like all our services, accommodation guidance costs you nothing. We never charge students for accommodation guidance — it's part of our free end-to-end service.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://applyza.com" },
    { "@type": "ListItem", "position": 2, "name": "Our Services", "item": "https://applyza.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Accommodation Support", "item": "https://applyza.com/services/accommodation" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Student Accommodation Support",
  "description": "Find safe, affordable accommodation near your university. Housing guidance and support from Applyza — completely free.",
  "provider": { "@type": "Organization", "name": "Applyza", "url": "https://applyza.com" },
  "areaServed": "Worldwide",
  "audience": { "@type": "Audience", "audienceType": "International Students" },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP", "description": "Completely free for students" },
  "url": "https://applyza.com/services/accommodation",
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

const Accommodation = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <SEO
        title="Student Accommodation Support | Find Safe Housing Abroad | Applyza"
        description="Find safe, affordable accommodation near your university. Free housing guidance — university halls, private rentals, contracts, and post-arrival support."
        path="/services/accommodation"
        jsonLd={[breadcrumbSchema, serviceSchema, faqSchema]}
      />
      <Navbar />
      <ServiceHero
        badge="Free Accommodation Support"
        heading="Find Safe, Affordable Housing Near Your University"
        subtext="Moving abroad is exciting. Finding somewhere to live shouldn't be the hard part. Our accommodation team helps you navigate every option — university halls to private rentals — so you arrive feeling settled, not stressed."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: "Accommodation" },
        ]}
        ctaPrimary={{ label: "Get Accommodation Help", to: "/book-a-consultation" }}
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

      {/* How We Help */}
      <section className="bg-background">
        <div className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto border-l-4 border-secondary pl-6"
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">The Reality of Student Housing</h2>
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">
              For many international students, finding accommodation is one of the most stressful parts of the move — especially when you're searching from thousands of miles away, without local knowledge, and under time pressure.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Our accommodation support team has helped thousands of students find housing across 15+ cities worldwide. We know what to look for, what to avoid, and how to get you settled before you even board the plane.
            </p>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* Our Process */}
      <section className="bg-background">
        <div className="container py-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">How We Help You Find Housing</h2>
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
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
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

      {/* Why It Matters */}
      <section className="bg-background">
        <div className="container py-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-2">What We Prioritise</h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-md mx-auto">
            Good accommodation isn't just about having a bed. It shapes your whole experience.
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {whyItMatters.map((item, i) => (
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

      <OtherServices currentPath="/services/accommodation" />
      <ServiceCTA label="Get Free Accommodation Support" />
      <Footer />
    </div>
  );
};

export default Accommodation;
