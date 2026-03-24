import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

const PartnerUniversities = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All" ? universities : universities.filter((u) => u.region === activeTab);

  return (
    <section className="relative">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
            Trusted by Leading Institutions Worldwide
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            We work with 150+ accredited universities and education providers across the UK, Europe, North America, and beyond.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/10 text-white/60 hover:bg-white/20 border border-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {filtered.map((uni, i) => (
            <motion.div
              key={uni.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-white/10"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
            >
              <div className="h-3 bg-gradient-to-r from-primary to-secondary" />
              <div className="p-6">
                <h3 className="font-bold text-white text-base mb-1">{uni.name}</h3>
                <p className="text-xs text-white/50 mb-4">{uni.location}</p>
                <Link
                  to={`/find-a-course?university=${encodeURIComponent(uni.name)}`}
                  className="text-secondary text-xs font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  View Courses →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-white/50 py-12">More universities coming soon for this region.</p>
        )}

        <div className="flex justify-center mt-10">
          <Button variant="outline" size="lg" className="rounded-full border-white/20 text-white hover:bg-white/10" asChild>
            <Link to="/find-a-course">See All 150+ Partners →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnerUniversities;
