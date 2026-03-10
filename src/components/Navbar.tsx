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
        <a href="/" className="text-primary-foreground text-xl md:text-2xl font-extrabold tracking-tight">
          Applyza
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium transition-colors">
            Client Login
          </a>
          <div className="relative">
            <Button variant="teal" size="default" className="rounded-full">
              Book a Free Consultation
            </Button>
            <span className="absolute -top-2 -right-3 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
              100% Free
            </span>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-primary-foreground/10 pb-6">
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
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium py-2">
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
