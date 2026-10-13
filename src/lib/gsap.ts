"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };

let refreshFrame = 0;
/** Coalesce late layout changes and let the clicked control paint first. */
export function scheduleScrollRefresh() {
  if (refreshFrame || typeof window === "undefined") return;
  refreshFrame = requestAnimationFrame(() => {
    refreshFrame = requestAnimationFrame(() => {
      refreshFrame = 0;
      if (ScrollTrigger.getAll().length) ScrollTrigger.refresh();
    });
  });
}
