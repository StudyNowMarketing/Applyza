import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const events = [
  {
    title: "The Applyza Experience — Nairobi",
    day: "14",
    month: "MAR",
    year: "2026",
    location: "Nairobi, Kenya",
    description: "Meet top UK university representatives, attend expert panels on study abroad options, and get one-on-one guidance from our counsellors.",
  },
  {
    title: "The Applyza Experience — Accra",
    day: "21",
    month: "MAR",
    year: "2026",
    location: "Accra, Ghana",
    description: "Explore scholarships, learn about visa requirements, and discover programmes tailored to your career goals.",
  },
  {
    title: "The Applyza Experience — Lagos",
    day: "11",
    month: "APR",
    year: "2026",
    location: "Lagos, Nigeria",
    description: "Our biggest event of the season. Speak directly with admissions teams and get your application reviewed on the spot.",
  },
];

const UpcomingEvents = () => {
  return (
    <section className="bg-background">
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-4">
            The Applyza Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join us at our events across the globe. Meet university representatives face-to-face, attend expert panels, and get your questions answered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex"
            >
              <div className="shrink-0 w-24 flex flex-col items-center justify-center gradient-purple text-accent-foreground">
                <span className="text-3xl font-extrabold leading-none">{event.day}</span>
                <span className="text-xs font-semibold tracking-wider mt-1">{event.month}</span>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-bold text-primary text-sm mb-1 leading-snug">{event.title}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                    <MapPin size={12} /> {event.location}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{event.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground w-fit text-xs"
                  asChild
                >
                  <Link to="/events">Register →</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/events" className="text-secondary font-semibold text-sm hover:underline">
            See All Events →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
