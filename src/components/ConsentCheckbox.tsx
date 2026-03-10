import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

interface ConsentCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}

const ConsentCheckbox = ({ checked, onCheckedChange, label }: ConsentCheckboxProps) => {
  // Split the label on "Privacy Policy" to make that part a link
  const parts = label.split("Privacy Policy");

  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <Checkbox
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
        className="mt-0.5"
      />
      <span className="text-sm text-muted-foreground leading-relaxed">
        {parts.length > 1 ? (
          <>
            {parts[0]}
            <Link
              to="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline hover:no-underline"
              onClick={(e) => e.stopPropagation()}
            >
              Privacy Policy
            </Link>
            {parts[1]}
          </>
        ) : (
          label
        )}
      </span>
    </label>
  );
};

export default ConsentCheckbox;
