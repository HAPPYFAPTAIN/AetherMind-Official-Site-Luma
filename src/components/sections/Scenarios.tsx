"use client";

import { useState } from "react";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { ASSETS, type AssetKey } from "@/lib/assets";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/i18n";
import { assetUrl } from "@/lib/asset-url";

const SCENARIOS: { title: { en: string; zh: string }; tag: { en: string; zh: string }; id: AssetKey }[] = [
  { title: { en: "Materials Science", zh: "材料科学" }, tag: { en: "alloys · defects · interfaces", zh: "合金 · 缺陷 · 界面" }, id: "g01-04-materials-science" },
  { title: { en: "Computational Chemistry", zh: "计算化学" }, tag: { en: "reactions · spectroscopy", zh: "反应 · 光谱" }, id: "g01-05-computational-chemistry" },
  { title: { en: "Molecular Dynamics", zh: "分子动力学" }, tag: { en: "LAMMPS · trajectories", zh: "LAMMPS · 轨迹" }, id: "g01-02-molecular-dynamics" },
  { title: { en: "Nanotechnology", zh: "纳米技术" }, tag: { en: "2D materials · devices", zh: "二维材料 · 器件" }, id: "g02-04-layered-2d-material" },
  { title: { en: "Energy Materials", zh: "能源材料" }, tag: { en: "batteries · catalysts", zh: "电池 · 催化剂" }, id: "g01-07-energy-landscape" },
  { title: { en: "Physics", zh: "物理学" }, tag: { en: "electron density · fields", zh: "电子密度 · 场" }, id: "g02-05-electron-density-object" },
  { title: { en: "Drug Discovery", zh: "药物发现" }, tag: { en: "fragments · binding", zh: "分子片段 · 结合" }, id: "g02-07-molecular-fragments" },
  { title: { en: "Defects & Interfaces", zh: "缺陷与界面" }, tag: { en: "grain boundaries · strain", zh: "晶界 · 应变" }, id: "g02-06-grain-boundary-defect" },
];

export function Scenarios() {
  const { language } = useLanguage();
  const [active, setActive] = useState(0);

  return (
    <Section id="research" className="py-32 md:py-44">
      <Reveal>
        <div className="mono-label mb-8 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-accent/60" />
          {tr(language, "Research Scenarios", "研究场景")}
        </div>
      </Reveal>

      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
        {/* list */}
        <div className="lg:col-span-5">
          <Reveal delay={0.05}>
            <h2 className="font-display zh-heading text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
              {language === "zh" ? (
                <>
                  <span className="block">解决真正关心的</span>
                  <span className="block">科研问题</span>
                </>
              ) : (
                <>
                  Built for the questions
                  <br />
                  you&apos;re actually asking
                </>
              )}
            </h2>
          </Reveal>

          <div className="mt-10">
            {SCENARIOS.map((s, i) => (
              <button
                key={s.title.en}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group flex w-full items-baseline justify-between gap-4 border-b border-line py-4 text-left transition-colors ${
                  active === i ? "border-accent/40" : ""
                }`}
              >
                <span
                  className={`font-display text-xl font-medium transition-colors sm:text-2xl ${
                    active === i ? "text-white" : "text-text-tertiary group-hover:text-text-secondary"
                  }`}
                >
                  {tr(language, s.title.en, s.title.zh)}
                </span>
                <span
                  className={`hidden shrink-0 font-mono text-[11px] tracking-[0.1em] transition-opacity sm:block ${
                    active === i ? "text-accent opacity-100" : "text-text-faint opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {tr(language, s.tag.en, s.tag.zh)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* dynamic visual */}
        <div className="lg:col-span-7">
          <Reveal delay={0.1} y={40}>
            <div data-story-panel className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-bg-1">
              {SCENARIOS.map((s, i) => (
                <img
                  key={s.id}
                  src={assetUrl(ASSETS[s.id].src.md)}
                  alt={tr(language, s.title.en, s.title.zh)}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
                  style={{
                    opacity: active === i ? 1 : 0,
                  }}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-0/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl font-semibold text-white">
                  {tr(language, SCENARIOS[active].title.en, SCENARIOS[active].title.zh)}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
