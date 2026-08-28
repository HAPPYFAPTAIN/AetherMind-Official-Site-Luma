import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "hero" | "section" | "cta";
  style?: CSSProperties;
};

export function EdgeFadeVisual({
  children,
  className = "",
  variant = "section",
  style,
}: Props) {
  return (
    <div
      className={`science-visual science-visual--${variant} ${className}`}
      style={style}
    >
      <div className="science-visual__masked">{children}</div>
      <div className="science-visual__edge-blend" aria-hidden />
    </div>
  );
}
