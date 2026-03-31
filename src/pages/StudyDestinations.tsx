import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { GraduationCap, Building } from "lucide-react";
import { useRef, useState, useEffect } from "react";

type Destination = {
  name: string;
  flag: string;
  slug: string;
  courses: string;
  partners: string;
  images: string[];
};

const destinations: Destination[] = [
  {
    // London aerial Thames · London skyline night · River Thames from above
    name: "United Kingdom",
    flag: "🇬🇧",
    slug: "united-kingdom",
    courses: "500+",
    partners: "30+",
    images: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=85",
      "https://images.unsplash.com/photo-1640035012100-faf53d817838?w=900&q=85",
      "https://images.unsplash.com/photo-1646256815071-e8e80c6abae0?w=900&q=85",
    ],
  },
  {
    // Manhattan aerial city · NYC skyline buildings · New York City daytime
    name: "United States",
    flag: "🇺🇸",
    slug: "usa",
    courses: "3,000+",
    partners: "50+",
    images: [
      "https://images.unsplash.com/photo-1643345919766-2b3e4de01467?w=900&q=85",
      "https://images.unsplash.com/photo-1587162146766-e06b1189b907?w=900&q=85",
      "https://images.unsplash.com/photo-1624236903371-9fd37d810052?w=900&q=85",
    ],
  },
  {
    // Toronto aerial · Vancouver harbour · Vancouver skyline at night
    name: "Canada",
    flag: "🇨🇦",
    slug: "canada",
    courses: "1,500+",
    partners: "25+",
    images: [
      "https://images.unsplash.com/photo-1546614409-810f10108b74?w=900&q=85",
      "https://images.unsplash.com/photo-1647655806923-e8202f4f2b8c?w=900&q=85",
      "https://images.unsplash.com/photo-1540584315230-308b1bba926b?w=900&q=85",
    ],
  },
  {
    // Berlin aerial daytime · Berlin city aerial 2 · Munich cityscape
    name: "Germany",
    flag: "🇩🇪",
    slug: "germany",
    courses: "120+",
    partners: "15+",
    images: [
      "https://images.unsplash.com/photo-1668195512204-4c80ed9f8d53?w=900&q=85",
      "https://images.unsplash.com/photo-1545375206-dcef3c51084f?w=900&q=85",
      "https://images.unsplash.com/photo-1577462282244-b58c2816d686?w=900&q=85",
    ],
  },
  {
    // Eiffel Tower aerial · Eiffel Tower Paris photography · Eiffel at sunset
    name: "France",
    flag: "🇫🇷",
    slug: "france",
    courses: "80+",
    partners: "12+",
    images: [
      "https://images.unsplash.com/photo-1687204388066-702f259abdad?w=900&q=85",
      "https://images.unsplash.com/photo-1438955138287-0c090d2290d5?w=900&q=85",
      "https://images.unsplash.com/photo-1679231926885-0287bbe32008?w=900&q=85",
    ],
  },
  {
    // Dublin aerial buildings · Dublin city aerial · Inner-city Dublin rooftops
    name: "Ireland",
    flag: "🇮🇪",
    slug: "ireland",
    courses: "60+",
    partners: "10+",
    images: [
      "https://images.unsplash.com/photo-1581283518273-0c9a93b9e68f?w=900&q=85",
      "https://images.unsplash.com/photo-1581283049916-266ab404d150?w=900&q=85",
      "https://images.unsplash.com/photo-1455778977533-4a3ef39091c6?w=900&q=85",
    ],
  },
  {
    // Valletta harbour from water · Valletta dome near water · Malta coastline
    name: "Malta",
    flag: "🇲🇹",
    slug: "malta",
    courses: "40+",
    partners: "8+",
    images: [
      "https://images.unsplash.com/photo-1679304617948-bb11d0a980db?w=900&q=85",
      "https://images.unsplash.com/photo-1584348059301-bb1d44173050?w=900&q=85",
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=900&q=85",
    ],
  },
  {
    // Amsterdam aerial · Dutch canal houses · Amsterdam river and buildings
    name: "Netherlands",
    flag: "🇳🇱",
    slug: "netherlands",
    courses: "90+",
    partners: "14+",
    images: [
      "https://images.unsplash.com/photo-1565030275157-62444cc9b37c?w=900&q=85",
      "https://images.unsplash.com/photo-1753810809240-a28f725d3328?w=900&q=85",
      "https://images.unsplash.com/photo-1723152720678-da4ee06f4505?w=900&q=85",
    ],
  },
  {
    // Barcelona aerial city · Barcelona Sagrada Familia · Barcelona rooftop view
    name: "Spain",
    flag: "🇪🇸",
    slug: "spain",
    courses: "400+",
    partners: "10+",
    images: [
      "https://images.unsplash.com/photo-1507619579562-f2e10da1ec86?w=900&q=85",
      "https://images.unsplash.com/photo-1758471206484-0eaa2568320c?w=900&q=85",
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=900&q=85",
    ],
  },
  {
    // Lisbon cityscape blue sky · Lisbon skyline at sunset · Portugal aerial
    name: "Portugal",
    flag: "🇵🇹",
    slug: "portugal",
    courses: "300+",
    partners: "8+",
    images: [
      "https://images.unsplash.com/photo-1744580162134-b9b64645f7c8?w=900&q=85",
      "https://images.unsplash.com/photo-1748279944004-f1d733dc711b?w=900&q=85",
      "https://images.unsplash.com/photo-1525207934214-58e69a8f8a3e?w=900&q=85",
    ],
  },
  {
    // Limassol aerial city · Cyprus green hillside coast · Nissi Beach aerial
    name: "Cyprus",
    flag: "🇨🇾",
    slug: "cyprus",
    courses: "200+",
    partners: "5+",
    images: [
      "https://images.unsplash.com/photo-1630353695798-b19b04e39ef4?w=900&q=85",
      "https://images.unsplash.com/photo-1695841253496-0a9e9b9f2440?w=900&q=85",
      "https://images.unsplash.com/photo-1619029807642-1eb86758cb97?w=900&q=85",
    ],
  },
  {
    // Burj Khalifa Dubai sunset · Dubai skyline illuminated night · Dubai aerial
    name: "United Arab Emirates",
    flag: "🇦🇪",
    slug: "uae",
    courses: "500+",
    partners: "12+",
    images: [
      "https://images.unsplash.com/photo-1749273858638-ea678cb48e94?w=900&q=85",
      "https://images.unsplash.com/photo-1753029111752-f12018752cd3?w=900&q=85",
      "https://images.unsplash.com/photo-1533200124848-3977796fe4ff?w=900&q=85",
    ],
  },
  {
    // Tokyo aerial night skyscrapers · Tokyo Rainbow Bridge dusk · Tokyo skyline
    name: "Japan",
    flag: "🇯🇵",
    slug: "japan",
    courses: "600+",
    partners: "15+",
    images: [
      "https://images.unsplash.com/photo-1609182735077-69dd6422a358?w=900&q=85",
      "https://images.unsplash.com/photo-1741097574041-d70d3fe6a3ab?w=900&q=85",
      "https://images.unsplash.com/photo-1770738020602-6481d583369d?w=900&q=85",
    ],
  },
  {
    // Shanghai skyline cloudy · Shanghai skyline river night · Shanghai cityscape
    name: "China",
    flag: "🇨🇳",
    slug: "china",
    courses: "800+",
    partners: "20+",
    images: [
      "https://images.unsplash.com/photo-1752662742861-fb76c71576d7?w=900&q=85",
      "https://images.unsplash.com/photo-1748078096034-46086f5b87da?w=900&q=85",
      "https://images.unsplash.com/photo-1527909249915-9ff58d10d4c8?w=900&q=85",
    ],
  },
  {
    // Moscow aerial city · Moscow at night · Moscow river and Kremlin area
    name: "Russia",
    flag: "🇷🇺",
    slug: "russia",
    courses: "400+",
    partners: "10+",
    images: [
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=900&q=85",
      "https://images.unsplash.com/photo-1673372076383-f322c00e9a1e?w=900&q=85",
      "https://images.unsplash.com/photo-1588702512491-2c5b4090f000?w=900&q=85",
    ],
  },
  {
    // Budapest Parliament sunrise · Parliament Building and Danube · Parliament sunset
    name: "Hungary",
    flag: "🇭🇺",
    slug: "hungary",
    courses: "250+",
    partners: "8+",
    images: [
      "https://images.unsplash.com/photo-1761157845019-11c2d237eb75?w=900&q=85",
      "https://images.unsplash.com/photo-1761249747656-d0dadc498220?w=900&q=85",
      "https://images.unsplash.com/photo-1761157845286-7663794fd91d?w=900&q=85",
    ],
  },
];

// ─── Individual destination card ─────────────────────────────────────────────
function DestinationCard({ dest, index }: { dest: Destination; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgIndex, setImgIndex] = useState(index % dest.images.length);
  const [hovered, setHovered] = useState(false);

  // Motion values for mouse tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth spring tilt  — rotateX/Y in degrees
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), {
    stiffness: 140,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), {
    stiffness: 140,
    damping: 20,
  });

  // Image parallax — small counter-pan on tilt
  const imgX = useTransform(rotateY, [-10, 10], ["10px", "-10px"]);
  const imgY = useTransform(rotateX, [10, -10], ["10px", "-10px"]);

  // Glare highlight that tracks cursor
  const glareX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.18) 0%, transparent 65%)`;

  // Auto-advance images — stagger start across cards
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const CYCLE = 4000; // ms per image
    const delay = (index * 700) % CYCLE;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setImgIndex((i) => (i + 1) % dest.images.length);
      }, CYCLE);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [dest.images.length, index]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const onMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.055, ease: "easeOut" }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          scale: hovered ? 1.03 : 1,
          transition: hovered ? "scale 0.2s ease" : "scale 0.4s ease",
        }}
        className="rounded-2xl overflow-hidden border border-border/60 shadow-md cursor-pointer"
      >
        <Link to={`/study-destinations/${dest.slug}`} className="block group">
          {/* ── Image strip ─────────────────────────────────────────── */}
          <div className="relative h-52 overflow-hidden bg-slate-900">
            {/* Crossfading slides */}
            <AnimatePresence mode="sync">
              <motion.div
                key={imgIndex}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
              >
                <motion.img
                  src={dest.images[imgIndex]}
                  alt={`${dest.name} — image ${imgIndex + 1}`}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  style={{
                    x: imgX,
                    y: imgY,
                    scale: 1.12, // slight oversize so parallax never reveals edge
                  }}
                  // Ken-Burns slow zoom while displayed
                  animate={{ scale: [1.12, 1.2] }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10 z-10 pointer-events-none" />

            {/* Mouse-tracking glare */}
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{ background: glare, opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}
            />

            {/* Country name — bottom-left */}
            <div className="absolute bottom-0 left-0 z-30 p-3.5">
              <h3 className="text-white font-bold text-lg leading-tight drop-shadow-xl tracking-tight">
                {dest.name}
              </h3>
            </div>

            {/* Flag — bottom-right, small */}
            <span className="absolute bottom-3 right-3.5 text-xl leading-none drop-shadow-xl z-30 select-none">
              {dest.flag}
            </span>

            {/* Slide progress pills — top-right */}
            <div className="absolute top-3 right-3 flex items-center gap-1 z-30">
              {dest.images.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ width: i === imgIndex ? 18 : 5, opacity: i === imgIndex ? 1 : 0.45 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="h-[4px] rounded-full bg-white"
                />
              ))}
            </div>
          </div>

          {/* ── Stats bar ───────────────────────────────────────────── */}
          <div className="bg-card px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <GraduationCap size={12} className="text-secondary/70" />
                {dest.courses} courses
              </span>
              <span className="w-px h-3 bg-border" />
              <span className="flex items-center gap-1.5">
                <Building size={12} className="text-secondary/70" />
                {dest.partners} partners
              </span>
            </div>
            <motion.span
              className="text-secondary text-xs font-semibold tracking-wide"
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Explore →
            </motion.span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const StudyDestinations = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEO
      title="Study Destinations | Where to Study Abroad | Applyza"
      description="Explore 16 study destinations worldwide including the UK, USA, Canada, Germany, France, and more. Compare costs, visas, and universities."
      path="/study-destinations"
    />
    <Navbar solid />

    {/* Dark Hero */}
    <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
      <SparklesCore
        className="absolute inset-0 z-[1]"
        background="transparent"
        particleColor="#6B3FA0"
        particleDensity={60}
        minSize={0.4}
        maxSize={1.5}
        speed={1.5}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.4), transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(265 44% 44% / 0.3), transparent 70%)" }}
        />
      </div>
      <div className="container relative z-10 pt-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-white/40 hover:text-white/60 text-sm">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/30" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white/60 text-sm">Study Destinations</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">Study Destinations</h1>
        <p className="text-white/60 text-sm sm:text-base max-w-xl">
          Explore our top study destinations worldwide. Each country offers unique opportunities for
          international students.
        </p>
      </div>
    </section>

    {/* Cards grid */}
    <section className="flex-1 bg-background py-12">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((d, i) => (
            <DestinationCard key={d.slug} dest={d} index={i} />
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default StudyDestinations;
