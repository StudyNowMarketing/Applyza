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
  <section className="relative overflow-hidden" style={{ background: "#0a0d24" }}>
    {/* Gradient glows */}
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]" style={{ background: "hsl(265 44% 44%)" }} />
    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]" style={{ background: "hsl(169 63% 47%)" }} />

    <div className="container relative z-10 py-12">
      <nav className="flex items-center gap-2 text-xs text-white/40 mb-4 flex-wrap">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span>/</span>}
            {crumb.to ? (
              <Link to={crumb.to} className="hover:text-white/70 transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-white/60">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold text-white mb-3 max-w-2xl"
      >
        {heading}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl"
      >
        {subtext}
      </motion.p>
    </div>
  </section>
);

export default ServiceHero;
