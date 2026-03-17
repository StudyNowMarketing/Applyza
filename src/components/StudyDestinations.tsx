import { motion } from "framer-motion";
import HandUnderline from "@/components/HandUnderline";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VideoBackground from "@/components/VideoBackground";
import { destinationVideos } from "@/lib/destinationVideos";

const destinations = [
  { name: "United Kingdom", code: "GB", slug: "united-kingdom", courses: "2,500+" },
  { name: "United States", code: "US", slug: "usa", courses: "3,000+" },
  { name: "Canada", code: "CA", slug: "canada", courses: "1,500+" },
  { name: "Germany", code: "DE", slug: "germany", courses: "1,800+" },
  { name: "France", code: "FR", slug: "france", courses: "1,200+" },
  { name: "Ireland", code: "IE", slug: "ireland", courses: "900+" },
];

const StudyDestinations = () => {
  return (
    <section className="relative" style={{ backgroundColor: "#0a0d24" }}>
      

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
            Where Will Your <HandUnderline>Story</HandUnderline> Take You?
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm">
            Explore destinations that match your ambitions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((d, i) => {
            const vid = destinationVideos.find((v) => v.slug === d.slug);
            return (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to={`/study-destinations/${d.slug}`}
                  className="relative block h-[220px] rounded-xl overflow-hidden group transition-all duration-300 card-glow"
                  style={{ border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  {vid ? (
                    <VideoBackground video={vid.video} image={vid.image} name={d.name} className="transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80" alt={d.name} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-xl" style={{ zIndex: 2 }} />

                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ zIndex: 10, backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
                    {d.code}
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-medium"
                    style={{ zIndex: 10, color: "#2EC4B6", border: "1px solid rgba(46,196,182,0.40)", backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
                    {d.courses} courses
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4" style={{ zIndex: 10 }}>
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
