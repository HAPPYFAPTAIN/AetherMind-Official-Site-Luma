"use client";

import { useEffect, useMemo, useState } from "react";
import { LoginPage } from "./LoginPage";
import { useLanguage } from "./LanguageProvider";
import { accountApi, hasAccountSession, type AccountProfile } from "@/lib/account-client";
import { assetUrl } from "@/lib/asset-url";
import { BRAND } from "@/lib/site";
import "./console.css";

type Section = "agents" | "compute" | "jobs" | "model";
type MdAgentState = {
  accountBinding: "unbound" | "bound";
  qualifications: { product_id: string }[];
  model: { status: string; provider: string | null; modelId: string | null };
  compute: { status: string; canSubmit: boolean };
};

const agents = [
  {
    id: "md-exp",
    title: "MD EXP",
    subtitle: "分子模拟智能体",
    description: "模型对话、任务规划与分子动力学工作流。",
    tags: ["LAMMPS / ReaxFF", "建模 · 分析 · 科研对话"],
    image: "/assets/products/lammps.png",
    status: "available" as const,
  },
  {
    id: "gromacs",
    title: "GROMACS",
    subtitle: "分子模拟工作流",
    description: "蛋白质与膜体系的后续智能体。",
    tags: ["蛋白质 · 膜体系"],
    image: "/assets/products/biology.png",
    status: "coming" as const,
  },
  {
    id: "dft",
    title: "DFT 智能体",
    subtitle: "电子结构与材料计算",
    description: "结构优化、电子性质与材料计算。",
    tags: ["结构优化 · 电子性质"],
    image: "/assets/products/materials.png",
    status: "coming" as const,
  },
  {
    id: "materials",
    title: "材料分析智能体",
    subtitle: "轨迹与性质分析",
    description: "从轨迹中提取结构、能量和科学图表。",
    tags: ["轨迹解析 · 科学图表"],
    image: "/assets/products/platform.png",
    status: "coming" as const,
  },
];

export function ConsolePage() {
  const { language, setLanguage } = useLanguage();
  const zh = language === "zh";
  const [section, setSection] = useState<Section>("agents");
  const [loginOpen, setLoginOpen] = useState(false);
  const [account, setAccount] = useState<AccountProfile | null>(null);
  const [mdState, setMdState] = useState<MdAgentState | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!hasAccountSession()) return;
    accountApi<AccountProfile>("/me").then(setAccount).catch(() => setAccount(null));
    accountApi<MdAgentState>("/md-agent/profile").then(setMdState).catch(() => setMdState(null));
  }, []);

  const roleName = useMemo(() => {
    if (!account) return "";
    return account.role === "OWNER" ? (zh ? "总管理员" : "Owner")
      : account.role === "ADMIN" ? (zh ? "管理员" : "Administrator")
      : (zh ? "普通用户" : "Member");
  }, [account, zh]);

  const enterMdExp = async () => {
    if (!account) {
      window.location.assign(assetUrl("/login/?returnTo=/official/console/"));
      return;
    }
    if (!mdState?.qualifications.some((item) => item.product_id === "md-exp")) {
      setNotice(zh
      ? "请先使用对应邀请码获得 MD EXP 产品资格。"
      : "Use the matching invite code to unlock MD EXP first.");
      return;
    }
    const popup = window.open("about:blank", "_blank", "noopener,noreferrer");
    setNotice(zh
      ? (zh ? "你已获得 MD EXP 产品资格；个人 MD-Agent 账户绑定完成后，会在这里新标签页打开 dsh。" : "You have MD EXP qualification. dsh will open in a new tab after your personal MD-Agent account is bound.")
      : "Preparing your MD-Agent workspace…");
    try {
      const nextState = mdState.accountBinding === "bound"
        ? mdState
        : await accountApi<MdAgentState>("/md-agent/bind", { method: "POST" });
      const entry = await accountApi<{ url: string }>("/md-agent/enter", { method: "POST" });
      if (popup) popup.location.href = entry.url;
      else window.open(entry.url, "_blank", "noopener,noreferrer");
      setMdState(nextState);
    } catch (error) {
      popup?.close();
      setNotice(error instanceof Error ? error.message : String(error));
    }
  };

  const sidebar = [
    ["agents", zh ? "智能体目录" : "Agent catalog"],
    ["compute", zh ? "超算连接" : "Compute connection"],
    ["jobs", zh ? "计算任务" : "Compute jobs"],
    ["model", zh ? "模型配置" : "Model settings"],
  ] as const;

  return (
    <main className="console-page">
      <header className="console-topbar">
        <div className="console-brand">
          <a href={assetUrl("/")} aria-label={zh ? "返回官网" : "Back to website"}>
            <span className="console-mark" aria-hidden="true">✧</span>
            {zh ? BRAND.zh : BRAND.en}
          </a>
          <span className="console-divider" />
          <strong>{zh ? "控制台" : "Console"}</strong>
        </div>
        <div className="console-top-actions">
          <a href={assetUrl("/")} className="console-return">↗ {zh ? "返回官网" : "Back to website"}</a>
          <button className="console-language" onClick={() => setLanguage(zh ? "en" : "zh")}>
            {zh ? "EN" : "中"}
          </button>
          {account ? (
            <a className="console-account" href={assetUrl("/dashboard/")}>
              <span>{account.displayName.slice(0, 1)}</span>
              <b>{account.displayName}</b>
              <small>{account.phoneMasked} · {roleName}</small>
              <i>⌄</i>
            </a>
          ) : (
            <button className="console-signin" onClick={() => setLoginOpen(true)}>
              {zh ? "登录" : "Sign in"}
            </button>
          )}
        </div>
      </header>

      <div className="console-layout">
        <aside className="console-sidebar" aria-label={zh ? "控制台导航" : "Console navigation"}>
          {sidebar.map(([id, label]) => (
            <button key={id} className={section === id ? "active" : ""} onClick={() => setSection(id)}>
              <span aria-hidden="true">{id === "agents" ? "▦" : id === "compute" ? "▤" : id === "jobs" ? "▣" : "⚙"}</span>
              {label}
            </button>
          ))}
        </aside>

        <section className="console-content">
          <div className="console-hero">
            <div>
              <p className="console-kicker">AETHERICAI / CONTROL CENTER</p>
              <h1>{section === "agents" ? (zh ? "科学计算控制台" : "Scientific computing console") : sidebar.find(([id]) => id === section)?.[1]}</h1>
              <p>{section === "agents" ? (zh ? "选择智能体，开始你的科研工作流" : "Choose an agent and start your research workflow") : (zh ? "这里的状态只显示已接入能力。" : "Only connected capabilities are shown here.")}</p>
            </div>
            <span className="console-hero-note">{zh ? "用计算，探索更大的科学世界" : "Compute further into science"}<i /></span>
          </div>

          {notice && <div className="console-notice" role="status">{notice}<button onClick={() => setNotice("")}>×</button></div>}

          {section === "agents" && <>
            <div className="console-toolbar">
              <div className="console-filters"><button className="active">{zh ? "全部智能体" : "All agents"}</button><button>{zh ? "可用" : "Available"}</button><button>{zh ? "即将上架" : "Coming soon"}</button></div>
              <label className="console-search"><span>⌕</span><input placeholder={zh ? "搜索智能体" : "Search agents"} /></label>
            </div>
            <div className="agent-list">
              {agents.map((agent) => (
                <article key={agent.id} className={`agent-card ${agent.status === "available" ? "available" : ""}`}>
                  <img src={assetUrl(agent.image)} alt="" />
                  <div className="agent-copy"><h2>{agent.title}</h2><p className="agent-subtitle">{agent.subtitle}</p><p className="agent-description">{agent.description}</p><div className="agent-tags">{agent.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                  <div className="agent-status"><span className={agent.status}>{agent.status === "available" ? (zh ? "可用" : "Available") : (zh ? "下个月上架" : "Coming next month")}</span><small>{agent.status === "available" ? (mdState?.qualifications.some((item) => item.product_id === agent.id) ? (zh ? "已获得产品资格" : "Qualified") : (zh ? "需要绑定邀请码" : "Invite binding required")) : ""}</small></div>
                  <button className="agent-action" disabled={agent.status !== "available"} onClick={() => void enterMdExp()}>{agent.status === "available" ? (zh ? "进入智能体  →" : "Open agent  →") : (zh ? "敬请期待" : "Stay tuned")}</button>
                </article>
              ))}
            </div>
          </>}

          {section === "compute" && <StatusPanel title={zh ? "超算连接" : "Compute connection"} title2={zh ? "待接入" : "Integration pending"} body={zh ? "SSH 连接、工作区和队列适配正在联调。当前不会显示虚假的在线状态，也不会提交计算任务。" : "SSH, workspace and queue support are being integrated. No online state is claimed and no jobs can be submitted yet."} />}
          {section === "jobs" && <StatusPanel title={zh ? "计算任务" : "Compute jobs"} title2={zh ? "尚未开放" : "Not available yet"} body={zh ? "完成超算适配和作业状态契约后，这里会显示本人任务、日志、结果和取消状态。" : "Personal jobs, logs, artifacts and cancellation will appear after the HPC contract is integrated."} />}
          {section === "model" && <ModelPanel zh={zh} />}
        </section>
      </div>
      <footer className="console-footer"><span>{zh ? "官网 → 控制台 → MD EXP → dsh" : "Website → Console → MD EXP → dsh"}</span><span>{zh ? "界面示意 · 图片与 Logo 待替换" : "Interface preview · imagery and logo pending"}</span></footer>
      {loginOpen && <LoginPage overlay onClose={() => setLoginOpen(false)} />}
    </main>
  );
}

function ModelPanel({ zh }: { zh: boolean }) {
  const models = [
    ["Kimi", "kimi-k3", zh ? "旗舰，长上下文与视觉理解" : "Flagship, long context and vision", "pending"],
    ["Kimi", "kimi-k2.7-code-highspeed", zh ? "高速代码与 Agent 工作流" : "High-speed coding and agent workflows", "verified"],
    ["Kimi", "kimi-k2.6", zh ? "通用对话、视觉与 Agent" : "General, vision and agent tasks", "pending"],
    ["DeepSeek", "deepseek-v4-pro", zh ? "旗舰推理与工具调用" : "Flagship reasoning and tools", "verified"],
    ["DeepSeek", "deepseek-flash", zh ? "高吞吐、多模态 Flash" : "High-throughput multimodal Flash", "pending"],
  ];
  return <section className="console-status-panel console-model-panel"><p className="console-kicker">MODEL PROVIDERS</p><h2>{zh ? "模型配置" : "Model settings"}</h2><span>{zh ? "共享代理已接入" : "Shared proxy connected"}</span><p>{zh ? "Kimi 2.7 Highspeed 与 DeepSeek V4 Pro 已完成服务端短请求验证；用户级模型选择和对话状态仍由 dsh 会话读取。" : "Kimi 2.7 Highspeed and DeepSeek V4 Pro passed server-side smoke tests; per-user model selection and chat state are read by the dsh session."}</p><div className="console-model-list">{models.map(([provider,id,desc,status]) => <div key={id}><b>{provider}</b><code>{id}</code><small>{desc}</small><em className={status}>{status === "verified" ? (zh ? "已验证" : "Verified") : (zh ? "可选" : "Available")}</em></div>)}</div></section>;
}

function StatusPanel({ title, title2, body }: { title: string; title2: string; body: string }) {
  return <section className="console-status-panel"><p className="console-kicker">AETHERICAI / STATUS</p><h2>{title}</h2><span>{title2}</span><p>{body}</p></section>;
}
