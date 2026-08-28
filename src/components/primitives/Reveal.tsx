"use client";

import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  y?: number;
  duration?: number;
};

/**
 * Scroll-reveal as progressive enhancement. Content is fully visible by
 * default (and for no-JS / reduced-motion / old browsers). Only when
 * IntersectionObserver is available do we hide it, then reveal on scroll
 * with a native CSS transition — no GSAP, no ScrollTrigger, no way for
 * content to get stuck invisible.
 */
export function Reveal({
  children,
  as = "div",
  className,
  style,
  delay = 0,
  y = 28,
  duration = 0.9,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const Comp = as as ElementType;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (typeof IntersectionObserver === "undefined") return;

    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.willChange = "transform, opacity";
    el.style.transition = `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${
      delay ? `${delay}s` : "0s"
    }, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${
      delay ? `${delay}s` : "0s"
    }`;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          });
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [y, duration, delay]);

  return (
    <Comp ref={ref} className={className} style={style}>
      {children}
    </Comp>
  );
}
