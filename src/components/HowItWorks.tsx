import { Search, MessageCircle, FileCheck, Plane } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description:
      "Explore thousands of courses across top universities. Use our AI-powered search to find ones that match your goals and budget.",
    iconBg: "rgba(46,196,182,0.12)",
    iconColor: "#2EC4B6",
  },
  {
    icon: MessageCircle,
    title: "Connect",
    description:
      "Book a free consultation with an expert counsellor. Video call, phone, or face-to-face — we're here to help.",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
  },
  {
    icon: FileCheck,
    title: "Apply",
    description:
      "We handle the heavy lifting — documents, applications, and visa process. Our team takes care of it all.",
    iconBg: "rgba(46,196,182,0.12)",
    iconColor: "#2EC4B6",
  },
  {
    icon: Plane,
    title: "Arrive",
    description:
      "Touch down with confidence. We support you with accommodation guidance, pre-departure tips, and ongoing assistance.",
    iconBg: "rgba(107,63,160,0.12)",
    iconColor: "#6B3FA0",
  },
];

const HowItWorks = () => {
  return (
    <section style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container py-12 md:py-16">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-3xl font-extrabold text-foreground">
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
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto text-sm">
            From your first search to your first day on campus — we guide you through every step.
          </p>
        </div>

        <div className="relative">
          <div className="hidden xl:block absolute top-[40px] left-[12%] right-[12%] border-t-2 border-dashed border-gray-200 pointer-events-none z-0" />

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-h-[240px] relative hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                {/* Step number */}
                <div
                  className="absolute -top-3 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
                  style={{
                    background: "linear-gradient(135deg, #2EC4B6, #6B3FA0)",
                  }}
                >
                  {i + 1}
                </div>

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mt-3 mb-3"
                  style={{ backgroundColor: step.iconBg }}
                >
                  <step.icon size={20} style={{ color: step.iconColor }} />
                </div>

                <h3 className="text-base font-bold text-foreground mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
