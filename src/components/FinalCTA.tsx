import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient-shift bg-[length:200%_200%]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, hsl(265 44% 44%), hsl(169 63% 47%), hsl(265 44% 44%))",
        }}
      />

      <div className="container relative z-10 py-20 md:py-28 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-extrabold text-primary-foreground mb-4"
        >
          Your Future Doesn't Have to Wait
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-sm md:text-base"
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
            className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold px-8"
          >
            Book a Free Consultation
          </Button>
          <Button
            size="lg"
            className="rounded-full bg-primary-foreground/15 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/25 font-bold px-8"
          >
            Search Courses
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
