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
        <circle cx="75%" cy="30%" r="40" fill="rgba(46,196,182,0.12)" />
        <circle cx="80%" cy="45%" r="30" fill="rgba(46,196,182,0.10)" />
        <circle cx="70%" cy="50%" r="25" fill="rgba(46,196,182,0.08)" />
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
        <polygon points="85,15 65,55 105,55" fill="rgba(255,255,255,0.08)" />
        <polygon points="85,25 72,50 98,50" fill="rgba(255,255,255,0.06)" />
        <line x1="60" y1="55" x2="110" y2="55" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
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
        <polygon points="85,10 70,75 100,75" fill="rgba(107,63,160,0.15)" />
        <line x1="85" y1="10" x2="85" y2="5" stroke="rgba(107,63,160,0.12)" strokeWidth="3" />
        <rect x="74" y="75" width="22" height="5" rx="1" fill="rgba(107,63,160,0.10)" />
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
        <ellipse cx="80" cy="40" rx="30" ry="35" fill="rgba(46,196,182,0.10)" />
        <ellipse cx="75" cy="35" rx="20" ry="25" fill="rgba(46,196,182,0.08)" />
        <path d="M70 35 Q80 15 90 35 Q80 22 70 35Z" fill="rgba(46,196,182,0.12)" />
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
        <rect x="60" y="30" width="14" height="30" rx="2" fill="rgba(255,255,255,0.08)" />
        <rect x="78" y="25" width="12" height="35" rx="2" fill="rgba(255,255,255,0.06)" />
        <rect x="94" y="35" width="10" height="25" rx="2" fill="rgba(255,255,255,0.08)" />
      </>
    ),
  },
];

const StudyDestinations = () => {
  return (
    <section className="relative" style={{ backgroundColor: "#0a0d24" }}>
      {/* Subtle top separator */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />

      {/* Glow effects */}
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

        {/* Compact bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 auto-rows-[180px] md:auto-rows-[200px]" style={{ maxHeight: "500px" }}>
          {destinations.map((d, i) => {
            const gridClass = i === 0
              ? "col-span-2 md:col-span-3 md:row-span-2"
              : i <= 2
              ? "col-span-1 md:col-span-3"
              : "col-span-1 md:col-span-3";

            return (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={gridClass}
              >
                <Link
                  to={`/study-destinations/${d.slug}`}
                  className="relative block h-full rounded-xl overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(135deg, #1a1f4d 0%, #0a0d24 100%)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    maxHeight: i === 0 ? "400px" : "200px",
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
                    style={{ boxShadow: "inset 0 0 40px rgba(46,196,182,0.08)" }} />

                  {/* SVG decoration */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    {d.shape}
                  </svg>

                  {/* Country code badge */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: "rgba(255,255,255,0.10)" }}>
                    {d.code}
                  </div>

                  {/* Course count badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-medium"
                    style={{ color: "#2EC4B6", border: "1px solid rgba(46,196,182,0.30)" }}>
                    {d.courses} courses
                  </div>

                  {/* Bottom content with dark gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4"
                    style={{ background: "linear-gradient(to top, rgba(10,13,36,0.9) 0%, transparent 100%)" }}>
                    <h3 className="text-white text-lg md:text-2xl font-bold">{d.name}</h3>
                    <span className="text-white/60 text-xs font-medium group-hover:text-white transition-colors">
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
