"use client";

import Image from "next/image";
import { useState } from "react";
import { Nav } from "./Nav";
import { OfficialHero } from "./OfficialHero";
import { EditorialFooter } from "./EditorialFooter";
import { SiteLink } from "./primitives/SiteLink";
import { useLanguage } from "./LanguageProvider";
import { assetUrl } from "@/lib/asset-url";
import { productAssets } from "@/data/productAssets";
import "./enterprise.css";
import "./enterprise-services.css";

const services = [
  {
    label: "PRIVATE DEPLOYMENT",
    title: ["私有化部署", "Private deployment"],
    need: ["数据与工具，需要留在自己的环境", "Keep data and tools in your environment"],
    outcome: ["在你的环境中，\n建立研究工作区。", "A research workspace.\nOn your terms."],
    action: ["讨论私有化部署", "Plan your deployment"],
    prepare: ["现有系统、数据边界与部署要求", "Your systems, data boundaries and deployment requirements"],
    subtitle: ["从你的环境与边界出发。", "Start with your environment."],
    body: ["围绕数据边界、访问权限与现有系统，讨论适合团队的部署方式，让工具融入实际的研究环境。", "Discuss a deployment approach around your data boundaries, access requirements and existing systems, so the tools fit the way your team works."],
    items: [["部署环境与依赖梳理", "Environment and dependencies"], ["数据与访问范围确认", "Data and access boundaries"], ["运维与更新方式讨论", "Operations and update planning"]],
  },
  {
    label: "COMPUTE INTEGRATION",
    title: ["算力接入", "Compute integration"],
    need: ["已有 GPU / HPC，希望接入工作流", "Bring your GPU / HPC into the workflow"],
    outcome: ["让现有算力，\n连接实际研究任务。", "Your compute.\nConnected to your research."],
    action: ["评估算力接入", "Discuss compute integration"],
    prepare: ["算力配置、调度方式与代表性任务", "Your compute resources, scheduler and a representative task"],
    subtitle: ["让已有资源进入研究流程。", "Put your infrastructure to work."],
    body: ["从现有 GPU、HPC 资源与调度方式入手，连接任务准备、计算执行、状态监测和结果分析。", "Start with your GPU and HPC resources and scheduling setup, connecting job preparation, execution, monitoring and analysis."],
    items: [["资源与调度方式评估", "Resources and scheduler review"], ["任务提交与运行状态衔接", "Job submission and status tracking"], ["结果归集与分析流程梳理", "Results and analysis workflows"]],
  },
  {
    label: "TEAM WORKFLOWS",
    title: ["团队工作流", "Team workflows"],
    need: ["方法分散在成员之间，希望协同复用", "Make methods easier to share and reuse"],
    outcome: ["把个人的方法，\n变成团队的积累。", "Individual methods.\nShared team knowledge."],
    action: ["梳理团队工作流", "Map your team workflow"],
    prepare: ["团队分工、协作环节与当前瓶颈", "Your team roles, collaboration process and current bottlenecks"],
    subtitle: ["让经验成为下一次研究的起点。", "Make each project a starting point."],
    body: ["明确参数、方法与结果如何在成员之间流转，把个人经验整理成团队可理解、可复现的工作过程。", "Define how parameters, methods and results move between people, turning individual experience into understandable, reproducible team workflows."],
    items: [["角色分工与协作节点确认", "Roles and collaboration points"], ["方法、参数与结果记录", "Methods, parameters and evidence"], ["研究流程与使用培训讨论", "Workflow and training planning"]],
  },
] as const;

export function EnterprisePage() {
  const { language } = useLanguage();
  const zh = language === "zh";
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const t = (pair: readonly [string, string]) => pair[zh ? 0 : 1];
  return <main className="enterprise-page" lang={zh ? "zh-CN" : "en"}>
    <Nav />
    <OfficialHero id="enterprise-title" image={productAssets.enterpriseHero}
      imageAlt={zh ? "封闭机房中的服务器机柜与设备通道示意" : "Illustrative enclosed data center"}
      eyebrow={zh ? "企业服务" : "ENTERPRISE"}
      title={zh ? <>连接团队与算力，<br /><span>让研究向前。</span></> : <>Your infrastructure.<br /><span>Your research, further.</span></>}
      description={zh ? "从私有化部署到算力接入，围绕你的研究环境，构建适合团队的工作方式。" : "From private deployment to compute integration, shape a research workflow around your team and infrastructure."}
      actions={<><a href="#contact">{zh ? "讨论部署方案" : "Discuss a deployment"}<span aria-hidden="true">↗</span></a><a href="#details">{zh ? "查看服务内容" : "Explore services"}<span aria-hidden="true">↓</span></a></>}
    />

    <div className="enterprise-routing enterprise-container">
      <h2>{zh ? <>从你的需求<br />找到起点。</> : <>Find your<br />starting point.</>}</h2>
      <nav className="enterprise-wayfinding" aria-label={zh ? "按需求选择企业服务" : "Find a service for your needs"}>
        {services.map((service, i) => <a href={`#detail-${i}`} key={service.label}><span className="enterprise-route-number">0{i + 1}</span><strong>{t(service.title)}</strong><p>{t(service.need)}</p><span className="enterprise-route-arrow" aria-hidden="true">↘</span></a>)}
      </nav>
    </div>

    <section id="details" className="enterprise-container enterprise-services" aria-labelledby="services-title">
      <div className="enterprise-section-intro">
        <div><h2 id="services-title">{zh ? <>让研究向前，<br /><span>从解决具体问题开始。</span></> : <>Move research forward.<br /><span>Start with what matters.</span></>}</h2></div>
        <p>{zh ? "每个团队都有自己的工具、数据和协作习惯。我们从这些具体条件出发，一起明确接入范围、实施路径与需要验证的问题。" : "Every team brings its own tools, data and working habits. We start there, defining the scope, implementation path and questions to validate together."}</p>
      </div>
      <div className="enterprise-service-grid">{services.map((service, i) => <article id={`detail-${i}`} key={service.label}>
        <div className="enterprise-service-heading"><span className="enterprise-service-number" aria-hidden="true">0{i + 1}</span><p className="enterprise-service-label">{t(service.title)}</p><h3>{t(service.outcome)}</h3></div>
        <div className="enterprise-service-content"><p className="enterprise-service-body">{t(service.body)}</p>
          <ul>{service.items.map(item => <li key={item[1]}>{t(item)}</li>)}</ul>
          <a className="enterprise-service-action" href="#contact" onClick={() => setSelectedService(i)}>{t(service.action)}<span aria-hidden="true">↗</span></a>
        </div>
      </article>)}</div>
    </section>

    <section className="enterprise-process" aria-labelledby="enterprise-process-title">
      <div className="enterprise-container">
        <div className="enterprise-section-intro"><div><p className="enterprise-eyebrow">{zh ? "如何开始合作" : "WORKING TOGETHER"}</p><h2 id="enterprise-process-title">{zh ? "从一个具体问题开始。" : "Start with a real question."}</h2></div><p>{zh ? "先理解研究，再讨论方案。通过明确的范围与验证标准，让每一步都有依据。" : "Understand the research before shaping the solution. Agree on scope and validation criteria to guide each step."}</p></div>
        <ol>{[
          [["理解需求", "Understand"], ["研究目标、现有工具、团队规模与当前瓶颈。", "Research goals, tools, team size and current bottlenecks."]],
          [["梳理方案", "Plan"], ["部署条件、资源接入、工作流与实施边界。", "Deployment conditions, resource integration, workflows and scope."]],
          [["验证关键流程", "Validate"], ["选择代表性任务，确认运行过程与结果要求。", "Use representative tasks to check execution and result requirements."]],
          [["确定后续计划", "Move forward"], ["根据验证结果，商定实施、培训与支持安排。", "Use the findings to agree on implementation, training and support."]],
        ].map((step, i) => <li key={step[0][1]}><span className="enterprise-step-number">0{i + 1}</span><h3>{t(step[0] as [string,string])}</h3><p>{t(step[1] as [string,string])}</p></li>)}</ol>
      </div>
    </section>

    <section id="contact" className="enterprise-container enterprise-contact" aria-labelledby="enterprise-contact-title">
      <div className="enterprise-contact-copy"><h2 id="enterprise-contact-title">{zh ? <>下一步，<br />聊聊你的研究环境。</> : <>Tell us what<br />you’re working on.</>}</h2><p>{zh ? "带着一个问题来就好。也欢迎介绍团队正在使用的软件、算力资源，以及希望改善的工作环节。" : "Start with a question. Tell us about your software, compute resources and the parts of your workflow you would like to improve."}</p><div className="enterprise-contact-context" aria-live="polite">{selectedService !== null ? <><strong>{t(services[selectedService].title)}</strong><p>{zh ? "交流时可以介绍：" : "Useful context to share: "}{t(services[selectedService].prepare)}{zh ? "。" : "."}</p></> : <p>{zh ? "添加企业微信，介绍你的需求，一起确定下一步。" : "Connect on WeCom and share your needs to agree on the next step."}</p>}</div><SiteLink className="enterprise-text-link" href="/products/">{zh ? "先了解我们的产品" : "Explore our products first"}<span aria-hidden="true">↗</span></SiteLink></div>
      <div className="enterprise-contact-method"><a className="enterprise-qr" href={assetUrl("/images/contact/wecom-qr.png")} target="_blank" rel="noopener noreferrer" aria-label={zh ? "打开企业微信联系二维码" : "Open the WeCom contact QR code"}><Image src={assetUrl("/images/contact/wecom-qr.png")} alt={zh ? "企业微信联系人二维码" : "WeCom contact QR code"} width={160} height={160} unoptimized /></a><div><h3>{zh ? "企业微信联系" : "Connect on WeCom"}</h3><p>{zh ? "扫码或长按识别，开始交流。" : "Scan or press and hold to connect."}</p><span>{zh ? "产品咨询 / 部署需求 / 科研合作" : "Products / Deployment / Research"}</span></div></div>
    </section>
    <EditorialFooter />
  </main>;
}
