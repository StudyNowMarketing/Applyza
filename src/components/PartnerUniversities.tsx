import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InfiniteSlider } from "@/components/ui/InfiniteSlider";
import { useState } from "react";

const row1 = [
  { name: "York St John University", logo: "https://logo.clearbit.com/yorksj.ac.uk" },
  { name: "University of Sunderland", logo: "https://logo.clearbit.com/sunderland.ac.uk" },
  { name: "University of East London", logo: "https://logo.clearbit.com/uel.ac.uk" },
  { name: "University of Wolverhampton", logo: "https://logo.clearbit.com/wlv.ac.uk" },
  { name: "Buckinghamshire New University", logo: "https://logo.clearbit.com/bucks.ac.uk" },
  { name: "Edge Hill University", logo: "https://logo.clearbit.com/edgehill.ac.uk" },
  { name: "Leeds Trinity University", logo: "https://logo.clearbit.com/leedstrinity.ac.uk" },
  { name: "Solent University", logo: "https://logo.clearbit.com/solent.ac.uk" },
  { name: "University of Law", logo: "https://logo.clearbit.com/law.ac.uk" },
  { name: "University of Greenwich", logo: "https://logo.clearbit.com/gre.ac.uk" },
  { name: "Coventry University", logo: "https://logo.clearbit.com/coventry.ac.uk" },
  { name: "Middlesex University", logo: "https://logo.clearbit.com/mdx.ac.uk" },
];

const row2 = [
  { name: "University of West London", logo: "https://logo.clearbit.com/uwl.ac.uk" },
  { name: "Wrexham University", logo: "https://logo.clearbit.com/wrexham.ac.uk" },
  { name: "University of Hertfordshire", logo: "https://logo.clearbit.com/herts.ac.uk" },
  { name: "University of Bedfordshire", logo: "https://logo.clearbit.com/beds.ac.uk" },
  { name: "De Montfort University", logo: "https://logo.clearbit.com/dmu.ac.uk" },
  { name: "Birmingham City University", logo: "https://logo.clearbit.com/bcu.ac.uk" },
  { name: "Anglia Ruskin University", logo: "https://logo.clearbit.com/aru.ac.uk" },
  { name: "University of Westminster", logo: "https://logo.clearbit.com/westminster.ac.uk" },
  { name: "London South Bank University", logo: "https://logo.clearbit.com/lsbu.ac.uk" },
  { name: "University of Central Lancashire", logo: "https://logo.clearbit.com/uclan.ac.uk" },
  { name: "University of Northampton", logo: "https://logo.clearbit.com/northampton.ac.uk" },
  { name: "University of Roehampton", logo: "https://logo.clearbit.com/roehampton.ac.uk" },
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
      className="flex items-center justify-center rounded-xl bg-white shrink-0 logo-card-hover"
      style={{
        border: "1px solid #E5E7EB",
        padding: "16px 24px",
        minWidth: "180px",
      }}
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
          className="h-[60px] w-auto object-contain"
          style={{
            filter: "grayscale(100%)",
            opacity: 0.6,
            transition: "filter 0.3s ease, opacity 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = "grayscale(0%)";
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "grayscale(100%)";
            e.currentTarget.style.opacity = "0.6";
          }}
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
