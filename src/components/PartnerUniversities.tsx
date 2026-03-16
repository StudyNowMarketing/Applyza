import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const marqueeItems = [
  "York St John University",
  "University of Sunderland",
  "University of East London",
  "University of Wolverhampton",
  "Buckinghamshire New University",
  "Edge Hill University",
  "Leeds Trinity University",
  "Solent University",
  "University of West London",
  "Wrexham University",
  "✓ 100% Free Service",
  "✓ AQF Certified Agent",
  "✓ AI-Powered Matching",
  "✓ 99% Visa Success Rate",
  "✓ Expert Counsellors",
  "✓ End-to-End Support",
];

const regions = [
  { count: "80+", label: "UK Universities", color: "#2EC4B6" },
  { count: "50+", label: "European Institutions", color: "#6B3FA0" },
  { count: "20+", label: "North American", color: "#1B2150" },
];

const PartnerUniversities = () => {
  return (
    <section className="bg-white">
      {/* Subtle top separator */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />
      <div className="container py-12 md:py-16">
        {/* Header + Regional stats on one line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10"
        >
          <div className="text-center lg:text-left">
            <div className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #6B3FA0, #1B2150)" }}>
              150+
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-foreground mt-1">
              Partner Universities
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-md">
              Accredited universities across the UK, Europe, North America, and beyond.
            </p>
          </div>

          <div className="flex gap-4 justify-center lg:justify-end">
            {regions.map((r) => (
              <div key={r.label} className="text-center rounded-xl border border-gray-100 px-5 py-3 card-glow">
                <div className="text-2xl font-bold" style={{ color: r.color }}>{r.count}</div>
                <div className="text-xs text-gray-500 mt-0.5">{r.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className={`mx-4 text-sm font-medium shrink-0 ${
                  item.startsWith("✓") ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {item.startsWith("✓") ? item : `🎓 ${item}`}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            className="rounded-full"
            style={{ backgroundColor: "#1B2150" }}
            asChild
          >
            <Link to="/find-a-course">View All Partner Universities →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnerUniversities;
