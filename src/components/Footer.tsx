import { Instagram, Facebook, Linkedin, Youtube, MapPin, Mail, Phone, MessageCircle } from "lucide-react";
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

const studentLinks = [
  { label: "Find a Course", to: "/find-a-course" },
  { label: "Study Destinations", to: "/study-destinations" },
  { label: "Scholarships", to: "/scholarships" },
  { label: "Book a Consultation", to: "/book-a-consultation" },
  { label: "FAQ", to: "/faq" },
];

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Our Offices", to: "/contact" },
  { label: "Testimonials", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" },
];

const partnerLinks = [
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

const offices = [
  { city: "Nicosia, Cyprus", tag: "HQ" },
  { city: "Lagos, Nigeria", tag: null },
  { city: "Accra, Ghana", tag: null },
  { city: "Nairobi, Kenya", tag: null },
  { city: "Doha, Qatar", tag: null },
  { city: "Istanbul, Türkiye", tag: null },
];

const Footer = () => {
  return (
    <footer style={{ background: "linear-gradient(180deg, #0a0d24, #050714)" }}>
      <div className="container py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Col 1 — Brand + Contact */}
          <div className="lg:col-span-2">
            <img src="/logo.png" alt="Applyza" className="h-8 w-auto mb-5 brightness-0 invert" />
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
              The smartest way to study abroad. Expert guidance, AI-powered course matching, and end-to-end support — completely free.
            </p>

            <div className="space-y-2.5 mb-6">
              <a href="mailto:info@applyza.com" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
                <Mail size={13} /> info@applyza.com
              </a>
              <span className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                <Phone size={13} /> +44 (0) 000 000 0000
              </span>
            </div>

            <a
              href="https://wa.me/447000000000?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20Applyza"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-opacity hover:opacity-90"
              style={{ background: "#25D366", color: "white" }}
            >
              <MessageCircle size={14} /> Chat on WhatsApp
            </a>
          </div>

          {/* Col 2 — For Students */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>For Students</h4>
            <ul className="space-y-2.5">
              {studentLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Partners */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>Partners</h4>
            <ul className="space-y-2.5">
              {partnerLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Follow Us */}
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] mt-8 mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Follow Us</h4>
            <div className="flex flex-wrap gap-2.5">
              {socials.map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(46,196,182,0.2)";
                    e.currentTarget.style.color = "#2EC4B6";
                    e.currentTarget.style.boxShadow = "0 0 16px rgba(46,196,182,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 5 — Our Offices */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>Our Offices</h4>
            <ul className="space-y-2.5">
              {offices.map((office) => (
                <li key={office.city} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <MapPin size={11} style={{ color: "#2EC4B6", opacity: 0.7 }} />
                  {office.city}
                  {office.tag && (
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ml-1"
                      style={{ background: "rgba(46,196,182,0.15)", color: "#2EC4B6" }}>
                      {office.tag}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2026 Applyza. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs">
            <Link to="/privacy-policy" className="transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>Privacy Policy</Link>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
            <Link to="/terms-and-conditions" className="transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>Terms of Service</Link>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
            <Link to="/privacy-policy" className="transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>Cookie Policy</Link>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
            <Link to="/anti-slavery-policy" className="transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>Modern Slavery Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
