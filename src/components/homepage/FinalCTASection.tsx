import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FinalCTASection = () => (
  <section className="py-20 md:py-28 bg-white">
    <div className="container px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-3xl md:text-[48px] font-bold leading-tight mb-8"
          style={{ color: "#1B2150" }}
        >
          Ready to Start Your Journey?
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link
            to="/find-a-course"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full text-white font-bold text-base transition-colors"
            style={{ backgroundColor: "#2EC4B6" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#25a89c")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#2EC4B6")
            }
          >
            Find a Course
          </Link>
          <Link
            to="/book-a-consultation"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-base transition-colors"
            style={{
              color: "#1B2150",
              border: "2px solid #1B2150",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1B2150";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#1B2150";
            }}
          >
            Book a Consultation
          </Link>
        </div>

        <p className="text-gray-400 text-sm">
          100% free for students. No hidden fees. Ever.
        </p>
      </motion.div>
    </div>
  </section>
);

export default FinalCTASection;
