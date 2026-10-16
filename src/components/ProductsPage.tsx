"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { Nav } from "@/components/Nav";
import { assetUrl } from "@/lib/asset-url";
import { tr } from "@/lib/i18n";
import { productAssets } from "@/data/productAssets";
import { ProductPurchase } from "./ProductPurchase";
import { accountApi, type AccountProduct } from "@/lib/account-client";
import "./products.css";
import { SiteLink } from "./primitives/SiteLink";

type Product = {
  id: string;
  image: string;
  category: string;
  title: { zh: string; en: string };
  body: { zh: string; en: string };
  tags: { zh: string; en: string }[];
  state: { zh: string; en: string };
};

const PRODUCTS: Product[] = [
  { id: "platform", image: productAssets.platform, category: "platform", title: { zh: "以太智元平台", en: "AetherMind Platform" }, body: { zh: "从任务准备到结果理解，一套面向科学研究的计算工作区。", en: "A research workspace for preparing jobs, running compute and understanding results." }, tags: [{ zh: "科研工作区", en: "Research workspace" }, { zh: "HPC", en: "HPC" }], state: { zh: "样板可用", en: "Preview ready" } },
  { id: "lammps", image: productAssets.lammps, category: "simulation", title: { zh: "LAMMPS 计算引擎", en: "LAMMPS Compute Engine" }, body: { zh: "面向分子动力学的 GPU 与 HPC 任务编排、监测和轨迹分析。", en: "GPU and HPC orchestration, monitoring and trajectory analysis for molecular dynamics." }, tags: [{ zh: "分子动力学", en: "Molecular dynamics" }, { zh: "GPU", en: "GPU" }], state: { zh: "持续建设", en: "In development" } },
  { id: "md-exp", image: productAssets.mdExp, category: "simulation", title: { zh: "MD EXP", en: "MD EXP" }, body: { zh: "分子模拟智能体、模型对话与 dsh 科研工作流。", en: "Molecular simulation agent, model conversations and the dsh research workflow." }, tags: [{ zh: "LAMMPS / ReaxFF", en: "LAMMPS / ReaxFF" }, { zh: "dsh", en: "dsh" }], state: { zh: "已接入入口", en: "Entry connected" } },
  { id: "agent", image: productAssets.aiAgent, category: "agent", title: { zh: "科学智能体", en: "Science Agents" }, body: { zh: "让研究问题转化为可执行的计算步骤，保留参数、证据和结果上下文。", en: "Turn research questions into executable steps while keeping parameters, evidence and context together." }, tags: [{ zh: "AI for Science", en: "AI for Science" }, { zh: "工作流", en: "Workflow" }], state: { zh: "样板可用", en: "Preview ready" } },
  { id: "learn-everything", image: productAssets.learning, category: "agent", title: { zh: "Learn Everything 学习 Agent", en: "Learn Everything Agent" }, body: { zh: "从选题、学习路线到复习、测验和学习看板的一体化学习工作台。", en: "An integrated learning workspace from topic discovery and routes to review, quizzes and progress." }, tags: [{ zh: "学习路线", en: "Learning routes" }, { zh: "FSRS 复习", en: "FSRS review" }, { zh: "知识库问答", en: "RAG Q&A" }], state: { zh: "邀请码激活", en: "Invite activation" } },
  { id: "materials", image: productAssets.materials, category: "research", title: { zh: "材料计算", en: "Materials Computing" }, body: { zh: "围绕结构、缺陷、界面与能量景观组织材料研究过程。", en: "Organize materials research around structures, defects, interfaces and energy landscapes." }, tags: [{ zh: "材料模拟", en: "Materials simulation" }, { zh: "结构计算", en: "Structure compute" }], state: { zh: "即将开放", en: "Coming soon" } },
  { id: "chemistry", image: productAssets.chemistry, category: "research", title: { zh: "化学与分子计算", en: "Chemistry & Molecular Computing" }, body: { zh: "从分子结构到反应路径，用统一环境记录计算与判断。", en: "Track molecular structures, reaction paths and decisions in one environment." }, tags: [{ zh: "量子化学", en: "Quantum chemistry" }, { zh: "分子计算", en: "Molecular compute" }], state: { zh: "即将开放", en: "Coming soon" } },
  { id: "biology", image: productAssets.biology, category: "research", title: { zh: "生物计算", en: "Biological Computing" }, body: { zh: "面向生物分子建模、结构分析与可复现实验流程。", en: "A focused workspace for biomolecular modeling, structure analysis and reproducible experiments." }, tags: [{ zh: "分子建模", en: "Molecular modeling" }, { zh: "生物计算", en: "Biocomputing" }], state: { zh: "即将开放", en: "Coming soon" } },
];

const CATEGORIES = [
  ["all", { zh: "全部产品", en: "All products" }],
  ["platform", { zh: "平台", en: "Platform" }],
  ["simulation", { zh: "模拟与计算", en: "Simulation & compute" }],
  ["agent", { zh: "科学智能体", en: "Science agents" }],
  ["research", { zh: "研究工作区", en: "Research workspaces" }],
] as const;


function ProductArtwork({
  src, sizes, priority = false,
}: { src: string; sizes: string; priority?: boolean }) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={[640, 1280, 1536].map(width => `${assetUrl(src)}-${width}.webp ${width}w`).join(", ")}
        sizes={sizes}
      />
      <Image
        src={assetUrl(`${src}-1280.webp`)}
        alt="" fill unoptimized sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </picture>
  );
}

function Arrow({ down = false }: { down?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={down ? "product-arrow is-down" : "product-arrow"}>
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

function ProductDialog({ product, zh, onClose }: { product: Product; zh: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerStartedOnBackdrop = useRef(false);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialogRef}
      className="product-modal"
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClose={onClose}
      onKeyDown={event => {
        if (event.key !== "Tab") return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )).filter(control => control.getClientRects().length > 0);
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onPointerDown={event => { pointerStartedOnBackdrop.current = event.target === event.currentTarget; }}
      onClick={event => { if (event.target === event.currentTarget && pointerStartedOnBackdrop.current) onClose(); }}
    >
      <div className="product-modal-content">
        <div className="product-modal-art"><ProductArtwork src={product.image} sizes="(max-width: 640px) 100vw, 600px" /></div>
        <button type="button" className="product-modal-close" onClick={onClose} aria-label={zh ? "关闭产品详情" : "Close product details"} autoFocus>
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>
        <div className="product-modal-copy">
          <p className="product-state">{zh ? product.state.zh : product.state.en}</p>
          <h2 id="product-modal-title">{zh ? product.title.zh : product.title.en}</h2>
          <p id="product-modal-description">{zh ? product.body.zh : product.body.en}</p>
          <div className="product-tags">{product.tags.map(tag => <span key={tag.en}>{zh ? tag.zh : tag.en}</span>)}</div>
          <ProductPurchase key={product.id} productId={product.id} zh={zh} />
        </div>
      </div>
    </dialog>
  );
}

export function ProductsPage() {
  const { language } = useLanguage();
  const zh = language === "zh";
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"default" | "name">("default");
  const [selected, setSelected] = useState<Product | null>(null);
  const [catalog, setCatalog] = useState<AccountProduct[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    accountApi<{ items: AccountProduct[] }>("/products")
      .then(result => { if (active) setCatalog(result.items); })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase(language);
    const current = PRODUCTS.map(product => {
      const live = catalog.find(item => item.id === product.id);
      if (!live) return product;
      return {
        ...product,
        title: { zh: live.name, en: live.name_en },
        body: { ...product.body, zh: live.description },
        state: product.id === "learn-everything" && live.status !== "AVAILABLE"
          ? product.state
          : live.status === "AVAILABLE"
            ? { zh: `${live.price.toLocaleString()} 积分起`, en: `From ${live.price.toLocaleString()} credits` }
            : { zh: "暂未开放购买", en: "Not for sale yet" },
      };
    });
    const result = current.filter(product => {
      const text = [product.title.en, product.title.zh, product.body.en, product.body.zh,
        ...product.tags.flatMap(tag => [tag.en, tag.zh])].join(" ").toLocaleLowerCase(language);
      return (category === "all" || product.category === category) && (!query || text.includes(query));
    });
    return sort === "name" ? [...result].sort((a, b) => a.title[language].localeCompare(b.title[language], language)) : result;
  }, [category, search, sort, catalog, language]);

  useEffect(() => {
    if (!gridRef.current || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("product-revealed");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08 });
    gridRef.current.querySelectorAll(".product-card:not(.product-revealed)").forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, [filtered]);

  const categoryLabel = CATEGORIES.find(([value]) => value === category)?.[1] ?? CATEGORIES[0][1];
  const resetFilters = () => { setCategory("all"); setSearch(""); setSort("default"); };

  return (
    <main className="products-page">
      <Nav />
      <section className="products-hero" aria-labelledby="products-title">
        <div className="products-hero-art">
          <ProductArtwork src={productAssets.hero} sizes="(max-width: 680px) 100vw, 75vw" priority />
        </div>
        <div className="products-container products-hero-inner">
          <div className="products-hero-copy">
            <p className="products-eyebrow">{zh ? "以太智元 · 科学计算产品" : "AETHERMIND · RESEARCH TOOLS"}</p>
            <h1 id="products-title">{zh ? <>让研究，<br />从问题走向结果。</> : <>From question<br />to result.</>}</h1>
            <p className="products-hero-description">{zh
              ? "从原子尺度模拟到科学智能工作流，为每一个研究问题准备一套可执行的工具。"
              : "From atom-scale simulation to science agents. A focused set of tools for real research questions."}</p>
            <a href="#product-catalog" className="products-browse">{zh ? "浏览产品" : "Explore the collection"}<Arrow down /></a>
          </div>
          <p className="products-art-caption">{zh ? "尺度之间" : "Between scales"}<span>{zh ? "科学概念视觉" : "Scientific concept artwork"}</span></p>
        </div>
      </section>

      <section id="product-catalog" className="products-container products-catalog" aria-labelledby="products-catalog-title">
        <div className="products-catalog-heading">
          <div>
            <p className="products-eyebrow">{zh ? "为研究，选择合适的工具" : "BUILT AROUND YOUR RESEARCH"}</p>
            <h2 id="products-catalog-title">{zh ? "产品与研究工作区" : "Products & workspaces"}</h2>
          </div>
          <p>{zh ? "计算、探索与理解，\n在同一个研究语境中展开。" : "Compute, explore and understand.\nKeep your research in context."}</p>
        </div>

        <div className="products-discovery">
          <div className="products-category-tabs" role="group" aria-label={zh ? "产品分类" : "Product categories"}>
            {CATEGORIES.map(([value, label]) => (
              <button type="button" key={value} aria-pressed={category === value} aria-controls="products-results" onClick={() => setCategory(value)}>
                {tr(language, label.en, label.zh)}
              </button>
            ))}
          </div>
          <div className="products-catalog-tools">
            <label className="products-search">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.5" /></svg>
              <span className="sr-only">{zh ? "搜索产品" : "Search products"}</span>
              <input ref={searchRef} type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder={zh ? "搜索名称、领域或关键词" : "Search names, fields or keywords"} aria-controls="products-results" />
            </label>
            <label className="products-sort">
              <span>{zh ? "排序" : "Sort"}</span>
              <select value={sort} onChange={event => setSort(event.target.value as "default" | "name")}>
                <option value="default">{zh ? "默认顺序" : "Default order"}</option>
                <option value="name">{zh ? "按名称" : "By name"}</option>
              </select>
            </label>
          </div>
        </div>

        <div className="products-result-summary">
          <p role="status" aria-live="polite" aria-atomic="true">
            {tr(language, categoryLabel.en, categoryLabel.zh)}<span> / </span>{zh ? `${filtered.length} 款产品` : `${filtered.length} ${filtered.length === 1 ? "product" : "products"}`}
          </p>
          {(search || category !== "all") && <button type="button" onClick={resetFilters}>{zh ? "重置筛选" : "Reset filters"}</button>}
        </div>

        <div id="products-results" ref={gridRef} className="products-grid">
          {filtered.map(product => (
            <article key={product.id} className="product-card" data-product={product.id} aria-labelledby={`product-${product.id}`}>
              <div className="product-image">
                <ProductArtwork src={product.image} sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 1100px) 46vw, (max-width: 1360px) 30vw, 403px" />
              </div>
              <div className="product-card-body">
                <div className="product-meta">
                  <span>{tr(language, CATEGORIES.find(([value]) => value === product.category)![1].en, CATEGORIES.find(([value]) => value === product.category)![1].zh)}</span>
                  <span className="product-state">{tr(language, product.state.en, product.state.zh)}</span>
                </div>
                <h3 id={`product-${product.id}`}>{tr(language, product.title.en, product.title.zh)}</h3>
                <p className="product-description">{tr(language, product.body.en, product.body.zh)}</p>
                <div className="product-tags">{product.tags.map(tag => <span key={tag.en}>{tr(language, tag.en, tag.zh)}</span>)}</div>
                {product.id === "learn-everything"
                  ? <SiteLink className="product-detail" href="/products/learn-everything/" aria-label={zh ? `查看${product.title.zh}` : `Explore ${product.title.en}`}>{zh ? "了解产品" : "Explore product"}<Arrow /></SiteLink>
                  : <button type="button" className="product-detail" onClick={() => setSelected(product)} aria-label={zh ? `查看${product.title.zh}` : `Explore ${product.title.en}`} aria-haspopup="dialog">{zh ? "了解产品" : "Explore product"}<Arrow /></button>}
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && <div className="products-empty">
          <h3>{zh ? "暂时没有匹配的产品" : "No matching products"}</h3>
          <p>{zh ? "试试其他关键词，或查看全部产品。" : "Try another keyword, or return to the full collection."}</p>
          <button type="button" onClick={() => { resetFilters(); searchRef.current?.focus(); }}>{zh ? "查看全部产品" : "View all products"}<Arrow /></button>
        </div>}
      </section>

      <footer className="products-footer">
        <div className="products-container">
          <div><p className="products-eyebrow">AETHERMIND</p><p>{zh ? "让工具回归研究本身。" : "Keep the focus on your research."}</p></div>
          <nav aria-label={zh ? "产品页相关链接" : "Product resources"}>
            <SiteLink href="/community/">{zh ? "进入社区交流" : "Join the community"}<Arrow /></SiteLink>
            <SiteLink href="/dashboard/">{zh ? "我的产品与权益" : "My products & access"}<Arrow /></SiteLink>
          </nav>
        </div>
        <div className="products-container products-footer-note">
          <span>{zh ? "产品介绍与权益购买，统一使用以太智元账号。" : "Explore products and manage access with your AetherMind account."}</span>
          <SiteLink href="/">{zh ? "返回首页" : "Back to home"}<Arrow /></SiteLink>
        </div>
      </footer>
      {selected && <ProductDialog key={selected.id} product={selected} zh={zh} onClose={() => setSelected(null)} />}
    </main>
  );
}
