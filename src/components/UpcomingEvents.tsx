import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const events = [
  {
    title: "The Applyza Xperience — Lagos",
    day: "03",
    month: "MAY",
    year: "2026",
    location: "Lagos, Nigeria",
    description: "Our biggest event of the season. Speak directly with admissions teams and get your application reviewed on the spot.",
  },
  {
    title: "The Applyza Xperience — Nairobi",
    day: "17",
    month: "MAY",
    year: "2026",
    location: "Nairobi, Kenya",
    description: "Meet university representatives from the UK, Europe, and North America, attend expert panels on study abroad options, and get one-on-one guidance from our counsellors.",
  },
  {
    title: "The Applyza Xperience — Accra",
    day: "07",
    month: "JUN",
    year: "2026",
    location: "Accra, Ghana",
    description: "Explore tuition discounts, learn about visa requirements, and discover programmes tailored to your career goals.",
  },
];

const UpcomingEvents = () => {
  return (
    <section className="relative">
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(46,196,182,0.12)", border: "1px solid rgba(46,196,182,0.25)", color: "#2EC4B6" }}
          >
            Free to Attend
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="text-2xl md:text-4xl font-extrabold text-white mb-4"
          >
            The Applyza Xperience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Join us at events across the globe. Meet university representatives face-to-face, attend expert panels, and leave with a clear plan — all in one day.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex border border-white/10"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
            >
              {/* Date column */}
              <div className="shrink-0 w-24 flex flex-col items-center justify-center gradient-purple text-accent-foreground py-5">
                <span className="text-3xl font-extrabold leading-none">{event.day}</span>
                <span className="text-xs font-semibold tracking-wider mt-1">{event.month}</span>
                <span className="text-[10px] text-white/60 mt-0.5">{event.year}</span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-bold text-white text-sm mb-1 leading-snug">{event.title}</h3>
                  <p className="text-xs text-white/50 flex items-center gap-1 mb-2">
                    <MapPin size={12} /> {event.location}
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed mb-4">{event.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground w-fit text-xs"
                  asChild
                >
                  <Link to="/events">Register Free →</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Button variant="teal" size="lg" className="rounded-full" asChild>
            <Link to="/events">See All Events →</Link>
          </Button>
          <Link
            to="/book-a-consultation"
            className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors"
          >
            Can't attend? Book a free online consultation <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
