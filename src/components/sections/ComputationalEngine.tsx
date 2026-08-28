"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/primitives/Section";
import { Reveal, prefersReducedMotion } from "@/components/primitives/Reveal";
import { EdgeFadeVisual } from "@/components/primitives/EdgeFadeVisual";
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

function Sparkline() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg || prefersReducedMotion()) return;
    const path = svg.querySelector("path");
    const points = Array.from({ length: 48 }, (_, i) => {
      const x = (i / 47) * 100;
      const y = 30 + Math.sin(i / 3.2) * 12 + Math.random() * 10;
      return `${x},${y}`;
    });
    const d = `M ${points.join(" L ")}`;
    if (path) path.setAttribute("d", d);
    const len = path?.getTotalLength() ?? 0;
    if (path) {
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      path.getBoundingClientRect();
      path.style.transition = "stroke-dashoffset 2.4s ease-out";
      path.style.strokeDashoffset = "0";
    }
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 100 60" preserveAspectRatio="none" className="h-16 w-full">
      <path fill="none" stroke="var(--accent)" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

export function ComputationalEngine() {
  const { language } = useLanguage();
  const [step, setStep] = useState(1248212);
  const [temp, setTemp] = useState(300.02);
  const [util, setUtil] = useState(78.4);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      setStep((s) => s + Math.floor(dt * 4000 + Math.random() * 60));
      setTemp(300.02 + Math.sin(now / 900) * 0.6 + (Math.random() - 0.5) * 0.1);
      setUtil(78 + Math.sin(now / 1400) * 6 + (Math.random() - 0.5) * 2);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Section id="engine" className="py-32 md:py-44">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <EdgeFadeVisual variant="section" className="absolute inset-0">
          <div className="absolute inset-[-6%] opacity-[0.35]">
            <img
              src="/images/g01/g01-08-computational-engine.md.webp"
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </EdgeFadeVisual>
      </div>

      <div className="relative grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
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
            <ul className="mt-10 space-y-4">
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
          <div className="glass relative rounded-2xl p-6 sm:p-8">
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

            <div className="grid grid-cols-2 gap-x-8 gap-y-7 py-7">
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
