import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { GraduationCap, Building } from "lucide-react";

const destinations = [
  { name: "United Kingdom", flag: "🇬🇧", slug: "united-kingdom", courses: "500+", partners: "30+", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80" },
  { name: "United States", flag: "🇺🇸", slug: "usa", courses: "3,000+", partners: "50+", image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=800&q=80" },
  { name: "Canada", flag: "🇨🇦", slug: "canada", courses: "1,500+", partners: "25+", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80" },
  { name: "Germany", flag: "🇩🇪", slug: "germany", courses: "120+", partners: "15+", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80" },
  { name: "France", flag: "🇫🇷", slug: "france", courses: "80+", partners: "12+", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" },
  { name: "Ireland", flag: "🇮🇪", slug: "ireland", courses: "60+", partners: "10+", image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=800&q=80" },
  { name: "Malta", flag: "🇲🇹", slug: "malta", courses: "40+", partners: "8+", image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80" },
  { name: "Netherlands", flag: "🇳🇱", slug: "netherlands", courses: "90+", partners: "14+", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80" },
  { name: "Spain", flag: "🇪🇸", slug: "spain", courses: "400+", partners: "10+", image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80" },
  { name: "Portugal", flag: "🇵🇹", slug: "portugal", courses: "300+", partners: "8+", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80" },
  { name: "Cyprus", flag: "🇨🇾", slug: "cyprus", courses: "200+", partners: "5+", image: "https://images.unsplash.com/photo-1580227974546-fbd48825d991?w=800&q=80" },
  { name: "United Arab Emirates", flag: "🇦🇪", slug: "uae", courses: "500+", partners: "12+", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" },
  { name: "Japan", flag: "🇯🇵", slug: "japan", courses: "600+", partners: "15+", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80" },
  { name: "China", flag: "🇨🇳", slug: "china", courses: "800+", partners: "20+", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80" },
  { name: "Russia", flag: "🇷🇺", slug: "russia", courses: "400+", partners: "10+", image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&q=80" },
  { name: "Hungary", flag: "🇭🇺", slug: "hungary", courses: "250+", partners: "8+", image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&q=80" },
];

const StudyDestinations = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEO title="Study Destinations | Where to Study Abroad | Applyza" description="Explore 16 study destinations worldwide including the UK, USA, Canada, Germany, France, and more. Compare costs, visas, and universities." path="/study-destinations" />
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
          Explore our top study destinations worldwide. Each country offers unique opportunities for international students.
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
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to={`/study-destinations/${d.slug}`}
                className="block rounded-xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Top: country photo */}
                <div className="relative h-[160px] overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 text-3xl drop-shadow-lg">{d.flag}</span>
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
