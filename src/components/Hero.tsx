import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const filters = [
  { emoji: "🇬🇧", label: "UK" },
  { emoji: "🇩🇪", label: "Germany" },
  { emoji: "🇫🇷", label: "France" },
  { emoji: "🇮🇪", label: "Ireland" },
  { emoji: "🌍", label: "All" },
];

const badges = [
  "✓ 100% Free for Students",
  "✓ 99% Visa Success Rate",
  "✓ 3,000+ Students Placed",
  "✓ 150+ Partner Universities",
];

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] gradient-navy flex items-center overflow-hidden">
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/10 pointer-events-none" />

      <div className="container relative z-10 py-28 md:py-36">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-[48px] md:leading-tight font-extrabold text-primary-foreground mb-5"
          >
            The Smartest Way to Study Abroad
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-primary-foreground/70 text-base md:text-lg leading-relaxed mb-8 max-w-xl"
          >
            Discover thousands of courses across the UK, Europe, and beyond. Our AI-powered platform and expert counsellors guide you from your first search to your first day on campus — completely free.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex bg-primary-foreground rounded-full overflow-hidden shadow-2xl max-w-lg"
          >
            <input
              type="text"
              placeholder="Search courses, universities, or subjects..."
              className="flex-1 px-5 py-3.5 text-sm text-foreground bg-transparent outline-none placeholder:text-muted-foreground"
            />
            <Button variant="teal" className="rounded-full m-1 px-5">
              <Search size={18} />
            </Button>
          </motion.div>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-2 mt-5"
          >
            {filters.map((f) => (
              <button
                key={f.label}
                className="border border-primary-foreground/30 text-primary-foreground/80 hover:bg-primary-foreground/10 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
              >
                {f.emoji} {f.label}
              </button>
            ))}
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-x-4 gap-y-1 mt-8"
          >
            {badges.map((b) => (
              <span key={b} className="text-primary-foreground/50 text-xs font-medium">
                {b}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
