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
    heading: ["Bring science and engineering together.", "让计算走进科学问题。"],
    image: productAssets.aiAgent,
    details: [
      ["We are hiring a full-time computational chemistry engineer, focused on molecular dynamics (MD) and density functional theory (DFT), based in Dalian or Suzhou.", "我们正在招聘全职计算化学工程师，方向为分子动力学（MD）与密度泛函理论（DFT），工作地点为大连或苏州。"],
      ["Translate research questions into simulation plans, analyze results and help build reproducible scientific workflows.", "把研究问题转化为模拟方案，分析计算结果，参与构建可复现的科学计算工作流。"],
      ["Experience with AI is a plus. Contact us on WeCom to introduce your relevant research and projects.", "了解 AI 的候选人优先。欢迎通过企业微信，向我们介绍相关研究经历和项目。"],
    ],
    closing: ["Talk to us about joining the team.", "一起把研究问题，向前推进。"],
  },
  about: {
    heading: ["From research questions to scientific evidence.", "从研究问题出发，走向科学证据。"],
    image: productAssets.materials,
    details: [
      ["AetherMind focuses on AI for Science. We connect scientific computing with AI agents to explore research workflows spanning atomic-scale simulation and applications in biology, batteries, materials and chemistry.", "以太智元（AetherMind）专注于 AI for Science，将科学计算与 AI 智能体相结合，探索从原子尺度模拟到应用研究的工作方式，关注生物、电池、材料与化学等方向。"],
      ["Our Auto-Research approach connects literature, data and research goals with hypotheses, computational validation, analysis and experimental comparison. Computation helps screen candidates; experimental evidence is an essential part of validation.", "我们以 Auto-Research 研究闭环连接文献、数据与研究目标，贯通候选假设、计算验证、结果分析与实验对照。通过计算筛选待验证候选，让实验与模拟相互印证。"],
      ["Our interdisciplinary team brings together electronic structure theory, scientific software, LLM tool use, workflow orchestration and agent engineering. We explore research platforms, tailored agents and training services, while building toward new-material discovery and process optimization.", "团队能力覆盖电子结构理论、科研软件开发、大模型工具调用、工作流编排与智能体工程。围绕科研平台、定制化智能体与培训服务，逐步探索新材料发现与材料制备工艺优化。"],
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
    {kind === "about" && <section className="information-container research-process" aria-labelledby="process-title">
      <p className="information-label">AUTO-RESEARCH</p>
      <h2 id="process-title">{tr(language, "A connected research process", "让研究的每一步相互连接")}</h2>
      <ol>{[
        ["Research input", "研究输入", "Literature, data and objectives", "论文、数据与目标"],
        ["Hypotheses", "候选假设", "Identify gaps and mechanisms", "识别空白与机制"],
        ["Validation plan", "验证路线", "Define computational questions", "确定计算问题"],
        ["Compute and review", "计算与验收", "Execute, analyze and check", "执行、分析与检查"],
        ["Research decisions", "研究决策", "Select candidates for validation", "筛选待验证候选"],
        ["Experimental validation", "实验验证", "Measure and compare", "实验测量与对照"],
      ].map((step, i) => <li key={step[0]}><span className="process-number">0{i + 1}</span><h3>{tr(language, step[0], step[1])}</h3><p>{tr(language, step[2], step[3])}</p></li>)}</ol>
    </section>}
    {kind === "careers" && <section id="open-role" className="information-container careers-role" aria-labelledby="role-title">
      <p className="information-label">{tr(language, "OPEN POSITION", "开放职位")}</p>
      <h2 id="role-title">{tr(language, "Computational Chemistry Engineer", "计算化学工程师")}</h2>
      <div className="role-meta"><span>MD / DFT</span><span>{tr(language, "Full-time", "全职")}</span><span>{tr(language, "Dalian / Suzhou", "大连 / 苏州")}</span></div>
      <div className="role-columns">
        <div><h3>{tr(language, "What you will work on", "岗位职责")}</h3><ul>{[
          ["Develop MD and DFT calculation plans for molecular and materials research, from model preparation to execution.", "围绕分子与材料研究问题制定 MD、DFT 计算方案，完成模型准备、参数设置与计算执行。"],
          ["Analyze structures, energies and simulation trajectories; review convergence and the limits of each method.", "分析结构、能量与模拟轨迹，检查计算收敛性和方法适用范围，整理结果与研究结论。"],
          ["Document methods and workflows, and collaborate on automation for scientific computation.", "记录计算方法与工作流程，协同推进科研计算流程的自动化与复现。"],
        ].map(pair => <li key={pair[0]}>{t(pair as [string,string])}</li>)}</ul></div>
        <div><h3>{tr(language, "What you bring", "任职要求")}</h3><ul>{[
          ["Knowledge of computational chemistry and practical experience with MD and DFT workflows.", "具备计算化学基础，熟悉 MD 与 DFT 的基本原理，能够开展相关计算与分析。"],
          ["Ability to read scientific literature, select appropriate methods and explain the assumptions behind results.", "能够阅读相关文献、选择适当方法，并清楚说明计算假设、结果及其局限。"],
          ["Careful documentation and clear communication with research and engineering colleagues.", "重视过程记录与结果复现，能够与科研、工程同事清晰沟通。"],
        ].map(pair => <li key={pair[0]}>{t(pair as [string,string])}</li>)}</ul>
        <p className="role-preferred">{tr(language, "Preferred: familiarity with AI, including applications to scientific workflows or research automation.", "加分项：了解 AI，有将其用于科研工作流、计算辅助或研究自动化的经验。")}</p></div>
      </div>
      <a className="information-contact" href="#contact">{tr(language, "Discuss this role", "联系并申请此岗位")} <span aria-hidden="true">↓</span></a>
    </section>}
    <footer id="contact" className="information-container information-footer">
      <h2>{t(page.closing)}</h2>
      <div className="contact-card">
        <a href={assetUrl("/images/contact/wecom-qr.png")} target="_blank" rel="noopener noreferrer" aria-label={tr(language, "Open contact QR code", "打开联系人二维码")}><Image src={assetUrl("/images/contact/wecom-qr.png")} alt={tr(language, "WeCom contact QR code", "企业微信联系人二维码")} width={146} height={146} unoptimized /></a>
        <div><h3>{tr(language, "Contact us on WeCom", "企业微信联系")}</h3><p>{tr(language, "Scan or press and hold the QR code to add our contact.", "扫码或长按识别二维码，添加联系人。")}</p><p>{kind === "careers" ? tr(language, "Please share your resume and relevant MD / DFT projects, and mention your preferred location.", "请附上简历与相关 MD / DFT 项目经历，并注明意向城市。") : tr(language, "Get in touch about products, research collaboration or deployment.", "欢迎交流产品咨询、科研合作与部署需求。")}</p></div>
      </div>
      <nav aria-label={tr(language, "Related pages", "相关页面")}><SiteLink href="/products/">{tr(language, "Explore products", "浏览产品")}</SiteLink><SiteLink href="/community/">{tr(language, "Visit community", "进入社区")}</SiteLink><SiteLink href="/">{tr(language, "Back to home", "返回首页")}</SiteLink></nav>
    </footer>
  </main>;
}
