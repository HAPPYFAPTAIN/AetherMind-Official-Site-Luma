"use client";

import { FormEvent, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "./LanguageProvider";
import { assetUrl } from "@/lib/asset-url";
import {
  COMMUNITY_TERMS_VERSION,
  communityReturnPath,
} from "@/lib/community-login";
import "./login.css";

const apiBase = process.env.NEXT_PUBLIC_COMMUNITY_API_BASE || "/official-api";
const subscribeLocation = (notify: () => void) => {
  window.addEventListener("popstate", notify);
  return () => window.removeEventListener("popstate", notify);
};
const locationSearch = () => window.location.search;
const serverSearch = () => "";

export function LoginPage({ overlay = false, onClose, returnTo: returnToProp }: { overlay?: boolean; onClose?: () => void; returnTo?: string }) {
  const { language, setLanguage } = useLanguage();
  const zh = language === "zh";
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [selectedMode, setMode] = useState<"sms" | "password" | null>(null);
  const search = useSyncExternalStore(subscribeLocation, locationSearch, serverSearch);
  const params = new URLSearchParams(search);
  const mode = selectedMode ?? (params.get("mode") === "password" ? "password" : "sms");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState<"send" | "verify" | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [sentPhone, setSentPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const phoneRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const statusMessage = message || (params.get("passwordChanged") === "1"
    ? (zh ? "密码已更新，请使用新密码登录。" : "Password updated. Sign in with your new password.") : "");
  useEffect(() => {
    if (!cooldown) return;
    const timer = window.setTimeout(
      () => setCooldown((value) => Math.max(0, value - 1)),
      1000,
    );
    return () => window.clearTimeout(timer);
  }, [cooldown]);
  useEffect(() => {
    if (!overlay) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("login-open");
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("login-open");
    };
  }, [overlay]);
  const request = async (path: string, body: object) => {
    const response = await fetch(apiBase + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data =
      response.status === 204 ? null : await response.json().catch(() => null);
    if (!response.ok) {
      if (response.status === 429)
        setCooldown(
          Math.min(3600, Number(data?.error?.retryAfterSeconds) || 60),
        );
      throw new Error(
        data?.error?.message ||
          (zh ? "操作未完成，请稍后重试。" : "Please try again later."),
      );
    }
    return data;
  };
  const validatePhone = () => {
    if (!/^1[3-9][0-9]{9}$/.test(phone.trim())) {
      phoneRef.current?.focus();
      throw new Error(
        zh
          ? "请输入正确的中国大陆手机号。"
          : "Enter a valid mainland China mobile number.",
      );
    }
  };
  const send = async () => {
    if (busy || cooldown) return;
    setError("");
    setMessage("");
    try {
      validatePhone();
      setBusy("send");
      await request("/api/v1/auth/sms/request", { phone: phone.trim() });
      setSentPhone(phone.trim());
      setCooldown(60);
      setMessage(
        zh ? "验证码已发送，请留意短信。" : "Code sent. Check your messages.",
      );
      codeRef.current?.focus();
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(null);
    }
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setError("");
    setMessage("");
    try {
      validatePhone();
      if (mode === "sms" && sentPhone !== phone.trim())
        throw new Error(
          zh
            ? "请先获取该手机号的验证码。"
            : "Request a code for this phone number first.",
        );
      if (!agreed)
        throw new Error(
          zh
            ? "请先阅读并同意服务条款与隐私协议。"
            : "Please read and agree to the terms and privacy policy.",
        );
      setBusy("verify");
      const data = await request(mode === "sms" ? "/api/v1/community/auth/sms/verify" : "/api/v1/community/auth/password", {
        phone: phone.trim(),
        ...(mode === "sms" ? { code: code.trim(), inviteCode: inviteCode.trim() || null } : { password }),
        acceptedTerms: true,
        termsVersion: COMMUNITY_TERMS_VERSION,
      });
      window.localStorage.setItem(
        "aethericai-community-access-token",
        data.accessToken,
      );
      window.localStorage.setItem(
        "aethericai-community-refresh-token",
        data.refreshToken,
      );
      window.localStorage.setItem(
        "aethericai-community-access-expires",
        String(data.accessTokenExpiresAtEpochMs),
      );
      const returnTo = returnToProp || new URLSearchParams(window.location.search).get("returnTo");
      window.location.replace(communityReturnPath(returnTo));
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
      setBusy(null);
    }
  };
  const page = (
    <main className={`login-page${overlay ? " login-overlay" : ""}`}>
      <section className="login-card login-panel" aria-labelledby="login-title">
        <nav
          className="login-nav"
          aria-label={zh ? "登录页导航" : "Sign-in navigation"}
        >
          {overlay ? (
            <button
              type="button"
              className="login-close"
              onClick={() => onClose?.()}
              aria-label={zh ? "关闭登录页" : "Close sign-in"}
            >
              ×
            </button>
          ) : (
            <a
              className="login-close"
              href={assetUrl("/community/")}
              aria-label={zh ? "关闭登录页" : "Close sign-in"}
            >
              ×
            </a>
          )}
          {!overlay && (
            <button
              onClick={() => setLanguage(zh ? "en" : "zh")}
              aria-label={zh ? "Switch to English" : "切换中文"}
            >
              {zh ? "EN" : "中文"}
            </button>
          )}
        </nav>
        <a className="login-brand font-display" href={assetUrl("/")}>
          {zh ? "以太智元" : "AethericAI"}
        </a>
        <h1 id="login-title">{mode === "password" ? (zh ? "密码登录" : "Password sign-in") : (zh ? "登录" : "Sign in")}</h1>
        <p className="login-description">
          {zh
            ? "未注册的手机号将自动创建账号，资料可稍后填写。"
            : "New here? Verify your phone to create an account. You can complete your profile later."}
        </p>
        <form onSubmit={submit}>
          <label className="login-phone">
            <span className="sr-only">{zh ? "手机号" : "Phone number"}</span>
            <span className="login-prefix" aria-hidden>
              +86
            </span>
            <input
              ref={phoneRef}
              type="tel"
              inputMode="tel"
              autoComplete="username"
              placeholder={zh ? "请输入手机号" : "Phone number"}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setCode("");
              }}
              maxLength={11}
              pattern="1[3-9][0-9]{9}"
              required
              disabled={busy !== null}
            />
          </label>
          {mode === "sms" ? <div className="login-code-row">
            <label>
              <span className="sr-only">
                {zh ? "验证码" : "Verification code"}
              </span>
              <input
                ref={codeRef}
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder={zh ? "请输入验证码" : "Verification code"}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={8}
                pattern="[0-9]{4,8}"
                required
                disabled={busy === "verify"}
              />
            </label>
            <button
              type="button"
              className="login-send"
              onClick={() => void send()}
              disabled={busy !== null || cooldown > 0}
            >
              {busy === "send"
                ? zh
                  ? "发送中"
                  : "Sending"
                : cooldown > 0
                  ? zh
                    ? `${cooldown} 秒后重发`
                    : `Resend in ${cooldown}s`
                  : zh
                    ? "获取验证码"
                    : "Send code"}
            </button>
          </div> : <label className="login-password">
            <span className="sr-only">{zh ? "密码" : "Password"}</span>
            <input type="password" autoComplete="current-password" required maxLength={128}
              value={password} onChange={(e) => setPassword(e.target.value)} disabled={busy !== null}
              placeholder={zh ? "请输入密码" : "Password"} />
          </label>}
          {mode === "sms" && <label className="login-invite">
            <span className="sr-only">
              {zh ? "邀请码（选填）" : "Invitation code (optional)"}
            </span>
            <input
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              placeholder={
                zh ? "请输入邀请码（选填）" : "Invitation code (optional)"
              }
              autoComplete="off"
              maxLength={32}
              disabled={busy === "verify"}
            />
          </label>}
          {mode === "password" && <button type="button" className="login-forgot" disabled={busy !== null}
            onClick={() => { setMode("sms"); setPassword(""); setError(""); setMessage(zh ? "请先用验证码登录，再点击工作台右上角账号设置或修改密码。" : "Sign in by SMS, then click your account in the workspace header to set or reset your password."); }}>
            {zh ? "未设置或忘记密码？" : "No password, or forgot it?"}
          </button>}
          <button
            type="submit"
            className="login-submit"
            disabled={busy !== null}
          >
            {busy === "verify"
              ? zh
                ? "正在登录"
                : "Signing in"
              : zh
                ? "登录"
                : "Sign in"}
          </button>
          <div className="login-consent">
            <input
              id="login-consent"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
            />
            <label htmlFor="login-consent">
              {zh ? "我已阅读并同意" : "I have read and agree to the"}
            </label>{" "}
            <a
              href={assetUrl("/legal/")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {zh ? "服务条款与隐私协议" : "Terms and Privacy Policy"}
            </a>
          </div>
          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}
          {statusMessage && (
            <p className="login-message" role="status">
              {statusMessage}
            </p>
          )}
        </form>
        <div className="login-divider">
          <span>{zh ? "其他登录方式" : "Other ways to sign in"}</span>
        </div>
        <div className="login-alternative">
          <button type="button" disabled={busy !== null} onClick={() => {
            setMode(mode === "sms" ? "password" : "sms"); setPassword(""); setError(""); setMessage("");
          }}>
            {mode === "sms" ? (zh ? "密码登录" : "Password sign-in") : (zh ? "验证码登录" : "SMS sign-in")}
          </button>
        </div>
      </section>
    </main>
  );

  if (overlay && typeof document !== "undefined") {
    return createPortal(page, document.body);
  }
  return page;
}
