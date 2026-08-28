"use client";

import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { EdgeFadeVisual } from "@/components/primitives/EdgeFadeVisual";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/i18n";

export function FinalCTA() {
  const { language } = useLanguage();

  return (
    <Section id="console" className="flex min-h-[88vh] items-center py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <EdgeFadeVisual variant="cta" className="absolute inset-0">
          <div className="absolute bottom-[-6%] right-[-4%] h-[72vh] w-[52vw] opacity-60 mix-blend-screen">
            <img
              src="/images/g02/g02-10-emerging-scientific-core.full.webp"
              alt=""
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="absolute inset-[-6%] opacity-[0.16]">
            <img
              src="/images/g01/g01-10-discovery-final.md.webp"
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </EdgeFadeVisual>
      </div>

      <div className="relative w-full">
        <Reveal>
          <div className="mono-label mb-8 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent/60" />
            {tr(language, "Begin", "开始")}
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="font-display zh-heading max-w-4xl text-[clamp(2.5rem,7vw,5.75rem)] font-semibold leading-[1.0] tracking-[-0.03em] text-white">
              {language === "zh" ? (
                <>
                  <span className="block">下一项发现</span>
                  <span className="block">从一次计算开始</span>
                </>
              ) : (
                <>
                  The next discovery
                  <br />
                  starts with a computation
              </>
            )}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="zh-copy mt-8 max-w-md text-base leading-relaxed text-text-tertiary sm:text-lg">
            {tr(
              language,
              "Join the labs already accelerating materials, chemistry and molecular science with ANGSHENG.",
              "越来越多实验室正在借助 ANGSHENG，加快材料、化学和分子科学研究。",
            )}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#top"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-bg-0 transition-colors hover:bg-accent"
            >
              {tr(language, "Open Console", "打开控制台")}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="mailto:research@angsheng.ai"
              className="inline-flex items-center rounded-full border border-line-strong px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:border-accent/40 hover:bg-accent-soft"
            >
              {tr(language, "Talk to research", "联系科研团队")}
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
