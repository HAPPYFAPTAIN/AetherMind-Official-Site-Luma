"use client";

import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/i18n";

const TAGS = [
  { en: "Molecular Dynamics", zh: "分子动力学" },
  { en: "Computational Chemistry", zh: "计算化学" },
  { en: "Materials Science", zh: "材料科学" },
  { en: "LAMMPS", zh: "LAMMPS" },
  { en: "Scientific AI", zh: "科学智能" },
  { en: "HPC", zh: "高性能计算" },
];

const SCALES = [
  { label: "Å", sub: { en: "electronic", zh: "电子尺度" } },
  { label: "nm", sub: { en: "molecular", zh: "分子尺度" } },
  { label: "µm", sub: { en: "mesoscale", zh: "介观尺度" } },
  { label: "mm", sub: { en: "continuum", zh: "连续介质" } },
];

export function PlatformDefinition() {
  const { language } = useLanguage();

  return (
    <Section id="platform" className="py-32 md:py-44">
      <div className="relative">
        <Reveal>
          <div className="mono-label mb-8 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent/60" />
            {tr(language, "Platform Definition", "平台能力")}
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="font-display zh-heading max-w-5xl text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[1.0] tracking-[-0.03em] text-white">
            {language === "zh" ? (
              <>
                <span className="block">一个计算平台</span>
                <span className="block text-text-tertiary">贯通不同尺度</span>
                <span className="block text-text-tertiary">连接不同学科</span>
              </>
            ) : (
              <>
                One computational platform
                <br />
                <span className="text-text-tertiary">Across scales</span>
                <br />
                <span className="text-text-tertiary">Across disciplines</span>
              </>
            )}
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="zh-copy mt-10 max-w-xl text-base leading-relaxed text-text-tertiary sm:text-lg">
            {tr(
              language,
              "From electronic structure to continuum mechanics, from a single protein to a billion-atom alloy — one environment to prepare, run, and understand every simulation.",
              "从电子结构到连续介质力学，从单个蛋白质到十亿原子合金，所有模拟都能在同一环境中完成准备、运行和分析。",
            )}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div data-story-stagger className="mt-14 flex flex-wrap gap-3">
            {TAGS.map((tag) => (
              <span
                key={tag.en}
                className="whitespace-nowrap rounded-full border border-line-strong bg-white/[0.02] px-4 py-2 font-mono text-[12px] tracking-[0.08em] text-text-secondary transition-colors hover:border-accent/40 hover:text-accent"
              >
                {tr(language, tag.en, tag.zh)}
              </span>
            ))}
          </div>
        </Reveal>

        {/* scale indicator */}
        <Reveal delay={0.26}>
          <div data-story-scale className="mt-20 border-t border-line pt-10">
            <div data-story-stagger className="grid grid-cols-4 items-end gap-2">
              {SCALES.map((s) => (
                <div key={s.label} className="flex min-w-0 flex-col items-center gap-3">
                  <span className="font-display text-xl font-medium text-white sm:text-2xl">
                    {s.label}
                  </span>
                  <span className="story-scale-label mono-label text-center text-text-faint">
                    {tr(language, s.sub.en, s.sub.zh)}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-5 h-px bg-line-strong">
              <span data-story-rail className="absolute inset-0 origin-left bg-accent/70" />
              {SCALES.map((_, i) => (
                <span
                  key={i}
                  className="absolute top-1/2 h-2.5 w-px -translate-y-1/2 bg-text-faint"
                  style={{ left: `${(i / (SCALES.length - 1)) * 100}%` }}
                />
              ))}
              <span data-story-scale-cursor className="pointer-events-none absolute inset-y-0 left-0 w-0">
                <span className="absolute -top-1 left-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent" />
              </span>
            </div>
            <div className="mt-4 flex justify-between font-mono text-[10px] tracking-[0.14em] text-text-faint">
              <span>10⁻¹⁰ m</span>
              <span>10⁻³ m</span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
