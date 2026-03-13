import SEO from "@/components/SEO";
import { useState, useMemo, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal, X, BookOpen, ChevronDown, MapPin, Clock, Sparkles, GitCompareArrows } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CourseCompareBar from "@/components/CourseCompareBar";
import CourseCompareModal from "@/components/CourseCompareModal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  entry_requirements: string | null;
  english_requirements: string | null;
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
const INTAKE_OPTIONS = [
  "September 2026",
  "January 2027",
  "May 2027",
  "September 2027",
];
const DURATION_OPTIONS = [
  "Under 1 year",
  "1 year",
  "2 years",
  "3 years",
  "4+ years",
];

const LEVEL_COLORS: Record<string, string> = {
  Foundation: "bg-amber-50 text-amber-700 border-amber-200",
  Undergraduate: "bg-blue-50 text-blue-700 border-blue-200",
  Postgraduate: "bg-purple-50 text-purple-700 border-purple-200",
  "Top-Up": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

// --- Collapsible filter section ---
const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4">
      <button
        className="flex items-center justify-between w-full text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2"
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDown
          size={13}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- University searchable multi-select ---
const UniversityFilter = ({
  universities,
  selected,
  onChange,
}: {
  universities: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) => {
  const [uniSearch, setUniSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = universities.filter((u) =>
    u.toLowerCase().includes(uniSearch.toLowerCase())
  );

  const toggle = (uni: string) => {
    onChange(
      selected.includes(uni)
        ? selected.filter((x) => x !== uni)
        : [...selected, uni]
    );
  };

  return (
    <div ref={ref} className="relative">
      <Input
        placeholder="Search universities..."
        value={uniSearch}
        onChange={(e) => {
          setUniSearch(e.target.value);
          setDropdownOpen(true);
        }}
        onFocus={() => setDropdownOpen(true)}
        className="text-sm h-8 rounded-lg border-gray-200 focus:border-secondary focus:ring-secondary/20"
      />
      {dropdownOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-xs text-gray-400 p-3">No match</p>
          ) : (
            filtered.map((u) => (
              <label
                key={u}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer"
              >
                <Checkbox
                  checked={selected.includes(u)}
                  onCheckedChange={() => toggle(u)}
                  className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                />
                <span className="text-sm text-foreground truncate">{u}</span>
              </label>
            ))
          )}
        </div>
      )}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selected.map((u) => (
            <span
              key={u}
              className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: "rgba(46,196,182,0.1)", color: "#2EC4B6" }}
            >
              {u.length > 20 ? u.slice(0, 20) + "…" : u}
              <button onClick={() => toggle(u)}>
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Duration matcher helper ---
const matchesDuration = (
  courseDuration: string | null,
  filterValues: string[]
): boolean => {
  if (!filterValues.length) return true;
  if (!courseDuration) return false;
  const d = courseDuration.toLowerCase();
  return filterValues.some((f) => {
    switch (f) {
      case "Under 1 year":
        return d.includes("6 month") || d.includes("9 month");
      case "1 year":
        return d === "1 year" || d.includes("1 year") && !d.includes("2") && !d.includes("3") && !d.includes("4");
      case "2 years":
        return d.includes("2 year");
      case "3 years":
        return d.includes("3 year");
      case "4+ years":
        return d.includes("4 year") || d.includes("5 year") || d.includes("6 year");
      default:
        return false;
    }
  });
};

// --- Active filter pill ---
const ActiveFilterPill = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) => (
  <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
    style={{ background: "rgba(46,196,182,0.1)", color: "#2EC4B6", border: "1px solid rgba(46,196,182,0.2)" }}>
    {label}
    <button
      onClick={onRemove}
      className="hover:bg-secondary/20 rounded-full p-0.5 transition-colors"
    >
      <X size={11} />
    </button>
  </span>
);

// ========== MAIN PAGE ==========
const FindACourse = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCountry = searchParams.get("country");
  const initialUniversity = searchParams.get("university");

  const [search, setSearch] = useState(initialSearch);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    initialCountry ? [initialCountry] : ["United Kingdom"]
  );
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>(
    initialUniversity ? [initialUniversity] : []
  );
  const [selectedIntakes, setSelectedIntakes] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [feeRange, setFeeRange] = useState([0, 30000]);
  const [scholarshipOnly, setScholarshipOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select(
          "id, title, slug, university_name, country, city, subject_area, study_level, duration, tuition_fee, intake_dates, description, scholarship_available, featured, entry_requirements, english_requirements"
        );
      if (error) throw error;
      return data as Course[];
    },
  });

  const compareCourses = useMemo(() => courses.filter((c) => compareIds.includes(c.id)), [courses, compareIds]);

  const universityNames = useMemo(
    () => [...new Set(courses.map((c) => c.university_name))].sort(),
    [courses]
  );

  const filtered = useMemo(() => {
    let result = courses.filter((c) => {
      const q = search.toLowerCase();
      if (
        q &&
        !c.title.toLowerCase().includes(q) &&
        !c.university_name.toLowerCase().includes(q)
      )
        return false;
      if (
        selectedCountries.length &&
        !selectedCountries.includes(c.country)
      )
        return false;
      if (selectedLevels.length && !selectedLevels.includes(c.study_level))
        return false;
      if (
        selectedSubjects.length &&
        !selectedSubjects.includes(c.subject_area)
      )
        return false;
      if (
        selectedUniversities.length &&
        !selectedUniversities.includes(c.university_name)
      )
        return false;
      if (selectedIntakes.length) {
        const intakeText = c.intake_dates?.toLowerCase() ?? "";
        const hasMatch = selectedIntakes.some((intake) =>
          intakeText.includes(intake.toLowerCase())
        );
        if (!hasMatch) return false;
      }
      if (!matchesDuration(c.duration, selectedDurations)) return false;
      if (
        c.tuition_fee !== null &&
        (c.tuition_fee < feeRange[0] || c.tuition_fee > feeRange[1])
      )
        return false;
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
        result.sort((a, b) =>
          a.university_name.localeCompare(b.university_name)
        );
        break;
    }
    return result;
  }, [
    courses,
    search,
    selectedCountries,
    selectedLevels,
    selectedSubjects,
    selectedUniversities,
    selectedIntakes,
    selectedDurations,
    feeRange,
    scholarshipOnly,
    sortBy,
  ]);

  const toggleFilter = (
    arr: string[],
    val: string,
    setter: (v: string[]) => void
  ) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const clearAll = () => {
    setSelectedCountries([]);
    setSelectedLevels([]);
    setSelectedSubjects([]);
    setSelectedUniversities([]);
    setSelectedIntakes([]);
    setSelectedDurations([]);
    setFeeRange([0, 30000]);
    setScholarshipOnly(false);
    setSearch("");
  };

  // Build active filter pill list
  const activeFilters: { label: string; onRemove: () => void }[] = [];
  if (search) {
    activeFilters.push({
      label: `Search: "${search}"`,
      onRemove: () => setSearch(""),
    });
  }
  selectedCountries.forEach((c) =>
    activeFilters.push({
      label: `Country: ${c}`,
      onRemove: () =>
        setSelectedCountries(selectedCountries.filter((x) => x !== c)),
    })
  );
  selectedLevels.forEach((l) =>
    activeFilters.push({
      label: `Level: ${l}`,
      onRemove: () =>
        setSelectedLevels(selectedLevels.filter((x) => x !== l)),
    })
  );
  selectedSubjects.forEach((s) =>
    activeFilters.push({
      label: `Subject: ${s}`,
      onRemove: () =>
        setSelectedSubjects(selectedSubjects.filter((x) => x !== s)),
    })
  );
  selectedUniversities.forEach((u) =>
    activeFilters.push({
      label: `Uni: ${u.length > 25 ? u.slice(0, 25) + "…" : u}`,
      onRemove: () =>
        setSelectedUniversities(selectedUniversities.filter((x) => x !== u)),
    })
  );
  selectedIntakes.forEach((i) =>
    activeFilters.push({
      label: `Intake: ${i}`,
      onRemove: () =>
        setSelectedIntakes(selectedIntakes.filter((x) => x !== i)),
    })
  );
  selectedDurations.forEach((d) =>
    activeFilters.push({
      label: `Duration: ${d}`,
      onRemove: () =>
        setSelectedDurations(selectedDurations.filter((x) => x !== d)),
    })
  );
  if (feeRange[0] > 0 || feeRange[1] < 30000) {
    activeFilters.push({
      label: `Fee: £${feeRange[0].toLocaleString()}–£${feeRange[1].toLocaleString()}`,
      onRemove: () => setFeeRange([0, 30000]),
    });
  }
  if (scholarshipOnly) {
    activeFilters.push({
      label: "Scholarship Only",
      onRemove: () => setScholarshipOnly(false),
    });
  }

  const filterPanel = (
    <div className="space-y-4">
      <FilterSection title="Country">
        {COUNTRIES.map((c) => (
          <label key={c} className="flex items-center gap-2 cursor-pointer py-1">
            <Checkbox
              checked={selectedCountries.includes(c)}
              onCheckedChange={() =>
                toggleFilter(selectedCountries, c, setSelectedCountries)
              }
              className="rounded data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
            />
            <span className="text-sm text-foreground">{c}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="University">
        <UniversityFilter
          universities={universityNames}
          selected={selectedUniversities}
          onChange={setSelectedUniversities}
        />
      </FilterSection>

      <FilterSection title="Study Level">
        {STUDY_LEVELS.map((l) => (
          <label key={l} className="flex items-center gap-2 cursor-pointer py-1">
            <Checkbox
              checked={selectedLevels.includes(l)}
              onCheckedChange={() =>
                toggleFilter(selectedLevels, l, setSelectedLevels)
              }
              className="rounded data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
            />
            <span className="text-sm text-foreground">{l}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Subject Area">
        {SUBJECT_AREAS.map((s) => (
          <label key={s} className="flex items-center gap-2 cursor-pointer py-1">
            <Checkbox
              checked={selectedSubjects.includes(s)}
              onCheckedChange={() =>
                toggleFilter(selectedSubjects, s, setSelectedSubjects)
              }
              className="rounded data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
            />
            <span className="text-sm text-foreground">{s}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Intake / Start Date">
        {INTAKE_OPTIONS.map((i) => (
          <label key={i} className="flex items-center gap-2 cursor-pointer py-1">
            <Checkbox
              checked={selectedIntakes.includes(i)}
              onCheckedChange={() =>
                toggleFilter(selectedIntakes, i, setSelectedIntakes)
              }
              className="rounded data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
            />
            <span className="text-sm text-foreground">{i}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Duration">
        {DURATION_OPTIONS.map((d) => (
          <label key={d} className="flex items-center gap-2 cursor-pointer py-1">
            <Checkbox
              checked={selectedDurations.includes(d)}
              onCheckedChange={() =>
                toggleFilter(selectedDurations, d, setSelectedDurations)
              }
              className="rounded data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
            />
            <span className="text-sm text-foreground">{d}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Tuition Fee (per year)">
        <Slider
          min={0}
          max={30000}
          step={500}
          value={feeRange}
          onValueChange={setFeeRange}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>£{feeRange[0].toLocaleString()}</span>
          <span>£{feeRange[1].toLocaleString()}</span>
        </div>
      </FilterSection>

      <div className="flex items-center justify-between pt-1">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Scholarship Available
        </span>
        <Switch
          checked={scholarshipOnly}
          onCheckedChange={setScholarshipOnly}
          className="data-[state=checked]:bg-secondary"
        />
      </div>

      <button
        onClick={clearAll}
        className="w-full text-sm text-gray-400 hover:text-secondary transition-colors text-center py-2"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Find a Course | Search Study Abroad Programmes | Applyza" description="Browse courses across the UK, Europe, and beyond. Filter by country, subject, fees, and study level. Expert guidance from AQF certified counsellors." path="/find-a-course" />
      <Navbar solid />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "#0a0d24" }}>
        {/* Glow effects */}
        <div className="absolute top-0 right-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "rgba(46,196,182,0.08)", filter: "blur(100px)" }} />
        <div className="absolute bottom-0 left-[5%] w-[200px] h-[200px] rounded-full pointer-events-none"
          style={{ background: "rgba(107,63,160,0.10)", filter: "blur(80px)" }} />

        <div className="container relative z-10 pt-28 pb-12 md:pt-32 md:pb-14">
          <Breadcrumb className="mb-5">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" style={{ color: "rgba(255,255,255,0.4)" }} className="hover:text-white/70 text-sm transition-colors">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator style={{ color: "rgba(255,255,255,0.25)" }} />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white/80 text-sm">
                  Find a Course
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-white mb-2"
          >
            Find Your Perfect Course
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm md:text-base mb-6 max-w-xl"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Search thousands of programmes across 150+ universities worldwide
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex rounded-xl overflow-hidden w-full md:w-[65%] backdrop-blur-xl"
            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)" }}
          >
            <div className="flex items-center pl-4">
              <Search size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses, universities, or subjects..."
              className="flex-1 px-3 py-3 text-sm text-white bg-transparent outline-none placeholder:text-white/40 min-w-0"
            />
            <Button className="rounded-lg m-1.5 px-5 shrink-0" style={{ background: "#2EC4B6", color: "#0a0d24" }}>
              Search
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-8 md:py-12">
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-white rounded-xl shadow-sm p-4 max-h-[calc(100vh-7rem)] overflow-y-auto"
              style={{ border: "1px solid hsl(230 25% 93%)" }}>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Filters</h3>
              {filterPanel}
            </div>
          </aside>

          {/* Mobile filter FAB */}
          <div className="lg:hidden fixed bottom-20 right-4 z-40">
            <Button
              size="lg"
              className="rounded-full shadow-xl"
              style={{ background: "#2EC4B6", color: "#0a0d24" }}
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilters.length > 0 && (
                <span className="ml-1 bg-white text-secondary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile filter slide-out */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                  style={{ background: "rgba(10,13,36,0.6)" }}
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white overflow-y-auto p-5"
                >
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Filters</h3>
                    <button onClick={() => setMobileFiltersOpen(false)}>
                      <X size={18} className="text-gray-400" />
                    </button>
                  </div>
                  {filterPanel}
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Main results */}
          <div className="flex-1 min-w-0">
            {/* Active filter pills */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {activeFilters.map((f, i) => (
                  <ActiveFilterPill
                    key={`${f.label}-${i}`}
                    label={f.label}
                    onRemove={f.onRemove}
                  />
                ))}
                <button
                  onClick={clearAll}
                  className="text-xs text-gray-400 hover:text-secondary underline ml-1 transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filtered.length}
                </span>{" "}
                courses
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 rounded-lg border-gray-200 text-sm h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="fee-asc">
                    Tuition (Low to High)
                  </SelectItem>
                  <SelectItem value="fee-desc">
                    Tuition (High to Low)
                  </SelectItem>
                  <SelectItem value="university">University (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-5 animate-pulse"
                    style={{ border: "1px solid hsl(230 25% 93%)" }}
                  >
                    <div className="h-3 w-28 bg-gray-100 rounded mb-3" />
                    <div className="h-5 w-3/4 bg-gray-100 rounded mb-4" />
                    <div className="flex gap-2 mb-3">
                      <div className="h-3 w-16 bg-gray-100 rounded" />
                      <div className="h-3 w-12 bg-gray-100 rounded" />
                      <div className="h-5 w-20 bg-gray-100 rounded-full" />
                    </div>
                    <div className="h-6 w-24 bg-gray-100 rounded mb-4" />
                    <div className="flex gap-2 pt-2">
                      <div className="h-9 flex-1 bg-gray-100 rounded-lg" />
                      <div className="h-9 flex-1 bg-gray-100 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 mx-auto mb-5 bg-gray-50 rounded-full flex items-center justify-center">
                  <BookOpen size={28} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  No courses match your search
                </h3>
                <p className="text-sm text-gray-500 mb-5 max-w-md mx-auto">
                  Try adjusting your filters or book a consultation for personalised recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" onClick={clearAll} className="rounded-lg">
                    Clear Filters
                  </Button>
                  <Button asChild className="rounded-lg" style={{ background: "#2EC4B6", color: "#0a0d24" }}>
                    <Link to="/book-a-consultation">Book a Consultation</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} isCompared={compareIds.includes(course.id)} onToggleCompare={() => toggleCompare(course.id)} compareDisabled={compareIds.length >= 3 && !compareIds.includes(course.id)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <CourseCompareBar
        courses={compareCourses.map((c) => ({ id: c.id, title: c.title, university_name: c.university_name }))}
        onRemove={(id) => setCompareIds((prev) => prev.filter((x) => x !== id))}
        onClear={() => setCompareIds([])}
        onCompare={() => setShowCompareModal(true)}
      />
      <AnimatePresence>
        {showCompareModal && compareCourses.length >= 2 && (
          <CourseCompareModal courses={compareCourses} onClose={() => setShowCompareModal(false)} />
        )}
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const CourseCard = ({ course }: { course: Course }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
    style={{ border: "1px solid hsl(230 25% 93%)" }}>
    <p className="text-[11px] text-gray-400 mb-1 font-medium">
      {course.university_name}
    </p>
    <h3 className="text-base font-bold leading-snug mb-3" style={{ color: "#1B2150" }}>
      {course.title}
    </h3>

    <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500 mb-3">
      <span className="inline-flex items-center gap-1">
        <MapPin size={11} className="text-gray-400" /> {course.city}
      </span>
      {course.duration && (
        <span className="inline-flex items-center gap-1">
          <Clock size={11} className="text-gray-400" /> {course.duration}
        </span>
      )}
      <span
        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
          LEVEL_COLORS[course.study_level] ?? "bg-gray-50 text-gray-600 border-gray-200"
        }`}
      >
        {course.study_level}
      </span>
    </div>

    <p className="text-xl font-bold mb-2" style={{ color: "#1B2150" }}>
      £{course.tuition_fee?.toLocaleString()}{" "}
      <span className="text-xs font-normal text-gray-400">/ year</span>
    </p>

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
);

export default FindACourse;
