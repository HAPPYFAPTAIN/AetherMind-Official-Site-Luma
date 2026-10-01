"use client";

import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { EdgeFadeVisual } from "@/components/primitives/EdgeFadeVisual";
import { ScienceScene } from "@/components/primitives/ScienceScene";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/i18n";
import { assetUrl } from "@/lib/asset-url";

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
              src={assetUrl("/images/g01/g01-03-lammps-millions-atoms.full.webp")}
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
              <ScienceScene mode="simulation" className="absolute inset-0" />
              <div className="pointer-events-none absolute left-5 top-5 z-10 flex items-center gap-2">
                <span className="mono-label whitespace-nowrap">
                  {tr(language, "Structural evolution", "结构演化示意")}
                </span>
              </div>
              <div className="pointer-events-none absolute right-5 top-5 z-10 font-mono text-[11px] tracking-[0.12em] text-accent">
                ⟨Δr²⟩ = 6Dt
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
