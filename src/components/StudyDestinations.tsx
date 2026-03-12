import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    name: "United Kingdom",
    code: "GB",
    slug: "united-kingdom",
    courses: "2,500+",
    unis: "Oxford, Cambridge, UCL, Imperial",
    shape: (
      <>
        <rect x="70%" y="10%" width="60" height="120" rx="4" fill="rgba(255,255,255,0.04)" />
        <rect x="73%" y="5%" width="14" height="30" rx="2" fill="rgba(255,255,255,0.06)" />
        <circle cx="80%" cy="50%" r="30" fill="rgba(255,255,255,0.03)" />
      </>
    ),
  },
  {
    name: "Germany",
    code: "DE",
    slug: "germany",
    courses: "1,800+",
    unis: "TU Munich, Heidelberg, LMU",
    shape: (
      <>
        <polygon points="80,20 60,60 100,60" fill="rgba(255,255,255,0.04)" />
        <polygon points="80,30 65,55 95,55" fill="rgba(255,255,255,0.03)" />
        <rect x="65" y="60" width="30" height="8" rx="2" fill="rgba(255,255,255,0.04)" />
      </>
    ),
  },
  {
    name: "France",
    code: "FR",
    slug: "france",
    courses: "1,200+",
    unis: "Sorbonne, Sciences Po, HEC",
    shape: (
      <>
        <polygon points="85,15 75,70 95,70" fill="rgba(255,255,255,0.05)" />
        <line x1="85" y1="15" x2="85" y2="8" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
        <rect x="78" y="70" width="14" height="4" rx="1" fill="rgba(255,255,255,0.04)" />
      </>
    ),
  },
  {
    name: "Ireland",
    code: "IE",
    slug: "ireland",
    courses: "900+",
    unis: "Trinity College, UCD, DCU",
    shape: (
      <>
        <ellipse cx="80" cy="40" rx="25" ry="30" fill="rgba(255,255,255,0.03)" />
        <path d="M70 35 Q80 20 90 35 Q80 25 70 35Z" fill="rgba(255,255,255,0.05)" />
      </>
    ),
  },
  {
    name: "Malta",
    code: "MT",
    slug: "malta",
    courses: "400+",
    unis: "University of Malta, MCAST",
    shape: (
      <>
        <rect x="65" y="40" width="12" height="20" rx="2" fill="rgba(255,255,255,0.04)" />
        <rect x="80" y="35" width="10" height="25" rx="2" fill="rgba(255,255,255,0.03)" />
        <rect x="93" y="42" width="8" height="18" rx="2" fill="rgba(255,255,255,0.04)" />
      </>
    ),
  },
];

const StudyDestinations = () => {
  return (
    <section className="relative" style={{ backgroundColor: "#0a0d24" }}>
      {/* Glow effects */}
      <div
        className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(46,196,182,0.10)", filter: "blur(120px)" }}
      />
      <div
        className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(107,63,160,0.15)", filter: "blur(100px)" }}
      />

      <div className="container relative z-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4"
            style={{ color: "#2EC4B6", backgroundColor: "rgba(46,196,182,0.10)" }}
          >
            Popular Destinations
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
            Where Will You{" "}
            <span style={{ color: "#2EC4B6" }}>Study?</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Explore top study destinations and find the perfect place for your academic journey.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 auto-rows-[220px] md:auto-rows-[240px]">
          {destinations.map((d, i) => {
            const isUK = i === 0;
            const gridClass = isUK
              ? "md:col-span-3 md:row-span-2"
              : i <= 2
              ? "md:col-span-2"
              : "md:col-span-2 lg:col-span-2";

            // For the last card (Malta) when 5 items with col-span-2 each, 
            // we need to handle the odd one
            const finalGridClass = i === 4 ? "md:col-span-1 lg:col-span-1" : gridClass;

            return (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`${i === 0 ? "md:col-span-3 md:row-span-2" : i <= 2 ? "md:col-span-2" : "md:col-span-2 lg:col-span-" + (i === 4 ? "1" : "2")}`}
              >
                <Link
                  to={`/study-destinations/${d.slug}`}
                  className="relative block h-full rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(135deg, #1a1f4d 0%, #0a0d24 100%)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                    style={{ boxShadow: "inset 0 0 40px rgba(46,196,182,0.08)" }}
                  />

                  {/* SVG decoration */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    {d.shape}
                  </svg>

                  {/* Country code badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
                  >
                    {d.code}
                  </div>

                  {/* Course count badge */}
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ color: "#2EC4B6", border: "1px solid rgba(46,196,182,0.30)" }}
                  >
                    {d.courses} courses
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white/40 text-xs mb-1 truncate">{d.unis}</p>
                    <h3 className="text-white text-xl md:text-2xl font-bold">{d.name}</h3>
                    <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">
                      Explore courses →
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button
            variant="outline-white"
            size="lg"
            className="rounded-full"
            asChild
          >
            <Link to="/study-destinations">See All Destinations →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StudyDestinations;
