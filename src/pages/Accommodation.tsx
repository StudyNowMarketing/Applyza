import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/ServiceHero";
import ServiceCTA from "@/components/ServiceCTA";
import OtherServices from "@/components/OtherServices";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const included = [
  "Guidance on university-managed accommodation",
  "Help with private housing searches near campus",
  "Advice on contracts, deposits, and costs",
  "Support with roommate matching preferences",
  "Safety and neighbourhood research",
  "Pre-arrival virtual tours and walkthroughs",
  "Post-arrival check-in and adjustment support",
];

const Accommodation = () => (
  <div className="min-h-screen">
    <SEO title="Accommodation Support | Find Student Housing | Applyza" description="Find safe, affordable accommodation near your university. Housing guidance and support from Applyza." path="/services/accommodation" />
    <Navbar />
    <ServiceHero
      heading="Find Your Home Away From Home"
      subtext="A great education deserves a comfortable home. We help you find safe, affordable housing near your university so you can focus on what matters — your studies."
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Services", to: "/services" },
        { label: "Accommodation" },
      ]}
    />

    {/* Overview */}
    <section className="bg-background">
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">How We Help</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Moving to a new country is exciting — but finding somewhere safe, affordable, and convenient to live can be one of the most stressful parts. Our accommodation support team helps you navigate your housing options so you can arrive feeling settled and ready to learn.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm mt-3">
            Whether you're looking at university halls, private student housing, or shared flats, we'll guide you through the process and make sure you understand your rights and responsibilities as a tenant.
          </p>
        </motion.div>
      </div>
    </section>

    <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

    {/* What's Included */}
    <section className="bg-background">
      <div className="container py-12">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">What's Included</h2>
        <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-3">
          {included.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="flex items-start gap-3 bg-card rounded-lg p-3 border border-border card-glow"
            >
              <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="text-secondary" size={12} />
              </div>
              <span className="text-sm text-foreground">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <OtherServices currentPath="/services/accommodation" />
    <ServiceCTA label="Book a Consultation" />
    <Footer />
  </div>
);

export default Accommodation;
