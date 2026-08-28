"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Recalculates ScrollTrigger positions after fonts/images load, so scroll
 * triggers never land in the wrong place due to late layout shifts.
 */
export function ScrollRefresher() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    const t = window.setTimeout(refresh, 800);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
    };
  }, []);
  return null;
}
