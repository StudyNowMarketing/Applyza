import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, GraduationCap } from "lucide-react";

const scholarships = [
  {
    university: "University of Sunderland",
    name: "International Excellence Scholarship",
    discount: "£3,000",
    country: "United Kingdom",
    level: "UG / PG",
    eligibility: "Available to international students with strong academic records applying for undergraduate or postgraduate programmes.",
    accentColor: "#6B3FA0",
    accentBg: "rgba(107,63,160,0.12)",
  },
  {
    university: "York St. John University",
    name: "Vice Chancellor's Scholarship",
    discount: "£2,500",
    country: "United Kingdom",
    level: "Postgraduate",
    eligibility: "Merit-based award for international students demonstrating academic excellence and community involvement.",
    accentColor: "#2EC4B6",
    accentBg: "rgba(46,196,182,0.12)",
  },
  {
    university: "Solent University",
    name: "Global Futures Bursary",
    discount: "£1,500",
    country: "United Kingdom",
    level: "Undergraduate",
    eligibility: "Open to all international fee-paying students enrolling in a full-time programme for the first time.",
    accentColor: "#3B82F6",
    accentBg: "rgba(59,130,246,0.12)",
  },
];

const ScholarshipsPreview = () => {
  return (
    <section className="relative">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(46,196,182,0.12)", border: "1px solid rgba(46,196,182,0.25)", color: "#2EC4B6" }}
          >
            Free Tuition Discount Matching
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="text-2xl md:text-4xl font-extrabold text-white mb-4"
          >
            Tuition Discounts & Funding Opportunities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base"
          >
            We match you to tuition discounts and funding you actually qualify for — merit awards, bursaries, and more across 200+ partner universities. Completely free.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {scholarships.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
            >
              {/* Accent bar */}
              <div className="h-1 w-full shrink-0" style={{ background: s.accentColor }} />

              <div className="p-6 flex flex-col flex-1">
                {/* Amount badge */}
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-2xl font-bold leading-tight"
                    style={{ color: s.accentColor }}
                  >
                    {s.discount}
                  </span>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: s.accentBg, color: s.accentColor }}
                  >
                    {s.level}
                  </span>
                </div>

                <p className="text-xs text-white/40 font-medium mb-1.5 flex items-center gap-1">
                  <GraduationCap size={10} /> {s.university}
                </p>
                <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">{s.name}</h3>

                <p className="text-xs text-white/40 flex items-center gap-1 mb-3">
                  <MapPin size={10} /> {s.country}
                </p>

                <p className="text-xs text-white/50 leading-relaxed mb-4 flex-1">{s.eligibility}</p>

                <Link
                  to="/scholarships"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all hover:gap-2.5"
                  style={{ color: s.accentColor }}
                >
                  View Details <ArrowRight size={11} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Button variant="teal" size="lg" className="rounded-full" asChild>
            <Link to="/scholarships">Browse All Discounts →</Link>
          </Button>
          <Link
            to="/book-a-consultation"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            Find tuition discounts you qualify for
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ScholarshipsPreview;
