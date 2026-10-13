"use client";

import Image from "next/image";
import { Nav } from "./Nav";
import { SiteLink } from "./primitives/SiteLink";
import { useLanguage } from "./LanguageProvider";
import { navigation, type InformationPageKey } from "@/data/navigation";
import { productAssets } from "@/data/productAssets";
import { assetUrl } from "@/lib/asset-url";
import { tr } from "@/lib/i18n";
import "./information.css";

const content = {
  enterprise: {
    heading: ["A workspace built around your research.", "围绕研究，连接团队与算力。"],
    image: productAssets.hero,
    details: [
      ["Discuss data boundaries, access requirements and the environment your team needs before choosing a deployment approach.", "从数据边界、访问权限和现有环境出发，讨论适合团队的部署方式。"],
      ["Map existing GPU and HPC resources to job preparation, execution, monitoring and analysis.", "梳理现有 GPU 与 HPC 资源，将任务准备、运行监测和结果分析连接起来。"],
      ["Define how parameters, evidence and results move between people, so the workflow remains understandable and traceable.", "明确参数、证据与结果如何在团队中流转，让工作过程可理解、可追溯。"],
    ],
    closing: ["Tell us about your research environment.", "从你的研究环境开始聊起。"],
  },
  careers: {
    heading: ["Build closer to the science.", "把对科学的好奇，变成可用的工具。"],
    image: productAssets.aiAgent,
    details: [
      ["We welcome conversations about scientific software, interactive tools and reliable computing systems.", "欢迎围绕科学软件、交互工具与可靠计算系统，与我们交流你的经验和想法。"],
      ["Bring a research question, a method or a workflow that deserves better tools.", "带着研究问题、方法或需要改进的工作流程，探讨科学计算与智能体的合作可能。"],
      ["Introduce your interests and relevant work by email. Specific opportunities and ways of working together can be discussed directly.", "可以通过邮件介绍你的关注方向与相关作品，具体机会和合作方式由双方进一步沟通。"],
    ],
    closing: ["Start with a question you care about.", "从一个你关心的问题开始。"],
  },
  about: {
    heading: ["Computation, in service of discovery.", "让计算，服务于科学发现。"],
    image: productAssets.materials,
    details: [
      ["AetherMind focuses on AI for Science: molecular simulation, materials research and the tools around scientific computation.", "以太智元关注 AI for Science，围绕分子模拟、材料研究与科学计算，组织研究所需的工具。"],
      ["Connect preparation, computation and interpretation. Preserve the parameters and context needed to revisit a result.", "连接准备、计算与结果理解，保留参数和上下文，让研究过程能够被回看与复现。"],
      ["For product questions, research collaboration or deployment discussions, contact the team by email.", "产品咨询、科研合作或部署讨论，都可以通过邮件与团队联系。"],
    ],
    closing: ["Bring your next research question.", "一起讨论下一个研究问题。"],
  },
} as const;

export function InformationPage({ kind }: { kind: InformationPageKey }) {
  const { language } = useLanguage();
  const t = (pair: readonly [string, string]) => tr(language, pair[0], pair[1]);
  const item = navigation.find(entry => entry.id === kind)!;
  const page = content[kind];
  return <main className="information-page" lang={language === "zh" ? "zh-CN" : "en"}>
    <Nav />
    <section className="information-hero">
      <div className="information-art"><Image src={assetUrl(`${page.image}-1536.webp`)} alt="" fill unoptimized priority sizes="(max-width: 700px) 100vw, 70vw" /></div>
      <div className="information-container information-hero-copy">
        <p className="information-label">{t(item.title)}</p>
        <h1>{t(page.heading)}</h1>
        <p className="information-lead">{t(item.description)}</p>
        <a className="information-contact" href="#details">{tr(language, "Discover more", "继续了解")} <span aria-hidden="true">↓</span></a>
      </div>
    </section>
    <section id="details" className="information-container information-details" aria-label={t(item.title)}>
      {item.topics.map((topic, index) => <article key={topic[0]} id={`detail-${index}`}>
        <h2>{t(topic)}</h2><p>{t(page.details[index])}</p>
      </article>)}
    </section>
    <footer className="information-container information-footer">
      <h2>{t(page.closing)}</h2>
      <a className="information-contact" href="mailto:superhim1000@foxmail.com">{tr(language, "Contact the team", "联系团队")} <span aria-hidden="true">↗</span></a>
      <nav aria-label={tr(language, "Related pages", "相关页面")}><SiteLink href="/products/">{tr(language, "Explore products", "浏览产品")}</SiteLink><SiteLink href="/community/">{tr(language, "Visit community", "进入社区")}</SiteLink><SiteLink href="/">{tr(language, "Back to home", "返回首页")}</SiteLink></nav>
    </footer>
  </main>;
}
