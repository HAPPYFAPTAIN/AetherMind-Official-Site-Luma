"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { ScienceSceneMode, createScienceRenderer } from "@/lib/science-renderer";
import { SCIENCE_WORKER_URL } from "@/lib/science-worker-path";
import { assetUrl } from "@/lib/asset-url";

type Props = { mode?: ScienceSceneMode; className?: string };

/** Lazy WebGL enhancement. Static imagery remains available when WebGL fails. */
export function ScienceScene({mode = "hero", className = ""}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // A transferred canvas cannot be transferred again. Give each effect
    // lifetime its own element, including React Strict Mode's setup replay.
    const canvas = document.createElement("canvas");
    canvas.className = "science-scene__canvas";
    host.appendChild(canvas);
    const section = host.closest("section") ?? host;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerDevice = window.matchMedia("(hover: hover) and (pointer: fine)");
    let view: Awaited<ReturnType<typeof createScienceRenderer>> | undefined;
    let worker: Worker | undefined;
    let workerReady = false;
    let workerTimer = 0;
    let cancelled = false;
    let loading = false;
    let contextLost = false;
    let visible = false;
    let frame = 0;
    let restoreTimer = 0;
    let last = 0;
    let lastPaint = 0;
    let activeTime = 0;
    let renderedFrames = 0;
    let tween: gsap.core.Tween | undefined;
    const input = { progress: 0, x: 0, y: 0, strength: 0 };
    const current = {...input};
    let observer: ResizeObserver | undefined;

    const draw = (now: number) => {
      frame = 0;
      if ((!view && !workerReady) || !visible || document.hidden || cancelled || contextLost) return;
      if (mode === "hero" && !motion.matches && now - lastPaint < 32) {requestDraw(); return;}
      lastPaint = now;
      const dt = Math.min((now - last) / 1000 || 0.016, 0.06);
      if (!motion.matches && mode === "hero") activeTime += dt;
      const alpha = motion.matches ? 1 : 1 - Math.exp(-dt * 18);
      last = now;
      current.progress += (input.progress - current.progress) * alpha;
      current.x += (input.x - current.x) * alpha;
      current.y += (input.y - current.y) * alpha;
      current.strength += (input.strength - current.strength) * alpha;
      renderCurrent();
      const pending = Math.abs(current.progress - input.progress) + Math.abs(current.x - input.x) + Math.abs(current.y - input.y) + Math.abs(current.strength - input.strength);
      if (pending > 0.0001 || (mode === "hero" && !motion.matches)) requestDraw();
    };
    function renderCurrent() {
      const progress = motion.matches ? 0 : current.progress;
      const strength = motion.matches ? 0 : current.strength;
      const time = motion.matches ? 0 : activeTime;
      if (worker) worker.postMessage({type: "render", progress, x: current.x, y: current.y, strength, time});
      else view?.render(progress, current.x, current.y, strength, time);
    }
    function requestDraw() {
      if (!frame && visible && !document.hidden && (view || workerReady) && !cancelled && !contextLost) frame = requestAnimationFrame(draw);
    }
    const resize = () => {
      const {width, height} = host.getBoundingClientRect();
      if (width > 0 && height > 0) {
        if (worker) worker.postMessage({type: "resize", width, height, pixelRatio: window.devicePixelRatio || 1});
        else view?.resize(width, height, window.devicePixelRatio || 1);
        requestDraw();
      }
    };
    const setupScroll = () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      input.progress = 0;
      if (!motion.matches) {
        tween = gsap.fromTo(input, { progress: 0 }, {
          progress: 1,
          ease: "none",
          onUpdate: requestDraw,
          scrollTrigger: {
            trigger: mode === "hero" ? section : host,
            start: mode === "hero" ? "top top" : "top 85%",
            end: mode === "hero" ? "bottom bottom" : "bottom 15%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      } else {
        input.progress = 0;
        current.progress = 0;
      }
      requestDraw();
    };
    const start = async () => {
      if (loading || view || cancelled) return;
      loading = true;
      try {
        if (typeof Worker !== "undefined" && "transferControlToOffscreen" in canvas) {
          const background = new Worker(assetUrl(SCIENCE_WORKER_URL), {type: "module", name: `science-${mode}`});
          worker = background;
          const fail = () => {
            host.dataset.ready = "fallback";
            workerReady = false;
            window.clearTimeout(workerTimer);
            background.terminate();
            worker = undefined;
          };
          background.onerror = fail;
          background.onmessage = (event) => {
            if (cancelled) return;
            const message = event.data;
            if (message.type === "ready") {
              window.clearTimeout(workerTimer);
              workerReady = true;
              contextLost = false;
              host.dataset.ready = "true";
              host.dataset.renderer = "worker";
              requestDraw();
            } else if (message.type === "rendered") {
              canvas.dataset.phase = message.phase;
              canvas.dataset.frame = String(++renderedFrames);
            } else if (message.type === "lost") {
              contextLost = true;
              host.dataset.ready = "fallback";
            } else if (message.type === "error") fail();
          };
          const offscreen = canvas.transferControlToOffscreen();
          const {width, height} = host.getBoundingClientRect();
          background.postMessage({type: "init", canvas: offscreen, mode, width, height, pixelRatio: window.devicePixelRatio || 1}, [offscreen]);
          setupScroll();
          current.progress = input.progress;
          renderCurrent();
          observer = new ResizeObserver(resize);
          observer.observe(host);
          workerTimer = window.setTimeout(fail, 15000);
          return;
        }
        const {createScienceRenderer} = await import("@/lib/science-renderer");
        if (cancelled) return;
        const createdView = await createScienceRenderer(canvas, mode);
        if (cancelled) { createdView.dispose(); return; }
        view = createdView;
        resize();
        setupScroll();
        current.progress = input.progress;
        // Render before hiding the fallback, including when a cached deep link
        // lands inside a scroll sequence. A failed GPU keeps the fallback.
        view.render(motion.matches ? 0 : input.progress, 0, 0, 0);
        host.dataset.ready = "true";
        host.dataset.renderer = "main";
        observer = new ResizeObserver(resize);
        observer.observe(host);
        requestDraw();
      } catch (error) {
        host.dataset.ready = "fallback";
        console.warn("Scientific scene could not initialize; retaining static visual.", error);
        view?.dispose();
        view = undefined;
        worker?.terminate();
        worker = undefined;
      }
    };
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) { void start(); requestDraw(); }
      else { cancelAnimationFrame(frame); frame = 0; }
    }, {rootMargin: "160px 0px"});
    intersection.observe(host);

    const onPointer = (event: PointerEvent) => {
      if (!visible || motion.matches || !pointerDevice.matches || event.pointerType !== "mouse") return;
      const bounds = host.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
      const y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
      input.x = Math.max(-1, Math.min(1, x));
      input.y = Math.max(-1, Math.min(1, y));
      input.strength = Math.abs(x) <= 1 && Math.abs(y) <= 1 ? 1 : 0;
      requestDraw();
    };
    const onLeave = () => { input.strength = 0; requestDraw(); };
    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else requestDraw();
    };
    const onLoss = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      cancelAnimationFrame(frame);
      frame = 0;
      host.dataset.ready = "fallback";
    };
    const onRestore = () => {
      // Rebuild materials and instance buffers after GPU context loss.
      // Run after Three has completed its own context restoration handler.
      restoreTimer = window.setTimeout(() => {
        if (cancelled) return;
        view?.dispose(false);
        view = undefined;
        observer?.disconnect();
        loading = false;
        contextLost = false;
        void start();
      }, 0);
    };
    section.addEventListener("pointermove", onPointer as EventListener, {passive: true});
    section.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", setupScroll);
    canvas.addEventListener("webglcontextlost", onLoss);
    canvas.addEventListener("webglcontextrestored", onRestore);

    return () => {
      cancelled = true;
      intersection.disconnect();
      observer?.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(restoreTimer);
      window.clearTimeout(workerTimer);
      tween?.scrollTrigger?.kill();
      tween?.kill();
      section.removeEventListener("pointermove", onPointer as EventListener);
      section.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", setupScroll);
      canvas.removeEventListener("webglcontextlost", onLoss);
      canvas.removeEventListener("webglcontextrestored", onRestore);
      view?.dispose();
      worker?.postMessage({type: "dispose"});
      worker?.terminate();
      canvas.remove();
      delete host.dataset.ready;
    };
  }, [mode]);

  return (
    <div ref={hostRef} className={`science-scene ${className}`} data-science-scene={mode} aria-hidden="true">
      {/* Decorative fallback, visible during loading or without WebGL. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="science-scene__fallback science-object-fade" src={assetUrl("/images/g02/g02-04-layered-2d-material.sm.webp")} alt="" loading={mode === "hero" ? "eager" : "lazy"} fetchPriority={mode === "hero" ? "high" : undefined} />
    </div>
  );
}
