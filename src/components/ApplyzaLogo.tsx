const ApplyzaLogo = ({
  height = 40,
  className = "",
  variant = "dark",
}: {
  height?: number;
  className?: string;
  variant?: "dark" | "light";
}) => {
  const textColor = variant === "light" ? "#FFFFFF" : "#1B2150";
  const scale = height / 50;

  return (
    <svg
      width={height * 3.5}
      height={height}
      viewBox="0 0 175 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Applyza"
    >
      {/* === "A" Icon Mark === */}
      {/* Left leg - purple, thick rounded bar angled ~25° from bottom-left to top-center */}
      <path
        d="M10.5 43 C8 43 6 41 6.5 38.5 L17 10 C18 7 20 5.5 22.5 5.5 C25 5.5 26 7 25.5 9.5 L15 38 C14.2 41 12.5 43 10.5 43Z"
        fill="url(#purpleGrad)"
      />
      {/* Right leg - teal, thick rounded bar angled ~-25° from top-center to bottom-right */}
      <path
        d="M31 43 C29 43 27.8 41 28.5 38 L39 9.5 C39.5 7 41 5.5 43.5 5.5 C46 5.5 47 7 46.5 9.5 L36 38.5 C35.2 41 33.5 43 31 43Z"
        fill="url(#tealGrad)"
      />
      {/* Overlap shadow at apex */}
      <path
        d="M22.5 5.5 C25 5.5 26 7 25.5 9.5 L23 17 L28.5 17 L31 9.5 C31.5 7 30 5.5 28 5.5Z"
        fill="#3A2878"
        opacity="0.6"
      />
      {/* Small navy dot at bottom between legs */}
      <circle cx="23" cy="44" r="3.2" fill="#1B2150" />
      {/* Small teal accent dot */}
      <circle cx="28" cy="40" r="2" fill="#2EC4B6" opacity="0.6" />

      {/* === "Applyza" text as paths for consistent rendering === */}
      {/* Using text element with web-safe fallback */}
      <text
        x="54"
        y="37"
        fontFamily="'Plus Jakarta Sans', 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif"
        fontSize="27"
        fontWeight="800"
        fill={textColor}
        letterSpacing="-0.5"
      >
        Applyza
      </text>

      <defs>
        <linearGradient id="purpleGrad" x1="10" y1="5" x2="10" y2="43">
          <stop offset="0%" stopColor="#7B4AAF" />
          <stop offset="100%" stopColor="#4A2B73" />
        </linearGradient>
        <linearGradient id="tealGrad" x1="37" y1="5" x2="37" y2="43">
          <stop offset="0%" stopColor="#45D9CA" />
          <stop offset="100%" stopColor="#2AB5A8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ApplyzaLogo;
