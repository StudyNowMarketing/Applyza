import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  "Find a Course",
  "Study Destinations",
  "Services",
  "Scholarships",
  "Events",
  "About",
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-primary shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="text-primary-foreground text-xl md:text-2xl font-extrabold tracking-tight shrink-0">
          Applyza
        </a>

        {/* Desktop links */}
        <div className="hidden xl:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-primary-foreground/80 hover:text-primary-foreground text-[13px] font-medium transition-colors whitespace-nowrap"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden xl:flex items-center gap-5">
          <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-xs font-normal transition-colors whitespace-nowrap">
            Client Login
          </a>
          <div className="flex items-center gap-2">
            <span className="bg-secondary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
              100% Free
            </span>
            <Button variant="teal" size="sm" className="rounded-full">
              Book a Free Consultation
            </Button>
          </div>
        </div>

        {/* Mobile/tablet hamburger */}
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
        <div className="xl:hidden bg-primary border-t border-primary-foreground/10 pb-6">
          <div className="container flex flex-col gap-3 pt-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium py-2 transition-colors"
              >
                {link}
              </a>
            ))}
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm font-normal py-2">
              Client Login
            </a>
            <Button variant="teal" className="rounded-full mt-2 w-full">
              Book a Free Consultation
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
