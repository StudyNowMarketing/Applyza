import { Shield } from "lucide-react";

const accreditations = [
  { initials: "BC", name: "British Council", role: "Accredited Agent" },
  { initials: "EC", name: "European Commission", role: "Recognised Partner" },
  { initials: "UK", name: "GOV.UK", role: "Licensed Sponsor" },
  { initials: "EA", name: "EAIE", role: "Member Institution" },
  { initials: "EU", name: "EURASHE", role: "Associate Member" },
];

const PartnerLogos = () => {
  return (
    <section className="bg-white">
      <div className="border-t" style={{ borderColor: "hsl(230 25% 92%)" }} />
      <div className="container py-12 md:py-16">
        <div className="flex items-center justify-center gap-2 mb-10">
          <Shield size={14} className="text-muted-foreground/60" />
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
            Accredited & Recognized By
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {accreditations.map((a) => (
            <div key={a.initials} className="flex items-center gap-3 opacity-60 hover:opacity-90 transition-opacity">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "hsl(230 20% 93%)", color: "hsl(232 20% 50%)" }}>
                {a.initials}
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: "hsl(232 20% 40%)" }}>{a.name}</p>
                <p className="text-[10px]" style={{ color: "hsl(232 15% 60%)" }}>{a.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-b" style={{ borderColor: "hsl(230 25% 92%)" }} />
    </section>
  );
};

export default PartnerLogos;
