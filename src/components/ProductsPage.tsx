"use client";

import { ThemedProductArt } from "./ThemedProductArt";
import { OfficialHero } from "./OfficialHero";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { Nav } from "@/components/Nav";
import { tr } from "@/lib/i18n";
import { accountApi, type AccountProduct } from "@/lib/account-client";
import "./products.css";
import { SiteLink } from "./primitives/SiteLink";

import { PRODUCTS, productHref } from "@/data/products";
import { productAssets } from "@/data/productAssets";

const CATEGORIES = [
  ["all", { zh: "全部产品", en: "All products" }],
  ["platform", { zh: "平台", en: "Platform" }],
  ["simulation", { zh: "模拟与计算", en: "Simulation & compute" }],
  ["agent", { zh: "科学智能体", en: "Science agents" }],
  ["research", { zh: "研究工作区", en: "Research workspaces" }],
] as const;


function ProductArtwork({ src, sizes, priority = false }: { src: string; sizes: string; priority?: boolean }) {
  return <ThemedProductArt base={src} sizes={sizes} priority={priority} />;
}

function Arrow({ down = false }: { down?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={down ? "product-arrow is-down" : "product-arrow"}>
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export function ProductsPage() {
  const { language } = useLanguage();
  const zh = language === "zh";
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"default" | "name">("default");
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
      <OfficialHero id="products-title" image={productAssets.productsHero}
        eyebrow={zh ? "科学计算产品" : "RESEARCH TOOLS"}
        title={zh ? <>让研究，<br /><span>从问题走向结果。</span></> : <>From question<br /><span>to result.</span></>}
        description={zh ? "从原子尺度模拟到科学智能工作流，为每一个研究问题准备一套可执行的工具。" : "From atom-scale simulation to science agents. A focused set of tools for real research questions."}
        actions={<a href="#product-catalog">{zh ? "浏览产品" : "Explore the collection"}<Arrow down /></a>}
      />

      <section id="product-catalog" className="products-container products-catalog" aria-labelledby="products-catalog-title">
        <div className="products-catalog-heading">
          <div>
            <h2 id="products-catalog-title">{zh ? "产品与研究工作区" : "Products & workspaces"}</h2>
          </div>
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
                <SiteLink className="product-detail" href={productHref(product.id)} aria-label={zh ? `查看${product.title.zh}` : `Explore ${product.title.en}`}>{zh ? "了解产品" : "Explore product"}<Arrow /></SiteLink>
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

      <section className="products-container product-guidance" aria-labelledby="product-guidance-title"><div><h2 id="product-guidance-title">{zh ? "从一个研究问题，找到适合的工具。" : "Find the right tool for your research question."}</h2><p>{zh ? "还没确定从哪款产品开始？告诉我们你的研究方向与现有环境。" : "Not sure where to start? Share your research focus and current environment."}</p></div><SiteLink className="products-browse" href="/enterprise/#contact">{zh ? "聊聊我的需求" : "Discuss my needs"}<Arrow /></SiteLink></section>
      <footer className="products-footer">
        <div className="products-container">
          <SiteLink href="/">{zh ? "以太智元" : "AetherMind"}</SiteLink>
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
    </main>
  );
}
