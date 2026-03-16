import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MovingBorderButton } from "@/components/ui/MovingBorder";

const EligibilityQuizCTA = () => (
  <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0d24 0%, #1B2150 50%, #0a0d24 100%)" }}>
    <div
      className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
      style={{ backgroundColor: "rgba(46,196,182,0.12)", filter: "blur(120px)" }}
    />
    <div
      className="absolute bottom-[-10%] left-[5%] w-[300px] h-[300px] rounded-full pointer-events-none"
      style={{ backgroundColor: "rgba(107,63,160,0.15)", filter: "blur(100px)" }}
    />

    <div className="container relative z-10 py-14 md:py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-semibold"
          style={{ background: "rgba(46,196,182,0.15)", color: "#2EC4B6" }}>
          <Sparkles size={12} /> Quick Eligibility Check
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Not Sure What to Study?
        </h2>
        <p className="text-sm md:text-base mb-7" style={{ color: "rgba(255,255,255,0.7)" }}>
          Answer 5 quick questions and we'll match you with courses you're eligible for
        </p>
        <MovingBorderButton to="/eligibility-check" className="px-7 py-3.5 text-sm gap-2">
          Check Your Eligibility
          <ArrowRight size={16} />
        </MovingBorderButton>
        <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          Takes less than 2 minutes • 100% free
        </p>
      </motion.div>
    </div>
  </section>
);

export default EligibilityQuizCTA;
