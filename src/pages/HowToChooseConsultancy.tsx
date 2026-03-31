import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, BadgeCheck, Building2, Cpu, FileCheck, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* ── Schema ── */
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://applyza.com" },
    { "@type": "ListItem", position: 2, name: "Study Abroad Advice", item: "https://applyza.com/blog" },
    { "@type": "ListItem", position: 3, name: "How to Choose a Consultancy", item: "https://applyza.com/how-to-choose-a-study-abroad-consultancy" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I know if a study abroad consultancy is legitimate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Check whether the consultancy is regulated by a recognised international education quality framework or professional body. Legitimate consultancies will have a physical office, named counsellors with verifiable credentials, a published visa success rate, and a transparent explanation of how their free service is funded. Be cautious of any agent who cannot answer these questions clearly.",
      },
    },
    {
      "@type": "Question",
      name: "Should I pay a study abroad consultancy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Applyza's service is completely free for students at every stage — consultations, applications, and visa support are all included at no cost. If any consultancy asks you to pay fees, ask specifically what those fees are for and whether the level of service genuinely justifies the charge.",
      },
    },
    {
      "@type": "Question",
      name: "What certifications should a legitimate education consultancy have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A legitimate education consultancy should hold certifications from recognised international education bodies such as the British Council, Universities UK International, or regional equivalents. These bodies set ethical and quality standards for international student advising. Always ask to see proof of certification and verify it independently.",
      },
    },
    {
      "@type": "Question",
      name: "What visa success rate should I expect from a good consultancy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good consultancy should be able to share its visa success rate openly. While no ethical agent can guarantee a visa outcome, a well-run consultancy with experienced compliance staff should achieve consistently high success rates. Applyza publishes its 99% visa success rate. If a consultancy cannot tell you their rate, or is vague about their visa process, treat this as a warning sign.",
      },
    },
  ],
};

/* ── Content data ── */
const questions = [
  {
    number: "01",
    icon: BadgeCheck,
    accent: "#2EC4B6",
    question: "Are they certified by a recognised international education body?",
    answer:
      "Reputable education consultancies are certified by recognised international education bodies that set ethical and quality standards. Always ask to see proof of certification and verify it independently. Applyza's counsellors hold professional certifications in international student advising.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    accent: "#8B5CF6",
    question: "Is the service genuinely free — and if so, how do they earn?",
    answer:
      "A reputable consultancy's service should be completely free for students. If a consultancy charges you fees, ask specifically what those fees cover and whether the service level justifies them. Applyza's service is completely free at every stage.",
  },
  {
    number: "03",
    icon: FileCheck,
    accent: "#2EC4B6",
    question: "What is their visa success rate — and will they tell you?",
    answer:
      "Any consultancy serious about its work should be able to tell you its visa success rate. If they cannot or will not, that tells you something. Applyza publishes its 99% visa success rate because we believe you have the right to this information before you commit.",
  },
  {
    number: "04",
    icon: Building2,
    accent: "#8B5CF6",
    question: "Do they have a physical office you can visit?",
    answer:
      "Local offices matter — especially for students in Nigeria, Ghana, Kenya, Egypt, UAE, Kuwait, Türkiye, and Eastern Europe. A physical presence means accountability, face-to-face meetings, and a local team who understands your market. Applyza has offices in Lagos, Accra, Nairobi, Doha, and Istanbul.",
  },
  {
    number: "05",
    icon: Cpu,
    accent: "#2EC4B6",
    question: "Do they use technology to match you to courses you're actually eligible for?",
    answer:
      "Many consultancies operate like a travel agent — they show you a catalogue and let you choose. A better approach uses AI-powered eligibility matching: you input your academic background and the system surfaces only the programmes you genuinely qualify for. This saves time and dramatically improves your chances of acceptance.",
  },
  {
    number: "06",
    icon: ShieldCheck,
    accent: "#8B5CF6",
    question: "Will they support you through the visa process — not just the application?",
    answer:
      "Getting into a university is only half the journey. The visa application is where many students encounter problems. Ask specifically whether visa guidance is included, what their process is, and who handles your visa documentation.",
  },
  {
    number: "07",
    icon: Users,
    accent: "#2EC4B6",
    question: "Are their counsellors named, qualified, and contactable?",
    answer:
      "You should be able to find out who will be advising you before you commit. Named, qualified counsellors with published backgrounds are a sign of a transparent, accountable organisation. Be cautious of consultancies where 'the team' is entirely anonymous.",
  },
];

const checklist = [
  "Certified by a recognised international education body",
  "Service is free for students (no consultancy or application fees)",
  "Published visa success rate",
  "Physical office in or near your home country",
  "AI-powered or eligibility-based course matching",
  "Named, qualified counsellors",
  "End-to-end support: applications, visas, and accommodation",
];

const applyza = [
  { proof: "Professionally Certified Advisors", detail: "Our counsellors hold internationally recognised education advising certifications." },
  { proof: "100% Free for Students", detail: "No fees at any stage — application, visa, or counselling." },
  { proof: "99% Visa Success Rate", detail: "Published and verifiable." },
  { proof: "6 Global Offices", detail: "Lagos, Accra, Nairobi, Doha, Istanbul, and Nicosia (HQ)." },
  { proof: "AI Course Matching", detail: "Eligibility-based — only programmes you qualify for." },
  { proof: "Named Counsellors", detail: "Real people, verifiable credentials, local expertise." },
  { proof: "End-to-End Support", detail: "Applications, visas, accommodation — all included, all free." },
];

/* ── Page ── */
const HowToChooseConsultancy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="How to Choose a Study Abroad Consultancy — What to Look For"
        description="Not all study abroad consultancies are equal. Here's exactly what to check before you trust anyone with your university application and visa — from internationally certified education advisors."
        path="/how-to-choose-a-study-abroad-consultancy"
        jsonLd={[breadcrumbSchema, faqSchema]}
      />
      <Navbar solid />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
        <SparklesCore
          className="absolute inset-0 z-[1]"
          background="transparent"
          particleColor="#2EC4B6"
          particleDensity={50}
          minSize={0.4}
          maxSize={1.4}
          speed={1.2}
        />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[120px]" style={{ background: "hsl(265 44% 44%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-[100px]" style={{ background: "hsl(169 63% 47%)" }} />

        <div className="container relative z-10 pt-20 pb-10 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-white/60 transition-colors">Study Abroad Advice</Link>
            <span>/</span>
            <span className="text-white/60">How to Choose a Consultancy</span>
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
              style={{ color: "#2EC4B6", borderColor: "rgba(46,196,182,0.3)", background: "rgba(46,196,182,0.08)" }}
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
            How to Choose a Study Abroad Consultancy:{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2EC4B6, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              7 Questions to Ask Before You Commit
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
          >
            Choosing the right study abroad consultancy is one of the most important decisions you'll make on your
            journey to university. The wrong choice can mean a delayed application, a visa refusal, or — in the worst
            cases — money lost to an unregulated agent. The right choice means expert guidance, a successful
            application, and a visa approval. Here is exactly what to look for.
          </motion.p>

        </div>
      </section>

      {/* ── 7 QUESTIONS ── */}
      <section className="bg-background py-14 md:py-20">
        <div className="container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              The 7 Questions You Must Ask
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Before you share your documents, pay any fee, or begin an application with any consultancy, get clear answers to each of these.
            </p>
          </motion.div>

          <div className="space-y-5">
            {questions.map((q, i) => (
              <motion.div
                key={q.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-all duration-300 card-glow"
              >
                <div className="flex items-start gap-4">
                  {/* Number + icon */}
                  <div className="flex flex-col items-center gap-2 shrink-0 pt-0.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${q.accent}15`, border: `1px solid ${q.accent}30` }}
                    >
                      <q.icon size={18} style={{ color: q.accent }} />
                    </div>
                    <span
                      className="text-[10px] font-bold tabular-nums"
                      style={{ color: `${q.accent}80` }}
                    >
                      {q.number}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-sm md:text-base leading-snug mb-2">
                      {q.question}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{q.answer}</p>
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
            className="mb-10"
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              What a Trustworthy Consultancy Looks Like — At a Glance
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Print this out. Screenshot it. Use it as your checklist before you commit to any consultancy.
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
                  <CheckCircle2
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: "#2EC4B6" }}
                  />
                  <span className="text-foreground text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

      {/* ── HOW APPLYZA MEASURES UP ── */}
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
              style={{ color: "#8B5CF6", background: "hsl(265 44% 44% / 0.1)" }}
            >
              How We Compare
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              How Applyza Measures Up
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
              We built Applyza specifically to meet every standard on this list — because we believe students deserve
              a consultancy they can trust completely, without paying a penny. Here is how we hold up against each criterion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
          >
            {applyza.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-card rounded-xl border border-border p-4 card-glow"
              >
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: "#2EC4B6" }} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.proof}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-sm leading-relaxed"
          >
            You can read more about who we are and how we work on our{" "}
            <Link to="/about" className="text-secondary font-semibold hover:underline">
              About page
            </Link>
            . Or, if you're ready to speak with an expert, book a free consultation below — no fees, no commitment.
          </motion.p>
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
              to="/free-vs-paid-study-abroad-consultancies"
              className="group flex flex-col gap-1 bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 card-glow"
            >
              <span className="text-sm font-bold text-foreground group-hover:text-secondary transition-colors">Free vs Paid Study Abroad Consultancies</span>
              <span className="text-xs text-muted-foreground leading-relaxed">Do you need to pay for expert guidance? Understand the fee model.</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, hsl(169 63% 47%), hsl(265 44% 44%))" }}
        />
        <div className="container relative z-10 py-14 text-center max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-bold text-white mb-3"
          >
            Ready to speak with a certified education consultant?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/80 text-sm mb-7"
          >
            Book a free consultation — no fees, no commitment.
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

export default HowToChooseConsultancy;
