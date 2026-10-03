"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import "./showcase.css";

const CONTENT = {
  top: { zh: ["以太智元总览", "从科学问题开始，连接模型、计算、数据和协作。", ["科学计算", "AI for Science", "科研协作"]], en: ["AethericAI overview", "Start with a scientific question and connect models, compute, data and collaboration.", ["Scientific computing", "AI for Science", "Research collaboration"]] },
  platform: { zh: ["科学计算平台", "统一准备、运行和理解科学计算任务。", ["任务准备", "算力调度", "结果分析"]], en: ["Scientific computing platform", "Prepare, run and understand scientific workloads in one place.", ["Prepare a task", "Schedule compute", "Analyze results"]] },
  engine: { zh: ["计算引擎", "面向 LAMMPS、GPU 和 HPC 的计算任务面板。", ["GPU 集群", "任务队列", "运行日志"]], en: ["Compute engine", "A sample control surface for LAMMPS, GPU and HPC jobs.", ["GPU cluster", "Job queue", "Runtime logs"]] },
  simulation: { zh: ["原子级模拟", "从结构、力场到轨迹分析，按时间步查看模拟任务。", ["结构准备", "轨迹预览", "收敛检查"]], en: ["Atomic simulation", "Follow a simulation from structure and force field to trajectory analysis.", ["Prepare structure", "Preview trajectory", "Check convergence"]] },
  "ai-science": { zh: ["科学智能", "让模型尊重物理边界，用模拟结果校验预测。", ["结构表示", "物理约束", "预测验证"]], en: ["AI for Science", "Keep models grounded in physical boundaries and validate predictions with simulation.", ["Represent structure", "Add physics", "Validate predictions"]] },
  workflow: { zh: ["科研流程", "把准备、配置、计算、监测、分析和发布串成一条线。", ["准备", "计算", "分析", "协作"]], en: ["Research workflow", "Connect preparation, compute, monitoring, analysis and publishing.", ["Prepare", "Compute", "Analyze", "Collaborate"]] },
  research: { zh: ["研究场景", "按材料、化学、分子动力学和能源问题浏览示例工作区。", ["材料科学", "计算化学", "分子动力学", "能源材料"]], en: ["Research scenarios", "Browse sample workspaces for materials, chemistry, molecular dynamics and energy.", ["Materials", "Computational chemistry", "Molecular dynamics", "Energy materials"]] },
  products: { zh: ["产品", "这里预留产品入口，后续可以放平台、智能体和协作工具。", ["平台工作区", "科研智能体", "协作空间"]], en: ["Products", "This is the product entry point for the platform workspace, research agents and collaboration.", ["Platform workspace", "Research agents", "Collaboration space"]] },
  console: { zh: ["控制台", "控制台样板包含任务、算力和结果三个区域。", ["任务 12 个", "计算中 3 个", "待查看结果 5 个"]], en: ["Console", "The console preview has task, compute and result areas.", ["12 tasks", "3 running", "5 results to review"]] },
  home: { zh: ["快速开始", "选择问题，准备输入，运行一次样例计算，然后查看结果。", ["选择问题", "准备输入", "查看结果"]], en: ["Quick start", "Choose a question, prepare inputs, run a sample computation and review the result.", ["Choose a question", "Prepare inputs", "Review result"]] },
} as const;
type ShowcaseKey = keyof typeof CONTENT;

export function ShowcaseLayer() {
  const { language } = useLanguage();
  const [active, setActive] = useState<ShowcaseKey | null>(null);
  const [notice, setNotice] = useState("");
  const content = active ? CONTENT[active][language === "zh" ? "zh" : "en"] : null;
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const trigger = target.closest("a[href^=\"#\"], [data-showcase]") as HTMLElement | null;
      if (!trigger) return;
      const href = trigger.getAttribute("href") || "";
      const key = (trigger.getAttribute("data-showcase") || href.slice(1) || "home") as ShowcaseKey;
      if (!(key in CONTENT)) return;
      event.preventDefault(); event.stopPropagation(); setNotice(""); setActive(key);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    document.body.style.overflow = "hidden"; window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [active]);
  const labels = useMemo(() => language === "zh" ? { close: "关闭", preview: "功能预览", ready: "样板已准备", open: "打开样板", done: "已记录到示例工作区" } : { close: "Close", preview: "Feature preview", ready: "Preview ready", open: "Open sample", done: "Added to the sample workspace" }, [language]);
  if (!active || !content) return null;
  const [title, description, items] = content;
  return <div className="showcase-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
    <section className="showcase-dialog" role="dialog" aria-modal="true" aria-labelledby="showcase-title">
      <button className="showcase-close" onClick={() => setActive(null)} aria-label={labels.close}>×</button>
      <p className="showcase-eyebrow">{labels.preview}</p><h2 id="showcase-title">{title}</h2><p className="showcase-description">{description}</p>
      <div className="showcase-grid">{items.map((item) => <button key={item} onClick={() => setNotice(`${item} · ${labels.done}`)} className="showcase-item"><span className="showcase-item-mark">+</span><span>{item}</span><small>{labels.ready}</small></button>)}</div>
      {notice && <p className="showcase-notice" role="status">{notice}</p>}<button className="showcase-primary" onClick={() => setNotice(labels.done)}>{labels.open}</button>
    </section>
  </div>;
}
