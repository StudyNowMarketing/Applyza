import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";
import {
  Globe, Clock, Banknote, Briefcase, MapPin, CheckCircle, BookOpen, ArrowLeft, FileText, Wrench,
} from "lucide-react";

import ukImg from "@/assets/destinations/uk.jpg";
import germanyImg from "@/assets/destinations/germany.jpg";
import franceImg from "@/assets/destinations/france.jpg";
import irelandImg from "@/assets/destinations/ireland.jpg";
import maltaImg from "@/assets/destinations/malta.jpg";
import netherlandsImg from "@/assets/destinations/netherlands.jpg";

const heroImages: Record<string, string> = {
  "united-kingdom": ukImg,
  germany: germanyImg,
  france: franceImg,
  ireland: irelandImg,
  malta: maltaImg,
  netherlands: netherlandsImg,
};

const LEVEL_COLORS: Record<string, string> = {
  Postgraduate: "bg-secondary/15 text-secondary",
  Undergraduate: "bg-accent/15 text-accent",
  Foundation: "bg-orange-100 text-orange-700",
  "Top-Up": "bg-blue-100 text-blue-700",
};

type Course = {
  id: string;
  title: string;
  slug: string;
  university_name: string;
  country: string;
  city: string;
  subject_area: string;
  study_level: string;
  duration: string | null;
  tuition_fee: number | null;
  intake_dates: string | null;
  scholarship_available: boolean | null;
};

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: destination, isLoading } = useQuery({
    queryKey: ["destination", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_destinations")
        .select("*")
        .eq("slug", slug!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: courses = [] } = useQuery({
    queryKey: ["destination-courses", destination?.country],
    queryFn: async () => {
      const { data } = await supabase
        .from("courses")
        .select("id, title, slug, university_name, country, city, subject_area, study_level, duration, tuition_fee, intake_dates, scholarship_available")
        .eq("country", destination!.country)
        .limit(4);
      return (data ?? []) as Course[];
    },
    enabled: !!destination,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar solid />
        <div className="pt-20 animate-pulse">
          <div className="h-32" style={{ background: "#0a0d24" }} />
          <div className="container py-8 space-y-4">
            <div className="h-6 bg-muted rounded w-60" />
            <div className="h-32 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar solid />
        <div className="container pt-28 py-20 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Globe size={28} className="text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Destination not found</h1>
          <p className="text-muted-foreground text-sm mb-4">The destination you're looking for doesn't exist or may have been removed.</p>
          <Button variant="teal" asChild>
            <Link to="/study-destinations"><ArrowLeft size={16} /> Back to Destinations</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const bgImage = heroImages[slug!] || ukImg;
  const whyCards = [
    { title: destination.why_study_here_1_title, desc: destination.why_study_here_1_desc },
    { title: destination.why_study_here_2_title, desc: destination.why_study_here_2_desc },
    { title: destination.why_study_here_3_title, desc: destination.why_study_here_3_desc },
    { title: destination.why_study_here_4_title, desc: destination.why_study_here_4_desc },
  ].filter((c) => c.title);

  const costCards = [destination.cost_city_1, destination.cost_city_2, destination.cost_city_3].filter(Boolean) as string[];

  const keyFacts = [
    { icon: Globe, label: "Language", value: destination.language },
    { icon: Clock, label: "Degree Duration", value: destination.degree_duration },
    { icon: Banknote, label: "Tuition Range", value: destination.tuition_range },
    { icon: Briefcase, label: "Post-Study Visa", value: destination.post_study_visa },
    { icon: MapPin, label: "Top Cities", value: destination.top_cities },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Study in ${destination.country} | Universities, Courses & Visa Guide | Applyza`}
        description={(destination.overview || "").substring(0, 155)}
        path={`/study-destinations/${slug}`}
      />
      <Navbar solid />

      {/* Dark Hero */}
      <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
        <SparklesCore className="absolute inset-0 z-[1]" background="transparent" particleColor="#2EC4B6" particleDensity={60} minSize={0.4} maxSize={1.5} speed={1.5} />
        <img src={bgImage} alt={destination.country} className="absolute inset-0 w-full h-full object-cover opacity-20" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,13,36,0.8), rgba(10,13,36,0.95))" }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.4), transparent 70%)" }} />
        </div>
        <div className="container relative z-10 pt-20">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/study-destinations" className="text-white/40 hover:text-white/60 text-sm">Study Destinations</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">{destination.country}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2"
          >
            Study in {destination.country}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-xl text-sm"
          >
            {destination.overview}
          </motion.p>
        </div>
      </section>

      {/* Key Facts */}
      <section className="bg-card border-b border-border">
        <div className="container py-5">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {keyFacts.map((fact) => (
              <div key={fact.label} className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <fact.icon size={16} className="text-secondary" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">{fact.label}</p>
                  <p className="text-sm font-bold text-foreground leading-tight">{fact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Study Here */}
      {whyCards.length > 0 && (
        <section className="bg-background py-8">
          <div className="container">
            <h2 className="text-xl font-bold text-primary mb-5">Why Study in {destination.country}?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {whyCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow"
                >
                  <CheckCircle className="text-secondary mb-2" size={20} />
                  <h3 className="text-sm font-bold text-primary mb-1">{card.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Visa Information */}
      <section className="bg-card py-8">
        <div className="container">
          <h2 className="text-xl font-bold text-primary mb-5">Visa Information</h2>
          <div className="max-w-3xl space-y-3">
            {[
              { icon: FileText, label: "Requirements", value: destination.visa_requirements },
              { icon: Banknote, label: "Visa Fee", value: destination.visa_fee },
              { icon: Wrench, label: "Work Rights", value: destination.visa_work_rights },
            ].map((item) => (
              item.value && (
                <div key={item.label} className="border-l-3 border-secondary bg-background rounded-r-xl p-4 flex items-start gap-3" style={{ borderLeftWidth: 3, borderLeftColor: "hsl(169 63% 47%)" }}>
                  <item.icon size={18} className="text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-foreground mb-0.5">{item.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.value}</p>
                  </div>
                </div>
              )
            ))}
          </div>
          <div className="max-w-3xl mt-5 bg-secondary rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-secondary-foreground font-semibold text-sm text-center sm:text-left">
              Need help with your visa? Our team has a 99% success rate.
            </p>
            <Button className="bg-white text-primary hover:bg-white/90 rounded-full shrink-0 font-semibold text-sm" asChild>
              <Link to="/book-a-consultation">Book a Visa Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cost of Living */}
      {costCards.length > 0 && (
        <section className="bg-background py-8">
          <div className="container">
            <h2 className="text-xl font-bold text-primary mb-5">Cost of Living</h2>
            <div className={`grid gap-4 max-w-3xl ${costCards.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
              {costCards.map((cost, i) => {
                const parts = cost.split(":");
                const city = parts[0]?.trim();
                const range = parts[1]?.trim();
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="bg-card rounded-xl p-4 border border-border text-center"
                  >
                    <MapPin className="mx-auto text-secondary mb-2" size={20} />
                    <h3 className="text-sm font-bold text-primary mb-1">{city}</h3>
                    <p className="text-lg font-bold text-foreground">{range}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Courses */}
      <section className="bg-card py-8">
        <div className="container">
          <h2 className="text-xl font-bold text-primary mb-5">Courses in {destination.country}</h2>

          {courses.length === 0 ? (
            <div className="bg-background rounded-xl p-6 text-center border border-border">
              <BookOpen className="mx-auto text-muted-foreground mb-3" size={28} />
              <p className="text-muted-foreground text-sm mb-3">
                We're adding courses for {destination.country} soon. In the meantime, book a consultation and our counsellors can help you find the right programme.
              </p>
              <Button variant="teal" size="sm" asChild>
                <Link to="/book-a-consultation">Book a Consultation</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div key={course.id} className="bg-background rounded-xl border border-border p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                    <p className="text-xs text-muted-foreground mb-1">{course.university_name}</p>
                    <h3 className="text-base font-bold text-primary leading-snug mb-2">{course.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {course.city}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${LEVEL_COLORS[course.study_level] ?? "bg-muted text-muted-foreground"}`}>
                        {course.study_level}
                      </span>
                    </div>
                    <p className="text-base font-bold text-foreground mb-2">
                      {course.tuition_fee ? `£${course.tuition_fee.toLocaleString()}` : "Contact us"}{" "}
                      {course.tuition_fee && <span className="text-xs font-normal text-muted-foreground">/ year</span>}
                    </p>
                    {course.scholarship_available && (
                      <Badge variant="secondary" className="mb-2 text-[11px]">Scholarship Available</Badge>
                    )}
                    <div className="flex gap-2 pt-1">
                      <Button variant="outline" size="sm" className="flex-1 text-xs" asChild>
                        <Link to={`/find-a-course/${course.slug}`}>View Details</Link>
                      </Button>
                      <Button variant="teal" size="sm" className="flex-1 text-xs" asChild>
                        <Link to="/book-a-consultation">Apply with Applyza</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link
                  to={`/find-a-course?country=${encodeURIComponent(destination.country)}`}
                  className="text-secondary font-semibold text-sm hover:underline"
                >
                  Search all {destination.country} courses →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-10" style={{ background: "linear-gradient(135deg, hsl(169 63% 47%), hsl(169 63% 40%))" }}>
        <div className="container text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Ready to Study in {destination.country}?</h2>
          <p className="text-white/80 text-sm mb-5">Find your perfect course or speak with an expert counsellor today.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 font-semibold px-8" asChild>
              <Link to={`/find-a-course?country=${encodeURIComponent(destination.country)}`}>
                Search {destination.country} Courses
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/10 px-8" asChild>
              <Link to="/book-a-consultation">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DestinationDetail;
