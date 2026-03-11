import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message: string | null;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="flex items-start gap-2 bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive">
      <AlertCircle className="shrink-0 mt-0.5" size={16} />
      <span>{message}</span>
    </div>
  );
};

export default FormError;
