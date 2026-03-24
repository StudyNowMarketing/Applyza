import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MovingBorderButton } from "@/components/ui/MovingBorder";
import { Checkbox } from "@/components/ui/checkbox";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { MapPin, Calendar, GraduationCap } from "lucide-react";

const studyLevels = ["Undergraduate", "Postgraduate"];
const countries = ["United Kingdom", "Germany", "France", "Ireland", "Malta", "Netherlands"];

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="Scholarships & Funding | Study Abroad Financial Support | Applyza" description="Browse scholarships from partner universities. Tuition discounts, merit awards, and funding opportunities for international students." path="/scholarships" />
      <Navbar solid />

      {/* Dark Hero */}
      <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
        <SparklesCore className="absolute inset-0 z-[1]" background="transparent" particleColor="#6B3FA0" particleDensity={60} minSize={0.4} maxSize={1.5} speed={1.5} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.4), transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(265 44% 44% / 0.3), transparent 70%)" }} />
        </div>
        <div className="container relative z-10 pt-20">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">Scholarships</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">Scholarships & Funding</h1>
          <p className="text-white/60 text-sm sm:text-base max-w-xl">
            Make your education more affordable. Browse scholarships from our partner universities.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-card border-b border-border">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row gap-5">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Study Level</p>
              <div className="flex gap-4">
                {studyLevels.map((level) => (
                  <label key={level} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={selectedLevels.includes(level)} onCheckedChange={() => toggleLevel(level)} className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary rounded" />
                    <span className="text-foreground">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Country</p>
              <div className="flex flex-wrap gap-4">
                {countries.map((country) => (
                  <label key={country} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={selectedCountries.includes(country)} onCheckedChange={() => toggleCountry(country)} className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary rounded" />
                    <span className="text-foreground">{country}</span>
                  </label>
                ))}
              </div>
            </div>
            {(selectedLevels.length > 0 || selectedCountries.length > 0) && (
              <button onClick={() => { setSelectedLevels([]); setSelectedCountries([]); }} className="text-xs text-muted-foreground hover:text-secondary transition-colors self-end">
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scholarships */}
      <section className="bg-background py-10 flex-1">
        <div className="container">
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
              <p className="text-sm text-muted-foreground mb-5">Showing {filtered.length} scholarship{filtered.length !== 1 ? "s" : ""}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((s, i) => (
                  <motion.div key={s.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 p-5 flex gap-4 card-glow">
                    {/* Amount */}
                    <div className="shrink-0 flex flex-col items-center justify-center min-w-[80px]">
                      {s.amount && (
                        <span className="text-xl font-bold text-secondary leading-tight text-center">{s.amount}</span>
                      )}
                    </div>
                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-primary leading-snug mb-1">{s.title}</h3>
                      <p className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1">
                        <GraduationCap size={12} /> {s.university_name}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-2">
                        {s.country && <span className="flex items-center gap-1"><MapPin size={11} /> {s.country}</span>}
                        {s.study_level && <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium text-[11px]">{s.study_level}</span>}
                        {s.deadline && <span className="flex items-center gap-1"><Calendar size={11} /> {s.deadline}</span>}
                      </div>
                      {s.eligibility && <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">{s.eligibility}</p>}
                      <Link to="/book-a-consultation" className="text-secondary text-sm font-semibold hover:underline">
                        Apply →
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm mb-4">No scholarships match your criteria. Try adjusting your filters or ask our counsellors about funding options.</p>
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
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Need Help Finding Funding?</h2>
          <p className="text-white/80 text-sm mb-5">Our counsellors can help you identify scholarships and bursaries you're eligible for.</p>
          <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 font-semibold px-8" asChild>
            <Link to="/book-a-consultation">Book a Free Consultation</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Scholarships;
