import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, GraduationCap } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { createNotification } from "@/lib/notifications";
import { sanitize } from "@/lib/sanitize";
import { Step1, Step2, Step3, Step4, Step5 } from "./eligibility/QuizSteps";
import ResultsPanel from "./eligibility/ResultsPanel";
import { calculateScore, getMatchLabel, getDbStudyLevels, mapBudgetToMax } from "./eligibility/scoring";
import { TOTAL_STEPS, START_DATES } from "./eligibility/constants";
import type { QuizState, LeadForm, ScoredCourse } from "./eligibility/types";

const initialQuiz: QuizState = {
  ageRange: "", country: "", countryOther: "",
  education: "", grade: "", studyGap: "", studyGapReason: "",
  englishTest: "", englishScore: "",
  subjects: [], studyLevel: "", destinations: [],
  budget: "", needsScholarship: "", visaRefused: "", visaRefusedCountry: "", currentVisa: "",
};

const initialLead: LeadForm = {
  name: "", email: "", phone: "", whatsapp: "", preferredStart: "", consent: false,
};

const TIME_ESTIMATES = ["About 3 minutes left", "About 2 minutes left", "About 2 minutes left", "About 1 minute left", "Less than a minute left", ""];

const EligibilityCheck = () => {
  const [step, setStep] = useState(0);
  const [quiz, setQuiz] = useState<QuizState>(initialQuiz);
  const [lead, setLead] = useState<LeadForm>(initialLead);
  const [submitting, setSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const updateQuiz = useCallback((patch: Partial<QuizState>) => {
    setQuiz((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateLead = useCallback((patch: Partial<LeadForm>) => {
    setLead((prev) => ({ ...prev, ...patch }));
  }, []);

  const canNext = () => {
    switch (step) {
      case 0: return !!quiz.ageRange && !!quiz.country && (quiz.country !== "Other" || !!quiz.countryOther.trim());
      case 1: return !!quiz.education && !!quiz.grade && !!quiz.studyGap;
      case 2: return !!quiz.englishTest;
      case 3: return quiz.subjects.length > 0 && !!quiz.studyLevel && quiz.destinations.length > 0;
      case 4: return !!quiz.budget && !!quiz.needsScholarship && !!quiz.visaRefused && !!quiz.currentVisa;
      default: return false;
    }
  };

  const canSubmit = !!lead.name.trim() && !!lead.email.trim() && !!lead.phone.trim() && lead.consent;

  const isResultsStep = step === 5;

  // Query courses when on results step
  const destCountries = quiz.destinations.filter((d) => d !== "Any / Open to suggestions");
  const dbLevels = getDbStudyLevels(quiz);
  const maxFee = mapBudgetToMax(quiz.budget);

  const { data: scoredCourses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ["eligibility-courses-v2", dbLevels, quiz.subjects, destCountries, maxFee, quiz.needsScholarship, isResultsStep],
    enabled: isResultsStep,
    queryFn: async () => {
      let query = supabase
        .from("courses")
        .select("id, title, slug, university_name, country, city, subject_area, study_level, duration, tuition_fee, intake_dates, description, scholarship_available, featured, entry_requirements, english_requirements");

      if (destCountries.length > 0) query = query.in("country", destCountries);
      if (dbLevels.length > 0) query = query.in("study_level", dbLevels);
      if (quiz.subjects.length > 0 && !quiz.subjects.includes("Other")) query = query.in("subject_area", quiz.subjects);
      if (maxFee !== null) query = query.lte("tuition_fee", maxFee);
      if (quiz.needsScholarship === "Yes definitely") query = query.eq("scholarship_available", true);

      const { data, error } = await query.limit(20);
      if (error) throw error;

      const scored: ScoredCourse[] = (data ?? []).map((course: any) => {
        const score = calculateScore(course, quiz);
        const match = getMatchLabel(score);
        return { ...course, score, matchLabel: match.label, matchColor: match.color };
      });

      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, 10);
    },
  });

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const resolvedCountry = quiz.country === "Other" ? quiz.countryOther : quiz.country;

      await supabase.from("eligibility_leads" as any).insert({
        name: sanitize(lead.name, 100),
        email: sanitize(lead.email, 255),
        phone: sanitize(lead.phone, 30),
        whatsapp: sanitize(lead.whatsapp, 30) || null,
        country: resolvedCountry,
        age_range: quiz.ageRange,
        education_level: quiz.education,
        grade_classification: quiz.grade,
        study_gap: quiz.studyGap,
        study_gap_reason: quiz.studyGapReason || null,
        english_test: quiz.englishTest,
        english_score: quiz.englishScore || null,
        study_level: quiz.studyLevel,
        subjects: quiz.subjects.join(", "),
        destinations: quiz.destinations.join(", "),
        budget: quiz.budget,
        needs_scholarship: quiz.needsScholarship,
        visa_refused: quiz.visaRefused,
        visa_refused_country: quiz.visaRefusedCountry || null,
        current_visa: quiz.currentVisa,
        preferred_start: lead.preferredStart || null,
      });

      await createNotification({
        type: "consultation",
        title: `New Eligibility Check from ${sanitize(lead.name, 100)}`,
        message: `${sanitize(lead.email, 255)} — interested in ${quiz.subjects.join(", ")} in ${quiz.destinations.join(", ")}`,
      });

      setUnlocked(true);
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Check Your Eligibility | Free Course Matching | Applyza" description="Answer 5 quick questions to find courses you're eligible for. Free AI-powered course matching from Applyza." path="/eligibility-check" />
      <Navbar solid />

      <div className="container pt-28 pb-16">
        <div className={`mx-auto ${isResultsStep ? "max-w-6xl" : "max-w-3xl"}`}>
          {/* Progress bar — shown on quiz steps */}
          {!isResultsStep && (
            <div className="bg-background rounded-2xl shadow-lg overflow-hidden border border-border">
              <div className="px-6 pt-5 pb-0">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Step {step + 1} of {TOTAL_STEPS}</span>
                  <span>{TIME_ESTIMATES[step]}</span>
                </div>
                <Progress value={progress} className="h-2 bg-muted [&>div]:bg-secondary" />
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
                    {step === 0 && <Step1 quiz={quiz} update={updateQuiz} />}
                    {step === 1 && <Step2 quiz={quiz} update={updateQuiz} />}
                    {step === 2 && <Step3 quiz={quiz} update={updateQuiz} />}
                    {step === 3 && <Step4 quiz={quiz} update={updateQuiz} />}
                    {step === 4 && <Step5 quiz={quiz} update={updateQuiz} />}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
                  {step > 0 ? (
                    <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <ArrowLeft size={14} /> Back
                    </button>
                  ) : <div />}
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={!canNext()}
                    className="rounded-full px-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50"
                  >
                    {step === 4 ? "See My Results" : "Next"} <ArrowRight size={14} className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6 — Results + Lead Capture */}
          {isResultsStep && (
            <div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-secondary/10">
                  <GraduationCap size={28} className="text-secondary" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
                  {unlocked ? "Your Matched Courses" : `We found ${scoredCourses.length} courses matching your profile`}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {quiz.education} • {quiz.subjects.join(", ")} • {quiz.destinations.join(", ")}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Results — 60% */}
                <div className="lg:col-span-3 order-2 lg:order-1">
                  <ResultsPanel courses={scoredCourses} loading={coursesLoading} unlocked={unlocked} />
                </div>

                {/* Lead form — 40% */}
                {!unlocked && (
                  <div className="lg:col-span-2 order-1 lg:order-2">
                    <div className="bg-background rounded-2xl shadow-lg border border-border p-6 lg:sticky lg:top-28">
                      <h2 className="text-lg font-bold text-primary mb-1">Unlock Your Full Results</h2>
                      <p className="text-sm text-muted-foreground mb-5">Enter your details to see detailed course information and match scores.</p>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-foreground">Full Name *</Label>
                          <Input value={lead.name} onChange={(e) => updateLead({ name: e.target.value })} placeholder="Your full name" className="mt-1" maxLength={100} />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-foreground">Email *</Label>
                          <Input type="email" value={lead.email} onChange={(e) => updateLead({ email: e.target.value })} placeholder="your@email.com" className="mt-1" maxLength={255} />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-foreground">Phone *</Label>
                          <Input type="tel" value={lead.phone} onChange={(e) => updateLead({ phone: e.target.value })} placeholder="+44 7000 000000" className="mt-1" maxLength={30} />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-foreground">WhatsApp (optional)</Label>
                          <Input type="tel" value={lead.whatsapp} onChange={(e) => updateLead({ whatsapp: e.target.value })} placeholder="+44 7000 000000" className="mt-1" maxLength={30} />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-foreground">When do you want to start?</Label>
                          <Select value={lead.preferredStart} onValueChange={(v) => updateLead({ preferredStart: v })}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select preferred start date" />
                            </SelectTrigger>
                            <SelectContent>
                              {START_DATES.map((d) => (
                                <SelectItem key={d} value={d}>{d}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <ConsentCheckbox
                          checked={lead.consent}
                          onCheckedChange={(v) => updateLead({ consent: v })}
                          label="I agree to Applyza's Privacy Policy and consent to being contacted about my course options."
                        />
                        <Button
                          onClick={handleSubmit}
                          disabled={!canSubmit || submitting}
                          className="w-full rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50"
                        >
                          {submitting ? "Loading..." : "Unlock My Results"} <ArrowRight size={14} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Back to quiz */}
              {!unlocked && (
                <div className="mt-6 text-center">
                  <button onClick={() => setStep(4)} className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
                    <ArrowLeft size={14} /> Back to quiz
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EligibilityCheck;
