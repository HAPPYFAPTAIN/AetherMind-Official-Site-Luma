import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  compact?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  compact = false,
}: Props) {
  return (
    <div
      className={`${
        align === "center" ? "text-center" : "text-left"
      } ${className}`}
    >
      {eyebrow && (
        <Reveal y={16}>
          <div
            className={`mono-label mb-5 flex items-center gap-3 ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            <span className="inline-block h-px w-6 bg-accent/50" />
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={`font-display font-semibold text-white ${
            compact
              ? "text-[clamp(1.75rem,4vw,3rem)] leading-[1.05]"
              : "text-[clamp(2rem,5.5vw,4rem)] leading-[1.02]"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p
            className={`mt-6 max-w-xl text-base leading-relaxed text-text-tertiary sm:text-lg ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
