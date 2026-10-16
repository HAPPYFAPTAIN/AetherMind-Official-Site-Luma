import { CommunityPage } from "@/components/CommunityPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "研究者社区 — 以太智元 AetherMind",
  description: "讨论分子模拟、材料研究与科学计算方法，分享可复现的实践，与研究者共同探索。",
};

export default function CommunityRoute() {
  return <CommunityPage />;
}
