import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AICourseMatcher = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto rounded-3xl p-10 md:p-14 border border-white/10"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
            Not Sure What to Study?
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
            Let our AI match you with courses you're eligible for. Answer a few quick questions about your qualifications and interests — and we'll do the rest.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-secondary text-white hover:bg-secondary/90 shadow-xl shadow-secondary/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base font-bold px-8"
            asChild
          >
            <Link to="/find-a-course">Find My Perfect Course →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AICourseMatcher;
