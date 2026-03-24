import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        showSolid ? "shadow-lg" : "bg-transparent"
      }`}
      style={showSolid ? {
        background: "rgba(10, 13, 36, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      } : undefined}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="text-primary-foreground text-xl md:text-2xl font-extrabold tracking-tight shrink-0">
          Applyza
        </Link>

        <div className="hidden xl:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-primary-foreground/80 hover:text-primary-foreground text-[13px] font-medium transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
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

      {mobileOpen && (
        <div className="xl:hidden border-t border-primary-foreground/10 pb-6" style={{ background: "rgba(10,13,36,0.9)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
          <div className="container flex flex-col gap-3 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium py-2 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={(e) => { handleClientLogin(e); setMobileOpen(false); }}
              className="text-primary-foreground/60 hover:text-primary-foreground text-sm font-normal py-2 text-left"
            >
              Client Login
            </button>
            <Button variant="teal" className="rounded-full mt-2 w-full" asChild>
              <Link to="/book-a-consultation" onClick={() => setMobileOpen(false)}>Book a Free Consultation</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
