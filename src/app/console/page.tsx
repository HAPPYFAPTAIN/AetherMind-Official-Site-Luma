"use client";

import { useEffect } from "react";
import { assetUrl } from "@/lib/asset-url";

export default function ConsoleRoute() {
  useEffect(() => {
    window.location.replace(assetUrl("/md-agent/"));
  }, []);

  return (
    <main style={{ minHeight: "100dvh", display: "grid", placeItems: "center" }}>
      <p role="status">正在进入智能体…</p>
    </main>
  );
}
