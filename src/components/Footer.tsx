import { Instagram, Facebook, Linkedin, Youtube, Twitter } from "lucide-react";

const studentLinks = [
  "Find a Course",
  "Study Destinations",
  "Scholarships",
  "Book a Consultation",
  "FAQ",
];

const companyLinks = [
  "About",
  "Our Offices",
  "Testimonials",
  "Blog",
  "Events",
  "Contact",
];

const partnerLinks = [
  "For Institutions",
  "For Recruitment Partners",
  "Partner Universities",
];

const socials = [
  { icon: Instagram, href: "https://instagram.com/applyzahq" },
  { icon: Twitter, href: "https://x.com/applyzahq" },
  { icon: Facebook, href: "https://facebook.com/applyzahq" },
  { icon: Linkedin, href: "https://linkedin.com/company/applyzahq" },
  { icon: Youtube, href: "https://youtube.com/@applyzahq" },
];

const Footer = () => {
  return (
    <footer style={{ background: "hsl(232 50% 14%)" }}>
      <div className="container py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 */}
          <div>
            <h3 className="text-primary-foreground text-xl font-extrabold mb-3">
              Applyza
            </h3>
            <p className="text-primary-foreground/50 text-sm mb-5 leading-relaxed">
              The smartest way to study abroad.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-primary-foreground font-bold text-sm mb-4">
              For Students
            </h4>
            <ul className="space-y-2.5">
              {studentLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-primary-foreground font-bold text-sm mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-primary-foreground font-bold text-sm mb-4">
              Partners
            </h4>
            <ul className="space-y-2.5">
              {partnerLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-primary-foreground/40 text-xs">
            © 2026 Applyza. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-xs">
            <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">
              Anti-Slavery Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
