"use client";

import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { EdgeFadeVisual } from "@/components/primitives/EdgeFadeVisual";
import { ScienceScene } from "@/components/primitives/ScienceScene";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/i18n";
import { assetUrl } from "@/lib/asset-url";

const STAGES = [
  {
    n: "01",
    title: { en: "Structure", zh: "结构" },
    desc: { en: "Matter as it is — coordinates, bonds, symmetry, defects.", zh: "用坐标、化学键、对称性和缺陷，忠实描述物质本身。" },
    mode: "structure" as const,
  },
  {
    n: "02",
    title: { en: "Representation", zh: "表征" },
    desc: { en: "Learned embeddings that respect the underlying physics.", zh: "学习符合底层物理规律的有效表征。" },
    mode: "representation" as const,
  },
  {
    n: "03",
    title: { en: "Prediction", zh: "预测" },
    desc: { en: "New candidates, ranked and validated against simulation.", zh: "对新候选结果排序，再通过模拟完成验证。" },
    mode: "prediction" as const,
  },
];

export function AIScience() {
  const { language } = useLanguage();

  return (
    <Section id="ai-science" className="py-32 md:py-44">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <EdgeFadeVisual variant="section" className="absolute inset-0">
          <div className="absolute inset-[-6%] opacity-[0.22]">
            <img
              src={assetUrl("/images/g01/g01-06-ai-science-transformation.md.webp")}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </EdgeFadeVisual>
      </div>

      <div className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="min-w-0 lg:sticky lg:top-32">
            <Reveal>
              <div className="mono-label mb-8 flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-accent/60" />
                {tr(language, "AI for Science", "科学智能")}
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display zh-heading text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
                {language === "zh" ? (
                  <>
                    <span className="block">以物理规律为根基</span>
                    <span className="block">用计算推动发现</span>
                  </>
                ) : (
                  <>
                    Grounded in physics
                    <br />
                    Driven by computation
                  </>
                )}
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="zh-copy mt-8 max-w-md text-base leading-relaxed text-text-tertiary sm:text-lg">
                {tr(
                  language,
                  "Not a black box. Models that learn on real simulation data, respect conservation laws and boundary conditions, and close the loop back into LAMMPS — structure to representation to prediction.",
                  "这不是黑箱。模型从真实模拟数据中学习，遵守守恒定律和边界条件，再把预测结果送回 LAMMPS 验证，形成“结构—表征—预测”的完整闭环。",
                )}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[12px] tracking-[0.14em] text-text-tertiary">
                <span className="flex items-center gap-2">
                  <span className="h-px w-6 bg-accent/60" />
                  <span className="whitespace-nowrap">
                    {tr(language, "physics-informed", "物理规律约束")}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-px w-6 bg-accent/60" />
                  <span className="whitespace-nowrap">
                    {tr(language, "simulation-validated", "模拟结果验证")}
                  </span>
                </span>
              </div>
            </Reveal>
          </div>

          <div className="min-w-0 space-y-4">
            {STAGES.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} y={36}>
                <div className="group relative grid grid-cols-[auto_1fr] gap-5 overflow-hidden rounded-2xl border border-line bg-bg-1/60 p-5 backdrop-blur transition-colors hover:border-accent/30 sm:gap-7 sm:p-7">
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-text-faint">
                      {s.n}
                    </span>
                    <span className="mt-3 h-full w-px bg-line-strong group-hover:bg-accent/40" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl font-semibold text-white">
                      {tr(language, s.title.en, s.title.zh)}
                    </h3>
                    <p className="mt-2 max-w-sm text-[14.5px] leading-relaxed text-text-tertiary">
                      {tr(language, s.desc.en, s.desc.zh)}
                    </p>
                    <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-xl border border-line">
                      <ScienceScene mode={s.mode} className="absolute inset-0" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
