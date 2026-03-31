import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, GraduationCap, Shield, Users, Home, Award } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const serviceLinks = [
  {
    icon: GraduationCap,
    label: "University Applications",
    to: "/services/university-applications",
    desc: "Course matching & full application management",
    color: "#6B3FA0",
    bg: "rgba(107,63,160,0.1)",
  },
  {
    icon: Shield,
    label: "Student Visa Applications",
    to: "/services/visa-immigration",
    desc: "99% success rate. Documents, financials & interview prep",
    color: "#2EC4B6",
    bg: "rgba(46,196,182,0.1)",
  },
  {
    icon: Users,
    label: "Student Counselling",
    to: "/services/student-counselling",
    desc: "Honest, pressure-free guidance on what & where to study",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.1)",
  },
  {
    icon: Home,
    label: "Accommodation Support",
    to: "/services/accommodation",
    desc: "Safe, affordable housing near your university",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
  },
  {
    icon: Award,
    label: "Scholarships",
    to: "/scholarships",
    desc: "Find funding opportunities to support your studies",
    color: "#EC4899",
    bg: "rgba(236,72,153,0.1)",
  },
];

const navLinks = [
  { label: "Find a Course", to: "/find-a-course" },
  { label: "Study Destinations", to: "/study-destinations" },
  { label: "Services", to: "/services", hasDropdown: true },
  { label: "Events", to: "/events" },
  { label: "About", to: "/about" },
];

const Navbar = ({ solid = false }: { solid?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showSolid = solid || scrolled;

  const handleClientLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Client Portal Coming Soon",
      description: "Contact us at info@applyza.com for access.",
    });
  };

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        showSolid ? "shadow-lg" : "bg-transparent"
      }`}
      style={
        showSolid
          ? {
              background: "rgba(10, 13, 36, 0.8)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }
          : undefined
      }
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="shrink-0">
          <img src="/logo.png" alt="Applyza" className="h-8 md:h-10 w-auto brightness-0 invert" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden xl:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Services trigger */}
                <Link
                  to={link.to}
                  className="flex items-center gap-1 text-primary-foreground/80 hover:text-primary-foreground text-[13px] font-medium transition-colors whitespace-nowrap"
                >
                  {link.label}
                  <ChevronDown
                    size={13}
                    className="transition-transform duration-200"
                    style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </Link>

                {/* Dropdown panel */}
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[340px] rounded-2xl overflow-hidden shadow-2xl"
                      style={{
                        background: "rgba(10,13,36,0.97)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Header */}
                      <div className="px-4 pt-4 pb-2 border-b border-white/5">
                        <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                          Our Services — All Free
                        </p>
                      </div>

                      {/* Service items */}
                      <div className="p-2">
                        {serviceLinks.map((s) => (
                          <Link
                            key={s.label}
                            to={s.to}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-white/5 transition-colors group"
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: s.bg }}
                            >
                              <s.icon size={15} style={{ color: s.color }} />
                            </div>
                            <div>
                              <div className="text-[13px] font-semibold text-white/90 group-hover:text-white leading-tight">
                                {s.label}
                              </div>
                              <div className="text-[11px] text-white/40 leading-snug mt-0.5">
                                {s.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="px-4 py-3 border-t border-white/5">
                        <Link
                          to="/services"
                          onClick={() => setServicesOpen(false)}
                          className="text-[12px] font-semibold text-[#2EC4B6] hover:underline"
                        >
                          View all services →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className="text-primary-foreground/80 hover:text-primary-foreground text-[13px] font-medium transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden xl:flex items-center gap-5">
          <button
            onClick={handleClientLogin}
            className="text-primary-foreground/60 hover:text-primary-foreground text-xs font-normal transition-colors whitespace-nowrap"
          >
            Client Login
          </button>
          <Button variant="teal" size="sm" className="rounded-full" asChild>
            <Link to="/book-a-consultation">Book a Free Consultation</Link>
          </Button>
        </div>

        <button
          className="xl:hidden text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="xl:hidden border-t border-primary-foreground/10 pb-6"
          style={{
            background: "rgba(10,13,36,0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="container flex flex-col gap-1 pt-4">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label}>
                  {/* Services row with expand toggle */}
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium py-2 transition-colors"
                  >
                    <span>Services</span>
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200"
                      style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 flex flex-col gap-0.5 pb-2">
                          <Link
                            to="/services"
                            onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                            className="text-[#2EC4B6] text-xs font-semibold py-1.5 hover:underline"
                          >
                            All Services →
                          </Link>
                          {serviceLinks.map((s) => (
                            <Link
                              key={s.label}
                              to={s.to}
                              onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                              className="flex items-center gap-2.5 py-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                            >
                              <div
                                className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                                style={{ background: s.bg }}
                              >
                                <s.icon size={12} style={{ color: s.color }} />
                              </div>
                              <span className="text-sm font-medium">{s.label}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium py-2 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
            <button
              onClick={(e) => {
                handleClientLogin(e);
                setMobileOpen(false);
              }}
              className="text-primary-foreground/60 hover:text-primary-foreground text-sm font-normal py-2 text-left"
            >
              Client Login
            </button>
            <Button variant="teal" className="rounded-full mt-2 w-full" asChild>
              <Link to="/book-a-consultation" onClick={() => setMobileOpen(false)}>
                Book a Free Consultation
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
