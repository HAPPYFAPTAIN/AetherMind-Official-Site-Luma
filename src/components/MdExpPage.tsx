"use client";

import { ThemedProductArt } from "./ThemedProductArt";
import { Nav } from "./Nav";
import { ProductPurchase } from "./ProductPurchase";
import { useLanguage } from "./LanguageProvider";
import { SiteLink } from "./primitives/SiteLink";
import { productAssets } from "@/data/productAssets";
import "./products.css";

/** Keep the published product URL in the source export, not a patched release. */
export function MdExpPage() {
  const { language } = useLanguage();
  const zh = language === "zh";
  return (
    <main className="products-page" lang={zh ? "zh-CN" : "en"}>
      <Nav />
      <section className="products-hero">
        <div className="products-hero-art" aria-hidden="true">
          <ThemedProductArt base={productAssets.mdExp} alt=""  sizes="75vw" priority />
        </div>
        <div className="products-container products-hero-inner">
          <div className="products-hero-copy">
            <p className="products-eyebrow">LAMMPS / ReaxFF · dsh</p>
            <h1>MD EXP</h1>
            <p className="products-hero-description">
              {zh ? "分子模拟智能体、模型对话与科研工作流。从控制台进入工作区，管理你的计算任务。" : "Molecular simulation, model conversations and research workflows. Enter your workspace from the console to manage compute tasks."}
            </p>
            <SiteLink className="products-browse" href="/console/">
              {zh ? "进入控制台" : "Open console"} →
            </SiteLink>
          </div>
        </div>
      </section>
      <section className="products-container products-catalog" aria-label={zh ? "产品权益" : "Product access"}>
        <ProductPurchase productId="md-exp" zh={zh} />
        <SiteLink className="products-browse" href="/products/">{zh ? "查看全部产品" : "All products"} →</SiteLink>
      </section>
    </main>
  );
}
