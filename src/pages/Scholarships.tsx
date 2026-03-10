import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

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
      <Navbar solid />

      {/* Hero */}
      <section className="bg-primary" style={{ minHeight: "35vh", display: "flex", alignItems: "flex-end" }}>
        <div className="container pb-12 pt-28">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/60">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem><BreadcrumbPage className="text-primary-foreground/80">Scholarships</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mt-4 mb-3">Scholarships & Funding</h1>
          <p className="text-primary-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Make your education more affordable. Browse scholarships from our partner universities.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-background border-b">
        <div className="container py-5">
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Study Level</p>
              <div className="flex gap-4">
                {studyLevels.map((level) => (
                  <label key={level} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={selectedLevels.includes(level)} onCheckedChange={() => toggleLevel(level)} />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Country</p>
              <div className="flex flex-wrap gap-4">
                {countries.map((country) => (
                  <label key={country} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={selectedCountries.includes(country)} onCheckedChange={() => toggleCountry(country)} />
                    <span>{country}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scholarships Grid */}
      <section className="bg-background py-12 md:py-16 flex-1">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-2xl h-64 animate-pulse" />
              ))}
            </div>
          ) : filtered && filtered.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">Showing {filtered.length} scholarship{filtered.length !== 1 ? "s" : ""}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((s, i) => (
                  <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border">
                    <p className="text-xs text-muted-foreground mb-1">{s.university_name}</p>
                    <h3 className="text-lg font-bold text-primary mb-3">{s.title}</h3>
                    {s.amount && (
                      <span className="inline-block bg-secondary/15 text-secondary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        {s.amount}
                      </span>
                    )}
                    {s.study_level && <p className="text-xs text-muted-foreground mb-2">{s.study_level}</p>}
                    {s.eligibility && <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3">{s.eligibility}</p>}
                    {s.deadline && <p className="text-xs text-muted-foreground mb-4">Deadline: {s.deadline}</p>}
                    <Link to="/book-a-consultation" className="text-secondary text-sm font-medium hover:underline">
                      Apply with Applyza →
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No scholarships match your filters. Try adjusting your criteria or book a consultation for personalised funding advice.</p>
              <Button variant="teal" className="rounded-full" asChild>
                <Link to="/book-a-consultation">Book a Free Consultation</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-14">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-accent-foreground mb-3">Need Help Finding Funding?</h2>
          <p className="text-accent-foreground/70 mb-6">Our counsellors can help you identify scholarships and bursaries you're eligible for.</p>
          <Button variant="teal" size="lg" className="rounded-full" asChild>
            <Link to="/book-a-consultation">Book a Free Consultation</Link>
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Scholarships;
