import { motion } from "framer-motion";

const logos = [
  "British Council",
  "European Commission",
  "BUILA",
  "UKCISA",
  "Universities UK International",
  "British Council",
  "European Commission",
  "BUILA",
  "UKCISA",
  "Universities UK International",
];

const PartnerLogos = () => (
  <section className="py-20 md:py-28 bg-white overflow-hidden">
    <div className="container px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2
          className="text-2xl md:text-4xl font-bold mb-4"
          style={{ color: "#1B2150" }}
        >
          Trusted Partners & Accreditations
        </h2>
      </motion.div>
    </div>

    {/* Marquee */}
    <div className="relative group">
      <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
        {[...logos, ...logos].map((name, i) => (
          <div
            key={i}
            className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center"
          >
            <div
              className="w-[120px] h-[48px] rounded-lg flex items-center justify-center text-xs font-medium"
              style={{
                backgroundColor: "#F0F0F0",
                color: "#9CA3AF",
              }}
            >
              {name}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="container px-6 mt-8">
      <p className="text-center text-gray-400 text-sm">
        150+ Partner Universities Worldwide
      </p>
    </div>
  </section>
);

export default PartnerLogos;
