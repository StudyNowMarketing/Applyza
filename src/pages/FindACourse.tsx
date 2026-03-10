import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
  description: string | null;
  scholarship_available: boolean | null;
  featured: boolean | null;
};

const COUNTRIES = ["United Kingdom"];
const STUDY_LEVELS = ["Foundation", "Undergraduate", "Postgraduate", "Top-Up"];
const SUBJECT_AREAS = [
  "Business & Management",
  "Computing & IT",
  "Engineering",
  "Law",
  "Healthcare & Nursing",
  "Arts & Design",
  "Science",
];

const LEVEL_COLORS: Record<string, string> = {
  Foundation: "bg-amber-100 text-amber-800",
  Undergraduate: "bg-blue-100 text-blue-800",
  Postgraduate: "bg-purple-100 text-purple-800",
  "Top-Up": "bg-emerald-100 text-emerald-800",
};

const FindACourse = () => {
  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["United Kingdom"]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [feeRange, setFeeRange] = useState([0, 30000]);
  const [scholarshipOnly, setScholarshipOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, title, slug, university_name, country, city, subject_area, study_level, duration, tuition_fee, intake_dates, description, scholarship_available, featured");
      if (error) throw error;
      return data as Course[];
    },
  });

  const filtered = useMemo(() => {
    let result = courses.filter((c) => {
      const q = search.toLowerCase();
      if (q && !c.title.toLowerCase().includes(q) && !c.university_name.toLowerCase().includes(q)) return false;
      if (selectedCountries.length && !selectedCountries.includes(c.country)) return false;
      if (selectedLevels.length && !selectedLevels.includes(c.study_level)) return false;
      if (selectedSubjects.length && !selectedSubjects.includes(c.subject_area)) return false;
      if (c.tuition_fee !== null && (c.tuition_fee < feeRange[0] || c.tuition_fee > feeRange[1])) return false;
      if (scholarshipOnly && !c.scholarship_available) return false;
      return true;
    });

    switch (sortBy) {
      case "fee-asc":
        result.sort((a, b) => (a.tuition_fee ?? 0) - (b.tuition_fee ?? 0));
        break;
      case "fee-desc":
        result.sort((a, b) => (b.tuition_fee ?? 0) - (a.tuition_fee ?? 0));
        break;
      case "university":
        result.sort((a, b) => a.university_name.localeCompare(b.university_name));
        break;
    }
    return result;
  }, [courses, search, selectedCountries, selectedLevels, selectedSubjects, feeRange, scholarshipOnly, sortBy]);

  const toggleFilter = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const clearAll = () => {
    setSelectedCountries([]);
    setSelectedLevels([]);
    setSelectedSubjects([]);
    setFeeRange([0, 30000]);
    setScholarshipOnly(false);
    setSearch("");
  };

  const filterPanel = (
    <div className="space-y-6">
      {/* Country */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-3">Country</h4>
        {COUNTRIES.map((c) => (
          <label key={c} className="flex items-center gap-2 cursor-pointer py-1">
            <Checkbox
              checked={selectedCountries.includes(c)}
              onCheckedChange={() => toggleFilter(selectedCountries, c, setSelectedCountries)}
            />
            <span className="text-sm text-foreground">{c}</span>
          </label>
        ))}
      </div>

      {/* Study Level */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-3">Study Level</h4>
        {STUDY_LEVELS.map((l) => (
          <label key={l} className="flex items-center gap-2 cursor-pointer py-1">
            <Checkbox
              checked={selectedLevels.includes(l)}
              onCheckedChange={() => toggleFilter(selectedLevels, l, setSelectedLevels)}
            />
            <span className="text-sm text-foreground">{l}</span>
          </label>
        ))}
      </div>

      {/* Subject Area */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-3">Subject Area</h4>
        {SUBJECT_AREAS.map((s) => (
          <label key={s} className="flex items-center gap-2 cursor-pointer py-1">
            <Checkbox
              checked={selectedSubjects.includes(s)}
              onCheckedChange={() => toggleFilter(selectedSubjects, s, setSelectedSubjects)}
            />
            <span className="text-sm text-foreground">{s}</span>
          </label>
        ))}
      </div>

      {/* Tuition Fee */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-3">Tuition Fee (per year)</h4>
        <Slider
          min={0}
          max={30000}
          step={500}
          value={feeRange}
          onValueChange={setFeeRange}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>£{feeRange[0].toLocaleString()}</span>
          <span>£{feeRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Scholarship */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-foreground">Scholarship Available</span>
        <Switch checked={scholarshipOnly} onCheckedChange={setScholarshipOnly} />
      </div>

      <Button variant="outline" className="w-full" onClick={clearAll}>
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="gradient-navy pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="container">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary-foreground">Find a Course</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-[44px] md:leading-tight font-extrabold text-primary-foreground mb-4"
          >
            Find Your Perfect Course
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-primary-foreground/70 text-base md:text-lg mb-8 max-w-xl"
          >
            Search thousands of programmes across 150+ universities worldwide
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex bg-primary-foreground rounded-full overflow-hidden shadow-2xl w-full md:w-[70%]"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses, universities, or subjects..."
              className="flex-1 px-5 py-3.5 text-sm text-foreground bg-transparent outline-none placeholder:text-muted-foreground min-w-0"
            />
            <Button variant="teal" className="rounded-full m-1 px-5 shrink-0">
              <Search size={18} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-10 md:py-14">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-foreground mb-4">Filters</h3>
              {filterPanel}
            </div>
          </aside>

          {/* Mobile filter toggle */}
          <div className="lg:hidden fixed bottom-20 right-4 z-40">
            <Button
              variant="teal"
              size="lg"
              className="rounded-full shadow-xl"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal size={18} />
              Filters
            </Button>
          </div>

          {/* Mobile filter drawer */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-foreground/50" onClick={() => setMobileFiltersOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-card overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-foreground">Filters</h3>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <X size={20} className="text-muted-foreground" />
                  </button>
                </div>
                {filterPanel}
              </div>
            </div>
          )}

          {/* Main results */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filtered.length}</span> courses
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-52">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="fee-asc">Tuition (Low to High)</SelectItem>
                  <SelectItem value="fee-desc">Tuition (High to Low)</SelectItem>
                  <SelectItem value="university">University (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-xl border border-border p-6 animate-pulse h-64" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-2">No courses match your filters</p>
                <Button variant="outline" onClick={clearAll}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const CourseCard = ({ course }: { course: Course }) => (
  <div className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <p className="text-xs text-muted-foreground mb-1">{course.university_name}</p>
    <h3 className="text-lg font-bold text-foreground leading-snug mb-3">{course.title}</h3>

    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
      <span>🇬🇧 {course.city}</span>
      <span className="text-border">|</span>
      <span>{course.duration}</span>
      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${LEVEL_COLORS[course.study_level] ?? "bg-muted text-muted-foreground"}`}>
        {course.study_level}
      </span>
    </div>

    <p className="text-base font-bold text-foreground mb-2">
      £{course.tuition_fee?.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">/ year</span>
    </p>

    {course.scholarship_available && (
      <Badge variant="secondary" className="mb-3 text-[11px]">
        Scholarship Available
      </Badge>
    )}

    <div className="flex gap-2 mt-auto pt-2">
      <Button variant="outline" size="sm" className="flex-1" asChild>
        <Link to={`/courses/${course.slug}`}>View Details</Link>
      </Button>
      <Button variant="teal" size="sm" className="flex-1">
        Apply with Applyza
      </Button>
    </div>
  </div>
);

export default FindACourse;
