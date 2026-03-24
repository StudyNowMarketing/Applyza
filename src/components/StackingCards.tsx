import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  Shield,
  Search,
  Plane,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface StackCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  cta: string;
  ctaLink: string;
  accent: string;
}

const CARDS: StackCard[] = [
  {
    title: "University Applications",
    description:
      "Finding the right university shouldn't feel like guesswork. We match you with programmes that fit your academic profile, career goals, and budget — then manage every detail of your application from start to finish.",
    icon: <GraduationCap className="w-8 h-8" />,
    image: "/glass-university.png",
    cta: "Learn More",
    ctaLink: "/services",
    accent: "from-teal-500/20 to-cyan-500/20",
  },
  {
    title: "Visa & Immigration",
    description:
      "Our 99% visa success rate speaks for itself. We guide you through every step of the visa process with expert document preparation, mock interviews, and dedicated support until you receive your approval.",
    icon: <Shield className="w-8 h-8" />,
    image: "/glass-passport.png",
    cta: "Learn More",
    ctaLink: "/services",
    accent: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "AI-Powered Course Matching",
    description:
      "Our smart search engine analyses your qualifications, interests, and budget to recommend courses where you have the best chance of acceptance. No more guesswork.",
    icon: <Search className="w-8 h-8" />,
    image: "/glass-globe.png",
    cta: "Find My Course",
    ctaLink: "/find-a-course",
    accent: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "Your Journey Starts Here",
    description:
      "From accommodation support to pre-departure briefings, we're with you every step of the way. Book a free consultation and let our expert counsellors map out your study abroad journey.",
    icon: <Plane className="w-8 h-8" />,
    image: "/glass-airplane.png",
    cta: "Book Consultation",
    ctaLink: "/book-a-consultation",
    accent: "from-purple-500/20 to-indigo-500/20",
  },
];

/**
 * CSS Sticky Stacking Cards
 *
 * How it works:
 * - Each card has `position: sticky; top: Xpx` with increasing top values
 * - As you scroll, each card "sticks" to the top of the viewport
 * - The next card scrolls up and covers the previous one
 * - GSAP adds scale-down + dim effects to cards as they get covered
 *
 * This is the most reliable stacking card approach — no pin conflicts.
 */
const StackingCards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, i) => {
      // Each card except the last gets a scale-down + dim effect
      // as the next card scrolls over it
      if (i < cards.length - 1) {
        const st = ScrollTrigger.create({
          trigger: card,
          start: "top 80px",
          // End when the NEXT card reaches its sticky position
          end: () => {
            const nextCard = cards[i + 1];
            if (!nextCard) return "+=500";
            // Distance = next card's offsetTop - current card's offsetTop
            const distance = nextCard.offsetTop - card.offsetTop;
            return `+=${distance}`;
          },
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            // Scale down from 1 to 0.92
            const scale = 1 - p * 0.08;
            // Dim from 1 to 0.4
            const brightness = 1 - p * 0.6;
            // Round corners more as it recedes
            const innerCard = card.querySelector(".stack-card-inner") as HTMLElement;
            if (innerCard) {
              innerCard.style.transform = `scale(${scale})`;
              innerCard.style.filter = `brightness(${brightness})`;
            }
          },
        });
        triggers.push(st);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section data-pinned ref={sectionRef} className="relative py-20">
      {/* Section header */}
      <div className="container text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 mb-6">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-secondary text-sm font-medium">
            Our Services
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-secondary to-cyan-400 bg-clip-text text-transparent">
            Study Abroad
          </span>
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto text-lg">
          From course selection to visa approval — expert guidance at every
          stage of your journey.
        </p>
      </div>

      {/* Sticky stacking cards */}
      <div className="relative">
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="sticky"
            style={{
              // Each card sticks a bit lower so they peek behind each other
              top: `${80 + i * 20}px`,
              // Cards need padding-bottom so there's scroll room for the next card
              paddingBottom: i < CARDS.length - 1 ? "40px" : "0px",
            }}
          >
            <div className="container max-w-6xl mx-auto px-4">
              <div
                className="stack-card-inner rounded-3xl overflow-hidden border border-white/10 transition-transform duration-100"
                style={{
                  background: "rgba(6, 15, 40, 0.92)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  transformOrigin: "center top",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left — Image */}
                  <div
                    className={`relative p-8 lg:p-16 flex items-center justify-center bg-gradient-to-br ${card.accent} min-h-[280px] lg:min-h-[380px]`}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-48 h-48 lg:w-64 lg:h-64 object-contain"
                      style={{
                        filter:
                          "drop-shadow(0 0 50px rgba(46,196,182,0.35))",
                      }}
                      draggable={false}
                    />
                    {/* Step number badge */}
                    <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 text-sm font-bold backdrop-blur-sm">
                      {i + 1}
                    </div>
                  </div>

                  {/* Right — Content */}
                  <div className="p-8 lg:p-14 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
                        {card.icon}
                      </div>
                      <span className="text-white/40 text-sm font-medium uppercase tracking-wider">
                        Step {i + 1} of {CARDS.length}
                      </span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                      {card.title}
                    </h3>

                    <p className="text-white/60 text-base lg:text-lg leading-relaxed mb-8">
                      {card.description}
                    </p>

                    <a
                      href={card.ctaLink}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-secondary text-white font-medium hover:bg-secondary/90 transition-all duration-300 w-fit text-base"
                    >
                      {card.cta}
                      <span className="text-lg">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StackingCards;
