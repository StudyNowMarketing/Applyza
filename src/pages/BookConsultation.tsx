import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { useState } from "react";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import FormError from "@/components/FormError";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, CheckCircle, Loader2, Mail, MessageCircle } from "lucide-react";
import { MovingBorderButton } from "@/components/ui/MovingBorder";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { sanitize, FIELD_LIMITS } from "@/lib/sanitize";
import { useFormProtection } from "@/hooks/useFormProtection";
import { createNotification } from "@/lib/notifications";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(30),
  service_interest: z.string().min(1, "Please select a service"),
  consultation_type: z.string().min(1, "Please select a type"),
  preferred_date: z.string().optional(),
  message: z.string().max(2000).optional(),
});

const services = [
  "University Applications",
  "Visa & Immigration",
  "Student Counselling",
  "Accommodation",
  "General Enquiry",
];

const consultTypes = ["Video Call", "Phone Call", "In-Person"];

const BookConsultation = () => {
  const { toast } = useToast();
  const { rateLimitMsg, canSubmit, onSuccess, isBlocked } = useFormProtection({ formId: "consultation" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service_interest: "",
    consultation_type: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      ...form,
      preferred_date: date ? format(date, "yyyy-MM-dd") : undefined,
    };

    const result = formSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!canSubmit(result.data.email)) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("consultation_requests").insert({
        name: sanitize(result.data.name, FIELD_LIMITS.name),
        email: sanitize(result.data.email, FIELD_LIMITS.email),
        phone: sanitize(result.data.phone, FIELD_LIMITS.phone),
        service_interest: sanitize(result.data.service_interest, FIELD_LIMITS.short),
        consultation_type: sanitize(result.data.consultation_type, FIELD_LIMITS.short),
        preferred_date: result.data.preferred_date || null,
        message: result.data.message ? sanitize(result.data.message, FIELD_LIMITS.message) : null,
      });

      if (error) {
        toast({ title: "We couldn't submit your request", description: "Please try again or email us at info@applyza.com", variant: "destructive" });
        return;
      }
      onSuccess(result.data.email);
      setSubmitted(true);
      createNotification({
        type: "consultation",
        title: "New Consultation Request",
        message: `${result.data.name} (${result.data.email}) requested a ${result.data.consultation_type} for ${result.data.service_interest}`,
      });
    } catch {
      toast({ title: "We couldn't submit your request", description: "Please try again or email us at info@applyza.com", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="Book a Free Consultation | Applyza" description="Book a free consultation with an Applyza counsellor. University applications, visa support, and student guidance." path="/book-a-consultation" />
      <Navbar solid />

      {/* Dark Hero */}
      <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
        <SparklesCore className="absolute inset-0 z-[1]" background="transparent" particleColor="#6B3FA0" particleDensity={60} minSize={0.4} maxSize={1.5} speed={1.5} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.4), transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(265 44% 44% / 0.3), transparent 70%)" }} />
        </div>
        <div className="container relative z-10 pt-20">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">Book a Consultation</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">Book a Free Consultation</h1>
          <p className="text-white/60 text-sm sm:text-base max-w-xl">
            Choose your service, pick a time, and one of our expert counsellors will be in touch. It's completely free.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-background py-12 flex-1">
        <div className="container max-w-2xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-secondary/10 border border-secondary/30 rounded-xl p-8 text-center"
            >
              <CheckCircle className="mx-auto text-secondary mb-4" size={40} />
              <h2 className="text-lg font-bold text-primary mb-2">Thank you!</h2>
              <p className="text-sm text-muted-foreground">
                One of our counsellors will contact you within 24 hours to confirm your consultation.
              </p>
              <MovingBorderButton to="/" className="mt-5 px-6 py-2 text-sm">
                Back to Home
              </MovingBorderButton>
            </motion.div>
          ) : (
            <div className="bg-card rounded-xl border border-border shadow-sm p-6 card-glow">
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormError message={rateLimitMsg} />

                <div>
                  <Label htmlFor="name" className="text-sm text-muted-foreground mb-1.5 block">Full Name *</Label>
                  <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" disabled={loading} maxLength={FIELD_LIMITS.name} className="rounded-lg h-10 border-border focus-visible:ring-secondary" />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-sm text-muted-foreground mb-1.5 block">Email *</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" disabled={loading} maxLength={FIELD_LIMITS.email} className="rounded-lg h-10 border-border focus-visible:ring-secondary" />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm text-muted-foreground mb-1.5 block">Phone *</Label>
                    <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+44 7XXX XXXXXX" disabled={loading} maxLength={FIELD_LIMITS.phone} className="rounded-lg h-10 border-border focus-visible:ring-secondary" />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground mb-1.5 block">Service Interest *</Label>
                  <Select value={form.service_interest} onValueChange={(v) => update("service_interest", v)} disabled={loading}>
                    <SelectTrigger className="rounded-lg h-10 border-border focus:ring-secondary"><SelectValue placeholder="Select a service" /></SelectTrigger>
                    <SelectContent>
                      {services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.service_interest && <p className="text-destructive text-xs mt-1">{errors.service_interest}</p>}
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground mb-1.5 block">Preferred Consultation Type *</Label>
                  <div className="flex gap-2 mt-1">
                    {consultTypes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => update("consultation_type", t)}
                        disabled={loading}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                          form.consultation_type === t
                            ? "bg-secondary text-secondary-foreground border-secondary"
                            : "bg-card text-muted-foreground border-border hover:border-secondary/50"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {errors.consultation_type && <p className="text-destructive text-xs mt-1">{errors.consultation_type}</p>}
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground mb-1.5 block">Preferred Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal rounded-lg h-10 border-border", !date && "text-muted-foreground")} disabled={loading}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => d < new Date()}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm text-muted-foreground mb-1.5 block">Message (optional)</Label>
                  <Textarea id="message" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your goals..." rows={3} disabled={loading} maxLength={FIELD_LIMITS.message} className="rounded-lg border-border focus-visible:ring-secondary" />
                </div>

                <ConsentCheckbox
                  checked={consent}
                  onCheckedChange={setConsent}
                  label="I agree to the Privacy Policy and consent to Applyza processing my personal data to arrange my consultation."
                />

                <Button type="submit" size="lg" className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" disabled={loading || !consent || isBlocked}>
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Booking Request"}
                </Button>
              </form>
            </div>
          )}

          {/* Direct contact */}
          <div className="mt-8 p-5 bg-card rounded-xl border border-border text-center card-glow">
            <p className="font-semibold text-primary text-sm mb-2">Prefer to reach us directly?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:info@applyza.com" className="flex items-center gap-2 text-sm text-secondary font-semibold hover:underline">
                <Mail size={14} /> info@applyza.com
              </a>
              <a
                href={`https://wa.me/447000000000?text=${encodeURIComponent("Hi, I'd like to book a consultation with Applyza")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-secondary font-semibold hover:underline"
              >
                <MessageCircle size={14} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookConsultation;
