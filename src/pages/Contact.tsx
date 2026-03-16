import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
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
import { Mail, MapPin, Phone, MessageCircle, Loader2 } from "lucide-react";
import { MovingBorderButton } from "@/components/ui/MovingBorder";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { sanitize, FIELD_LIMITS } from "@/lib/sanitize";
import { useFormProtection } from "@/hooks/useFormProtection";
import { createNotification } from "@/lib/notifications";

const socials = [
  { name: "Instagram", url: "https://instagram.com/applyzahq", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { name: "TikTok", url: "https://tiktok.com/@applyzahq", icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
  { name: "X", url: "https://x.com/applyzahq", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { name: "Facebook", url: "https://facebook.com/applyzahq", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: "LinkedIn", url: "https://linkedin.com/company/applyzahq", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { name: "YouTube", url: "https://youtube.com/@applyzahq", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z M9.545 15.568V8.432L15.818 12z" },
];

const Contact = () => {
  const { toast } = useToast();
  const { rateLimitMsg, canSubmit, onSuccess, isBlocked } = useFormProtection({ formId: "contact" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", user_type: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.user_type) e.user_type = "Please select an option";
    if (!form.message.trim()) e.message = "Message is required";
    if (!consent) e.consent = "Please agree to the Privacy Policy to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!canSubmit(form.email)) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: sanitize(form.name, FIELD_LIMITS.name),
        email: sanitize(form.email, FIELD_LIMITS.email),
        phone: form.phone.trim() ? sanitize(form.phone, FIELD_LIMITS.phone) : null,
        user_type: sanitize(form.user_type, FIELD_LIMITS.short),
        message: sanitize(form.message, FIELD_LIMITS.message),
      });
      if (error) {
        toast({ title: "We couldn't submit your request", description: "Please try again or email us at info@applyza.com", variant: "destructive" });
      } else {
        onSuccess(form.email);
        setSubmitted(true);
        createNotification({
          type: "contact",
          title: "New Contact Form Submission",
          message: `${form.name} (${form.email}) submitted a contact form: "${form.message.slice(0, 100)}"`,
        });
      }
    } catch {
      toast({ title: "We couldn't submit your request", description: "Please try again or email us at info@applyza.com", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="Contact Applyza | Get in Touch" description="Contact Applyza for free study abroad guidance. Reach us by email, WhatsApp, or book a consultation." path="/contact" />
      <Navbar solid />

      {/* Dark Hero */}
      <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
        <SparklesCore className="absolute inset-0 z-[1]" background="transparent" particleColor="#2EC4B6" particleDensity={60} minSize={0.4} maxSize={1.5} speed={1.5} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.4), transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(265 44% 44% / 0.3), transparent 70%)" }} />
        </div>
        <div className="container relative z-10 pt-20">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">Contact</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">Let's Talk</h1>
          <p className="text-white/60 text-sm sm:text-base max-w-xl">
            Whether you're a student with questions, a university looking to partner, or an agent who wants to join our network — we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-background py-12">
        <div className="container grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8">
          {/* Left: Form */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6 card-glow">
            <h2 className="text-xl font-bold text-primary mb-5">Send Us a Message</h2>

            {submitted ? (
              <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-8 text-center">
                <h3 className="text-lg font-bold text-primary mb-2">Thank you for your message</h3>
                <p className="text-muted-foreground text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormError message={rateLimitMsg} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="c_name" className="text-sm text-muted-foreground mb-1.5 block">Full Name *</Label>
                    <Input id="c_name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.name} className="rounded-lg h-11 border-border focus-visible:ring-secondary" placeholder="Your full name" />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="c_email" className="text-sm text-muted-foreground mb-1.5 block">Email *</Label>
                    <Input id="c_email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.email} className="rounded-lg h-11 border-border focus-visible:ring-secondary" placeholder="you@example.com" />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="c_phone" className="text-sm text-muted-foreground mb-1.5 block">Phone</Label>
                    <Input id="c_phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.phone} className="rounded-lg h-11 border-border focus-visible:ring-secondary" placeholder="+1 234 567 890" />
                  </div>
                  <div>
                    <Label htmlFor="c_type" className="text-sm text-muted-foreground mb-1.5 block">I am a... *</Label>
                    <Select value={form.user_type} onValueChange={(v) => setForm({ ...form, user_type: v })} disabled={submitting}>
                      <SelectTrigger id="c_type" className="rounded-lg h-11 border-border focus:ring-secondary"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Parent">Parent</SelectItem>
                        <SelectItem value="Institution">Institution</SelectItem>
                        <SelectItem value="Recruitment Partner">Recruitment Partner</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.user_type && <p className="text-sm text-destructive mt-1">{errors.user_type}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="c_message" className="text-sm text-muted-foreground mb-1.5 block">Message *</Label>
                  <Textarea id="c_message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} disabled={submitting} maxLength={FIELD_LIMITS.message} className="rounded-lg border-border focus-visible:ring-secondary" placeholder="How can we help you?" />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                </div>
                <ConsentCheckbox
                  checked={consent}
                  onCheckedChange={setConsent}
                  label="I agree to the Privacy Policy and consent to Applyza processing my personal data to respond to my enquiry."
                />
                {errors.consent && <p className="text-sm text-destructive mt-1">{errors.consent}</p>}
                <MovingBorderButton type="submit" className="px-8 py-3 text-sm w-full sm:w-auto" disabled={submitting || isBlocked}>
                  {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : "Send Message"}
                </MovingBorderButton>
              </form>
            )}
          </div>

          {/* Right: Info */}
          <div className="space-y-5">
            <div className="rounded-xl p-6 card-glow" style={{ background: "#0a0d24" }}>
              <h3 className="text-lg font-bold text-white mb-5">Applyza HQ</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                  <span className="text-white/70">Cyprus</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-secondary shrink-0 mt-0.5" />
                  <a href="mailto:info@applyza.com" className="text-white/70 hover:text-white transition-colors">info@applyza.com</a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-secondary shrink-0 mt-0.5" />
                  <span className="text-white/40">Phone number coming soon</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Connect With Us</h3>
              <div className="flex flex-wrap gap-2.5">
                {socials.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:shadow-[0_0_12px_hsl(169_63%_47%/0.5)]"
                    style={{ background: "#0a0d24" }}>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d={s.icon} /></svg>
                  </a>
                ))}
              </div>
            </div>

            <a href="https://wa.me/447000000000?text=Hi%20Applyza%2C%20I%20have%20a%20question" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20b858] rounded-xl p-4 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Chat on WhatsApp</p>
                <p className="text-white/80 text-xs">Quick responses, real humans</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
