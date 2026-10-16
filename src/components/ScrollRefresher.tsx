"use client";

import { useEffect } from "react";
import { scheduleScrollRefresh } from "@/lib/gsap";

/**
 * Recalculates ScrollTrigger positions after fonts/images load, so scroll
 * triggers never land in the wrong place due to late layout shifts.
 */
export function ScrollRefresher() {
  useEffect(() => {
    let disposed = false;
    const refresh = () => { if (!disposed) scheduleScrollRefresh(); };
    window.addEventListener("load", refresh);
    if (document.readyState === "complete") refresh();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    return () => {
      disposed = true;
      window.removeEventListener("load", refresh);
    };
  }, []);
  return null;
}
