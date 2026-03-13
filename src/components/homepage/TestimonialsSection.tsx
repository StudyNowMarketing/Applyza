import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Applyza made my dream of studying in the UK a reality. The counsellors were incredibly supportive throughout the entire process.",
    name: "Adaeze O.",
    flag: "🇳🇬",
    university: "University of Sunderland",
  },
  {
    quote: "I got my visa approved on the first attempt thanks to their expert guidance. I couldn't have done it without them!",
    name: "Kwame A.",
    flag: "🇬🇭",
    university: "University of Wolverhampton",
  },
  {
    quote: "The AI course matcher helped me find the perfect programme. The whole service was completely free — I was amazed.",
    name: "Fatima H.",
    flag: "🇹🇷",
    university: "Solent University",
  },
  {
    quote: "From application to accommodation, Applyza handled everything. I just had to show up on campus!",
    name: "James K.",
    flag: "🇰🇪",
    university: "Leeds Trinity University",
  },
];

const TestimonialsSection = () => (
  <section className="py-20 md:py-28 bg-white">
    <div className="container px-6">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-[48px] font-bold text-center leading-tight mb-14"
        style={{ color: "#1B2150" }}
      >
        What Our Students Say
      </motion.h2>

      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="min-w-[300px] md:min-w-0 snap-start bg-white rounded-2xl p-7 flex flex-col"
            style={{
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            {/* Avatar placeholder */}
            <div
              className="w-12 h-12 rounded-full mb-4 flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: "#6B3FA0" }}
            >
              {t.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <p className="text-gray-600 text-sm italic leading-relaxed flex-1 mb-5">
              "{t.quote}"
            </p>
            <div>
              <p className="font-bold text-sm" style={{ color: "#1B2150" }}>
                {t.name} {t.flag}
              </p>
              <p className="text-gray-400 text-xs">{t.university}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
