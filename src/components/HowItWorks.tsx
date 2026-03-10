import { Search, MessageCircle, FileCheck, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description:
      "Explore thousands of courses across top universities in the UK, Europe, and beyond. Use our AI-powered search to find the ones that match your goals, qualifications, and budget.",
  },
  {
    icon: MessageCircle,
    title: "Connect",
    description:
      "Book a free consultation with one of our expert counsellors. Whether you prefer a video call, phone call, or face-to-face meeting — we're here to help you make the right choice.",
  },
  {
    icon: FileCheck,
    title: "Apply",
    description:
      "We take care of the heavy lifting. From preparing your documents and submitting applications to navigating the visa process — our team handles it all.",
  },
  {
    icon: Plane,
    title: "Arrive",
    description:
      "Touch down at your new university with confidence. We support you with accommodation guidance, pre-departure tips, and ongoing assistance.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-background">
      <div className="container py-16 md:py-24">
        <h2 className="text-2xl md:text-4xl font-extrabold text-primary text-center mb-12">
          Your Journey in Four Simple Steps
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-sm font-bold mb-4">
                {i + 1}
              </div>
              <step.icon className="text-accent mb-3" size={28} />
              <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="purple" size="lg" className="rounded-full" asChild>
            <Link to="/book-a-consultation">Book a Free Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
