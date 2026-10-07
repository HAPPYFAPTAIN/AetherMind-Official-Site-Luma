"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  accountApi,
  type AccountProduct,
  type AccountProfile,
} from "@/lib/account-client";
import { useLanguage } from "../LanguageProvider";
import { useDialogFocus } from "@/lib/use-dialog-focus";

type Batch = {
  id: string;
  label: string;
  credits: number;
  units: number;
  days: number;
  product_id: string | null;
  assigned_to: string | null;
  quantity: number;
  used: number;
  revoked_at_ms: number | null;
  expires_at_ms: number;
};
type Audit = {
  id: string;
  actor_id: string;
  target_id: string | null;
  action: string;
  detail: string;
  created_at_ms: number;
};
type ProductKey = {
  id: string;
  product_id: string;
  suffix: string;
  revoked_at_ms: number | null;
};
type Invitation = {
  code: string;
  label: string;
  product_id: string | null;
  uses: number;
  expires_at_ms: number;
  revoked_at_ms: number | null;
};
const date = (n: number) =>
  new Date(n).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });

export function AdminPanel({
  profile,
  products,
  onChanged,
}: {
  profile: AccountProfile;
  products: AccountProduct[];
  onChanged: () => void;
}) {
  const { language } = useLanguage();
  const zh = language === "zh";
  const t = (cn: string, en: string) => (zh ? cn : en);
  const owner = profile.role === "OWNER";
  const [section, setSection] = useState("users");
  const [users, setUsers] = useState<AccountProfile[]>([]);
  const [assignees, setAssignees] = useState<AccountProfile[]>([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [audits, setAudits] = useState<Audit[]>([]);
  const [keys, setKeys] = useState<ProductKey[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(false);
  const [asOf, setAsOf] = useState(0);
  const [actionRequestId, setActionRequestId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [target, setTarget] = useState<AccountProfile | null>(null);
  const [action, setAction] = useState<"role" | "credits" | "redeem">("role");
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const [scopes, setScopes] = useState<string[]>([]);
  const [delta, setDelta] = useState("");
  const [reason, setReason] = useState("");
  const [code, setCode] = useState("");
  const [codes, setCodes] = useState<string[]>([]);
  const batchRequest = useRef({ value: "", id: "" });
  const [batchForm, setBatchForm] = useState({
    label: "",
    quantity: 10,
    credits: 0,
    units: 0,
    days: 0,
    productId: "",
    validDays: 30,
    assignedTo: "",
  });
  const [editProduct, setEditProduct] = useState<AccountProduct | null>(null);
  const [newKey, setNewKey] = useState("");
  const [inviteLabel, setInviteLabel] = useState("");
  const [inviteProduct, setInviteProduct] = useState("md-exp");
  const [inviteDays, setInviteDays] = useState(30);
  const [newInvitation, setNewInvitation] = useState("");
  const [confirmRevoke, setConfirmRevoke] = useState<{
    type: "batches" | "keys";
    id: string;
  } | null>(null);
  const closeDialog = useCallback(() => {
    setTarget(null);
    setEditProduct(null);
    setConfirmRevoke(null);
  }, []);
  useDialogFocus(!!(target || editProduct || confirmRevoke), closeDialog);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError("");
      setAsOf(Date.now());
      try {
        if (section === "users") {
          const r = await accountApi<{
            items: AccountProfile[];
            total: number;
          }>(`/admin/users?q=${encodeURIComponent(query)}&offset=${offset}`);
          if (active) {
            setUsers(r.items);
            setTotal(r.total);
          }
        } else if (section === "codes") {
          const r = await accountApi<{ items: Batch[] }>("/admin/batches");
          if (active) setBatches(r.items);
          if (owner) {
            const admins = await accountApi<{ items: AccountProfile[] }>(
              "/admin/assignees",
            );
            if (active) setAssignees(admins.items);
          }
        } else if (section === "audit") {
          const r = await accountApi<{ items: Audit[] }>(
            `/admin/audit?offset=${offset}`,
          );
          if (active) setAudits(r.items);
        } else if (section === "products" && owner) {
          const r = await accountApi<{ items: ProductKey[] }>("/admin/keys");
          if (active) setKeys(r.items);
        } else if (section === "invitations" && owner) {
          const r = await accountApi<{ items: Invitation[] }>("/api/v1/community/admin/invitations");
          if (active) setInvitations(r.items);
        }
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [section, query, offset, revision, owner]);

  async function run(work: () => Promise<unknown>, success: string) {
    if (busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await work();
      setNotice(success);
      setRevision((n) => n + 1);
      onChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }
  function openUser(user: AccountProfile, next: typeof action) {
    setTarget(user);
    setAction(next);
    setRole(user.role === "ADMIN" ? "ADMIN" : "USER");
    setActionRequestId(crypto.randomUUID());
    setScopes(user.productIds);
    setDelta("");
    setReason("");
    setCode("");
    setError("");
  }
  function saveUser(e: FormEvent) {
    e.preventDefault();
    if (!target) return;
    void run(
      async () => {
        if (action === "role")
          await accountApi(`/admin/users/${target.userId}/role`, {
            method: "PATCH",
            body: JSON.stringify({ role, productIds: scopes }),
          });
        if (action === "credits")
          await accountApi(`/admin/users/${target.userId}/credits`, {
            method: "POST",
            body: JSON.stringify({
              delta: Number(delta),
              reason,
              requestId: actionRequestId,
            }),
          });
        if (action === "redeem")
          await accountApi("/redeem", {
            method: "POST",
            body: JSON.stringify({ code, targetUserId: target.userId }),
          });
        setTarget(null);
      },
      t("用户信息已更新。", "Account updated."),
    );
  }
  function createBatch(e: FormEvent) {
    e.preventDefault();
    const value = JSON.stringify(batchForm);
    if (batchRequest.current.value !== value)
      batchRequest.current = { value, id: crypto.randomUUID() };
    void run(
      async () => {
        const r = await accountApi<{ codes: string[] }>("/admin/batches", {
          method: "POST",
          body: JSON.stringify({
            ...batchForm,
            requestId: batchRequest.current.id,
            productId: batchForm.productId || null,
            assignedTo: batchForm.assignedTo || null,
          }),
        });
        setCodes(r.codes);
        batchRequest.current = { value: "", id: "" };
      },
      t(
        "激活码已生成，请立即下载保存。完整激活码只显示这一次。",
        "Codes created. Download them now; complete codes are shown only once.",
      ),
    );
  }
  function downloadCodes() {
    const blob = new Blob(["code\r\n" + codes.join("\r\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = `activation-codes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  function saveProduct(e: FormEvent) {
    e.preventDefault();
    if (!editProduct) return;
    const p = editProduct;
    void run(
      async () => {
        await accountApi(`/admin/products/${p.id}`, {
          method: "PUT",
          body: JSON.stringify({
            name: p.name,
            nameEn: p.name_en,
            description: p.description,
            entryUrl: p.entry_url,
            status: p.status,
            price: p.price,
            packageUnits: p.package_units,
            packageDays: p.package_days,
            unitPointCost: p.unit_point_cost,
          }),
        });
        setEditProduct(null);
      },
      t("产品配置已保存。", "Product settings saved."),
    );
  }
  function createInvitation(e: FormEvent) {
    e.preventDefault();
    void run(async () => {
      const r = await accountApi<{ code: string }>("/api/v1/community/admin/invitations", {
        method: "POST",
        body: JSON.stringify({ label: inviteLabel, productId: inviteProduct, validDays: inviteDays }),
      });
      setNewInvitation(r.code);
      setInviteLabel("");
    }, t("产品邀请码已生成。请立即复制保存。", "Product invitation created. Copy it now."));
  }

  return (
    <section className="dash-admin">
      <div className="dash-admin-heading">
        <div>
          <p className="dash-eyebrow">ADMINISTRATION</p>
          <h2>
            {owner
              ? t("总管理员中心", "Owner administration")
              : t("产品管理中心", "Product administration")}
          </h2>
          <p>
            {owner
              ? t(
                  "管理用户身份、积分、产品权益和激活码。",
                  "Manage roles, credits, product access and activation codes.",
                )
              : t(
                  "使用分配给你的激活码，为用户充值积分或开通产品。",
                  "Use your assigned activation codes to grant credits and product access.",
                )}
          </p>
        </div>
        <span className="dash-badge">
          {owner ? t("总管理员", "Owner") : t("管理员", "Admin")}
        </span>
      </div>
      <nav
        className="dash-admin-tabs"
        aria-label={t("管理菜单", "Administration menu")}
      >
        {[
          ["users", t("用户管理", "Users")],
          ["codes", t("激活码", "Activation codes")],
          ...(owner ? [["invitations", t("产品邀请码", "Product invites")]] : []),
          ...(owner ? [["products", t("产品配置", "Product settings")]] : []),
          ["audit", t("操作记录", "Audit log")],
        ].map(([value, name]) => (
          <button
            key={value}
            className={section === value ? "active" : ""}
            onClick={() => {
              setSection(value);
              setOffset(0);
              setError("");
              setNotice("");
            }}
          >
            {name}
          </button>
        ))}
      </nav>
      {error && (
        <div role="alert" className="dash-banner error">
          {error}
        </div>
      )}
      {notice && (
        <div role="status" className="dash-banner">
          {notice}
        </div>
      )}
      {loading && (
        <p role="status" className="dash-empty-inline">
          {t("正在读取…", "Loading…")}
        </p>
      )}
      {section === "users" && (
        <section className="dash-panel">
          <div className="dash-panel-title">
            <h3>
              {t("用户列表", "Users")} <small>{total}</small>
            </h3>
            <form
              className="dash-search"
              onSubmit={(e) => {
                e.preventDefault();
                setOffset(0);
                setQuery(q);
              }}
            >
              <input
                aria-label={t("搜索用户", "Search users")}
                placeholder={t(
                  "昵称、用户 ID、手机号或尾号",
                  "Name, user ID or phone",
                )}
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button className="dash-quiet-button">
                {t("搜索", "Search")}
              </button>
            </form>
          </div>
          <div className="dash-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t("用户", "User")}</th>
                  <th>{t("身份", "Role")}</th>
                  <th>{t("积分", "Credits")}</th>
                  <th>{t("产品范围", "Product scope")}</th>
                  <th>{t("操作", "Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.userId}>
                    <td>
                      <strong>{u.displayName}</strong>
                      <small>{u.phoneMasked}</small>
                      <small title={u.userId}>{u.userId.slice(0, 8)}…</small>
                    </td>
                    <td>
                      {u.role === "OWNER"
                        ? t("总管理员", "Owner")
                        : u.role === "ADMIN"
                          ? t("管理员", "Admin")
                          : t("普通用户", "Member")}
                    </td>
                    <td>{u.balance.toLocaleString()}</td>
                    <td>
                      {u.role === "OWNER"
                        ? t("全部", "All")
                        : u.productIds
                            .map(
                              (id) =>
                                products.find((p) => p.id === id)?.name || id,
                            )
                            .join("、") || "—"}
                    </td>
                    <td>
                      <div className="dash-row-actions">
                        {owner && u.role !== "OWNER" && (
                          <button onClick={() => openUser(u, "role")}>
                            {t("设置身份", "Set role")}
                          </button>
                        )}
                        {owner && (
                          <button onClick={() => openUser(u, "credits")}>
                            {t("调整积分", "Adjust credits")}
                          </button>
                        )}
                        <button onClick={() => openUser(u, "redeem")}>
                          {t("激活码授权", "Grant with code")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!users.length && !loading && (
              <p className="dash-empty-inline">
                {t(
                  "没有找到用户。用户须先完成官网短信登录。",
                  "No users found. Users must sign in with verified SMS first.",
                )}
              </p>
            )}
          </div>
          <div className="dash-pagination">
            <button
              disabled={!offset}
              onClick={() => setOffset((n) => Math.max(0, n - 50))}
            >
              {t("上一页", "Previous")}
            </button>
            <span>
              {offset + 1}–{Math.min(offset + 50, total)} / {total}
            </span>
            <button
              disabled={offset + 50 >= total}
              onClick={() => setOffset((n) => n + 50)}
            >
              {t("下一页", "Next")}
            </button>
          </div>
        </section>
      )}
      {section === "codes" && (
        <>
          {owner && (
            <section className="dash-panel">
              <div className="dash-panel-title">
                <h3>{t("批量生成激活码", "Generate activation codes")}</h3>
                <span>{t("每个激活码仅可使用一次", "Single-use codes")}</span>
              </div>
              <form className="dash-admin-form" onSubmit={createBatch}>
                <label>
                  {t("批次名称", "Batch label")}
                  <input
                    required
                    maxLength={80}
                    value={batchForm.label}
                    onChange={(e) =>
                      setBatchForm({ ...batchForm, label: e.target.value })
                    }
                    placeholder={t(
                      "例如：研究团队试用",
                      "e.g. Research team trial",
                    )}
                  />
                </label>
                <label>
                  {t("生成数量", "Quantity")}
                  <input
                    required
                    type="number"
                    min={1}
                    max={500}
                    value={batchForm.quantity}
                    onChange={(e) =>
                      setBatchForm({
                        ...batchForm,
                        quantity: Number(e.target.value),
                      })
                    }
                  />
                </label>
                <label>
                  {t("每码积分", "Credits per code")}
                  <input
                    type="number"
                    min={0}
                    max={1000000}
                    value={batchForm.credits}
                    onChange={(e) =>
                      setBatchForm({
                        ...batchForm,
                        credits: Number(e.target.value),
                      })
                    }
                  />
                </label>
                <label>
                  {t("授权产品（选填）", "Product access (optional)")}
                  <select
                    value={batchForm.productId}
                    onChange={(e) =>
                      setBatchForm({
                        ...batchForm,
                        productId: e.target.value,
                        units: 0,
                        days: 0,
                        assignedTo: "",
                      })
                    }
                  >
                    <option value="">{t("仅充值积分", "Credits only")}</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {zh ? p.name : p.name_en}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  {t("每码使用次数", "Uses per code")}
                  <input
                    disabled={!batchForm.productId}
                    type="number"
                    min={0}
                    max={1000000}
                    value={batchForm.units}
                    onChange={(e) =>
                      setBatchForm({
                        ...batchForm,
                        units: Number(e.target.value),
                      })
                    }
                  />
                </label>
                <label>
                  {t("每码有效天数", "Access days per code")}
                  <input
                    disabled={!batchForm.productId}
                    type="number"
                    min={0}
                    max={3650}
                    value={batchForm.days}
                    onChange={(e) =>
                      setBatchForm({
                        ...batchForm,
                        days: Number(e.target.value),
                      })
                    }
                  />
                </label>
                <label>
                  {t("兑换期限（天）", "Redeem within (days)")}
                  <input
                    required
                    type="number"
                    min={1}
                    max={365}
                    value={batchForm.validDays}
                    onChange={(e) =>
                      setBatchForm({
                        ...batchForm,
                        validDays: Number(e.target.value),
                      })
                    }
                  />
                </label>
                <label>
                  {t(
                    "分配管理员（选填）",
                    "Assign an administrator (optional)",
                  )}
                  <select
                    value={batchForm.assignedTo}
                    onChange={(e) =>
                      setBatchForm({ ...batchForm, assignedTo: e.target.value })
                    }
                  >
                    <option value="">
                      {t("持码用户自行兑换", "Self-service redemption")}
                    </option>
                    {assignees
                      .filter(
                        (u) =>
                          !batchForm.productId ||
                          u.role === "OWNER" ||
                          u.productIds.includes(batchForm.productId),
                      )
                      .map((u) => (
                        <option key={u.userId} value={u.userId}>
                          {u.displayName} · {u.phoneMasked}
                        </option>
                      ))}
                  </select>
                </label>
                <p className="dash-form-note">
                  {t(
                    `本批总额：${batchForm.quantity * batchForm.credits} 积分 · ${batchForm.quantity * batchForm.units} 次。产品按天授权在有效期内不限次数，按次授权按调用扣减。`,
                    `Batch total: ${batchForm.quantity * batchForm.credits} credits · ${batchForm.quantity * batchForm.units} uses. Time access covers calls until expiry; use-based access is metered.`,
                  )}
                </p>
                <button
                  className="dash-primary"
                  disabled={
                    busy ||
                    (!batchForm.credits &&
                      !batchForm.units &&
                      !batchForm.days &&
                      batchForm.productId !== "md-exp") ||
                    codes.length > 0
                  }
                >
                  {t("生成激活码", "Generate codes")}
                </button>
              </form>
              {codes.length > 0 && (
                <div className="dash-code-result">
                  <strong>
                    {t(
                      `已生成 ${codes.length} 个激活码，请下载后再关闭。`,
                      `${codes.length} codes generated. Download before closing.`,
                    )}
                  </strong>
                  <textarea
                    readOnly
                    aria-label={t(
                      "新生成的激活码",
                      "Generated activation codes",
                    )}
                    value={codes.join("\n")}
                    rows={4}
                  />
                  <div>
                    <button className="dash-primary" onClick={downloadCodes}>
                      {t("下载 CSV", "Download CSV")}
                    </button>
                    <button
                      className="dash-quiet-button"
                      onClick={() => setCodes([])}
                    >
                      {t("已保存，关闭", "Saved, close")}
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}
          <section className="dash-panel">
            <div className="dash-panel-title">
              <h3>{t("激活码批次", "Activation batches")}</h3>
            </div>
            <div className="dash-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{t("批次 / 分配", "Batch / assignee")}</th>
                    <th>{t("每码权益", "Per-code value")}</th>
                    <th>{t("已用 / 总量", "Used / total")}</th>
                    <th>{t("兑换截止", "Expiry")}</th>
                    <th>{t("状态", "Status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map((b) => (
                    <tr key={b.id}>
                      <td>
                        {b.label}
                        <small>
                          {b.assigned_to || t("用户自行兑换", "Self-service")}
                        </small>
                      </td>
                      <td>
                        {b.credits} {t("积分", "credits")}
                        <small>
                          {b.product_id || "—"} · {b.units} {t("次", "uses")} ·{" "}
                          {b.days} {t("天", "days")}
                        </small>
                      </td>
                      <td>
                        {b.used} / {b.quantity}
                      </td>
                      <td>{date(b.expires_at_ms)}</td>
                      <td>
                        {b.revoked_at_ms ? (
                          t("已撤销", "Revoked")
                        ) : b.expires_at_ms <= asOf ? (
                          t("已过期", "Expired")
                        ) : owner ? (
                          <button
                            className="dash-danger-text"
                            onClick={() =>
                              setConfirmRevoke({ type: "batches", id: b.id })
                            }
                          >
                            {t("撤销剩余码", "Revoke unused")}
                          </button>
                        ) : (
                          t("有效", "Active")
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!batches.length && (
                <p className="dash-empty-inline">
                  {t(
                    "暂无可管理的激活码批次。",
                    "No activation batches assigned.",
                  )}
                </p>
              )}
            </div>
          </section>
        </>
      )}
      {section === "products" && owner && (
        <>
          <section className="dash-panel">
            <div className="dash-panel-title">
              <h3>{t("产品与积分套餐", "Products & credit packages")}</h3>
              <span>
                {t(
                  "价格和额度由你配置后开放",
                  "Publish after configuring price and access",
                )}
              </span>
            </div>
            <div className="dash-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{t("产品", "Product")}</th>
                    <th>{t("状态", "Status")}</th>
                    <th>{t("售价 / 次数 / 天数", "Price / uses / days")}</th>
                    <th>{t("操作", "Actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>
                        {zh ? p.name : p.name_en}
                        <small>{p.id}</small>
                      </td>
                      <td>
                        {p.status === "AVAILABLE"
                          ? t("已上架", "Available")
                          : t("未上架", "Not for sale")}
                      </td>
                      <td>
                        {p.price} / {p.package_units} / {p.package_days}
                      </td>
                      <td>
                        <div className="dash-row-actions">
                          <button
                            onClick={() => {
                              setError("");
                              setEditProduct({ ...p });
                            }}
                          >
                            {t("配置产品", "Configure")}
                          </button>
                          <button
                            disabled={busy || !!newKey}
                            onClick={() =>
                              void run(
                                async () => {
                                  const r = await accountApi<{ key: string }>(
                                    `/admin/products/${p.id}/keys`,
                                    { method: "POST" },
                                  );
                                  setNewKey(r.key);
                                },
                                t(
                                  "产品接入凭据已生成。仅交给该产品服务端保存。",
                                  "Integration key generated. Store only on the product server.",
                                ),
                              )
                            }
                          >
                            {t("生成接入凭据", "Issue integration key")}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {newKey && (
              <div className="dash-code-result">
                <label>
                  {t("新凭据（仅显示一次）", "New key (shown once)")}
                  <input
                    readOnly
                    value={newKey}
                    onFocus={(e) => e.target.select()}
                  />
                </label>
                <button
                  onClick={() => setNewKey("")}
                  className="dash-quiet-button"
                >
                  {t("已保存，关闭", "Saved, close")}
                </button>
              </div>
            )}
          </section>
          <section className="dash-panel">
            <h3>{t("产品接入凭据", "Integration keys")}</h3>
            <div className="dash-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{t("产品", "Product")}</th>
                    <th>{t("凭据尾号", "Key suffix")}</th>
                    <th>{t("状态", "Status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {keys.map((k) => (
                    <tr key={k.id}>
                      <td>{k.product_id}</td>
                      <td>•••• {k.suffix}</td>
                      <td>
                        {k.revoked_at_ms ? (
                          t("已撤销", "Revoked")
                        ) : (
                          <button
                            className="dash-danger-text"
                            onClick={() =>
                              setConfirmRevoke({ type: "keys", id: k.id })
                            }
                          >
                            {t("撤销", "Revoke")}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
      {section === "invitations" && owner && (
        <>
          <section className="dash-panel">
            <div className="dash-panel-title"><h3>{t("生成产品邀请码", "Generate product invites")}</h3><span>{t("登录时解锁产品资格", "Unlock product qualification at sign-in")}</span></div>
            <form className="dash-admin-form" onSubmit={createInvitation}>
              <label>{t("用途说明", "Label")}<input required maxLength={80} value={inviteLabel} onChange={(e) => setInviteLabel(e.target.value)} placeholder={t("例如：MD EXP 首批用户", "e.g. MD EXP early users")} /></label>
              <label>{t("产品", "Product")}<select value={inviteProduct} onChange={(e) => setInviteProduct(e.target.value)}><option value="md-exp">MD EXP</option><option value="gromacs">GROMACS</option><option value="dft">DFT</option><option value="materials">{t("材料分析智能体", "Materials analysis")}</option></select></label>
              <label>{t("有效天数", "Valid days")}<input type="number" min={1} max={365} value={inviteDays} onChange={(e) => setInviteDays(Number(e.target.value))} /></label>
              <button className="dash-primary" disabled={busy}>{t("生成邀请码", "Generate invite")}</button>
            </form>
            {newInvitation && <div className="dash-code-result"><strong>{t("新邀请码（仅显示一次）", "New invite (shown once)")}</strong><input readOnly value={newInvitation} onFocus={(e) => e.target.select()} /><button className="dash-quiet-button" onClick={() => setNewInvitation("")}>{t("已保存，关闭", "Saved, close")}</button></div>}
          </section>
          <section className="dash-panel"><div className="dash-panel-title"><h3>{t("产品邀请码记录", "Product invitation history")}</h3></div><div className="dash-table-wrap"><table><thead><tr><th>{t("邀请码", "Code")}</th><th>{t("产品", "Product")}</th><th>{t("使用次数", "Uses")}</th><th>{t("截止时间", "Expiry")}</th><th>{t("状态", "Status")}</th></tr></thead><tbody>{invitations.map((item) => <tr key={item.code}><td><strong>{item.code}</strong><small>{item.label}</small></td><td>{item.product_id || "—"}</td><td>{item.uses}</td><td>{date(item.expires_at_ms)}</td><td>{item.revoked_at_ms ? t("已撤销", "Revoked") : t("有效", "Active")}</td></tr>)}</tbody></table>{!invitations.length && <p className="dash-empty-inline">{t("暂无产品邀请码。", "No product invites yet.")}</p>}</div></section>
        </>
      )}
      {section === "audit" && (
        <section className="dash-panel">
          <div className="dash-panel-title">
            <h3>{t("管理操作记录", "Administration audit log")}</h3>
            <span>
              {owner
                ? t("全部操作", "All operations")
                : t("你的操作", "Your operations")}
            </span>
          </div>
          <div className="dash-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t("时间", "Time")}</th>
                  <th>{t("动作", "Action")}</th>
                  <th>{t("操作人 / 对象", "Actor / target")}</th>
                  <th>{t("内容", "Details")}</th>
                </tr>
              </thead>
              <tbody>
                {audits.map((a) => (
                  <tr key={a.id}>
                    <td>{date(a.created_at_ms)}</td>
                    <td>{a.action}</td>
                    <td>
                      <small>{a.actor_id}</small>
                      <small>{a.target_id || "—"}</small>
                    </td>
                    <td className="dash-audit-detail">{a.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!audits.length && (
              <p className="dash-empty-inline">
                {t("暂无操作记录", "No operations recorded")}
              </p>
            )}
          </div>
          <div className="dash-pagination">
            <button
              disabled={!offset}
              onClick={() => setOffset((n) => Math.max(0, n - 50))}
            >
              {t("上一页", "Previous")}
            </button>
            <button
              disabled={audits.length < 50}
              onClick={() => setOffset((n) => n + 50)}
            >
              {t("下一页", "Next")}
            </button>
          </div>
        </section>
      )}
      {target && (
        <div className="dash-modal-backdrop">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-action-title"
            className="dash-modal"
          >
            <button
              className="dash-modal-close"
              onClick={() => setTarget(null)}
              aria-label={t("关闭", "Close")}
            >
              ×
            </button>
            <h2 id="admin-action-title">
              {action === "role"
                ? t("设置用户身份", "Set user role")
                : action === "credits"
                  ? t("调整积分", "Adjust credits")
                  : t("使用激活码授权", "Grant with a code")}
            </h2>
            <p>
              {target.displayName} · {target.phoneMasked}
              <br />
              <small>{target.userId}</small>
            </p>
            <form onSubmit={saveUser}>
              {action === "role" && (
                <>
                  <label>
                    {t("身份", "Role")}
                    <select
                      value={role}
                      onChange={(e) =>
                        setRole(e.target.value as "USER" | "ADMIN")
                      }
                    >
                      <option value="USER">{t("普通用户", "Member")}</option>
                      <option value="ADMIN">{t("管理员", "Admin")}</option>
                    </select>
                  </label>
                  {role === "ADMIN" && (
                    <fieldset>
                      <legend>
                        {t("产品管理范围", "Product management scope")}
                      </legend>
                      {products.map((p) => (
                        <label className="dash-check" key={p.id}>
                          <input
                            type="checkbox"
                            checked={scopes.includes(p.id)}
                            onChange={(e) =>
                              setScopes(
                                e.target.checked
                                  ? [...scopes, p.id]
                                  : scopes.filter((id) => id !== p.id),
                              )
                            }
                          />
                          {zh ? p.name : p.name_en}
                        </label>
                      ))}
                    </fieldset>
                  )}
                  <p className="dash-form-note">
                    {t(
                      "管理员使用分配的激活码操作；角色变更和直接调分仅总管理员可用。",
                      "Admins operate with assigned codes. Only the owner can change roles or adjust credits directly.",
                    )}
                  </p>
                </>
              )}
              {action === "credits" && (
                <>
                  <label>
                    {t(
                      "积分变动（正数增加，负数扣减）",
                      "Credit change (positive adds, negative deducts)",
                    )}
                    <input
                      required
                      type="number"
                      step="1"
                      min={-10000000}
                      max={10000000}
                      value={delta}
                      onChange={(e) => setDelta(e.target.value)}
                    />
                  </label>
                  <label>
                    {t("操作原因", "Reason")}
                    <input
                      required
                      minLength={2}
                      maxLength={200}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </label>
                  <p className="dash-form-note">
                    {t(
                      `当前 ${target.balance} 积分 → 预计 ${target.balance + Number(delta)} 积分`,
                      `Current ${target.balance} → Expected ${target.balance + Number(delta)} credits`,
                    )}
                  </p>
                </>
              )}
              {action === "redeem" && (
                <label>
                  {t("激活码", "Activation code")}
                  <input
                    required
                    minLength={8}
                    maxLength={100}
                    autoComplete="off"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="ACT-…"
                  />
                </label>
              )}
              {error && (
                <p role="alert" className="dash-form-error">
                  {error}
                </p>
              )}
              <button
                className="dash-primary"
                disabled={busy || (action === "credits" && !Number(delta))}
              >
                {busy ? t("正在提交…", "Saving…") : t("确认提交", "Confirm")}
              </button>
            </form>
          </section>
        </div>
      )}
      {editProduct && (
        <div className="dash-modal-backdrop">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-product-title"
            className="dash-modal wide"
          >
            <button
              className="dash-modal-close"
              onClick={() => setEditProduct(null)}
              aria-label={t("关闭", "Close")}
            >
              ×
            </button>
            <h2 id="edit-product-title">
              {t("配置产品", "Configure product")} · {editProduct.id}
            </h2>
            <form className="dash-admin-form" onSubmit={saveProduct}>
              <label>
                {t("中文名称", "Chinese name")}
                <input
                  required
                  maxLength={80}
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                />
              </label>
              <label>
                {t("英文名称", "English name")}
                <input
                  required
                  maxLength={100}
                  value={editProduct.name_en}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name_en: e.target.value })
                  }
                />
              </label>
              <label className="full">
                {t("简介", "Description")}
                <textarea
                  required
                  maxLength={500}
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                />
              </label>
              <label className="full">
                {t("产品入口", "Product entry URL")}
                <input
                  value={editProduct.entry_url}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      entry_url: e.target.value,
                    })
                  }
                  placeholder="https://…"
                />
              </label>
              <label>
                {t("状态", "Status")}
                <select
                  value={editProduct.status}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      status: e.target.value as AccountProduct["status"],
                    })
                  }
                >
                  <option value="COMING_SOON">
                    {t("未上架", "Not for sale")}
                  </option>
                  <option value="AVAILABLE">
                    {t("上架 · 开放积分购买", "Available for credits")}
                  </option>
                </select>
              </label>
              {(
                [
                  ["price", t("套餐售价（积分）", "Package price (credits)")],
                  ["package_units", t("套餐次数", "Package uses")],
                  ["package_days", t("套餐有效天数", "Package days")],
                  ["unit_point_cost", t("每次调用消耗积分", "Credits per use")],
                ] as const
              ).map(([key, label]) => (
                <label key={key}>
                  {label}
                  <input
                    required
                    type="number"
                    min={0}
                    step="1"
                    value={editProduct[key]}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        [key]: Number(e.target.value),
                      })
                    }
                  />
                </label>
              ))}
              {error && (
                <p className="dash-form-error full" role="alert">
                  {error}
                </p>
              )}
              <button disabled={busy} className="dash-primary">
                {t("保存配置", "Save settings")}
              </button>
            </form>
          </section>
        </div>
      )}
      {confirmRevoke && (
        <div className="dash-modal-backdrop">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="revoke-title"
            className="dash-modal"
          >
            <h2 id="revoke-title">{t("确认撤销", "Confirm revocation")}</h2>
            <p>
              {t(
                "撤销后，尚未使用的激活码或该接入凭据将立即失效。已兑换的权益不会扣回。",
                "Unused codes or this integration key will stop working. Redeemed access stays in place.",
              )}
            </p>
            {error && (
              <p role="alert" className="dash-form-error">
                {error}
              </p>
            )}
            <div className="dash-modal-actions">
              <button
                className="dash-quiet-button"
                onClick={() => setConfirmRevoke(null)}
              >
                {t("取消", "Cancel")}
              </button>
              <button
                className="dash-primary"
                disabled={busy}
                onClick={() =>
                  void run(
                    async () => {
                      await accountApi(
                        `/admin/${confirmRevoke.type}/${confirmRevoke.id}/revoke`,
                        { method: "POST" },
                      );
                      setConfirmRevoke(null);
                    },
                    t("已撤销。", "Revoked."),
                  )
                }
              >
                {t("确认撤销", "Revoke")}
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
