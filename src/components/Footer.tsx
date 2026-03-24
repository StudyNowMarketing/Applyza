import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const XIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z" />
  </svg>
);

const studentLinks: { label: string; to: string }[] = [
  { label: "Find a Course", to: "/find-a-course" },
  { label: "Study Destinations", to: "/study-destinations" },
  { label: "Scholarships", to: "/scholarships" },
  { label: "Book a Consultation", to: "/book-a-consultation" },
  { label: "FAQ", to: "/faq" },
];

const companyLinks: { label: string; to: string }[] = [
  { label: "About", to: "/about" },
  { label: "Our Offices", to: "/contact" },
  { label: "Testimonials", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" },
];

const partnerLinks: { label: string; to: string }[] = [
  { label: "For Institutions", to: "/for-institutions" },
  { label: "For Recruitment Partners", to: "/for-partners" },
  { label: "Partner Universities", to: "/find-a-course" },
];

const socials = [
  { icon: Instagram, href: "https://instagram.com/applyzahq" },
  { icon: TikTokIcon, href: "https://tiktok.com/@applyzahq", custom: true },
  { icon: XIcon, href: "https://x.com/applyzahq", custom: true },
  { icon: Facebook, href: "https://facebook.com/applyzahq" },
  { icon: Linkedin, href: "https://linkedin.com/company/applyzahq" },
  { icon: Youtube, href: "https://youtube.com/@applyzahq" },
];

const Footer = () => {
  return (
    <footer className="relative" style={{ background: "rgba(10, 13, 36, 0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      <div className="container py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 */}
          <div>
            <h3 className="text-primary-foreground text-xl font-extrabold mb-3">Applyza</h3>
            <p className="text-primary-foreground/50 text-sm mb-5 leading-relaxed">The smartest way to study abroad.</p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 hover:scale-110"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-primary-foreground font-bold text-sm mb-4">For Students</h4>
            <ul className="space-y-2.5">
              {studentLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-primary-foreground font-bold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-primary-foreground font-bold text-sm mb-4">Partners</h4>
            <ul className="space-y-2.5">
              {partnerLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-primary-foreground/40 text-xs">© 2026 Applyza. All Rights Reserved.</p>
          <div className="flex gap-4 text-xs">
            <Link to="/privacy-policy" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">Terms & Conditions</Link>
            <Link to="/anti-slavery-policy" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">Anti-Slavery Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
