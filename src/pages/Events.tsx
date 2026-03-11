import SEO from "@/components/SEO";
import { useState } from "react";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import FormError from "@/components/FormError";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { MapPin, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format, isBefore, startOfDay } from "date-fns";
import { motion } from "framer-motion";
import { sanitize, FIELD_LIMITS } from "@/lib/sanitize";
import { useFormProtection } from "@/hooks/useFormProtection";

const Events = () => {
  const { toast } = useToast();
  const { rateLimitMsg, canSubmit, onSuccess, isBlocked } = useFormProtection({ formId: "event_subscribe" });
  const [showPast, setShowPast] = useState(false);
  const [subEmail, setSubEmail] = useState("");
  const [subConsent, setSubConsent] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const { data: events, isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const today = startOfDay(new Date());
  const upcoming = events?.filter((e) => !isBefore(new Date(e.date), today)) || [];
  const past = events?.filter((e) => isBefore(new Date(e.date), today)) || [];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subEmail)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    if (!canSubmit(subEmail)) return;

    setSubscribing(true);
    try {
      const { error } = await supabase.from("event_subscribers").insert({ email: sanitize(subEmail, FIELD_LIMITS.email) });
      if (error) {
        toast({ title: "We couldn't submit your request", description: "Please try again or email us at info@applyza.com", variant: "destructive" });
      } else {
        onSuccess(subEmail);
        setSubscribed(true);
        toast({ title: "You're subscribed!", description: "We'll notify you about upcoming events." });
        setSubEmail("");
      }
    } catch {
      toast({ title: "We couldn't submit your request", description: "Please try again or email us at info@applyza.com", variant: "destructive" });
    } finally {
      setSubscribing(false);
    }
  };

  const EventCard = ({ event, isPast = false }: { event: any; isPast?: boolean }) => {
    const eventDate = new Date(event.date);
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`bg-card rounded-2xl shadow-sm border flex flex-col sm:flex-row items-stretch overflow-hidden ${isPast ? "opacity-60" : "hover:shadow-md transition-shadow"}`}
      >
        <div className={`flex flex-col items-center justify-center px-6 py-5 sm:px-8 shrink-0 ${isPast ? "bg-muted" : "bg-accent"}`}>
          <span className={`text-3xl font-extrabold ${isPast ? "text-muted-foreground" : "text-accent-foreground"}`}>
            {format(eventDate, "dd")}
          </span>
          <span className={`text-sm font-medium uppercase ${isPast ? "text-muted-foreground" : "text-accent-foreground/80"}`}>
            {format(eventDate, "MMM")}
          </span>
          <span className={`text-xs ${isPast ? "text-muted-foreground" : "text-accent-foreground/60"}`}>
            {format(eventDate, "yyyy")}
          </span>
        </div>

        <div className="flex-1 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-primary mb-1">{event.title}</h3>
            {event.location && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                <MapPin size={14} className="text-secondary shrink-0" />
                <span>{event.location}</span>
              </div>
            )}
            {event.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
            )}
          </div>
          {!isPast && (
            <div className="shrink-0">
              <Button variant="outline" className="rounded-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground" asChild>
                <a href={event.registration_url || "/book-a-consultation"} target={event.registration_url ? "_blank" : undefined} rel="noopener noreferrer">
                  Register →
                </a>
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar solid />

      <section className="bg-primary" style={{ minHeight: "35vh", display: "flex", alignItems: "flex-end" }}>
        <div className="container pb-12 pt-28">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/60">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem><BreadcrumbPage className="text-primary-foreground/80">Events</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mt-4 mb-3">The Applyza Experience</h1>
          <p className="text-primary-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Join us at our events across the globe. Meet university representatives, attend expert panels, and get your questions answered by our counsellors.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 md:py-16 flex-1">
        <div className="container max-w-4xl space-y-5">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-2xl h-32 animate-pulse" />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Something went wrong. Please refresh the page or contact us at <a href="mailto:info@applyza.com" className="text-secondary underline">info@applyza.com</a>.</p>
            </div>
          ) : upcoming.length > 0 ? (
            upcoming.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No upcoming events at the moment. Follow us on social media for announcements.</p>
              <div className="flex justify-center gap-3">
                {["Instagram", "TikTok", "LinkedIn"].map((s) => (
                  <a key={s} href={`https://${s.toLowerCase()}.com/applyzahq`} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-secondary hover:underline">{s}</a>
                ))}
              </div>
            </div>
          )}

          {past.length > 0 && (
            <div className="pt-8">
              <button onClick={() => setShowPast(!showPast)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
                {showPast ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {showPast ? "Hide" : "Show"} Past Events ({past.length})
              </button>
              {showPast && (
                <div className="space-y-4 mt-4">
                  {past.map((event) => <EventCard key={event.id} event={event} isPast />)}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="bg-muted py-14">
        <div className="container max-w-xl text-center">
          <h2 className="text-xl md:text-2xl font-extrabold text-primary mb-3">Want to be notified about future events?</h2>
          <p className="text-muted-foreground text-sm mb-6">Enter your email and we'll let you know when new events are announced.</p>
          {subscribed ? (
            <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-6 text-center">
              <p className="font-bold text-primary">You're subscribed! We'll notify you about upcoming events.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4 max-w-md mx-auto">
              <FormError message={rateLimitMsg} />
              <div className="flex gap-3">
                <Input type="email" placeholder="Your email address" value={subEmail} onChange={(e) => setSubEmail(e.target.value)} className="flex-1" disabled={subscribing} maxLength={FIELD_LIMITS.email} />
                <Button type="submit" variant="teal" className="rounded-full shrink-0" disabled={subscribing || !subConsent || isBlocked}>
                  {subscribing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
                </Button>
              </div>
              <ConsentCheckbox
                checked={subConsent}
                onCheckedChange={setSubConsent}
                label="I consent to receiving event updates from Applyza. Privacy Policy."
              />
            </form>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Events;
