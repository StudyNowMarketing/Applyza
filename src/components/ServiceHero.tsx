import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { Button } from "@/components/ui/button";

interface Crumb {
  label: string;
  to?: string;
}

interface ServiceHeroProps {
  heading: string;
  subtext: string;
  breadcrumbs: Crumb[];
  badge?: string;
  ctaPrimary?: { label: string; to: string };
  ctaSecondary?: { label: string; to: string };
}

const ServiceHero = ({
  heading,
  subtext,
  breadcrumbs,
  badge,
  ctaPrimary,
  ctaSecondary,
}: ServiceHeroProps) => (
  <section className="relative overflow-hidden" style={{ background: "#0a0d24" }}>
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]" style={{ background: "hsl(265 44% 44%)" }} />
    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]" style={{ background: "hsl(169 63% 47%)" }} />

    <SparklesCore
      className="absolute inset-0 z-[1]"
      background="transparent"
      particleColor="#2EC4B6"
      particleDensity={40}
      minSize={0.3}
      maxSize={1.2}
      speed={1}
    />

    <div className="container relative z-10 pt-20 md:pt-24 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-white/40 mb-4 flex-wrap">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span>/</span>}
            {crumb.to ? (
              <Link to={crumb.to} className="hover:text-white/70 transition-colors">{crumb.label}</Link>
            ) : (
              <span className="text-white/60">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 text-xs font-semibold border"
          style={{
            background: "rgba(46,196,182,0.12)",
            borderColor: "rgba(46,196,182,0.3)",
            color: "#2EC4B6",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {badge}
        </motion.div>
      )}

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: badge ? 0.1 : 0 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 max-w-2xl leading-snug"
      >
        {heading}
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl"
        style={{ marginBottom: ctaPrimary || ctaSecondary ? "1.5rem" : 0 }}
      >
        {subtext}
      </motion.p>

      {/* CTAs */}
      {(ctaPrimary || ctaSecondary) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap gap-3"
        >
          {ctaPrimary && (
            <Button
              size="default"
              className="rounded-full font-bold px-6 shadow-lg"
              style={{ background: "#2EC4B6", color: "#0a0d24" }}
              asChild
            >
              <Link to={ctaPrimary.to}>{ctaPrimary.label}</Link>
            </Button>
          )}
          {ctaSecondary && (
            <Button
              size="default"
              variant="outline"
              className="rounded-full font-semibold px-6 border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link to={ctaSecondary.to}>{ctaSecondary.label}</Link>
            </Button>
          )}
        </motion.div>
      )}
    </div>
  </section>
);

export default ServiceHero;
