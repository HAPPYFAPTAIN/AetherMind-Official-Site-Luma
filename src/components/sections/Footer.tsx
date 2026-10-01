"use client";

import { BRAND, BRAND_DESC, BRAND_NAME } from "@/lib/site";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/i18n";

const COLUMNS = [
  {
    title: { en: "Platform", zh: "平台" },
    links: [
      { en: "Overview", zh: "平台概览" },
      { en: "Engine", zh: "计算引擎" },
      { en: "Simulation", zh: "模拟" },
      { en: "AI for Science", zh: "科学智能" },
      { en: "Workflow", zh: "科研流程" },
    ],
  },
  {
    title: { en: "Research", zh: "研究" },
    links: [
      { en: "Materials", zh: "材料" },
      { en: "Chemistry", zh: "化学" },
      { en: "Molecular Dynamics", zh: "分子动力学" },
      { en: "Energy", zh: "能源" },
      { en: "Publications", zh: "论文成果" },
    ],
  },
  {
    title: { en: "Resources", zh: "资源" },
    links: [
      { en: "Documentation", zh: "文档" },
      { en: "API Reference", zh: "API 参考" },
      { en: "Tutorials", zh: "教程" },
      { en: "Benchmarks", zh: "性能基准" },
      { en: "Status", zh: "服务状态" },
    ],
  },
  {
    title: { en: "Company", zh: "公司" },
    links: [
      { en: "About", zh: "关于我们" },
      { en: "Careers", zh: "加入我们" },
      { en: "Contact", zh: "联系方式" },
      { en: "Security", zh: "安全" },
      { en: "Legal", zh: "法律声明" },
    ],
  },
];

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display text-lg font-semibold tracking-[0.22em] text-white">
                {tr(language, BRAND.en, BRAND.zh)}
              </span>
            </div>
            <p className="zh-copy mt-4 max-w-xs text-[14px] leading-relaxed text-text-tertiary">
              {language === "zh"
                ? "科学智能计算平台，为分子模拟、材料研究和科学发现提供原生 AI\u00a0能力。"
                : `${BRAND_DESC} — AI-native scientific computing for molecular simulation, materials research and discovery.`}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-green shadow-[0_0_8px_var(--accent-green)]" />
              <span className="font-mono text-[11px] tracking-[0.14em] text-text-tertiary">
                {tr(language, "All systems operational", "所有系统运行正常")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {COLUMNS.map((column) => (
              <div key={column.title.en}>
                <h4 className="mono-label mb-5 whitespace-nowrap text-text-faint">
                  {tr(language, column.title.en, column.title.zh)}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.en}>
                      <a href="#" className="link-quiet whitespace-nowrap text-[14px]">
                        {tr(language, link.en, link.zh)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <span className="font-mono text-[12px] tracking-[0.08em] text-text-faint">
            © {new Date().getFullYear()} {tr(language, BRAND_NAME.en, BRAND_NAME.zh)}. {tr(language, "All rights reserved.", "版权所有。")}
          </span>
          <div className="flex gap-6 font-mono text-[12px] tracking-[0.08em] text-text-faint">
            <a href="#" className="whitespace-nowrap hover:text-text-secondary">
              {tr(language, "Privacy", "隐私")}
            </a>
            <a href="#" className="whitespace-nowrap hover:text-text-secondary">
              {tr(language, "Terms", "条款")}
            </a>
            <a href="#" className="whitespace-nowrap hover:text-text-secondary">
              {tr(language, "Accessibility", "无障碍")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
