"use client";
import { ThemedProductArt } from "./ThemedProductArt";
import { Nav } from "./Nav";
import { SiteLink } from "./primitives/SiteLink";
import { useLanguage } from "./LanguageProvider";
import { ProductPurchase } from "./ProductPurchase";
import type { Product } from "@/data/products";
import "./products.css";
import "./product-detail.css";

export function ProductDetailPage({ product }: { product: Product }) {
  const { language } = useLanguage();
  const zh = language === "zh";
  return <main className="products-page product-page-detail" lang={zh ? "zh-CN" : "en"}>
    <Nav />
    <div className="products-container detail-breadcrumb"><SiteLink href="/products/">{zh ? "全部产品" : "All products"}</SiteLink><span>/</span><span>{product.title[language]}</span></div>
    <section className="products-container detail-layout">
      <div className="detail-copy"><p className="products-eyebrow">{product.state[language]}</p>
        <h1>{product.title[language]}</h1><p className="detail-description">{product.body[language]}</p>
        <div className="product-tags">{product.tags.map(tag => <span key={tag.en}>{tag[language]}</span>)}</div>
        <SiteLink className="products-browse" href="/enterprise/#contact">{zh ? "沟通使用需求" : "Discuss your requirements"} ↗</SiteLink>
      </div>
      <div className="detail-art"><ThemedProductArt base={product.image} alt={zh ? `${product.title.zh}概念视觉` : `${product.title.en} concept artwork`}  sizes="(max-width: 760px) 90vw, 50vw" priority /></div>
    </section>
    <section className="products-container detail-access"><div><h2>{zh ? "了解当前开放情况" : "Current availability"}</h2><p>{zh ? "具体套餐与开放状态以账号系统返回的信息为准。已有权益可从工作台进入。" : "Availability and packages are provided by the account service. Existing access is available in your workspace."}</p></div><ProductPurchase productId={product.id} zh={zh} /></section>
  </main>;
}
