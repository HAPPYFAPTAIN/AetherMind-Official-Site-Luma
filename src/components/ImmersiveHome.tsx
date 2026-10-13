"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { Nav } from "@/components/Nav";
import { ConsoleEntryButton } from "@/components/ConsoleEntryButton";
import { ScienceScene } from "@/components/primitives/ScienceScene";
import { SceneImage } from "@/components/primitives/SceneImage";
import { ImmersiveImage } from "@/components/primitives/ImmersiveImage";
import { ScrollRefresher } from "@/components/ScrollRefresher";
import { useLanguage } from "@/components/LanguageProvider";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { assetUrl } from "@/lib/asset-url";
import { HERO_PROGRESS_EVENT } from "@/lib/hero-scroll";
import { tr } from "@/lib/i18n";
import type { AssetKey } from "@/lib/assets";
import "./immersive-home.css";

const RESEARCH: {
  image: AssetKey;
  name: [string, string];
  title: [string, string];
  copy: [string, string];
}[] = [
  {
    image: "g01-04-materials-science",
    name: ["Materials", "材料科学"],
    title: ["A new perspective on matter.", "看见材料的另一种可能。"],
    copy: [
      "Explore crystal structures, defects and interfaces. Connect atomic behavior with the properties of a material.",
      "探索晶体结构、缺陷与界面，把原子层面的行为，与材料的宏观性质联系起来。",
    ],
  },
  {
    image: "g01-05-computational-chemistry",
    name: ["Chemistry", "计算化学"],
    title: [
      "Follow the energy. Find the mechanism.",
      "沿着能量，寻找反应的线索。",
    ],
    copy: [
      "Study molecular structures and energy landscapes to understand interactions and possible reaction pathways.",
      "从分子结构与能量景观出发，理解相互作用，探索可能的反应路径。",
    ],
  },
  {
    image: "g01-02-molecular-dynamics",
    name: ["Molecular dynamics", "分子动力学"],
    title: ["Every motion tells a story.", "每一次运动，都有迹可循。"],
    copy: [
      "Observe trajectories, temperature and structural evolution through a continuous molecular simulation workflow.",
      "沿着连续的模拟轨迹，观察温度、结构与物质状态如何随时间演变。",
    ],
  },
];

const WORKFLOW = [
  {
    title: ["Build the starting point", "构建起点"] as const,
    copy: [
      "Structures, force fields and simulation parameters, together in one workspace.",
      "从结构、力场到模拟参数，在同一工作空间里准备研究。",
    ] as const,
    image: "g02-02-crystal-lattice-block" as AssetKey,
  },
  {
    title: ["Let the computation unfold", "让计算发生"] as const,
    copy: [
      "Run LAMMPS workflows and follow energy, temperature and trajectories as the simulation evolves.",
      "运行 LAMMPS 工作流，沿着模拟过程追踪能量、温度和轨迹。",
    ] as const,
    image: "g01-08-computational-engine" as AssetKey,
  },
  {
    title: ["Understand what changed", "读懂变化"] as const,
    copy: [
      "Analyze structures and trajectories. Keep the parameters and data that make results reproducible.",
      "分析结构与轨迹，保留参数和数据，让研究结果能够复现。",
    ] as const,
    image: "g01-07-energy-landscape" as AssetKey,
  },
];

export function ImmersiveHome() {
  const root = useRef<HTMLElement>(null);
  const hero = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const [research, setResearch] = useState(0);
  const [workflow, setWorkflow] = useState(0);
  const [model, setModel] = useState(0);
  const t = (en: string, zh: string) => tr(language, en, zh);

  useLayoutEffect(() => {
    if (!root.current) return;
    const media = gsap.matchMedia();
    // Native scrolling remains in control. Only the three visual chapters
    // get a short hold; the opening is one ordinary screen.
    media.add(
      "(prefers-reduced-motion: no-preference) and (min-height: 600px)",
      () => {
        const context = gsap.context(() => {
          gsap.from(".luma-hero-heading", {
            opacity: 0,
            y: 22,
            duration: 1.1,
            ease: "power3.out",
          });
          gsap.from(".luma-hero-environment", {
            opacity: 0,
            scale: 1.06,
            duration: 1.3,
            delay: 0.15,
            ease: "power3.out",
          });
          gsap.to(".luma-hero-environment", {
            y: 70,
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: ".luma-hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          });
          gsap.fromTo(
            ".luma-statement p",
            { opacity: 0.25 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ".luma-statement",
                start: "top 75%",
                end: "center 60%",
                scrub: 0.4,
              },
            },
          );
          root.current
            ?.querySelectorAll<HTMLElement>("[data-luma-chapter]")
            .forEach((section) => {
              gsap.fromTo(
                section.querySelector(".luma-chapter-copy"),
                { y: 55, opacity: 0.12 },
                {
                  y: 0,
                  opacity: 1,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    end: "top 10%",
                    scrub: 0.35,
                  },
                },
              );
              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  start: "top top",
                  end: () =>
                    `+=${Math.round(window.innerHeight * (window.innerWidth < 768 ? 0.35 : 0.7))}`,
                  pin: true,
                  pinSpacing: true,
                  scrub: 0.45,
                  invalidateOnRefresh: true,
                },
              });
              timeline.fromTo(
                section.querySelector(".luma-chapter-image"),
                { scale: 1.08 },
                { scale: 1, duration: 1, ease: "none" },
                0,
              );
            });
        }, root);
        return () => context.revert();
      },
      root,
    );
    return () => media.revert();
  }, []);

  useLayoutEffect(() => {
    // Translations and tab descriptions can change later pin positions.
    ScrollTrigger.refresh();
  }, [language, research, workflow]);

  const changeModel = () => {
    const next = (model + 1) % 3;
    const phase = [0, 0.58, 1][next];
    setModel(next);
    if (hero.current) {
      hero.current.dataset.sceneProgress = String(phase);
      hero.current.dispatchEvent(
        new CustomEvent(HERO_PROGRESS_EVENT, { detail: phase }),
      );
    }
  };

  function moveTab(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    count: number,
    select: (value: number) => void,
  ) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % count;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index + count - 1) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    select(next);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>("[role=tab]")
      [next]?.focus();
  }

  return (
    <main className="luma-home" ref={root}>
      <ScrollRefresher />
      <Nav />
      <a className="luma-skip" href="#explore">
        {t("Skip to the platform", "跳至平台介绍")}
      </a>
      <section
        className="luma-hero science-hero__stage luma-live"
        id="top"
        ref={hero}
        aria-labelledby="luma-title"
      >
        <div className="luma-hero-environment" aria-hidden="true">
          <ImmersiveImage
            name="hero-lattice"
            priority
            sizes="(max-aspect-ratio: 16/9) 178vh, 100vw"
          />
        </div>
        <ScienceScene mode="hero" className="luma-hero-model" />
        <div className="luma-hero-shade" aria-hidden="true" />
        <div className="luma-hero-heading">
          <h1 id="luma-title" className="luma-hero-title">
            <span lang="en">Science</span>
            <span>{t("Beyond imagination", "加速科学发现")}</span>
          </h1>
          <p className="luma-hero-description">
            {t(
              "From atoms to possibility. Explore matter with AI and physical simulation.",
              "从原子出发，以 AI 与物理模拟，探索物质的无限可能。",
            )}
          </p>
          <div className="luma-actions">
            <ConsoleEntryButton className="luma-button luma-button-light">
              {t("Open console", "打开控制台")}
            </ConsoleEntryButton>
            <a className="luma-button luma-button-outline" href="#explore">
              {t("Explore the platform", "探索平台")}
            </a>
          </div>
        </div>
        <nav
          className="luma-hero-links"
          aria-label={t("Explore research areas", "探索研究方向")}
        >
          {RESEARCH.map((item, i) => (
            <a key={item.image} href="#research" onClick={() => setResearch(i)}>
              {t(...item.name)}
            </a>
          ))}
        </nav>
        <div className="luma-model-toolbar">
          <span className="luma-drag-hint">
            {t("Drag to explore", "拖动，探索结构")}
          </span>
          <button
            onClick={changeModel}
            className="luma-model-switch"
            aria-label={t("Change molecular structure", "切换分子结构")}
          >
            <span aria-live="polite">
              {
                [
                  t("Structure", "结构"),
                  t("Simulation", "模拟"),
                  t("Discovery", "发现"),
                ][model]
              }
            </span>
            <svg
              viewBox="0 0 20 20"
              width="18"
              height="18"
              fill="none"
              aria-hidden="true"
            >
              <path d="m7 4 6 6-6 6" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>
        <a
          href="#explore"
          className="luma-scroll-cue"
          aria-label={t("Scroll to explore", "向下探索")}
        >
          <span />
          {t("A closer look", "向未知，再近一步")}
        </a>
      </section>
      <section
        className="luma-statement"
        id="explore"
        aria-label={t("The platform", "平台介绍")}
      >
        <p>
          {t("A question. A simulation.", "一个问题，一次模拟。")}
          <br />
          {t("A new way to see the world.", "一种理解世界的新方式。")}
        </p>
        <div className="luma-statement-note">
          {t(
            "AethericAI brings molecular simulation, scientific computing and AI into one continuous research workflow.",
            "以太智元，把分子模拟、科学计算与 AI，连接为连续的研究工作流。",
          )}
        </div>
      </section>
      <section
        id="simulation"
        className="luma-chapter luma-simulation"
        data-luma-chapter
        aria-labelledby="simulation-title"
      >
        <div className="luma-chapter-visual">
          <div className="luma-chapter-image">
            <SceneImage id="g01-03-lammps-millions-atoms" sizes="100vw" />
          </div>
        </div>
        <div className="luma-chapter-copy">
          <span className="luma-section-name">
            {t("Molecular simulation", "分子模拟")}
          </span>
          <h2 id="simulation-title">
            {t("Matter in motion.", "让微观世界")}
            <br />
            {t("Meaning in every atom.", "在眼前发生。")}
          </h2>
          <p>
            {t(
              "Build a structure. Set the conditions. Follow the motion of atoms, and see how the properties of matter emerge.",
              "构建结构，设定条件，跟随原子的运动。让物质的变化，从抽象的参数变成可观察的过程。",
            )}
          </p>
          <a className="luma-text-link" href={assetUrl("/products/")}>
            {t("Explore simulation tools", "了解模拟工具")}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="luma-chapter-foot">
          <span>LAMMPS</span>
          <span>
            {t("Structure / Trajectory / Analysis", "结构 / 轨迹 / 分析")}
          </span>
        </div>
      </section>
      <section
        id="intelligence"
        className="luma-chapter luma-intelligence"
        data-luma-chapter
        aria-labelledby="intelligence-title"
      >
        <div className="luma-chapter-visual">
          <div className="luma-chapter-image">
            <SceneImage id="g01-06-ai-science-transformation" sizes="100vw" />
          </div>
        </div>
        <div className="luma-chapter-copy">
          <span className="luma-section-name">AI for Science</span>
          <h2 id="intelligence-title">
            {t("Grounded in physics.", "以物理为根基。")}
            <br />
            {t("Open to possibility.", "向未知处探索。")}
          </h2>
          <p>
            {t(
              "Learn from simulation. Discover useful representations. Return predictions to physical models for validation.",
              "从模拟中学习表征，用预测寻找线索，再回到物理模型中验证。让结构、表征与预测，连接成完整的探索过程。",
            )}
          </p>
          <div className="luma-science-path">
            <span>{t("Structure", "结构")}</span>
            <i />
            <span>{t("Representation", "表征")}</span>
            <i />
            <span>{t("Prediction", "预测")}</span>
          </div>
        </div>
        <div className="luma-chapter-foot">
          <span>{t("Physics meets intelligence", "物理与智能，在此相遇")}</span>
          <span>{t("Learn / Predict / Validate", "学习 / 预测 / 验证")}</span>
        </div>
      </section>
      <section
        className="luma-research"
        id="research"
        aria-labelledby="research-title"
      >
        <div className="luma-research-heading">
          <h2 id="research-title">
            {t("Different questions.", "不同的问题。")}
            <br />
            {t("The same curiosity.", "同一种好奇。")}
          </h2>
          <p>
            {t(
              "Move between scales and disciplines. Find the right starting point for your next question.",
              "跨越尺度与学科，为你的下一个研究问题，找到新的起点。",
            )}
          </p>
        </div>
        <div
          className="luma-tabs"
          role="tablist"
          aria-label={t("Research areas", "研究方向")}
        >
          {RESEARCH.map((item, i) => (
            <button
              key={item.image}
              role="tab"
              id={`research-tab-${i}`}
              aria-selected={research === i}
              aria-controls={`research-panel-${i}`}
              tabIndex={research === i ? 0 : -1}
              onClick={() => setResearch(i)}
              onKeyDown={(e) => moveTab(e, i, RESEARCH.length, setResearch)}
            >
              {t(...item.name)}
            </button>
          ))}
        </div>
        {RESEARCH.map((item, i) => (
          <div
            key={item.image}
            role="tabpanel"
            id={`research-panel-${i}`}
            aria-labelledby={`research-tab-${i}`}
            hidden={research !== i}
            tabIndex={0}
            className="luma-research-panel"
          >
            <div className="luma-research-image">
              {i === 0 ? (
                <ImmersiveImage
                  name="crystal-matter"
                  alt={t(
                    "Crystalline material, artistic visualization",
                    "晶体材料艺术示意",
                  )}
                  sizes="(max-width: 767px) 100vw, 88vw"
                />
              ) : (
                <SceneImage
                  id={item.image}
                  alt={t(...item.name)}
                  sizes="(max-width: 767px) 100vw, 88vw"
                />
              )}
            </div>
            <div className="luma-research-caption">
              <h3>{t(...item.title)}</h3>
              <p>{t(...item.copy)}</p>
            </div>
          </div>
        ))}
      </section>
      <section
        className="luma-workflow"
        id="workflow"
        aria-labelledby="workflow-title"
      >
        <div className="luma-workflow-heading">
          <span className="luma-section-name">
            {t("A continuous workflow", "连续的科研工作流")}
          </span>
          <h2 id="workflow-title">
            {t("From the first idea", "从一个想法")}
            <br />
            {t("to the next insight.", "到下一次洞见。")}
          </h2>
          <p>
            {t(
              "Keep the experiment connected, from the starting structure to the final analysis.",
              "从初始结构到结果分析，让每一步研究保持连贯。",
            )}
          </p>
        </div>
        <div className="luma-workflow-body">
          <div
            className="luma-workflow-steps"
            role="tablist"
            aria-label={t("Workflow steps", "工作流步骤")}
            aria-orientation="vertical"
          >
            {WORKFLOW.map((step, i) => (
              <button
                role="tab"
                key={step.image}
                aria-selected={workflow === i}
                id={`workflow-tab-${i}`}
                aria-controls={`workflow-panel-${i}`}
                tabIndex={workflow === i ? 0 : -1}
                onClick={() => setWorkflow(i)}
                onKeyDown={(e) => moveTab(e, i, WORKFLOW.length, setWorkflow)}
              >
                <span className="luma-step-number">0{i + 1}</span>
                <span>
                  <strong>{t(step.title[0], step.title[1])}</strong>
                  <span className="luma-step-copy">
                    {t(step.copy[0], step.copy[1])}
                  </span>
                </span>
                <span className="luma-step-mark" aria-hidden="true">
                  {workflow === i ? "−" : "+"}
                </span>
              </button>
            ))}
          </div>
          <div className="luma-workflow-view">
            {WORKFLOW.map((step, i) => (
              <div
                className="luma-workflow-panel"
                key={step.image}
                role="tabpanel"
                id={`workflow-panel-${i}`}
                aria-labelledby={`workflow-tab-${i}`}
                hidden={workflow !== i}
                tabIndex={0}
              >
                <SceneImage
                  id={step.image}
                  alt={t(step.title[0], step.title[1])}
                  sizes="(max-width: 767px) 100vw, 55vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="infrastructure"
        className="luma-chapter luma-infrastructure"
        data-luma-chapter
        aria-labelledby="infrastructure-title"
      >
        <div className="luma-chapter-visual">
          <div className="luma-chapter-image">
            <SceneImage
              id="g03-05-computational-data-atmosphere"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="luma-chapter-copy">
          <span className="luma-section-name">
            {t("Built around your research", "围绕你的研究而构建")}
          </span>
          <h2 id="infrastructure-title">
            {t("Your science.", "你的研究。")}
            <br />
            {t("Your environment.", "你的计算环境。")}
          </h2>
          <p>
            {t(
              "Private cloud, on-premise HPC or hybrid infrastructure. Bring the workflow to where your research data lives.",
              "私有云、本地 HPC 或混合部署。让计算工作流，进入科研数据所在的环境。",
            )}
          </p>
          <button
            data-showcase="enterprise"
            className="luma-button luma-button-outline"
          >
            {t("Enterprise services", "了解企业服务")}
          </button>
        </div>
        <div className="luma-chapter-foot">
          <span>CPU / GPU / HPC</span>
          <span>
            {t("Private / On-premise / Hybrid", "私有云 / 本地 / 混合")}
          </span>
        </div>
      </section>
      <section
        className="luma-finale"
        id="console"
        aria-labelledby="finale-title"
      >
        <span className="luma-finale-kicker">
          {t("The next question is yours.", "下一个问题，由你提出。")}
        </span>
        <h2 id="finale-title">
          {t("Imagine what's next.", "想象，下一次发现。")}
        </h2>
        <ConsoleEntryButton className="luma-button luma-button-light">
          {t("Open console", "打开控制台")}
        </ConsoleEntryButton>
      </section>
      <footer className="luma-footer">
        <a
          href="#top"
          className="luma-wordmark"
          aria-label={t("AethericAI, back to top", "以太智元，回到顶部")}
        >
          Aetheric<span>AI</span>
        </a>
        <div className="luma-footer-bottom">
          <span>
            © {new Date().getFullYear()} {t("AethericAI", "以太智元")}
          </span>
          <nav aria-label={t("Footer", "页脚导航")}>
            <a href={assetUrl("/products/")}>{t("Products", "产品")}</a>
            <a href={assetUrl("/community/")}>{t("Community", "社区")}</a>
            <a href="#about">{t("About us", "关于我们")}</a>
            <a href="#careers">{t("Join us", "加入我们")}</a>
          </nav>
          <span>AI for Science</span>
        </div>
      </footer>
    </main>
  );
}
