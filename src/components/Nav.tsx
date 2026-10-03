"use client";

import { useEffect, useState } from "react";
import { BRAND, NAV_LINKS } from "@/lib/site";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/i18n";
import { assetUrl } from "@/lib/asset-url";
import { LoginPage } from "@/components/LoginPage";

function Mark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <circle cx="13" cy="13" r="3.2" fill="var(--accent)" />
      <ellipse
        cx="13"
        cy="13"
        rx="10.5"
        ry="4.4"
        stroke="var(--text-secondary)"
        strokeWidth="1"
        transform="rotate(30 13 13)"
      />
      <ellipse
        cx="13"
        cy="13"
        rx="10.5"
        ry="4.4"
        stroke="var(--text-tertiary)"
        strokeWidth="1"
        transform="rotate(-30 13 13)"
      />
      <ellipse
        cx="13"
        cy="13"
        rx="10.5"
        ry="4.4"
        stroke="var(--text-faint)"
        strokeWidth="1"
        transform="rotate(90 13 13)"
      />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-bg-0/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 sm:h-[72px] lg:px-12">
        <a href="#top" className="flex items-center gap-3 text-white">
          <Mark />
          <span className="font-display text-[17px] font-semibold tracking-[0.22em]">
            {tr(language, BRAND.en, BRAND.zh)}
          </span>
        </a>

        {/* Text spacing: (8px + 4px + 8px) × 1.18 = 23.6px. */}
        <div className="hidden items-center gap-[7.6px] xl:flex">
          {NAV_LINKS.map((l) =>
            "pending" in l && l.pending ? (
              <span
                key={l.href}
                aria-disabled="true"
                className="link-quiet whitespace-nowrap rounded-full px-2 py-2 text-[15px] font-medium"
              >
                {tr(language, l.label.en, l.label.zh)}
              </span>
            ) : (
              <a
                key={l.href}
                href={
                  "externalPath" in l && l.externalPath
                    ? assetUrl(l.href)
                    : l.href
                }
                className="link-quiet whitespace-nowrap rounded-full px-2 py-2 text-[15px] font-medium"
              >
                {tr(language, l.label.en, l.label.zh)}
              </a>
            ),
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
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
            onClick={() => setLoginOpen(true)}
            className="hidden whitespace-nowrap rounded-full border border-line-strong bg-white/[0.03] px-4 py-2 text-[15.5px] font-medium text-white transition-colors hover:border-accent/40 hover:bg-accent-soft sm:flex"
          >
            {tr(language, "Sign in", "登录")}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`overflow-hidden border-b border-line bg-bg-0/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 xl:hidden ${
          open
            ? "max-h-[calc(100dvh-72px)] overflow-y-auto opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-6 py-6">
          {NAV_LINKS.map((l) =>
            "pending" in l && l.pending ? (
              <span
                key={l.href}
                aria-disabled="true"
                className="block rounded-lg px-3 py-3 text-lg font-medium text-text-secondary"
              >
                {tr(language, l.label.en, l.label.zh)}
              </span>
            ) : (
              <a
                key={l.href}
                href={
                  "externalPath" in l && l.externalPath
                    ? assetUrl(l.href)
                    : l.href
                }
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-lg font-medium text-text-secondary hover:text-white"
              >
                {tr(language, l.label.en, l.label.zh)}
              </a>
            ),
          )}
          <button
            type="button"
            onClick={() => { setOpen(false); setLoginOpen(true); }}
            className="mt-3 flex items-center justify-center gap-2 rounded-full border border-line-strong bg-white/[0.04] px-4 py-3 text-[15px] font-medium text-white"
          >
            {tr(language, "Sign in", "登录")}
          </button>
        </div>
      </div>
      {loginOpen && <LoginPage overlay onClose={() => setLoginOpen(false)} />}
    </header>
  );
}
