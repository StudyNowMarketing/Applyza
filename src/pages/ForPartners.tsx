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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Database, Wallet, Headphones, Search, Loader2, Shield, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { sanitize, FIELD_LIMITS } from "@/lib/sanitize";
import { useFormProtection } from "@/hooks/useFormProtection";
import { createNotification } from "@/lib/notifications";

const benefits = [
  { icon: Database, title: "150+ Universities", desc: "Access our full course database spanning universities worldwide." },
  { icon: Wallet, title: "Competitive Commissions", desc: "Earn commissions on every successful student placement." },
  { icon: Headphones, title: "Dedicated Support", desc: "Get dedicated support from our partnerships team." },
  { icon: Search, title: "AI Course Matching", desc: "Use our AI to help your students find the right programmes faster." },
  { icon: Shield, title: "Compliance Covered", desc: "Our 99% visa success rate means your students arrive enrolled." },
  { icon: TrendingUp, title: "Grow Your Business", desc: "Scale your agency with our platform, tools, and university network." },
];

const steps = [
  { num: 1, title: "Register Interest", desc: "Fill in the form below to get started." },
  { num: 2, title: "Partnership Review", desc: "Our team reviews your application." },
  { num: 3, title: "Onboarding", desc: "Access our platform and start referring students." },
  { num: 4, title: "Earn & Grow", desc: "Track placements and earn commissions." },
];

const ForPartners = () => {
  const { toast } = useToast();
  const { rateLimitMsg, canSubmit, onSuccess, isBlocked } = useFormProtection({ formId: "partner" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company_name: "",
    email: "",
    phone: "",
    country: "",
    students_per_year: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!canSubmit(form.email)) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from("partner_enquiries").insert({
        name: sanitize(form.name, FIELD_LIMITS.name),
        company_name: form.company_name.trim() ? sanitize(form.company_name, FIELD_LIMITS.name) : null,
        email: sanitize(form.email, FIELD_LIMITS.email),
        phone: form.phone.trim() ? sanitize(form.phone, FIELD_LIMITS.phone) : null,
        country: form.country.trim() ? sanitize(form.country, FIELD_LIMITS.short) : null,
        students_per_year: form.students_per_year || null,
        message: form.message.trim() ? sanitize(form.message, FIELD_LIMITS.message) : null,
      });
      if (error) {
        toast({ title: "We couldn't submit your request", description: "Please try again or email us at info@applyza.com", variant: "destructive" });
      } else {
        onSuccess(form.email);
        setSubmitted(true);
        createNotification({
          type: "partner",
          title: "New Partner Enquiry",
          message: `${form.name}${form.company_name ? ` from ${form.company_name}` : ""} (${form.email})`,
        });
      }
    } catch {
      toast({ title: "We couldn't submit your request", description: "Please try again or email us at info@applyza.com", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="Recruitment Partners | Join the Applyza Network" description="Join Applyza's recruitment partner network. Refer students, earn commissions, and access our course database." path="/for-partners" />
      <Navbar solid />

      {/* Dark Hero */}
      <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(265 44% 44% / 0.4), transparent 70%)" }} />
        </div>
        <div className="container relative z-10 pt-20">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">For Partners</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">Join Our Agent Network</h1>
          <p className="text-white/50 text-sm max-w-xl">
            Are you an education agent or recruitment partner? Join our growing network to refer students, earn commissions, and access our full course database.
          </p>
          <Button onClick={scrollToForm} size="sm" className="mt-4 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs px-6">
            Register Interest
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-background py-10">
        <div className="container">
          <h2 className="text-lg font-bold text-primary mb-6">Why Partner With Applyza?</h2>
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
          {[
            { value: "150+", label: "University Partners" },
            { value: "10+", label: "Source Countries" },
            { value: "99%", label: "Visa Success" },
            { value: "48hr", label: "Response Time" },
          ].map((s) => (
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

      {/* Partner Portal Teaser */}
      <section className="bg-background py-10">
        <div className="container max-w-2xl text-center">
          <h2 className="text-lg font-bold text-primary mb-2">Partner Portal — Coming Soon</h2>
          <p className="text-xs text-muted-foreground mb-6">
            A dedicated portal where you can refer students, track applications, view commission statements, and access marketing materials.
          </p>
          <div className="rounded-xl p-6 border border-border" style={{ background: "#0a0d24" }}>
            <div className="space-y-2">
              <div className="h-3 w-3/4 bg-white/10 rounded mx-auto" />
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="h-12 bg-white/5 rounded-lg" />
                <div className="h-12 bg-white/5 rounded-lg" />
                <div className="h-12 bg-white/5 rounded-lg" />
              </div>
              <div className="h-16 bg-white/5 rounded-lg mt-2" />
            </div>
            <p className="text-white/30 text-[10px] mt-4">Partner Dashboard Preview</p>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="partner-form" className="bg-card py-10">
        <div className="container max-w-2xl">
          <div className="bg-background rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-lg font-bold text-primary mb-1">Register Your Interest</h2>
            <p className="text-xs text-muted-foreground mb-5">Fill in the form below and we'll be in touch within 48 hours.</p>

            {submitted ? (
              <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-6 text-center">
                <h3 className="text-base font-bold text-primary mb-1">Thank you for your interest</h3>
                <p className="text-sm text-muted-foreground">We'll be in touch within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormError message={rateLimitMsg} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="partner_name" className="text-sm text-muted-foreground mb-1.5 block">Your Name *</Label>
                    <Input id="partner_name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.name} className="rounded-lg h-10 border-border focus-visible:ring-secondary" />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="company_name" className="text-sm text-muted-foreground mb-1.5 block">Company Name</Label>
                    <Input id="company_name" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.name} className="rounded-lg h-10 border-border focus-visible:ring-secondary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="partner_email" className="text-sm text-muted-foreground mb-1.5 block">Email *</Label>
                    <Input id="partner_email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.email} className="rounded-lg h-10 border-border focus-visible:ring-secondary" />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="partner_phone" className="text-sm text-muted-foreground mb-1.5 block">Phone</Label>
                    <Input id="partner_phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.phone} className="rounded-lg h-10 border-border focus-visible:ring-secondary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="partner_country" className="text-sm text-muted-foreground mb-1.5 block">Country</Label>
                    <Input id="partner_country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.short} className="rounded-lg h-10 border-border focus-visible:ring-secondary" />
                  </div>
                  <div>
                    <Label htmlFor="students_per_year" className="text-sm text-muted-foreground mb-1.5 block">Students per year</Label>
                    <Select value={form.students_per_year} onValueChange={(v) => setForm({ ...form, students_per_year: v })} disabled={submitting}>
                      <SelectTrigger id="students_per_year" className="rounded-lg h-10 border-border focus:ring-secondary"><SelectValue placeholder="Select range" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1–10</SelectItem>
                        <SelectItem value="11-50">11–50</SelectItem>
                        <SelectItem value="51-100">51–100</SelectItem>
                        <SelectItem value="100+">100+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="partner_message" className="text-sm text-muted-foreground mb-1.5 block">Message</Label>
                  <Textarea id="partner_message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.message} className="rounded-lg border-border focus-visible:ring-secondary" />
                </div>
                <ConsentCheckbox
                  checked={consent}
                  onCheckedChange={setConsent}
                  label="I agree to the Privacy Policy and consent to Applyza processing this data to discuss a potential partnership."
                />
                <Button type="submit" size="lg" className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" disabled={submitting || !consent || isBlocked}>
                  {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Register Interest"}
                </Button>
              </form>
            )}

            <p className="text-center text-xs text-muted-foreground mt-5">
              Already a partner? Contact us at{" "}
              <a href="mailto:info@applyza.com" className="text-secondary hover:underline">info@applyza.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10" style={{ background: "linear-gradient(135deg, hsl(169 63% 47%), hsl(169 63% 40%))" }}>
        <div className="container text-center">
          <h2 className="text-xl font-bold text-white mb-2">Grow Your Agency With Applyza</h2>
          <p className="text-white/80 text-sm mb-4">Join our network and start placing students at top universities.</p>
          <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 font-semibold px-8" onClick={scrollToForm}>
            Register Interest
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ForPartners;
