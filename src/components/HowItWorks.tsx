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
    iconBg: "rgba(46,196,182,0.12)",
    iconColor: "#2EC4B6",
  },
  {
    icon: MessageCircle,
    title: "Connect",
    description:
      "Book a free consultation with one of our expert counsellors. Whether you prefer a video call, phone call, or face-to-face meeting — we're here to help you make the right choice.",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
  },
  {
    icon: FileCheck,
    title: "Apply",
    description:
      "We take care of the heavy lifting. From preparing your documents and submitting applications to navigating the visa process — our team handles it all.",
    iconBg: "rgba(46,196,182,0.12)",
    iconColor: "#2EC4B6",
  },
  {
    icon: Plane,
    title: "Arrive",
    description:
      "Touch down at your new university with confidence. We support you with accommodation guidance, pre-departure tips, and ongoing assistance.",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
  },
];

const HowItWorks = () => {
  return (
    <section style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container py-16 md:py-24">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground">
            Your Journey in{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #2EC4B6, #6B3FA0)",
              }}
            >
              Four Steps
            </span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            From your first search to your first day on campus — we guide you through every step.
          </p>
        </div>

        {/* Dashed connector line (desktop only) */}
        <div className="relative">
          <div className="hidden xl:block absolute top-[52px] left-[12%] right-[12%] border-t-2 border-dashed border-gray-200 pointer-events-none z-0" />

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 min-h-[320px] relative hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                {/* Step number */}
                <div
                  className="absolute -top-4 -left-2 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                  style={{
                    background: "linear-gradient(135deg, #2EC4B6, #6B3FA0)",
                  }}
                >
                  {i + 1}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mt-4 mb-4"
                  style={{ backgroundColor: step.iconBg }}
                >
                  <step.icon size={24} style={{ color: step.iconColor }} />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
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
