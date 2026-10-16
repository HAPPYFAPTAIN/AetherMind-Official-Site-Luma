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
 * with a native CSS transition. Home sections replay on re-entry; reduced
 * motion changes restore content immediately and release compositor hints.
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
    if (typeof IntersectionObserver === "undefined") return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const replay = !!el.closest("[data-story-section]");
    let observer: IntersectionObserver | undefined;
    let resetObserver: IntersectionObserver | undefined;
    let frame = 0, releaseTimer = 0;
    const show = () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(releaseTimer);
      el.style.willChange = motion.matches ? "auto" : "transform, opacity";
      frame = requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
      releaseTimer = window.setTimeout(() => { el.style.willChange = "auto"; }, (duration + delay) * 1000 + 100);
    };
    const setup = () => {
      observer?.disconnect();
      resetObserver?.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(releaseTimer);
      if (motion.matches) {
        el.style.transition = "none";
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.willChange = "auto";
        return;
      }
      el.style.transition = `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`;
      const bounds = el.getBoundingClientRect();
      if (bounds.top >= window.innerHeight || bounds.bottom <= 0) {
        el.style.opacity = "0";
        el.style.transform = `translateY(${y}px)`;
      }
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          show();
          if (!replay) observer?.disconnect();
        }
      }, {threshold: .12, rootMargin: "0px 0px -8% 0px"});
      observer.observe(el);
      if (replay) {
        // Reset only after the block has fully left the screen. A separate
        // boundary avoids hiding visible text while preparing a return visit.
        resetObserver = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) return;
          cancelAnimationFrame(frame);
          window.clearTimeout(releaseTimer);
          el.style.opacity = "0";
          el.style.transform = `translateY(${y}px)`;
          el.style.willChange = "auto";
        }, {rootMargin: "120px 0px", threshold: 0});
        resetObserver.observe(el);
      }
    };
    setup();
    motion.addEventListener("change", setup);
    el.addEventListener("focusin", show);
    return () => {
      observer?.disconnect();
      resetObserver?.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(releaseTimer);
      motion.removeEventListener("change", setup);
      el.removeEventListener("focusin", show);
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.willChange = "auto";
    };
  }, [y, duration, delay]);

  return (
    <Comp ref={ref} className={className} style={style}>
      {children}
    </Comp>
  );
}
