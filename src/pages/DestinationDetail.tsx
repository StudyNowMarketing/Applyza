import SEO from "@/components/SEO";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";
import {
  Globe, Clock, Banknote, Briefcase, MapPin, CheckCircle, BookOpen, ArrowLeft, FileText, Scale, Wrench,
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
      <div className="min-h-screen">
        <Navbar solid />
        <div className="pt-20 animate-pulse">
          <div className="h-[35vh] bg-muted" />
          <div className="container py-12 space-y-6">
            <div className="h-8 bg-muted rounded w-80" />
            <div className="h-40 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen">
        <Navbar solid />
        <div className="container pt-28 py-20 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
            <Globe size={32} className="text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Destination not found</h1>
          <p className="text-muted-foreground mb-6">The destination you're looking for doesn't exist or may have been removed.</p>
          <Button variant="teal" asChild>
            <Link to="/find-a-course"><ArrowLeft size={16} /> Back to Destinations</Link>
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
    { icon: Briefcase, label: "Post-Study Work Visa", value: destination.post_study_visa },
    { icon: MapPin, label: "Top Cities", value: destination.top_cities },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={`Study in ${destination.country} | Universities, Courses & Visa Guide | Applyza`}
        description={(destination.overview || "").substring(0, 155)}
        path={`/study-destinations/${slug}`}
      />
      <Navbar solid />
      <section className="relative h-[35vh] min-h-[280px] flex items-end">
        <img src={bgImage} alt={destination.country} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="container relative z-10 pb-8 pt-24">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/study-destinations" className="text-primary-foreground/60 hover:text-primary-foreground">Study Destinations</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem><BreadcrumbPage className="text-primary-foreground">{destination.country}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-primary-foreground mt-3 mb-2"
          >
            Study in {destination.country}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/70 max-w-2xl text-sm md:text-base"
          >
            {destination.overview}
          </motion.p>
        </div>
      </section>

      {/* Key Facts Bar */}
      <section className="bg-card border-b border-border">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {keyFacts.map((fact) => (
              <div key={fact.label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <fact.icon size={18} className="text-secondary" />
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
        <section className="bg-card">
          <div className="container py-14 md:py-20">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-8 text-center">
              Why Study in {destination.country}?
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {whyCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-background rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <CheckCircle className="text-secondary mb-3" size={24} />
                  <h3 className="text-base font-bold text-primary mb-1.5">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Student Visa */}
      <section className="bg-muted">
        <div className="container py-14 md:py-20">
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-8 text-center">Student Visa</h2>
          <div className="max-w-3xl mx-auto space-y-5">
            {[
              { icon: FileText, label: "Requirements", value: destination.visa_requirements },
              { icon: Banknote, label: "Visa Fee", value: destination.visa_fee },
              { icon: Wrench, label: "Work Rights", value: destination.visa_work_rights },
            ].map((item) => (
              item.value && (
                <div key={item.label} className="bg-card rounded-xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground mb-1">{item.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.value}</p>
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Visa CTA banner */}
          <div className="max-w-3xl mx-auto mt-8 bg-secondary rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-secondary-foreground font-bold text-sm text-center sm:text-left">
              Need help with your visa? Our team has a 99% success rate.
            </p>
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full shrink-0 font-bold" asChild>
              <Link to="/book-a-consultation">Book a Visa Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cost of Living */}
      {costCards.length > 0 && (
        <section className="bg-card">
          <div className="container py-14 md:py-20">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-8 text-center">Cost of Living</h2>
            <div className={`grid gap-6 max-w-4xl mx-auto ${costCards.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
              {costCards.map((cost, i) => {
                const parts = cost.split(":");
                const city = parts[0]?.trim();
                const range = parts[1]?.trim();
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-background rounded-2xl p-6 shadow-sm text-center"
                  >
                    <MapPin className="mx-auto text-secondary mb-3" size={24} />
                    <h3 className="text-sm font-bold text-primary mb-2">{city}</h3>
                    <p className="text-lg font-extrabold text-foreground">{range}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Courses */}
      <section className="bg-muted/50">
        <div className="container py-14 md:py-20">
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-8">
            Courses in {destination.country}
          </h2>

          {courses.length === 0 ? (
            <div className="bg-card rounded-xl p-8 text-center">
              <BookOpen className="mx-auto text-muted-foreground mb-4" size={36} />
              <p className="text-muted-foreground mb-4">
                We're adding courses for {destination.country} soon. In the meantime, book a consultation and our counsellors can help you find the right programme.
              </p>
              <Button variant="teal" asChild>
                <Link to="/book-a-consultation">Book a Consultation</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {courses.map((course) => (
                  <div key={course.id} className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                    <p className="text-xs text-muted-foreground mb-1">{course.university_name}</p>
                    <h3 className="text-lg font-bold text-foreground leading-snug mb-3">{course.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span>{course.city}</span>
                      <span className="text-border">|</span>
                      <span>{course.duration}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${LEVEL_COLORS[course.study_level] ?? "bg-muted text-muted-foreground"}`}>
                        {course.study_level}
                      </span>
                    </div>
                    <p className="text-base font-bold text-foreground mb-2">
                      {course.tuition_fee ? `£${course.tuition_fee.toLocaleString()}` : "Contact us"}{" "}
                      {course.tuition_fee && <span className="text-xs font-normal text-muted-foreground">/ year</span>}
                    </p>
                    {course.scholarship_available && (
                      <Badge variant="secondary" className="mb-3 text-[11px]">Scholarship Available</Badge>
                    )}
                    <div className="flex gap-2 mt-auto pt-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link to={`/find-a-course/${course.slug}`}>View Details</Link>
                      </Button>
                      <Button variant="teal" size="sm" className="flex-1" asChild>
                        <Link to="/book-a-consultation">Apply with Applyza</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  to={`/find-a-course?country=${encodeURIComponent(destination.country)}`}
                  className="text-secondary font-semibold hover:underline"
                >
                  Search all {destination.country} courses →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 animate-gradient-shift bg-[length:200%_200%]"
          style={{ backgroundImage: "linear-gradient(135deg, hsl(265 44% 44%), hsl(169 63% 47%), hsl(265 44% 44%))" }}
        />
        <div className="container relative z-10 py-20 md:py-28 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-extrabold text-primary-foreground mb-4"
          >
            Ready to Study in {destination.country}?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold px-8" asChild>
              <Link to={`/find-a-course?country=${encodeURIComponent(destination.country)}`}>
                Search {destination.country} Courses
              </Link>
            </Button>
            <Button size="lg" className="rounded-full bg-primary-foreground/15 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/25 font-bold px-8" asChild>
              <Link to="/book-a-consultation">Book a Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default DestinationDetail;
