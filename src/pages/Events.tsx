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
import { MapPin, ChevronDown, ChevronUp, Loader2, Sparkles, Users, Mic2, BookOpen, FileSearch, ArrowRight } from "lucide-react";
import { MovingBorderButton } from "@/components/ui/MovingBorder";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format, isBefore, startOfDay } from "date-fns";
import { motion } from "framer-motion";
import { sanitize, FIELD_LIMITS } from "@/lib/sanitize";
import { useFormProtection } from "@/hooks/useFormProtection";
import { createNotification } from "@/lib/notifications";

const stats = [
  { value: "3+", label: "Events This Season" },
  { value: "5+", label: "Countries" },
  { value: "50+", label: "University Reps" },
  { value: "Free", label: "Always" },
];

const whatToExpect = [
  {
    icon: Users,
    title: "Meet University Representatives",
    desc: "Speak directly with admissions teams from our partner universities. Get honest answers about entry requirements, programmes, and what life is really like on campus.",
  },
  {
    icon: Mic2,
    title: "Expert Panels & Talks",
    desc: "Hear from certified counsellors, visa specialists, and recent graduates on everything from choosing a course to navigating the application process.",
  },
  {
    icon: BookOpen,
    title: "1:1 Counselling Sessions",
    desc: "Book a private session with one of our certified counsellors at the event. Walk away with a clear shortlist and a next-step plan tailored to your profile.",
  },
  {
    icon: FileSearch,
    title: "Live Application Reviews",
    desc: "Bring your documents and get them reviewed on the spot. Our team will flag anything that needs attention before you submit.",
  },
];

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
        toast({ title: "You're on the list!", description: "We'll notify you when new events are announced." });
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
        className={`bg-card rounded-xl border border-border shadow-sm flex flex-col sm:flex-row items-stretch card-glow ${isPast ? "opacity-50" : "hover:shadow-md transition-shadow"}`}
      >
        {/* Date badge */}
        <div
          className={`flex flex-col items-center justify-center px-5 py-4 sm:px-6 shrink-0 border-r border-border ${isPast ? "bg-muted" : ""}`}
          style={!isPast ? { borderColor: "hsl(169 63% 47%)", borderRightWidth: 2 } : {}}
        >
          <span className={`text-xs font-semibold uppercase ${isPast ? "text-muted-foreground" : "text-secondary"}`}>
            {format(eventDate, "MMM")}
          </span>
          <span className={`text-2xl font-bold leading-none ${isPast ? "text-muted-foreground" : "text-foreground"}`}>
            {format(eventDate, "dd")}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {format(eventDate, "yyyy")}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`text-base font-bold leading-snug ${isPast ? "text-muted-foreground" : "text-foreground"}`}>
                {event.title}
              </h3>
              {!isPast && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${isVirtual ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400" : "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400"}`}>
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
              <MovingBorderButton href={event.registration_url || "/book-a-consultation"} className="px-4 py-1.5 text-xs">
                Register →
              </MovingBorderButton>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://applyza.com" },
      { "@type": "ListItem", "position": 2, "name": "Events", "item": "https://applyza.com/events" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Study Abroad Events | Meet Universities & Get Expert Guidance | Applyza"
        description="Join Applyza events across the globe. Meet university representatives, attend expert panels, and get one-on-one guidance from certified counsellors — free to attend."
        path="/events"
        jsonLd={breadcrumbSchema}
      />
      <Navbar solid />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "#0a0d24" }}>
        <SparklesCore
          className="absolute inset-0 z-[1]"
          background="transparent"
          particleColor="#6B3FA0"
          particleDensity={60}
          minSize={0.4}
          maxSize={1.5}
          speed={1.5}
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, hsl(169 63% 47% / 0.4), transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, hsl(265 44% 44% / 0.3), transparent 70%)" }} />
        </div>

        <div className="container relative z-10 pt-24 pb-12">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white/60 text-sm">Events</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-5 mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "rgba(46,196,182,0.12)", border: "1px solid rgba(46,196,182,0.25)", color: "#2EC4B6" }}
          >
            <Sparkles size={11} />
            The Applyza Xperience — Free to Attend
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-3 max-w-2xl leading-tight"
          >
            Meet Universities, Get Expert Guidance — In Person
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-white/60 text-sm sm:text-base max-w-xl mb-6 leading-relaxed"
          >
            Join us at Applyza Xperience events across the globe. Speak directly with admissions teams, attend expert panels, and leave with a clear plan — all in one day, completely free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button variant="teal" size="sm" className="rounded-full" asChild>
              <a href="#upcoming">View Upcoming Events</a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-white/70 hover:text-white border border-white/15 hover:border-white/30"
              asChild
            >
              <Link to="/book-a-consultation">Can't Attend? Book Online <ArrowRight size={13} className="ml-1" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ background: "#0f1230" }}>
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
                <div className="text-xs text-white/50 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="bg-background">
        <div className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto border-l-4 border-secondary pl-6"
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Why Come In Person?</h2>
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">
              A lot of study abroad guidance happens online — and that's fine for research. But there are questions you can only really get answered face-to-face: What's the campus culture actually like? Will my profile get a fair look? Is this university the right fit for me?
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Our events bring university admissions teams to you. You get direct access, honest conversations, and the kind of clarity that takes months to piece together online — in a single afternoon.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

      {/* What to Expect */}
      <section className="bg-background">
        <div className="container py-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-2">What to Expect</h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-md mx-auto">
            Every Applyza Xperience event is a full day of structured sessions, open conversations, and personalised support.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {whatToExpect.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-all duration-300 card-glow text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="text-secondary" size={18} />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1.5">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(230 25% 90%), transparent)" }} />

      {/* Events List */}
      <section id="upcoming" className="bg-background py-10 flex-1">
        <div className="container max-w-3xl">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Upcoming Events</h2>

          <div className="space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-xl h-24 animate-pulse border border-border" />
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-sm">
                  Something went wrong. Please refresh or contact us at{" "}
                  <a href="mailto:info@applyza.com" className="text-secondary underline">info@applyza.com</a>.
                </p>
              </div>
            ) : upcoming.length > 0 ? (
              upcoming.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <p className="text-foreground font-semibold mb-1">No upcoming events right now</p>
                <p className="text-muted-foreground text-sm mb-5 max-w-sm mx-auto">
                  New dates are announced regularly. Subscribe below to be the first to know, or follow us on social media.
                </p>
                <div className="flex justify-center gap-4">
                  {["Instagram", "TikTok", "LinkedIn"].map((s) => (
                    <a
                      key={s}
                      href={`https://${s.toLowerCase()}.com/applyzahq`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-secondary hover:underline"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {past.length > 0 && (
              <div className="pt-4">
                <button
                  onClick={() => setShowPast(!showPast)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
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
        </div>
      </section>

      {/* Subscribe */}
      <section style={{ background: "#0f1230" }} className="py-12">
        <div className="container max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(46,196,182,0.12)", border: "1px solid rgba(46,196,182,0.25)", color: "#2EC4B6" }}
            >
              Stay in the Loop
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Get Notified About New Events</h2>
            <p className="text-white/50 text-sm mb-6">
              We'll email you when new event dates are confirmed. No spam — just event announcements.
            </p>
            {subscribed ? (
              <div
                className="rounded-xl p-5 text-center"
                style={{ background: "rgba(46,196,182,0.1)", border: "1px solid rgba(46,196,182,0.25)" }}
              >
                <p className="font-semibold text-white text-sm">You're on the list! We'll be in touch when new dates are confirmed.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <FormError message={rateLimitMsg} />
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    className="flex-1 rounded-lg h-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-secondary"
                    disabled={subscribing}
                    maxLength={FIELD_LIMITS.email}
                  />
                  <MovingBorderButton
                    type="submit"
                    className="px-5 py-2 text-sm shrink-0"
                    disabled={subscribing || !subConsent || isBlocked}
                  >
                    {subscribing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Notify Me"}
                  </MovingBorderButton>
                </div>
                <ConsentCheckbox
                  checked={subConsent}
                  onCheckedChange={setSubConsent}
                  label="I consent to receiving event updates from Applyza. Privacy Policy."
                />
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
