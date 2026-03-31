import { ShieldCheck } from "lucide-react";

const GenuineStudentBanner = () => (
  <div className="flex items-start gap-2.5 py-4">
    <ShieldCheck size={14} className="text-muted-foreground shrink-0 mt-0.5" />
    <p className="text-xs text-muted-foreground leading-relaxed">
      Applyza is committed to supporting genuine students with legitimate educational intent. We do not facilitate immigration without genuine educational purpose. We work only with accredited educational institutions and certified education professionals.
    </p>
  </div>
);

export default GenuineStudentBanner;
