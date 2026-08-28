"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./Reveal";

type Props = {
  className?: string;
  density?: number; // particles per 1000px^2
  maxSpeed?: number;
  accent?: string;
  interactive?: boolean;
};

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  tw: number;
};

/**
 * Code-generated ambient particle field. Drifts slowly, responds lightly to the
 * pointer, and gives the "living system" feel without any static imagery.
 */
export function ParticleField({
  className = "",
  density = 6,
  maxSpeed = 0.12,
  accent = "143,211,255",
  interactive = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (prefersReducedMotion()) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let raf = 0;
    let running = true;
    let animating = false;
    let w = 0;
    let h = 0;
    let particles: P[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width ?? window.innerWidth;
      h = rect?.height ?? window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        220,
        Math.floor((w * h) / 1000) * (density / 6)
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * maxSpeed,
        vy: (Math.random() - 0.5) * maxSpeed,
        r: 0.4 + Math.random() * 1.3,
        a: 0.1 + Math.random() * 0.5,
        tw: 0.5 + Math.random() * 2,
      }));
    };

    const step = (t: number) => {
      if (!running) {
        animating = false;
        return;
      }
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      for (const p of particles) {
        const ox = pointer.active ? pointer.x * 0.06 * (p.r / 1.7) : 0;
        const oy = pointer.active ? pointer.y * 0.06 * (p.r / 1.7) : 0;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const twinkle = 0.6 + 0.4 * Math.sin((t / 1000) * p.tw + p.x);
        ctx.beginPath();
        ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent},${p.a * twinkle})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (!animating) {
        animating = true;
        raf = requestAnimationFrame(step);
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left - w / 2;
      pointer.ty = e.clientY - rect.top - h / 2;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.tx = 0;
      pointer.ty = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) {
          start();
        } else {
          cancelAnimationFrame(raf);
          animating = false;
        }
      },
      { rootMargin: "100px" }
    );

    resize();
    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("resize", resize);
    io.observe(canvas);
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      if (interactive) {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerleave", onLeave);
      }
    };
  }, [density, maxSpeed, accent, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
