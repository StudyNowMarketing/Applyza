import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  CalendarDays,
  GraduationCap,
  Share2,
  Copy,
  Check,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";

const LEVEL_COLORS: Record<string, string> = {
  Postgraduate: "bg-secondary/15 text-secondary",
  Undergraduate: "bg-accent/15 text-accent",
  Foundation: "bg-orange-100 text-orange-700",
  "Top-Up": "bg-blue-100 text-blue-700",
};

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("slug", slug!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: relatedCourses } = useQuery({
    queryKey: ["related-courses", course?.subject_area, course?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("courses")
        .select("*")
        .eq("subject_area", course!.subject_area)
        .neq("id", course!.id)
        .limit(3);
      return data ?? [];
    },
    enabled: !!course,
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = course ? `Check out this course: ${course.title} at ${course.university_name}` : "";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar solid />
        <div className="pt-20 animate-pulse">
          <div className="h-32" style={{ background: "#0a0d24" }} />
          <div className="container py-8 space-y-4">
            <div className="h-6 bg-muted rounded w-60" />
            <div className="h-8 bg-muted rounded w-96" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 mt-6">
              <div className="h-80 bg-muted rounded-xl" />
              <div className="h-72 bg-muted rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar solid />
        <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
          <div className="container relative z-10 pt-20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <BookOpen size={28} className="text-white/50" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Course not found</h1>
            <p className="text-white/50 text-sm mb-4 max-w-md mx-auto">
              The course you're looking for doesn't exist or may have been removed.
            </p>
            <Button size="sm" className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6" asChild>
              <Link to="/find-a-course"><ArrowLeft size={14} className="mr-1.5" /> Back to Course Search</Link>
            </Button>
          </div>
        </section>
        <div className="flex-1" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${course.title} at ${course.university_name} | Applyza`}
        description={`Study ${course.title} at ${course.university_name} in ${course.city}, ${course.country}. ${course.duration || ""}, ${course.tuition_fee ? `£${course.tuition_fee.toLocaleString()}/year` : ""}. Apply with expert guidance from Applyza.`}
        path={`/find-a-course/${course.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.description || `${course.title} at ${course.university_name}`,
          provider: { "@type": "Organization", name: course.university_name },
          ...(course.tuition_fee && {
            offers: { "@type": "Offer", price: course.tuition_fee, priceCurrency: "GBP" },
          }),
        }}
      />
      <Navbar solid />

      {/* Dark Hero */}
      <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
        <SparklesCore className="absolute inset-0 z-[1]" background="transparent" particleColor="#2EC4B6" particleDensity={60} minSize={0.4} maxSize={1.5} speed={1.5} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.4), transparent 70%)" }} />
        </div>
        <div className="container relative z-10 pt-20">
          <button
            onClick={() => window.history.back()}
            className="text-xs text-secondary font-semibold hover:underline mb-2 flex items-center gap-1"
          >
            ← Back to Search Results
          </button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/find-a-course" className="text-white/40 hover:text-white/60 text-sm">Find a Course</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm line-clamp-1">{course.title}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <p className="text-white/40 text-xs mt-3 mb-1">{course.university_name}</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl font-bold text-white leading-tight mb-3"
          >
            {course.title}
          </motion.h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${LEVEL_COLORS[course.study_level] ?? "bg-white/10 text-white/70"}`}>
              {course.study_level}
            </span>
            {course.duration && (
              <span className="flex items-center gap-1 text-xs text-white/50 bg-white/10 px-2.5 py-0.5 rounded-full">
                <Clock size={11} /> {course.duration}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-white/50 bg-white/10 px-2.5 py-0.5 rounded-full">
              <MapPin size={11} /> {course.city}, {course.country}
            </span>
            {course.intake_dates && (
              <span className="flex items-center gap-1 text-xs text-white/50 bg-white/10 px-2.5 py-0.5 rounded-full">
                <CalendarDays size={11} /> {course.intake_dates}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="bg-background py-10 flex-1">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
            {/* Left column — Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start bg-muted/50 p-1 rounded-xl h-auto flex-wrap">
                  <TabsTrigger value="overview" className="rounded-lg px-4 py-2 text-sm">Overview</TabsTrigger>
                  <TabsTrigger value="requirements" className="rounded-lg px-4 py-2 text-sm">Entry Requirements</TabsTrigger>
                  <TabsTrigger value="careers" className="rounded-lg px-4 py-2 text-sm">Career Prospects</TabsTrigger>
                  <TabsTrigger value="apply" className="rounded-lg px-4 py-2 text-sm">How to Apply</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {course.description ? (
                      <p className="whitespace-pre-line">{course.description}</p>
                    ) : (
                      <p className="italic">Detailed course description coming soon. Contact us to learn more about this programme.</p>
                    )}
                    {course.modules && (
                      <div className="mt-8">
                        <h3 className="text-base font-bold text-primary mb-2">Modules</h3>
                        <p className="whitespace-pre-line">{course.modules}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="mt-6">
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-base font-bold text-primary mb-2">Entry Requirements</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                        {course.entry_requirements || "Contact us for specific entry requirements for this programme."}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-primary mb-2">English Language Requirements</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                        {course.english_requirements || "Contact us for specific English language requirements for this programme."}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="careers" className="mt-6">
                  <div>
                    <h3 className="text-base font-bold text-primary mb-2">Career Prospects</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                      {course.career_prospects || "Graduates from this programme go on to careers in a wide range of industries. Book a consultation to discuss your career goals."}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="apply" className="mt-6">
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-primary mb-2">How to Apply</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Applying through Applyza is simple and completely free. Our counsellors will guide you through every step — from preparing your documents to submitting your application.
                    </p>
                    {course.application_deadline && (
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Application Deadline:</strong> {course.application_deadline}
                      </p>
                    )}
                    <Button size="sm" className="mt-3 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6" asChild>
                      <Link to="/book-a-consultation">Book a Free Consultation</Link>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Right column — Sticky sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="lg:sticky lg:top-24 space-y-4">
                {/* Main CTA card */}
                <div className="bg-card rounded-xl border border-border shadow-sm p-5 space-y-4 card-glow">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Tuition Fee</p>
                    <p className="text-2xl font-bold text-primary">
                      {course.tuition_fee ? `£${course.tuition_fee.toLocaleString()}` : "Contact us"}
                      {course.tuition_fee && <span className="text-xs font-normal text-muted-foreground"> / year</span>}
                    </p>
                  </div>

                  {course.scholarship_available && (
                    <div className="bg-secondary/10 rounded-lg p-3">
                      <Badge variant="secondary" className="mb-1 text-[11px]">🎓 Scholarship Available</Badge>
                      {course.scholarship_details && (
                        <p className="text-xs text-muted-foreground leading-relaxed">{course.scholarship_details}</p>
                      )}
                    </div>
                  )}

                  {course.intake_dates && (
                    <div className="flex items-start gap-2">
                      <CalendarDays size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-foreground">Intake Dates</p>
                        <p className="text-xs text-muted-foreground">{course.intake_dates}</p>
                      </div>
                    </div>
                  )}

                  {course.duration && (
                    <div className="flex items-start gap-2">
                      <Clock size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-foreground">Duration</p>
                        <p className="text-xs text-muted-foreground">{course.duration}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    <Button size="sm" className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold" asChild>
                      <Link to="/book-a-consultation">Apply with Applyza</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full rounded-full" asChild>
                      <Link to="/book-a-consultation">Book a Consultation</Link>
                    </Button>
                  </div>

                  <p className="text-[10px] text-center text-muted-foreground">
                    Expert guidance from AQF certified counsellors
                  </p>
                </div>

                {/* University mini-card */}
                <div className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <GraduationCap size={18} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-bold text-primary text-sm">{course.university_name}</p>
                      <p className="text-xs text-muted-foreground">{course.city}, {course.country}</p>
                      <Link
                        to={`/find-a-course?university=${encodeURIComponent(course.university_name)}`}
                        className="text-xs text-secondary font-semibold hover:underline mt-1 inline-block"
                      >
                        View University →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      {relatedCourses && relatedCourses.length > 0 && (
        <section className="bg-card py-12">
          <div className="container">
            <h2 className="text-lg font-bold text-primary mb-5">Related Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedCourses.map((rc) => (
                <Link
                  key={rc.id}
                  to={`/find-a-course/${rc.slug}`}
                  className="bg-background rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-all duration-200 block card-glow"
                >
                  <p className="text-xs text-muted-foreground mb-1">{rc.university_name}</p>
                  <h3 className="text-sm font-bold text-primary leading-snug mb-2">{rc.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><MapPin size={11} /> {rc.city}</span>
                    <span>{rc.duration}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${LEVEL_COLORS[rc.study_level] ?? "bg-muted text-muted-foreground"}`}>
                      {rc.study_level}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-primary">
                    {rc.tuition_fee ? `£${rc.tuition_fee.toLocaleString()}` : "Contact us"}{" "}
                    {rc.tuition_fee && <span className="text-xs font-normal text-muted-foreground">/ year</span>}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Share */}
      <section className="bg-background py-8">
        <div className="container">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
              <Share2 size={13} /> Share this course:
            </span>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] flex items-center justify-center text-xs transition-colors" aria-label="Share on WhatsApp">W</a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center text-xs font-bold transition-colors" aria-label="Share on X">𝕏</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] flex items-center justify-center text-xs font-bold transition-colors" aria-label="Share on Facebook">f</a>
            <button onClick={handleCopyLink}
              className="h-8 px-3 rounded-full bg-muted text-muted-foreground flex items-center gap-1.5 text-xs font-medium hover:bg-muted/70 transition">
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10" style={{ background: "linear-gradient(135deg, hsl(169 63% 47%), hsl(169 63% 40%))" }}>
        <div className="container text-center">
          <h2 className="text-xl font-bold text-white mb-2">Ready to Apply?</h2>
          <p className="text-white/80 text-sm mb-5">Our expert counsellors will guide you every step of the way — completely free.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 font-semibold px-8" asChild>
              <Link to="/book-a-consultation">Book a Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/10 px-8" asChild>
              <Link to="/find-a-course">Search More Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;
