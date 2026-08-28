"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/components/primitives/Reveal";
import { SceneImage } from "@/components/primitives/SceneImage";
import { ParticleField } from "@/components/primitives/ParticleField";
import { EdgeFadeVisual } from "@/components/primitives/EdgeFadeVisual";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/i18n";

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

export function Hero() {
  const { language } = useLanguage();
  const outer = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);

  const bg = useRef<HTMLDivElement>(null);
  const haze = useRef<HTMLDivElement>(null);
  const obj = useRef<HTMLDivElement>(null);
  const objAlt = useRef<HTMLDivElement>(null);
  const cluster = useRef<HTMLDivElement>(null);
  const cluster2 = useRef<HTMLDivElement>(null);
  const textStates = useRef<(HTMLDivElement | null)[]>([]);
  const hint = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = outer.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(objAlt.current, { autoAlpha: 0 });
      return;
    }

    /* ------- pointer parallax (outside context so we can clean up) ------- */
    const qx = gsap.quickTo(scene.current!, "x", { duration: 1, ease: "power3.out" });
    const qy = gsap.quickTo(scene.current!, "y", { duration: 1, ease: "power3.out" });
    const qrx = gsap.quickTo(scene.current!, "rotationX", { duration: 1.2, ease: "power3.out" });
    const qry = gsap.quickTo(scene.current!, "rotationY", { duration: 1.2, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      qx(nx * 22);
      qy(ny * 18);
      qry(nx * 2.4);
      qrx(-ny * 2.4);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const ctx = gsap.context(() => {
      /* ------- ambient motion (no scroll needed) ------- */
      gsap.to("[data-ambient-float]", {
        y: -16,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to("[data-ambient-float2]", {
        y: 20,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to("[data-ambient-rotate]", {
        rotation: 1.6,
        duration: 14,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(haze.current, {
        opacity: 0.28,
        duration: 7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      /* ------- scroll timeline (the narrative) ------- */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        defaults: { ease: "none" },
      });

      // background pushes in slowly, dims toward the exit
      tl.fromTo(bg.current, { scale: 1.08 }, { scale: 1.26, duration: 1 }, 0)
        .to(bg.current, { opacity: 0.35, duration: 0.3 }, 0.72);

      // main molecular object: camera enters the structure
      tl.fromTo(
        obj.current,
        { scale: 1, y: 0 },
        { scale: 1.28, y: -24, duration: 0.55, ease: "power1.inOut" },
        0
      ).to(obj.current, { opacity: 0, duration: 0.14 }, 0.55);

      // computational representation dissolves in over the object
      tl.fromTo(
        objAlt.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1.18, opacity: 1, duration: 0.38, ease: "power1.out" },
        0.62
      );

      // floating clusters drift on their own parallax paths
      tl.fromTo(
        cluster.current,
        { x: 0, opacity: 0.85 },
        { x: 80, y: -40, opacity: 0.9, duration: 0.8 },
        0
      ).to(cluster.current, { opacity: 0, duration: 0.15 }, 0.85);

      tl.fromTo(
        cluster2.current,
        { x: 0, opacity: 0.7 },
        { x: -90, y: 60, opacity: 0.8, duration: 0.8 },
        0
      ).to(cluster2.current, { opacity: 0, duration: 0.15 }, 0.8);

      // text states chained through the sequence
      const inOut = (el: HTMLDivElement | null, a: number, b: number, c: number, d: number) => {
        if (!el) return;
        tl.fromTo(el, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: b - a }, a);
        if (c < d) tl.to(el, { autoAlpha: 0, y: -40, duration: d - c }, c);
      };

      // state 0 is visible on load — only fades out
      tl.to(textStates.current[0], { autoAlpha: 0, y: -40, duration: 0.1 }, 0.16);
      inOut(textStates.current[1], 0.28, 0.36, 0.42, 0.5);
      inOut(textStates.current[2], 0.52, 0.6, 0.66, 0.74);
      inOut(textStates.current[3], 0.76, 0.82, 0.86, 0.92);
      inOut(textStates.current[4], 0.92, 0.98, 1, 1);

      // scroll hint fades immediately, progress line fills the full range
      tl.to(hint.current, { autoAlpha: 0, duration: 0.03 }, 0.04);
      tl.fromTo(progress.current, { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0);
    }, root);

    return () => {
      window.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section id="top" ref={outer} className="relative h-[320vh] md:h-[400vh] lg:h-[440vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Fixed edge integration around the moving perspective scene. */}
        <EdgeFadeVisual variant="hero" className="absolute inset-0">
          <div
            ref={scene}
            className="absolute inset-[-2%]"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
          {/* background scene */}
          <div ref={bg} className="absolute inset-0 will-change-transform">
            <SceneImage
              id="g01-01-hero-atomic-universe"
              alt=""
              priority
              variant="full"
            />
          </div>

          {/* atmosphere / haze */}
          <div
            ref={haze}
            className="absolute inset-0 mix-blend-screen will-change-[opacity]"
            style={{ opacity: 0.22 }}
          >
            <SceneImage id="g03-01-scientific-particle-field" alt="" variant="md" />
          </div>

          {/* floating cluster — far right */}
          <div
            ref={cluster}
            className="absolute right-[-6%] top-[8%] h-[46vh] w-[38vw] mix-blend-screen opacity-90 will-change-transform"
          >
            <div data-ambient-float2 className="science-object-fade h-full w-full">
              <SceneImage id="g02-03-atomic-cluster" alt="" variant="md" fit="contain" />
            </div>
          </div>

          {/* floating particle cluster — lower left */}
          <div
            ref={cluster2}
            className="absolute bottom-[4%] left-[-4%] h-[40vh] w-[34vw] mix-blend-screen opacity-80 will-change-transform"
          >
            <div data-ambient-float className="h-full w-full">
              <SceneImage id="g02-08-scientific-particle-cluster" alt="" variant="md" fit="contain" />
            </div>
          </div>

          {/* main molecular object — center-right */}
          <div
            ref={obj}
            className="absolute right-[2%] top-1/2 h-[72vh] w-[64vw] -translate-y-1/2 mix-blend-screen will-change-transform md:w-[56vw]"
            style={{ transformOrigin: "center" }}
          >
            <div
              data-ambient-rotate
              className="science-object-fade h-full w-full"
            >
              <SceneImage id="g02-01-hero-molecular-object" alt="" variant="full" fit="contain" />
            </div>
          </div>

          {/* computational representation — dissolves over object */}
          <div
            ref={objAlt}
            className="science-object-fade absolute right-[2%] top-1/2 h-[72vh] w-[64vw] -translate-y-1/2 mix-blend-screen opacity-0 will-change-transform md:w-[56vw]"
            style={{ transformOrigin: "center" }}
          >
            <SceneImage id="g02-09-computational-representation" alt="" variant="full" fit="contain" />
          </div>
          </div>
        </EdgeFadeVisual>

        {/* live particles */}
        <ParticleField density={5} accent="143,211,255" />

        {/* text states */}
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-bg-0/75 via-bg-0/35 to-transparent md:via-bg-0/15" />
          <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-12">
            {/* STATE 1 — title */}
            <div
              ref={(el) => {
                textStates.current[0] = el;
              }}
              className="max-w-[720px]"
            >
              <div className="mono-label mb-6 flex items-center gap-3 text-accent">
                <span className="inline-block h-px w-8 bg-accent/60" />
                {tr(language, STATES[0].label.en, STATES[0].label.zh)}
              </div>
              <h1
                aria-label={STATES[0].title[language].join(" ")}
                className="font-display zh-heading text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-white"
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
                {tr(language, STATES[0].sub.en, STATES[0].sub.zh)}
              </p>
              <div className="rise-in mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.55s" }}>
                <a
                  href="#platform"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[14px] font-semibold text-bg-0 transition-colors hover:bg-accent"
                >
                  {tr(language, "Explore Platform", "探索平台")}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
                <a
                  href="#console"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-[14px] font-medium text-white transition-colors hover:border-accent/40 hover:bg-accent-soft"
                >
                  {tr(language, "Open Console", "打开控制台")}
                </a>
              </div>
            </div>

            {/* STATES 2–5 */}
            {STATES.slice(1).map((s, i) => (
              <div
                key={s.title.en.join(" ")}
                ref={(el) => {
                  textStates.current[i + 1] = el;
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 max-w-[760px] px-6 opacity-0 lg:px-12"
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
                <p className="zh-copy mt-6 max-w-md text-base leading-relaxed text-text-tertiary sm:text-lg">
                  {tr(language, s.sub.en, s.sub.zh)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* scroll hint */}
        <div
          ref={hint}
          className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="mono-label">{tr(language, "Scroll", "滚动")}</span>
          <div className="h-10 w-px overflow-hidden bg-line-strong">
            <div className="h-1/2 w-full animate-[scrolldrop_1.8s_ease-in-out_infinite] bg-accent" />
          </div>
        </div>

        {/* progress line */}
        <div className="absolute right-5 top-1/2 hidden h-40 w-px -translate-y-1/2 overflow-hidden bg-line-strong md:block lg:right-8">
          <div ref={progress} className="h-full w-full origin-top scale-y-0 bg-accent/70" />
        </div>

        {/* top/bottom dissolve into page */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg-0 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg-0 to-transparent" />
      </div>
    </section>
  );
}
