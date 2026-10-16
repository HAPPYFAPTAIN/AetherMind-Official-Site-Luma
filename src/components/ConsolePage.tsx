"use client";
import { ThemeSwitch } from "./ThemeSwitch";

import { useEffect, useState } from "react";
import { LoginPage } from "./LoginPage";
import { Mark } from "./Nav";
import { useLanguage } from "./LanguageProvider";
import { accountApi, hasAccountSession, signOut } from "@/lib/account-client";
import { useAccount } from "@/lib/use-account";
import { assetUrl } from "@/lib/asset-url";
import { BRAND } from "@/lib/site";
import "./console.css";
import "./console-workspace.css";
import { ThemedProductArt } from "./ThemedProductArt";
import { productAssets } from "@/data/productAssets";

type Section = "agents" | "compute" | "jobs";
type MdAgentState = {
  accountBinding: "unbound" | "bound";
  qualifications: { product_id: string }[];
  model: { status: string; provider: string | null; modelId: string | null };
  compute: { status: string; canSubmit: boolean };
};

const agents = [
  {
    id: "md-exp",
    title: "分子模拟智能体",
    description: "模型对话、任务规划与分子动力学工作流。",
    tags: ["LAMMPS / ReaxFF", "建模 · 分析 · 科研对话"],
    image: "/assets/products/lammps.png",
    status: "available" as const,
  },
  {
    id: "gromacs",
    title: "分子模拟智能体",
    description: "蛋白质与膜体系的后续智能体。",
    tags: ["蛋白质 · 膜体系"],
    image: "/assets/products/biology.png",
    status: "coming" as const,
  },
  {
    id: "dft",
    title: "电子结构与材料计算智能体",
    description: "结构优化、电子性质与材料计算。",
    tags: ["结构优化 · 电子性质"],
    image: "/assets/products/materials.png",
    status: "coming" as const,
  },
  {
    id: "materials",
    title: "轨迹与性质分析智能体",
    description: "从轨迹中提取结构、能量和科学图表。",
    tags: ["轨迹解析 · 科学图表"],
    image: "/assets/products/platform.png",
    status: "coming" as const,
  },
];

export function ConsolePage() {
  const { language } = useLanguage();
  const zh = language === "zh";
  const [section, setSection] = useState<Section>("agents");
  const [loginOpen, setLoginOpen] = useState(false);
  const { account } = useAccount();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mdState, setMdState] = useState<MdAgentState | null>(null);
  const [notice, setNotice] = useState("");
  const [enteringMdExp, setEnteringMdExp] = useState(false);

  useEffect(() => {
    if (!hasAccountSession()) return;
    accountApi<MdAgentState>("/md-agent/profile").then(setMdState).catch(() => setMdState(null));
  }, []);

  const enterMdExp = async () => {
    if (enteringMdExp) return;
    if (!account) {
      window.location.assign(assetUrl("/login/?returnTo=/official/md-agent/"));
      return;
    }
    if (!mdState?.qualifications.some((item) => item.product_id === "md-exp")) {
      setNotice(zh
      ? "请先使用对应邀请码获得 MD EXP 产品资格。"
      : "Use the matching invite code to unlock MD EXP first.");
      return;
    }
    // Reserve the new tab during the user gesture.  `noopener` makes Chrome
    // return null for this blank window, which left the tab blank when the
    // ticket request completed asynchronously.
    const popup = window.open("about:blank", "_blank");
    if (popup) popup.opener = null;
    setEnteringMdExp(true);
    setNotice(zh ? "正在打开 MD EXP…" : "Opening MD EXP…");
    try {
      const nextState = mdState.accountBinding === "bound"
        ? mdState
        : await accountApi<MdAgentState>("/md-agent/bind", { method: "POST" });
      const entry = await accountApi<{ url: string }>("/md-agent/enter", { method: "POST" });
      if (popup && !popup.closed) popup.location.replace(entry.url);
      else window.location.assign(entry.url);
      setMdState(nextState);
      setNotice("");
    } catch (error) {
      popup?.close();
      setNotice(error instanceof Error ? error.message : String(error));
    } finally {
      setEnteringMdExp(false);
    }
  };

  async function logout() {
    await signOut();
    window.location.assign(assetUrl("/"));
  }

  const sidebar = [
    ["agents", zh ? "智能体目录" : "Agent catalog"],
    ["compute", zh ? "超算连接" : "Compute connection"],
    ["jobs", zh ? "计算任务" : "Compute jobs"],
  ] as const;

  return (
    <main className="console-page">
      <header className="console-topbar">
        <div className="console-brand">
          <a href={assetUrl("/")} aria-label={zh ? "以太智元" : "AethericAI"}>
            <span className="console-mark" aria-hidden="true"><Mark /></span>
            {zh ? BRAND.zh : BRAND.en}
          </a>
          <span className="console-workspace-label">{zh ? "研究工作台" : "Research workspace"}</span>
        </div>
        <div className="console-top-actions"><ThemeSwitch />
          {account ? (
            <div className="console-account-wrap">
            <button className="console-account console-account-compact" onClick={() => setAccountMenuOpen((open) => !open)} aria-expanded={accountMenuOpen}
              aria-label={zh ? "打开个人中心菜单" : "Open account menu"}>
              <span><UserGlyph /></span>
            </button>
            {accountMenuOpen && <div className="console-account-menu" role="menu">
              <strong>{account.phoneMasked}</strong>
              <small>{account.userId}</small>
              <a href={assetUrl("/dashboard/")} role="menuitem"><span aria-hidden="true">▦</span> {zh ? "仪表盘" : "Dashboard"}</a>
              <a href={assetUrl("/profile/")} role="menuitem">♙ {zh ? "个人中心" : "Personal center"}</a>
              <button role="menuitem" onClick={() => void logout()}>⇥ {zh ? "退出登录" : "Sign out"}</button>
            </div>}
            </div>
          ) : (
            <button className="console-signin" onClick={() => setLoginOpen(true)}>
              {zh ? "登录" : "Sign in"}
            </button>
          )}
        </div>
      </header>

      <div className="console-layout">
        <aside className="console-sidebar" aria-label={zh ? "控制台导航" : "Console navigation"}>
          <p className="console-nav-label">{zh ? "工作空间" : "WORKSPACE"}</p>
          {sidebar.map(([id, label]) => (
            <button key={id} className={section === id ? "active" : ""} onClick={() => setSection(id)} aria-current={section === id ? "page" : undefined}>
              <WorkspaceGlyph kind={id} />
              {label}
            </button>
          ))}
          <div className="console-sidebar-help"><p>{zh ? "让工具适合你的研究。" : "Tools for the way you research."}</p><a href={assetUrl("/enterprise/#contact")}>{zh ? "联系团队" : "Contact our team"}<span aria-hidden="true">↗</span></a><a href={assetUrl("/products/")}>{zh ? "浏览产品" : "Explore products"}<span aria-hidden="true">↗</span></a></div>
        </aside>

        <section className="console-content">
          <div className="console-page-heading"><div><p className="console-breadcrumb">{zh ? "控制台" : "Console"}<span aria-hidden="true"> / </span>{sidebar.find(([id]) => id === section)?.[1]}</p><h1>{section === "agents" ? (zh ? "从一个研究问题开始。" : "Start with a research question.") : section === "compute" ? (zh ? "连接你的计算环境。" : "Connect your compute.") : (zh ? "研究任务，集中管理。" : "Your research, in one place.")}</h1><p>{section === "agents" ? (zh ? "选择适合的智能体，开展建模、计算与结果分析。" : "Choose an agent for modeling, computation and analysis.") : section === "compute" ? (zh ? "查看平台资源，或了解如何接入团队已有的算力。" : "Review platform resources or explore connecting your infrastructure.") : (zh ? "计算任务功能开放后，可在这里查看运行进展与结果。" : "Once available, track your jobs and results here.")}</p></div><a className="console-back-home" href={assetUrl("/")}>{zh ? "返回官网" : "Back to website"}<span aria-hidden="true">↗</span></a></div>
          {notice && <div className="console-notice" role="status">{notice}<button aria-label={zh ? "关闭提示" : "Dismiss notification"} onClick={() => setNotice("")}>×</button></div>}

          {section === "agents" && <>
            <div className="agent-list">
              {agents.map((agent) => (
                <article key={agent.id} className={`agent-card ${agent.status === "available" ? "available" : ""}`}>
                  <div className="agent-art"><ThemedProductArt base={agent.id === "md-exp" ? productAssets.mdExp : agent.id === "gromacs" ? productAssets.biology : agent.id === "dft" ? productAssets.materials : productAssets.platform} sizes="(max-width:620px) 90vw, 210px" /></div>
                  <div className="agent-copy"><div className="agent-edition"><span>{agent.id === "md-exp" ? "MD EXP" : agent.id === "gromacs" ? "BIOMOLECULAR" : agent.id === "dft" ? "ELECTRONIC STRUCTURE" : "TRAJECTORY ANALYSIS"}</span><span className="agent-availability">{agent.status === "available" ? (zh ? "已开放" : "Available") : (zh ? "规划中" : "Planned")}</span></div><h2>{agent.title}</h2><p className="agent-description">{agent.description}</p><div className="agent-tags">{agent.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                  <div className="agent-action-area"><button className="agent-action" disabled={agent.status !== "available" || enteringMdExp} onClick={() => void enterMdExp()}>{agent.status === "available" ? (enteringMdExp ? (zh ? "正在打开…" : "Opening…") : (zh ? "进入智能体  →" : "Open agent  →")) : (zh ? "尚未开放" : "Not yet available")}</button>{agent.status === "available" && <p>{zh ? "使用前需登录并获得对应产品资格。" : "Sign-in and product access are required."}</p>}</div>
                </article>
              ))}
            </div>
          </>}

          {section === "compute" && <ComputePanel zh={zh} />}
          {section === "jobs" && <StatusPanel title={zh ? "任务中心正在准备中" : "Your job center is on its way"} title2={zh ? "尚未开放" : "Not available yet"} body={zh ? "未来将在这里集中查看任务进度、运行日志与计算结果。当前可先从智能体目录开始研究。" : "Track progress, logs and computation results here when available. For now, start from the agent catalog."} />}
        </section>
      </div>
      {loginOpen && <LoginPage overlay onClose={() => setLoginOpen(false)} />}
    </main>
  );
}

function UserGlyph() {
  return (
    <svg className="console-user-glyph" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 19c0-3.2 2.9-5.4 6.5-5.4s6.5 2.2 6.5 5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function WorkspaceGlyph({ kind }: { kind: Section }) {
  return <svg className="workspace-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{kind === "agents" ? <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></> : kind === "compute" ? <><rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M12 6.5h5M12 17.5h5"/></> : <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></>}</svg>;
}

function StatusPanel({ title, title2, body }: { title: string; title2: string; body: string }) {
  return <section className="console-status-panel console-empty-state"><WorkspaceGlyph kind="jobs"/><span>{title2}</span><h2>{title}</h2><p>{body}</p></section>;
}

function ComputePanel({ zh }: { zh: boolean }) {
  return (
    <section className="console-status-panel console-compute-panel">
      <h2>{zh ? "超算连接" : "Compute connection"}</h2>
      <div className="compute-options">
        <article className="compute-option compute-option-provided">
          <div className="compute-option-heading">
            <div><h3>{zh ? "以太智元超算" : "AethericAI compute"}</h3><span>{zh ? "平台提供的超算资源" : "Compute resources provided by the platform"}</span></div>
            <strong>{zh ? "可用" : "Available"}</strong>
          </div>
          <p>{zh ? "选择规格后提交计算任务。当前默认使用自动调度。" : "Choose a resource profile before submitting a job. Auto scheduling is selected by default."}</p>
          <label>{zh ? "规格" : "Profile"}<select defaultValue="auto" aria-label={zh ? "超算规格" : "Compute profile"}><option value="auto">auto</option></select></label>
        </article>
        <article className="compute-option compute-option-custom">
          <div className="compute-option-heading">
            <div><h3>{zh ? "用户自配超算" : "Your own compute"}</h3><span>{zh ? "接入自有 SSH、队列或集群" : "Connect your own SSH, queue or cluster"}</span></div>
            <strong>{zh ? "联系客服" : "Contact support"}</strong>
          </div>
          <p>{zh ? "如需接入自有超算资源，请联系客服完成连接配置。" : "Contact support to configure access to your own compute resources."}</p>
          <a className="compute-contact" href={assetUrl("/enterprise/#contact")}>{zh ? "咨询接入方案" : "Discuss integration"} <span aria-hidden="true">→</span></a>
        </article>
      </div>
    </section>
  );
}
