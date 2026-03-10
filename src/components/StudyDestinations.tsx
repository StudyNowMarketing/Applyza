import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import ukImg from "@/assets/destinations/uk.jpg";
import germanyImg from "@/assets/destinations/germany.jpg";
import franceImg from "@/assets/destinations/france.jpg";
import irelandImg from "@/assets/destinations/ireland.jpg";
import maltaImg from "@/assets/destinations/malta.jpg";
import netherlandsImg from "@/assets/destinations/netherlands.jpg";

const destinations = [
  { name: "United Kingdom", flag: "🇬🇧", image: ukImg, slug: "united-kingdom", featured: true },
  { name: "Germany", flag: "🇩🇪", image: germanyImg, slug: "germany" },
  { name: "France", flag: "🇫🇷", image: franceImg, slug: "france" },
  { name: "Ireland", flag: "🇮🇪", image: irelandImg, slug: "ireland" },
  { name: "Malta", flag: "🇲🇹", image: maltaImg, slug: "malta" },
  { name: "Netherlands", flag: "🇳🇱", image: netherlandsImg, slug: "netherlands" },
];

const StudyDestinations = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="bg-card">
      <div className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-4">
            Where Will You Study?
          </h2>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center text-primary hover:bg-muted transition-colors hidden md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center text-primary hover:bg-muted transition-colors hidden md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {destinations.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to={`/study-destinations/${d.slug}`}
                  className={`relative rounded-2xl overflow-hidden shrink-0 snap-start group cursor-pointer block ${
                    d.featured ? "w-72 md:w-80 h-72 md:h-96" : "w-56 md:w-64 h-64 md:h-80"
                  }`}
                >
                  <img
                    src={d.image}
                    alt={d.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 via-40% to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-lg md:text-xl font-bold text-primary-foreground">
                      {d.flag} {d.name}
                    </div>
                    <span className="text-primary-foreground/70 text-sm font-medium group-hover:text-secondary transition-colors">
                      Explore courses →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/study-destinations" className="text-secondary font-semibold hover:underline">
            See All Destinations →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StudyDestinations;
