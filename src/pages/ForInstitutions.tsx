import SEO from "@/components/SEO";
import { useState } from "react";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import FormError from "@/components/FormError";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Users, Globe, Cpu, FileCheck, ShieldCheck, BarChart3, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { sanitize, FIELD_LIMITS } from "@/lib/sanitize";
import { useFormProtection } from "@/hooks/useFormProtection";
import { createNotification } from "@/lib/notifications";

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
  const { rateLimitMsg, canSubmit, onSuccess, isBlocked } = useFormProtection({ formId: "institution" });
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
  const [consent, setConsent] = useState(false);
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
    if (!canSubmit(form.email)) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from("institution_enquiries").insert({
        institution_name: sanitize(form.institution_name, FIELD_LIMITS.name),
        contact_name: sanitize(form.contact_name, FIELD_LIMITS.name),
        job_title: form.job_title.trim() ? sanitize(form.job_title, FIELD_LIMITS.short) : null,
        email: sanitize(form.email, FIELD_LIMITS.email),
        phone: form.phone.trim() ? sanitize(form.phone, FIELD_LIMITS.phone) : null,
        country: sanitize(form.country, FIELD_LIMITS.short),
        message: form.message.trim() ? sanitize(form.message, FIELD_LIMITS.message) : null,
      });
      if (error) {
        toast({ title: "We couldn't submit your request", description: "Please try again or email us at info@applyza.com", variant: "destructive" });
      } else {
        onSuccess(form.email);
        setSubmitted(true);
        createNotification({
          type: "institution",
          title: "New Institution Enquiry",
          message: `${form.contact_name} from ${form.institution_name} (${form.email})`,
        });
      }
    } catch {
      toast({ title: "We couldn't submit your request", description: "Please try again or email us at info@applyza.com", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="Partner With Applyza | Student Recruitment for Universities" description="Reach qualified international students from 10+ countries. Applyza delivers application-ready students through expert counselling and AI-powered matching." path="/for-institutions" />
      <Navbar solid />

      {/* Dark Hero */}
      <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.4), transparent 70%)" }} />
        </div>
        <div className="container relative z-10 pt-20">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">For Institutions</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">Partner With Applyza</h1>
          <p className="text-white/50 text-sm max-w-xl">
            Reach motivated, application-ready students from fast-growing education markets. We connect your institution with the right students — and handle everything from initial engagement to enrolment.
          </p>
          <Button onClick={scrollToForm} size="sm" className="mt-4 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs px-6">
            Submit Enquiry
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-background py-10">
        <div className="container">
          <h2 className="text-lg font-bold text-primary mb-6">Why Institutions Work With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow">
                <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center mb-3">
                  <b.icon className="text-secondary" size={16} />
                </div>
                <h3 className="text-sm font-bold text-primary mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8" style={{ background: "#0a0d24" }}>
        <div className="container flex flex-wrap justify-center gap-8 md:gap-16">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-secondary">{s.value}</p>
              <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-card py-10">
        <div className="container">
          <h2 className="text-lg font-bold text-primary mb-6">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-bold shrink-0 mt-0.5">
                  {s.num}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" className="bg-background py-10">
        <div className="container max-w-2xl">
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-lg font-bold text-primary mb-1">Partner With Us</h2>
            <p className="text-xs text-muted-foreground mb-5">Fill in the form below and our partnerships team will be in touch within 48 hours.</p>

            {submitted ? (
              <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-6 text-center">
                <h3 className="text-base font-bold text-primary mb-1">Thank you for your enquiry</h3>
                <p className="text-sm text-muted-foreground">Our partnerships team will contact you within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormError message={rateLimitMsg} />
                <div>
                  <Label htmlFor="institution_name" className="text-sm text-muted-foreground mb-1.5 block">Institution Name *</Label>
                  <Input id="institution_name" value={form.institution_name} onChange={(e) => setForm({ ...form, institution_name: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.name} className="rounded-lg h-10 border-border focus-visible:ring-secondary" />
                  {errors.institution_name && <p className="text-sm text-destructive mt-1">{errors.institution_name}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact_name" className="text-sm text-muted-foreground mb-1.5 block">Contact Person *</Label>
                    <Input id="contact_name" value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.name} className="rounded-lg h-10 border-border focus-visible:ring-secondary" />
                    {errors.contact_name && <p className="text-sm text-destructive mt-1">{errors.contact_name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="job_title" className="text-sm text-muted-foreground mb-1.5 block">Job Title</Label>
                    <Input id="job_title" value={form.job_title} onChange={(e) => setForm({ ...form, job_title: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.short} className="rounded-lg h-10 border-border focus-visible:ring-secondary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="inst_email" className="text-sm text-muted-foreground mb-1.5 block">Email *</Label>
                    <Input id="inst_email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.email} className="rounded-lg h-10 border-border focus-visible:ring-secondary" />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="inst_phone" className="text-sm text-muted-foreground mb-1.5 block">Phone</Label>
                    <Input id="inst_phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.phone} className="rounded-lg h-10 border-border focus-visible:ring-secondary" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="inst_country" className="text-sm text-muted-foreground mb-1.5 block">Country *</Label>
                  <Input id="inst_country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.short} className="rounded-lg h-10 border-border focus-visible:ring-secondary" />
                  {errors.country && <p className="text-sm text-destructive mt-1">{errors.country}</p>}
                </div>
                <div>
                  <Label htmlFor="inst_message" className="text-sm text-muted-foreground mb-1.5 block">Message</Label>
                  <Textarea id="inst_message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.message} className="rounded-lg border-border focus-visible:ring-secondary" />
                </div>
                <ConsentCheckbox
                  checked={consent}
                  onCheckedChange={setConsent}
                  label="I agree to the Privacy Policy and consent to Applyza processing this data to discuss a potential partnership."
                />
                <Button type="submit" size="lg" className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" disabled={submitting || !consent || isBlocked}>
                  {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Enquiry"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10" style={{ background: "linear-gradient(135deg, hsl(169 63% 47%), hsl(169 63% 40%))" }}>
        <div className="container text-center">
          <h2 className="text-xl font-bold text-white mb-2">Join 150+ Institutions Worldwide</h2>
          <p className="text-white/80 text-sm mb-4">Partner with us to reach qualified, motivated students.</p>
          <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 font-semibold px-8" onClick={scrollToForm}>
            Submit Enquiry
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForInstitutions;
