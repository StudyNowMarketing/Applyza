import { Link } from "react-router-dom";
import { Sparkles, Search, FileWarning, ShieldQuestion, Hourglass, RotateCcw, ArrowRight, Undo2 } from "lucide-react";
import WordByWord from "@/components/WordByWord";
import { InfiniteSlider } from "@/components/ui/InfiniteSlider";
import { MovingBorderButton } from "@/components/ui/MovingBorder";
import { useIsMobile } from "@/hooks/use-mobile";

const steps = [
  { icon: Sparkles, text: "You dream of studying abroad", border: "hsl(var(--secondary))", num: "01" },
  { icon: Search, text: "You start researching but get overwhelmed", border: "hsl(270 60% 55%)", num: "02" },
  { icon: FileWarning, text: "Visa rules, fees, deadlines — it's a maze", border: "hsl(30 90% 55%)", num: "03" },
  { icon: ShieldQuestion, text: "You don't know who to trust", border: "hsl(0 70% 55%)", num: "04" },
  { icon: Hourglass, text: "Time passes and your dream feels further away", border: "hsl(var(--muted-foreground))", num: "05" },
  { icon: RotateCcw, text: "Rinse and repeat...", border: "hsl(var(--foreground))", num: "06" },
];

const StepCard = ({ step, mobile }: { step: typeof steps[0]; mobile?: boolean }) => {
  const Icon = step.icon;
  const w = mobile ? 220 : 260;
  return (
    <div
      className="bg-background rounded-xl shadow-sm flex items-center gap-4 px-5 py-4 shrink-0"
      style={{ width: w, height: 120, borderLeft: `3px solid ${step.border}` }}
    >
      <Icon size={24} className="text-foreground shrink-0" />
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-xs text-muted-foreground font-medium">{step.num}</span>
        <p className="text-[15px] font-medium text-foreground leading-snug">{step.text}</p>
      </div>
    </div>
  );
};

const Arrow = () => (
  <span className="text-muted-foreground/50 text-lg shrink-0 flex items-center">→</span>
);

const EmpathyLoop = () => {
  const isMobile = useIsMobile();

  return (
    <section className="bg-background py-10 md:py-14">
      <div className="container">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center leading-tight mb-8 text-foreground">
          <WordByWord text="Do You Feel Stuck in a Loop?" underlineWord="Stuck" />
        </h2>
      </div>

      {/* Infinite scrolling strip */}
      <InfiniteSlider gap={16} duration={25} durationOnHover={80} direction="horizontal">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-4 shrink-0">
            <StepCard step={step} mobile={isMobile} />
            <Arrow />
          </div>
        ))}
      </InfiniteSlider>

      {/* Loop-back indicator */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center gap-2 text-muted-foreground/40">
          <div className="w-20 border-t-2 border-dashed border-muted-foreground/20" />
          <Undo2 size={16} />
          <div className="w-20 border-t-2 border-dashed border-muted-foreground/20" />
        </div>
      </div>

      {/* Punchline */}
      <div className="container text-center mt-6 max-w-xl mx-auto">
        <p className="text-sm md:text-base text-muted-foreground">
          Sound familiar? You're not alone. Thousands of students feel exactly the same way.
        </p>
        <p className="text-base md:text-lg font-bold mt-2 text-foreground">
          That's exactly why we built Applyza.
        </p>
        <div className="mt-5 flex justify-center">
          <MovingBorderButton to="/book-a-consultation" duration={3000}>
            Break the Loop <ArrowRight size={16} className="ml-1" />
          </MovingBorderButton>
        </div>
      </div>
    </section>
  );
};

export default EmpathyLoop;
