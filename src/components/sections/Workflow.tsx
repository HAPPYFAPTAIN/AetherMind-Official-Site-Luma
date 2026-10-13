"use client";

import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/i18n";

const STEPS = [
  { n: "01", title: { en: "Prepare", zh: "准备" }, desc: { en: "Structures, force fields, inputs", zh: "结构、力场与输入文件" } },
  { n: "02", title: { en: "Configure", zh: "配置" }, desc: { en: "Ensembles, timesteps, parameters", zh: "系综、时间步长与参数" } },
  { n: "03", title: { en: "Compute", zh: "计算" }, desc: { en: "LAMMPS · GPU · HPC", zh: "LAMMPS · GPU · HPC" } },
  { n: "04", title: { en: "Monitor", zh: "监控" }, desc: { en: "Live energy, temperature, stress", zh: "实时能量、温度与应力" } },
  { n: "05", title: { en: "Analyze", zh: "分析" }, desc: { en: "RDF, DOS, trajectories, defects", zh: "RDF、DOS、轨迹与缺陷" } },
  { n: "06", title: { en: "Collaborate", zh: "协作" }, desc: { en: "Share, annotate, reproduce", zh: "共享、批注与复现" } },
  { n: "07", title: { en: "Publish", zh: "发表" }, desc: { en: "Figures, data, provenance", zh: "图表、数据与来源记录" } },
];

export function Workflow() {
  const { language } = useLanguage();

  return (
    <Section id="workflow" className="py-32 md:py-44">
      <Reveal>
        <div className="mono-label mb-8 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-accent/60" />
          {tr(language, "Scientific Workflow", "科研工作流")}
        </div>
      </Reveal>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <Reveal delay={0.05}>
          <h2 className="font-display zh-heading text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
            {tr(language, "From data to insight", "从数据走向洞见")}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="zh-copy max-w-sm text-[15px] leading-relaxed text-text-tertiary">
            {tr(
              language,
              "One continuous pipeline — no hand-offs between tools, no lost provenance, no irreproducible results.",
              "从准备到发表，全流程连续衔接。工具之间无需反复交接，数据来源完整保留，结果始终可以复现。",
            )}
          </p>
        </Reveal>
      </div>

      <div className="mt-16">
        {/* progress rail */}
        <div className="relative mb-10 hidden h-px w-full bg-line-strong lg:block">
          <div
            data-story-rail
            className="absolute inset-0 origin-left bg-accent/70"
          />
        </div>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-7">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05} y={24}>
              <div className="group relative">
                <span className="absolute -top-[2.95rem] hidden h-2 w-2 rounded-full border border-accent bg-bg-0 transition-colors group-hover:bg-accent lg:block" />
                <div className="font-mono text-[11px] tracking-[0.16em] text-text-faint">
                  {s.n}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">
                  {tr(language, s.title.en, s.title.zh)}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-text-tertiary">
                  {tr(language, s.desc.en, s.desc.zh)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
