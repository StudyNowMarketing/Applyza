import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Heart, Eye, Zap, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── count-up hook (reused pattern from TrustStats) ── */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(interval); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { count, ref };
}

/* ── data ── */
const values = [
  { icon: Heart, title: "Student First, Always", desc: "Every decision we make starts with one question: does this help the student?" },
  { icon: Eye, title: "Transparency Over Everything", desc: "No hidden fees. No surprise costs. No vague promises. We tell you exactly what to expect." },
  { icon: Zap, title: "Technology That Empowers", desc: "We use AI and automation to make the process faster — but never to replace the human connection." },
  { icon: Globe, title: "Global Mindset, Personal Touch", desc: "We serve students from across the world, but we never treat them like a number." },
];

const stats = [
  { value: 3000, suffix: "+", label: "Students Placed" },
  { value: 150, suffix: "+", label: "Partner Universities" },
  { value: 99, suffix: "%", label: "Visa Success Rate" },
  { value: 10, suffix: "+", label: "Countries Represented" },
  { value: 10, suffix: "+", label: "Expert Counsellors" },
  { value: 1, suffix: "", label: "Headquarters in Cyprus", display: "Cyprus" },
];

const StatCard = ({ value, suffix, label, display }: { value: number; suffix: string; label: string; display?: string }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center py-8">
      <div className="text-3xl md:text-5xl font-extrabold text-primary">
        {display || `${count.toLocaleString()}${suffix}`}
      </div>
      <div className="text-sm text-muted-foreground mt-2">{label}</div>
    </div>
  );
};

/* ── page ── */
const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[40vh] gradient-navy flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/10 pointer-events-none" />
        <div className="container relative z-10 py-28 md:py-32">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-primary-foreground/50 mb-6">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary-foreground/80">About</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-[48px] md:leading-tight font-extrabold text-primary-foreground mb-5 max-w-2xl"
          >
            Built for Students Who Dream Bigger
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-primary-foreground/70 text-base md:text-lg leading-relaxed max-w-xl"
          >
            Applyza is a global education platform that connects ambitious students with world-class universities — completely free of charge.
          </motion.p>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="bg-background">
        <div className="container py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 space-y-5 text-muted-foreground text-sm md:text-base leading-relaxed"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">Our Story</h2>
              <p>Every year, millions of students dream of studying abroad. But for too many, the process feels impossible — confusing visa requirements, overwhelming course options, and the fear of making the wrong choice.</p>
              <p className="font-semibold text-foreground">We built Applyza to change that.</p>
              <p>Born from the team behind Study Now — a consultancy that has placed over 3,000 students at 150+ universities with a 99% visa success rate — Applyza is the next generation of international education support. We've taken everything we've learned from years of helping students navigate the system and combined it with modern technology to create a platform that's faster, smarter, and more accessible than anything we've built before.</p>
              <p>Our AI-powered course matching helps students find programmes they're eligible for in seconds. Our expert counsellors provide personalised guidance at every stage. And we do it all without charging students a single penny.</p>
              <p className="font-semibold text-foreground italic">We believe that where you study shouldn't be limited by where you're from.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-2"
            >
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-accent/10 via-secondary/10 to-muted flex items-center justify-center">
                <span className="text-muted-foreground/40 text-sm font-medium">Team Photo</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OUR MISSION ── */}
      <section style={{ background: "hsl(265 44% 97%)" }}>
        <div className="container py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-sm font-bold uppercase tracking-wider text-accent mb-6">Our Mission</h2>
            <p className="text-xl md:text-2xl font-bold text-primary leading-relaxed italic">
              "To remove the barriers between ambitious students and world-class education — through expert guidance, smart technology, and a commitment to making the process completely free."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── OUR VALUES ── */}
      <section className="bg-background">
        <div className="container py-12 md:py-20">
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-card rounded-2xl shadow-sm p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
                  <v.icon className="text-secondary" size={22} />
                </div>
                <h3 className="font-bold text-primary text-base mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BY THE NUMBERS ── */}
      <section className="bg-card">
        <div className="container py-12 md:py-20">
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary text-center mb-12">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
