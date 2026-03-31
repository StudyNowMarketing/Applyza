import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container relative z-10 py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-10 md:p-16 border border-white/10 max-w-3xl mx-auto"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
            Your Future Doesn't Have to Wait
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-8 text-sm md:text-base">
            Find out in minutes if you qualify for your dream programme — completely free, no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="teal"
              className="rounded-full font-bold px-8 shadow-lg shadow-secondary/20"
              asChild
            >
              <Link to="/eligibility-check">Check Your Eligibility</Link>
            </Button>
            <Button
              size="lg"
              className="rounded-full border-2 border-white/20 text-white hover:bg-white/10 font-bold px-8 bg-transparent"
              asChild
            >
              <Link to="/find-a-course">Search Courses</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
