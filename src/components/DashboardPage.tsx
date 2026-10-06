"use client";

import { CSSProperties, FormEvent, useCallback, useEffect, useState } from "react";
import { LoginPage } from "./LoginPage";
import { PasswordSettings } from "./PasswordSettings";
import { useLanguage } from "./LanguageProvider";
import { AdminPanel } from "./admin/AdminPanel";
import {
  AccountError,
  accountApi,
  hasAccountSession,
  signOut,
  type DashboardData,
  type UsagePoint,
} from "@/lib/account-client";
import { assetUrl } from "@/lib/asset-url";
import { BRAND } from "@/lib/site";
import { useDialogFocus } from "@/lib/use-dialog-focus";
import "./dashboard.css";

export function formatCount(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: value >= 1e6 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}
export function formatDate(value: number | null, full = false) {
  return value
    ? new Date(value).toLocaleString("zh-CN", {
        timeZone: "Asia/Shanghai",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        ...(full ? ({ hour: "2-digit", minute: "2-digit" } as const) : {}),
      })
    : "—";
}

function StatCard({
  name,
  value,
  zh,
}: {
  name: string;
  value: UsagePoint;
  zh: boolean;
}) {
  const total = value.inputTokens + value.cachedTokens + value.outputTokens;
  const segments = [value.inputTokens, value.cachedTokens, value.outputTokens];
  return (
    <article className="dash-stat">
      <div className="dash-stat-top">
        <span>{name}</span>
        <small>
          {formatCount(value.points)} {zh ? "积分" : "credits"}
        </small>
      </div>
      <strong>
        {formatCount(value.calls)} <span>{zh ? "次调用" : "calls"}</span>
      </strong>
      <div
        className={`dash-token-bar ${!total ? "is-empty" : ""}`}
        aria-label={`${total} tokens`}
      >
        {segments.map((n, i) => (
          <i
            key={i}
            className={`token-${i}`}
            style={{ width: `${total ? (n / total) * 100 : 0}%` }}
          />
        ))}
      </div>
      <dl>
        {[
          zh ? "输入 · 未缓存" : "Input · uncached",
          zh ? "缓存输入" : "Cached input",
          zh ? "输出" : "Output",
        ].map((label, i) => (
          <div key={label}>
            <dt>
              <i className={`token-${i}`} />
              {label}
            </dt>
            <dd>{formatCount(segments[i])}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function Trend({ values, zh }: { values: UsagePoint[]; zh: boolean }) {
  const max = Math.max(1, ...values.map((v) => v.calls));
  const total = values.reduce((n, v) => n + v.calls, 0);
  const points = values
    .map(
      (v, i) =>
        `${12 + (i / Math.max(1, values.length - 1)) * 476},${148 - (v.calls / max) * 120}`,
    )
    .join(" ");
  return (
    <section className="dash-panel dash-trend">
      <div className="dash-panel-title">
        <h2>{zh ? "用量趋势" : "Usage trend"}</h2>
        <span>
          {zh ? `最近 ${values.length} 天` : `Last ${values.length} days`}
        </span>
      </div>
      <svg
        viewBox="0 0 500 172"
        role="img"
        aria-label={
          zh
            ? `最近 ${values.length} 天共 ${total} 次调用`
            : `${total} calls over ${values.length} days`
        }
      >
        {[28, 68, 108, 148].map((y) => (
          <line
            key={y}
            x1="12"
            x2="488"
            y1={y}
            y2={y}
            stroke="currentColor"
            opacity=".1"
          />
        ))}
        {total > 0 && (
          <polygon
            points={`12,148 ${points} 488,148`}
            fill="var(--dash-cyan)"
            opacity=".07"
          />
        )}
        <polyline
          points={points}
          fill="none"
          stroke="var(--dash-cyan)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {values.length <= 30 &&
          values.map((v, i) => (
            <circle
              key={v.day}
              cx={12 + (i / Math.max(1, values.length - 1)) * 476}
              cy={148 - (v.calls / max) * 120}
              r="3.5"
              fill="var(--dash-cyan)"
            >
              <title>
                {v.day}: {v.calls}
              </title>
            </circle>
          ))}
      </svg>
      <div className="dash-axis">
        <span>{values[0]?.day}</span>
        <span>{values.at(-1)?.day}</span>
      </div>
      <div className="dash-chart-total">
        <strong>
          {formatCount(total)} <small>{zh ? "次调用" : "calls"}</small>
        </strong>
        <span>
          {zh ? "日均" : "Daily avg."}{" "}
          {(total / Math.max(1, values.length)).toFixed(1)}
        </span>
      </div>
      {!total && (
        <p className="dash-empty-inline">
          {zh
            ? "这段时间还没有产品用量记录。"
            : "No product usage recorded in this period."}
        </p>
      )}
    </section>
  );
}

function Heatmap({ values, zh }: { values: UsagePoint[]; zh: boolean }) {
  const max = Math.max(1, ...values.map((v) => v.calls));
  const active = values.filter((v) => v.calls > 0).length;
  return (
    <section className="dash-panel dash-heatmap">
      <div className="dash-panel-title">
        <h2>{zh ? "近半年活跃记录" : "Activity over six months"}</h2>
        <span>
          {active} {zh ? "活跃日" : "active days"}
        </span>
      </div>
      <div className="dash-heatmap-body">
        <div className="dash-heatmap-months">
          {values
            .map((v, i) => ({ month: v.day?.slice(0, 7), i }))
            .filter((v, i, a) => i === 0 || v.month !== a[i - 1].month)
            .map((v) => (
              <span
                key={v.month}
                style={{ gridColumn: Math.floor(v.i / 7) + 1 }}
              >
                {v.month?.slice(5)}
                {zh ? "月" : ""}
              </span>
            ))}
        </div>
        <div
          className="dash-heatmap-grid"
          aria-label={
            zh
              ? "每日调用量，时间从左到右排列"
              : "Daily calls, ordered chronologically"
          }
        >
          {values.map((v, i) => (
            <div
              key={v.day}
              tabIndex={0}
              className={`heat-level-${v.calls ? Math.min(4, Math.ceil((v.calls / max) * 4)) : 0}`}
              aria-label={`${v.day}: ${v.calls}`}
              style={{
                "--heat-column": Math.floor(i / 7) + 0.5,
                "--heat-row": i % 7,
              } as CSSProperties}
            >
              <span>
                {v.day} · {v.calls} {zh ? "次" : "calls"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="dash-heatmap-legend">
        <span>{zh ? "少" : "Less"}</span>
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} className={`heat-level-${i}`} />
        ))}
        <span>{zh ? "多" : "More"}</span>
      </div>
    </section>
  );
}

export function DashboardPage() {
  const { language } = useLanguage();
  const zh = language === "zh";
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [days, setDays] = useState(7);
  const [product, setProduct] = useState("all");
  const [tab, setTab] = useState("overview");
  const [loginOpen, setLoginOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const closePassword = useCallback(() => setPasswordOpen(false), []);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [code, setCode] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  const [revision, setRevision] = useState(0);
  const closeRedeem = useCallback(() => {
    setRedeemOpen(false);
  }, []);
  useDialogFocus(redeemOpen, closeRedeem);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError("");
      if (!hasAccountSession()) {
        setUnauthorized(true);
        setLoading(false);
        return;
      }
      try {
        const next = await accountApi<DashboardData>(
          `/dashboard?days=${days}&product=${encodeURIComponent(product)}`,
        );
        if (active) {
          setData(next);
          setUnauthorized(false);
        }
      } catch (e) {
        if (active) {
          if (e instanceof AccountError && e.status === 401)
            setUnauthorized(true);
          else setError(e instanceof Error ? e.message : String(e));
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [days, product, revision]);
  const refresh = useCallback(() => setRevision((n) => n + 1), []);

  async function redeem(event: FormEvent) {
    event.preventDefault();
    if (redeeming) return;
    setRedeeming(true);
    setError("");
    try {
      await accountApi("/redeem", {
        method: "POST",
        body: JSON.stringify({ code: code.trim() }),
      });
      setNotice(
        zh
          ? "兑换成功，积分与产品权益已更新。"
          : "Redeemed. Your balance and product access are updated.",
      );
      setCode("");
      setRedeemOpen(false);
      refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setRedeeming(false);
    }
  }

  async function logout() {
    try {
      await signOut();
      window.location.assign(assetUrl("/"));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  const t = (cn: string, en: string) => (zh ? cn : en);
  const roleName =
    data?.profile.role === "OWNER"
      ? t("总管理员", "Owner")
      : data?.profile.role === "ADMIN"
        ? t("管理员", "Administrator")
        : t("普通用户", "Member");
  const ratio = data?.walletTotals.credited
    ? Math.min(100, (data.profile.balance / data.walletTotals.credited) * 100)
    : 0;
  return (
    <main className="dashboard-page">
      <header className="dash-topbar" aria-label={t("工作台顶栏", "Workspace header")}>
        <div className="dash-topbar-inner">
          <div className="dash-topbar-brand">
            <a href={assetUrl("/")} aria-label={t("返回以太智元官网", "Back to AethericAI home")}>
              {zh ? BRAND.zh : BRAND.en}
            </a>
            <span>{t("工作台", "Workspace")}</span>
          </div>
          {data && !unauthorized && (
            <div className="dash-account">
              <button className="dash-avatar-button" onClick={() => setAccountMenuOpen((open) => !open)}
                aria-expanded={accountMenuOpen}
                aria-label={t("账户安全：设置或修改密码", "Account security: set or change password")}
                title={t("设置或修改密码", "Set or change password")}>
                <span className="dash-avatar">{data.profile.displayName.slice(0, 1)}</span>
              </button>
              {accountMenuOpen && (
                <div className="dash-account-menu" role="menu">
                  <strong>{data.profile.displayName}</strong>
                  <span>{data.profile.phoneMasked} · {roleName}</span>
                  <button role="menuitem" onClick={() => { setAccountMenuOpen(false); setPasswordOpen(true); }}>
                    {t("账户安全", "Account security")}
                  </button>
                  <button role="menuitem" onClick={() => void logout()}>
                    {t("退出", "Sign out")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <div className="dash-shell">
        <div className="dash-heading">
          <div>
            <p className="dash-eyebrow">AETHERICAI / WORKSPACE</p>
            <h1>{t("账户工作台", "Your workspace")}</h1>
            <p>
              {t(
                "每一份用量、每一项权益，都在这里。",
                "Your usage, access and credits, in one place.",
              )}
            </p>
          </div>
        </div>
        {error && (
          <div className="dash-banner error" role="alert">
            {error}
            <button onClick={refresh}>{t("重试", "Retry")}</button>
          </div>
        )}
        {notice && (
          <div className="dash-banner" role="status">
            {notice}
            <button onClick={() => setNotice("")}>
              {t("收起", "Dismiss")}
            </button>
          </div>
        )}
        {unauthorized ? (
          <section className="dash-panel dash-auth">
            <h2>{t("登录后查看你的工作台", "Sign in to your workspace")}</h2>
            <p>
              {t(
                "使用官网账号查看积分、产品权益和用量。",
                "Use your website account to view credits, access and usage.",
              )}
            </p>
            <button className="dash-primary" onClick={() => setLoginOpen(true)}>
              {t("登录", "Sign in")}
            </button>
          </section>
        ) : !data ? (
          <section className="dash-panel dash-auth" role="status">
            {loading
              ? t("正在读取账户数据…", "Loading your account…")
              : t(
                  "账户数据暂不可用，请重试。",
                  "Account data is unavailable. Please retry.",
                )}
          </section>
        ) : (
          <>
            <div className="dash-actions">
              <nav aria-label={t("工作台导航", "Workspace navigation")}>
                {[
                  ["overview", t("用量概览", "Overview")],
                  ["products", t("我的产品", "My products")],
                  ["ledger", t("积分与订单", "Credits & orders")],
                  ...(data.profile.role !== "USER"
                    ? [["admin", t("管理中心", "Administration")]]
                    : []),
                ].map(([value, name]) => (
                  <button
                    key={value}
                    className={tab === value ? "active" : ""}
                    aria-current={tab === value ? "page" : undefined}
                    onClick={() => setTab(value)}
                  >
                    {name}
                  </button>
                ))}
              </nav>
              <div>
                <a className="dash-quiet-button" href={assetUrl("/products/")}>
                  {t("浏览产品", "Explore products")}
                </a>
                <button
                  className="dash-primary"
                  onClick={() => {
                    setError("");
                    setRedeemOpen(true);
                  }}
                >
                  {t("兑换激活码", "Redeem code")}
                </button>
              </div>
            </div>
            {tab === "overview" && (
              <>
                <section className="dash-overview">
                  <aside className="dash-balance">
                    <div className="dash-ring">
                      <svg viewBox="0 0 210 210" aria-hidden="true">
                        <circle
                          cx="105"
                          cy="105"
                          r="88"
                          className="ring-track"
                        />
                        <circle
                          cx="105"
                          cy="105"
                          r="88"
                          className="ring-value"
                          pathLength="100"
                          strokeDasharray={`${ratio} 100`}
                        />
                        <circle
                          cx="105"
                          cy="105"
                          r="69"
                          className="ring-inner"
                        />
                      </svg>
                      <div>
                        <span>{t("可用积分", "Available credits")}</span>
                        <strong>{formatCount(data.profile.balance)}</strong>
                        <small>{t("账户余额", "Account balance")}</small>
                      </div>
                    </div>
                    <dl>
                      <div>
                        <dt>{t("累计获得", "Credited")}</dt>
                        <dd>{formatCount(data.walletTotals.credited)}</dd>
                      </div>
                      <div>
                        <dt>{t("累计支出", "Spent")}</dt>
                        <dd>{formatCount(data.walletTotals.spent)}</dd>
                      </div>
                    </dl>
                  </aside>
                  <div className="dash-overview-main">
                    <div className="dash-stat-grid">
                      <StatCard
                        name={t("今日", "Today")}
                        value={data.summary.today}
                        zh={zh}
                      />
                      <StatCard
                        name={t("近 7 天", "Last 7 days")}
                        value={data.summary.week}
                        zh={zh}
                      />
                      <StatCard
                        name={t("累计", "All time")}
                        value={data.summary.total}
                        zh={zh}
                      />
                    </div>
                    <div className="dash-access-strip">
                      <div>
                        <h2>{t("产品权益", "Product access")}</h2>
                        <p>
                          {t(
                            "已激活的产品与剩余次数",
                            "Active products and remaining uses",
                          )}
                        </p>
                      </div>
                      <strong>
                        {data.entitlements.filter((e) => e.active).length}
                        <small> / {data.products.length}</small>
                      </strong>
                      <div
                        className="dash-access-progress"
                        role="img"
                        aria-label={`${data.entitlements.filter((e) => e.active).length}/${data.products.length}`}
                      >
                        {data.products.map((p) => (
                          <i
                            key={p.id}
                            className={
                              data.entitlements.some(
                                (e) => e.product_id === p.id && e.active,
                              )
                                ? "active"
                                : ""
                            }
                            title={zh ? p.name : p.name_en}
                          />
                        ))}
                      </div>
                      <button onClick={() => setTab("products")}>
                        {t("查看我的产品", "View my products")} →
                      </button>
                    </div>
                  </div>
                </section>
                <div className="dash-filters">
                  <div>
                    <h2>{t("使用记录", "Usage insights")}</h2>
                    <span>
                      {t(
                        "北京时间 · 实际产品调用",
                        "Asia/Shanghai · Recorded product calls",
                      )}
                    </span>
                  </div>
                  <div>
                    <label>
                      <span className="sr-only">
                        {t("产品筛选", "Filter by product")}
                      </span>
                      <select
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                      >
                        <option value="all">
                          {t("全部产品", "All products")}
                        </option>
                        {data.products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {zh ? p.name : p.name_en}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span className="sr-only">
                        {t("时间范围", "Time range")}
                      </span>
                      <select
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                      >
                        {[7, 30, 90, 180].map((d) => (
                          <option key={d} value={d}>
                            {t(`近 ${d} 天`, `Last ${d} days`)}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
                <div className="dash-chart-grid">
                  <Heatmap values={data.heatmap} zh={zh} />
                  <Trend values={data.trend} zh={zh} />
                </div>
                <section className="dash-panel dash-ranking">
                  <div className="dash-panel-title">
                    <h2>{t("各产品用量", "Usage by product")}</h2>
                    <span>{t("按调用量排序", "Ranked by calls")}</span>
                  </div>
                  {data.ranking.length ? (
                    data.ranking.map((row, i) => (
                      <div className="dash-ranking-row" key={row.product_id}>
                        <span className="dash-rank">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <strong>
                          {data.products.find((p) => p.id === row.product_id)?.[
                            zh ? "name" : "name_en"
                          ] || row.product_id}
                        </strong>
                        <span>
                          {formatCount(row.calls)} {t("次调用", "calls")}
                        </span>
                        <span>
                          {formatCount(row.points)} {t("积分", "credits")}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="dash-empty-inline">
                      {t(
                        "暂无用量。开始使用已激活的产品后，记录会显示在这里。",
                        "No usage yet. Records appear after you use an activated product.",
                      )}
                    </p>
                  )}
                </section>
              </>
            )}
            {tab === "products" && (
              <section className="dash-panel">
                <div className="dash-panel-title">
                  <h2>{t("我的产品与权益", "My products & access")}</h2>
                  <a href={assetUrl("/products/")}>
                    {t("购买产品", "Get products")} →
                  </a>
                </div>
                {data.entitlements.length ? (
                  <div className="dash-product-grid">
                    {data.entitlements.map((p) => (
                      <article key={p.product_id} className="dash-product">
                        <span
                          className={`dash-badge ${p.active ? "" : "muted"}`}
                        >
                          {p.active
                            ? t("已激活", "Active")
                            : t("已到期 / 已用完", "Expired / depleted")}
                        </span>
                        <h3>{zh ? p.name : p.name_en}</h3>
                        <strong>
                          {formatCount(p.units)}{" "}
                          <small>{t("剩余次数", "uses left")}</small>
                        </strong>
                        <p>
                          {t("有效期至", "Access until")}{" "}
                          {formatDate(p.expires_at_ms)}
                        </p>
                        {p.active && p.entry_url ? (
                          <a
                            className="dash-primary"
                            href={p.entry_url}
                            rel="noopener noreferrer"
                          >
                            {t("进入产品", "Open product")} →
                          </a>
                        ) : (
                          <a
                            className="dash-quiet-button"
                            href={assetUrl("/products/")}
                          >
                            {t("查看产品", "View product")}
                          </a>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="dash-empty">
                    <h3>
                      {t("还没有激活的产品", "No activated products yet")}
                    </h3>
                    <p>
                      {t(
                        "可以兑换产品激活码，或到产品页查看可购买的权益。",
                        "Redeem a product code or explore available access packages.",
                      )}
                    </p>
                    <a href={assetUrl("/products/")} className="dash-primary">
                      {t("浏览产品", "Explore products")}
                    </a>
                  </div>
                )}
              </section>
            )}
            {tab === "ledger" && (
              <>
                <section className="dash-panel">
                  <div className="dash-panel-title">
                    <h2>{t("积分流水", "Credit history")}</h2>
                    <span>{t("最近 100 笔", "Latest 100 entries")}</span>
                  </div>
                  <div className="dash-table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>{t("时间", "Time")}</th>
                          <th>{t("内容", "Description")}</th>
                          <th>{t("变动", "Change")}</th>
                          <th>{t("变动后余额", "Balance after")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.ledger.map((r) => (
                          <tr key={r.id}>
                            <td>{formatDate(r.created_at_ms, true)}</td>
                            <td>{r.reason}</td>
                            <td className={r.delta > 0 ? "dash-positive" : ""}>
                              {r.delta > 0 ? "+" : ""}
                              {r.delta}
                            </td>
                            <td>{r.balance_after}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {!data.ledger.length && (
                      <p className="dash-empty-inline">
                        {t(
                          "暂无积分记录。兑换激活码后可以在这里查看明细。",
                          "No credit entries yet. Redeem a code to get started.",
                        )}
                      </p>
                    )}
                  </div>
                </section>
                <section className="dash-panel">
                  <div className="dash-panel-title">
                    <h2>{t("购买记录", "Purchase history")}</h2>
                  </div>
                  <div className="dash-table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>{t("产品", "Product")}</th>
                          <th>{t("积分", "Credits")}</th>
                          <th>{t("次数 / 天数", "Uses / days")}</th>
                          <th>{t("时间", "Time")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.orders.map((o) => (
                          <tr key={o.id}>
                            <td>{o.name}</td>
                            <td>{o.price}</td>
                            <td>
                              {o.units} / {o.days}
                            </td>
                            <td>{formatDate(o.created_at_ms, true)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {!data.orders.length && (
                      <p className="dash-empty-inline">
                        {t("暂无购买记录", "No purchases yet")}
                      </p>
                    )}
                  </div>
                </section>
              </>
            )}
            {tab === "admin" && data.profile.role !== "USER" && (
              <AdminPanel
                profile={data.profile}
                products={data.products}
                onChanged={refresh}
              />
            )}
            <footer className="dash-footer">
              <span>
                {loading
                  ? t("正在更新…", "Updating…")
                  : `${t("更新于", "Updated")} ${formatDate(data.asOf, true)}`}
              </span>
              <button onClick={refresh}>{t("刷新数据", "Refresh")}</button>
            </footer>
          </>
        )}
      </div>
      {loginOpen && <LoginPage overlay onClose={() => setLoginOpen(false)} />}
      {passwordOpen && data && !unauthorized && <PasswordSettings zh={zh} phoneMasked={data.profile.phoneMasked} onClose={closePassword} />}
      {redeemOpen && (
        <div className="dash-modal-backdrop">
          <section
            className="dash-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="redeem-title"
          >
            <button
              className="dash-modal-close"
              onClick={() => {
                setRedeemOpen(false);
                setError("");
              }}
              aria-label={t("关闭", "Close")}
            >
              ×
            </button>
            <p className="dash-eyebrow">ACTIVATE</p>
            <h2 id="redeem-title">{t("兑换激活码", "Redeem your code")}</h2>
            <p>
              {t(
                "激活码可增加积分、开通产品或补充使用次数。",
                "Add credits, activate a product or top up your usage quota.",
              )}
            </p>
            <form onSubmit={redeem}>
              <label>
                {t("激活码", "Activation code")}
                <input
                  autoFocus
                  required
                  maxLength={100}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="ACT-…"
                  autoComplete="off"
                />
              </label>
              {error && (
                <p role="alert" className="dash-form-error">
                  {error}
                </p>
              )}
              <button disabled={redeeming} className="dash-primary">
                {redeeming
                  ? t("正在兑换…", "Redeeming…")
                  : t("确认兑换", "Redeem")}
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
