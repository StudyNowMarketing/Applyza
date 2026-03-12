import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Check } from "lucide-react";

const trustBadges = ["100% Free Service", "99% Visa Success", "Expert Counsellors"];

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #2EC4B6, #1B9E93)" }}>
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />

      {/* Curved top edge */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full h-8 md:h-12" preserveAspectRatio="none">
          <path d="M0 60V0c240 40 480 60 720 60S1200 40 1440 0v60H0z" fill="white" />
        </svg>
      </div>

      <div className="container relative z-10 pt-16 pb-16 md:pt-24 md:pb-20 text-center">
        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {trustBadges.map((badge) => (
            <span key={badge} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/90">
              <Check size={12} className="text-white" /> {badge}
            </span>
          ))}
        </div>

        {/* Pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
            <Sparkles size={12} /> Start Your Journey Today
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
        >
          Ready to Start Your{" "}
          <span className="relative inline-block">
            Journey?
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
              <path d="M2 8c30-6 60-4 90-2s70 2 106-4" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mx-auto mb-10 text-sm md:text-base"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          Book a free consultation with one of our expert counsellors and take
          the first step toward your international education.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="rounded-full font-bold px-8 shadow-xl text-base"
            style={{ background: "white", color: "#1B2150" }}
            asChild
          >
            <Link to="/book-a-consultation">Book a Free Consultation →</Link>
          </Button>
          <Button
            size="lg"
            className="rounded-full font-bold px-8 text-base"
            style={{ background: "transparent", border: "2px solid rgba(255,255,255,0.6)", color: "white" }}
            asChild
          >
            <Link to="/find-a-course">Explore Courses →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
