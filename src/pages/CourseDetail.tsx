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
  Briefcase,
  TrendingUp,
  Star,
  CheckCircle2,
  Award,
  FileText,
  Users,
  Globe,
  Layers,
  ChevronRight,
  AlertCircle,
  Languages,
} from "lucide-react";
import { MovingBorderButton } from "@/components/ui/MovingBorder";
import { useState } from "react";

const LEVEL_COLORS: Record<string, string> = {
  Postgraduate: "bg-secondary/15 text-secondary border border-secondary/30",
  Undergraduate: "bg-accent/15 text-accent border border-accent/30",
  Foundation: "bg-orange-100 text-orange-700 border border-orange-200",
  "Top-Up": "bg-blue-100 text-blue-700 border border-blue-200",
};

// Parse text into a clean bullet list, splitting on common delimiters
function parseToList(text: string): string[] {
  if (!text) return [];
  return text
    .split(/\n|•|·|–|-(?=\s)|;(?=\s)/)
    .map((s) => s.trim())
    .filter((s) => s.length > 4);
}

// Junk patterns that indicate scraped form/nav labels, not real career roles
const JUNK_ROLE_PATTERNS = [
  /please select/i, /career interest/i, /find a career/i, /job title/i,
  /select an option/i, /choose a/i, /click here/i, /view all/i,
  /related jobs/i, /all jobs/i, /search/i, /filter/i, /sort by/i,
  /\bN\/A\b/i, /^-+$/, /^\d+$/, /^\s*$/,
];

// Parse career roles from career_prospects field
function parseCareerRoles(text: string): string[] {
  if (!text) return [];
  const lines = text
    .split(/\n|,|•|·|–|;/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3 && s.length < 80)
    .filter((s) => !JUNK_ROLE_PATTERNS.some((p) => p.test(s)));
  return lines.slice(0, 9);
}

// Subject-area defaults for careers when DB field is empty
const CAREER_DEFAULTS: Record<string, string[]> = {
  "Business & Management": ["Business Analyst", "Marketing Manager", "Project Manager", "Operations Director", "Management Consultant", "Entrepreneur"],
  "Law": ["Solicitor", "Barrister", "Legal Adviser", "Compliance Officer", "Corporate Lawyer", "Human Rights Advocate"],
  "Computer Science": ["Software Engineer", "Data Scientist", "Cybersecurity Analyst", "Cloud Architect", "AI Researcher", "Product Manager"],
  "Nursing": ["Registered Nurse", "Clinical Nurse Specialist", "Ward Manager", "Community Health Nurse", "Healthcare Manager", "Nurse Educator"],
  "Engineering": ["Civil Engineer", "Mechanical Engineer", "Electrical Engineer", "Structural Engineer", "Project Engineer", "Design Engineer"],
  "Medicine": ["Doctor / GP", "Hospital Consultant", "Medical Researcher", "Public Health Specialist", "Clinical Director", "Surgeon"],
  "Education": ["Secondary School Teacher", "Curriculum Developer", "Education Consultant", "SENCO", "School Leader", "Educational Psychologist"],
  "Finance & Accounting": ["Chartered Accountant", "Financial Analyst", "Investment Banker", "Auditor", "Tax Adviser", "CFO"],
  "Psychology": ["Clinical Psychologist", "Counselling Psychologist", "HR Specialist", "Research Psychologist", "Mental Health Adviser", "Occupational Therapist"],
  "Media & Communications": ["Journalist", "PR Manager", "Content Strategist", "Social Media Manager", "Film Producer", "Brand Manager"],
  "Architecture": ["Architect", "Urban Planner", "Interior Designer", "Landscape Architect", "BIM Manager", "Project Architect"],
  "Health Sciences": ["Healthcare Professional", "Public Health Specialist", "Health Policy Adviser", "Clinical Researcher", "Biomedical Scientist", "Epidemiologist"],
  "Arts & Design": ["Graphic Designer", "Art Director", "UX/UI Designer", "Illustrator", "Creative Director", "Brand Designer"],
  "Healthcare & Nursing": ["Registered Nurse", "Clinical Nurse Specialist", "Healthcare Manager", "Community Health Nurse", "Nurse Educator", "Ward Manager"],
  "Social Sciences": ["Social Worker", "Policy Analyst", "Community Development Officer", "Research Analyst", "HR Manager", "NGO Programme Manager"],
  "Science & Mathematics": ["Research Scientist", "Data Analyst", "Laboratory Manager", "Biomedical Researcher", "Environmental Scientist", "Statistician"],
};

function getCareerRoles(course: { career_prospects?: string | null; subject_area?: string }): string[] {
  if (course.career_prospects) {
    const parsed = parseCareerRoles(course.career_prospects);
    if (parsed.length > 0) return parsed;
  }
  // Match subject area
  const area = course.subject_area || "";
  const key = Object.keys(CAREER_DEFAULTS).find((k) => area.toLowerCase().includes(k.toLowerCase().split(" ")[0]));
  return key ? CAREER_DEFAULTS[key] : ["Industry Professional", "Manager / Director", "Consultant", "Researcher / Analyst", "Entrepreneur", "Specialist"];
}

// Icon for career role based on keywords
function roleIcon(role: string) {
  const r = role.toLowerCase();
  if (r.includes("manager") || r.includes("director") || r.includes("head")) return <Users size={15} className="text-secondary" />;
  if (r.includes("analyst") || r.includes("research") || r.includes("scientist")) return <TrendingUp size={15} className="text-secondary" />;
  if (r.includes("engineer") || r.includes("architect") || r.includes("developer")) return <Layers size={15} className="text-secondary" />;
  if (r.includes("consultant") || r.includes("adviser") || r.includes("advisor")) return <Star size={15} className="text-secondary" />;
  if (r.includes("teacher") || r.includes("educator") || r.includes("lecturer")) return <BookOpen size={15} className="text-secondary" />;
  if (r.includes("lawyer") || r.includes("solicitor") || r.includes("barrister")) return <Award size={15} className="text-secondary" />;
  if (r.includes("global") || r.includes("international")) return <Globe size={15} className="text-secondary" />;
  return <Briefcase size={15} className="text-secondary" />;
}

// Extract IELTS-type scores from english_requirements text
function extractEnglishScores(text: string): { label: string; score: string }[] {
  if (!text) return [];
  const patterns = [
    { label: "IELTS", regex: /IELTS[:\s]*([0-9.]+)/i },
    { label: "TOEFL", regex: /TOEFL[:\s]*([0-9]+)/i },
    { label: "PTE", regex: /PTE[:\s]*([0-9]+)/i },
    { label: "Cambridge", regex: /Cambridge[:\s]*([A-Z]+)/i },
    { label: "Duolingo", regex: /Duolingo[:\s]*([0-9]+)/i },
  ];
  return patterns
    .map(({ label, regex }) => {
      const match = text.match(regex);
      return match ? { label, score: match[1] } : null;
    })
    .filter(Boolean) as { label: string; score: string }[];
}

// Apply steps
const APPLY_STEPS = [
  { icon: <FileText size={18} className="text-secondary" />, title: "Book a Free Consultation", desc: "Chat with an Applyza counsellor to confirm this course matches your profile and goals." },
  { icon: <CheckCircle2 size={18} className="text-secondary" />, title: "Prepare Your Documents", desc: "We'll give you a personalised checklist — transcripts, references, personal statement and more." },
  { icon: <Award size={18} className="text-secondary" />, title: "Submit Your Application", desc: "We handle the submission and liaise with the university on your behalf, completely free." },
  { icon: <GraduationCap size={18} className="text-secondary" />, title: "Receive Your Offer", desc: "Once accepted, we help you with your CAS, visa application, and pre-departure checklist." },
];

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*").eq("slug", slug!).single();
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
        .gt("tuition_fee", 10000)
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
          <div className="h-40" style={{ background: "#0a0d24" }} />
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
            <p className="text-white/50 text-sm mb-4 max-w-md mx-auto">The course you're looking for doesn't exist or may have been removed.</p>
            <MovingBorderButton to="/find-a-course" className="px-6 py-2 text-sm gap-1.5">
              <ArrowLeft size={14} /> Back to Course Search
            </MovingBorderButton>
          </div>
        </section>
        <div className="flex-1" />
        <Footer />
      </div>
    );
  }

  const careerRoles = getCareerRoles(course);
  const englishScores = extractEnglishScores(course.english_requirements || "");
  const entryReqList = parseToList(course.entry_requirements || "");
  const moduleList = parseToList(course.modules || "");
  const descParagraphs = (course.description || "").split(/\n{2,}/).filter(Boolean);

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
          ...(course.tuition_fee && { offers: { "@type": "Offer", price: course.tuition_fee, priceCurrency: "GBP" } }),
        }}
      />
      <Navbar solid />

      {/* ── Dark Hero ── */}
      <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
        <SparklesCore className="absolute inset-0 z-[1]" background="transparent" particleColor="#2EC4B6" particleDensity={60} minSize={0.4} maxSize={1.5} speed={1.5} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.4), transparent 70%)" }} />
        </div>
        <div className="container relative z-10 pt-20">
          <button onClick={() => window.history.back()} className="text-xs text-secondary font-semibold hover:underline mb-2 flex items-center gap-1">
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

          <p className="text-secondary/80 text-xs font-semibold tracking-wide uppercase mt-3 mb-1">{course.subject_area}</p>
          <p className="text-white/40 text-xs mb-1">{course.university_name}</p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
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
            {course.scholarship_available && (
              <span className="flex items-center gap-1 text-xs text-yellow-300/80 bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-0.5 rounded-full">
                🎓 Scholarship Available
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Quick Stats Strip ── */}
      <div className="border-b border-border bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
            <div className="py-3 px-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Tuition Fee</p>
              <p className="text-base font-bold text-primary">
                {course.tuition_fee ? `£${course.tuition_fee.toLocaleString()}` : "—"}
                {course.tuition_fee && <span className="text-xs font-normal text-muted-foreground"> /yr</span>}
              </p>
            </div>
            <div className="py-3 px-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Duration</p>
              <p className="text-base font-bold text-primary">{course.duration || "—"}</p>
            </div>
            <div className="py-3 px-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Intake</p>
              <p className="text-base font-bold text-primary">{course.intake_dates || "—"}</p>
            </div>
            <div className="py-3 px-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Study Level</p>
              <p className="text-base font-bold text-primary">{course.study_level}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <section className="bg-background py-10 flex-1">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">

            {/* Left column — Tabs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start bg-muted/50 p-1 rounded-xl h-auto flex-wrap gap-1">
                  <TabsTrigger value="overview" className="rounded-lg px-4 py-2 text-sm">Overview</TabsTrigger>
                  <TabsTrigger value="requirements" className="rounded-lg px-4 py-2 text-sm">Entry Requirements</TabsTrigger>
                  <TabsTrigger value="careers" className="rounded-lg px-4 py-2 text-sm">Career Prospects</TabsTrigger>
                  <TabsTrigger value="apply" className="rounded-lg px-4 py-2 text-sm">How to Apply</TabsTrigger>
                </TabsList>

                {/* ── Overview Tab ── */}
                <TabsContent value="overview" className="mt-6 space-y-8">
                  {/* Description */}
                  <div>
                    <h2 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                      <BookOpen size={18} className="text-secondary" /> About This Course
                    </h2>
                    {descParagraphs.length > 0 ? (
                      <div className="space-y-3">
                        {descParagraphs.map((p, i) => (
                          <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/40 border border-border">
                        <AlertCircle size={16} className="text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground italic">
                          Full course description coming soon. Contact our team for detailed information about this programme.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Course Highlights */}
                  <div>
                    <h2 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                      <Star size={18} className="text-secondary" /> Course Highlights
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { icon: <GraduationCap size={16} />, label: "Award", value: course.study_level + " Degree" },
                        { icon: <Clock size={16} />, label: "Duration", value: course.duration || "Confirm at application" },
                        { icon: <MapPin size={16} />, label: "Location", value: `${course.city}, ${course.country}` },
                        { icon: <CalendarDays size={16} />, label: "Next Intake", value: course.intake_dates || "Confirm at application" },
                        { icon: <Globe size={16} />, label: "Subject Area", value: course.subject_area },
                        { icon: <Award size={16} />, label: "Scholarship", value: course.scholarship_available ? "Available" : "Check eligibility" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border hover:border-secondary/40 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{item.label}</p>
                            <p className="text-sm font-semibold text-primary">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modules */}
                  {(moduleList.length > 0 || course.modules) && (
                    <div>
                      <h2 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                        <Layers size={18} className="text-secondary" /> Modules & Topics
                      </h2>
                      {moduleList.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {moduleList.map((mod, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 transition-colors">
                              <CheckCircle2 size={11} /> {mod}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{course.modules}</p>
                      )}
                    </div>
                  )}
                </TabsContent>

                {/* ── Entry Requirements Tab ── */}
                <TabsContent value="requirements" className="mt-6 space-y-8">
                  {/* Academic Requirements */}
                  <div>
                    <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <FileText size={18} className="text-secondary" /> Academic Entry Requirements
                    </h2>
                    {entryReqList.length > 0 ? (
                      <ul className="space-y-2">
                        {entryReqList.map((req, i) => (
                          <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border">
                            <CheckCircle2 size={15} className="text-secondary shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground leading-relaxed">{req}</span>
                          </li>
                        ))}
                      </ul>
                    ) : course.entry_requirements ? (
                      <div className="p-4 rounded-xl bg-muted/40 border border-border">
                        <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{course.entry_requirements}</p>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/40 border border-border">
                        <AlertCircle size={16} className="text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Entry requirements vary by nationality and prior qualifications. Contact our advisers for a personalised assessment.</p>
                          <Link to="/book-a-consultation" className="text-xs text-secondary font-semibold hover:underline mt-1 inline-block">
                            Get a free eligibility check →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* English Language Requirements */}
                  <div>
                    <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <Languages size={18} className="text-secondary" /> English Language Requirements
                    </h2>
                    {englishScores.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                        {englishScores.map((s, i) => (
                          <div key={i} className="rounded-xl border border-secondary/30 bg-secondary/5 p-4 text-center">
                            <p className="text-2xl font-bold text-secondary">{s.score}</p>
                            <p className="text-xs text-muted-foreground font-medium mt-0.5">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {course.english_requirements ? (
                      <div className="p-4 rounded-xl bg-muted/40 border border-border">
                        <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{course.english_requirements}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { test: "IELTS", score: "6.0 – 6.5", note: "Typical requirement" },
                          { test: "TOEFL iBT", score: "79 – 90", note: "Typical requirement" },
                          { test: "PTE Academic", score: "51 – 59", note: "Typical requirement" },
                        ].map((s, i) => (
                          <div key={i} className="rounded-xl border border-border bg-muted/30 p-4 text-center">
                            <p className="text-xl font-bold text-primary">{s.score}</p>
                            <p className="text-xs font-semibold text-foreground mt-0.5">{s.test}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{s.note}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-[11px] text-muted-foreground mt-3 flex items-center gap-1.5">
                      <AlertCircle size={11} /> Exact scores confirmed by the university at application stage. Pre-sessional English courses may be available.
                    </p>
                  </div>
                </TabsContent>

                {/* ── Career Prospects Tab ── */}
                <TabsContent value="careers" className="mt-6 space-y-8">
                  {/* Headline */}
                  <div className="rounded-2xl p-5 border border-secondary/20" style={{ background: "linear-gradient(135deg, hsl(169 63% 47% / 0.08), hsl(169 63% 47% / 0.03))" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp size={18} className="text-secondary" />
                      <h2 className="text-lg font-bold text-primary">Where This Degree Can Take You</h2>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {course.career_prospects && course.career_prospects.length > 80
                        ? course.career_prospects.split(/\n/)[0]
                        : `A ${course.study_level.toLowerCase()} in ${course.subject_area} opens doors across multiple high-demand sectors globally. Graduates are sought after by top employers, international organisations, and public institutions.`}
                    </p>
                  </div>

                  {/* Role Cards */}
                  <div>
                    <h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-wide">Graduate Career Paths</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {careerRoles.map((role, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border hover:border-secondary/40 hover:shadow-sm transition-all cursor-default group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                            {roleIcon(role)}
                          </div>
                          <span className="text-sm font-medium text-foreground leading-snug">{role}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Why it matters */}
                  <div>
                    <h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-wide">Why Study Abroad?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { icon: <Globe size={16} />, title: "Global Recognition", desc: "Internationally accredited degrees are recognised by employers and institutions in 180+ countries worldwide." },
                        { icon: <TrendingUp size={16} />, title: "Career Advancement", desc: "International graduates report significantly higher career prospects and starting salaries in their home markets." },
                        { icon: <Users size={16} />, title: "Post-Study Pathways", desc: "Many destinations offer post-study work routes, letting you gain international work experience after graduation." },
                        { icon: <Award size={16} />, title: "Academic Prestige", desc: "Our partner universities consistently rank among the world's best for teaching quality, research, and graduate outcomes." },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border">
                          <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{item.title}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sectors */}
                  <div>
                    <h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-wide">Industry Sectors</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        course.subject_area,
                        "Private Sector",
                        "Public Sector",
                        "NGO / Non-profit",
                        "Startups & Entrepreneurship",
                        "International Organisations",
                        "Academia & Research",
                      ].map((sector, i) => (
                        <Badge key={i} variant="outline" className="text-xs font-medium py-1 px-3 rounded-full border-border text-muted-foreground hover:border-secondary/40 hover:text-secondary transition-colors">
                          {sector}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* ── How to Apply Tab ── */}
                <TabsContent value="apply" className="mt-6 space-y-8">
                  <div>
                    <h2 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-secondary" /> Your Application Journey
                    </h2>
                    <div className="space-y-3">
                      {APPLY_STEPS.map((step, i) => (
                        <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-card border border-border hover:border-secondary/30 transition-colors">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 border border-secondary/30 text-secondary font-bold text-sm shrink-0">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {step.icon}
                              <p className="text-sm font-bold text-primary">{step.title}</p>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                          </div>
                          <ChevronRight size={16} className="text-muted-foreground shrink-0 mt-1" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deadline + CTA */}
                  <div className="rounded-2xl p-5 border border-secondary/20 bg-secondary/5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        {course.application_deadline && (
                          <div className="flex items-center gap-2 mb-2">
                            <CalendarDays size={15} className="text-secondary" />
                            <p className="text-sm font-semibold text-foreground">Application Deadline: <span className="text-secondary">{course.application_deadline}</span></p>
                          </div>
                        )}
                        <p className="text-sm text-muted-foreground">Our service is <strong className="text-foreground">100% free</strong> — no hidden fees, no obligations. We're paid by universities, not students.</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <MovingBorderButton to="/book-a-consultation" className="px-6 py-2 text-sm">
                        Book a Free Consultation
                      </MovingBorderButton>
                      <Button variant="outline" size="sm" className="rounded-full" asChild>
                        <Link to="/find-a-course">Browse More Courses</Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* ── Right column — Sticky Sidebar ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="space-y-4">
              <div className="lg:sticky lg:top-24 space-y-4">

                {/* Main CTA card */}
                <div className="bg-card rounded-2xl border border-border shadow-sm p-5 space-y-4 card-glow">
                  <div className="border-b border-border pb-4">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">International Tuition Fee</p>
                    <p className="text-3xl font-bold text-primary">
                      {course.tuition_fee ? `£${course.tuition_fee.toLocaleString()}` : "Contact us"}
                      {course.tuition_fee && <span className="text-sm font-normal text-muted-foreground"> / year</span>}
                    </p>
                    {course.tuition_fee && (
                      <p className="text-[10px] text-muted-foreground mt-1">International student rate · Subject to annual review</p>
                    )}
                  </div>

                  {course.scholarship_available && (
                    <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">🎓</span>
                        <p className="text-xs font-bold text-yellow-700 dark:text-yellow-400">Scholarship Available</p>
                      </div>
                      {course.scholarship_details && (
                        <p className="text-xs text-muted-foreground leading-relaxed">{course.scholarship_details}</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2.5">
                    {course.intake_dates && (
                      <div className="flex items-center gap-2.5">
                        <CalendarDays size={14} className="text-secondary shrink-0" />
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Intake</p>
                          <p className="text-xs font-semibold text-foreground">{course.intake_dates}</p>
                        </div>
                      </div>
                    )}
                    {course.duration && (
                      <div className="flex items-center gap-2.5">
                        <Clock size={14} className="text-secondary shrink-0" />
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Duration</p>
                          <p className="text-xs font-semibold text-foreground">{course.duration}</p>
                        </div>
                      </div>
                    )}
                    {course.application_deadline && (
                      <div className="flex items-center gap-2.5">
                        <AlertCircle size={14} className="text-orange-500 shrink-0" />
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Deadline</p>
                          <p className="text-xs font-semibold text-orange-600 dark:text-orange-400">{course.application_deadline}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-1">
                    <MovingBorderButton to="/book-a-consultation" containerClassName="w-full" className="w-full px-4 py-2.5 text-sm">
                      Apply with Applyza — Free
                    </MovingBorderButton>
                    <Button variant="outline" size="sm" className="w-full rounded-full" asChild>
                      <Link to="/book-a-consultation">Book a Consultation</Link>
                    </Button>
                  </div>

                  {/* Trust signals */}
                  <div className="pt-1 border-t border-border space-y-1.5">
                    {["Free service — no fees to students", "Certified education counsellors", "End-to-end visa support"].map((t, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <CheckCircle2 size={12} className="text-secondary shrink-0" /> {t}
                      </div>
                    ))}
                  </div>
                </div>

                {/* University card */}
                <div className="bg-card rounded-2xl border border-border p-4">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-3">University</p>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                      <GraduationCap size={20} className="text-secondary" />
                    </div>
                    <div>
                      <p className="font-bold text-primary text-sm leading-snug">{course.university_name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{course.city}, {course.country}</p>
                      <Link to={`/find-a-course?university=${encodeURIComponent(course.university_name)}`} className="text-xs text-secondary font-semibold hover:underline mt-1.5 inline-flex items-center gap-1">
                        More courses here <ChevronRight size={11} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Quick careers teaser */}
                <div className="bg-card rounded-2xl border border-border p-4">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-3">Top Career Paths</p>
                  <div className="space-y-2">
                    {careerRoles.slice(0, 4).map((role, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        <span className="text-xs text-foreground font-medium">{role}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => document.querySelector('[data-value="careers"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}
                    className="text-xs text-secondary font-semibold hover:underline mt-2 inline-flex items-center gap-1"
                  >
                    View all career paths <ChevronRight size={11} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Related Courses ── */}
      {relatedCourses && relatedCourses.length > 0 && (
        <section className="bg-muted/30 border-t border-border py-12">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-primary">Related Courses You Might Like</h2>
              <Link to={`/find-a-course?subject=${encodeURIComponent(course.subject_area)}`} className="text-xs text-secondary font-semibold hover:underline flex items-center gap-1">
                View all <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedCourses.map((rc) => (
                <Link
                  key={rc.id}
                  to={`/find-a-course/${rc.slug}`}
                  className="bg-card rounded-2xl border border-border p-4 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all duration-200 block group"
                >
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">{rc.university_name}</p>
                  <h3 className="text-sm font-bold text-primary leading-snug mb-2 group-hover:text-secondary transition-colors">{rc.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><MapPin size={10} /> {rc.city}</span>
                    {rc.duration && <span className="flex items-center gap-1"><Clock size={10} /> {rc.duration}</span>}
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${LEVEL_COLORS[rc.study_level] ?? "bg-muted text-muted-foreground"}`}>
                      {rc.study_level}
                    </span>
                  </div>
                  <p className="text-base font-bold text-primary">
                    {rc.tuition_fee ? `£${rc.tuition_fee.toLocaleString()}` : "—"}
                    {rc.tuition_fee && <span className="text-xs font-normal text-muted-foreground"> / year</span>}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Share ── */}
      <section className="bg-background border-t border-border py-6">
        <div className="container">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
              <Share2 size={13} /> Share this course:
            </span>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] flex items-center justify-center text-xs font-bold transition-colors" aria-label="Share on WhatsApp">W</a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center text-xs font-bold transition-colors" aria-label="Share on X">𝕏</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] flex items-center justify-center text-xs font-bold transition-colors" aria-label="Share on Facebook">f</a>
            <button onClick={handleCopyLink} className="h-8 px-3 rounded-full bg-muted text-muted-foreground flex items-center gap-1.5 text-xs font-medium hover:bg-muted/70 transition">
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-12" style={{ background: "linear-gradient(135deg, hsl(169 63% 47%), hsl(169 63% 40%))" }}>
        <div className="container text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
            <GraduationCap size={22} className="text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Ready to Apply for {course.title}?</h2>
          <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">Our expert counsellors guide you from application to visa — completely free of charge.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 font-semibold px-8" asChild>
              <Link to="/book-a-consultation">Book a Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-white/30 text-white bg-transparent hover:bg-white/10 px-8" asChild>
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
