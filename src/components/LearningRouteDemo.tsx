"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import "./learning-route-demo.css";

type Example = { title: string; question: string; nodes: string[] };
const subscribeMotion = (notify: () => void) => {
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const subscribeVisibility = (notify: () => void) => {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
};

export function LearningRouteDemo({ examples, zh }: { examples: Example[]; zh: boolean }) {
  const [selected, setSelected] = useState(0);
  const [replay, setReplay] = useState(0);
  return <div className="route-demo">
    <div className="route-demo-bar"><span><i aria-hidden="true" />{zh ? "从目标到路线" : "FROM GOAL TO LEARNING PATH"}</span><button onClick={() => setReplay(value => value + 1)} aria-label={zh ? "重新播放学习路线演示" : "Replay learning route demo"}><span aria-hidden="true">↻</span>{zh ? "重新演示" : "Replay"}</button></div>
    <div className="route-demo-topics" role="group" aria-label={zh ? "学习路线示例" : "Example learning routes"}><span>{zh ? "试一个方向" : "Try a topic"}</span>{examples.map((item, index) => <button key={item.title} aria-pressed={selected === index} onClick={() => { setSelected(index); setReplay(value => value + 1); }}>{item.title}</button>)}</div>
    <RouteSequence key={`${selected}-${replay}-${zh}`} example={examples[selected]} zh={zh} />
    <p className="route-demo-disclaimer">{zh ? "学习路线示例 · 实际路线将根据你的目标与基础，在学习工作台中生成。" : "Example learning route · Create a personalized path based on your goals and background in the learning workspace."}</p>
  </div>;
}

function RouteSequence({ example, zh }: { example: Example; zh: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const reduced = useSyncExternalStore(subscribeMotion, () => matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
  const pageVisible = useSyncExternalStore(subscribeVisibility, () => !document.hidden, () => true);
  const typingDuration = Math.min(3200, Math.max(2000, example.question.length * 62));
  const loadingEnd = typingDuration + 1150;
  const duration = loadingEnd + example.nodes.length * 420;
  const time = reduced ? duration : elapsed;
  const typing = time < typingDuration;
  const loading = !typing && time < loadingEnd;
  const shown = time < loadingEnd ? 0 : Math.min(example.nodes.length, 1 + Math.floor((time - loadingEnd) / 420));
  const complete = shown === example.nodes.length;
  const question = example.question.slice(0, Math.floor(example.question.length * Math.min(1, time / typingDuration)));

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!inView || !pageVisible || reduced) return;
    const timer = setInterval(() => setElapsed(previous => {
      const next = Math.min(duration, previous + 40);
      if (next === duration) clearInterval(timer);
      return next;
    }), 40);
    return () => clearInterval(timer);
  }, [inView, pageVisible, reduced, duration]);

  return <div className="route-demo-stage" ref={root} data-phase={typing ? "typing" : loading ? "loading" : complete ? "complete" : "revealing"}>
    <div className="route-demo-input">
      <p className="route-demo-overline"><span>01</span>{zh ? "描述你想理解的问题" : "Describe what you want to understand"}</p>
      <div className="route-demo-composer"><div className="route-demo-composer-label"><span className="route-demo-avatar" aria-hidden="true">↗</span><span>{zh ? "我的学习目标" : "My learning goal"}</span></div><p className="route-demo-question" aria-hidden="true">{question}<span className="route-demo-caret" data-active={typing} /></p><p className="sr-only">{example.question}</p><div className="route-demo-composer-foot"><span>{typing ? (zh ? "正在输入示例…" : "Typing an example…") : (zh ? "目标已就绪" : "Goal ready")}</span><span className="route-demo-send" data-ready={!typing} aria-hidden="true">↑</span></div></div>
      <div className="route-demo-context"><span>{zh ? "从哪里开始" : "STARTING POINT"}</span><p>{zh ? "先建立基础，再连接概念。\n把最后一步留给实践。" : "Build a foundation, connect the concepts, then put them into practice."}</p></div>
    </div>
    <div className="route-demo-output">
      <div className="route-demo-output-top"><p className="route-demo-overline"><span>02</span>{zh ? "组织你的学习路线" : "Organize your learning path"}</p><span className="route-demo-count">{String(shown).padStart(2, "0")} / {String(example.nodes.length).padStart(2, "0")}</span></div>
      <div className="route-demo-progress" aria-hidden="true"><span style={{ transform: `scaleX(${shown / example.nodes.length})` }} /></div>
      <div className="route-demo-result">
        {shown === 0 && <div className="route-demo-loading"><span className="route-demo-loader" data-spinning={loading} aria-hidden="true"/><h3>{loading ? (zh ? "加载中" : "Loading") : (zh ? "好的路线，始于一个问题。" : "A good path starts with a question.")}</h3><p>{loading ? (zh ? "梳理基础概念与学习顺序…" : "Organizing concepts and dependencies…") : (zh ? "等待学习目标输入完成" : "Waiting for the learning goal")}</p><div className="route-demo-skeleton" aria-hidden="true"><i/><i/><i/></div></div>}
        <div className="route-demo-route" data-ready={shown > 0} aria-hidden={shown === 0}><h3>{example.title}</h3><ol>{example.nodes.map((node, index) => <li key={node} data-visible={index < shown} aria-hidden={index >= shown}><span className="route-demo-node">{String(index + 1).padStart(2, "0")}</span><div><h4>{node}</h4><p>{[zh ? "建立基础认知" : "Build a foundation", zh ? "连接核心概念" : "Connect key concepts", zh ? "理解方法与原理" : "Understand the methods", zh ? "通过实践验证" : "Put knowledge into practice"][index]}</p></div><span className="route-demo-node-type">{index === 3 ? (zh ? "实践" : "Practice") : (zh ? "学习" : "Learn")}</span></li>)}</ol></div>
      </div>
      <p className="route-demo-status" role="status" aria-live="polite"><span aria-hidden="true">{complete ? "✓" : "·"}</span>{complete ? (zh ? "路线已展开 · 从基础走向实践" : "Path revealed · From foundations to practice") : loading ? (zh ? "正在组织演示路线" : "Organizing the example route") : typing ? (zh ? "等待目标" : "Waiting for the goal") : (zh ? "按学习顺序展开" : "Revealing the learning sequence")}</p>
    </div>
  </div>;
}
