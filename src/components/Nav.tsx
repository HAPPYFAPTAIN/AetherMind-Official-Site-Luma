"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AUX_NAV_LINKS, BRAND, ENTERPRISE_NAV, NAV_LINKS } from "@/lib/site";
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
  const { account } = useAccount();
  const { language, setLanguage } = useLanguage();

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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-line bg-bg-0/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto] items-center px-6 sm:h-[72px] lg:px-12 xl:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center gap-5 justify-self-start">
          <SiteLink href="/" className="flex items-center gap-3 text-white">
            <Mark />
            <span className="brand-name font-display text-[19px] font-semibold tracking-[0.04em] sm:text-[22px]">
              {tr(language, BRAND.en, BRAND.zh)}
            </span>
          </SiteLink>
        </div>

        <div data-primary-nav className="hidden items-center justify-self-center gap-[7.6px] xl:flex">
          <button data-showcase={ENTERPRISE_NAV.key} className="link-quiet whitespace-nowrap rounded-full px-2 py-2 text-[15px] font-medium">
            {tr(language, ENTERPRISE_NAV.label.en, ENTERPRISE_NAV.label.zh)}
          </button>
          {NAV_LINKS.map((l) => <SiteLink key={l.href} href={l.href} className="link-quiet whitespace-nowrap rounded-full px-2 py-2 text-[15px] font-medium">{tr(language, l.label.en, l.label.zh)}</SiteLink>)}
          {AUX_NAV_LINKS.map((l) => <a key={l.href} href={l.href} className="link-quiet whitespace-nowrap rounded-full px-2 py-2 text-[15px] font-medium">{tr(language, l.label.en, l.label.zh)}</a>)}
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
            onClick={enterAccount}
            className="hidden whitespace-nowrap rounded-full border border-line-strong bg-white/[0.03] px-4 py-2 text-[15.5px] font-medium text-white transition-colors hover:border-accent/40 hover:bg-accent-soft sm:flex"
          >
            {account ? tr(language, "Dashboard", "控制台") : tr(language, "Sign in", "登录")}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`overflow-hidden border-b border-line bg-bg-0/95 transition-[max-height,opacity] duration-200 xl:hidden ${
          open
            ? "max-h-[calc(100dvh-72px)] overflow-y-auto opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-6 py-6">
          <button data-showcase={ENTERPRISE_NAV.key} onClick={() => setOpen(false)} className="block w-full rounded-lg px-3 py-3 text-left text-lg font-medium text-text-secondary hover:text-white">{tr(language, ENTERPRISE_NAV.label.en, ENTERPRISE_NAV.label.zh)}</button>
          {NAV_LINKS.map((l) => <SiteLink key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-lg font-medium text-text-secondary hover:text-white">{tr(language, l.label.en, l.label.zh)}</SiteLink>)}
          {AUX_NAV_LINKS.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-lg font-medium text-text-secondary hover:text-white">{tr(language, l.label.en, l.label.zh)}</a>)}
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
