import { useState } from "react";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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
import { CalendarIcon, CheckCircle, Mail, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

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

    setLoading(true);
    const { error } = await supabase.from("consultation_requests").insert({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      service_interest: result.data.service_interest,
      consultation_type: result.data.consultation_type,
      preferred_date: result.data.preferred_date || null,
      message: result.data.message || null,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Something went wrong", description: "Please try again or contact us directly.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen">
      <Navbar solid />

      <section className="bg-card border-b border-border pt-20">
        <div className="container py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Book a Consultation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-2xl md:text-4xl font-extrabold text-primary mb-3">Book a Free Consultation</h1>
            <p className="text-muted-foreground mb-8">
              Choose your service, pick a time, and one of our expert counsellors will be in touch. It's completely free.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-secondary/10 rounded-2xl p-8 text-center"
            >
              <CheckCircle className="mx-auto text-secondary mb-4" size={48} />
              <h2 className="text-xl font-bold text-foreground mb-2">Thank you!</h2>
              <p className="text-muted-foreground">
                One of our counsellors will contact you within 24 hours to confirm your consultation.
              </p>
              <Button variant="teal" className="mt-6" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+44 7XXX XXXXXX" />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <Label>Service Interest *</Label>
                <Select value={form.service_interest} onValueChange={(v) => update("service_interest", v)}>
                  <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
                  <SelectContent>
                    {services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.service_interest && <p className="text-destructive text-xs mt-1">{errors.service_interest}</p>}
              </div>

              <div>
                <Label>Preferred Consultation Type *</Label>
                <div className="flex gap-3 mt-1.5">
                  {consultTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update("consultation_type", t)}
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
                <Label>Preferred Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
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
                <Label htmlFor="message">Message (optional)</Label>
                <Textarea id="message" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your goals..." rows={4} />
              </div>

              <Button type="submit" variant="teal" size="lg" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Booking Request"}
              </Button>
            </form>
          )}

          {/* Direct contact */}
          <div className="mt-10 p-6 bg-muted rounded-xl text-center">
            <p className="font-bold text-foreground mb-2">Prefer to reach us directly?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:info@applyza.com" className="flex items-center gap-2 text-sm text-secondary font-semibold hover:underline">
                <Mail size={16} /> info@applyza.com
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent("Hi, I'd like to book a consultation with Applyza")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-secondary font-semibold hover:underline"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BookConsultation;
