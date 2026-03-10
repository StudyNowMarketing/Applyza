import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AICourseMatcher = () => {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(265 44% 44%) 0%, hsl(169 63% 47%) 100%)" }}>
      <div className="container py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary-foreground mb-4">
            Not Sure What to Study?
          </h2>
          <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed mb-8">
            Let our AI match you with courses you're eligible for. Answer a few quick questions about your qualifications and interests — and we'll do the rest.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base font-bold px-8"
            asChild
          >
            <Link to="/find-a-course">Find My Perfect Course →</Link>
          </Button>
        </motion.div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-primary-foreground/5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/5 translate-x-1/3 translate-y-1/3" />
    </section>
  );
};

export default AICourseMatcher;
