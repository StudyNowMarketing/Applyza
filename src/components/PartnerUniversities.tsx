import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import yorkImg from "@/assets/universities/york-st-john.jpg";
import sunderlandImg from "@/assets/universities/sunderland.jpg";
import wolverhamptonImg from "@/assets/universities/wolverhampton.jpg";
import buckinghamshireImg from "@/assets/universities/buckinghamshire.jpg";
import edgeHillImg from "@/assets/universities/edge-hill.jpg";
import leedsTrinityImg from "@/assets/universities/leeds-trinity.jpg";
import solentImg from "@/assets/universities/solent.jpg";
import eastLondonImg from "@/assets/universities/east-london.jpg";

const universities = [
  { name: "York St. John University", location: "York, United Kingdom", image: yorkImg, region: "UK" },
  { name: "University of Sunderland", location: "Sunderland, United Kingdom", image: sunderlandImg, region: "UK" },
  { name: "University of Wolverhampton", location: "Wolverhampton, United Kingdom", image: wolverhamptonImg, region: "UK" },
  { name: "Buckinghamshire New University", location: "High Wycombe, United Kingdom", image: buckinghamshireImg, region: "UK" },
  { name: "Edge Hill University", location: "Ormskirk, United Kingdom", image: edgeHillImg, region: "UK" },
  { name: "Leeds Trinity University", location: "Leeds, United Kingdom", image: leedsTrinityImg, region: "UK" },
  { name: "Solent University", location: "Southampton, United Kingdom", image: solentImg, region: "UK" },
  { name: "University of East London", location: "London, United Kingdom", image: eastLondonImg, region: "UK" },
];

const tabs = ["All", "UK", "Europe", "North America"];

const PartnerUniversities = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All" ? universities : universities.filter((u) => u.region === activeTab);

  return (
    <section className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-4">
            Trusted by Leading Institutions Worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We work with 150+ accredited universities and education providers across the UK, Europe, North America, and beyond.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {filtered.map((uni, i) => (
            <motion.div
              key={uni.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={uni.image}
                alt={uni.name}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="font-bold text-primary text-sm mb-1">{uni.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{uni.location}</p>
                <a href="#" className="text-secondary text-xs font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                  View Courses →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">More universities coming soon for this region.</p>
        )}

        <div className="flex justify-center mt-10">
          <Button variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            See All 150+ Partners →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnerUniversities;
