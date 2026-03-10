import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const filters = [
  { emoji: "🇬🇧", label: "UK", country: "United Kingdom" },
  { emoji: "🇩🇪", label: "Germany", country: "Germany" },
  { emoji: "🇫🇷", label: "France", country: "France" },
  { emoji: "🇮🇪", label: "Ireland", country: "Ireland" },
  { emoji: "🌍", label: "All", country: "" },
];

const badges = [
  "✓ 100% Free Service",
  "✓ AI-Powered Matching",
  "✓ Expert Counsellors",
  "✓ End-to-End Support",
];

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] gradient-navy flex items-center overflow-hidden">
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/10 pointer-events-none" />

      {/* Decorative elements on right side */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none hidden md:block">
        {/* Large teal circle */}
        <div className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full border-2 border-secondary/20" />
        <div className="absolute top-[30%] right-[15%] w-40 h-40 rounded-full border-2 border-secondary/15" />
        {/* Purple accent */}
        <div className="absolute bottom-1/4 right-[20%] w-32 h-32 rounded-full bg-accent/15" />
        <div className="absolute top-[20%] right-[5%] w-20 h-20 rounded-full bg-secondary/20" />
        {/* Dots grid */}
        <div className="absolute top-[45%] right-[25%] grid grid-cols-4 gap-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-secondary/30" />
          ))}
        </div>
        {/* Floating accent ring */}
        <div className="absolute bottom-[35%] right-[8%] w-48 h-48 rounded-full border-2 border-accent/15" />
      </div>

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

          {/* Search bar — wider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex bg-primary-foreground rounded-full overflow-hidden shadow-2xl w-full md:w-[80%]"
          >
            <input
              type="text"
              placeholder="Search courses, universities, or subjects..."
              className="flex-1 px-5 py-3.5 text-sm text-foreground bg-transparent outline-none placeholder:text-muted-foreground min-w-0"
            />
            <Button variant="teal" className="rounded-full m-1 px-5 shrink-0">
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
