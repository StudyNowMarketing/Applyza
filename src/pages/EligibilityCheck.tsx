import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, MapPin, Clock, Sparkles, GraduationCap } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { createNotification } from "@/lib/notifications";
import { sanitizeText } from "@/lib/sanitize";

const COUNTRIES = [
  { emoji: "🇳🇬", name: "Nigeria" },
  { emoji: "🇬🇭", name: "Ghana" },
  { emoji: "🇰🇪", name: "Kenya" },
  { emoji: "🇶🇦", name: "Qatar" },
  { emoji: "🇹🇷", name: "Türkiye" },
  { emoji: "🇨🇾", name: "Cyprus" },
  { emoji: "🇮🇳", name: "India" },
  { emoji: "🇵🇰", name: "Pakistan" },
  { emoji: "🇧🇩", name: "Bangladesh" },
  { emoji: "🌍", name: "Other" },
];

const EDUCATION_LEVELS = [
  "High School / Secondary School",
  "Foundation / Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "Other",
];

const SUBJECTS = [
  "Business & Management",
  "Computing & IT",
  "Engineering",
  "Law",
  "Healthcare & Nursing",
  "Arts & Design",
  "Science",
  "Social Sciences",
  "Education",
  "Hospitality & Tourism",
  "Other",
];

const DESTINATIONS = [
  { emoji: "🇬🇧", name: "United Kingdom" },
  { emoji: "🇩🇪", name: "Germany" },
  { emoji: "🇫🇷", name: "France" },
  { emoji: "🇮🇪", name: "Ireland" },
  { emoji: "🇲🇹", name: "Malta" },
  { emoji: "🇳🇱", name: "Netherlands" },
  { emoji: "🇺🇸", name: "USA" },
  { emoji: "🇨🇦", name: "Canada" },
  { emoji: "🇨🇾", name: "Cyprus" },
  { emoji: "🇦🇪", name: "UAE" },
  { emoji: "🌍", name: "Any / Open to suggestions" },
];

const BUDGETS = [
  "Under £10,000",
  "£10,000 - £15,000",
  "£15,000 - £20,000",
  "Over £20,000",
  "I need a scholarship",
];

const LEVEL_COLORS: Record<string, string> = {
  Foundation: "bg-amber-50 text-amber-700 border-amber-200",
  Undergraduate: "bg-blue-50 text-blue-700 border-blue-200",
  Postgraduate: "bg-purple-50 text-purple-700 border-purple-200",
  "Top-Up": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const mapEducationToStudyLevel = (edu: string): string[] => {
  switch (edu) {
    case "High School / Secondary School":
      return ["Foundation", "Undergraduate"];
    case "Foundation / Diploma":
      return ["Undergraduate", "Top-Up"];
    case "Bachelor's Degree":
      return ["Postgraduate", "Top-Up"];
    case "Master's Degree":
      return ["Postgraduate"];
    default:
      return [];
  }
};

const mapBudgetToMax = (budget: string): number | null => {
  switch (budget) {
    case "Under £10,000": return 10000;
    case "£10,000 - £15,000": return 15000;
    case "£15,000 - £20,000": return 20000;
    case "Over £20,000": return null;
    case "I need a scholarship": return null;
    default: return null;
  }
};

const TOTAL_STEPS = 6; // 5 quiz + 1 lead form

const EligibilityCheck = () => {
  const [step, setStep] = useState(0);
  const [country, setCountry] = useState("");
  const [education, setEducation] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [budget, setBudget] = useState("");

  // Lead form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canNext = () => {
    switch (step) {
      case 0: return !!country;
      case 1: return !!education;
      case 2: return subjects.length > 0;
      case 3: return destinations.length > 0;
      case 4: return !!budget;
      case 5: return !!name.trim() && !!email.trim() && !!phone.trim() && consent;
      default: return false;
    }
  };

  const toggleMulti = (arr: string[], val: string, setter: (v: string[]) => void, max: number) => {
    if (arr.includes(val)) {
      setter(arr.filter((x) => x !== val));
    } else if (arr.length < max) {
      setter([...arr, val]);
    }
  };

  const studyLevels = mapEducationToStudyLevel(education);
  const maxFee = mapBudgetToMax(budget);
  const destCountries = destinations.filter((d) => d !== "Any / Open to suggestions");

  const { data: matchedCourses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ["eligibility-courses", studyLevels, subjects, destCountries, maxFee, submitted],
    enabled: submitted,
    queryFn: async () => {
      let query = supabase.from("courses").select("id, title, slug, university_name, country, city, subject_area, study_level, duration, tuition_fee, intake_dates, description, scholarship_available, featured");

      if (destCountries.length > 0) {
        query = query.in("country", destCountries);
      }
      if (studyLevels.length > 0) {
        query = query.in("study_level", studyLevels);
      }
      if (subjects.length > 0 && !subjects.includes("Other")) {
        query = query.in("subject_area", subjects);
      }
      if (maxFee !== null) {
        query = query.lte("tuition_fee", maxFee);
      }
      if (budget === "I need a scholarship") {
        query = query.eq("scholarship_available", true);
      }

      const { data, error } = await query.limit(10);
      if (error) throw error;
      return data ?? [];
    },
  });

  const handleSubmit = async () => {
    if (!canNext()) return;
    setSubmitting(true);
    try {
      const sanitizedName = sanitizeText(name);
      const sanitizedEmail = sanitizeText(email);
      const sanitizedPhone = sanitizeText(phone);
      const sanitizedWhatsapp = sanitizeText(whatsapp);

      await supabase.from("eligibility_leads" as any).insert({
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        whatsapp: sanitizedWhatsapp || null,
        country,
        education_level: education,
        subjects: subjects.join(", "),
        destinations: destinations.join(", "),
        budget,
      });

      await createNotification({
        type: "consultation",
        title: `New Eligibility Check from ${sanitizedName}`,
        message: `${sanitizedEmail} — interested in ${subjects.join(", ")} in ${destinations.join(", ")}`,
      });

      setSubmitted(true);
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const OptionButton = ({ selected, onClick, children, className = "" }: { selected: boolean; onClick: () => void; children: React.ReactNode; className?: string }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${
        selected
          ? "border-secondary bg-secondary/5 text-foreground"
          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
      } ${className}`}
    >
      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
        selected ? "border-secondary bg-secondary" : "border-gray-300"
      }`}>
        {selected && <Check size={12} className="text-white" />}
      </span>
      {children}
    </button>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <SEO title="Your Course Matches | Applyza" description="View your matched courses based on your eligibility check." path="/eligibility-check" />
        <Navbar solid />
        <div className="container pt-28 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: "rgba(46,196,182,0.1)" }}>
                <GraduationCap size={28} style={{ color: "#2EC4B6" }} />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#1B2150" }}>
                Your Matched Courses
              </h1>
              <p className="text-sm text-gray-500">
                Based on your profile: {education} • {subjects.join(", ")} • {destinations.join(", ")}
              </p>
            </div>

            {coursesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 animate-pulse" style={{ border: "1px solid hsl(230 25% 93%)" }}>
                    <div className="h-3 w-28 bg-gray-100 rounded mb-3" />
                    <div className="h-5 w-3/4 bg-gray-100 rounded mb-4" />
                    <div className="h-6 w-24 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
            ) : matchedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedCourses.map((course: any) => (
                  <div key={course.id} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                    style={{ border: "1px solid hsl(230 25% 93%)" }}>
                    <p className="text-[11px] text-gray-400 mb-1 font-medium">{course.university_name}</p>
                    <h3 className="text-base font-bold leading-snug mb-3" style={{ color: "#1B2150" }}>{course.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500 mb-3">
                      <span className="inline-flex items-center gap-1"><MapPin size={11} className="text-gray-400" /> {course.city}</span>
                      {course.duration && <span className="inline-flex items-center gap-1"><Clock size={11} className="text-gray-400" /> {course.duration}</span>}
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${LEVEL_COLORS[course.study_level] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}>
                        {course.study_level}
                      </span>
                    </div>
                    {course.tuition_fee && (
                      <p className="text-xl font-bold mb-2" style={{ color: "#1B2150" }}>
                        £{course.tuition_fee?.toLocaleString()} <span className="text-xs font-normal text-gray-400">/ year</span>
                      </p>
                    )}
                    {course.scholarship_available && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full mb-3 w-fit"
                        style={{ background: "rgba(46,196,182,0.1)", color: "#2EC4B6" }}>
                        <Sparkles size={10} /> Scholarship Available
                      </span>
                    )}
                    <div className="flex gap-2 mt-auto pt-2">
                      <Button variant="outline" size="sm" className="flex-1 rounded-lg text-xs" style={{ borderColor: "#1B2150", color: "#1B2150" }} asChild>
                        <Link to={`/find-a-course/${course.slug}`}>View Details</Link>
                      </Button>
                      <Button size="sm" className="flex-1 rounded-lg text-xs" style={{ background: "#2EC4B6", color: "#0a0d24" }} asChild>
                        <Link to="/book-a-consultation">Apply with Applyza</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-white rounded-2xl shadow-sm" style={{ border: "1px solid hsl(230 25% 93%)" }}>
                <div className="w-16 h-16 mx-auto mb-5 bg-gray-50 rounded-full flex items-center justify-center">
                  <GraduationCap size={28} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  We couldn't find exact matches
                </h3>
                <p className="text-sm text-gray-500 mb-5 max-w-md mx-auto">
                  But our counsellors can help find the right course for you based on your profile and preferences.
                </p>
                <Button asChild className="rounded-full" style={{ background: "#2EC4B6", color: "#0a0d24" }}>
                  <Link to="/book-a-consultation">Book a Free Consultation <ArrowRight size={14} className="ml-1" /></Link>
                </Button>
              </div>
            )}

            <div className="mt-10 text-center space-y-3">
              <Link to="/find-a-course" className="text-sm font-medium hover:underline" style={{ color: "#2EC4B6" }}>
                Want more options? Search all courses →
              </Link>
              <br />
              <Link to="/book-a-consultation" className="text-sm text-gray-500 hover:underline">
                Book a free consultation to discuss your options →
              </Link>
            </div>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Check Your Eligibility | Free Course Matching | Applyza" description="Answer 5 quick questions to find courses you're eligible for. Free AI-powered course matching from Applyza." path="/eligibility-check" />
      <Navbar solid />

      <div className="container pt-28 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ border: "1px solid hsl(230 25% 93%)" }}>
            {/* Progress */}
            <div className="px-6 pt-5 pb-0">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>Step {step + 1} of {TOTAL_STEPS}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-100 [&>div]:bg-secondary" />
            </div>

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* STEP 0 — Country */}
                  {step === 0 && (
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-1" style={{ color: "#1B2150" }}>Where are you currently based?</h2>
                      <p className="text-sm text-gray-500 mb-6">Select your current country of residence</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {COUNTRIES.map((c) => (
                          <OptionButton key={c.name} selected={country === c.name} onClick={() => setCountry(c.name)}>
                            <span className="text-lg">{c.emoji}</span> {c.name}
                          </OptionButton>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 1 — Education */}
                  {step === 1 && (
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-1" style={{ color: "#1B2150" }}>What's your highest qualification?</h2>
                      <p className="text-sm text-gray-500 mb-6">This helps us match you with the right study level</p>
                      <div className="grid grid-cols-1 gap-2.5">
                        {EDUCATION_LEVELS.map((l) => (
                          <OptionButton key={l} selected={education === l} onClick={() => setEducation(l)}>
                            {l}
                          </OptionButton>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 2 — Subjects */}
                  {step === 2 && (
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-1" style={{ color: "#1B2150" }}>What subject area interests you?</h2>
                      <p className="text-sm text-gray-500 mb-6">Select up to 3 subjects</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {SUBJECTS.map((s) => (
                          <OptionButton key={s} selected={subjects.includes(s)} onClick={() => toggleMulti(subjects, s, setSubjects, 3)}>
                            {s}
                          </OptionButton>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 3 — Destinations */}
                  {step === 3 && (
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-1" style={{ color: "#1B2150" }}>Which countries interest you?</h2>
                      <p className="text-sm text-gray-500 mb-6">Select up to 3 destinations</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {DESTINATIONS.map((d) => (
                          <OptionButton key={d.name} selected={destinations.includes(d.name)} onClick={() => toggleMulti(destinations, d.name, setDestinations, 3)}>
                            <span className="text-lg">{d.emoji}</span> {d.name}
                          </OptionButton>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 4 — Budget */}
                  {step === 4 && (
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-1" style={{ color: "#1B2150" }}>What's your annual tuition budget?</h2>
                      <p className="text-sm text-gray-500 mb-6">This helps us filter courses within your range</p>
                      <div className="grid grid-cols-1 gap-2.5">
                        {BUDGETS.map((b) => (
                          <OptionButton key={b} selected={budget === b} onClick={() => setBudget(b)}>
                            {b}
                          </OptionButton>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 5 — Lead form */}
                  {step === 5 && (
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-1" style={{ color: "#1B2150" }}>Almost there!</h2>
                      <p className="text-sm text-gray-500 mb-6">Enter your details to see your matched courses</p>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Full Name *</Label>
                          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="mt-1" maxLength={100} />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Email *</Label>
                          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="mt-1" maxLength={255} />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Phone *</Label>
                          <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+44 7000 000000" className="mt-1" maxLength={30} />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">WhatsApp Number (optional)</Label>
                          <Input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+44 7000 000000" className="mt-1" maxLength={30} />
                        </div>
                        <ConsentCheckbox
                          checked={consent}
                          onCheckedChange={setConsent}
                          label="I agree to Applyza's Privacy Policy and consent to being contacted about my course options."
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
                {step > 0 ? (
                  <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <ArrowLeft size={14} /> Back
                  </button>
                ) : <div />}

                {step < 5 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={!canNext()}
                    className="rounded-full px-6"
                    style={{ background: canNext() ? "#2EC4B6" : undefined, color: canNext() ? "#0a0d24" : undefined }}
                  >
                    Next <ArrowRight size={14} className="ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canNext() || submitting}
                    className="rounded-full px-6"
                    style={{ background: canNext() ? "#2EC4B6" : undefined, color: canNext() ? "#0a0d24" : undefined }}
                  >
                    {submitting ? "Loading..." : "Show My Results"} <ArrowRight size={14} className="ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default EligibilityCheck;
