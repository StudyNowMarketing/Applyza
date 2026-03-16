import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InfiniteSlider } from "@/components/ui/InfiniteSlider";
import { useState } from "react";

const row1 = [
  { name: "York St John University", logo: "/logos/yorksj.png" },
  { name: "University of Sunderland", logo: "/logos/sunderland.png" },
  { name: "University of East London", logo: "/logos/uel.png" },
  { name: "University of Wolverhampton", logo: "/logos/wolverhampton.png" },
  { name: "Buckinghamshire New University", logo: "/logos/bucks.png" },
  { name: "Edge Hill University", logo: "/logos/edgehill.png" },
  { name: "Leeds Trinity University", logo: "/logos/leedstrinity.png" },
  { name: "Solent University", logo: "/logos/solent.png" },
  { name: "University of Law", logo: "/logos/ulaw.png" },
  { name: "University of Greenwich", logo: "/logos/greenwich.png" },
  { name: "Coventry University", logo: "/logos/coventry.png" },
  { name: "Middlesex University", logo: "/logos/middlesex.png" },
];

const row2 = [
  { name: "University of West London", logo: "/logos/uwl.png" },
  { name: "Wrexham University", logo: "/logos/wrexham.png" },
  { name: "University of Hertfordshire", logo: "/logos/hertfordshire.png" },
  { name: "University of Bedfordshire", logo: "/logos/bedfordshire.png" },
  { name: "De Montfort University", logo: "/logos/dmu.png" },
  { name: "Birmingham City University", logo: "/logos/bcu.png" },
  { name: "Anglia Ruskin University", logo: "/logos/aru.png" },
  { name: "University of Westminster", logo: "/logos/westminster.png" },
  { name: "London South Bank University", logo: "/logos/lsbu.png" },
  { name: "University of Central Lancashire", logo: "/logos/uclan.png" },
  { name: "University of Northampton", logo: "/logos/northampton.png" },
  { name: "University of Roehampton", logo: "/logos/roehampton.png" },
];

const regions = [
  { count: "80+", label: "UK Universities", color: "#2EC4B6" },
  { count: "50+", label: "European Institutions", color: "#6B3FA0" },
  { count: "20+", label: "North American", color: "#1B2150" },
];

function LogoCard({ name, logo }: { name: string; logo: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="flex items-center justify-center rounded-lg bg-white shrink-0"
      style={{
        border: "1px solid #E5E7EB",
        padding: "20px 32px",
        minWidth: "180px",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      {failed ? (
        <span className="text-sm font-semibold whitespace-nowrap" style={{ color: "#1B2150" }}>
          {name}
        </span>
      ) : (
        <img
          src={logo}
          alt={name}
          onError={() => setFailed(true)}
          className="h-[80px] w-auto object-contain"
        />
      )}
    </div>
  );
}

const PartnerUniversities = () => {
  return (
    <section className="bg-white">
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />
      <div className="container py-12 md:py-16">
        {/* Header + Regional stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10"
        >
          <div className="text-center lg:text-left">
            <div className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #6B3FA0, #1B2150)" }}>
              150+
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-foreground mt-1">
              Partner Universities
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-md">
              Accredited universities across the UK, Europe, North America, and beyond.
            </p>
          </div>

          <div className="flex gap-4 justify-center lg:justify-end">
            {regions.map((r) => (
              <div key={r.label} className="text-center rounded-xl border border-gray-100 px-5 py-3 card-glow">
                <div className="text-2xl font-bold" style={{ color: r.color }}>{r.count}</div>
                <div className="text-xs text-gray-500 mt-0.5">{r.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Logo slider rows */}
        <div className="relative space-y-4">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          <InfiniteSlider gap={24} duration={30} durationOnHover={60}>
            {row1.map((u) => (
              <LogoCard key={u.name} name={u.name} logo={u.logo} />
            ))}
          </InfiniteSlider>

          <InfiniteSlider gap={24} duration={35} durationOnHover={60} reverse>
            {row2.map((u) => (
              <LogoCard key={u.name} name={u.name} logo={u.logo} />
            ))}
          </InfiniteSlider>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            className="rounded-full"
            style={{ backgroundColor: "#1B2150" }}
            asChild
          >
            <Link to="/find-a-course">View All Partner Universities →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnerUniversities;
