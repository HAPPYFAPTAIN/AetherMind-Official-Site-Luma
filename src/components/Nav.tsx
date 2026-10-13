"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BRAND } from "@/lib/site";
import { navigation, productNavigation } from "@/data/navigation";
import { usePathname } from "next/navigation";
import "./navigation.css";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/i18n";
import { LoginPage } from "@/components/LoginPage";
import { hasAccountSession } from "@/lib/account-client";
import { useAccount } from "@/lib/use-account";
import { BrandMark } from "./primitives/BrandMark";
import { SiteLink } from "./primitives/SiteLink";
import { suspendBackgroundActivity } from "@/lib/background-activity";

export function Mark() {
  return <BrandMark />;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reveal = (id: string) => { clearTimeout(closeTimer.current); setActive(id); };
  const leave = () => { closeTimer.current = setTimeout(() => setActive(null), 160); };
  const closeNavigation = () => { clearTimeout(closeTimer.current); setActive(null); setOpen(false); };
  useEffect(() => () => clearTimeout(closeTimer.current), []);
  useEffect(() => {
    if (!active) return;
    const dismiss = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [active]);
  const { account } = useAccount();
  const { language, setLanguage } = useLanguage();
  const t = (pair: readonly [string, string]) => tr(language, pair[0], pair[1]);

  const enterAccount = () => {
    if (account || hasAccountSession()) router.push("/dashboard/");
    else setLoginOpen(true);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const resume = suspendBackgroundActivity();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      resume();
    };
  }, [open]);

  return (
    <header
      className={`site-navigation fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || active || open
          ? "border-b border-line bg-bg-0/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto] items-center px-6 sm:h-[72px] lg:px-12 xl:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center gap-5 justify-self-start">
          <SiteLink href="/" className="flex items-center gap-3 text-white">
            <Mark />
            <span lang={language === "zh" ? "zh-CN" : "en"} className="brand-name font-display text-[19px] font-semibold tracking-[0.04em] sm:text-[22px]">
              {tr(language, BRAND.en, BRAND.zh)}
            </span>
          </SiteLink>
        </div>

        <div data-primary-nav className="hidden items-center justify-self-center xl:flex">
          {navigation.map(item => <div key={item.id} className="nav-entry"
            onPointerMove={event => { if (event.pointerType === "mouse") reveal(item.id); }}
            onPointerLeave={leave}
            onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null); }}
            onKeyDown={event => {
              if (event.key === "Escape") {
                event.preventDefault(); event.currentTarget.querySelector<HTMLAnchorElement>(".nav-destination")?.focus(); setActive(null);
              }
              if (event.key === "ArrowDown" && event.target === event.currentTarget.querySelector(".nav-destination")) {
                event.preventDefault(); reveal(item.id);
                const entry = event.currentTarget;
                requestAnimationFrame(() => entry.querySelector<HTMLAnchorElement>(".nav-preview a")?.focus());
              }
            }}>
            <SiteLink className="nav-destination" href={item.href} onClick={closeNavigation}
              onFocus={() => reveal(item.id)} aria-expanded={active === item.id} aria-controls={`nav-${item.id}`}
              aria-current={pathname?.startsWith(item.href.slice(0,-1)) ? "page" : undefined}>
              {t(item.title)}<svg aria-hidden="true" width="10" height="6" viewBox="0 0 10 6"><path d="m1 1 4 4 4-4" fill="none" stroke="currentColor" /></svg>
            </SiteLink>
            {active === item.id && <div className="nav-preview" id={`nav-${item.id}`}>
              <div className="nav-preview-inner">
                <div><p className="nav-preview-title">{t(item.title)}</p><p className="nav-preview-description">{t(item.description)}</p>
                  <SiteLink className="nav-preview-cta" href={item.href} onClick={closeNavigation}>{tr(language, "Explore", "进入")}{language === "zh" ? item.title[1] : ` ${item.title[0]}`} <span aria-hidden="true">↗</span></SiteLink>
                </div>
                <div className={`nav-preview-topics${item.id === "products" ? " nav-product-grid" : ""}`}>{item.id === "products" ? productNavigation.map(product => <SiteLink key={product.id} href={`/products/#product-${product.id}`} onClick={closeNavigation}>{t(product.title)}<span aria-hidden="true">↗</span></SiteLink>) : item.topics.map((topic, index) => <SiteLink key={topic[0]} href={item.href + (["enterprise","careers","about"].includes(item.id) ? `#detail-${index}` : "")} onClick={closeNavigation}>{t(topic)}<span aria-hidden="true">↗</span></SiteLink>)}</div>
              </div>
            </div>}
          </div>)}
        </div>

        <div className="flex items-center justify-self-end gap-2 sm:gap-3">
          <div
            className="flex h-9 items-center rounded-full border border-line-strong bg-white/[0.03] p-0.5"
            role="group"
            aria-label={tr(language, "Language", "语言")}
          >
            <button
              type="button"
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
              title="English"
              className={`h-8 min-w-8 rounded-full px-2 font-mono text-[12px] font-medium tracking-[0.08em] transition-colors ${
                language === "en"
                  ? "bg-white text-bg-0"
                  : "text-text-tertiary hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("zh")}
              aria-pressed={language === "zh"}
              title="中文"
              className={`h-8 min-w-8 rounded-full px-2 font-mono text-[12px] font-medium tracking-[0.08em] transition-colors ${
                language === "zh"
                  ? "bg-white text-bg-0"
                  : "text-text-tertiary hover:text-white"
              }`}
            >
              中
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={tr(language, "Toggle menu", "切换菜单")}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-white xl:hidden"
          >
            <div className="relative h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </div>
          </button>

          <button
            type="button"
            onClick={() => { setActive(null); enterAccount(); }}
            className="hidden whitespace-nowrap rounded-full border border-line-strong bg-white/[0.03] px-4 py-2 text-[15.5px] font-medium text-white transition-colors hover:border-accent/40 hover:bg-accent-soft sm:flex"
          >
            {account ? tr(language, "Dashboard", "控制台") : tr(language, "Sign in", "登录")}
          </button>
        </div>
      </nav>

      {/* Touch users receive the same destinations with visible descriptions. */}
      <div
        hidden={!open}
        className={`overflow-hidden border-b border-line bg-bg-0/95 transition-[max-height,opacity] duration-200 xl:hidden ${
          open
            ? "max-h-[calc(100dvh-72px)] overflow-y-auto opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-6 py-6">
          {navigation.map(item => <div key={item.id}><SiteLink href={item.href} onClick={closeNavigation} className="nav-mobile-link">
            <span>{t(item.title)} <span aria-hidden="true">↗</span></span>
            <small>{t(item.description)}</small>
          </SiteLink>{item.id === "products" && <div className="nav-mobile-products">{productNavigation.map(product => <SiteLink key={product.id} href={`/products/#product-${product.id}`} onClick={closeNavigation}>{t(product.title)} <span aria-hidden="true">↗</span></SiteLink>)}</div>}</div>)}
          <button
            type="button"
            onClick={() => { setOpen(false); enterAccount(); }}
            className="mt-3 flex items-center justify-center gap-2 rounded-full border border-line-strong bg-white/[0.04] px-4 py-3 text-[15px] font-medium text-white"
          >
            {account ? tr(language, "Dashboard", "控制台") : tr(language, "Sign in", "登录")}
          </button>
        </div>
      </div>
      {loginOpen && <LoginPage overlay onClose={() => setLoginOpen(false)} />}
    </header>
  );
}
