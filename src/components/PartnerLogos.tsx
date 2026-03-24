const logos = [
  "British Council",
  "European Commission",
  "Gov UK",
  "EAIE",
  "EURASHE",
];

const PartnerLogos = () => {
  // Double the array for seamless loop
  const doubled = [...logos, ...logos];

  return (
    <section className="relative border-t border-white/10">
      <div className="container py-12 md:py-20">
        <h2 className="text-lg md:text-xl font-bold text-white text-center mb-8">
          Recognised & Trusted By
        </h2>
      </div>

      <div className="relative overflow-hidden pb-12 md:pb-16">
        <div className="flex animate-marquee gap-12 w-max">
          {doubled.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="shrink-0 h-16 px-10 rounded-xl bg-white/5 flex items-center justify-center"
            >
              <span className="text-base font-bold text-white/60 whitespace-nowrap tracking-wide">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
