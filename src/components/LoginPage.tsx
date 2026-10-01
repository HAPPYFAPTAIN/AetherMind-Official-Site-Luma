"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { assetUrl } from "@/lib/asset-url";
import {
  COMMUNITY_TERMS_VERSION,
  communityReturnPath,
} from "@/lib/community-login";
import "./login.css";

const apiBase = process.env.NEXT_PUBLIC_COMMUNITY_API_BASE || "/llmer-api";

export function LoginPage() {
  const { language, setLanguage } = useLanguage();
  const zh = language === "zh";
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState<"send" | "verify" | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [sentPhone, setSentPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const phoneRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!cooldown) return;
    const timer = window.setTimeout(
      () => setCooldown((value) => Math.max(0, value - 1)),
      1000,
    );
    return () => window.clearTimeout(timer);
  }, [cooldown]);
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
      if (sentPhone !== phone.trim())
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
      const data = await request("/api/v1/community/auth/sms/verify", {
        phone: phone.trim(),
        code: code.trim(),
        inviteCode: inviteCode.trim() || null,
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
      window.location.replace(
        communityReturnPath(
          new URLSearchParams(window.location.search).get("returnTo"),
        ),
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
      setBusy(null);
    }
  };
  return (
    <main className="login-page">
      <nav
        className="login-nav"
        aria-label={zh ? "登录页导航" : "Sign-in navigation"}
      >
        <a href={assetUrl("/community/")}>
          ← {zh ? "返回社区" : "Back to community"}
        </a>
        <button
          onClick={() => setLanguage(zh ? "en" : "zh")}
          aria-label={zh ? "Switch to English" : "切换中文"}
        >
          {zh ? "EN" : "中文"}
        </button>
      </nav>
      <section className="login-card" aria-labelledby="login-title">
        <a className="login-brand font-display" href={assetUrl("/")}>
          {zh ? "以太智元" : "AethericAI"}
        </a>
        <h1 id="login-title">{zh ? "登录" : "Sign in"}</h1>
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
              autoComplete="tel-national"
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
          <div className="login-code-row">
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
          </div>
          <label className="login-invite">
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
          </label>
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
          {message && (
            <p className="login-message" role="status">
              {message}
            </p>
          )}
        </form>
        <div className="login-divider">
          <span>{zh ? "其他登录方式" : "Other ways to sign in"}</span>
        </div>
        <div className="login-alternative">
          <button type="button" disabled>
            {zh ? "密码登录" : "Password sign-in"}
          </button>
          <span>{zh ? "暂未开通" : "Coming later"}</span>
        </div>
      </section>
    </main>
  );
}
