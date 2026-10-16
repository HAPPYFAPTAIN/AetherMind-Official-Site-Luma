import { LearnEverythingPage } from "@/components/LearnEverythingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn Everything 学习智能体 — 以太智元 AetherMind",
  description: "从问题出发，生成学习路线，结合知识问答、间隔复习和测验，在统一工作台中积累知识。",
};

export default function LearnEverythingRoute() {
  return <LearnEverythingPage />;
}
