import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MovingBorderButton } from "@/components/ui/MovingBorder";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, GraduationCap, BookOpen, Sparkles, ArrowRight } from "lucide-react";

const studyLevels = ["Undergraduate", "Postgraduate"];
const countries = [
  "United Kingdom", "Germany", "France", "Ireland",
  "Malta", "Netherlands", "Italy", "Spain",
  "Canada", "Australia", "Hungary", "Poland",
];

const stats = [
  { value: "£1M+", label: "Awarded to Students" },
  { value: "200+", label: "Tuition Discounts" },
  { value: "16", label: "Countries Covered" },
  { value: "Free", label: "No Application Fees" },
];

const howItWorks = [
  { title: "We Match You to Available Tuition Discounts", desc: "During your consultation, we review your academic profile, nationality, and chosen programme to identify every tuition discount you're eligible for — including ones most students never find on their own." },
  { title: "We Handle the Application Paperwork", desc: "Many tuition discounts require supporting documents, personal statements, or separate forms. Our team guides you through every requirement and reviews your submission before it goes in." },
  { title: "Discounts Are Applied at Offer Stage", desc: "Once you receive a university offer, confirmed discounts are applied directly to your tuition fees. No chasing, no confusion — we coordinate with the admissions team on your behalf." },
];

const Scholarships = () => {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const { data: scholarships, isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scholarships")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const toggleLevel = (level: string) =>
    setSelectedLevels((prev) => prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]);

  const toggleCountry = (country: string) =>
    setSelectedCountries((prev) => prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]);

  const filtered = scholarships?.filter((s) => {
    if (selectedLevels.length > 0 && !selectedLevels.some((l) => s.study_level?.includes(l))) return false;
    if (selectedCountries.length > 0 && !selectedCountries.includes(s.country || "")) return false;
    return true;
  });

  const hasActiveFilters = selectedLevels.length > 0 || selectedCountries.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Scholarships & Funding | Study Abroad Financial Support | Applyza"
        description="Browse tuition discounts and funding from our partner universities. Merit awards, bursaries, and funding opportunities for international students — free to apply."
        path="/scholarships"
      />
      <Navbar solid />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "#0a0d24" }}>
        <SparklesCore
          className="absolute inset-0 z-[1]"
          background="transparent"
          particleColor="#6B3FA0"
          particleDensity={60}
          minSize={0.4}
          maxSize={1.5}
          speed={1.5}
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.4), transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, hsl(265 44% 44% / 0.3), transparent 70%)" }} />
        </div>

        <div className="container relative z-10 pt-24 pb-12">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white/60 text-sm">Scholarships</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-5 mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "rgba(46,196,182,0.12)", border: "1px solid rgba(46,196,182,0.25)", color: "#2EC4B6" }}
          >
            <Sparkles size={11} />
            Tuition Discounts & Funding — Free
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-3 max-w-2xl leading-tight"
          >
            Find Tuition Discounts That Actually Apply to You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-white/60 text-sm sm:text-base max-w-xl mb-6 leading-relaxed"
          >
            We match you to tuition discounts and funding you're eligible for — from merit awards to bursaries across 200+ partner universities. No fees, no guesswork.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button variant="teal" size="sm" className="rounded-full" asChild>
              <Link to="/book-a-consultation">Find My Tuition Discounts</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-white/70 hover:text-white border border-white/15 hover:border-white/30"
              asChild
            >
              <a href="#browse">Browse Discounts <ArrowRight size={13} className="ml-1" /></a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ background: "#0f1230" }}>
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
                <div className="text-xs text-white/50 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="bg-background">
        <div className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto border-l-4 border-secondary pl-6 mb-10"
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Tuition Discounts You Actually Qualify For</h2>
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">
              Most students miss dozens of tuition discounts and awards they were eligible for. We take a different approach — we start with your profile and work backwards, identifying every discount, bursary, and funding opportunity available to you specifically.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              All discounts listed here are from our partner universities. Our counsellors can also identify funding from government programmes, foundations, and country-specific awards that aren't listed publicly.
            </p>
          </motion.div>

          {/* How it works */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-base font-bold text-foreground text-center mb-6">How We Help You Secure Funding</h3>
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-4 relative"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 text-white text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, hsl(169 63% 47%), hsl(169 63% 40%))" }}
                  >
                    {i + 1}
                  </div>
                  {i < howItWorks.length - 1 && <div className="w-0.5 flex-1 bg-secondary/20 mt-1" />}
                </div>
                <div className="pb-8">
                  <h4 className="font-bold text-foreground text-base">{step.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

      {/* Filters + Results */}
      <section id="browse" className="bg-background py-10 flex-1">
        <div className="container">

          {/* Filter bar — removed per user request */}
          {false && <div className="mb-8 p-5 bg-card border border-border rounded-2xl">
            <div className="flex flex-col gap-5">
              {/* Study level */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Study Level</p>
                <div className="flex flex-wrap gap-2">
                  {studyLevels.map((level) => {
                    const active = selectedLevels.includes(level);
                    return (
                      <button
                        key={level}
                        onClick={() => toggleLevel(level)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 border"
                        style={active
                          ? { background: "rgba(46,196,182,0.15)", borderColor: "#2EC4B6", color: "#2EC4B6" }
                          : { background: "transparent", borderColor: "rgba(255,255,255,0.1)", color: "var(--muted-foreground)" }
                        }
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Country */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Country</p>
                <div className="flex flex-wrap gap-2">
                  {countries.map((country) => {
                    const active = selectedCountries.includes(country);
                    return (
                      <button
                        key={country}
                        onClick={() => toggleCountry(country)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 border"
                        style={active
                          ? { background: "rgba(107,63,160,0.15)", borderColor: "#6B3FA0", color: "#a78bfa" }
                          : { background: "transparent", borderColor: "rgba(255,255,255,0.1)", color: "var(--muted-foreground)" }
                        }
                      >
                        {country}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clear */}
              {hasActiveFilters && (
                <button
                  onClick={() => { setSelectedLevels([]); setSelectedCountries([]); }}
                  className="text-xs text-muted-foreground hover:text-secondary transition-colors self-start"
                >
                  Clear all filters ×
                </button>
              )}
            </div>
          </div>}

          {/* Results */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card rounded-xl p-5 animate-pulse border border-border flex gap-4">
                  <div className="w-20 h-16 bg-muted rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-muted rounded" />
                    <div className="h-3 w-1/2 bg-muted rounded" />
                    <div className="h-3 w-1/3 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered && filtered.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-5">
                Showing <span className="text-foreground font-semibold">{filtered.length}</span> tuition discount{filtered.length !== 1 ? "s" : ""}
                {hasActiveFilters && " — matching your filters"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden card-glow"
                  >
                    {/* Top accent bar */}
                    <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(169 63% 47%), hsl(265 44% 44%))" }} />

                    <div className="p-5 flex gap-4">
                      {/* Amount */}
                      <div className="shrink-0 flex flex-col items-center justify-start pt-1 min-w-[72px]">
                        {s.amount && (
                          <span className="text-xl font-bold text-secondary leading-tight text-center">{s.amount}</span>
                        )}
                        {s.amount && (
                          <span className="text-[10px] text-muted-foreground mt-0.5">discount</span>
                        )}
                      </div>

                      {/* Vertical separator */}
                      <div className="w-px bg-border shrink-0" />

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-foreground leading-snug mb-1">{s.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                          <GraduationCap size={11} className="shrink-0" /> {s.university_name}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                          {s.country && (
                            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                              <MapPin size={10} /> {s.country}
                            </span>
                          )}
                          {s.study_level && (
                            <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-semibold text-[10px]">
                              {s.study_level}
                            </span>
                          )}
                          {s.deadline && (
                            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                              <Calendar size={10} /> {s.deadline}
                            </span>
                          )}
                        </div>
                        {s.eligibility && (
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{s.eligibility}</p>
                        )}
                        <Link
                          to="/book-a-consultation"
                          className="inline-flex items-center gap-1 text-secondary text-xs font-semibold hover:gap-2 transition-all"
                        >
                          Apply via Applyza <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <BookOpen size={20} className="text-muted-foreground" />
              </div>
              <p className="text-foreground font-semibold mb-1">No scholarships match your filters</p>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                Try adjusting your filters or ask our counsellors — they can identify funding that isn't listed here.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" size="sm" onClick={() => { setSelectedLevels([]); setSelectedCountries([]); }}>
                  Clear Filters
                </Button>
                <MovingBorderButton to="/book-a-consultation" className="px-5 py-2 text-sm">
                  Ask About Funding
                </MovingBorderButton>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-10" style={{ background: "linear-gradient(135deg, hsl(169 63% 47%), hsl(169 63% 40%))" }}>
        <div className="container text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Not Sure What You Qualify For?</h2>
          <p className="text-white/80 text-sm mb-5 max-w-md mx-auto">
            Book a free consultation and we'll map out every tuition discount and award you're eligible for based on your specific profile.
          </p>
          <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 font-semibold px-8" asChild>
            <Link to="/book-a-consultation">Find My Tuition Discounts — Free</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Scholarships;
