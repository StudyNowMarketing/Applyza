import { useState, useMemo, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal, X, BookOpen, ChevronDown } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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
  Foundation: "bg-amber-100 text-amber-800",
  Undergraduate: "bg-blue-100 text-blue-800",
  Postgraduate: "bg-purple-100 text-purple-800",
  "Top-Up": "bg-emerald-100 text-emerald-800",
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
    <div>
      <button
        className="flex items-center justify-between w-full text-sm font-bold text-foreground mb-2"
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDown
          size={14}
          className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div>{children}</div>}
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
        className="text-sm h-9"
      />
      {dropdownOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-xs text-muted-foreground p-3">No match</p>
          ) : (
            filtered.map((u) => (
              <label
                key={u}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-muted/50 cursor-pointer"
              >
                <Checkbox
                  checked={selected.includes(u)}
                  onCheckedChange={() => toggle(u)}
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
              className="inline-flex items-center gap-1 bg-muted text-foreground text-[11px] px-2 py-0.5 rounded-full"
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
  <span className="inline-flex items-center gap-1 bg-secondary/15 text-secondary border border-secondary/25 text-xs font-medium px-2.5 py-1 rounded-full">
    {label}
    <button
      onClick={onRemove}
      className="hover:bg-secondary/20 rounded-full p-0.5 transition-colors"
    >
      <X size={12} />
    </button>
  </span>
);

// ========== MAIN PAGE ==========
const FindACourse = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCountry = searchParams.get("country");

  const [search, setSearch] = useState(initialSearch);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    initialCountry ? [initialCountry] : ["United Kingdom"]
  );
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>(
    []
  );
  const [selectedIntakes, setSelectedIntakes] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [feeRange, setFeeRange] = useState([0, 30000]);
  const [scholarshipOnly, setScholarshipOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select(
          "id, title, slug, university_name, country, city, subject_area, study_level, duration, tuition_fee, intake_dates, description, scholarship_available, featured"
        );
      if (error) throw error;
      return data as Course[];
    },
  });

  // Derive unique university names
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
    <div className="space-y-5">
      <FilterSection title="Country">
        {COUNTRIES.map((c) => (
          <label key={c} className="flex items-center gap-2 cursor-pointer py-1">
            <Checkbox
              checked={selectedCountries.includes(c)}
              onCheckedChange={() =>
                toggleFilter(selectedCountries, c, setSelectedCountries)
              }
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
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>£{feeRange[0].toLocaleString()}</span>
          <span>£{feeRange[1].toLocaleString()}</span>
        </div>
      </FilterSection>

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-foreground">
          Scholarship Available
        </span>
        <Switch
          checked={scholarshipOnly}
          onCheckedChange={setScholarshipOnly}
        />
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
                  <Link
                    to="/"
                    className="text-primary-foreground/60 hover:text-primary-foreground"
                  >
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary-foreground">
                  Find a Course
                </BreadcrumbPage>
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
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-card rounded-xl border border-border p-5 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <h3 className="font-bold text-foreground mb-4">Filters</h3>
              {filterPanel}
            </div>
          </aside>

          {/* Mobile filter FAB */}
          <div className="lg:hidden fixed bottom-20 right-4 z-40">
            <Button
              variant="teal"
              size="lg"
              className="rounded-full shadow-xl"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal size={18} />
              Filters
              {activeFilters.length > 0 && (
                <span className="ml-1 bg-primary-foreground text-secondary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile filter slide-out (from left) */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-foreground/50"
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-card overflow-y-auto p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-foreground">Filters</h3>
                    <button onClick={() => setMobileFiltersOpen(false)}>
                      <X size={20} className="text-muted-foreground" />
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
                  className="text-xs text-muted-foreground hover:text-foreground underline ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filtered.length}
                </span>{" "}
                courses
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-52">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-card rounded-xl border border-border p-6 animate-pulse h-64"
                  />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 px-4">
                <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <BookOpen size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  No courses found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We couldn't find any courses matching your current filters.
                  Try adjusting your search criteria or clearing some filters.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" onClick={clearAll}>
                    Clear All Filters
                  </Button>
                  <Button variant="teal" asChild>
                    <Link to="#consultation">Book a Consultation</Link>
                  </Button>
                </div>
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
    <p className="text-xs text-muted-foreground mb-1">
      {course.university_name}
    </p>
    <h3 className="text-lg font-bold text-foreground leading-snug mb-3">
      {course.title}
    </h3>

    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
      <span>🇬🇧 {course.city}</span>
      <span className="text-border">|</span>
      <span>{course.duration}</span>
      <span
        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
          LEVEL_COLORS[course.study_level] ?? "bg-muted text-muted-foreground"
        }`}
      >
        {course.study_level}
      </span>
    </div>

    <p className="text-base font-bold text-foreground mb-2">
      £{course.tuition_fee?.toLocaleString()}{" "}
      <span className="text-xs font-normal text-muted-foreground">/ year</span>
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
