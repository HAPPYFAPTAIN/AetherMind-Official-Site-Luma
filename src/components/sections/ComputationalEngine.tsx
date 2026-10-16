"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/i18n";

const METRICS = [
  { value: "128", label: { en: "GPUs orchestrated per job", zh: "单个任务可调度的 GPU" } },
  { value: "2.4M", label: { en: "atoms tracked in real time", zh: "实时追踪的原子数量" } },
  { value: "99.9%", label: { en: "scheduler uptime", zh: "调度器可用性" } },
];

function fmt(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

// A stable illustrative curve is also visible without animation or JavaScript.
const SPARKLINE_PATH = `M ${Array.from({length: 48}, (_, i) =>
  `${i / 47 * 100},${30 + Math.sin(i / 3.2) * 12 + Math.sin(i * 2.17) * 4}`,
).join(" L ")}`;

function Sparkline() {
  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-16 w-full" aria-hidden="true">
      <path data-story-draw pathLength={1} d={SPARKLINE_PATH} fill="none" stroke="var(--accent)" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

export function ComputationalEngine() {
  const { language } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1248212);
  const [temp, setTemp] = useState(300.02);
  const [util, setUtil] = useState(78.4);

  useEffect(() => {
    const section = contentRef.current?.closest("section");
    if (!section || typeof IntersectionObserver === "undefined") return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let timer: number | undefined;
    let last = performance.now();

    const tick = () => {
      const now = performance.now();
      const dt = Math.min(0.5, (now - last) / 1000);
      last = now;
      setStep((s) => s + Math.floor(dt * 4000 + Math.random() * 60));
      setTemp(300.02 + Math.sin(now / 900) * 0.6 + (Math.random() - 0.5) * 0.1);
      setUtil(78 + Math.sin(now / 1400) * 6 + (Math.random() - 0.5) * 2);
    };

    const syncTimer = () => {
      if (!inView || document.hidden || motion.matches) {
        window.clearInterval(timer);
        timer = undefined;
      } else if (timer === undefined) {
        last = performance.now();
        timer = window.setInterval(tick, 250);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncTimer();
    });
    observer.observe(section);
    document.addEventListener("visibilitychange", syncTimer);
    motion.addEventListener("change", syncTimer);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncTimer);
      motion.removeEventListener("change", syncTimer);
    };
  }, []);

  return (
    <Section id="engine" className="py-32 md:py-44">
      <div ref={contentRef} className="relative grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <div className="mono-label mb-8 flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-accent/60" />
              {tr(language, "Computational Engine", "计算引擎")}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display zh-heading text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
              {language === "zh" ? (
                <>
                  <span className="block">不只是概念</span>
                  <span className="block">而是真正在计算</span>
                </>
              ) : (
                <>
                  Not a concept
                  <br />
                  It actually computes
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="zh-copy mt-8 max-w-md text-base leading-relaxed text-text-tertiary sm:text-lg">
              {tr(
                language,
                "A production simulation engine running LAMMPS and native kernels on GPU and HPC — orchestrated, monitored, and reproducible from a single environment.",
                "生产级模拟引擎可在 GPU 和 HPC\u00a0集群上运行 LAMMPS 及原生计算内核，并在统一环境中完成任务编排、运行监控和结果复现。",
              )}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul data-story-stagger className="mt-10 space-y-4">
              {METRICS.map(({ value, label }) => (
                <li key={value} className="flex items-baseline gap-4 border-b border-line pb-4">
                  <span className="font-display w-20 text-2xl font-semibold text-white">{value}</span>
                  <span className="zh-copy whitespace-nowrap text-[14px] text-text-tertiary">
                    {tr(language, label.en, label.zh)}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* instrument panel */}
        <Reveal delay={0.1} y={40}>
          <div data-story-panel className="glass relative rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line pb-5">
              <div className="flex items-center gap-3">
                <span className="inline-block h-2 w-2 rounded-full bg-accent-green shadow-[0_0_10px_var(--accent-green)]" />
                <span className="font-mono text-[12px] tracking-[0.16em] text-text-primary">
                  {tr(language, "LAMMPS · RUNNING", "LAMMPS · 运行中")}
                </span>
              </div>
              <span className="font-mono text-[11px] tracking-[0.12em] text-text-faint">
                {tr(language, "job #1842-77", "任务 #1842-77")}
              </span>
            </div>

            <div data-story-stagger className="grid grid-cols-2 gap-x-8 gap-y-7 py-7">
              <div>
                <div className="mono-label mb-2">{tr(language, "Atoms", "原子数")}</div>
                <div className="font-mono text-2xl font-medium text-white sm:text-3xl">
                  2,048,000
                </div>
              </div>
              <div>
                <div className="mono-label mb-2">{tr(language, "Temperature", "温度")}</div>
                <div className="font-mono text-2xl font-medium text-white sm:text-3xl">
                  {temp.toFixed(2)} <span className="text-sm text-text-tertiary">K</span>
                </div>
              </div>
              <div>
                <div className="mono-label mb-2">{tr(language, "Step", "步数")}</div>
                <div className="font-mono text-2xl font-medium text-white sm:text-3xl">
                  {fmt(step)}
                </div>
              </div>
              <div>
                <div className="mono-label mb-2">{tr(language, "GPUs", "GPU 数量")}</div>
                <div className="font-mono text-2xl font-medium text-white sm:text-3xl">128</div>
              </div>
            </div>

            <div className="border-t border-line pt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="mono-label">{tr(language, "Throughput", "计算吞吐")}</span>
                <span className="font-mono text-[12px] text-accent">
                  {util.toFixed(1)}% {tr(language, "load", "负载")}
                </span>
              </div>
              <Sparkline />
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 rounded-t-2xl bg-gradient-to-b from-white/[0.04] to-transparent" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
