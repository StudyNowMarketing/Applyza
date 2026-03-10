import { useState } from "react";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Users, Globe, Cpu, FileCheck, ShieldCheck, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  { icon: Users, title: "Qualified Student Referrals", desc: "Every student we refer has been assessed and counselled by our team." },
  { icon: Globe, title: "Market Reach", desc: "Access students in 10+ countries through our regional presence and digital platform." },
  { icon: Cpu, title: "AI-Powered Matching", desc: "Our technology matches students with programmes based on eligibility and fit." },
  { icon: FileCheck, title: "Full Application Support", desc: "We prepare and submit complete applications, reducing your admin burden." },
  { icon: ShieldCheck, title: "99% Visa Success", desc: "Our compliance team ensures students actually arrive at your institution." },
  { icon: BarChart3, title: "Transparent Reporting", desc: "Regular updates on pipeline, applications, and outcomes." },
];

const stats = [
  { value: "3,000+", label: "Students Placed" },
  { value: "150+", label: "Partners" },
  { value: "99%", label: "Visa Success" },
  { value: "10+", label: "Source Countries" },
];

const steps = [
  { num: 1, title: "Get in Touch", desc: "Submit an enquiry through the form below." },
  { num: 2, title: "Introductory Call", desc: "We arrange a call to understand your goals." },
  { num: 3, title: "Onboarding", desc: "We add your institution and programmes to our platform." },
  { num: 4, title: "Student Referrals", desc: "We begin matching and referring qualified students." },
];

const ForInstitutions = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    institution_name: "",
    contact_name: "",
    job_title: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.institution_name.trim()) e.institution_name = "Institution name is required";
    if (!form.contact_name.trim()) e.contact_name = "Contact name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.country.trim()) e.country = "Country is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const { error } = await supabase.from("institution_enquiries").insert({
      institution_name: form.institution_name.trim(),
      contact_name: form.contact_name.trim(),
      job_title: form.job_title.trim() || null,
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      country: form.country.trim(),
      message: form.message.trim() || null,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      setSubmitted(true);
    }
  };

  const scrollToForm = () => {
    document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar solid />

      {/* Hero */}
      <section className="bg-primary pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/60">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem><BreadcrumbPage className="text-primary-foreground/80">For Institutions</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mt-4 mb-4">Partner With Applyza</h1>
          <p className="text-primary-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Reach motivated, application-ready students from fast-growing education markets. We connect your institution with the right students — and handle everything from initial engagement to enrolment.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-background py-16 md:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary text-center mb-12">Why Institutions Work With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <b.icon className="text-secondary" size={22} />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-10">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl md:text-3xl font-extrabold text-secondary">{s.value}</p>
              <p className="text-primary-foreground/70 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted py-16 md:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-sm font-bold mb-4">{s.num}</div>
                <h3 className="text-lg font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" className="bg-background py-16 md:py-20">
        <div className="container max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary text-center mb-3">Partner With Us</h2>
          <p className="text-muted-foreground text-center mb-10">Fill in the form below and our partnerships team will be in touch within 48 hours.</p>

          {submitted ? (
            <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-primary mb-2">Thank you for your enquiry</h3>
              <p className="text-muted-foreground">Our partnerships team will contact you within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="institution_name">Institution Name *</Label>
                <Input id="institution_name" value={form.institution_name} onChange={(e) => setForm({ ...form, institution_name: e.target.value })} />
                {errors.institution_name && <p className="text-sm text-destructive mt-1">{errors.institution_name}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="contact_name">Contact Person Name *</Label>
                  <Input id="contact_name" value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} />
                  {errors.contact_name && <p className="text-sm text-destructive mt-1">{errors.contact_name}</p>}
                </div>
                <div>
                  <Label htmlFor="job_title">Job Title</Label>
                  <Input id="job_title" value={form.job_title} onChange={(e) => setForm({ ...form, job_title: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="inst_email">Email *</Label>
                  <Input id="inst_email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="inst_phone">Phone</Label>
                  <Input id="inst_phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div>
                <Label htmlFor="inst_country">Country *</Label>
                <Input id="inst_country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                {errors.country && <p className="text-sm text-destructive mt-1">{errors.country}</p>}
              </div>
              <div>
                <Label htmlFor="inst_message">Message</Label>
                <Textarea id="inst_message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <Button type="submit" variant="teal" size="lg" className="w-full rounded-full" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Enquiry"}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-14">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-accent-foreground mb-6">Join 150+ Institutions Worldwide</h2>
          <Button variant="teal" size="lg" className="rounded-full" onClick={scrollToForm}>Submit Enquiry</Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ForInstitutions;
