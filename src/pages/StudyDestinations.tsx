import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

import ukImg from "@/assets/destinations/uk.jpg";
import germanyImg from "@/assets/destinations/germany.jpg";
import franceImg from "@/assets/destinations/france.jpg";
import irelandImg from "@/assets/destinations/ireland.jpg";
import maltaImg from "@/assets/destinations/malta.jpg";
import netherlandsImg from "@/assets/destinations/netherlands.jpg";

const destinations = [
  { name: "United Kingdom", flag: "🇬🇧", image: ukImg, slug: "united-kingdom", desc: "Home to world-renowned universities and a global hub for education." },
  { name: "Germany", flag: "🇩🇪", image: germanyImg, slug: "germany", desc: "Tuition-free public universities and a thriving economy." },
  { name: "France", flag: "🇫🇷", image: franceImg, slug: "france", desc: "Rich culture, affordable tuition, and top-ranked institutions." },
  { name: "Ireland", flag: "🇮🇪", image: irelandImg, slug: "ireland", desc: "English-speaking, welcoming, and home to leading tech companies." },
  { name: "Malta", flag: "🇲🇹", image: maltaImg, slug: "malta", desc: "Mediterranean lifestyle with quality English-taught programmes." },
  { name: "Netherlands", flag: "🇳🇱", image: netherlandsImg, slug: "netherlands", desc: "Innovative education system with many English-taught degrees." },
];

const StudyDestinations = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEO title="Study Destinations | Where to Study Abroad | Applyza" description="Explore study destinations across the UK, Germany, France, Ireland, Malta, and the Netherlands. Compare costs, visas, and universities." path="/study-destinations" />
    <Navbar solid />

    <section className="bg-primary pt-28 pb-16 md:pt-36 md:pb-20">
      <div className="container">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary-foreground/40" />
            <BreadcrumbItem><BreadcrumbPage className="text-primary-foreground">Study Destinations</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mt-4 mb-4">Study Destinations</h1>
        <p className="text-primary-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed">
          Explore our top study destinations across the UK and Europe. Each country offers unique opportunities for international students.
        </p>
      </div>
    </section>

    <section className="flex-1">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="relative rounded-2xl overflow-hidden group cursor-pointer block h-72"
              >
                <img src={d.image} alt={d.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 via-40% to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-xl font-bold text-primary-foreground mb-1">{d.flag} {d.name}</div>
                  <p className="text-primary-foreground/70 text-sm mb-2">{d.desc}</p>
                  <span className="text-secondary text-sm font-semibold group-hover:underline">Explore →</span>
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
