"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { assetUrl } from "@/lib/asset-url";
import { useLanguage } from "@/components/LanguageProvider";
import { Nav } from "./Nav";
import { EditorialFooter } from "./EditorialFooter";
import { SiteLink } from "./primitives/SiteLink";
import Image from "next/image";
import { OfficialHero } from "./OfficialHero";
import { LoginPage } from "@/components/LoginPage";
import "./community.css";
import "./community-editorial.css";
import {
  accountApi,
  accountUrl,
  clearAccountSession,
  hasAccountSession,
} from "@/lib/account-client";

type Profile = {
  userId: string;
  displayName: string;
  avatarUrl?: string | null;
  city?: string | null;
  bio?: string | null;
  githubUrl?: string | null;
  twitterUrl?: string | null;
  role?: string | null;
};

type Author = Pick<Profile, "userId" | "displayName" | "avatarUrl" | "city">;
type Reply = {
  id: string;
  body: string;
  status: string;
  createdAtEpochMs: number;
  author: Author;
};
type Post = {
  id: string;
  title: string;
  body: string;
  category: string;
  status: "OPEN" | "CLOSED" | "HIDDEN";
  pinned: boolean;
  replyCount: number;
  createdAtEpochMs: number;
  updatedAtEpochMs: number;
  author: Author;
  replies?: Reply[];
  acceptedReplyId?: string | null;
  nextReplyOffset?: number | null;
};
type Api = <T>(
  path: string,
  init?: RequestInit,
  allowRetry?: boolean,
) => Promise<T>;
type Queue = {
  hiddenPosts: Post[];
  hiddenReplies: { id: string; body: string; post_id: string }[];
  events: {
    id: string;
    action: string;
    reason: string | null;
    created_at_ms: number;
  }[];
};


const copy = {
  en: {
    eyebrow: "AI FOR SCIENCE · COMMUNITY",
    title: "A place to think together",
    sub: "Ask about scientific computing, share reproducible methods, and build useful answers with other researchers.",
    home: "Back to site",
    signIn: "Sign in",
    signOut: "Sign out",
    profile: "Your profile",
    write: "Start a discussion",
    open: "Open",
    closed: "Closed",
    all: "All discussions",
    discussion: "Discussion",
    materials: "Materials",
    simulation: "Simulation",
    methods: "Methods",
    guide: "Community guidelines",
    guideBody:
      "Share the context, versions, and evidence needed for a useful answer. Keep people and unpublished work safe. Moderators can hide harmful content and close resolved questions.",
    empty: "No discussions match these filters.",
    replies: "replies",
    reply: "Reply",
    close: "Close discussion",
    reopen: "Reopen",
    pin: "Pin",
    unpin: "Unpin",
    hide: "Hide",
    restore: "Restore",
    moderation: "Moderation",
    search: "Search discussions",
    loginTitle: "Sign in with your phone",
    phone: "Phone number",
    code: "Verification code",
    send: "Send code",
    verify: "Continue",
    sent: "Code sent. It is valid for a few minutes.",
    compose: "Start a discussion",
    subject: "A clear question or topic",
    body: "Include the context, what you tried, and what you learned.",
    publish: "Publish",
    cancel: "Cancel",
    city: "Location (optional)",
    bio: "Short introduction (optional)",
    github: "GitHub profile (optional)",
    twitter: "X / Twitter profile (optional)",
    avatar: "Profile image",
    save: "Save profile",
    member: "Member since this visit",
    noReplies: "Be the first to reply.",
    accountError: "We could not complete that request. Please try again.",
    phoneError: "Enter a valid mainland China mobile number.",
    codeError: "The code is incorrect or has expired.",
    hidden: "This discussion is hidden from the public feed.",
    adminQueue: "Review queue",
    noQueue: "The queue is clear.",
    closeReason: "Why are you closing this? (optional)",
    moderationReason: "Reason (optional)",
  },
  zh: {
    eyebrow: "AI FOR SCIENCE · 社区",
    title: "一起把问题想清楚",
    sub: "讨论科学计算，分享可复现的方法，把经验沉淀成对研究真正有用的答案。",
    home: "返回官网",
    signIn: "登录",
    signOut: "退出登录",
    profile: "我的资料",
    write: "发起讨论",
    open: "进行中",
    closed: "已关闭",
    all: "全部讨论",
    discussion: "讨论",
    materials: "材料",
    simulation: "模拟",
    methods: "方法",
    guide: "社区约定",
    guideBody:
      "请交代背景、版本和已经尝试过的方法，让回答更有帮助。涉及个人和未发表研究的内容请谨慎分享。管理员可以隐藏不当内容，也可以关闭已经解决的问题。",
    empty: "没有符合条件的讨论。",
    replies: "条回复",
    reply: "回复",
    close: "关闭讨论",
    reopen: "重新打开",
    pin: "置顶",
    unpin: "取消置顶",
    hide: "隐藏",
    restore: "恢复显示",
    moderation: "管理",
    search: "搜索讨论",
    loginTitle: "使用手机号登录",
    phone: "手机号",
    code: "验证码",
    send: "获取验证码",
    verify: "继续",
    sent: "验证码已发送，有效期为几分钟。",
    compose: "发起讨论",
    subject: "清楚的问题或主题",
    body: "写清背景、已经尝试过什么，以及你希望得到的帮助。",
    publish: "发布",
    cancel: "取消",
    city: "所在地（选填）",
    bio: "个人简介（选填）",
    github: "GitHub 主页（选填）",
    twitter: "X / Twitter 主页（选填）",
    avatar: "头像",
    save: "保存资料",
    member: "本次登录已建立社区身份",
    noReplies: "还没有回复，欢迎第一个参与。",
    accountError: "这次操作没有完成，请稍后再试。",
    phoneError: "请输入正确的中国大陆手机号。",
    codeError: "验证码错误或已过期。",
    hidden: "这条讨论已从公开列表隐藏。",
    adminQueue: "审核队列",
    noQueue: "当前没有待处理内容。",
    closeReason: "关闭原因（选填）",
    moderationReason: "操作说明（选填）",
  },
} as const;

function formatTime(epoch: number, language: "en" | "zh") {
  return new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(epoch));
}

function avatarSrc(path?: string | null) {
  return path ? accountUrl(path) : null;
}

export function CommunityPage() {
  const { language } = useLanguage();
  const zh = language === "zh";
  const labels = zh ? copy.zh : copy.en;
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<"OPEN" | "CLOSED">("OPEN");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("default");
  const [overview, setOverview] = useState<{
    members: number;
    topics: number;
    replies: number;
    activeMembers: Profile[];
  } | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [moreBusy, setMoreBusy] = useState(false);
  const [publicProfile, setPublicProfile] = useState<Profile | null>(null);
  const [moderationReason, setModerationReason] = useState("");
  const [moderationBusy, setModerationBusy] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [selected, setSelected] = useState<Post | null>(null);
  const goLogin = (compose = false) => {
    const next = new URL(window.location.href);
    if (compose) next.searchParams.set("compose", "1");
    else next.searchParams.delete("compose");
    window.history.replaceState({}, "", next);
    setLoginOpen(true);
  };
  const [composeOpen, setComposeOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [moderation, setModeration] = useState<Queue | null>(null);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [feedError, setFeedError] = useState(false);

  const api: Api = useCallback(
    <T,>(path: string, init: RequestInit = {}, allowRetry = true): Promise<T> =>
      accountApi<T>(path, init, allowRetry),
    [],
  );

  const loadProfile = useCallback(async () => {
    if (!hasAccountSession()) {
      setProfile(null);
      return;
    }
    try {
      setProfile(await api<Profile>("/api/v1/community/me"));
      const url = new URL(window.location.href);
      if (url.searchParams.get("compose") === "1") {
        setComposeOpen(true);
        url.searchParams.delete("compose");
        window.history.replaceState({}, "", url);
      }
    } catch {
      setProfile(null);
    }
  }, [api]);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setFeedError(false);
    try {
      const data = await api<{ items: Post[]; nextOffset: number | null }>(
        `/api/v1/community/posts?order=${order}&status=${status}&q=${encodeURIComponent(query)}${category === "all" ? "" : `&category=${encodeURIComponent(category)}`}`,
      );
      setPosts(data.items);
      setNextCursor(data.nextOffset == null ? null : String(data.nextOffset));
    } catch {
      setFeedError(true);
    } finally {
      setLoading(false);
    }
  }, [api, category, labels.accountError, status, query, order]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void Promise.all([loadProfile(), loadPosts()]);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadPosts, loadProfile]);
  useEffect(() => {
    const timer = window.setTimeout(() => setQuery(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    let cancelled = false;
    void api<{
      members: number;
      topics: number;
      replies: number;
      activeMembers: Profile[];
    }>("/api/v1/community/overview")
      .then((data) => {
        if (!cancelled) setOverview(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [api, posts]);
  useEffect(() => {
    const navigate = () => {
      const id = new URLSearchParams(window.location.search).get("topic");
      if (!id) {
        setSelected(null);
        return;
      }
      void api<Post>(`/api/v1/community/posts/${encodeURIComponent(id)}`)
        .then(setSelected)
        .catch((error) => setNotice(error.message));
    };
    const timer = window.setTimeout(navigate, 0);
    window.addEventListener("popstate", navigate);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("popstate", navigate);
    };
  }, [api]);
  const closeTopic = () => {
    setSelected(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("topic");
    window.history.pushState({}, "", url);
  };
  const showProfile = async (author: Author) => {
    try {
      setPublicProfile(
        await api<Profile>(`/api/v1/community/profiles/${author.userId}`),
      );
    } catch (error) {
      setNotice(error instanceof Error ? error.message : labels.accountError);
    }
  };
  const moderateReply = async (id: string, action: string) => {
    try {
      await api(`/api/v1/community/replies/${id}/${action}`, {
        method: "PATCH",
        body: JSON.stringify({ reason: moderationReason.trim() || null }),
      });
      if (selected?.status !== "HIDDEN" && selected)
        setSelected(await api<Post>(`/api/v1/community/posts/${selected.id}`));
      if (moderation)
        setModeration(await api<Queue>("/api/v1/community/moderation/queue"));
      await loadPosts();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : labels.accountError);
    }
  };
  const loadMore = async () => {
    if (!nextCursor || moreBusy) return;
    setMoreBusy(true);
    try {
      const data = await api<{ items: Post[]; nextOffset: number | null }>(
        `/api/v1/community/posts?order=${order}&status=${status}&q=${encodeURIComponent(query)}&offset=${encodeURIComponent(nextCursor)}${category === "all" ? "" : `&category=${category}`}`,
      );
      setPosts((previous) => [
        ...previous,
        ...data.items.filter((item) => !previous.some((p) => p.id === item.id)),
      ]);
      setNextCursor(data.nextOffset == null ? null : String(data.nextOffset));
    } catch (error) {
      setNotice(error instanceof Error ? error.message : labels.accountError);
    } finally {
      setMoreBusy(false);
    }
  };

  const openPost = async (post: Post) => {
    try {
      setSelected(await api<Post>(`/api/v1/community/posts/${post.id}`));
      const url = new URL(window.location.href);
      url.searchParams.set("topic", post.id);
      window.history.pushState({}, "", url);
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch (error) {
      setNotice(error instanceof Error ? error.message : labels.accountError);
    }
  };
  const signOut = async () => {
    try {
      await api("/api/v1/auth/logout", { method: "POST" }, false);
    } catch {
      /* local session is still cleared */
    }
    clearAccountSession();
    setProfile(null);
    setNotice(zh ? "已退出登录" : "Signed out");
  };
  const moderate = async (post: Post, action: string) => {
    if (moderationBusy) return;
    setModerationBusy(true);
    try {
      const next = await api<Post>(
        `/api/v1/community/posts/${post.id}/${action}`,
        {
          method: "PATCH",
          body: JSON.stringify({ reason: moderationReason.trim() || null }),
        },
      );
      setSelected(
        next.status === "HIDDEN"
          ? next
          : await api<Post>(`/api/v1/community/posts/${post.id}`),
      );
      setModerationReason("");
      await loadPosts();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : labels.accountError);
    } finally {
      setModerationBusy(false);
    }
  };

  return (
    <main className="community-page community-editorial min-h-screen bg-bg-0 text-text-primary" lang={zh ? "zh-CN" : "en"}>
      <style>{`.community-page{--text-faint:#929aa4;--text-tertiary:#a1a9b2}.community-dialog{--text-faint:#929aa4;--text-tertiary:#a1a9b2}.community-page button:disabled,.community-dialog button:disabled{opacity:.5;cursor:wait}.community-page h1{text-wrap:balance}.community-dialog p,.community-page h2{overflow-wrap:anywhere}.community-page :focus-visible,.community-dialog :focus-visible{outline:2px solid var(--accent);outline-offset:3px}`}</style>
      <Nav />
      {!selected && (
        <OfficialHero id="community-title" image="/images/community/conversation-v2" imagePosition="65% 25%"
          imageAlt={zh ? "研究者围桌交谈、分享笔记并倾听彼此的想法" : "Researchers sharing ideas around a table"}
          eyebrow={zh ? "研究者社区" : "RESEARCH COMMUNITY"}
          title={zh ? <>好的想法，<br /><span>始于一次交谈。</span></> : <>Good ideas begin<br /><span>with a conversation.</span></>}
          description={zh ? "分享研究中的疑问、方法与发现。在坦诚的交流中，让彼此的探索更进一步。" : "Share questions, methods and discoveries. Find fresh perspectives in thoughtful conversations with fellow researchers."}
          actions={<><button onClick={() => profile ? setComposeOpen(true) : goLogin(true)}>{labels.write}<span aria-hidden="true">↗</span></button><a href="#community-discussions">{zh ? "看看大家在聊什么" : "Explore conversations"}<span aria-hidden="true">↓</span></a></>}
        />
      )}
      <section className="forum-container community-discovery" aria-label={zh ? "探索社区板块" : "Explore community categories"}>
        <div className="community-section-heading"><div><h2>{zh ? "从共同关心的问题开始。" : "Start with a shared interest."}</h2></div></div>
        <div className="community-category-grid">{[
          ["simulation", "01", "分子模拟", "Molecular simulation", "LAMMPS · 力场 · 轨迹分析", "LAMMPS · Force fields · Trajectories"],
          ["materials", "02", "材料研究", "Materials research", "结构 · 性能 · 计算方法", "Structures · Properties · Computation"],
          ["methods", "03", "方法与实践", "Methods & practice", "科研工作流 · 经验复现", "Workflows · Reproducible methods"],
          ["discussion", "04", "开放交流", "Open discussion", "想法 · 提问 · 跨领域探索", "Ideas · Questions · New perspectives"],
        ].map(([value, number, cn, en, desc, descEn]) => <button key={value} className="community-category" aria-pressed={category === value} onClick={() => { setCategory(category === value ? "all" : value); closeTopic(); }}><span className="community-category-top">{number}<span aria-hidden="true">↗</span></span><strong>{zh ? cn : en}</strong><small>{zh ? desc : descEn}</small></button>)}</div>
      </section>
      <div id="community-discussions" className="forum-container community-feed-heading"><div><p className="community-eyebrow">{zh ? "社区讨论" : "THE CONVERSATION"}</p><h2>{zh ? "值得展开的每一场对话。" : "Conversations worth having."}</h2></div><label className="forum-search"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></svg><span className="sr-only">{labels.search}</span><input placeholder={zh ? "搜索话题、方法或关键词…" : "Search topics, methods or keywords…"} aria-label={labels.search} value={search} maxLength={100} onChange={event => { setSearch(event.target.value); if (selected) closeTopic(); }} />{search && <button aria-label={zh ? "清除搜索" : "Clear search"} onClick={() => setSearch("")}>×</button>}</label></div>
      <nav
        className="forum-filter-bar"
        aria-label={zh ? "话题排序" : "Topic order"}
      >
        <div className="forum-container forum-filter-inner">
          {(
            [
              ["default", zh ? "全部动态" : "Overview"],
              ["new", zh ? "新帖" : "New"],
              ["pinned", zh ? "置顶" : "Pinned"],
              ["popular", zh ? "热门讨论" : "Popular"],
              ["replies", zh ? "最新回复" : "Latest replies"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              aria-pressed={order === value}
              onClick={() => {
                setOrder(value);
                closeTopic();
              }}
            >
              {label}
            </button>
          ))}
          <select
            aria-label={zh ? "讨论状态" : "Discussion status"}
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as "OPEN" | "CLOSED")
            }
          >
            <option value="OPEN">{labels.open}</option>
            <option value="CLOSED">{labels.closed}</option>
          </select>
        </div>
      </nav>
      <div className="forum-container forum-layout">
        <section className="forum-main">
          {notice && (
            <div className="forum-notice" role="status">
              {notice}
              <button onClick={() => setNotice("")} aria-label={labels.cancel}>
                ×
              </button>
            </div>
          )}
          {selected ? (
            <article className="forum-panel forum-topic">
              <button onClick={closeTopic} className="forum-back">
                ← {zh ? "返回话题列表" : "Back to discussions"}
              </button>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-text-faint">
                    {selected.author.displayName} ·{" "}
                    {formatTime(selected.createdAtEpochMs, language)}
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    {selected.title}
                  </h1>
                </div>
                <button
                  onClick={closeTopic}
                  className="rounded-full px-2 text-2xl leading-none text-text-tertiary hover:text-white"
                  aria-label={labels.cancel}
                >
                  ×
                </button>
              </div>
              <p className="mt-6 whitespace-pre-wrap text-sm leading-7 text-text-secondary">
                {selected.body}
              </p>
              {notice && (
                <p role="alert" className="mt-3 text-sm text-accent">
                  {notice}
                </p>
              )}
              <button
                onClick={() => void showProfile(selected.author)}
                className="mt-3 flex items-center gap-2 text-xs text-text-tertiary"
              >
                <Avatar profile={selected.author} />
                {zh ? "查看作者资料" : "View profile"}
              </button>
              {selected.status === "HIDDEN" && (
                <p className="mt-4 rounded-xl border border-accent/30 bg-accent-soft px-3 py-2 text-sm text-white">
                  {labels.hidden}
                </p>
              )}
              <h2 className="mt-8 text-sm font-semibold">
                {selected.replyCount} {labels.replies}
              </h2>
              <div className="mt-4 space-y-3">
                {selected.replies?.length ? (
                  selected.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="rounded-xl border border-line p-4"
                    >
                      <p className="text-xs text-text-faint">
                        {reply.author.displayName} ·{" "}
                        {formatTime(reply.createdAtEpochMs, language)}
                      </p>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-text-secondary">
                        {reply.body}
                      </p>
                      <div className="mt-3 flex gap-4">
                        <button
                          onClick={() => void showProfile(reply.author)}
                          className="text-xs text-text-tertiary"
                        >
                          {zh ? "查看作者资料" : "View profile"}
                        </button>
                        {profile?.role && (
                          <button
                            onClick={() => void moderateReply(reply.id, "hide")}
                            className="text-xs text-accent"
                          >
                            {labels.hide}
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-text-faint">{labels.noReplies}</p>
                )}
              </div>
              {selected.nextReplyOffset != null && (
                <button
                  className="mt-4 text-sm text-accent"
                  onClick={async () => {
                    try {
                      const next = await api<{
                        items: Reply[];
                        nextOffset: number | null;
                      }>(
                        `/api/v1/community/posts/${selected.id}/replies?offset=${selected.nextReplyOffset}`,
                      );
                      setSelected({
                        ...selected,
                        replies: [...(selected.replies || []), ...next.items],
                        nextReplyOffset: next.nextOffset,
                      });
                    } catch (error) {
                      setNotice(
                        error instanceof Error
                          ? error.message
                          : labels.accountError,
                      );
                    }
                  }}
                >
                  {zh ? "更多回复" : "More replies"}
                </button>
              )}
              {selected.status === "OPEN" && (
                <ReplyForm
                  labels={labels}
                  onSubmit={async (body) => {
                    try {
                      await api(
                        `/api/v1/community/posts/${selected.id}/replies`,
                        {
                          method: "POST",
                          body: JSON.stringify({ body }),
                        },
                      );
                      setSelected(
                        await api<Post>(
                          `/api/v1/community/posts/${selected.id}`,
                        ),
                      );
                      await loadPosts();
                    } catch (error) {
                      throw error;
                    }
                  }}
                  onNeedLogin={() => goLogin()}
                  loggedIn={Boolean(profile)}
                />
              )}
              {profile &&
                (selected.author.userId === profile.userId || profile.role) && (
                  <>
                    {(profile.role ||
                      selected.author.userId === profile.userId) && (
                      <label className="mt-5 block border-t border-line pt-4 text-xs text-text-tertiary">
                        {profile.role
                          ? labels.moderationReason
                          : labels.closeReason}
                        <input
                          value={moderationReason}
                          onChange={(event) =>
                            setModerationReason(event.target.value)
                          }
                          maxLength={240}
                          className="mt-2 w-full rounded-xl border border-line bg-bg-0 p-3 text-sm text-white outline-none focus:border-accent"
                        />
                      </label>
                    )}
                    <div className="mt-3 flex flex-wrap gap-3">
                      {selected.status === "OPEN" &&
                        (selected.author.userId === profile.userId ||
                          profile.role) && (
                          <button
                            onClick={() => void moderate(selected, "close")}
                            disabled={moderationBusy}
                            className="rounded-full border border-line-strong px-4 py-2 text-xs text-text-secondary hover:border-accent/50 hover:text-white"
                          >
                            {labels.close}
                          </button>
                        )}
                      {profile.role && selected.status === "CLOSED" && (
                        <button
                          onClick={() => void moderate(selected, "reopen")}
                          className="rounded-full border border-line-strong px-4 py-2 text-xs text-text-secondary hover:border-accent/50 hover:text-white"
                        >
                          {labels.reopen}
                        </button>
                      )}
                      {profile.role && (
                        <>
                          <button
                            disabled={moderationBusy}
                            onClick={() =>
                              void moderate(
                                selected,
                                selected.pinned ? "unpin" : "pin",
                              )
                            }
                            className="rounded-full border border-line-strong px-4 py-2 text-xs text-text-secondary hover:border-accent/50 hover:text-white"
                          >
                            {selected.pinned ? labels.unpin : labels.pin}
                          </button>
                          <button
                            disabled={moderationBusy}
                            onClick={() =>
                              void moderate(
                                selected,
                                selected.status === "HIDDEN"
                                  ? "restore"
                                  : "hide",
                              )
                            }
                            className="rounded-full border border-line-strong px-4 py-2 text-xs text-text-secondary hover:border-accent/50 hover:text-white"
                          >
                            {selected.status === "HIDDEN"
                              ? labels.restore
                              : labels.hide}
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
            </article>
          ) : (
            <div className="forum-panel">
              <div className="forum-list-heading">
                <h2>{category === "all" ? (zh ? "全部讨论" : "All discussions") : labels[category as keyof typeof labels]}</h2>
                <span>
                  {category === "all"
                    ? zh
                      ? "交流经验 探索科学"
                      : "Ideas, methods, and research"
                    : labels[category as keyof typeof labels]}
                </span>
              </div>
              {category !== "all" && <div className="community-active-filter"><span>{zh ? "当前板块" : "Category"} · {labels[category as keyof typeof labels]}</span><button onClick={() => setCategory("all")}>{zh ? "查看全部" : "View all"} ×</button></div>}
              {loading ? (
                <div className="forum-empty" role="status">
                  {zh ? "正在加载话题" : "Loading discussions"}
                </div>
              ) : feedError ? (
                <div className="forum-empty" role="status"><span className="forum-empty-symbol" aria-hidden="true">↻</span><h2>{zh ? "讨论暂时未能加载" : "Discussions are temporarily unavailable"}</h2><p>{zh ? "连接社区服务后，即可查看最新讨论。你可以稍后重试，或先浏览上方研究板块。" : "We could not reach the community service. Retry shortly or explore the research categories above."}</p><button className="forum-primary" onClick={() => void loadPosts()}>{zh ? "重新加载" : "Try again"}<span aria-hidden="true">↗</span></button></div>
              ) : posts.length === 0 ? (
                <div className="forum-empty">
                  <span className="forum-empty-symbol" aria-hidden>
                    ◇
                  </span>
                  <h2>
                    {query
                      ? zh
                        ? "没有找到相关话题"
                        : "No matching discussions"
                      : zh
                        ? "这里的讨论 从你开始"
                        : "Start the conversation"}
                  </h2>
                  <p>
                    {query
                      ? zh
                        ? "换个关键词试试，或查看其他板块。"
                        : "Try another search or category."
                      : zh
                        ? "分享一次实践，提出一个问题，和更多研究者一起找到答案。"
                        : "Share an experiment or ask a question. Build useful answers together."}
                  </p>
                  <button
                    className="forum-primary"
                    onClick={() =>
                      profile ? setComposeOpen(true) : goLogin(true)
                    }
                  >
                    {labels.write}
                  </button>
                </div>
              ) : (
                posts.map((post) => (
                  <article className="forum-topic-row" key={post.id}>
                    <button
                      onClick={() => void showProfile(post.author)}
                      className="forum-author-avatar"
                      aria-label={post.author.displayName}
                    >
                      <Avatar profile={post.author} />
                    </button>
                    <div className="forum-row-content">
                      <div className="forum-row-title">
                        <button
                          className="forum-category"
                          onClick={() => setCategory(post.category)}
                        >
                          {labels[post.category as keyof typeof labels] ||
                            post.category}
                        </button>
                        <a
                          href={`?topic=${encodeURIComponent(post.id)}`}
                          onClick={(event) => {
                            event.preventDefault();
                            void openPost(post);
                          }}
                        >
                          {post.title}
                        </a>
                        {post.pinned && (
                          <span className="forum-badge">
                            {zh ? "置顶" : "Pinned"}
                          </span>
                        )}
                        {post.status === "CLOSED" && (
                          <span className="forum-badge muted">
                            {labels.closed}
                          </span>
                        )}
                      </div>
                      <p className="community-post-excerpt">{post.body}</p>
                      <div className="forum-row-meta">
                        <button onClick={() => void showProfile(post.author)}>
                          {post.author.displayName}
                        </button>
                        <span>·</span>
                        <span>
                          {zh ? "更新于 " : "Updated "}
                          {formatTime(post.updatedAtEpochMs, language)}
                        </span>
                      </div>
                    </div>
                    <button
                      className="forum-reply-count"
                      onClick={() => void openPost(post)}
                      aria-label={`${post.replyCount} ${labels.replies}`}
                    >
                      {post.replyCount}
                    </button>
                  </article>
                ))
              )}
              {nextCursor && (
                <div className="forum-pagination">
                  <button disabled={moreBusy} onClick={() => void loadMore()}>
                    {moreBusy
                      ? zh
                        ? "加载中"
                        : "Loading"
                      : zh
                        ? "加载更多话题"
                        : "More discussions"}
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
        <aside className="forum-sidebar">
          {selected && (
            <div className="forum-panel forum-author-card">
              <button onClick={() => void showProfile(selected.author)}>
                <Avatar profile={selected.author} />
                <strong>{selected.author.displayName}</strong>
              </button>
              {selected.author.city && <p>{selected.author.city}</p>}
              <span>
                {selected.replyCount} {labels.replies}
              </span>
            </div>
          )}
          <div className="forum-panel forum-compose-card">
            <h2>{zh ? "你的经验，值得被看见。" : "Your experience matters."}</h2>
            <p>{zh ? "一个具体的问题，一次实践的记录，都可以成为下一场讨论的起点。" : "A specific question or a record of an experiment can start a useful conversation."}</p>
            <button
              className="forum-primary"
              onClick={() => (profile ? setComposeOpen(true) : goLogin(true))}
            >
              {zh ? "发布新话题" : "New discussion"}<span aria-hidden="true">＋</span>
            </button>
          </div>
          {profile && <div className="forum-panel community-member-account"><button onClick={() => setProfileOpen(true)}>{profile.displayName} ↗</button><button onClick={signOut}>{labels.signOut}</button></div>}
          <div className="forum-panel forum-tip">
            <h2>{zh ? "小贴士" : "A useful starting point"}</h2>
            <p>
              {zh
                ? "好问题从背景开始。附上软件版本、输入参数和报错信息，让别人更容易复现，也更容易帮到你。"
                : "Include software versions, input parameters, and error messages so others can reproduce your question."}
            </p>
          </div>
          <div className="forum-panel forum-members">
            <h2>{zh ? "活跃会员" : "Active members"}</h2>
            {overview?.activeMembers.length ? (
              <div className="forum-member-grid">
                {overview.activeMembers.map((member) => (
                  <button
                    key={member.userId}
                    onClick={() => void showProfile(member)}
                    title={member.displayName}
                  >
                    <Avatar profile={member} />
                    <span>{member.displayName}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p>
                {overview
                  ? zh
                    ? "参与讨论，认识一起做研究的人。"
                    : "Join a discussion and meet fellow researchers."
                  : zh
                    ? "成员信息暂未加载。"
                    : "Member information is unavailable."}
              </p>
            )}
          </div>
          <div className="forum-panel forum-stats">
            <h2>{zh ? "社区统计" : "Community at a glance"}</h2>
            <dl>
              {[
                [zh ? "参与会员" : "Contributors", overview?.members],
                [zh ? "话题" : "Topics", overview?.topics],
                [zh ? "回复" : "Replies", overview?.replies],
              ].map(([name, value]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{value ?? "—"}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="forum-guidelines">
            <h2>{labels.guide}</h2>
            <p>{labels.guideBody}</p>
            {profile?.role && (
              <button
                onClick={() =>
                  void api<Queue>("/api/v1/community/moderation/queue")
                    .then(setModeration)
                    .catch((error) => setNotice(error.message))
                }
              >
                {labels.adminQueue}
              </button>
            )}
          </div>
        </aside>
      </div>
      <div className="forum-container community-resource"><div><h2>{zh ? "把讨论中的好奇，变成学习的起点。" : "Turn curiosity into your next learning path."}</h2></div><SiteLink href="/products/learn-everything/">{zh ? "探索 Learn Everything" : "Explore Learn Everything"} ↗</SiteLink></div>
      <EditorialFooter />
      {composeOpen && (
        <Dialog onClose={() => setComposeOpen(false)}>
          <PostForm
            labels={labels}
            onCancel={() => setComposeOpen(false)}
            onSubmit={async (payload) => {
              try {
                await api("/api/v1/community/posts", {
                  method: "POST",
                  body: JSON.stringify(payload),
                });
                setComposeOpen(false);
                await loadPosts();
              } catch (error) {
                throw error;
              }
            }}
          />
        </Dialog>
      )}
      {profileOpen && profile && (
        <Dialog onClose={() => setProfileOpen(false)}>
          <ProfileForm
            api={api}
            profile={profile}
            labels={labels}
            onClose={() => setProfileOpen(false)}
            onSaved={(next) => {
              setProfile(next);
              setProfileOpen(false);
              void loadPosts();
            }}
          />
        </Dialog>
      )}
      {moderation && (
        <Dialog onClose={() => setModeration(null)}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {labels.adminQueue}
            </h2>
            <button
              onClick={() => setModeration(null)}
              className="text-2xl text-text-tertiary"
              aria-label={labels.cancel}
            >
              ×
            </button>
          </div>
          <div className="mt-6 space-y-3">
            {moderation.hiddenPosts.length ? (
              moderation.hiddenPosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl border border-line p-4"
                >
                  <p className="text-sm text-white">{post.title}</p>
                  <button
                    onClick={() => {
                      setModeration(null);
                      setSelected(post);
                    }}
                    className="mt-3 rounded-full border border-line-strong px-3 py-1.5 text-xs text-text-tertiary"
                  >
                    {labels.restore}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-text-faint">{labels.noQueue}</p>
            )}
          </div>
          {moderation.hiddenReplies.map((reply) => (
            <div
              key={reply.id}
              className="mt-3 rounded-xl border border-line p-4"
            >
              <p className="whitespace-pre-wrap text-sm">{reply.body}</p>
              <button
                onClick={() => void moderateReply(reply.id, "restore")}
                className="mt-3 text-xs text-accent"
              >
                {labels.restore}
              </button>
            </div>
          ))}
          <details className="mt-6">
            <summary className="cursor-pointer text-sm">
              {zh ? "最近管理记录" : "Recent moderation"}
            </summary>
            {moderation.events.map((event) => (
              <p key={event.id} className="mt-3 text-xs text-text-tertiary">
                {formatTime(event.created_at_ms, language)} ·{" "}
                {(
                  {
                    close: labels.close,
                    reopen: labels.reopen,
                    hide: labels.hide,
                    restore: labels.restore,
                    pin: labels.pin,
                    unpin: labels.unpin,
                  } as Record<string, string>
                )[event.action] || event.action}
                {event.reason && `：${event.reason}`}
              </p>
            ))}
          </details>
        </Dialog>
      )}
      {publicProfile && (
        <Dialog onClose={() => setPublicProfile(null)}>
          <div className="flex items-center gap-3">
            <Avatar profile={publicProfile} />
            <h2 className="text-xl font-semibold">
              {publicProfile.displayName}
            </h2>
          </div>
          {publicProfile.city && (
            <p className="mt-4 text-sm text-text-tertiary">
              {publicProfile.city}
            </p>
          )}
          {publicProfile.bio && (
            <p className="mt-4 whitespace-pre-wrap text-sm leading-7">
              {publicProfile.bio}
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-4">
            {publicProfile.githubUrl && (
              <a
                href={publicProfile.githubUrl}
                target="_blank"
                rel="noopener noreferrer nofollow ugc"
                className="text-sm text-accent"
              >
                GitHub ↗
              </a>
            )}
            {publicProfile.twitterUrl && (
              <a
                href={publicProfile.twitterUrl}
                target="_blank"
                rel="noopener noreferrer nofollow ugc"
                className="text-sm text-accent"
              >
                X / Twitter ↗
              </a>
            )}
          </div>
        </Dialog>
      )}
      {loginOpen && <LoginPage overlay onClose={() => setLoginOpen(false)} />}
    </main>
  );
}

function Dialog({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    const prior = document.activeElement as HTMLElement | null;
    node?.showModal();
    return () => {
      node?.close();
      prior?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      aria-label={documentLanguageLabel("社区窗口", "Community dialog")}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="community-dialog fixed m-auto max-h-[92dvh] w-[calc(100%-24px)] max-w-2xl overflow-y-auto rounded-2xl border border-line bg-bg-1 p-5 text-text-primary shadow-2xl backdrop:bg-black/75 sm:p-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div>
        <button
          type="button"
          onClick={onClose}
          className="mb-4 block ml-auto px-3 py-1 text-sm text-text-tertiary"
        >
          {documentLanguageLabel("关闭", "Close")}
        </button>
        {children}
      </div>
    </dialog>
  );
}
function documentLanguageLabel(zh: string, en: string) {
  return typeof document === "undefined" ||
    document.documentElement.lang.startsWith("zh")
    ? zh
    : en;
}
function Avatar({ profile }: { profile: Author }) {
  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent/15 text-accent">
      {profile.avatarUrl ? (
        <Image
          unoptimized
          src={avatarSrc(profile.avatarUrl)!}
          width={32}
          height={32}
          className="h-full w-full object-cover"
          alt=""
        />
      ) : (
        profile.displayName.slice(0, 1)
      )}
    </span>
  );
}

function PostForm({
  labels,
  onSubmit,
  onCancel,
}: {
  labels: Record<string, string>;
  onSubmit: (payload: {
    title: string;
    body: string;
    category: string;
  }) => Promise<void>;
  onCancel: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    const form = new FormData(event.currentTarget);
    setError("");
    try {
      await onSubmit({
        title: String(form.get("title") || ""),
        body: String(form.get("body") || ""),
        category: String(form.get("category") || "discussion"),
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : labels.accountError);
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={submit}>
      <h2 className="text-xl font-semibold text-white">{labels.compose}</h2>
      <label className="mt-6 block text-xs text-text-tertiary">
        {labels.subject}
        <input
          name="title"
          required
          minLength={4}
          maxLength={120}
          className="mt-2 w-full rounded-xl border border-line bg-bg-0 p-3 text-sm text-white outline-none focus:border-accent"
        />
      </label>
      <label className="mt-4 block text-xs text-text-tertiary">
        {labels.discussion}
        <select
          name="category"
          className="mt-2 w-full rounded-xl border border-line bg-bg-0 p-3 text-sm text-white outline-none focus:border-accent"
        >
          <option value="discussion">{labels.discussion}</option>
          <option value="materials">{labels.materials}</option>
          <option value="simulation">{labels.simulation}</option>
          <option value="methods">{labels.methods}</option>
        </select>
      </label>
      <label className="mt-4 block text-xs text-text-tertiary">
        {labels.body}
        <textarea
          name="body"
          required
          maxLength={12000}
          className="mt-2 min-h-44 w-full rounded-xl border border-line bg-bg-0 p-3 text-sm leading-6 text-white outline-none focus:border-accent"
        />
      </label>
      {error && (
        <p role="alert" className="mt-3 text-sm text-accent">
          {error}
        </p>
      )}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-line-strong px-4 py-2 text-sm text-text-tertiary"
        >
          {labels.cancel}
        </button>
        <button
          disabled={busy}
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-bg-0"
        >
          {busy ? "…" : labels.publish}
        </button>
      </div>
    </form>
  );
}

function ReplyForm({
  labels,
  onSubmit,
  onNeedLogin,
  loggedIn,
}: {
  labels: Record<string, string>;
  onSubmit: (body: string) => Promise<void>;
  onNeedLogin: () => void;
  loggedIn: boolean;
}) {
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!loggedIn) {
      onNeedLogin();
      return;
    }
    setBusy(true);
    setError("");
    try {
      await onSubmit(body);
      setBody("");
    } catch (error) {
      setError(error instanceof Error ? error.message : labels.accountError);
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={submit} className="mt-7 border-t border-line pt-5">
      <label className="block text-xs text-text-tertiary">
        {labels.reply}
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          required
          maxLength={8000}
          className="mt-2 min-h-24 w-full rounded-xl border border-line bg-bg-0 p-3 text-sm leading-6 text-white outline-none focus:border-accent"
        />
      </label>
      {error && (
        <p role="alert" className="mt-3 text-sm text-accent">
          {error}
        </p>
      )}
      <div className="mt-3 flex justify-end">
        <button
          disabled={busy}
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-bg-0"
        >
          {busy ? "…" : labels.reply}
        </button>
      </div>
    </form>
  );
}

function ProfileForm({
  api,
  profile,
  labels,
  onClose,
  onSaved,
}: {
  api: Api;
  profile: Profile;
  labels: Record<string, string>;
  onClose: () => void;
  onSaved: (profile: Profile) => void;
}) {
  const [form, setForm] = useState(profile);
  const [busy, setBusy] = useState(false);
  const [avatarBusy, setAvatarBusy] = useState(false);
  const [error, setError] = useState("");
  const update = (key: keyof Profile, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));
  const save = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await api<Profile>("/api/v1/community/me", {
        method: "PATCH",
        body: JSON.stringify({
          displayName: form.displayName,
          city: form.city || null,
          bio: form.bio || null,
          githubUrl: form.githubUrl || null,
          twitterUrl: form.twitterUrl || null,
        }),
      });
      onSaved(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : labels.accountError);
    } finally {
      setBusy(false);
    }
  };
  const upload = async (file: File) => {
    setAvatarBusy(true);
    setError("");
    try {
      const data = new FormData();
      data.append("avatar", file);
      const next = await api<Profile>("/api/v1/me/avatar", {
        method: "POST",
        body: data,
      });
      setForm((current) => ({ ...current, avatarUrl: next.avatarUrl }));
    } catch (error) {
      setError(error instanceof Error ? error.message : labels.accountError);
    } finally {
      setAvatarBusy(false);
    }
  };
  return (
    <form onSubmit={save}>
      <h2 className="text-xl font-semibold text-white">{labels.profile}</h2>
      <p className="mt-3 text-sm leading-6 text-text-tertiary">
        {zhLabel(
          labels,
          "以下资料会公开展示，所在地和社交链接均可留空。头像和昵称与 LLMer 共用。",
          "These details are public. Location and social links are optional. Your name and avatar are shared with LLMer.",
        )}
      </p>
      <p className="mt-3 break-all text-xs text-text-tertiary">
        {zhLabel(labels, "用户 ID", "User ID")}: {profile.userId}
      </p>
      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-line bg-white/[0.06] text-lg text-white">
          {form.avatarUrl ? (
            <Image
              unoptimized
              width={56}
              height={56}
              src={avatarSrc(form.avatarUrl) || ""}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            form.displayName?.[0]
          )}
        </div>
        <label className="min-w-0 text-sm text-text-tertiary">
          {labels.avatar}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={avatarBusy}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void upload(file);
            }}
            className="mt-2 block max-w-full text-xs text-text-tertiary file:mr-3 file:rounded-full file:border-0 file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-bg-0"
          />
        </label>
      </div>
      <Field
        label={zhLabel(labels, "昵称", "Display name")}
        value={form.displayName}
        onChange={(value) => update("displayName", value)}
        required
      />
      <Field
        label={labels.city}
        value={form.city || ""}
        onChange={(value) => update("city", value)}
      />
      <Field
        label={labels.github}
        value={form.githubUrl || ""}
        onChange={(value) => update("githubUrl", value)}
        type="url"
      />
      <Field
        label={labels.twitter}
        value={form.twitterUrl || ""}
        onChange={(value) => update("twitterUrl", value)}
        type="url"
      />
      <label className="mt-4 block text-xs text-text-tertiary">
        {labels.bio}
        <textarea
          value={form.bio || ""}
          onChange={(event) => update("bio", event.target.value)}
          maxLength={160}
          className="mt-2 min-h-24 w-full rounded-xl border border-line bg-bg-0 p-3 text-sm leading-6 text-white outline-none focus:border-accent"
        />
      </label>
      {error && (
        <p className="mt-3 text-sm text-accent" role="alert">
          {error}
        </p>
      )}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-line-strong px-4 py-2 text-sm text-text-tertiary"
        >
          {labels.cancel}
        </button>
        <button
          disabled={busy || avatarBusy}
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-bg-0"
        >
          {busy ? "…" : labels.save}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="mt-4 block text-xs text-text-tertiary">
      {label}
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-line bg-bg-0 p-3 text-sm text-white outline-none focus:border-accent"
      />
    </label>
  );
}

function zhLabel(labels: Record<string, string>, zh: string, en: string) {
  return labels === copy.zh ? zh : en;
}
