import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceHero from "@/components/ServiceHero";
import ServiceCTA from "@/components/ServiceCTA";
import OtherServices from "@/components/OtherServices";
import { motion } from "framer-motion";
import { HelpCircle, Briefcase, Users, Compass, Heart, MessageSquare, Target } from "lucide-react";

const whoForCards = [
  { icon: HelpCircle, title: "Unsure Students", desc: "Students unsure about what or where to study who need guidance to explore their options." },
  { icon: Briefcase, title: "Working Professionals", desc: "Professionals thinking about returning to education to advance or change their career." },
  { icon: Users, title: "Supportive Parents", desc: "Parents exploring study abroad options for their child and wanting trusted expert advice." },
  { icon: Compass, title: "Overwhelmed Applicants", desc: "Anyone feeling overwhelmed by the sheer number of countries, courses, and universities available." },
];

const differentiators = [
  { icon: Heart, title: "No Pressure, Ever", desc: "We don't push you toward any university or programme. Our job is to help you make a decision that's right for you — even if that means waiting." },
  { icon: MessageSquare, title: "Honest Conversations", desc: "We'll tell you what you need to hear, not just what you want to hear. That honesty is what makes our guidance valuable." },
  { icon: Target, title: "Tailored Recommendations", desc: "We don't give generic advice. Every recommendation is based on your specific academic profile, career goals, and personal preferences." },
];

const StudentCounselling = () => (
  <div className="min-h-screen">
    <Navbar />
    <ServiceHero
      heading="Not Sure Where to Start? That's Exactly Why We're Here."
      subtext="Choosing what and where to study is a big decision. Our counsellors help you think it through — with honesty, experience, and zero pressure."
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Services", to: "/services" },
        { label: "Student Counselling" },
      ]}
    />

    {/* Who This Is For */}
    <section className="bg-background">
      <div className="container py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary text-center mb-10">Who This Is For</h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {whoForCards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <c.icon className="text-secondary" size={22} />
              </div>
              <h3 className="font-bold text-primary text-base mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* What Makes Our Counselling Different */}
    <section className="bg-card">
      <div className="container py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary text-center mb-10">What Makes Our Counselling Different</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-background rounded-2xl p-7 shadow-sm text-center"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <d.icon className="text-accent" size={22} />
              </div>
              <h3 className="font-bold text-primary text-sm mb-2">{d.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <OtherServices currentPath="/services/student-counselling" />
    <ServiceCTA label="Book a Free Counselling Session →" />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default StudentCounselling;
