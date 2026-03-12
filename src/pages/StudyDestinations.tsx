import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { GraduationCap, Building } from "lucide-react";

const destinations = [
  { name: "United Kingdom", flag: "🇬🇧", slug: "united-kingdom", courses: "500+", partners: "30+", pattern: "M0,0 L60,30 L0,60 Z M80,0 L140,30 L80,60 Z M40,40 L100,70 L40,100 Z" },
  { name: "Germany", flag: "🇩🇪", slug: "germany", courses: "120+", partners: "15+", pattern: "M0,0 h40 v40 h-40 Z M50,50 h40 v40 h-40 Z M100,0 h40 v40 h-40 Z" },
  { name: "France", flag: "🇫🇷", slug: "france", courses: "80+", partners: "12+", pattern: "M70,0 L140,70 L70,140 L0,70 Z" },
  { name: "Ireland", flag: "🇮🇪", slug: "ireland", courses: "60+", partners: "10+", pattern: "M0,20 Q70,0 140,20 Q70,40 0,20 Z M0,60 Q70,40 140,60 Q70,80 0,60 Z" },
  { name: "Malta", flag: "🇲🇹", slug: "malta", courses: "40+", partners: "8+", pattern: "M70,0 A70,70 0 1,1 69.9,0 Z M70,30 A40,40 0 1,0 70.1,30 Z" },
  { name: "Netherlands", flag: "🇳🇱", slug: "netherlands", courses: "90+", partners: "14+", pattern: "M0,0 L70,35 L140,0 L140,70 L70,35 L0,70 Z" },
];

const StudyDestinations = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEO title="Study Destinations | Where to Study Abroad | Applyza" description="Explore study destinations across the UK, Germany, France, Ireland, Malta, and the Netherlands. Compare costs, visas, and universities." path="/study-destinations" />
    <Navbar solid />

    {/* Dark Hero */}
    <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.4), transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(265 44% 44% / 0.3), transparent 70%)" }} />
      </div>
      <div className="container relative z-10 pt-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/30" />
            <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">Study Destinations</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">Study Destinations</h1>
        <p className="text-white/60 text-sm sm:text-base max-w-xl">
          Explore our top study destinations across the UK and Europe. Each country offers unique opportunities for international students.
        </p>
      </div>
    </section>

    {/* Country Cards */}
    <section className="flex-1 bg-background py-12">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={`/study-destinations/${d.slug}`}
                className="block rounded-xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 max-h-[240px]"
              >
                {/* Top: dark gradient with geometric pattern */}
                <div className="relative h-[120px] overflow-hidden" style={{ background: "linear-gradient(135deg, #1B2150, #0a0d24)" }}>
                  <svg className="absolute inset-0 w-full h-full opacity-[0.08]" viewBox="0 0 140 120" preserveAspectRatio="xMidYMid slice">
                    <path d={d.pattern} fill="white" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl">{d.flag}</span>
                  </div>
                </div>
                {/* Bottom: white info */}
                <div className="bg-card p-4">
                  <h3 className="text-lg font-bold text-primary mb-2">{d.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><GraduationCap size={13} /> {d.courses} courses</span>
                    <span className="flex items-center gap-1"><Building size={13} /> {d.partners} partners</span>
                  </div>
                  <span className="text-secondary text-sm font-semibold">Explore →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
    <WhatsAppButton />
  </div>
);

export default StudyDestinations;
