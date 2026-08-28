"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "./Reveal";

type Props = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  format?: "number" | "comma" | "scientific";
};

export function LiveNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className = "",
  format = "number",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() =>
    typeof window !== "undefined" && prefersReducedMotion()
      ? formatValue(value, decimals, format)
      : formatValue(0, decimals, format)
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: value,
      duration,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate: () => setDisplay(formatValue(obj.v, decimals, format)),
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, decimals, duration, format]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function formatValue(v: number, decimals: number, format: string) {
  const fixed = Number(v.toFixed(decimals));
  if (format === "comma") return fixed.toLocaleString("en-US");
  if (format === "scientific")
    return fixed.toLocaleString("en-US", {
      notation: "compact",
      maximumFractionDigits: decimals,
    });
  return fixed.toFixed(decimals);
}
