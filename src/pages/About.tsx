import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Heart, Eye, Zap, Globe, MapPin, Building2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

const offices = [
  { city: "Nicosia", country: "Cyprus", hq: true },
  { city: "Lagos", country: "Nigeria", hq: false },
  { city: "Accra", country: "Ghana", hq: false },
  { city: "Nairobi", country: "Kenya", hq: false },
  { city: "Doha", country: "Qatar", hq: false },
  { city: "Istanbul", country: "Türkiye", hq: false },
];

const stats = [
  { value: 3000, suffix: "+", label: "Students Placed" },
  { value: 150, suffix: "+", label: "Partner Universities" },
  { value: 99, suffix: "%", label: "Visa Success Rate" },
  { value: 6, suffix: "", label: "Global Offices" },
];

const StatItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-secondary">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs text-white/50 mt-1">{label}</div>
    </div>
  );
};

/* ── page ── */
const About = () => {
  return (
    <div className="min-h-screen">
      <SEO title="About Applyza | Global Education Platform | AQF Certified" description="Applyza is a global education consultancy helping international students access world-class universities. 150+ partners, 99% visa success rate." path="/about" />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: "#0a0d24" }}>
        <SparklesCore className="absolute inset-0 z-[1]" background="transparent" particleColor="#2EC4B6" particleDensity={60} minSize={0.4} maxSize={1.5} speed={1.5} />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]" style={{ background: "hsl(265 44% 44%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]" style={{ background: "hsl(169 63% 47%)" }} />
        <div className="container relative z-10 py-12">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-4">
            <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">About</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-white mb-3 max-w-2xl"
          >
            About Applyza
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl"
          >
            A global education platform that connects ambitious students with world-class universities — completely free of charge.
          </motion.p>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="bg-background">
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Our Story</h2>
              <p className="text-muted-foreground text-sm leading-[1.8]">
                Every year, millions of students dream of studying abroad. But for too many, the process feels impossible — confusing visa requirements, overwhelming course options, and the fear of making the wrong choice.
              </p>

              {/* Pull quote */}
              <div className="border-l-4 border-secondary pl-4 py-2 my-4">
                <p className="text-base md:text-lg font-semibold text-foreground italic leading-relaxed">
                  We built Applyza to change that.
                </p>
              </div>

              <p className="text-muted-foreground text-sm leading-[1.8]">
                Applyza is a global education consultancy that helps international students access world-class universities across the UK, Europe, and beyond. Our AI-powered course matching helps students find programmes they're eligible for in seconds. Our expert counsellors provide personalised guidance at every stage. And we do it all without charging students a single penny.
              </p>

              {/* Pull quote */}
              <div className="border-l-4 border-secondary pl-4 py-2 my-4">
                <p className="text-base font-semibold text-foreground italic leading-relaxed">
                  We believe that where you study shouldn't be limited by where you're from.
                </p>
              </div>
            </motion.div>

            {/* Right: Timeline milestones */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-0"
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Key Milestones</h3>
              {[
                { year: "2026", text: "Applyza platform launched" },
                { year: "2026", text: "150+ partner universities onboarded" },
                { year: "2026", text: "Offices established across 6 countries" },
                { year: "2026", text: "AI-powered course matching system launched" },
              ].map((m, i, arr) => (
                <div key={m.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 text-white text-[10px] font-bold" style={{ background: "linear-gradient(135deg, hsl(169 63% 47%), hsl(169 63% 40%))" }}>
                      {m.year.slice(2)}
                    </div>
                    {i < arr.length - 1 && <div className="w-0.5 flex-1 bg-secondary/20 mt-1" />}
                  </div>
                  <div className="pb-6">
                    <span className="text-xs font-bold text-secondary">{m.year}</span>
                    <p className="text-sm text-foreground mt-0.5">{m.text}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

      {/* ── MISSION ── */}
      <section className="bg-background">
        <div className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-3 text-accent" style={{ backgroundColor: "hsl(265 44% 44% / 0.1)" }}>
              Our Mission
            </span>
            <p className="text-lg md:text-xl font-bold text-foreground leading-relaxed italic">
              "To remove the barriers between ambitious students and world-class education — through expert guidance, smart technology, and a commitment to making the process completely free."
            </p>
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

      {/* ── VALUES ── */}
      <section className="bg-background">
        <div className="container py-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-all duration-300 card-glow"
              >
                <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                  <v.icon className="text-secondary" size={16} />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1">{v.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

      {/* ── COMMITMENT TO QUALITY ── */}
      <section className="bg-background">
        <div className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6">Our Commitment to Quality</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              Applyza operates within the UK Agent Quality Framework (AQF) and adheres to the National Code of Ethical Practice for Education Agents. Our counsellors are trained and certified through recognized professional programmes.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              We are committed to supporting genuine students who are serious about their education. We carefully assess every student's academic background, career goals, and study intent before recommending programmes. We do not guarantee admission or visa outcomes — but we do guarantee honest, professional guidance based on years of experience.
            </p>
            <a
              href="https://www.gov.uk/government/publications/student-agents-and-advisers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              Learn about choosing an education agent →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── OUR OFFICES — Dark section ── */}
      <section className="relative" style={{ background: "#0a0d24" }}>
        <SparklesCore className="absolute inset-0 z-[1]" background="transparent" particleColor="#6B3FA0" particleDensity={40} minSize={0.3} maxSize={1.2} speed={1} />
        <div className="container py-12">
          <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-8">Our Global Presence</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {offices.map((o, i) => (
              <motion.div
                key={o.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`relative rounded-xl p-5 border backdrop-blur-sm transition-all duration-300 card-glow ${
                  o.hq
                    ? "bg-white/10 border-secondary/30 md:col-span-1"
                    : "bg-white/5 border-white/10"
                }`}
              >
                {o.hq && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary/20 text-secondary">
                    HQ
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${o.hq ? "bg-secondary/20" : "bg-white/10"}`}>
                    {o.hq ? <Building2 size={14} className="text-secondary" /> : <MapPin size={14} className="text-white/60" />}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{o.city}</h3>
                    <p className="text-white/40 text-xs">{o.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS — Dark section ── */}
      <section className="relative" style={{ background: "#080b1e" }}>
        <SparklesCore className="absolute inset-0 z-[1]" background="transparent" particleColor="#2EC4B6" particleDensity={40} minSize={0.3} maxSize={1.2} speed={1} />
        <div className="container py-10">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 max-w-3xl mx-auto">
            {stats.map((s) => (
              <StatItem key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(169 63% 47%), hsl(169 63% 40%))" }} />
        <div className="container relative z-10 py-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-bold text-white mb-2"
          >
            Start Your Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/80 max-w-xl mx-auto mb-6 text-sm"
          >
            Ready to take the first step toward your international education? Book a free consultation today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="rounded-full bg-white text-primary hover:bg-white/90 font-bold px-8"
              asChild
            >
              <Link to="/book-a-consultation">Book a Free Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
