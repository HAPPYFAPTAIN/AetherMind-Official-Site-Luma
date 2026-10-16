"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Nav } from "./Nav";
import { OfficialHero } from "./OfficialHero";
import { LearningRouteDemo } from "./LearningRouteDemo";
import { SiteLink } from "./primitives/SiteLink";
import { EditorialFooter } from "./EditorialFooter";
import { LoginPage } from "./LoginPage";
import { useLanguage } from "./LanguageProvider";
import {
  accountApi,
  AccountError,
  fetchDashboard,
  hasAccountSession,
} from "@/lib/account-client";
import { hasActiveEntitlement, redeemAndReload } from "@/lib/activate";
import { assetUrl } from "@/lib/asset-url";
import { useDialogFocus } from "@/lib/use-dialog-focus";
import "./learn-everything.css";

type AccessState = "checking" | "active" | "inactive" | "unknown";

const MANUAL = [
  {
    title: { zh: "30 秒快速上手", en: "Get started in 30 seconds" },
    items: [
      { zh: "登录官网并使用 ACT- 产品激活码开通学习工作台。模型由平台统一配置，无需填写接口密钥。", en: "Sign in and redeem an ACT- product activation code. Models are configured by the platform; no API key is required." },
      { zh: "在学习路线输入选题、背景、目标和每周投入时间，生成路线。", en: "Enter a topic, background, goal and weekly time in Learning routes." },
      { zh: "确认路线后保存到项目，再进入学习工作台推进知识点。", en: "Save the route to a project, then work through its knowledge nodes." },
      { zh: "学习后使用间隔复习和查漏测验，最后在看板查看进度。", en: "Review and test after studying, then track progress on the dashboard." },
    ],
  },
  {
    title: { zh: "各功能页说明", en: "Feature guide" },
    items: [
      { zh: "知识问答：先在资料库上传 PDF、Word、Markdown 或笔记，再进行带引用的问答。", en: "Knowledge Q&A: upload PDFs, Word files, Markdown or notes, then ask source-grounded questions." },
      { zh: "学习路线：生成带依赖关系的分阶段路线，可用自然语言调整并导入导出。", en: "Learning routes: generate staged routes with dependencies and revise or export them." },
      { zh: "学习工作台：逐个推进知识点，使用助教、费曼讲解和苏格拉底提问。", en: "Study workbench: progress through nodes with tutor, Feynman and Socratic modes." },
      { zh: "间隔复习：用 FSRS v6 按四档评分安排下一次复习。", en: "Spaced review: use FSRS v6 and four ratings to schedule the next review." },
      { zh: "查漏测验：按薄弱知识点生成选择、填空、简答或实操题并自动批改。", en: "Quizzes: generate and grade multiple-choice, fill-in, short-answer or practical questions." },
      { zh: "学习看板：查看掌握度、学习热力图和日报，并导出 Markdown、Anki 或打印报告。", en: "Dashboard: inspect mastery, activity heatmaps and reports, then export Markdown, Anki or print views." },
      { zh: "资料库：文件会被解析、分块并建立索引，供知识问答引用。", en: "Library: files are parsed, chunked and indexed for cited Q&A." },
      { zh: "使用指南与帮助：查看功能说明和推荐流程；服务器版的模型配置由平台管理员维护。", en: "Guide and Help: read the feature guide and recommended workflow. Server model settings are maintained by the platform owner." },
    ],
  },
  {
    title: { zh: "推荐学习流程", en: "Recommended flow" },
    items: [
      { zh: "登录并激活 → 生成并保存路线 → 选择资料 → 按路线学习 → 随时知识问答 → 每天复习 → 每阶段测验 → 看板复盘。", en: "Sign in and activate → build and save a route → select references → study by node → ask questions → review daily → test each stage → inspect the dashboard." },
    ],
  },
  {
    title: { zh: "常见问题", en: "Common questions" },
    items: [
      { zh: "路线生成失败时，请检查控制台中的产品有效期和积分余额，再到知识问答尝试简短提问；持续失败可联系管理员。", en: "If route generation fails, check your product access and credit balance, then try a short question in Q&A. Contact the administrator if it persists." },
      { zh: "复习和测验没有内容时，先生成并保存学习路线，知识点才会进入复习系统。", en: "If Review or Quiz is empty, save a learning route first so its nodes can enter the review system." },
      { zh: "学习路线、复习、测验、进度和笔记按官网账号隔离。当前资料库为共享资料库，上传前请确认资料可供其他使用者访问。", en: "Learning routes, reviews, quizzes, progress and notes are isolated by account. The library is currently shared; only upload material you can share with other users." },
      { zh: "模型调用由平台网关计量并扣除积分；调用时会发送你的问题与选中的资料片段。", en: "Model calls are metered in platform credits and include your question and selected reference snippets." },
    ],
  },
];

export function LearnEverythingPage() {
  const { language } = useLanguage();
  const zh = language === "zh";
  const [activationOpen, setActivationOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState("");
  const [access, setAccess] = useState<AccessState>("checking");

  const closeActivation = useCallback(() => setActivationOpen(false), []);
  useDialogFocus(activationOpen, closeActivation, ".learn-modal");

  const t = (cn: string, en: string) => (zh ? cn : en);

  useEffect(() => {
    let live = true;
    const load = async () => {
      if (!hasAccountSession()) return "inactive" as const;
      const data = await fetchDashboard(7, "learn-everything");
      return hasActiveEntitlement(data, "learn-everything") ? "active" as const : "inactive" as const;
    };
    load()
      .then((data) => {
        if (live) setAccess(data);
      })
      .catch(() => { if (live) setAccess("unknown"); });
    return () => { live = false; };
  }, []);

  async function open() {
    if (opening || access === "checking") return;
    if (!hasAccountSession()) {
      setError("");
      setLoginOpen(true);
      return;
    }
    setOpening(true);
    setError("");
    try {
      const data = await fetchDashboard(7, "learn-everything");
      if (!hasActiveEntitlement(data, "learn-everything")) {
        setAccess("inactive");
        setActivationOpen(true);
        return;
      }
      setAccess("active");
      const entry = await accountApi<{ url: string }>("/learn-everything/entry", {
        method: "POST",
      });
      window.location.assign(entry.url);
    } catch (e) {
      if (e instanceof AccountError && e.status === 401) {
        setLoginOpen(true);
        setAccess("inactive");
        return;
      }
      if (e instanceof AccountError && e.status === 403) {
        setAccess("inactive");
        setActivationOpen(true);
      }
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setOpening(false);
    }
  }

  async function redeem(event: FormEvent) {
    event.preventDefault();
    if (!activationCode.trim() || busy) return;
    setBusy(true);
    setError("");
    try {
      const data = await redeemAndReload({
        code: activationCode.trim(),
        days: 7,
        product: "learn-everything",
      });
      if (!hasActiveEntitlement(data, "learn-everything"))
        throw new Error(
          t(
            "激活码未包含 Learn Everything 权益。",
            "This code does not include Learn Everything access.",
          ),
        );
      setAccess("active");
      setActivationOpen(false);
      setActivationCode("");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  const examples = [
    { title: t("分子动力学入门", "Molecular dynamics"), question: t("我想从零开始，理解并运行一次分子动力学模拟。", "I want to understand and run my first molecular dynamics simulation."), nodes: [t("原子与分子模型", "Atoms & molecular models"), t("势函数与力场", "Potentials & force fields"), t("积分方法与系综", "Integration & ensembles"), t("运行 LAMMPS 模拟", "Run a LAMMPS simulation")] },
    { title: t("机器学习基础", "Machine learning"), question: t("我有 Python 基础，想理解机器学习的核心方法。", "I know Python and want to understand the core methods of machine learning."), nodes: [t("数据与特征", "Data & features"), t("回归与分类", "Regression & classification"), t("模型训练与评估", "Training & evaluation"), t("完成一个预测项目", "Build a prediction project")] },
    { title: t("材料科学探索", "Materials science"), question: t("我想理解材料的微观结构如何影响宏观性能。", "I want to understand how microstructure influences material properties."), nodes: [t("晶体结构", "Crystal structures"), t("缺陷与界面", "Defects & interfaces"), t("结构与性能关系", "Structure–property relations"), t("分析一个材料体系", "Analyze a material system")] },
  ];
  const accessLabel = opening ? t("正在打开…", "Opening…") : access === "checking" ? t("正在检查…", "Checking access…") : access === "active" ? t("打开学习工作台", "Open workspace") : t("开始学习", "Start learning");

  return (
    <main className="learn-page" lang={zh ? "zh-CN" : "en"}>
      <Nav />
      <OfficialHero id="learn-title" image="/images/official/learning-v3" imagePosition="65% 22%"
        eyebrow={<><SiteLink href="/products/">{t("产品", "Products")}</SiteLink><span>/</span>Learn Everything</>}
        title={<>{t("让每一份好奇，", "Follow your curiosity.")}<br /><span>{t("生长为知识。", "Build your knowledge.")}</span></>}
        description={t("从一个问题出发，建立属于你的学习路线。让 AI 陪你理解、复习与验证，把探索变成持续积累。", "Turn a question into your own learning path. Understand, review and test with AI, and turn exploration into lasting knowledge.")}
        actions={<><button onClick={() => void open()} disabled={opening || access === "checking"}>{accessLabel}<span aria-hidden="true">↗</span></button><a href="#learning-preview">{t("探索学习方式", "Explore how it works")}<span aria-hidden="true">↓</span></a></>}
        note={t("官网账号登录 · 产品激活码开通", "Website account · Activation code required")}
      />
      <nav className="learn-section-nav" aria-label={t("页面导航", "On this page")}><div className="learn-container"><span>Learn Everything</span><div><a href="#learning-preview">{t("学习体验", "Experience")}</a><a href="#capabilities">{t("核心能力", "Capabilities")}</a><a href="#manual">{t("使用指南", "Guide")}</a></div></div></nav>

      <section id="learning-preview" className="learn-container learn-section">
        <div className="learn-section-heading"><div><h2>{t("复杂知识，从有序开始。", "Complex knowledge. A clear path.")}</h2></div><p>{t("告诉它你想学什么、已经了解什么，以及你的目标。把庞大的主题拆成可以逐步掌握的知识点。", "Start with your topic, background and goal. Break a broad subject into connected, manageable steps.")}</p></div>
        <LearningRouteDemo examples={examples} zh={zh} />
      </section>

      <section id="capabilities" className="learn-capabilities"><div className="learn-container learn-section">
        <div className="learn-section-heading"><div><h2>{t("学过之后，还能真正掌握。", "Go beyond the first read.")}</h2></div><p>{t("把阅读、思考和练习连接起来，在同一个工作台中完成学习与复盘。", "Bring reading, thinking and practice together. Study and reflect in one workspace.")}</p></div>
        <div className="learn-feature-grid">{[
          ["01", "有依据的知识问答", "Answers with sources", "围绕 PDF、Word、Markdown 和笔记提问，通过引用回到原始资料。", "Ask questions about PDFs, Word documents, Markdown and notes. Follow citations back to the source."],
          ["02", "以讲解加深理解", "Learn by explaining", "在助教、费曼讲解和苏格拉底提问之间切换，逐个理解路线上的知识点。", "Work through each concept with tutor, Feynman explanation and Socratic questioning modes."],
          ["03", "在合适的时间复习", "Review at the right time", "用 FSRS 间隔复习安排下一次回顾，通过薄弱点测验发现尚未掌握的内容。", "Schedule spaced review with FSRS and use focused quizzes to find gaps in understanding."],
          ["04", "让积累看得见", "See your progress", "查看掌握度、学习热力图和日报，把成果导出为 Markdown、Anki 或打印报告。", "Explore mastery, study heatmaps and daily reports. Export to Markdown, Anki or print."],
        ].map(([number, title, enTitle, body, enBody]) => <article key={number}><div className="learn-feature-top"><span>{number}</span><svg aria-hidden="true" viewBox="0 0 40 40"><path d={number === "01" ? "M10 6h15l6 6v22H10z M24 6v8h7 M15 20h11 M15 25h8" : number === "02" ? "M6 8h28v20H20l-8 7v-7H6z M12 15h16 M12 21h10" : number === "03" ? "M32 14A14 14 0 1 0 34 25 M32 5v10H22 M20 12v9l6 4" : "M7 32h28 M11 27V17h4v10 M21 27V9h4v18 M31 27V4h4v23"} /></svg></div><h3>{t(title, enTitle)}</h3><p>{t(body, enBody)}</p></article>)}</div>
        <p className="learn-library-note">{t("资料库目前为共享空间，请仅上传可供其他使用者访问的资料。个人学习路线、笔记与进度按账号隔离。", "The library is currently shared. Upload only materials you can share with other users. Personal routes, notes and progress are isolated by account.")}</p>
      </div></section>

      <section id="manual" className="learn-container learn-section learn-manual"><div><h2>{t("从这里，开始探索。", "Your starting point.")}</h2><p className="learn-manual-intro">{t("从激活账号到完成第一次学习，在这里找到操作步骤和常见问题。", "From activating access to your first study session. Find the steps and answers here.")}</p><SiteLink className="learn-text-link" href="/community/">{t("到社区交流", "Ask the community")} ↗</SiteLink></div><div className="learn-manual-groups">{MANUAL.map((group, index) => <details className="learn-manual-group" key={group.title.en} open={index === 0}><summary><span className="learn-manual-number">0{index + 1}</span><h3>{t(index === 0 ? "快速上手" : group.title.zh, index === 0 ? "Quick start" : group.title.en)}</h3><span className="learn-disclosure" aria-hidden="true">+</span></summary><ol>{group.items.map(item => <li key={item.en}>{t(item.zh, item.en)}</li>)}</ol></details>)}</div></section>
      <section className="learn-cta"><div className="learn-container"><div><h2>{t("下一个想理解的问题，是什么？", "What will you understand next?")}</h2><p>{t("带着你的问题，开启一段新的学习。", "Bring a question. Begin a new learning journey.")}</p></div><button className="learn-primary" onClick={() => void open()} disabled={opening || access === "checking"}>{accessLabel}<span aria-hidden="true">↗</span></button></div></section>
      <EditorialFooter />

      {error && !activationOpen && <p className="learn-container learn-error learn-page-error" role="alert">{error}</p>}

      {activationOpen && (
        <div className="learn-modal-backdrop">
          <section className="learn-modal" role="dialog" aria-modal="true" aria-labelledby="learn-activation-title">
            <button className="learn-modal-close" onClick={() => setActivationOpen(false)} aria-label={t("关闭", "Close")}>×</button>

            <h2 id="learn-activation-title">{t("激活 Learn Everything", "Activate Learn Everything")}</h2>
            <p>{t("输入总管理员发放的产品激活码。激活成功后即可打开学习工作台。", "Enter a product activation code issued by the owner to open the learning workspace.")}</p>
            <form onSubmit={(event) => void redeem(event)}>
              <label htmlFor="learn-activation-code">{t("产品激活码", "Product activation code")}</label>
              <input id="learn-activation-code" required minLength={8} maxLength={100} disabled={busy} value={activationCode} onChange={(e) => setActivationCode(e.target.value.toUpperCase())} placeholder="ACT-…" autoComplete="off" aria-describedby={error ? "learn-activation-error" : undefined} />
              <button className="learn-primary" disabled={busy}>{busy ? t("正在激活…", "Activating…") : t("确认激活", "Activate")}</button>
              <p id="learn-activation-error" className="learn-error" role="alert">{error}</p>
            </form>
          </section>
        </div>
      )}
      {loginOpen && (
        <LoginPage
          overlay
          onClose={() => setLoginOpen(false)}
          returnTo={assetUrl("/products/learn-everything/")}
        />
      )}
    </main>
  );
}
