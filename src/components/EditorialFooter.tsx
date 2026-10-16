"use client";

import { SiteLink } from "./primitives/SiteLink";
import { useLanguage } from "./LanguageProvider";
import "./editorial-shared.css";

export function EditorialFooter() {
  const { language } = useLanguage();
  const zh = language === "zh";
  return <footer className="editorial-footer">
    <div className="editorial-footer-inner">
      <SiteLink className="editorial-footer-brand" href="/">{zh ? "以太智元" : "AetherMind"}</SiteLink>
      <nav aria-label={zh ? "页脚导航" : "Footer navigation"}>
        <SiteLink href="/products/">{zh ? "探索产品" : "Products"} ↗</SiteLink>
        <SiteLink href="/community/">{zh ? "研究者社区" : "Community"} ↗</SiteLink>
        <SiteLink href="/about/">{zh ? "关于我们" : "About"} ↗</SiteLink>
      </nav>
    </div>
    <div className="editorial-footer-note"><span>© {new Date().getFullYear()} AetherMind</span><span>{zh ? "让计算与知识，服务于科学发现。" : "Compute and knowledge, in service of discovery."}</span><SiteLink href="/legal/">{zh ? "条款与隐私" : "Terms & privacy"}</SiteLink></div>
  </footer>;
}
