const ApplyzaLogo = ({ height = 40, className = "", variant = "dark" }: { height?: number; className?: string; variant?: "dark" | "light" }) => {
  const textColor = variant === "light" ? "#FFFFFF" : "#1B2150";
  const iconH = height;
  const iconW = iconH * 0.75;
  const textH = height * 0.45;
  const totalW = iconW + textH * 4.2;

  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={totalW}
      className={className}
      aria-label="Applyza"
    >
      {/* Left bar — purple gradient */}
      <defs>
        <linearGradient id="purpleGrad" x1="0" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#6B3FA0" />
          <stop offset="100%" stopColor="#8B5FC0" />
        </linearGradient>
      </defs>
      <path
        d="M18 52 L32 8 L38 8 L24 52 Z"
        fill="url(#purpleGrad)"
        rx="4"
      />
      {/* Right bar — teal */}
      <path
        d="M30 8 L36 8 L50 52 L44 52 Z"
        fill="#2EC4B6"
      />
      {/* Dark navy dot — bottom center */}
      <circle cx="34" cy="50" r="3.5" fill="#1B2150" />
      {/* Small teal dot — upper right */}
      <circle cx="40" cy="16" r="2.5" fill="#2EC4B6" />

      {/* "Applyza" text */}
      <text
        x="62"
        y="40"
        fill="#1B2150"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="800"
        fontSize="28"
        letterSpacing="-0.5"
      >
        Applyza
      </text>
    </svg>
  );
};

export default ApplyzaLogo;
