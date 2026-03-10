import { useState } from "react";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Database, Wallet, Headphones, Search } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  { icon: Database, title: "150+ Universities", desc: "Access our full course database spanning universities worldwide." },
  { icon: Wallet, title: "Competitive Commissions", desc: "Earn commissions on every successful student placement." },
  { icon: Headphones, title: "Dedicated Support", desc: "Get dedicated support from our partnerships team." },
  { icon: Search, title: "AI Course Matching", desc: "Use our AI to help your students find the right programmes faster." },
];

const ForPartners = () => {
  const { toast } = useToast();
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
    setSubmitting(true);
    const { error } = await supabase.from("partner_enquiries").insert({
      name: form.name.trim(),
      company_name: form.company_name.trim() || null,
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      country: form.country.trim() || null,
      students_per_year: form.students_per_year || null,
      message: form.message.trim() || null,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      setSubmitted(true);
    }
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
              <BreadcrumbItem><BreadcrumbPage className="text-primary-foreground/80">For Recruitment Partners</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mt-4 mb-4">Join the Applyza Partner Network</h1>
          <p className="text-primary-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Are you an education agent or recruitment partner? Join our growing network to refer students, earn commissions, and access our full course database.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-background py-16 md:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary text-center mb-12">Why Partner With Applyza?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

      {/* Partner Portal Coming Soon */}
      <section className="bg-accent/10 py-16 md:py-20">
        <div className="container text-center max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-4">Partner Portal — Coming Soon</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            We're building a dedicated portal where you can refer students, track applications, view commission statements, and access marketing materials — all in one place. Register your interest now to be among the first to get access.
          </p>
          <div className="bg-primary rounded-2xl p-8 md:p-12 mx-auto max-w-lg">
            <div className="space-y-3">
              <div className="h-4 w-3/4 bg-primary-foreground/15 rounded mx-auto" />
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="h-16 bg-primary-foreground/10 rounded-lg" />
                <div className="h-16 bg-primary-foreground/10 rounded-lg" />
                <div className="h-16 bg-primary-foreground/10 rounded-lg" />
              </div>
              <div className="h-24 bg-primary-foreground/10 rounded-lg mt-3" />
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="h-12 bg-primary-foreground/10 rounded-lg" />
                <div className="h-12 bg-primary-foreground/10 rounded-lg" />
              </div>
            </div>
            <p className="text-primary-foreground/50 text-xs mt-6">Partner Dashboard Preview</p>
          </div>
        </div>
      </section>

      {/* Expression of Interest Form */}
      <section className="bg-background py-16 md:py-20">
        <div className="container max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary text-center mb-3">Register Your Interest</h2>
          <p className="text-muted-foreground text-center mb-10">Fill in the form below and we'll be in touch within 48 hours.</p>

          {submitted ? (
            <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-primary mb-2">Thank you for your interest</h3>
              <p className="text-muted-foreground">We'll be in touch within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="partner_name">Your Name *</Label>
                  <Input id="partner_name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input id="company_name" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="partner_email">Email *</Label>
                  <Input id="partner_email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="partner_phone">Phone</Label>
                  <Input id="partner_phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="partner_country">Country</Label>
                  <Input id="partner_country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="students_per_year">Students per year</Label>
                  <Select value={form.students_per_year} onValueChange={(v) => setForm({ ...form, students_per_year: v })}>
                    <SelectTrigger id="students_per_year"><SelectValue placeholder="Select range" /></SelectTrigger>
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
                <Label htmlFor="partner_message">Message</Label>
                <Textarea id="partner_message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <Button type="submit" variant="teal" size="lg" className="w-full rounded-full" disabled={submitting}>
                {submitting ? "Submitting..." : "Register Interest"}
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already a partner? Contact us at{" "}
            <a href="mailto:info@applyza.com" className="text-secondary hover:underline">info@applyza.com</a>
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ForPartners;
