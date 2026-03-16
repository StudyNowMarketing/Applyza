import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Flame, Award, TrendingUp, Users } from "lucide-react";

const scholarships = [
  {
    university: "University of Sunderland",
    name: "International Excellence Scholarship",
    discount: "£3,000",
    eligibility: "Available to international students with strong academic records applying for undergraduate or postgraduate programmes.",
    hot: true,
    deadline: "Sep 2026",
    location: "Sunderland, UK",
  },
  {
    university: "York St. John University",
    name: "Vice Chancellor's Scholarship",
    discount: "£2,500",
    eligibility: "Merit-based award for international students demonstrating academic excellence and community involvement.",
    hot: false,
    deadline: "Aug 2026",
    location: "York, UK",
  },
  {
    university: "Solent University",
    name: "Global Futures Bursary",
    discount: "£1,500",
    eligibility: "Open to all international fee-paying students enrolling in a full-time programme for the first time.",
    hot: true,
    deadline: "Jul 2026",
    location: "Southampton, UK",
  },
  {
    university: "University of East London",
    name: "UEL International Scholarship",
    discount: "£2,000",
    eligibility: "Available to high-achieving international students applying for full-time undergraduate or postgraduate courses.",
    hot: false,
    deadline: "Oct 2026",
    location: "London, UK",
  },
];

const stats = [
  { icon: Award, value: "50+", label: "Active Scholarships" },
  { icon: TrendingUp, value: "£2M+", label: "Total Value" },
  { icon: Users, value: "500+", label: "Students Funded" },
];

const ScholarshipsPreview = () => {
  return (
    <section style={{ background: "#f8f9fa" }}>
      {/* Subtle top separator */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />
      <div className="container py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3"
              style={{ background: "rgba(46,196,182,0.1)", color: "#2EC4B6" }}>
              <Award size={12} /> Funding Opportunities
            </span>
            <h2 className="text-xl md:text-3xl font-extrabold text-primary mb-2">
              Featured{" "}
              <span style={{ background: "linear-gradient(135deg, #2EC4B6, #1B9E93)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Scholarships
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-sm">
              Browse scholarships from our partner universities and make your education more affordable.
            </p>
          </div>
          <Button className="rounded-full shrink-0" style={{ background: "#1B2150" }} asChild>
            <Link to="/scholarships">Search All Scholarships →</Link>
          </Button>
        </div>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {scholarships.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative bg-card rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-5 group card-glow"
              style={{ border: "1px solid hsl(230 25% 93%)" }}
            >
              {s.hot && (
                <span className="absolute top-3 right-12 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                  <Flame size={10} /> Hot Deal
                </span>
              )}

              <div className="shrink-0 text-center min-w-[80px]">
                <p className="text-xl md:text-2xl font-extrabold" style={{ color: "#2EC4B6" }}>{s.discount}</p>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium mt-0.5">scholarship value</p>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-primary text-sm mb-0.5 leading-snug">{s.name}</h3>
                <p className="text-xs text-muted-foreground mb-1.5">{s.university}</p>
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Calendar size={9} /> {s.deadline}</span>
                  <span className="inline-flex items-center gap-1"><MapPin size={9} /> {s.location}</span>
                </div>
              </div>

              <Link to="/scholarships" className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: "rgba(46,196,182,0.1)", color: "#2EC4B6" }}>
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-14 mt-10">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl font-extrabold" style={{ color: "#2EC4B6" }}>{stat.value}</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipsPreview;
