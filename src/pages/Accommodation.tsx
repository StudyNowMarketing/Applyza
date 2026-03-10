import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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
      <div className="container py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-4">How We Help</h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            Moving to a new country is exciting — but finding somewhere safe, affordable, and convenient to live can be one of the most stressful parts. Our accommodation support team helps you navigate your housing options so you can arrive feeling settled and ready to learn.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base mt-4">
            Whether you're looking at university halls, private student housing, or shared flats, we'll guide you through the process and make sure you understand your rights and responsibilities as a tenant.
          </p>
        </motion.div>
      </div>
    </section>

    {/* What's Included */}
    <section className="bg-card">
      <div className="container py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary text-center mb-10">What's Included</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {included.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="text-secondary" size={14} />
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
    <WhatsAppButton />
  </div>
);

export default Accommodation;
