import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FinalCTA from "@/components/FinalCTA";
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
      <div className="min-h-screen">
        <Navbar solid />
        <div className="container pt-24 py-20">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-muted rounded w-64" />
            <div className="h-10 bg-muted rounded w-96" />
            <div className="h-6 bg-muted rounded w-80" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 mt-10">
              <div className="h-96 bg-muted rounded-xl" />
              <div className="h-80 bg-muted rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
            <BookOpen size={32} className="text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Course not found</h1>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            The course you're looking for doesn't exist or may have been removed.
          </p>
          <Button variant="teal" asChild>
            <Link to="/find-a-course">
              <ArrowLeft size={16} /> Back to Course Search
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar solid />

      {/* Breadcrumb */}
      <section className="bg-card border-b border-border pt-20">
        <div className="container py-4">
          <button
            onClick={() => window.history.back()}
            className="text-xs text-secondary font-semibold hover:underline mb-2 flex items-center gap-1"
          >
            ← Back to Search Results
          </button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/find-a-course">Find a Course</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/find-a-course?university=${encodeURIComponent(course.university_name)}`}>
                    {course.university_name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{course.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Header */}
      <section className="bg-card border-b border-border">
        <div className="container py-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm text-muted-foreground mb-1">{course.university_name}</p>
            <h1 className="text-2xl md:text-[32px] font-extrabold text-primary leading-tight mb-4">
              {course.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  LEVEL_COLORS[course.study_level] ?? "bg-muted text-muted-foreground"
                }`}
              >
                {course.study_level}
              </span>
              {course.duration && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  <Clock size={12} /> {course.duration}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                <MapPin size={12} /> 🇬🇧 {course.city}, {course.country}
              </span>
              {course.intake_dates && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  <CalendarDays size={12} /> {course.intake_dates}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Left column — Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start bg-muted/50 p-1 rounded-xl h-auto flex-wrap">
                <TabsTrigger value="overview" className="rounded-lg px-4 py-2 text-sm">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="requirements" className="rounded-lg px-4 py-2 text-sm">
                  Entry Requirements
                </TabsTrigger>
                <TabsTrigger value="careers" className="rounded-lg px-4 py-2 text-sm">
                  Career Prospects
                </TabsTrigger>
                <TabsTrigger value="apply" className="rounded-lg px-4 py-2 text-sm">
                  How to Apply
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="prose prose-sm max-w-none text-foreground/85 leading-relaxed">
                  {course.description ? (
                    <p className="whitespace-pre-line">{course.description}</p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Detailed course description coming soon. Contact us to learn more about this programme.
                    </p>
                  )}

                  {course.modules && (
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-foreground mb-3">Modules</h3>
                      <p className="whitespace-pre-line">{course.modules}</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="requirements" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-3">Entry Requirements</h3>
                    <p className="text-foreground/85 whitespace-pre-line leading-relaxed">
                      {course.entry_requirements ||
                        "Contact us for specific entry requirements for this programme."}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-3">English Language Requirements</h3>
                    <p className="text-foreground/85 whitespace-pre-line leading-relaxed">
                      {course.english_requirements ||
                        "Contact us for specific English language requirements for this programme."}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="careers" className="mt-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Career Prospects</h3>
                  <p className="text-foreground/85 whitespace-pre-line leading-relaxed">
                    {course.career_prospects ||
                      "Graduates from this programme go on to careers in a wide range of industries. Book a consultation to discuss your career goals."}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="apply" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-foreground mb-3">How to Apply</h3>
                  <p className="text-foreground/85 leading-relaxed">
                    Applying through Applyza is simple and completely free. Our counsellors will
                    guide you through every step — from preparing your documents to submitting
                    your application. Click the button below to get started.
                  </p>
                  {course.application_deadline && (
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Application Deadline:</strong>{" "}
                      {course.application_deadline}
                    </p>
                  )}
                  <Button variant="teal" size="lg" className="mt-4">
                    Book a Free Consultation
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
            className="space-y-5"
          >
            <div className="lg:sticky lg:top-6 space-y-5">
              {/* Main CTA card */}
              <div className="bg-card rounded-xl border border-border shadow-md p-6 space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tuition Fee</p>
                  <p className="text-3xl font-extrabold text-foreground">
                    {course.tuition_fee
                      ? `£${course.tuition_fee.toLocaleString()}`
                      : "Contact us"}
                    {course.tuition_fee && (
                      <span className="text-sm font-normal text-muted-foreground"> / year</span>
                    )}
                  </p>
                </div>

                {course.scholarship_available && (
                  <div className="bg-secondary/10 rounded-lg p-3">
                    <Badge variant="secondary" className="mb-1.5 text-xs">
                      🎓 Scholarship Available
                    </Badge>
                    {course.scholarship_details && (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {course.scholarship_details}
                      </p>
                    )}
                  </div>
                )}

                {course.intake_dates && (
                  <div className="flex items-start gap-2">
                    <CalendarDays size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">Intake Dates</p>
                      <p className="text-xs text-muted-foreground">{course.intake_dates}</p>
                    </div>
                  </div>
                )}

                {course.duration && (
                  <div className="flex items-start gap-2">
                    <Clock size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">Duration</p>
                      <p className="text-xs text-muted-foreground">{course.duration}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2.5 pt-2">
                  <Button variant="teal" size="lg" className="w-full font-bold">
                    Apply with Applyza — It's Free
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    Book a Consultation
                  </Button>
                </div>

                <p className="text-[11px] text-center text-muted-foreground">
                  Our services are 100% free for students
                </p>
              </div>

              {/* University mini-card */}
              <div className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <GraduationCap size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{course.university_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {course.city}, {course.country}
                    </p>
                    <Link
                      to="/about"
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
      </section>

      {/* Related Courses */}
      {relatedCourses && relatedCourses.length > 0 && (
        <section className="bg-muted/50 py-14">
          <div className="container">
            <h2 className="text-2xl font-extrabold text-foreground mb-6">Related Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedCourses.map((rc) => (
                <Link
                  key={rc.id}
                  to={`/find-a-course/${rc.slug}`}
                  className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 block"
                >
                  <p className="text-xs text-muted-foreground mb-1">{rc.university_name}</p>
                  <h3 className="text-base font-bold text-foreground leading-snug mb-3">
                    {rc.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span>🇬🇧 {rc.city}</span>
                    <span className="text-border">|</span>
                    <span>{rc.duration}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        LEVEL_COLORS[rc.study_level] ?? "bg-muted text-muted-foreground"
                      }`}
                    >
                      {rc.study_level}
                    </span>
                  </div>
                  <p className="text-base font-bold text-foreground">
                    £{rc.tuition_fee?.toLocaleString()}{" "}
                    <span className="text-xs font-normal text-muted-foreground">/ year</span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Share buttons */}
      <section className="container py-8">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Share2 size={14} /> Share this course:
          </span>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center text-sm hover:opacity-80 transition"
            aria-label="Share on WhatsApp"
          >
            W
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold hover:opacity-80 transition"
            aria-label="Share on X"
          >
            𝕏
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-sm font-bold hover:opacity-80 transition"
            aria-label="Share on Facebook"
          >
            f
          </a>
          <button
            onClick={handleCopyLink}
            className="h-9 px-3 rounded-full bg-muted text-muted-foreground flex items-center gap-1.5 text-xs font-medium hover:bg-muted/70 transition"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </section>

      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CourseDetail;
