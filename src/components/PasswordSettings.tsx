"use client";

import { FormEvent, useEffect, useState } from "react";
import { accountApi, clearAccountSession } from "@/lib/account-client";
import { assetUrl } from "@/lib/asset-url";
import { useDialogFocus } from "@/lib/use-dialog-focus";

export function PasswordSettings({ zh, phoneMasked, onClose }: { zh: boolean; phoneMasked: string; onClose: () => void }) {
  const t = (cn: string, en: string) => zh ? cn : en;
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [challenge, setChallenge] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useDialogFocus(true, onClose);
  useEffect(() => {
    let active = true;
    accountApi<{ hasPassword: boolean }>("/security/password")
      .then((data) => { if (active) setHasPassword(data.hasPassword); })
      .catch((e) => { if (active) setError(e.message); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!cooldown) return;
    const timer = window.setTimeout(() => setCooldown((n) => Math.max(0, n - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  async function send() {
    if (busy || cooldown) return;
    setError(""); setMessage("");
    if (!/^1[3-9][0-9]{9}$/.test(phone.trim())) {
      setError(t("请输入当前账号绑定的完整手机号。", "Enter the full phone number bound to this account."));
      return;
    }
    setBusy(true);
    try {
      const data = await accountApi<{ challengeId: string; retryAfterSeconds: number }>("/security/password/sms", {
        method: "POST", body: JSON.stringify({ phone: phone.trim() }),
      });
      setChallenge(data.challengeId); setCooldown(data.retryAfterSeconds);
      setMessage(t("验证码已发送，请查看短信。", "Code sent. Check your messages."));
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); }
    finally { setBusy(false); }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setError(""); setMessage("");
    if (!challenge) { setError(t("请先获取密码设置验证码。", "Request a password verification code first.")); return; }
    if (password !== confirmation) { setError(t("两次输入的密码不一致。", "Passwords do not match.")); return; }
    setBusy(true);
    try {
      await accountApi("/security/password", { method: "PUT", body: JSON.stringify({
        phone: phone.trim(), code: code.trim(), challengeId: challenge, newPassword: password,
      }) });
      clearAccountSession();
      window.location.assign(assetUrl("/login/") + "?mode=password&passwordChanged=1");
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); setBusy(false); }
  }

  return <div className="dash-modal-backdrop">
    <section className="dash-modal dash-password-modal" role="dialog" aria-modal="true" aria-labelledby="password-title">
      <button className="dash-modal-close" onClick={onClose} disabled={busy} aria-label={t("关闭", "Close")}>×</button>
      <p className="dash-eyebrow">ACCOUNT SECURITY</p>
      <h2 id="password-title">{hasPassword ? t("修改登录密码", "Change password") : t("设置登录密码", "Set password")}</h2>
      <p>{t("绑定手机号", "Bound phone")}: {phoneMasked}<br />
        {t("每次设置或修改均需短信验证。保存后所有设备需重新登录。", "SMS verification is required each time. All devices will need to sign in again after saving.")}</p>
      <form onSubmit={submit}>
        <label>{t("完整手机号", "Full phone number")}
          <input type="tel" autoComplete="tel-national" inputMode="tel" required maxLength={11} pattern="1[3-9][0-9]{9}"
            value={phone} onChange={(e) => { setPhone(e.target.value); setChallenge(""); setCode(""); }} disabled={busy} />
        </label>
        <div className="dash-password-code">
          <label>{t("短信验证码", "SMS code")}
            <input autoComplete="one-time-code" inputMode="numeric" required pattern="[0-9]{4,8}" maxLength={8}
              value={code} onChange={(e) => setCode(e.target.value)} disabled={busy} />
          </label>
          <button type="button" className="dash-quiet-button" onClick={() => void send()} disabled={busy || cooldown > 0}>
            {cooldown ? `${cooldown}s` : t("获取验证码", "Send code")}
          </button>
        </div>
        <label>{t("新密码", "New password")}
          <input type="password" autoComplete="new-password" required minLength={15} maxLength={128}
            aria-describedby="password-hint" value={password} onChange={(e) => setPassword(e.target.value)} disabled={busy} />
        </label>
        <p id="password-hint" className="dash-password-hint">{t("15–128个字符，建议使用容易记住的长密码。", "15–128 characters. A memorable passphrase works well.")}</p>
        <label>{t("确认新密码", "Confirm new password")}
          <input type="password" autoComplete="new-password" required minLength={15} maxLength={128}
            value={confirmation} onChange={(e) => setConfirmation(e.target.value)} disabled={busy} />
        </label>
        {error && <p role="alert" className="dash-form-error">{error}</p>}
        {message && <p role="status" className="dash-password-hint">{message}</p>}
        <button type="submit" className="dash-primary" disabled={busy || hasPassword === null}>
          {busy ? t("正在处理…", "Working…") : t("验证并保存密码", "Verify and save password")}
        </button>
      </form>
    </section>
  </div>;
}
