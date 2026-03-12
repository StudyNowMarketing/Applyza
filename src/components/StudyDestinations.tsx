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
    landmark: (
      // Big Ben silhouette
      <svg viewBox="0 0 120 160" fill="none" className="absolute right-4 bottom-8 h-[140px] w-auto opacity-[0.15] pointer-events-none">
        <rect x="48" y="20" width="24" height="130" rx="2" fill="white"/>
        <rect x="44" y="140" width="32" height="10" rx="1" fill="white"/>
        <rect x="40" y="148" width="40" height="8" rx="1" fill="white"/>
        <rect x="52" y="10" width="16" height="14" rx="1" fill="white"/>
        <polygon points="60,0 50,10 70,10" fill="white"/>
        <rect x="54" y="30" width="12" height="16" rx="6" fill="rgba(0,0,0,0.3)"/>
        <line x1="60" y1="32" x2="60" y2="44" stroke="white" strokeWidth="1"/>
        <line x1="55" y1="38" x2="65" y2="38" stroke="white" strokeWidth="1"/>
        <rect x="50" y="55" width="20" height="3" rx="1" fill="white"/>
        <rect x="50" y="75" width="20" height="3" rx="1" fill="white"/>
        <rect x="50" y="95" width="20" height="3" rx="1" fill="white"/>
        <rect x="50" y="115" width="20" height="3" rx="1" fill="white"/>
      </svg>
    ),
  },
  {
    name: "Germany",
    code: "DE",
    slug: "germany",
    courses: "1,800+",
    unis: "TU Munich, Heidelberg, LMU",
    landmark: (
      // Brandenburg Gate silhouette
      <svg viewBox="0 0 140 100" fill="none" className="absolute right-3 bottom-8 h-[100px] w-auto opacity-[0.15] pointer-events-none">
        <rect x="10" y="25" width="10" height="65" rx="1" fill="white"/>
        <rect x="30" y="25" width="10" height="65" rx="1" fill="white"/>
        <rect x="50" y="25" width="10" height="65" rx="1" fill="white"/>
        <rect x="70" y="25" width="10" height="65" rx="1" fill="white"/>
        <rect x="90" y="25" width="10" height="65" rx="1" fill="white"/>
        <rect x="110" y="25" width="10" height="65" rx="1" fill="white"/>
        <rect x="5" y="18" width="120" height="8" rx="1" fill="white"/>
        <rect x="5" y="88" width="120" height="6" rx="1" fill="white"/>
        <rect x="45" y="5" width="40" height="14" rx="1" fill="white"/>
        <polygon points="65,0 55,5 75,5" fill="white"/>
      </svg>
    ),
  },
  {
    name: "France",
    code: "FR",
    slug: "france",
    courses: "1,200+",
    unis: "Sorbonne, Sciences Po, HEC",
    landmark: (
      // Eiffel Tower silhouette
      <svg viewBox="0 0 80 160" fill="none" className="absolute right-6 bottom-8 h-[120px] w-auto opacity-[0.15] pointer-events-none">
        <polygon points="40,0 20,155 60,155" fill="white"/>
        <rect x="15" y="155" width="50" height="5" rx="1" fill="white"/>
        <rect x="26" y="100" width="28" height="4" rx="1" fill="white"/>
        <rect x="30" y="60" width="20" height="3" rx="1" fill="white"/>
        <ellipse cx="40" cy="45" rx="6" ry="8" fill="rgba(0,0,0,0.4)"/>
        <rect x="22" y="120" width="36" height="4" rx="1" fill="white"/>
      </svg>
    ),
  },
  {
    name: "Ireland",
    code: "IE",
    slug: "ireland",
    courses: "900+",
    unis: "Trinity College, UCD, DCU",
    landmark: (
      // Celtic harp silhouette
      <svg viewBox="0 0 80 110" fill="none" className="absolute right-4 bottom-8 h-[100px] w-auto opacity-[0.15] pointer-events-none">
        <path d="M25 100 Q10 60 25 20 Q35 5 50 5 Q65 5 60 25" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <rect x="22" y="95" width="40" height="8" rx="4" fill="white"/>
        <line x1="30" y1="95" x2="55" y2="25" stroke="white" strokeWidth="1.5"/>
        <line x1="35" y1="95" x2="57" y2="30" stroke="white" strokeWidth="1.5"/>
        <line x1="40" y1="95" x2="59" y2="35" stroke="white" strokeWidth="1.5"/>
        <line x1="45" y1="95" x2="60" y2="42" stroke="white" strokeWidth="1.5"/>
        <line x1="50" y1="95" x2="60" y2="50" stroke="white" strokeWidth="1.5"/>
        <line x1="55" y1="95" x2="60" y2="60" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: "Malta",
    code: "MT",
    slug: "malta",
    courses: "400+",
    unis: "University of Malta, MCAST",
    landmark: (
      // Church dome skyline silhouette
      <svg viewBox="0 0 140 100" fill="none" className="absolute right-3 bottom-8 h-[100px] w-auto opacity-[0.15] pointer-events-none">
        <rect x="10" y="50" width="25" height="45" rx="1" fill="white"/>
        <path d="M10 50 Q22 30 35 50" fill="white"/>
        <rect x="19" y="25" width="4" height="10" fill="white"/>
        <line x1="21" y1="22" x2="21" y2="25" stroke="white" strokeWidth="2"/>
        <rect x="50" y="40" width="35" height="55" rx="1" fill="white"/>
        <path d="M50 40 Q67 15 85 40" fill="white"/>
        <rect x="64" y="8" width="4" height="10" fill="white"/>
        <line x1="66" y1="4" x2="66" y2="8" stroke="white" strokeWidth="2"/>
        <rect x="100" y="55" width="20" height="40" rx="1" fill="white"/>
        <path d="M100 55 Q110 42 120 55" fill="white"/>
      </svg>
    ),
  },
];

const StudyDestinations = () => {
  return (
    <section className="relative" style={{ backgroundColor: "#0a0d24" }}>
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />

      <div className="absolute top-[10%] right-[-5%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(46,196,182,0.10)", filter: "blur(120px)" }} />
      <div className="absolute bottom-[10%] left-[-5%] w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(107,63,160,0.15)", filter: "blur(100px)" }} />

      <div className="container relative z-10 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="inline-block text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-3"
            style={{ color: "#2EC4B6", backgroundColor: "rgba(46,196,182,0.10)" }}>
            Popular Destinations
          </span>
          <h2 className="text-xl md:text-3xl font-extrabold text-white mb-2">
            Where Will You{" "}
            <span style={{ color: "#2EC4B6" }}>Study?</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm">
            Explore top study destinations and find the perfect place for your academic journey.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {destinations.map((d, i) => {
            const gridClass = i === 0
              ? "col-span-2 md:col-span-3 md:row-span-2"
              : i <= 2
              ? "col-span-1 md:col-span-3"
              : "col-span-1 md:col-span-3";

            const cardHeight = i === 0 ? "280px" : "180px";

            return (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={gridClass}
                style={{ height: i === 0 ? "calc(180px + 180px + 12px)" : cardHeight }}
              >
                <Link
                  to={`/study-destinations/${d.slug}`}
                  className="relative block h-full rounded-xl overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: "#0f1635",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
                    style={{ boxShadow: "inset 0 0 40px rgba(46,196,182,0.08)" }} />

                  {/* Landmark silhouette */}
                  {d.landmark}

                  {/* Country code badge */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: "rgba(255,255,255,0.10)" }}>
                    {d.code}
                  </div>

                  {/* Course count badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-medium z-10"
                    style={{ color: "#2EC4B6", border: "1px solid rgba(46,196,182,0.30)", backgroundColor: "rgba(15,22,53,0.8)" }}>
                    {d.courses} courses
                  </div>

                  {/* Bottom gradient overlay + content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4"
                    style={{ background: "linear-gradient(to top, #0f1635 0%, rgba(15,22,53,0.95) 40%, transparent 100%)" }}>
                    <h3 className="text-white text-xl font-bold">{d.name}</h3>
                    <span className="text-sm font-medium group-hover:text-white transition-colors" style={{ color: "#2EC4B6" }}>
                      Explore courses →
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-8">
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
