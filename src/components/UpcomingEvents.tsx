import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const events = [
  {
    title: "The Applyza Experience — Nairobi",
    day: "14",
    month: "MAR",
    year: "2026",
    location: "Nairobi, Kenya",
    description: "Meet top UK university representatives, attend expert panels on study abroad options, and get one-on-one guidance from our counsellors.",
    type: "In-Person",
    time: "10:00 AM — 4:00 PM",
    attendees: "500+",
  },
  {
    title: "The Applyza Experience — Accra",
    day: "21",
    month: "MAR",
    year: "2026",
    location: "Accra, Ghana",
    description: "Explore scholarships, learn about visa requirements, and discover programmes tailored to your career goals.",
    type: "In-Person",
    time: "11:00 AM — 5:00 PM",
    attendees: "300+",
  },
  {
    title: "The Applyza Experience — Lagos",
    day: "11",
    month: "APR",
    year: "2026",
    location: "Lagos, Nigeria",
    description: "Our biggest event of the season. Speak directly with admissions teams and get your application reviewed on the spot.",
    type: "In-Person",
    time: "9:00 AM — 5:00 PM",
    attendees: "1,000+",
  },
];

const UpcomingEvents = () => {
  const featured = events[0];
  const rest = events.slice(1);

  return (
    <section className="bg-white">
      {/* Subtle top separator */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />
      <div className="container py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3"
              style={{ background: "rgba(107,63,160,0.1)", color: "#6B3FA0" }}>
              <Calendar size={12} /> Mark Your Calendar
            </span>
            <h2 className="text-xl md:text-3xl font-extrabold text-primary mb-2">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground max-w-xl text-sm">
              Join us at events across the globe. Meet university representatives and get your questions answered.
            </p>
          </div>
          <Button className="rounded-full shrink-0" style={{ background: "#1B2150" }} asChild>
            <Link to="/events">View All Events →</Link>
          </Button>
        </div>

        {/* Bento layout */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl p-5 md:p-6 flex flex-col justify-between min-h-[300px]"
            style={{ background: "linear-gradient(135deg, #1B2150, #0a0d24)" }}
          >
            <CardGlow spread={40} proximity={64} borderWidth={2} />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{ background: "#2EC4B6", color: "#0a0d24" }}>
                  Featured Event
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  {featured.type}
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="shrink-0 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#2EC4B6" }}>{featured.month}</p>
                  <p className="text-4xl font-extrabold text-white leading-none mt-1">{featured.day}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-snug mb-1.5">{featured.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{featured.description}</p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex flex-wrap items-center gap-4 text-[10px] mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                <span className="inline-flex items-center gap-1"><Clock size={10} /> {featured.time}</span>
                <span className="inline-flex items-center gap-1"><MapPin size={10} /> {featured.location}</span>
                <span className="inline-flex items-center gap-1"><Users size={10} /> {featured.attendees} expected</span>
              </div>
              <Button className="rounded-full" style={{ background: "#2EC4B6", color: "#0a0d24" }} asChild>
                <Link to="/events">Register Now — Free →</Link>
              </Button>
            </div>
          </motion.div>

          {/* Smaller cards */}
          <div className="flex flex-col gap-5">
            {rest.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative bg-card rounded-xl p-4 flex items-start gap-3 hover-lift transition-all duration-300"
                style={{ border: "1px solid hsl(230 25% 93%)" }}
              >
                <CardGlow spread={30} proximity={48} borderWidth={2} />
                <div className="shrink-0 w-14 h-14 rounded-lg flex flex-col items-center justify-center"
                  style={{ background: "hsl(230 33% 97%)" }}>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">{event.month}</span>
                  <span className="text-xl font-extrabold text-primary leading-none">{event.day}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5"
                    style={{ background: "rgba(46,196,182,0.1)", color: "#2EC4B6" }}>
                    {event.type}
                  </span>
                  <h3 className="font-bold text-primary text-sm leading-snug mb-1">{event.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock size={9} /> {event.time}</span>
                    <span className="inline-flex items-center gap-1"><MapPin size={9} /> {event.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Link to="/events" className="font-semibold text-sm hover:underline" style={{ color: "#2EC4B6" }}>
            See more events →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
