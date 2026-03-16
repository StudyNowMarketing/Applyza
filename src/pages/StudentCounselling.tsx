import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    <SEO title="Student Counselling | Free Academic Guidance | Applyza" description="Not sure what or where to study? Our certified counsellors provide honest, personalised guidance — completely free." path="/services/student-counselling" />
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
      <div className="container py-12">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">Who This Is For</h2>
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {whoForCards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-border overflow-visible glow-card"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-3">
                <c.icon className="text-secondary" size={18} />
              </div>
              <h3 className="font-bold text-foreground text-base mb-1">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

    {/* What Makes Our Counselling Different */}
    <section className="bg-background">
      <div className="container py-12">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">What Makes Our Counselling Different</h2>
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card rounded-xl p-5 shadow-sm text-center border border-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <d.icon className="text-accent" size={18} />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">{d.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <OtherServices currentPath="/services/student-counselling" />
    <ServiceCTA label="Book a Free Counselling Session →" />
    <Footer />
  </div>
);

export default StudentCounselling;
