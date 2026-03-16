import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { MovingBorderButton } from "@/components/ui/MovingBorder";


const navTabs = [
  {
    label: "Courses",
    paths: ["/find-a-course", "/scholarships", "/study-destinations"],
    sections: [
      {
        links: [
          { label: "Find a Course", to: "/find-a-course" },
          { label: "Check Eligibility", to: "/eligibility-check" },
          { label: "Scholarships", to: "/scholarships" },
          { label: "Study Destinations", to: "/study-destinations" },
        ],
      },
      {
        heading: "Popular Destinations",
        links: [
          { label: "United Kingdom", to: "/study-destinations/united-kingdom" },
          { label: "Germany", to: "/study-destinations/germany" },
          { label: "France", to: "/study-destinations/france" },
          { label: "Ireland", to: "/study-destinations/ireland" },
        ],
      },
    ],
  },
  {
    label: "Services",
    paths: ["/services"],
    sections: [
      {
        links: [
          { label: "All Services", to: "/services" },
          { label: "University Applications", to: "/services/university-applications" },
          { label: "Visa & Immigration", to: "/services/visa-immigration" },
          { label: "Student Counselling", to: "/services/student-counselling" },
          { label: "Accommodation", to: "/services/accommodation" },
        ],
      },
    ],
  },
  {
    label: "About",
    paths: ["/about", "/events", "/blog", "/faq", "/contact"],
    sections: [
      {
        links: [
          { label: "About Applyza", to: "/about" },
          { label: "Events", to: "/events" },
          { label: "Blog", to: "/blog" },
          { label: "FAQ", to: "/faq" },
          { label: "Contact Us", to: "/contact" },
        ],
      },
    ],
  },
  {
    label: "Partners",
    paths: ["/for-institutions", "/for-partners"],
    sections: [
      {
        links: [
          { label: "For Institutions", to: "/for-institutions" },
          { label: "For Recruitment Partners", to: "/for-partners" },
        ],
      },
    ],
  },
];

const Navbar = ({ solid = false }: { solid?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openTab, setOpenTab] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenTab(null);
  }, [location.pathname]);

  

  const handleClientLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Client Portal Coming Soon",
      description: "Contact us at info@applyza.com for access.",
    });
  };

  const isTabActive = (tab: typeof navTabs[0]) =>
    tab.paths.some((p) => location.pathname === p || location.pathname.startsWith(p + "/"));

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenTab(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenTab(null), 150);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-gray-100 ${
        scrolled ? "shadow-md bg-white/95 backdrop-blur-sm" : "shadow-sm"
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-[72px]">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src="/logo.png" alt="Applyza" className="h-10 w-auto" />
        </Link>

        {/* Desktop tabs */}
        <div className="hidden lg:flex items-center gap-1 ml-8">
          {navTabs.map((tab) => (
            <div
              key={tab.label}
              className="relative"
              onMouseEnter={() => handleMouseEnter(tab.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-[13px] font-medium transition-colors rounded-lg whitespace-nowrap ${
                  isTabActive(tab)
                    ? "text-gray-900"
                    : "text-gray-700 hover:text-secondary"
                }`}
              >
                {tab.label}
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-150 ${openTab === tab.label ? "rotate-180" : ""}`}
                />
                {isTabActive(tab) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-secondary" />
                )}
              </button>

              {/* Dropdown */}
              {openTab === tab.label && (
                <div
                  className="absolute top-full left-0 pt-2"
                  onMouseEnter={() => handleMouseEnter(tab.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[200px] animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    {tab.sections.map((section, si) => (
                      <div key={si}>
                        {section.heading && (
                          <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wide px-4 pt-3 pb-1">
                            {section.heading}
                          </p>
                        )}
                        {si > 0 && <div className="mx-3 my-1 border-t border-gray-100" />}
                        {section.links.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-secondary rounded-lg mx-1 transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={handleClientLogin}
            className="text-gray-500 hover:text-gray-700 text-xs font-normal transition-colors whitespace-nowrap"
          >
            Client Login
          </button>
          <MovingBorderButton to="/book-a-consultation" className="px-5 py-2 text-sm whitespace-nowrap">
            Book a Free Consultation
          </MovingBorderButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 overflow-y-auto bg-white">
          <div className="container flex flex-col py-6 gap-1">
            {navTabs.map((tab, tabIndex) => (
              <div key={tab.label} className="mobile-menu-item" style={{ animationDelay: `${tabIndex * 100}ms` }}>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === tab.label ? null : tab.label)}
                  className="flex items-center justify-between w-full py-3 text-gray-800 text-base font-medium"
                >
                  {tab.label}
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-200 ${
                      mobileExpanded === tab.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileExpanded === tab.label && (
                  <div className="pl-4 pb-2 space-y-0.5">
                    {tab.sections.map((section, si) => (
                      <div key={si}>
                        {section.heading && (
                          <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wide pt-2 pb-1">
                            {section.heading}
                          </p>
                        )}
                        {section.links.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-sm text-gray-600 hover:text-secondary transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
                <div className="border-t border-gray-100" />
              </div>
            ))}

            <button
              onClick={(e) => { handleClientLogin(e); setMobileOpen(false); }}
              className="text-gray-500 hover:text-gray-700 text-sm py-3 text-left"
            >
              Client Login
            </button>

            <MovingBorderButton to="/book-a-consultation" containerClassName="mt-4 w-full" className="w-full px-6 py-3 text-sm text-center" onClick={() => setMobileOpen(false)}>
              Book a Free Consultation
            </MovingBorderButton>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
