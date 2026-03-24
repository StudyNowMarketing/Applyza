import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const scholarships = [
  {
    university: "University of Sunderland",
    name: "International Excellence Scholarship",
    discount: "£3,000",
    eligibility: "Available to international students with strong academic records applying for undergraduate or postgraduate programmes.",
  },
  {
    university: "York St. John University",
    name: "Vice Chancellor's Scholarship",
    discount: "£2,500",
    eligibility: "Merit-based award for international students demonstrating academic excellence and community involvement.",
  },
  {
    university: "Solent University",
    name: "Global Futures Bursary",
    discount: "£1,500",
    eligibility: "Open to all international fee-paying students enrolling in a full-time programme for the first time.",
  },
];

const ScholarshipsPreview = () => {
  return (
    <section className="relative">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
            Scholarships & Funding Opportunities
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Studying abroad is an investment — and we want to help you make it more affordable. Browse scholarships from our partner universities, including tuition discounts, merit awards, and country-specific funding.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {scholarships.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-white/10"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
            >
              <p className="text-xs text-white/50 font-medium mb-2">{s.university}</p>
              <h3 className="text-base font-bold text-white mb-3">{s.name}</h3>
              <span className="inline-block bg-secondary/15 text-secondary text-xs font-bold px-3 py-1 rounded-full mb-3">
                Up to {s.discount} discount
              </span>
              <p className="text-sm text-white/50 leading-relaxed mb-4">{s.eligibility}</p>
              <Link to="/scholarships" className="text-secondary text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                View Details →
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button variant="teal" size="lg" className="rounded-full" asChild>
            <Link to="/scholarships">Explore All Scholarships →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipsPreview;
