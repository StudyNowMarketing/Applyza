import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, Globe, Award } from "lucide-react";

const universities = [
  { name: "York St. John University", location: "York, United Kingdom", region: "UK" },
  { name: "University of Sunderland", location: "Sunderland, United Kingdom", region: "UK" },
  { name: "University of Wolverhampton", location: "Wolverhampton, United Kingdom", region: "UK" },
  { name: "Buckinghamshire New University", location: "High Wycombe, United Kingdom", region: "UK" },
  { name: "Edge Hill University", location: "Ormskirk, United Kingdom", region: "UK" },
  { name: "Leeds Trinity University", location: "Leeds, United Kingdom", region: "UK" },
  { name: "Solent University", location: "Southampton, United Kingdom", region: "UK" },
  { name: "University of East London", location: "London, United Kingdom", region: "UK" },
];

const tabs = ["All", "UK", "Europe", "North America"];

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

const trustBadges = [
  { icon: ShieldCheck, label: "Accredited Partners" },
  { icon: Globe, label: "Global Network" },
  { icon: Award, label: "Verified Institutions" },
];

const PartnerUniversities = () => {
  const [activeTab, setActiveTab] = useState("All");
  const filtered = activeTab === "All" ? universities : universities.filter((u) => u.region === activeTab);

  return (
    <section className="bg-white">
      <div className="container py-16 md:py-24">
        {/* Trust badges row */}
        <div className="flex justify-center gap-3 mb-8">
          {trustBadges.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-600"
            >
              <b.icon size={14} style={{ color: "#2EC4B6" }} />
              {b.label}
            </span>
          ))}
        </div>

        {/* Large centered number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div
            className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #6B3FA0, #1B2150)" }}
          >
            150+
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mt-2">
            Partner Universities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
            We work with accredited universities and education providers across the UK, Europe, North America, and beyond.
          </p>
        </motion.div>

        {/* Regional breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
          {regions.map((r) => (
            <div
              key={r.label}
              className="text-center rounded-xl border border-gray-100 p-5"
            >
              <div className="text-3xl font-bold" style={{ color: r.color }}>
                {r.count}
              </div>
              <div className="text-sm text-gray-600 mt-1">{r.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs (keep existing logic) */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={activeTab === tab ? { backgroundColor: "#1B2150" } : undefined}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* University cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {filtered.map((uni, i) => (
            <motion.div
              key={uni.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="h-1.5"
                style={{ background: "linear-gradient(to right, #1B2150, #2EC4B6)" }}
              />
              <div className="p-6">
                <h3 className="font-bold text-foreground text-base mb-1">{uni.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{uni.location}</p>
                <Link
                  to={`/find-a-course?university=${encodeURIComponent(uni.name)}`}
                  className="text-xs font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                  style={{ color: "#2EC4B6" }}
                >
                  View Courses →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-12">More universities coming soon for this region.</p>
        )}

        {/* Marquee */}
        <div className="relative mt-14 overflow-hidden">
          {/* Fade edges */}
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

        <div className="flex justify-center mt-10">
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
