import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ServiceCTA = ({ label = "Book a Free Consultation" }: { label?: string }) => (
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
        Ready to Get Started?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-white/80 max-w-xl mx-auto mb-6 text-sm"
      >
        Speak with one of our expert counsellors and take the first step toward your international education — completely free.
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
          <Link to="/book-a-consultation">{label}</Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default ServiceCTA;
