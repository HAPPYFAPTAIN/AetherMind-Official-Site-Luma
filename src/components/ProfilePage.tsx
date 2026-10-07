"use client";

import { useEffect, useState } from "react";
import { PasswordSettings } from "./PasswordSettings";
import { useLanguage } from "./LanguageProvider";
import { accountApi, hasAccountSession, type AccountProfile } from "@/lib/account-client";
import { assetUrl } from "@/lib/asset-url";
import { BRAND } from "@/lib/site";
import { Mark } from "./Nav";
import "./profile.css";

export function ProfilePage() {
  const { language } = useLanguage();
  const zh = language === "zh";
  const [account, setAccount] = useState<AccountProfile | null>(null);
  const [passwordOpen, setPasswordOpen] = useState(false);
  useEffect(() => {
    if (hasAccountSession()) accountApi<AccountProfile>("/me").then(setAccount).catch(() => setAccount(null));
  }, []);
  if (!account) return <main className="profile-page"><a className="profile-back" href={assetUrl("/console/")}>← {zh ? "返回控制台" : "Back to console"}</a><section className="profile-auth"><h1>{zh ? "请先登录" : "Sign in first"}</h1><a href={assetUrl("/login/?returnTo=/official/profile/")}>{zh ? "登录" : "Sign in"}</a></section></main>;
  return <main className="profile-page">
    <header className="profile-topbar"><a className="profile-brand" href={assetUrl("/")}><Mark />{zh ? BRAND.zh : BRAND.en}<span />{zh ? "个人中心" : "Personal center"}</a><a className="profile-back" href={assetUrl("/console/")}>← {zh ? "返回控制台" : "Back to console"}</a></header>
    <div className="profile-content">
      <p className="profile-kicker">AETHERICAI / ACCOUNT</p>
      <h1>{zh ? "个人中心" : "Personal center"}</h1>
      <section className="profile-section"><h2>{zh ? "基本信息" : "Basic information"}</h2><div className="profile-info-grid"><div><span>{zh ? "手机号" : "Phone"}</span><strong>{account.phoneMasked}</strong></div><div><span>{zh ? "用户 ID" : "User ID"}</span><strong>{account.userId}</strong></div><div><span>{zh ? "登录用户名" : "Login username"}</span><strong>{zh ? "未设置" : "Not set"}</strong></div></div></section>
      <section className="profile-section"><h2>{zh ? "安全信息" : "Security"}</h2><div className="profile-security-row"><div><strong>{zh ? "登录密码" : "Password"}</strong><p>{zh ? "通过绑定手机号设置或修改密码。" : "Set or change it with your bound phone."}</p></div><button onClick={() => setPasswordOpen(true)}>{zh ? "修改密码" : "Change password"}</button></div><div className="profile-security-row"><div><strong>{zh ? "手机绑定" : "Phone binding"}</strong><p>{zh ? `当前绑定手机号 ${account.phoneMasked}，用于登录和修改密码。` : `Bound phone ${account.phoneMasked} is used for sign-in and password changes.`}</p></div><span className="profile-status">{zh ? "已绑定" : "Bound"}</span></div></section>
    </div>
    {passwordOpen && <PasswordSettings zh={zh} phoneMasked={account.phoneMasked} onClose={() => setPasswordOpen(false)} />}
  </main>;
}
