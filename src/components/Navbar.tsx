import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ApplyzaLogo from "@/components/ApplyzaLogo";

const navLinks = [
  { label: "Find a Course", to: "/find-a-course" },
  { label: "Study Destinations", to: "/study-destinations" },
  { label: "Services", to: "/services" },
  { label: "Scholarships", to: "/scholarships" },
  { label: "Events", to: "/events" },
  { label: "About", to: "/about" },
];

const Navbar = ({ solid = false }: { solid?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolid
          ? "shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
      style={showSolid ? { backgroundColor: "rgba(10, 13, 36, 0.95)" } : undefined}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="shrink-0">
          <ApplyzaLogo height={40} />
        </Link>

        <div className="hidden xl:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-white/80 hover:text-white text-[13px] font-medium transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden xl:flex items-center gap-5">
          <button
            onClick={handleClientLogin}
            className="text-white/60 hover:text-white text-xs font-normal transition-colors whitespace-nowrap"
          >
            Client Login
          </button>
          <Link
            to="/book-a-consultation"
            className="rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-colors whitespace-nowrap"
            style={{ backgroundColor: "#2EC4B6" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#25a89c")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2EC4B6")}
          >
            Book a Free Consultation
          </Link>
        </div>

        <button
          className="xl:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="xl:hidden border-t border-white/10 pb-6 backdrop-blur-xl"
          style={{ backgroundColor: "rgba(10, 13, 36, 0.95)" }}
        >
          <div className="container flex flex-col gap-3 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-white/80 hover:text-white text-sm font-medium py-2 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={(e) => { handleClientLogin(e); setMobileOpen(false); }}
              className="text-white/60 hover:text-white text-sm font-normal py-2 text-left"
            >
              Client Login
            </button>
            <Link
              to="/book-a-consultation"
              onClick={() => setMobileOpen(false)}
              className="rounded-full mt-2 w-full text-center px-6 py-2.5 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: "#2EC4B6" }}
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
