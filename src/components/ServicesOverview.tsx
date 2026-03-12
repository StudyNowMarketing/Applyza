import { useState, useEffect, useCallback, useRef } from "react";
import { GraduationCap, Shield, Users, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    icon: GraduationCap,
    title: "University Applications",
    text: "We match you with programmes that fit your academic profile, career goals, and budget — then manage every detail of your application.",
    to: "/services/university-applications",
    color: "#6B3FA0",
    colorBg: "rgba(107,63,160,0.12)",
    bullets: ["AI-powered course matching", "Personal statement review", "Application tracking dashboard", "Offer negotiation support"],
  },
  {
    icon: Shield,
    title: "Visa & Immigration",
    text: "With a 99% success rate, our compliance team ensures your documents are accurate, timelines are met, and your application is strong.",
    to: "/services/visa-immigration",
    color: "#2EC4B6",
    colorBg: "rgba(46,196,182,0.12)",
    bullets: ["Document preparation", "CAS & sponsorship guidance", "Mock interview training", "Post-visa travel support"],
  },
  {
    icon: Users,
    title: "Student Counselling",
    text: "Our counsellors help you explore options — from choosing programmes to mapping out a career you'll love. No pressure, just guidance.",
    to: "/services/student-counselling",
    color: "#1B2150",
    colorBg: "rgba(27,33,80,0.10)",
    bullets: ["One-on-one expert sessions", "Career path planning", "Programme comparison", "Scholarship guidance"],
  },
  {
    icon: Home,
    title: "Accommodation Support",
    text: "We help you find safe, affordable housing near your university so you can focus on what matters — your studies.",
    to: "/services/accommodation",
    color: "#D97706",
    colorBg: "rgba(245,158,11,0.12)",
    bullets: ["Verified student housing", "Budget-friendly options", "Location-based matching", "Move-in coordination"],
  },
];

/* ── Service visuals ── */
const UniVisual = () => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 max-w-xs mx-auto">
    <div className="flex items-center justify-between mb-3">
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Course Match</span>
      <span className="text-xs font-bold" style={{ color: "#2EC4B6" }}>95% Match</span>
    </div>
    <div className="h-2 rounded-full bg-gray-100 mb-4 overflow-hidden">
      <div className="h-full rounded-full" style={{ width: "95%", background: "linear-gradient(to right, #2EC4B6, #6B3FA0)" }} />
    </div>
    <div className="text-sm font-bold mb-0.5" style={{ color: "#1B2150" }}>MSc Business Management</div>
    <div className="text-xs text-gray-400 mb-3">York St John University</div>
    <div className="flex gap-2">
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-500">1 Year</span>
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-500">£12,500/yr</span>
      <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(46,196,182,0.1)", color: "#2EC4B6" }}>Scholarship</span>
    </div>
  </div>
);

const VisaVisual = () => {
  const items = [
    { label: "Documents Collected", done: true },
    { label: "Application Submitted", done: true },
    { label: "Interview Prep", done: true },
    { label: "Visa Approved", done: true },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 max-w-xs mx-auto space-y-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ backgroundColor: "#22c55e" }}>✓</div>
          <span className="text-sm font-medium" style={{ color: "#1B2150" }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const CounsellingVisual = () => (
  <div className="max-w-xs mx-auto space-y-3">
    <div className="flex items-start gap-2">
      <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: "#6B3FA0" }}>AC</div>
      <div className="bg-gray-50 rounded-xl rounded-tl-sm px-4 py-3 text-sm text-gray-600 leading-relaxed">
        Hi! Based on your profile, I'd recommend looking at Business programmes in the UK. You'd be a strong candidate for scholarships too.
      </div>
    </div>
    <div className="flex items-start gap-2 justify-end">
      <div className="rounded-xl rounded-tr-sm px-4 py-3 text-sm text-white leading-relaxed" style={{ backgroundColor: "#2EC4B6" }}>
        That sounds great! Can we look at options together?
      </div>
      <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-gray-200 text-xs font-bold text-gray-500">You</div>
    </div>
  </div>
);

const AccommodationVisual = () => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 max-w-xs mx-auto">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: "rgba(245,158,11,0.10)" }}>🏠</div>
      <div>
        <div className="text-sm font-bold" style={{ color: "#1B2150" }}>University Student Hall</div>
        <div className="text-xs text-gray-400">10 min from campus</div>
      </div>
    </div>
    <div className="flex items-center justify-between mb-2">
      <span className="text-lg font-bold" style={{ color: "#2EC4B6" }}>£150<span className="text-xs text-gray-400 font-normal">/week</span></span>
      <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <span key={i} className="text-xs" style={{ color: i <= 4 ? "#F59E0B" : "#d1d5db" }}>★</span>)}</div>
    </div>
    <div className="flex gap-2">
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-500">En-suite</span>
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-500">Wi-Fi</span>
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-500">Bills incl.</span>
    </div>
  </div>
);

const serviceVisuals = [UniVisual, VisaVisual, CounsellingVisual, AccommodationVisual];

const AUTO_INTERVAL = 6000;
const PAUSE_DURATION = 20000;

const ServicesOverview = () => {
  const [active, setActive] = useState(0);
  const pausedUntilRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() < pausedUntilRef.current) return;
      setActive((p) => (p + 1) % 4);
    }, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const handleClick = (i: number) => {
    setActive(i);
    pausedUntilRef.current = Date.now() + PAUSE_DURATION;
  };

  const Visual = serviceVisuals[active];
  const s = services[active];

  return (
    <section className="bg-white">
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />
      <div className="container py-12 md:py-16">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-3" style={{ color: "#2EC4B6", backgroundColor: "rgba(46,196,182,0.10)" }}>
            Our Services
          </span>
          <h2 className="text-xl md:text-3xl font-extrabold text-foreground mb-2">
            Everything You Need to Study Abroad
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            From course selection to visa approval — expert, impartial guidance at every stage.
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {services.map((srv, i) => {
            const Icon = srv.icon;
            const isActive = i === active;
            return (
              <button
                key={srv.title}
                onClick={() => handleClick(i)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  isActive ? "bg-white shadow-md" : "hover:bg-gray-50"
                }`}
                style={isActive ? { borderLeft: `4px solid ${srv.color}` } : { borderLeft: "4px solid transparent" }}
              >
                <Icon size={18} style={{ color: isActive ? srv.color : "#9ca3af" }} />
                <span className={`text-sm ${isActive ? "font-bold" : "text-gray-400"}`} style={isActive ? { color: "#1B2150" } : {}}>
                  {srv.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: s.colorBg }}>
                  <s.icon size={28} style={{ color: s.color }} />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: "#1B2150" }}>{s.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{s.text}</p>
                <ul className="space-y-2 mb-6">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white shrink-0" style={{ backgroundColor: s.color }}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3">
                  <Link to={s.to} className="px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-colors" style={{ borderColor: "#1B2150", color: "#1B2150" }}>
                    Learn More →
                  </Link>
                  <Link to="/book-a-consultation" className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-colors" style={{ backgroundColor: "#2EC4B6" }}>
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center py-4">
                <Visual />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
