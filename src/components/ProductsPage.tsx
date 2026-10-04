"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { assetUrl } from "@/lib/asset-url";
import { tr } from "@/lib/i18n";
import { BRAND } from "@/lib/site";
import "./products.css";

type Product = {
  id: string;
  icon: string;
  category: string;
  title: { zh: string; en: string };
  body: { zh: string; en: string };
  tags: { zh: string; en: string }[];
  state: { zh: string; en: string };
  accent: string;
};

const PRODUCTS: Product[] = [
  { id: "platform", icon: "A", category: "platform", title: { zh: "以太智元平台", en: "AethericAI Platform" }, body: { zh: "从任务准备到结果理解，一套面向科学研究的计算工作区。", en: "A research workspace for preparing jobs, running compute and understanding results." }, tags: [{ zh: "科研工作区", en: "Research workspace" }, { zh: "HPC", en: "HPC" }], state: { zh: "样板可用", en: "Preview ready" }, accent: "#8bd0ff" },
  { id: "lammps", icon: "L", category: "simulation", title: { zh: "LAMMPS 计算引擎", en: "LAMMPS Compute Engine" }, body: { zh: "面向分子动力学的 GPU 与 HPC 任务编排、监测和轨迹分析。", en: "GPU and HPC orchestration, monitoring and trajectory analysis for molecular dynamics." }, tags: [{ zh: "分子动力学", en: "Molecular dynamics" }, { zh: "GPU", en: "GPU" }], state: { zh: "持续建设", en: "In development" }, accent: "#91b9ff" },
  { id: "agent", icon: "S", category: "agent", title: { zh: "科学智能体", en: "Science Agents" }, body: { zh: "让研究问题转化为可执行的计算步骤，保留参数、证据和结果上下文。", en: "Turn research questions into executable steps while keeping parameters, evidence and context together." }, tags: [{ zh: "AI for Science", en: "AI for Science" }, { zh: "工作流", en: "Workflow" }], state: { zh: "样板可用", en: "Preview ready" }, accent: "#c3a8ff" },
  { id: "materials", icon: "M", category: "research", title: { zh: "材料研究工作区", en: "Materials Research Workspace" }, body: { zh: "围绕结构、缺陷、界面与能量景观组织材料研究过程。", en: "Organize materials research around structures, defects, interfaces and energy landscapes." }, tags: [{ zh: "材料科学", en: "Materials" }, { zh: "可复现", en: "Reproducible" }], state: { zh: "即将开放", en: "Coming soon" }, accent: "#93e6d1" },
  { id: "chemistry", icon: "C", category: "research", title: { zh: "计算化学工作区", en: "Computational Chemistry Workspace" }, body: { zh: "从分子结构到反应路径，用统一环境记录计算与判断。", en: "Track molecular structures, reaction paths and decisions in one environment." }, tags: [{ zh: "计算化学", en: "Chemistry" }, { zh: "结构分析", en: "Structure analysis" }], state: { zh: "即将开放", en: "Coming soon" }, accent: "#f6c58e" },
  { id: "collab", icon: "R", category: "collab", title: { zh: "研究协作空间", en: "Research Collaboration" }, body: { zh: "共享输入、结果、注释和版本，让团队在同一个研究上下文中协作。", en: "Share inputs, results, notes and versions in one research context." }, tags: [{ zh: "团队协作", en: "Team collaboration" }, { zh: "版本记录", en: "Versioned" }], state: { zh: "样板可用", en: "Preview ready" }, accent: "#f3a6c8" },
];

const CATEGORIES = [
  ["all", { zh: "全部产品", en: "All products" }],
  ["platform", { zh: "平台", en: "Platform" }],
  ["simulation", { zh: "模拟与计算", en: "Simulation & compute" }],
  ["agent", { zh: "科学智能体", en: "Science agents" }],
  ["research", { zh: "研究工作区", en: "Research workspaces" }],
  ["collab", { zh: "协作", en: "Collaboration" }],
] as const;

export function ProductsPage() {
  const { language, setLanguage } = useLanguage();
  const zh = language === "zh";
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const products = useMemo(() => category === "all" ? PRODUCTS : PRODUCTS.filter((product) => product.category === category), [category]);
  const labels = zh ? { signIn: "登录", home: "返回官网", search: "搜索产品", all: "查看全部产品", sort: "排序", popular: "常用", alpha: "按名称", detail: "产品详情", preview: "打开样板", state: "当前状态", use: "进入样板", close: "关闭", hero: "科学计算产品", headline: "让研究从问题走向结果", sub: "从原子尺度模拟到科学智能工作流，为每一个研究问题准备一套可执行的工具。" } : { signIn: "Sign in", home: "Back to site", search: "Search products", all: "View all products", sort: "Sort", popular: "Popular", alpha: "By name", detail: "Product details", preview: "Open preview", state: "Status", use: "Open preview", close: "Close", hero: "SCIENTIFIC COMPUTING PRODUCTS", headline: "Move research from question to result", sub: "From atom-scale simulation to science agents, a focused set of tools for real research questions." };
  return <main className="products-page">
    <header className="products-header"><div className="products-container products-header-inner"><a href={assetUrl("/")} className="products-brand"><span className="products-mark">◌</span>{tr(language, BRAND.en, BRAND.zh)}</a><label className="products-search"><span aria-hidden>⌕</span><input aria-label={labels.search} placeholder={labels.search} /></label><div className="products-header-actions"><button onClick={() => setLanguage(zh ? "en" : "zh")}>{zh ? "EN" : "中文"}</button><a href={assetUrl("/login/")}>{labels.signIn}</a></div></div><nav className="products-nav"><div className="products-container">{[["products", zh ? "产品" : "Products"], ["support", zh ? "支持" : "Support"], ["learn", zh ? "学习" : "Learn"], ["community", zh ? "社区" : "Community"]].map(([key,label]) => <button key={key} onClick={() => setCategory(key === "products" ? "all" : "all")}>{label}<span aria-hidden>⌄</span></button>)}</div></nav></header>
    <section className="products-hero"><div className="products-container products-hero-inner"><div><p className="products-eyebrow">{labels.hero}</p><h1>{labels.headline}</h1><p>{labels.sub}</p></div><div className="products-hero-visual" aria-hidden><span>A</span><i /><i /><i /></div></div></section>
    <div className="products-container products-category-tabs">{CATEGORIES.map(([value,label]) => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}><span className="products-tab-icon">{value === "all" ? "◈" : value === "simulation" ? "⌁" : value === "agent" ? "✦" : "◇"}</span>{tr(language,label.en,label.zh)}</button>)}</div>
    <section className="products-container products-catalog"><div className="products-catalog-heading"><div><p className="products-eyebrow">{zh ? "产品目录" : "PRODUCT CATALOG"}</p><h2>{zh ? "所有产品" : "All products"}</h2></div><div className="products-catalog-tools"><span>{labels.sort}</span><button className="active">{labels.popular}</button><button>{labels.alpha}</button></div></div><div className="products-grid">{products.map(product => <article key={product.id} className="product-card" style={{"--product-accent":product.accent} as React.CSSProperties}><div className="product-card-top"><span className="product-icon">{product.icon}</span><span className="product-state">{tr(language,product.state.en,product.state.zh)}</span></div><h3>{tr(language,product.title.en,product.title.zh)}</h3><p>{tr(language,product.body.en,product.body.zh)}</p><div className="product-tags">{product.tags.map(tag=><span key={tag.en}>{tr(language,tag.en,tag.zh)}</span>)}</div><button className="product-detail" onClick={() => setSelected(product)}>{labels.detail} <span>↗</span></button></article>)}</div></section>
    <footer className="products-footer"><div className="products-container"><a href={assetUrl("/community/")}>{zh ? "进入社区交流" : "Join the community"}</a><span>{zh ? "产品页为当前阶段的功能样板，真实产品接入后会保留同一信息结构。" : "This page is a product preview. Connected products will keep this information structure."}</span></div></footer>
    {selected && <div className="product-modal-backdrop" onMouseDown={event => {if(event.target===event.currentTarget)setSelected(null)}}><article className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title"><button className="product-modal-close" onClick={() => setSelected(null)} aria-label={labels.close}>×</button><span className="product-icon large">{selected.icon}</span><p className="products-eyebrow">{tr(language,selected.state.en,selected.state.zh)}</p><h2 id="product-modal-title">{tr(language,selected.title.en,selected.title.zh)}</h2><p>{tr(language,selected.body.en,selected.body.zh)}</p><div className="product-modal-list">{selected.tags.map(tag=><span key={tag.en}>+ {tr(language,tag.en,tag.zh)}</span>)}</div><button className="product-primary" onClick={() => setSelected(null)}>{labels.preview}</button></article></div>}
  </main>;
}
