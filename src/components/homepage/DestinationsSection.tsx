import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

import ukImg from "@/assets/destinations/uk.jpg";
import germanyImg from "@/assets/destinations/germany.jpg";
import franceImg from "@/assets/destinations/france.jpg";
import irelandImg from "@/assets/destinations/ireland.jpg";
import maltaImg from "@/assets/destinations/malta.jpg";

const destinations = [
  { name: "United Kingdom", flag: "🇬🇧", slug: "united-kingdom", img: ukImg },
  { name: "Germany", flag: "🇩🇪", slug: "germany", img: germanyImg },
  { name: "France", flag: "🇫🇷", slug: "france", img: franceImg },
  { name: "Ireland", flag: "🇮🇪", slug: "ireland", img: irelandImg },
  { name: "Canada", flag: "🇨🇦", slug: "canada", img: null },
  { name: "Malta", flag: "🇲🇹", slug: "malta", img: maltaImg },
];

const DestinationsSection = () => {
  const { data: courseCounts } = useQuery({
    queryKey: ["course-counts-by-country"],
    queryFn: async () => {
      const { data } = await supabase
        .from("courses")
        .select("country")
        .eq("status", "active");
      const counts: Record<string, number> = {};
      data?.forEach((c) => {
        counts[c.country] = (counts[c.country] || 0) + 1;
      });
      return counts;
    },
  });

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#F5F6FA" }}>
      <div className="container px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-[48px] font-bold text-center leading-tight mb-14"
          style={{ color: "#1B2150" }}
        >
          Where Will You Study?
        </motion.h2>

        <div className="flex gap-5 overflow-x-auto md:overflow-visible md:grid md:grid-cols-3 lg:grid-cols-6 snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                to={`/study-destinations/${dest.slug}`}
                className="block min-w-[220px] md:min-w-0 h-[340px] rounded-2xl overflow-hidden relative group snap-start"
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gray-700">
                  {dest.img && (
                    <img
                      src={dest.img}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                </div>
                {/* Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)",
                  }}
                />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <span className="text-2xl mb-1 block">{dest.flag}</span>
                  <h3 className="text-white font-bold text-lg">{dest.name}</h3>
                  {courseCounts && (
                    <p className="text-white/70 text-xs mt-1">
                      {courseCounts[dest.name] || 0} courses available
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
