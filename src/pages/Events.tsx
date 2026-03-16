import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { useState } from "react";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import FormError from "@/components/FormError";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
import { createNotification } from "@/lib/notifications";

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
        createNotification({
          type: "event_registration",
          title: "New Event Subscriber",
          message: `${subEmail} subscribed to event notifications`,
        });
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
    const isVirtual = event.location?.toLowerCase().includes("virtual") || event.location?.toLowerCase().includes("online");
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`bg-card rounded-xl border border-border shadow-sm flex flex-col sm:flex-row items-stretch overflow-hidden ${isPast ? "opacity-50" : "hover:shadow-md transition-shadow"}`}
      >
        {/* Date badge */}
        <div className={`flex flex-col items-center justify-center px-5 py-4 sm:px-6 shrink-0 border-r border-border ${isPast ? "bg-muted" : ""}`}
          style={!isPast ? { borderColor: "hsl(169 63% 47%)", borderRightWidth: 2 } : {}}>
          <span className={`text-xs font-semibold uppercase ${isPast ? "text-muted-foreground" : "text-secondary"}`}>
            {format(eventDate, "MMM")}
          </span>
          <span className={`text-2xl font-bold leading-none ${isPast ? "text-muted-foreground" : "text-primary"}`}>
            {format(eventDate, "dd")}
          </span>
          <span className={`text-[10px] ${isPast ? "text-muted-foreground" : "text-muted-foreground"}`}>
            {format(eventDate, "yyyy")}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`text-base font-bold leading-snug ${isPast ? "text-muted-foreground" : "text-primary"}`}>{event.title}</h3>
              {!isPast && isVirtual !== undefined && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isVirtual ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"}`}>
                  {isVirtual ? "Virtual" : "In-Person"}
                </span>
              )}
            </div>
            {event.location && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <MapPin size={12} className="text-secondary shrink-0" />
                <span>{event.location}</span>
              </div>
            )}
            {event.description && (
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{event.description}</p>
            )}
          </div>
          {!isPast && (
            <div className="shrink-0">
              <Button size="sm" className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs px-4" asChild>
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
      <SEO title="Events | The Applyza Experience | Meet Universities" description="Join Applyza events across the globe. Meet university representatives, attend expert panels, and get personalised guidance." path="/events" />
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
              <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">Events</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">The Applyza Experience</h1>
          <p className="text-white/60 text-sm sm:text-base max-w-xl">
            Join us at our events across the globe. Meet university representatives, attend expert panels, and get your questions answered.
          </p>
        </div>
      </section>

      {/* Events */}
      <section className="bg-background py-10 flex-1">
        <div className="container max-w-3xl space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-xl h-24 animate-pulse border border-border" />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm">Something went wrong. Please refresh the page or contact us at <a href="mailto:info@applyza.com" className="text-secondary underline">info@applyza.com</a>.</p>
            </div>
          ) : upcoming.length > 0 ? (
            upcoming.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm mb-4">No upcoming events at the moment. Follow us on social media for announcements.</p>
              <div className="flex justify-center gap-3">
                {["Instagram", "TikTok", "LinkedIn"].map((s) => (
                  <a key={s} href={`https://${s.toLowerCase()}.com/applyzahq`} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-secondary hover:underline">{s}</a>
                ))}
              </div>
            </div>
          )}

          {past.length > 0 && (
            <div className="pt-6">
              <button onClick={() => setShowPast(!showPast)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
                {showPast ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {showPast ? "Hide" : "Show"} Past Events ({past.length})
              </button>
              {showPast && (
                <div className="space-y-3 mt-3">
                  {past.map((event) => <EventCard key={event.id} event={event} isPast />)}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe */}
      <section className="bg-card border-t border-border py-10">
        <div className="container max-w-md text-center">
          <h2 className="text-lg font-bold text-primary mb-2">Want to be notified about future events?</h2>
          <p className="text-muted-foreground text-xs mb-5">Enter your email and we'll let you know when new events are announced.</p>
          {subscribed ? (
            <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-5 text-center">
              <p className="font-semibold text-primary text-sm">You're subscribed! We'll notify you about upcoming events.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <FormError message={rateLimitMsg} />
              <div className="flex gap-2">
                <Input type="email" placeholder="Your email address" value={subEmail} onChange={(e) => setSubEmail(e.target.value)} className="flex-1 rounded-lg h-10 border-border focus-visible:ring-secondary" disabled={subscribing} maxLength={FIELD_LIMITS.email} />
                <Button type="submit" size="sm" className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shrink-0 px-5" disabled={subscribing || !subConsent || isBlocked}>
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
    </div>
  );
};

export default Events;
