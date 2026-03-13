import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AiChatbotCTA = () => {
  const openChatbot = () => {
    // Dispatch a custom event that ChatWidget can listen to
    window.dispatchEvent(new CustomEvent("open-chatbot"));
  };

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #6B3FA0 0%, #1B2150 100%)",
      }}
    >
      <div
        className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(46,196,182,0.1)", filter: "blur(100px)" }}
      />
      <div className="container px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-[48px] font-bold text-white leading-tight mb-5">
            Meet Aza — Your AI Study Abroad Assistant
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-[600px] mx-auto mb-10">
            Get instant answers about courses, visas, scholarships, and more.
            Available 24/7.
          </p>

          <button
            onClick={openChatbot}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-bold text-base md:text-lg transition-colors"
            style={{ backgroundColor: "#2EC4B6" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#25a89c")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#2EC4B6")
            }
          >
            Chat with Aza Now
          </button>

          <div className="mt-5">
            <Link
              to="/book-a-consultation"
              className="text-white/70 hover:text-white text-sm underline underline-offset-4 transition-colors"
            >
              Or book a free consultation with a human counsellor →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AiChatbotCTA;
