import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MovingBorderButton } from "@/components/ui/MovingBorder";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";
import {
  Globe, Clock, Banknote, Briefcase, MapPin, CheckCircle, BookOpen, ArrowLeft, FileText,
  Wrench, GraduationCap, Star, Award, ChevronRight, Users, TrendingUp, Shield,
} from "lucide-react";
import VideoBackground from "@/components/VideoBackground";
import { getVideoForSlug } from "@/lib/destinationVideos";

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
  usa: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80",
  canada: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&q=80",
  spain: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1200&q=80",
  portugal: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=80",
  cyprus: "https://images.unsplash.com/photo-1558383817-0f1e3651efba?w=1200&q=80",
  uae: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
  japan: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
  china: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&q=80",
  russia: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1200&q=80",
  hungary: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80",
};

const FLAGS: Record<string, string> = {
  "united-kingdom": "🇬🇧", usa: "🇺🇸", canada: "🇨🇦", germany: "🇩🇪",
  france: "🇫🇷", ireland: "🇮🇪", malta: "🇲🇹", netherlands: "🇳🇱",
  spain: "🇪🇸", portugal: "🇵🇹", cyprus: "🇨🇾", uae: "🇦🇪",
  japan: "🇯🇵", china: "🇨🇳", russia: "🇷🇺", hungary: "🇭🇺",
};

type DestinationExtra = {
  universities: { name: string; note: string }[];
  scholarships: { name: string; desc: string; type: string }[];
  studentLife: string[];
};

const EXTRAS: Record<string, DestinationExtra> = {
  "united-kingdom": {
    universities: [
      { name: "University of Oxford", note: "World #1" },
      { name: "University of Cambridge", note: "World #2" },
      { name: "Imperial College London", note: "World #6" },
      { name: "UCL", note: "World #9" },
      { name: "University of Edinburgh", note: "World #22" },
    ],
    scholarships: [
      { name: "Chevening Scholarship", desc: "Fully funded UK government scholarship for outstanding emerging leaders.", type: "Fully Funded" },
      { name: "Commonwealth Scholarship", desc: "Postgraduate opportunities for students from Commonwealth member countries.", type: "Fully Funded" },
      { name: "GREAT Scholarship", desc: "University-specific scholarships in partnership with the British Council.", type: "Partial" },
    ],
    studentLife: ["World-class research culture", "700,000+ international students", "Rich history & vibrant cities", "Strong graduate networks"],
  },
  usa: {
    universities: [
      { name: "Harvard University", note: "World #4" },
      { name: "MIT", note: "World #1" },
      { name: "Stanford University", note: "World #5" },
      { name: "University of Chicago", note: "World #11" },
      { name: "Columbia University", note: "World #12" },
    ],
    scholarships: [
      { name: "Fulbright Foreign Student Program", desc: "Prestigious US government scholarship — covers tuition, living, and travel.", type: "Fully Funded" },
      { name: "Hubert H. Humphrey Fellowship", desc: "Non-degree programme for mid-career professionals from developing nations.", type: "Fully Funded" },
      { name: "University Merit Aid", desc: "Most US universities offer competitive scholarships for top international applicants.", type: "Partial" },
    ],
    studentLife: ["World's largest university network", "1M+ international students", "Greek life, clubs & sport", "Silicon Valley access"],
  },
  canada: {
    universities: [
      { name: "University of Toronto", note: "World #21" },
      { name: "McGill University", note: "World #29" },
      { name: "University of British Columbia", note: "World #34" },
      { name: "McMaster University", note: "World #176" },
      { name: "University of Alberta", note: "World #111" },
    ],
    scholarships: [
      { name: "Vanier Canada Graduate Scholarship", desc: "For doctoral students demonstrating leadership and academic excellence.", type: "Fully Funded" },
      { name: "Ontario Trillium Scholarship", desc: "For PhD students at Ontario universities — CAD $40,000/year.", type: "Fully Funded" },
      { name: "University of Toronto International Scholar Award", desc: "Partial tuition scholarship for outstanding international students.", type: "Partial" },
    ],
    studentLife: ["Multicultural campus life", "Safe, welcoming cities", "Maple, ice hockey & culture", "Clear PR pathway"],
  },
  germany: {
    universities: [
      { name: "Technical University of Munich", note: "Europe's top tech uni" },
      { name: "Ludwig Maximilian University", note: "World #59" },
      { name: "Heidelberg University", note: "Germany's oldest university" },
      { name: "Humboldt University Berlin", note: "Research powerhouse" },
      { name: "RWTH Aachen University", note: "Top engineering school" },
    ],
    scholarships: [
      { name: "DAAD Scholarship", desc: "Germany's largest scholarship programme — funded by the German government.", type: "Fully Funded" },
      { name: "Deutschlandstipendium", desc: "€300/month scholarship co-funded by government and private companies.", type: "Partial" },
      { name: "Heinrich Böll Foundation", desc: "For politically engaged students committed to social causes.", type: "Fully Funded" },
    ],
    studentLife: ["Vibrant Berlin arts scene", "Oktoberfest & culture", "Affordable student cities", "Strong engineering community"],
  },
  france: {
    universities: [
      { name: "Sorbonne University", note: "800+ year legacy" },
      { name: "HEC Paris", note: "Europe's #1 Business School" },
      { name: "École Polytechnique", note: "Top engineering school" },
      { name: "Sciences Po Paris", note: "Premier social sciences" },
      { name: "INSEAD", note: "World's top MBA programme" },
    ],
    scholarships: [
      { name: "Eiffel Excellence Scholarship", desc: "French government scholarship for outstanding international Master's and PhD students.", type: "Fully Funded" },
      { name: "Erasmus+ Programme", desc: "EU exchange programme with grants for studying across European universities.", type: "Partial" },
      { name: "Campus France Scholarship", desc: "Directory of French government and embassy scholarships by country.", type: "Varies" },
    ],
    studentLife: ["World-famous café culture", "Fashion, art & cuisine", "Subsidised student housing (CROUS)", "Central Schengen location"],
  },
  ireland: {
    universities: [
      { name: "Trinity College Dublin", note: "Founded 1592, World #81" },
      { name: "University College Dublin", note: "Ireland's largest university" },
      { name: "University College Cork", note: "Strong research culture" },
      { name: "NUI Galway", note: "Leading science & tech" },
      { name: "Dublin City University", note: "Top for business & law" },
    ],
    scholarships: [
      { name: "Government of Ireland International Education Scholarship", desc: "For high-achieving non-EU students — €10,000 award plus fee waiver.", type: "Fully Funded" },
      { name: "Trinity Global Excellence Scholarship", desc: "Up to €5,000 for outstanding postgraduate international students.", type: "Partial" },
      { name: "UCD Global Excellence Scholarship", desc: "Partial fee reduction for high-achieving international students.", type: "Partial" },
    ],
    studentLife: ["Lively pub & music culture", "World-famous hospitality", "Stunning Atlantic landscapes", "English-speaking EU life"],
  },
  malta: {
    universities: [
      { name: "University of Malta", note: "Malta's national university" },
      { name: "MCAST", note: "Applied & vocational degrees" },
      { name: "American University of Malta", note: "US-accredited programmes" },
      { name: "London School of Commerce Malta", note: "UK-validated degrees" },
      { name: "Institute of Tourism Studies", note: "Hospitality & tourism" },
    ],
    scholarships: [
      { name: "Malta Government Scholarship Scheme", desc: "For students pursuing postgraduate degrees at the University of Malta.", type: "Partial" },
      { name: "ENDEAVOUR Scholarship Scheme", desc: "EU-funded mobility scholarships for students across all disciplines.", type: "Partial" },
      { name: "University of Malta Bursaries", desc: "Need and merit-based financial support for eligible students.", type: "Partial" },
    ],
    studentLife: ["Mediterranean island life", "300+ days of sunshine", "Safe, compact, walkable", "Vibrant expat community"],
  },
  netherlands: {
    universities: [
      { name: "Delft University of Technology", note: "World's top tech university" },
      { name: "University of Amsterdam", note: "World #53" },
      { name: "Erasmus University Rotterdam", note: "Top business & economics" },
      { name: "Utrecht University", note: "World #65" },
      { name: "Eindhoven University", note: "Top STEM university" },
    ],
    scholarships: [
      { name: "Holland Scholarship", desc: "Dutch government scholarship for non-EEA students — €5,000 award.", type: "Partial" },
      { name: "Erasmus+ Programme", desc: "EU exchange grants for studying at partner universities across Europe.", type: "Partial" },
      { name: "TU Delft Excellence Scholarship", desc: "Full tuition + living allowance for exceptional international students.", type: "Fully Funded" },
    ],
    studentLife: ["Cycling culture & canals", "Highly international campuses", "Innovative startup scene", "Student cities with excellent transport"],
  },
  spain: {
    universities: [
      { name: "University of Barcelona", note: "Spain's top research university" },
      { name: "Complutense University of Madrid", note: "One of world's oldest universities" },
      { name: "IE Business School", note: "Top-ranked private business school" },
      { name: "Universidad Autónoma de Madrid", note: "Strong sciences & humanities" },
      { name: "ESADE Business School", note: "World's top MBA programme" },
    ],
    scholarships: [
      { name: "Spanish Government Scholarship (MAEC-AECID)", desc: "For postgraduate students from partner countries — covers tuition and living.", type: "Fully Funded" },
      { name: "Erasmus+ Programme", desc: "EU exchange programme with generous grants for European partner students.", type: "Partial" },
      { name: "IE University Scholarships", desc: "Merit-based scholarships covering up to 50% of tuition at IE University.", type: "Partial" },
    ],
    studentLife: ["Festivals, tapas & flamenco", "Late-night student culture", "Year-round warm climate", "Affordable Mediterranean lifestyle"],
  },
  portugal: {
    universities: [
      { name: "University of Lisbon", note: "Portugal's top-ranked university" },
      { name: "University of Porto", note: "Strong engineering & sciences" },
      { name: "University of Coimbra", note: "World Heritage Site, founded 1290" },
      { name: "Nova University Lisbon", note: "Top for business & law" },
      { name: "University of Minho", note: "Rising research university" },
    ],
    scholarships: [
      { name: "Portuguese Government Scholarship", desc: "For postgraduate students in science, technology and humanities fields.", type: "Partial" },
      { name: "Erasmus+ Programme", desc: "EU-funded grants for students at European partner institutions.", type: "Partial" },
      { name: "FCT Doctoral Scholarships", desc: "For PhD students — competitive funding from Portugal's science foundation.", type: "Fully Funded" },
    ],
    studentLife: ["Lisbon's vibrant startup scene", "Fado music & rich culture", "Surf, sun & seafood", "Affordable cosmopolitan life"],
  },
  cyprus: {
    universities: [
      { name: "University of Cyprus", note: "Cyprus's top public university" },
      { name: "Cyprus University of Technology", note: "Strong sciences & engineering" },
      { name: "University of Nicosia", note: "Largest private university" },
      { name: "European University Cyprus", note: "Wide English-taught programmes" },
      { name: "Frederick University", note: "Applied and professional degrees" },
    ],
    scholarships: [
      { name: "University of Nicosia Scholarship", desc: "Merit-based partial tuition awards for eligible international students.", type: "Partial" },
      { name: "IDP International Student Scholarship", desc: "Scholarships available through Applyza partner institutions in Cyprus.", type: "Partial" },
      { name: "University of Cyprus Excellence Award", desc: "For top-performing applicants entering undergraduate programmes.", type: "Partial" },
    ],
    studentLife: ["Mediterranean island lifestyle", "International campus community", "Water sports & hiking", "Safe, relaxed environment"],
  },
  uae: {
    universities: [
      { name: "New York University Abu Dhabi", note: "World-class liberal arts" },
      { name: "University of Birmingham Dubai", note: "Top-ranked UK branch campus" },
      { name: "Heriot-Watt University Dubai", note: "Strong engineering & business" },
      { name: "Middlesex University Dubai", note: "Broad range of programmes" },
      { name: "Sorbonne University Abu Dhabi", note: "French university in the Gulf" },
    ],
    scholarships: [
      { name: "UAE Government Merit Scholarships", desc: "Available to outstanding international students through select UAE institutions.", type: "Partial" },
      { name: "NYU Abu Dhabi Global Scholarship", desc: "Highly competitive full scholarship for exceptional global students.", type: "Fully Funded" },
      { name: "University-Specific Bursaries", desc: "Most UAE branch campuses offer merit-based fee reductions of 10–50%.", type: "Partial" },
    ],
    studentLife: ["Tax-free, modern lifestyle", "World's largest mall & attractions", "100+ nationalities on campus", "Desert, sea & urban experiences"],
  },
  japan: {
    universities: [
      { name: "University of Tokyo", note: "Asia's #1 — QS World #32" },
      { name: "Kyoto University", note: "QS World #55" },
      { name: "Osaka University", note: "QS World #75" },
      { name: "Tohoku University", note: "Top research university" },
      { name: "Waseda University", note: "Leading private university" },
    ],
    scholarships: [
      { name: "MEXT Scholarship", desc: "Japanese government scholarship covering full tuition, stipend and flights for international students.", type: "Fully Funded" },
      { name: "JASSO Scholarship", desc: "Monthly stipend of ¥48,000 for international students at Japanese universities.", type: "Partial" },
      { name: "University-Specific Awards", desc: "Many Japanese universities offer additional fee waivers and merit scholarships for high-achieving applicants.", type: "Partial" },
    ],
    studentLife: ["Ancient temples & modern tech", "World-class safety & transport", "Unique cultural immersion", "Thriving international student community"],
  },
  china: {
    universities: [
      { name: "Tsinghua University", note: "QS World #14" },
      { name: "Peking University", note: "QS World #17" },
      { name: "Fudan University", note: "QS World #39" },
      { name: "Zhejiang University", note: "Top science & engineering" },
      { name: "Shanghai Jiao Tong University", note: "Leading tech & medicine" },
    ],
    scholarships: [
      { name: "Chinese Government Scholarship (CSC)", desc: "Fully funded scholarship covering tuition, accommodation and monthly stipend — 50,000+ awards annually.", type: "Fully Funded" },
      { name: "Belt & Road Scholarship", desc: "For students from B&R partner countries — covers fees and living costs.", type: "Fully Funded" },
      { name: "University-Specific Scholarships", desc: "Top universities offer partial scholarships based on academic merit for international applicants.", type: "Partial" },
    ],
    studentLife: ["2,000+ English-taught programmes", "Fastest-growing economy to study in", "Ancient history meets modern cities", "Affordable living in world-class cities"],
  },
  russia: {
    universities: [
      { name: "Lomonosov Moscow State University", note: "QS World #87" },
      { name: "Moscow Institute of Physics & Technology", note: "Top STEM university" },
      { name: "HSE University", note: "Leading economics & social sciences" },
      { name: "St. Petersburg State University", note: "Russia's oldest university" },
      { name: "Novosibirsk State University", note: "Strong sciences & maths" },
    ],
    scholarships: [
      { name: "Russian Government Quota", desc: "Over 30,000 fully funded places annually for international students — covers tuition and dormitory.", type: "Fully Funded" },
      { name: "Open Doors Olympiad", desc: "Competitive scholarship for Master's and PhD applicants who win or place in the Open Doors academic competition.", type: "Fully Funded" },
      { name: "University Merit Scholarships", desc: "Individual universities offer merit-based fee discounts for high-achieving international applicants.", type: "Partial" },
    ],
    studentLife: ["Rich classical arts & culture", "Affordable cost of living", "Strong STEM tradition", "Multicultural student cities"],
  },
  hungary: {
    universities: [
      { name: "University of Debrecen", note: "Top-ranked for medicine & science" },
      { name: "Eötvös Loránd University (ELTE)", note: "Hungary's oldest university" },
      { name: "Semmelweis University", note: "Leading medical university" },
      { name: "Corvinus University Budapest", note: "Top business & economics" },
      { name: "Budapest University of Technology", note: "Strong engineering & IT" },
    ],
    scholarships: [
      { name: "Stipendium Hungaricum", desc: "Hungarian government scholarship — 5,000+ places per year covering full tuition, accommodation and health insurance.", type: "Fully Funded" },
      { name: "Hungarian State Scholarship", desc: "Short-term mobility grants for undergraduate and postgraduate students from partner countries.", type: "Partial" },
      { name: "University Excellence Scholarships", desc: "Hungarian universities offer merit-based partial awards for high-performing international students.", type: "Partial" },
    ],
    studentLife: ["EU capital at affordable prices", "Stunning Budapest architecture", "Vibrant nightlife & ruin bars", "Central location for European travel"],
  },
};

const LEVEL_COLORS: Record<string, string> = {
  Postgraduate: "bg-secondary/15 text-secondary",
  Undergraduate: "bg-accent/15 text-accent",
  Foundation: "bg-orange-100 text-orange-700",
  "Top-Up": "bg-blue-100 text-blue-700",
};

type Course = {
  id: string; title: string; slug: string; university_name: string;
  country: string; city: string; subject_area: string; study_level: string;
  duration: string | null; tuition_fee: number | null; intake_dates: string | null;
  scholarship_available: boolean | null;
};

const SCHOLARSHIP_TYPE_COLORS: Record<string, string> = {
  "Fully Funded": "bg-secondary/10 text-secondary border border-secondary/30",
  "Partial": "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
  "Varies": "bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-900/20 dark:text-orange-400",
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
        .gt("tuition_fee", 10000)
        .limit(4);
      return (data ?? []) as Course[];
    },
    enabled: !!destination,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar solid />
        <div className="pt-20 animate-pulse">
          <div className="h-40" style={{ background: "#0a0d24" }} />
          <div className="container py-8 space-y-4">
            <div className="h-6 bg-muted rounded w-60" />
            <div className="h-32 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar solid />
        <div className="container pt-28 py-20 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Globe size={28} className="text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Destination not found</h1>
          <p className="text-muted-foreground text-sm mb-4">The destination you're looking for doesn't exist or may have been removed.</p>
          <MovingBorderButton to="/study-destinations" className="px-5 py-2 text-sm gap-2">
            <ArrowLeft size={16} /> Back to Destinations
          </MovingBorderButton>
        </div>
        <Footer />
      </div>
    );
  }

  const bgImage = heroImages[slug!] || heroImages["united-kingdom"];
  const flag = FLAGS[slug!] || "🌍";
  const extras = EXTRAS[slug!] || null;

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
    { icon: Briefcase, label: "Post-Study Visa", value: destination.post_study_visa },
    { icon: MapPin, label: "Top Cities", value: destination.top_cities },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Study in ${destination.country} | Universities, Courses & Visa Guide | Applyza`}
        description={(destination.overview || `Everything you need to know about studying in ${destination.country}`).substring(0, 155)}
        path={`/study-destinations/${slug}`}
      />
      <Navbar solid />

      {/* ── Dark Hero ── */}
      <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
        <SparklesCore className="absolute inset-0 z-[1]" background="transparent" particleColor="#2EC4B6" particleDensity={60} minSize={0.4} maxSize={1.5} speed={1.5} />
        {(() => {
          const vid = getVideoForSlug(slug!);
          return vid ? (
            <div className="absolute inset-0 opacity-20">
              <VideoBackground video={vid.video} image={bgImage} name={destination.country} />
            </div>
          ) : (
            <img src={bgImage} alt={destination.country} className="absolute inset-0 w-full h-full object-cover opacity-20" loading="lazy" />
          );
        })()}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,13,36,0.75), rgba(10,13,36,0.95))" }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.4), transparent 70%)" }} />
        </div>
        <div className="container relative z-10 pt-20">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/study-destinations" className="text-white/40 hover:text-white/60 text-sm">Study Destinations</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">{destination.country}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-3 mt-3 mb-2">
            <span className="text-4xl drop-shadow-lg">{flag}</span>
            <div>
              <p className="text-secondary/80 text-xs font-semibold tracking-widest uppercase">Study Destination</p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight"
              >
                Study in {destination.country}
              </motion.h1>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-2xl text-sm leading-relaxed mb-5"
          >
            {destination.overview}
          </motion.p>
          <div className="flex flex-wrap gap-2">
            <MovingBorderButton to={`/find-a-course?country=${encodeURIComponent(destination.country)}`} className="px-5 py-2 text-sm">
              Browse {destination.country} Courses
            </MovingBorderButton>
            <Button variant="outline" size="sm" className="rounded-full border-white/20 text-white bg-transparent hover:bg-white/10" asChild>
              <Link to="/book-a-consultation">Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Key Facts Strip ── */}
      <section className="bg-card border-b border-border">
        <div className="container py-5">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {keyFacts.map((fact) => fact.value && (
              <div key={fact.label} className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <fact.icon size={16} className="text-secondary" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{fact.label}</p>
                  <p className="text-sm font-bold text-foreground leading-tight">{fact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Study Here ── */}
      {whyCards.length > 0 && (
        <section className="bg-background py-10">
          <div className="container">
            <h2 className="text-xl font-bold text-primary mb-1">Why Study in {destination.country}?</h2>
            <p className="text-sm text-muted-foreground mb-6">Key reasons international students choose {destination.country} every year</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {whyCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="bg-card rounded-2xl p-5 border border-border hover:shadow-md hover:border-secondary/30 transition-all card-glow"
                >
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center mb-3">
                    <CheckCircle className="text-secondary" size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-primary mb-1.5">{card.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Popular Universities ── */}
      {extras?.universities && (
        <section className="bg-muted/30 border-y border-border py-10">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-primary mb-1">Top Universities in {destination.country}</h2>
                <p className="text-sm text-muted-foreground">Globally recognised institutions accepting international students</p>
              </div>
              <Link
                to={`/find-a-course?country=${encodeURIComponent(destination.country)}`}
                className="text-secondary text-xs font-semibold hover:underline hidden sm:flex items-center gap-1"
              >
                Browse all courses <ChevronRight size={13} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {extras.universities.map((uni, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-card rounded-xl border border-border p-4 flex items-start gap-3 hover:border-secondary/30 hover:shadow-sm transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <GraduationCap size={18} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary leading-tight">{uni.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{uni.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Visa Information ── */}
      <section className="bg-background py-10">
        <div className="container">
          <h2 className="text-xl font-bold text-primary mb-1">Visa & Immigration</h2>
          <p className="text-sm text-muted-foreground mb-6">What you need to know before applying</p>
          <div className="max-w-3xl space-y-3">
            {[
              { icon: FileText, label: "Requirements", value: destination.visa_requirements },
              { icon: Banknote, label: "Visa Fee", value: destination.visa_fee },
              { icon: Wrench, label: "Work Rights", value: destination.visa_work_rights },
            ].map((item) => (
              item.value && (
                <div key={item.label} className="rounded-xl p-4 flex items-start gap-3 bg-card border border-border hover:border-secondary/30 transition-colors" style={{ borderLeft: "3px solid hsl(169 63% 47%)" }}>
                  <item.icon size={17} className="text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-foreground mb-0.5 uppercase tracking-wide">{item.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.value}</p>
                  </div>
                </div>
              )
            ))}
          </div>
          <div className="max-w-3xl mt-5 bg-secondary rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-secondary-foreground font-bold text-sm mb-0.5">Need help with your visa?</p>
              <p className="text-secondary-foreground/80 text-xs">Our team has a 99% visa success rate — completely free of charge.</p>
            </div>
            <Button className="bg-white text-primary hover:bg-white/90 rounded-full shrink-0 font-semibold text-sm px-5" asChild>
              <Link to="/book-a-consultation">Book a Visa Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Cost of Living ── */}
      {costCards.length > 0 && (
        <section className="bg-muted/30 border-y border-border py-10">
          <div className="container">
            <h2 className="text-xl font-bold text-primary mb-1">Cost of Living</h2>
            <p className="text-sm text-muted-foreground mb-6">Estimated monthly living costs including rent, food, and transport</p>
            <div className={`grid gap-4 max-w-3xl ${costCards.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
              {costCards.map((cost, i) => {
                const parts = cost.split(":");
                const city = parts[0]?.trim();
                const range = parts[1]?.trim();
                const labels = ["Most Expensive", "Mid-Range", "Most Affordable"];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="bg-card rounded-2xl p-5 border border-border text-center hover:shadow-md hover:border-secondary/30 transition-all card-glow"
                  >
                    <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <MapPin className="text-secondary" size={18} />
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{labels[i] || ""}</p>
                    <h3 className="text-sm font-bold text-primary mb-1">{city}</h3>
                    <p className="text-lg font-bold text-foreground">{range}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">per month</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Scholarships ── */}
      {extras?.scholarships && (
        <section className="bg-background py-10">
          <div className="container">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-primary mb-1">Scholarships for {destination.country}</h2>
                <p className="text-sm text-muted-foreground">Funding opportunities available to international students</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
              {extras.scholarships.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="bg-card rounded-2xl p-5 border border-border hover:border-secondary/30 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-yellow-400/10 flex items-center justify-center shrink-0">
                      <Award size={18} className="text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${SCHOLARSHIP_TYPE_COLORS[s.type] || ""}`}>{s.type}</span>
                  </div>
                  <h3 className="text-sm font-bold text-primary mb-1.5 leading-snug">{s.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-secondary/5 border border-secondary/20 max-w-5xl">
              <p className="text-sm text-foreground"><span className="font-bold text-secondary">Tip:</span> Our counsellors can help you identify and apply for scholarships that match your profile — completely free of charge.</p>
            </div>
          </div>
        </section>
      )}

      {/* ── Student Life ── */}
      {extras?.studentLife && (
        <section className="bg-muted/30 border-y border-border py-10">
          <div className="container">
            <h2 className="text-xl font-bold text-primary mb-1">Student Life in {destination.country}</h2>
            <p className="text-sm text-muted-foreground mb-5">What to expect beyond the classroom</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
              {extras.studentLife.map((item, i) => (
                <div key={i} className="bg-card rounded-xl p-4 border border-border flex items-start gap-2">
                  <Star size={14} className="text-secondary shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground font-medium leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Courses ── */}
      <section className="bg-background py-10">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-primary mb-1">Courses in {destination.country}</h2>
              <p className="text-sm text-muted-foreground">International student programmes with verified fees</p>
            </div>
            {courses.length > 0 && (
              <Link
                to={`/find-a-course?country=${encodeURIComponent(destination.country)}`}
                className="text-secondary text-xs font-semibold hover:underline hidden sm:flex items-center gap-1"
              >
                Browse all <ChevronRight size={13} />
              </Link>
            )}
          </div>

          {courses.length === 0 ? (
            <div className="bg-card rounded-2xl p-8 text-center border border-border max-w-lg mx-auto">
              <BookOpen className="mx-auto text-muted-foreground mb-3" size={28} />
              <p className="text-foreground font-semibold mb-1">Courses coming soon</p>
              <p className="text-muted-foreground text-sm mb-4">
                We're adding courses for {destination.country} soon. Book a consultation and our counsellors can guide you in the meantime.
              </p>
              <MovingBorderButton to="/book-a-consultation" className="px-5 py-2 text-sm">
                Book a Consultation
              </MovingBorderButton>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div key={course.id} className="bg-card rounded-2xl border border-border p-5 hover:shadow-md hover:border-secondary/30 transition-all duration-200 card-glow">
                    <p className="text-xs text-muted-foreground mb-1">{course.university_name}</p>
                    <h3 className="text-base font-bold text-primary leading-snug mb-2">{course.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><MapPin size={11} /> {course.city}</span>
                      {course.duration && <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>}
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${LEVEL_COLORS[course.study_level] ?? "bg-muted text-muted-foreground"}`}>
                        {course.study_level}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-primary mb-3">
                      {course.tuition_fee ? `£${course.tuition_fee.toLocaleString()}` : "Contact us"}
                      {course.tuition_fee && <span className="text-xs font-normal text-muted-foreground"> / year</span>}
                    </p>
                    {course.scholarship_available && (
                      <Badge variant="secondary" className="mb-3 text-[11px]">🎓 Scholarship Available</Badge>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs rounded-full" asChild>
                        <Link to={`/find-a-course/${course.slug}`}>View Details</Link>
                      </Button>
                      <MovingBorderButton to="/book-a-consultation" className="flex-1 px-3 py-1.5 text-xs">
                        Apply Free
                      </MovingBorderButton>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link
                  to={`/find-a-course?country=${encodeURIComponent(destination.country)}`}
                  className="text-secondary font-semibold text-sm hover:underline inline-flex items-center gap-1"
                >
                  Search all {destination.country} courses <ChevronRight size={14} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-12" style={{ background: "linear-gradient(135deg, hsl(169 63% 47%), hsl(169 63% 40%))" }}>
        <div className="container text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-2xl">{flag}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Ready to Study in {destination.country}?</h2>
          <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">Find your perfect course or speak with an expert counsellor — our service is 100% free.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 font-semibold px-8" asChild>
              <Link to={`/find-a-course?country=${encodeURIComponent(destination.country)}`}>
                Search {destination.country} Courses
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-white/30 text-white bg-transparent hover:bg-white/10 px-8" asChild>
              <Link to="/book-a-consultation">Book a Free Consultation</Link>
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 flex-wrap">
            {[
              { icon: Shield, text: "100% free service" },
              { icon: Users, text: "5,000+ students placed" },
              { icon: TrendingUp, text: "99% visa success rate" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-white/70 text-xs">
                <Icon size={13} /> {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DestinationDetail;
