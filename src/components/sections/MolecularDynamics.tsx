"use client";

import { useLayoutEffect, useRef } from "react";
import { Section } from "@/components/primitives/Section";
import { Reveal, prefersReducedMotion } from "@/components/primitives/Reveal";
import { EdgeFadeVisual } from "@/components/primitives/EdgeFadeVisual";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/i18n";

function Trajectory() {
  const ref = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const path = svg.querySelector("path");
    if (!path) return;

    // brownian-like random walk path
    let x = 6;
    let y = 50;
    const pts = [`${x},${y}`];
    for (let i = 0; i < 90; i++) {
      x += 0.4 + Math.random() * 1.1;
      y += (Math.random() - 0.5) * 22;
      y = Math.max(8, Math.min(92, y));
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    const d = `M ${pts.join(" L ")}`;
    path.setAttribute("d", d);
    const len = path.getTotalLength();

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      path.style.strokeDasharray = `${len}`;
      return;
    }

    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          path.style.transition = "stroke-dashoffset 2.2s linear";
          path.style.strokeDashoffset = "0";
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <path
        fill="none"
        stroke="var(--accent)"
        strokeWidth="0.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="6" cy="50" r="1" fill="var(--accent)" opacity="0.4" />
    </svg>
  );
}

const PARAMS = [
  { label: { en: "Timestep", zh: "时间步长" }, value: { en: "2.0 fs", zh: "2.0 fs" } },
  { label: { en: "Ensemble", zh: "系综" }, value: { en: "NVT / NPT", zh: "NVT / NPT" } },
  { label: { en: "Force field", zh: "力场" }, value: { en: "ML + classical", zh: "机器学习 + 经典" } },
  { label: { en: "Scale", zh: "模拟尺度" }, value: { en: "µs · 10⁸ atoms", zh: "µs · 10⁸ 原子" } },
];

export function MolecularDynamics() {
  const { language } = useLanguage();

  return (
    <Section id="simulation" className="py-32 md:py-44">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <EdgeFadeVisual variant="section" className="absolute inset-0">
          <div className="absolute inset-[-6%] opacity-40">
            <img
              src="/images/g01/g01-03-lammps-millions-atoms.full.webp"
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </EdgeFadeVisual>
      </div>

      <div className="relative grid items-end gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <div className="mono-label mb-8 flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-accent/60" />
              {tr(language, "Molecular Dynamics · LAMMPS", "分子动力学 · LAMMPS")}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display zh-heading text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
              {language === "zh" ? (
                <>
                  <span className="block">从飞秒到微秒</span>
                  <span className="block">逐个原子看清演化</span>
                </>
              ) : (
                <>
                  Atom by atom
                  <br />
                  From femtoseconds to microseconds
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="zh-copy mt-8 max-w-lg text-base leading-relaxed text-text-tertiary sm:text-lg">
              {tr(
                language,
                "Native LAMMPS workflows with GPU acceleration, reactive and machine-learned force fields, and live trajectory analysis — built for the people who care about what happens between step zero and step one billion.",
                "原生 LAMMPS\u00a0工作流支持 GPU\u00a0加速、反应力场和机器学习力场，并实时分析运动轨迹。无论是第 0 步还是第 10 亿步，关键变化都不会错过。",
              )}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {PARAMS.map(({ label, value }) => (
                <div key={label.en} className="bg-bg-1/80 p-5 backdrop-blur">
                  <div className="mono-label mb-2 whitespace-nowrap text-text-faint">
                    {tr(language, label.en, label.zh)}
                  </div>
                  <div className="font-mono whitespace-nowrap text-[15px] text-white">
                    {tr(language, value.en, value.zh)}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={0.1} y={40}>
            <div className="glass relative aspect-[16/10] overflow-hidden rounded-2xl">
              <div className="absolute inset-0 opacity-90">
                <SceneImageLazy language={language} />
              </div>
              <div className="absolute inset-0 grid-overlay opacity-20" />
              {/* trajectory overlay */}
              <div className="absolute inset-x-6 bottom-4 h-1/3 opacity-80">
                <Trajectory />
              </div>
              <div className="absolute left-5 top-5 flex items-center gap-2">
                <span className="mono-label whitespace-nowrap">
                  {tr(language, "trajectory · 400 ns", "轨迹 · 400 ns")}
                </span>
              </div>
              <div className="absolute right-5 top-5 font-mono text-[11px] tracking-[0.12em] text-accent">
                ⟨Δr²⟩ = 6Dt
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function SceneImageLazy({ language }: { language: "en" | "zh" }) {
  return (
    <img
      src="/images/g01/g01-02-molecular-dynamics.md.webp"
      alt={tr(language, "Molecular dynamics trajectory visualization", "分子动力学轨迹可视化")}
      className="h-full w-full object-cover"
      loading="lazy"
    />
  );
}
