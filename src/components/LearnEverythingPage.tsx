"use client";

import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { useLanguage } from "./LanguageProvider";
import {
  accountApi,
  hasAccountSession,
  type DashboardData,
} from "@/lib/account-client";
import { assetUrl } from "@/lib/asset-url";
import "./learn-everything.css";

type AccessState = "checking" | "active" | "inactive" | "unknown";

const MANUAL = [
  {
    title: { zh: "30 秒快速上手", en: "Get started in 30 seconds" },
    items: [
      { zh: "打开模型配置，填写可用的模型接口并测试连接。", en: "Open Model settings, enter a supported model endpoint and test it." },
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
      { zh: "设置与帮助：调整推理模式、语言、上下文长度，并查看底座帮助。", en: "Settings and Help: adjust reasoning, language and context length, and read the built-in help." },
    ],
  },
  {
    title: { zh: "推荐学习流程", en: "Recommended flow" },
    items: [
      { zh: "配置模型 → 生成并保存路线 → 上传资料 → 按路线学习 → 随时知识问答 → 每天复习 → 每阶段测验 → 看板复盘。", en: "Configure a model → build and save a route → upload references → study by node → ask questions → review daily → test each stage → inspect the dashboard." },
    ],
  },
  {
    title: { zh: "常见问题", en: "Common questions" },
    items: [
      { zh: "路线生成失败通常是模型接口或模型名未配置正确，请先在模型配置里测试，再到知识问答发送一句“你好”。", en: "Route failures usually mean the endpoint or model name is wrong. Test it in Model settings, then send “hello” in Q&A." },
      { zh: "复习和测验没有内容时，先生成并保存学习路线，知识点才会进入复习系统。", en: "If Review or Quiz is empty, save a learning route first so its nodes can enter the review system." },
      { zh: "资料和学习记录保存在学习服务的数据目录；调用模型时会发送问题及选中的资料片段。", en: "Files and study records stay in the learning service data directory; selected snippets are sent to the configured model." },
    ],
  },
];

export function LearnEverythingPage() {
  const { language } = useLanguage();
  const zh = language === "zh";
  const [activationOpen, setActivationOpen] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState("");
  const [access, setAccess] = useState<AccessState>(() =>
    hasAccountSession() ? "checking" : "inactive",
  );

  const t = (cn: string, en: string) => (zh ? cn : en);

  useEffect(() => {
    if (!hasAccountSession()) return;
    accountApi<DashboardData>("/dashboard?days=7&product=learn-everything")
      .then((data) => {
        setAccess(
          data.entitlements.some(
            (item) => item.product_id === "learn-everything" && item.active,
          )
            ? "active"
            : "inactive",
        );
      })
      .catch(() => setAccess("unknown"));
  }, []);

  async function open() {
    if (opening || access === "checking") return;
    if (!hasAccountSession()) {
      const returnTo = encodeURIComponent(assetUrl("/products/learn-everything/"));
      window.location.assign(`${assetUrl("/login/")}?returnTo=${returnTo}`);
      return;
    }
    if (access !== "active") {
      setError(
        access === "unknown"
          ? t("暂时无法检查产品资格，请稍后重试。", "The product status could not be checked. Try again shortly.")
          : "",
      );
      setActivationOpen(true);
      return;
    }
    setOpening(true);
    setError("");
    try {
      const entry = await accountApi<{ url: string }>("/learn-everything/entry", {
        method: "POST",
      });
      window.location.assign(entry.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setAccess("unknown");
    } finally {
      setOpening(false);
    }
  }

  async function redeem() {
    if (!activationCode.trim() || busy) return;
    setBusy(true);
    setError("");
    try {
      await accountApi("/redeem", {
        method: "POST",
        body: JSON.stringify({ code: activationCode.trim() }),
      });
      const data = await accountApi<DashboardData>(
        "/dashboard?days=7&product=learn-everything",
      );
      const hasAccess = data.entitlements.some(
        (item) => item.product_id === "learn-everything" && item.active,
      );
      if (!hasAccess)
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
                    : t("使用邀请码激活", "Activate with invite")}
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
              "以下内容根据 Mac 版 Learn Everything 的使用指南整理，进入工作台后仍可在“使用指南”页查看完整说明。",
              "This manual follows the Mac Learn Everything guide. The full guide remains available in the workspace’s Guide tab.",
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
            <p>{t("输入总管理员发放的产品邀请码。激活成功后即可打开学习工作台。", "Enter a product invite issued by the owner to open the learning workspace.")}</p>
            <input value={activationCode} onChange={(e) => setActivationCode(e.target.value)} placeholder="INV-…" autoComplete="off" />
            <button className="learn-primary" disabled={busy} onClick={() => void redeem()}>{busy ? t("正在激活…", "Activating…") : t("确认激活", "Activate")}</button>
            {error && <p className="learn-error" role="alert">{error}</p>}
          </section>
        </div>
      )}
    </main>
  );
}
