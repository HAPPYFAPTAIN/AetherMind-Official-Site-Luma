"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap, scheduleScrollRefresh } from "@/lib/gsap";
import { ACCOUNT_SESSION_STORAGE_KEYS, hasAccountSession } from "@/lib/account-client";
import { BrandSilhouette, BRAND_ICON_VIEWBOX } from "./BrandMark";

export type Arrival = "waiting" | "entering" | "ready";

// Run before the static homepage markup is painted. The account client still
// validates/refreshes the session normally; this hint only skips the artwork.
export const HOME_INTRO_BOOTSTRAP = `(()=>{let signedIn=false;try{signedIn=${JSON.stringify(ACCOUNT_SESSION_STORAGE_KEYS)}.some(key=>Boolean(localStorage.getItem(key)))}catch{}document.documentElement.dataset.homeSession=String(signedIn)})();`;

/** A cutout of the supplied company artwork opens onto the actual live hero. */
export function HomeIntro({
  mainRef,
  onStateChange,
  label,
  hint,
  restartAtTop = false,
}: {
  mainRef: RefObject<HTMLElement | null>;
  onStateChange: (state: Arrival) => void;
  label: string;
  hint: string;
  restartAtTop?: boolean;
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const aperture = useRef<SVGGElement>(null);
  const passage = useRef<SVGCircleElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const enter = useRef<() => void>(() => {});

  useLayoutEffect(() => {
    const main = mainRef.current;
    const screen = overlay.current;
    if (!main || !screen) return;

    let signedIn = false;
    try {
      signedIn = hasAccountSession();
    } catch {
      // Storage may be unavailable; visitors can still enter the homepage.
    }
    document.documentElement.dataset.homeSession = String(signedIn);
    if (signedIn) {
      onStateChange("ready");
      return;
    }

    if (restartAtTop) window.scrollTo({ top: 0, behavior: "instant" });
    let anchor = window.location.hash.slice(1);
    try {
      anchor = decodeURIComponent(anchor);
    } catch {
      // An invalid fragment should not prevent the opening from working.
    }
    const isTopLink = anchor === "top";
    const target = anchor ? document.getElementById(anchor) : null;
    const isContentLink = !isTopLink && target !== null && main.contains(target);
    // Only content deep links or restored reading positions bypass the opening.
    // #top is a normal homepage entry, even if the browser restores its scroll.
    if (isContentLink || (!isTopLink && window.scrollY > 24)) {
      onStateChange("ready");
      return;
    }
    if (isTopLink) window.scrollTo({ top: 0, behavior: "instant" });

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousOverscroll = body.style.overscrollBehavior;
    const previousInert = main.inert;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let started = false;
    let finished = false;
    let timeline: gsap.core.Timeline | undefined;
    let releaseTimer: ReturnType<typeof setTimeout> | undefined;
    let lastWheel = 0;
    let startedAt = 0;
    main.inert = true;
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    button.current?.focus({ preventScroll: true });

    const release = () => {
      // Let the initiating trackpad gesture end before restoring page scrolling.
      if (performance.now() - lastWheel < 180 && performance.now() - startedAt < 2200) {
        releaseTimer = setTimeout(release, 180);
        return;
      }
      finished = true;
      main.inert = previousInert;
      body.style.overflow = previousOverflow;
      body.style.overscrollBehavior = previousOverscroll;
      onStateChange("ready");
      scheduleScrollRefresh();
      const title = main.querySelector<HTMLElement>("#luma-title");
      title?.focus({ preventScroll: true });
    };

    enter.current = () => {
      if (started) return;
      started = true;
      startedAt = performance.now();
      onStateChange("entering");
      if (motion.matches) {
        gsap.set(screen, { opacity: 0 });
        release();
        return;
      }
      const zoom = { progress: 0 };
      timeline = gsap.timeline({ onComplete: release });
      timeline.to(screen.querySelector(".luma-intro-hint"), { opacity: 0, duration: 0.18 }, 0);
      timeline.to(zoom, {
        progress: 1,
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => {
          const progress = zoom.progress;
          aperture.current?.setAttribute("transform", `translate(500 ${545 - 45 * progress}) scale(${3 + 77 * progress})`);
          // Open the mark's inner hexagon as the camera passes through it.
          passage.current?.setAttribute("r", String(12 * progress));
        },
      }, 0);
      timeline.to(screen, { opacity: 0, duration: 0.25 }, 1.25);
    };

    const wheel = (event: WheelEvent) => {
      if (finished || event.ctrlKey || event.deltaY === 0) return;
      event.preventDefault();
      lastWheel = performance.now();
      enter.current();
    };
    const key = (event: KeyboardEvent) => {
      if (finished || !["Enter", " ", "ArrowDown", "PageDown", "Escape"].includes(event.key)) return;
      event.preventDefault();
      enter.current();
    };
    const touch = (event: TouchEvent) => {
      if (finished) return;
      event.preventDefault();
      enter.current();
    };
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", key);
    screen.addEventListener("touchmove", touch, { passive: false });
    return () => {
      timeline?.kill();
      clearTimeout(releaseTimer);
      enter.current = () => {};
      main.inert = previousInert;
      body.style.overflow = previousOverflow;
      body.style.overscrollBehavior = previousOverscroll;
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", key);
      screen.removeEventListener("touchmove", touch);
    };
  }, [mainRef, onStateChange, restartAtTop]);

  return (
    <div ref={overlay} className="luma-intro">
      <svg className="luma-intro-mask" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <mask id="luma-arrival-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000" style={{ maskType: "luminance" }}>
            <rect width="1000" height="1000" fill="white" />
            <g ref={aperture} transform="translate(500 545) scale(3)">
              <svg x="-38" y="-57" width="76" height="84" viewBox={BRAND_ICON_VIEWBOX} style={{ overflow: "hidden" }}>
                <BrandSilhouette />
              </svg>
              <circle ref={passage} r="0" fill="black" />
            </g>
          </mask>
        </defs>
        <rect width="1000" height="1000" fill="#000" mask="url(#luma-arrival-mask)" />
      </svg>
      <button ref={button} type="button" className="luma-intro-enter" aria-label={label} onClick={() => enter.current()}>
        <span className="luma-intro-hint">{hint}<span aria-hidden="true">↗</span></span>
      </button>
    </div>
  );
}
