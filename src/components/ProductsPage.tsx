"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { Nav } from "@/components/Nav";
import { assetUrl } from "@/lib/asset-url";
import { tr } from "@/lib/i18n";
import { productAssets } from "@/data/productAssets";
import { ProductPurchase } from "./ProductPurchase";
import { accountApi, type AccountProduct } from "@/lib/account-client";
import "./products.css";

type Product = {
  id: string;
  image: string;
  icon: string;
  category: string;
  title: { zh: string; en: string };
  body: { zh: string; en: string };
  tags: { zh: string; en: string }[];
  state: { zh: string; en: string };
  accent: string;
};

const PRODUCTS: Product[] = [
  { id: "platform", image: productAssets.platform, icon: "A", category: "platform", title: { zh: "以太智元平台", en: "AethericAI Platform" }, body: { zh: "从任务准备到结果理解，一套面向科学研究的计算工作区。", en: "A research workspace for preparing jobs, running compute and understanding results." }, tags: [{ zh: "科研工作区", en: "Research workspace" }, { zh: "HPC", en: "HPC" }], state: { zh: "样板可用", en: "Preview ready" }, accent: "#5b9bd5" },
  { id: "lammps", image: productAssets.lammps, icon: "L", category: "simulation", title: { zh: "LAMMPS 计算引擎", en: "LAMMPS Compute Engine" }, body: { zh: "面向分子动力学的 GPU 与 HPC 任务编排、监测和轨迹分析。", en: "GPU and HPC orchestration, monitoring and trajectory analysis for molecular dynamics." }, tags: [{ zh: "分子动力学", en: "Molecular dynamics" }, { zh: "GPU", en: "GPU" }], state: { zh: "持续建设", en: "In development" }, accent: "#607d9f" },
  { id: "md-exp", image: productAssets.lammps, icon: "M", category: "simulation", title: { zh: "MD EXP", en: "MD EXP" }, body: { zh: "分子模拟智能体、模型对话与 dsh 科研工作流。", en: "Molecular simulation agent, model conversations and the dsh research workflow." }, tags: [{ zh: "LAMMPS / ReaxFF", en: "LAMMPS / ReaxFF" }, { zh: "dsh", en: "dsh" }], state: { zh: "已接入入口", en: "Entry connected" }, accent: "#49bfd6" },
  { id: "agent", image: productAssets.aiAgent, icon: "S", category: "agent", title: { zh: "科学智能体", en: "Science Agents" }, body: { zh: "让研究问题转化为可执行的计算步骤，保留参数、证据和结果上下文。", en: "Turn research questions into executable steps while keeping parameters, evidence and context together." }, tags: [{ zh: "AI for Science", en: "AI for Science" }, { zh: "工作流", en: "Workflow" }], state: { zh: "样板可用", en: "Preview ready" }, accent: "#806da8" },
  { id: "learn-everything", image: productAssets.aiAgent, icon: "L", category: "agent", title: { zh: "Learn Everything 学习 Agent", en: "Learn Everything Agent" }, body: { zh: "从选题、学习路线到复习、测验和学习看板的一体化学习工作台。", en: "An integrated learning workspace from topic discovery and routes to review, quizzes and progress." }, tags: [{ zh: "学习路线", en: "Learning routes" }, { zh: "FSRS 复习", en: "FSRS review" }, { zh: "知识库问答", en: "RAG Q&A" }], state: { zh: "邀请码激活", en: "Invite activation" }, accent: "#5e75d5" },
  { id: "materials", image: productAssets.materials, icon: "M", category: "research", title: { zh: "材料计算", en: "Materials Computing" }, body: { zh: "围绕结构、缺陷、界面与能量景观组织材料研究过程。", en: "Organize materials research around structures, defects, interfaces and energy landscapes." }, tags: [{ zh: "材料模拟", en: "Materials simulation" }, { zh: "结构计算", en: "Structure compute" }], state: { zh: "即将开放", en: "Coming soon" }, accent: "#5f958d" },
  { id: "chemistry", image: productAssets.chemistry, icon: "C", category: "research", title: { zh: "化学与分子计算", en: "Chemistry & Molecular Computing" }, body: { zh: "从分子结构到反应路径，用统一环境记录计算与判断。", en: "Track molecular structures, reaction paths and decisions in one environment." }, tags: [{ zh: "量子化学", en: "Quantum chemistry" }, { zh: "分子计算", en: "Molecular compute" }], state: { zh: "即将开放", en: "Coming soon" }, accent: "#b98254" },
  { id: "biology", image: productAssets.biology, icon: "B", category: "research", title: { zh: "生物计算", en: "Biological Computing" }, body: { zh: "面向生物分子建模、结构分析与可复现实验流程。", en: "A focused workspace for biomolecular modeling, structure analysis and reproducible experiments." }, tags: [{ zh: "分子建模", en: "Molecular modeling" }, { zh: "生物计算", en: "Biocomputing" }], state: { zh: "即将开放", en: "Coming soon" }, accent: "#4b9d98" },
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
  const { language } = useLanguage();
  const zh = language === "zh";
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"popular" | "name">("popular");
  const [selected, setSelected] = useState<Product | null>(null);
  const [catalog, setCatalog] = useState<AccountProduct[]>([]);
  useEffect(() => {
    let active = true;
    accountApi<{ items: AccountProduct[] }>('/products').then(r => { if (active) setCatalog(r.items); }).catch(() => {});
    return () => { active = false; };
  }, []);
  const labels = zh ? { signIn: "登录", search: "搜索产品、算法或解决方案", sort: "排序", popular: "常用", alpha: "按名称", detail: "产品详情", preview: "打开样板", close: "关闭", hero: "科学计算产品", headline: "让研究从问题走向结果", sub: "从原子尺度模拟到科学智能工作流，为每一个研究问题准备一套可执行的工具。", all: "所有产品", catalogSub: "覆盖从分子模拟到科学智能的完整工具链" } : { signIn: "Sign in", search: "Search products, algorithms or solutions", sort: "Sort", popular: "Popular", alpha: "By name", detail: "Product details", preview: "Open preview", close: "Close", hero: "SCIENTIFIC COMPUTING PRODUCTS", headline: "Move research from question to result", sub: "From atom-scale simulation to science agents, a focused set of tools for real research questions.", all: "All products", catalogSub: "A focused toolchain from molecular simulation to scientific intelligence" };
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const current = PRODUCTS.map(product => {
      const live = catalog.find(p => p.id === product.id);
      return live ? { ...product, title: { zh: live.name, en: live.name_en }, body: { ...product.body, zh: live.description }, state: live.status === 'AVAILABLE' ? { zh: `${live.price} 积分起`, en: `From ${live.price} credits` } : { zh: '暂未开放购买', en: 'Not for sale yet' } } : product;
    });
    const result = current.filter((product) => (category === "all" || product.category === category) && (!query || `${product.title.en} ${product.title.zh} ${product.body.en} ${product.body.zh}`.toLowerCase().includes(query)));
    return sort === "name" ? [...result].sort((a, b) => a.title.en.localeCompare(b.title.en)) : result;
  }, [category, search, sort, catalog]);
  return <main className="products-page">
    <Nav />
    <section className="products-hero"><Image src={assetUrl(productAssets.hero)} alt="" fill priority unoptimized sizes="100vw" className="products-hero-image" /><div className="products-hero-wash" /><div className="products-container products-hero-inner"><div><p className="products-eyebrow">{labels.hero}</p><h1>{labels.headline}</h1><p>{labels.sub}</p></div></div></section>
    <div className="products-container products-category-tabs">{CATEGORIES.map(([value, label]) => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}><span className="products-tab-icon" aria-hidden>{value === "all" ? "▦" : value === "simulation" ? "⌁" : value === "agent" ? "✦" : value === "platform" ? "◇" : "◈"}</span>{tr(language, label.en, label.zh)}</button>)}</div>
    <section className="products-container products-catalog"><div className="products-catalog-heading"><div><h2>{labels.all}</h2><p>{labels.catalogSub}</p></div><div className="products-catalog-tools"><label><span className="sr-only">{labels.search}</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={labels.search} /></label><span>{labels.sort}</span><button className={sort === "popular" ? "active" : ""} onClick={() => setSort("popular")}>{labels.popular}⌄</button><button className={sort === "name" ? "active" : ""} onClick={() => setSort("name")}>{labels.alpha}</button></div></div><div className="products-grid">{filtered.map((product) => <article key={product.id} className="product-card" style={{ "--product-accent": product.accent } as React.CSSProperties}><div className="product-image"><Image src={assetUrl(product.image)} alt="" fill unoptimized sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="product-card-body"><span className="product-icon">{product.icon}</span><div className="product-state">{tr(language, product.state.en, product.state.zh)}</div><h3>{tr(language, product.title.en, product.title.zh)}</h3><p>{tr(language, product.body.en, product.body.zh)}</p><div className="product-tags">{product.tags.map((tag) => <span key={tag.en}>{tr(language, tag.en, tag.zh)}</span>)}</div>{product.id === "learn-everything" ? <a className="product-detail" href={assetUrl("/products/learn-everything/")}>{labels.detail} <span>→</span></a> : <button className="product-detail" onClick={() => setSelected(product)}>{labels.detail} <span>→</span></button>}</div></article>)}</div>{filtered.length === 0 && <div className="products-empty">{zh ? "没有找到相关产品。" : "No products match this search."}</div>}</section>
    <footer className="products-footer"><div className="products-container"><a href={assetUrl("/community/")}>{zh ? "进入社区交流" : "Join the community"}</a><span>{zh ? "产品介绍与权益购买，统一使用以太智元账号。" : "Explore products and manage access with your AethericAI account."}</span></div></footer>
    {selected && <div className="product-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><article className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title"><button className="product-modal-close" onClick={() => setSelected(null)} aria-label={labels.close}>×</button><span className="product-icon large">{selected.icon}</span><p className="products-eyebrow">{tr(language, selected.state.en, selected.state.zh)}</p><h2 id="product-modal-title">{tr(language, selected.title.en, selected.title.zh)}</h2><p>{tr(language, selected.body.en, selected.body.zh)}</p><div className="product-modal-list">{selected.tags.map((tag) => <span key={tag.en}>+ {tr(language, tag.en, tag.zh)}</span>)}</div><ProductPurchase key={selected.id} productId={selected.id} zh={zh} /></article></div>}
  </main>;
}
