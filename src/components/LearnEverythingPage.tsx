"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Nav } from "./Nav";
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

  return (
    <main className="learn-page">
      <Nav />
      <section className="learn-hero">
        <div className="learn-container">
          <p className="learn-kicker">LEARN EVERYTHING / SCIENCE WORKSPACE</p>
          <h1>{t("Learn Everything 学习 Agent", "Learn Everything Learning Agent")}</h1>
          <p>
            {t(
              "把一个问题变成一条可执行、可复习、可验证的学习路线。",
              "Turn one question into an executable, reviewable and verifiable learning route.",
            )}
          </p>
          <div className="learn-hero-actions">
            <button className="learn-primary" onClick={() => void open()} disabled={opening || access === "checking"}>
              {opening
                ? t("正在打开…", "Opening…")
                : access === "active"
                  ? t("打开学习工作台", "Open learning workspace")
                  : access === "checking"
                    ? t("正在检查资格…", "Checking access…")
                    : hasAccountSession()
                      ? t("使用激活码激活", "Activate with code")
                      : t("登录后使用", "Sign in to use")}
            </button>
            <a className="learn-secondary" href="#manual">
              {t("查看操作手册", "Read the manual")} ↓
            </a>
          </div>
        </div>
      </section>

      <section className="learn-container learn-section">
        <h2>{t("一个完整的学习闭环", "A complete learning loop")}</h2>
        <div className="learn-feature-grid">
          {[
            ["01", "生成路线", "Build a route", "输入选题、背景和目标，生成带依赖关系的分阶段学习路线。", "Generate a staged route with dependencies from your topic, background and goal."],
            ["02", "知识库问答", "Ask your library", "上传 PDF、Word、Markdown 等资料，用引用溯源的问答理解内容。", "Ask questions over PDFs, Word files and Markdown with source-grounded answers."],
            ["03", "复习与测验", "Review and test", "FSRS 间隔复习、薄弱点测验和掌握度更新连在一起。", "FSRS review, weak-point quizzes and mastery updates work together."],
            ["04", "看板与导出", "Track and export", "查看学习记录、日报和掌握度，并导出 Markdown、Anki 或打印报告。", "Track study records and mastery, then export Markdown, Anki or printable reports."],
          ].map(([number, title, enTitle, body, enBody]) => (
            <article key={number}>
              <b>{number}</b>
              <h3>{t(title, enTitle)}</h3>
              <p>{t(body, enBody)}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="manual" className="learn-container learn-section learn-manual">
        <div>
          <p className="learn-kicker">OPERATION MANUAL</p>
          <h2>{t("操作说明", "How to use it")}</h2>
          <p className="learn-manual-intro">
            {t(
              "以下内容根据 Learn Everything 使用指南整理，并适配官网账号、激活码与服务器版操作流程。",
              "This manual adapts the Learn Everything guide to website accounts, activation codes and the server workflow.",
            )}
          </p>
        </div>
        <div className="learn-manual-groups">
          {MANUAL.map((group) => (
            <article className="learn-manual-group" key={group.title.en}>
              <h3>{t(group.title.zh, group.title.en)}</h3>
              <ol>
                {group.items.map((item) => (
                  <li key={item.en}>{t(item.zh, item.en)}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      {error && !activationOpen && <p className="learn-container learn-error learn-page-error" role="alert">{error}</p>}

      {activationOpen && (
        <div className="learn-modal-backdrop">
          <section className="learn-modal" role="dialog" aria-modal="true" aria-labelledby="learn-activation-title">
            <button className="learn-modal-close" onClick={() => setActivationOpen(false)} aria-label={t("关闭", "Close")}>×</button>
            <p className="learn-kicker">PRODUCT ACTIVATION</p>
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
