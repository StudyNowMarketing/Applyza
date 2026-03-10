import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Crumb {
  label: string;
  to?: string;
}

interface ServiceHeroProps {
  heading: string;
  subtext: string;
  breadcrumbs: Crumb[];
}

const ServiceHero = ({ heading, subtext, breadcrumbs }: ServiceHeroProps) => (
  <section className="relative min-h-[40vh] gradient-navy flex items-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/10 pointer-events-none" />
    <div className="container relative z-10 py-28 md:py-32">
      <nav className="flex items-center gap-2 text-xs text-primary-foreground/50 mb-6 flex-wrap">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span>/</span>}
            {crumb.to ? (
              <Link to={crumb.to} className="hover:text-primary-foreground transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-primary-foreground/80">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-[48px] md:leading-tight font-extrabold text-primary-foreground mb-5 max-w-2xl"
      >
        {heading}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-primary-foreground/70 text-base md:text-lg leading-relaxed max-w-xl"
      >
        {subtext}
      </motion.p>
    </div>
  </section>
);

export default ServiceHero;
