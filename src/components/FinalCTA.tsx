import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Check } from "lucide-react";

const trustBadges = ["100% Free Service", "99% Visa Success", "Expert Counsellors"];

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #2EC4B6, #1B9E93)" }}>
      <div className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />


      <div className="container relative z-10 pt-14 pb-12 md:pt-20 md:pb-16 text-center">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          {trustBadges.map((badge) => (
            <span key={badge} className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-white/90">
              <Check size={11} className="text-white" /> {badge}
            </span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
            <Sparkles size={11} /> Start Your Journey Today
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-extrabold text-white mb-3 leading-tight"
        >
          Ready to Start Your{" "}
          <span className="relative inline-block">
            Journey?
            <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
              <path d="M2 8c30-6 60-4 90-2s70 2 106-4" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mx-auto mb-8 text-sm"
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
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            size="lg"
            className="rounded-full font-bold px-8 shadow-xl text-sm"
            style={{ background: "white", color: "#1B2150" }}
            asChild
          >
            <Link to="/book-a-consultation">Book a Free Consultation →</Link>
          </Button>
          <Button
            size="lg"
            className="rounded-full font-bold px-8 text-sm"
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
