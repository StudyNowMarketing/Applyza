interface WaveDividerProps {
  from: string;
  to: string;
  variant?: "A" | "B" | "C";
  flip?: boolean;
}

const paths = {
  A: "M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z",
  B: "M0,20 C480,80 960,0 1440,50 L1440,80 L0,80 Z",
  C: "M0,50 C240,20 480,60 720,30 C960,0 1200,40 1440,20 L1440,80 L0,80 Z",
};

const WaveDivider = ({ from, to, variant = "A", flip = false }: WaveDividerProps) => (
  <div
    className="relative w-full overflow-hidden"
    style={{
      marginTop: "-1px",
      zIndex: 1,
      backgroundColor: from,
      transform: flip ? "scaleY(-1)" : undefined,
    }}
  >
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="block w-full h-[50px] md:h-[80px]"
    >
      <path d={paths[variant]} fill={to} />
    </svg>
  </div>
);

export default WaveDivider;
