import { Link } from "react-router-dom";
import { MapPin, Clock, Sparkles, GraduationCap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ScoredCourse } from "./types";

interface ResultsPanelProps {
  courses: ScoredCourse[];
  loading: boolean;
  unlocked: boolean;
}

const LEVEL_COLORS: Record<string, string> = {
  Foundation: "bg-amber-50 text-amber-700 border-amber-200",
  Undergraduate: "bg-blue-50 text-blue-700 border-blue-200",
  Postgraduate: "bg-purple-50 text-purple-700 border-purple-200",
  "Top-Up": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const ResultsPanel = ({ courses, loading, unlocked }: ResultsPanelProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-background rounded-xl p-5 animate-pulse border border-border">
            <div className="h-3 w-28 bg-muted rounded mb-3" />
            <div className="h-5 w-3/4 bg-muted rounded mb-4" />
            <div className="h-6 w-24 bg-muted rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-background rounded-2xl border border-border">
        <div className="w-16 h-16 mx-auto mb-5 bg-muted rounded-full flex items-center justify-center">
          <GraduationCap size={28} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">We couldn't find exact matches</h3>
        <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
          But our counsellors can help find the right course for you based on your profile and preferences.
        </p>
        <Button asChild className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <Link to="/book-a-consultation">Book a Free Consultation</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      {!unlocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-3 border border-border shadow-lg pointer-events-auto">
            <Lock size={20} className="text-secondary" />
            <span className="font-semibold text-foreground text-sm">Enter your details to unlock full results</span>
          </div>
        </div>
      )}
      <div className={`space-y-3 transition-all duration-500 ${!unlocked ? "blur-[4px] select-none" : ""}`}>
        {courses.map((course) => (
          <div key={course.id} className="bg-background rounded-xl p-5 border border-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-muted-foreground mb-1 font-medium">{course.university_name}</p>
                <h3 className="text-base font-bold leading-snug text-primary">{course.title}</h3>
              </div>
              <span className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold border ${course.matchColor}`}>
                {course.score}% — {course.matchLabel}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground mb-3">
              <span className="inline-flex items-center gap-1"><MapPin size={11} /> {course.city}, {course.country}</span>
              {course.duration && <span className="inline-flex items-center gap-1"><Clock size={11} /> {course.duration}</span>}
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${LEVEL_COLORS[course.study_level] ?? "bg-muted text-muted-foreground border-border"}`}>
                {course.study_level}
              </span>
            </div>
            {course.tuition_fee && (
              <p className="text-xl font-bold text-primary mb-2">
                £{course.tuition_fee.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">/ year</span>
              </p>
            )}
            {course.scholarship_available && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full mb-3 w-fit bg-secondary/10 text-secondary">
                <Sparkles size={10} /> Scholarship Available
              </span>
            )}
            {unlocked && (
              <div className="flex gap-2 mt-3 pt-2 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1 rounded-lg text-xs" asChild>
                  <Link to={`/find-a-course/${course.slug}`}>View Details</Link>
                </Button>
                <Button size="sm" className="flex-1 rounded-lg text-xs bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
                  <Link to="/book-a-consultation">Apply with Applyza</Link>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      {unlocked && (
        <div className="mt-8 text-center space-y-3">
          <Link to="/find-a-course" className="text-sm font-medium text-secondary hover:underline">
            Want more options? Search all courses →
          </Link>
          <br />
          <Link to="/book-a-consultation" className="text-sm text-muted-foreground hover:underline">
            Book a free consultation to discuss your options →
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;
