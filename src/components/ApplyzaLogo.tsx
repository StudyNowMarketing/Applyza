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
  // Aspect ratio of original logo roughly 3.6:1 (icon + text)
  const width = height * 3.6;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* === Icon: Stylized "A" === */}
      {/* Left leg - purple */}
      <rect
        x="4"
        y="8"
        width="12"
        height="38"
        rx="6"
        transform="rotate(-20 4 8)"
        fill="url(#purpleGrad)"
      />
      {/* Right leg - teal */}
      <rect
        x="22"
        y="4"
        width="12"
        height="38"
        rx="6"
        transform="rotate(20 28 4)"
        fill="url(#tealGrad)"
      />
      {/* Dark overlap area at apex */}
      <polygon points="22,6 26,6 24,12" fill="#3B2D6B" opacity="0.5" />
      {/* Small navy dot at bottom center */}
      <circle cx="22" cy="42" r="3" fill="#1B2150" />

      {/* === Text: "Applyza" === */}
      <text
        x="52"
        y="36"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="26"
        fontWeight="800"
        fill={textColor}
        letterSpacing="-0.5"
      >
        Applyza
      </text>

      {/* Gradients */}
      <defs>
        <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B3FA0" />
          <stop offset="100%" stopColor="#4A2B73" />
        </linearGradient>
        <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3DD4C4" />
          <stop offset="100%" stopColor="#2EC4B6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ApplyzaLogo;
