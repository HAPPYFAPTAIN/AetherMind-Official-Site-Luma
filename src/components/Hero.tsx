"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SceneImage } from "@/components/primitives/SceneImage";
import { EdgeFadeVisual } from "@/components/primitives/EdgeFadeVisual";
import { ScienceScene } from "@/components/primitives/ScienceScene";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/i18n";
import { ConsoleEntryButton } from "@/components/ConsoleEntryButton";
import { assetUrl } from "@/lib/asset-url";
import { HERO_CHAPTERS as CHAPTERS, HERO_PROGRESS_EVENT, sampleHeroScroll } from "@/lib/hero-scroll";

/* state content for the pinned scroll narrative */
const STATES = [
  {
    label: { en: "AI for Science · Scientific Computing", zh: "科学智能 · 科学计算" },
    title: {
      en: ["Accelerate", "Scientific", "Discovery"],
      zh: ["加速科学发现"],
    },
    sub: {
      en: "AI-native scientific computing for molecular simulation, materials research, LAMMPS workflows and AI for Science.",
      zh: "把 AI 直接融入科学计算，用于分子模拟、材料研究、LAMMPS\u00a0工作流和科学智能探索。",
    },
  },
  {
    label: { en: "Molecular Dynamics · Atomic Simulation", zh: "分子动力学 · 原子级模拟" },
    title: {
      en: ["Matter at", "atomic resolution"],
      zh: ["原子尺度", "看清物质"],
    },
    sub: {
      en: "Every bond, every trajectory, every fluctuation — computed and visible.",
      zh: "每一根化学键、每一条轨迹、每一次微小波动，都能被计算，也都清晰可见。",
    },
  },
  {
    label: { en: "Simulation", zh: "模拟" },
    title: {
      en: ["Simulate matter", "Atom by atom"],
      zh: ["逐个原子", "模拟物质"],
    },
    sub: {
      en: "Millions of atoms evolving across femtoseconds to microseconds.",
      zh: "让数百万原子从飞秒演化到微秒，始终可追踪。",
    },
  },
  {
    label: { en: "AI for Science", zh: "科学智能" },
    title: {
      en: ["From structure", "to prediction"],
      zh: ["从结构", "走向预测"],
    },
    sub: {
      en: "Physical simulation meets learned representations — grounded in physics, driven by computation.",
      zh: "让物理模拟与学习到的表征相遇，以物理为根基，以计算为驱动。",
    },
  },
  {
    label: { en: "Discovery", zh: "科学发现" },
    title: {
      en: ["From atoms", "to discovery"],
      zh: ["从原子", "走向发现"],
    },
    sub: {
      en: "The next material, molecule and mechanism begin as a computation.",
      zh: "下一种材料、下一种分子、下一个机理，都从一次计算开始。",
    },
  },
];

function scientificCopy(text: string) {
  return text.split(/(科学计算|分子模拟|材料研究|LAMMPS\u00a0工作流|科学智能探索|每一根化学键|每一条轨迹|每一次微小波动|化学键|物理模拟|一次计算|下一种材料|下一种分子|下一个机理)/).map((part, i) =>
    i % 2 ? <span className="zh-term" key={i}>{part}</span> : part,
  );
}

export function Hero() {
  const { language } = useLanguage();
  const outer = useRef<HTMLDivElement>(null);
  const textStates = useRef<(HTMLDivElement | null)[]>([]);
  const progress = useRef<HTMLDivElement>(null);
  const chapterButtons = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const root = outer.current;
    if (!root) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const scroll = {progress: 0};
      const paint = () => {
        const state = sampleHeroScroll(scroll.progress);
        root.dataset.chapter = String(state.active);
        root.dataset.sceneProgress = String(state.phase);
        textStates.current.forEach((element, index) => {
          if (!element) return;
          const offset = index - state.position;
          const opacity = Math.max(0, 1 - Math.abs(offset));
          gsap.set(element, {autoAlpha: opacity, y: Math.max(-1, Math.min(1, offset)) * 28});
          element.inert = opacity < .5;
          element.setAttribute("aria-hidden", String(opacity < .5));
        });
        chapterButtons.current.forEach((button, i) => button?.setAttribute("aria-current", String(i === state.active)));
        gsap.set(progress.current, {scaleY: state.phase});
        root.dispatchEvent(new CustomEvent(HERO_PROGRESS_EVENT, {detail: state.phase}));
      };
      paint();
      // One clock drives text, chapter indicators and the worker's model phase.
      const driver = gsap.to(scroll, {
        progress: 1,
        ease: "none",
        onUpdate: paint,
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: .18,
          invalidateOnRefresh: true,
          snap: {
            snapTo: CHAPTERS.map(chapter => chapter.at),
            directional: true,
            inertia: false,
            delay: .14,
            duration: {min: .28, max: .55},
            ease: "power2.inOut",
          },
        },
      });
      return () => {
        driver.scrollTrigger?.kill();
        driver.kill();
        textStates.current.forEach(element => {
          if (!element) return;
          element.inert = false;
          element.removeAttribute("aria-hidden");
          gsap.set(element, {clearProps: "opacity,visibility,transform"});
        });
        delete root.dataset.sceneProgress;
        delete root.dataset.chapter;
      };
    }, root);
    return () => media.revert();
  }, []);

  return (
    <section id="top" ref={outer} className="science-hero relative">
      <div className="science-hero__stage sticky top-0 w-full overflow-hidden">
        <EdgeFadeVisual variant="hero" className="absolute inset-0 opacity-[0.075]">
          <div className="absolute inset-0">
            <SceneImage
              id="g01-01-hero-atomic-universe"
              alt=""
              priority
              variant="full"
            />
          </div>

        </EdgeFadeVisual>
        <ScienceScene mode="hero" className="science-hero__object absolute" />

        {/* text states */}
        <div className="science-hero__copy pointer-events-none absolute inset-0 flex items-center">
          <div className="relative mx-auto grid w-full max-w-[1440px] px-6 lg:px-12">
            {/* STATE 1 — title */}
            <div
              ref={(el) => {
                textStates.current[0] = el;
              }}
              className="science-hero__intro col-start-1 row-start-1 self-center max-w-[580px]"
            >
              <div className="mono-label mb-6 flex items-center gap-3 text-accent">
                <span className="inline-block h-px w-8 bg-accent/60" />
                {tr(language, STATES[0].label.en, STATES[0].label.zh)}
              </div>
              <h1
                aria-label={STATES[0].title[language].join(" ")}
                className="science-hero__title font-display zh-heading text-[clamp(2.75rem,6vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-white"
              >
                {STATES[0].title[language].map((line, index) => (
                  <span key={line} className="block overflow-hidden pb-[0.08em]">
                    <span
                      className="word rise-mask"
                      style={{ animationDelay: `${0.1 + index * 0.07}s` }}
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </h1>
              <p
                className="rise-in zh-copy mt-8 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg"
                style={{ animationDelay: "0.45s" }}
              >
                {scientificCopy(tr(language, STATES[0].sub.en, STATES[0].sub.zh))}
              </p>
              <div className="rise-in pointer-events-auto mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.55s" }}>
                <a
                  href={assetUrl("/md-agent/")}
                  className="science-hero__action group inline-flex items-center rounded-full bg-white font-semibold text-bg-0 transition-colors hover:bg-accent"
                >
                  {tr(language, "Explore Platform", "探索平台")}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
                <ConsoleEntryButton
                  className="science-hero__action inline-flex items-center rounded-full border border-white/25 font-medium text-white transition-colors hover:border-accent/40 hover:bg-accent-soft"
                >
                  {tr(language, "Enter agent", "进入智能体")}
                </ConsoleEntryButton>
              </div>
            </div>

            {/* STATES 2–5 */}
            {STATES.slice(1).map((s, i) => (
              <div
                key={s.title.en.join(" ")}
                ref={(el) => {
                  textStates.current[i + 1] = el;
                }}
                className="science-hero__state relative col-start-1 row-start-1 self-center max-w-[580px] opacity-0"
              >
                <div className="mono-label mb-5 flex items-center gap-3 text-accent">
                  <span className="inline-block h-px w-8 bg-accent/60" />
                  {tr(language, s.label.en, s.label.zh)}
                </div>
                <h2
                  aria-label={s.title[language].join(" ")}
                  className="font-display zh-heading text-[clamp(2.25rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white"
                >
                  {s.title[language].map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="zh-copy mt-6 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">
                  {scientificCopy(tr(language, s.sub.en, s.sub.zh))}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* progress line */}
        <div className="absolute right-5 top-1/2 hidden h-40 w-px -translate-y-1/2 overflow-hidden bg-line-strong md:block lg:right-8">
          <div ref={progress} className="h-full w-full origin-top scale-y-0 bg-accent/70" />
        </div>

        {/* top/bottom dissolve into page */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg-0 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg-0 to-transparent" />
        <nav className="science-hero__chapters" aria-label={tr(language, "Explore the structure", "探索结构变化")}>
          {CHAPTERS.map((chapter, i) => (
            <button
              key={chapter.en}
              ref={(element) => { chapterButtons.current[i] = element; }}
              type="button"
              aria-current={i === 0 ? "true" : "false"}
              onClick={() => {
                const root = outer.current;
                const stage = root?.firstElementChild;
                if (!root || !stage) return;
                const start = root.getBoundingClientRect().top + window.scrollY;
                const distance = root.clientHeight - stage.clientHeight;
                window.scrollTo({top: start + distance * chapter.at, behavior: "smooth"});
              }}
            >
              {tr(language, chapter.en, chapter.zh)}
            </button>
          ))}
        </nav>
        <p className="sr-only">{tr(language,
          "Illustrative molecular complex: scroll to reveal its inner membrane, separate and rotate molecular fragments, then reassemble them. This is a structural illustration, not simulation output.",
          "分子复合体结构示意：滚动页面可显露内部薄膜、旋转解构分子簇，再重新聚合。这是结构示意，并非模拟结果。")}</p>
      </div>
    </section>
  );
}
