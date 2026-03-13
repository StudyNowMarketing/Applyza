import { Check } from "lucide-react";

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const OptionButton = ({ selected, onClick, children, className = "" }: OptionButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${
      selected
        ? "border-secondary bg-secondary/5 text-foreground"
        : "border-muted bg-background text-muted-foreground hover:border-border"
    } ${className}`}
  >
    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
      selected ? "border-secondary bg-secondary" : "border-muted-foreground/30"
    }`}>
      {selected && <Check size={12} className="text-white" />}
    </span>
    {children}
  </button>
);

export default OptionButton;
