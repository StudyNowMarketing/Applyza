import { type ReactNode } from "react";

/**
 * Lightweight section wrapper. Animation is handled by ScrollAnimator
 * on individual child elements, so this just passes through.
 */
const SectionReveal = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default SectionReveal;
