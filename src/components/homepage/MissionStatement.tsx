import { motion } from "framer-motion";

const MissionStatement = () => (
  <section className="py-20 md:py-28" style={{ backgroundColor: "#F5F6FA" }}>
    <div className="container px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-[700px] mx-auto"
      >
        <h2
          className="text-3xl md:text-[48px] font-bold leading-tight mb-6"
          style={{ color: "#1B2150" }}
        >
          Honest guidance for genuine students.
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-[650px] mx-auto">
          From your first course search to your first day on campus — we guide
          you every step of the way. Our AI-powered platform and expert
          counsellors make studying abroad simpler, smarter, and completely free.
        </p>
      </motion.div>
    </div>
  </section>
);

export default MissionStatement;
