import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    name: "United Kingdom",
    code: "GB",
    slug: "united-kingdom",
    courses: "2,500+",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
  },
  {
    name: "United States",
    code: "US",
    slug: "usa",
    courses: "3,000+",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
  },
  {
    name: "Canada",
    code: "CA",
    slug: "canada",
    courses: "1,500+",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80",
  },
  {
    name: "Germany",
    code: "DE",
    slug: "germany",
    courses: "1,800+",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
  },
  {
    name: "France",
    code: "FR",
    slug: "france",
    courses: "1,200+",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
  },
  {
    name: "Ireland",
    code: "IE",
    slug: "ireland",
    courses: "900+",
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=800&q=80",
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

        {/* 3x2 grid of top 6 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="relative block h-[220px] rounded-xl overflow-visible group transition-all duration-300 glow-card"
                style={{ border: "1px solid rgba(255,255,255,0.10)" }}
              >
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-xl" />

                <div className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white z-10"
                  style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
                  {d.code}
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-medium z-10"
                  style={{ color: "#2EC4B6", border: "1px solid rgba(46,196,182,0.40)", backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
                  {d.courses} courses
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <h3 className="text-white text-xl font-bold">{d.name}</h3>
                  <span className="text-sm font-medium group-hover:text-white transition-colors" style={{ color: "#2EC4B6" }}>
                    Explore courses →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
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
