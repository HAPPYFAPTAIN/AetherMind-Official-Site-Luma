"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { ScienceSceneMode, createScienceRenderer } from "@/lib/science-renderer";
import { SCIENCE_WORKER_URL } from "@/lib/science-worker-path";
import { assetUrl } from "@/lib/asset-url";
import { createMolecularQualityMonitor, type MolecularQuality } from "@/lib/molecular-quality";
import type { ScienceWorkerResponse } from "@/lib/science-worker";
import { dragRadiansPerPixel, rotateFromDrag, type DragRotation } from "@/lib/molecular-drag";
import { HERO_PROGRESS_EVENT } from "@/lib/hero-scroll";
import { BACKGROUND_ACTIVITY_EVENT, isBackgroundSuspended } from "@/lib/background-activity";

type Props = { mode?: ScienceSceneMode; className?: string; enabled?: boolean };

/** Lazy WebGL enhancement. Static imagery remains available when WebGL fails. */
export function ScienceScene({mode = "hero", className = "", enabled = true}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !enabled) return;
    // A transferred canvas cannot be transferred again. Give each effect
    // lifetime its own element, including React Strict Mode's setup replay.
    const canvas = document.createElement("canvas");
    canvas.className = "science-scene__canvas";
    host.appendChild(canvas);
    const section = host.closest("section") ?? host;
    const interactionSurface = mode === "hero" ? host.closest<HTMLElement>(".science-hero__stage") ?? section : section;
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
    let workerBusy = false;
    let dragPointer: number | null = null;
    let dragX = 0, dragY = 0, dragSensitivity = 0;
    let rotation: DragRotation = [0, 0, 0, 1];
    let lastInteraction = performance.now();
    let quality: MolecularQuality = "medium";
    const qualityMonitor = createMolecularQualityMonitor();
    const isActive = (now: number) => dragPointer !== null || now - lastInteraction < 1200;
    const onRendered = (stats?: Extract<ScienceWorkerResponse, {type: "rendered"}>["stats"]) => {
      if (stats) {
        canvas.dataset.quality = stats.quality;
        canvas.dataset.triangles = String(stats.triangles);
        canvas.dataset.drawCalls = String(stats.drawCalls);
        canvas.dataset.renderWidth = String(stats.width);
        canvas.dataset.renderHeight = String(stats.height);
        canvas.dataset.rotation = JSON.stringify(stats.rotation);
      }
      if (mode !== "hero" || !visible || document.hidden || isBackgroundSuspended() || motion.matches) return;
      const now = performance.now();
      if (qualityMonitor.sample(now, isActive(now))) {
        quality = "low";
        if (worker) worker.postMessage({type: "quality", quality});
        else if (view && "setQuality" in view) view.setQuality(quality);
      }
    };
    let tween: gsap.core.Tween | undefined;
    const input = { progress: 0, x: 0, y: 0, strength: 0 };
    const current = {...input};
    let observer: ResizeObserver | undefined;

    const draw = (now: number) => {
      frame = 0;
      if ((!view && !workerReady) || !visible || document.hidden || isBackgroundSuspended() || cancelled || contextLost) return;
      const interval = dragPointer !== null && quality === "medium" ? 15.9 : isActive(now) ? 32 : 64;
      if (mode === "hero" && !motion.matches && now - lastPaint < interval) {requestDraw(); return;}
      // Keep only the latest input while the worker is still drawing.
      if (workerReady && workerBusy) {requestDraw(); return;}
      lastPaint = now;
      const dt = Math.min((now - last) / 1000 || 0.016, 0.1);
      if (!motion.matches && mode === "hero" && dragPointer === null) activeTime += dt;
      const alpha = motion.matches ? 1 : 1 - Math.exp(-dt * 18);
      const pointerAlpha = motion.matches ? 1 : 1 - Math.exp(-dt * 36);
      last = now;
      if (mode === "hero") current.progress = input.progress;
      else current.progress += (input.progress - current.progress) * alpha;
      current.x += (input.x - current.x) * pointerAlpha;
      current.y += (input.y - current.y) * pointerAlpha;
      current.strength += (input.strength - current.strength) * pointerAlpha;
      renderCurrent();
      const pending = Math.abs(current.progress - input.progress) + Math.abs(current.x - input.x) + Math.abs(current.y - input.y) + Math.abs(current.strength - input.strength);
      // The film supplies ambient motion. The model renders only while input
      // settles or someone is interacting, instead of competing with every click.
      if (pending > 0.0001 || (mode === "hero" && !motion.matches && isActive(now))) requestDraw();
    };
    function renderCurrent() {
      const progress = motion.matches ? 0 : current.progress;
      const strength = motion.matches ? 0 : current.strength;
      const time = motion.matches ? 0 : activeTime;
      const orientation = mode === "hero" && !motion.matches ? rotation : undefined;
      if (worker) {
        workerBusy = workerReady;
        worker.postMessage({type: "render", progress, x: current.x, y: current.y, strength, time, rotation: orientation});
      } else if (view) {
        view.render(progress, current.x, current.y, strength, time, orientation);
        onRendered("getStats" in view ? view.getStats() : undefined);
      }
    }
    function requestDraw() {
      if (!frame && visible && !document.hidden && !isBackgroundSuspended() && (view || workerReady) && !cancelled && !contextLost) frame = requestAnimationFrame(draw);
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
      if (motion.matches) endDrag();
      tween?.scrollTrigger?.kill();
      tween?.kill();
      input.progress = 0;
      if (mode === "hero" && !motion.matches) {
        input.progress = Number(section.dataset.sceneProgress) || 0;
        current.progress = input.progress;
      } else if (!motion.matches) {
        tween = gsap.fromTo(input, { progress: 0 }, {
          progress: 1,
          ease: "none",
          onUpdate: () => { lastInteraction = performance.now(); requestDraw(); },
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
    const onHeroProgress = (event: Event) => {
      if (mode !== "hero" || motion.matches) return;
      input.progress = (event as CustomEvent<number>).detail;
      lastInteraction = performance.now();
      requestDraw();
    };
    const start = async () => {
      if (loading || view || cancelled || !visible || document.hidden || isBackgroundSuspended()) return;
      loading = true;
      try {
        if (typeof Worker !== "undefined" && "transferControlToOffscreen" in canvas) {
          const background = new Worker(assetUrl(SCIENCE_WORKER_URL), {type: "module", name: `science-${mode}`});
          worker = background;
          const fail = () => {
            endDrag();
            delete interactionSurface.dataset.dragReady;
            host.dataset.ready = "fallback";
            workerReady = false;
            workerBusy = false;
            window.clearTimeout(workerTimer);
            background.terminate();
            worker = undefined;
          };
          background.onerror = fail;
          background.onmessage = (event) => {
            if (cancelled) return;
            const message = event.data as ScienceWorkerResponse;
            if (message.type === "ready") {
              window.clearTimeout(workerTimer);
              workerReady = true;
              workerBusy = false;
              qualityMonitor.reset();
              contextLost = false;
              host.dataset.ready = "true";
              host.dataset.renderer = "worker";
              if (mode === "hero") interactionSurface.dataset.dragReady = "true";
              requestDraw();
            } else if (message.type === "rendered") {
              workerBusy = false;
              canvas.dataset.phase = message.phase;
              canvas.dataset.frame = String(++renderedFrames);
              onRendered(message.stats);
            } else if (message.type === "lost") {
              contextLost = true;
              endDrag();
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
        if ("setQuality" in view) view.setQuality(quality);
        resize();
        setupScroll();
        current.progress = input.progress;
        // Render before hiding the fallback, including when a cached deep link
        // lands inside a scroll sequence. A failed GPU keeps the fallback.
        view.render(motion.matches ? 0 : input.progress, current.x, current.y, motion.matches ? 0 : current.strength, motion.matches ? 0 : activeTime, motion.matches ? undefined : rotation);
        host.dataset.ready = "true";
        host.dataset.renderer = "main";
        if (mode === "hero") interactionSurface.dataset.dragReady = "true";
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
      qualityMonitor.reset();
      last = 0;
      visible = entry.isIntersecting;
      if (visible) { void start(); requestDraw(); }
      else { endDrag(); cancelAnimationFrame(frame); frame = 0; }
    }, {rootMargin: "0px"});
    intersection.observe(host);

    const onPointer = (event: PointerEvent) => {
      if (!visible || isBackgroundSuspended() || motion.matches || !pointerDevice.matches || event.pointerType !== "mouse") return;
      if (dragPointer === null && event.target instanceof Element && event.target.closest("a,button,input,textarea,select,[role='button']")) return;
      lastInteraction = performance.now();
      if (dragPointer !== null) {
        if (event.pointerId !== dragPointer) return;
        if (!(event.buttons & 1)) { endDrag(); return; }
        rotation = rotateFromDrag(rotation, event.clientX - dragX, event.clientY - dragY, dragSensitivity);
        dragX = event.clientX; dragY = event.clientY;
        requestDraw();
        return;
      }
      const bounds = host.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
      const y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
      const shortSide = Math.max(1, Math.min(bounds.width, bounds.height));
      input.x = mode === "hero" ? x * bounds.width / shortSide : Math.max(-1, Math.min(1, x));
      input.y = mode === "hero" ? y * bounds.height / shortSide : Math.max(-1, Math.min(1, y));
      input.strength = Math.abs(x) <= 1 && Math.abs(y) <= 1 ? 1 : 0;
      requestDraw();
    };
    const onDown = (event: PointerEvent) => {
      if (mode !== "hero" || !visible || isBackgroundSuspended() || motion.matches || !pointerDevice.matches || event.pointerType !== "mouse" || event.button !== 0 || dragPointer !== null || (!view && !workerReady) || contextLost) return;
      if (event.target instanceof Element && event.target.closest("a,button,input,textarea,select,[role='button'],[contenteditable='true']")) return;
      const bounds = interactionSurface.getBoundingClientRect();
      dragSensitivity = dragRadiansPerPixel(bounds.width, bounds.height);
      dragX = event.clientX; dragY = event.clientY;
      interactionSurface.setPointerCapture(event.pointerId);
      dragPointer = event.pointerId;
      interactionSurface.dataset.dragging = "true";
      // Freeze the small hover offset as well as auto-rotation during a drag.
      input.x = current.x; input.y = current.y; input.strength = current.strength;
      lastInteraction = performance.now();
      lastPaint = 0;
      event.preventDefault();
      requestDraw();
    };
    function endDrag() {
      const pointer = dragPointer;
      dragPointer = null;
      delete interactionSurface.dataset.dragging;
      if (pointer === null) return;
      if (interactionSurface.hasPointerCapture(pointer)) interactionSurface.releasePointerCapture(pointer);
      lastInteraction = performance.now();
      requestDraw();
    }
    const onUp = (event: PointerEvent) => { if (event.pointerId === dragPointer) endDrag(); };
    const onLeave = () => { if (dragPointer !== null) return; lastInteraction = performance.now(); input.strength = 0; requestDraw(); };
    const onVisibility = () => {
      qualityMonitor.reset();
      last = 0;
      if (document.hidden || isBackgroundSuspended()) { endDrag(); cancelAnimationFrame(frame); frame = 0; }
      else { void start(); requestDraw(); }
    };
    const onLoss = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      endDrag();
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
    interactionSurface.addEventListener("pointermove", onPointer as EventListener, {passive: true});
    interactionSurface.addEventListener("pointerleave", onLeave);
    interactionSurface.addEventListener("pointerdown", onDown as EventListener);
    interactionSurface.addEventListener("pointerup", onUp as EventListener);
    interactionSurface.addEventListener("pointercancel", onUp as EventListener);
    interactionSurface.addEventListener("lostpointercapture", onUp as EventListener);
    window.addEventListener("blur", endDrag);
    section.addEventListener(HERO_PROGRESS_EVENT, onHeroProgress);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener(BACKGROUND_ACTIVITY_EVENT, onVisibility);
    motion.addEventListener("change", setupScroll);
    canvas.addEventListener("webglcontextlost", onLoss);
    canvas.addEventListener("webglcontextrestored", onRestore);

    return () => {
      cancelled = true;
      endDrag();
      delete interactionSurface.dataset.dragReady;
      intersection.disconnect();
      observer?.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(restoreTimer);
      window.clearTimeout(workerTimer);
      tween?.scrollTrigger?.kill();
      tween?.kill();
      interactionSurface.removeEventListener("pointermove", onPointer as EventListener);
      interactionSurface.removeEventListener("pointerleave", onLeave);
      interactionSurface.removeEventListener("pointerdown", onDown as EventListener);
      interactionSurface.removeEventListener("pointerup", onUp as EventListener);
      interactionSurface.removeEventListener("pointercancel", onUp as EventListener);
      interactionSurface.removeEventListener("lostpointercapture", onUp as EventListener);
      window.removeEventListener("blur", endDrag);
      section.removeEventListener(HERO_PROGRESS_EVENT, onHeroProgress);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener(BACKGROUND_ACTIVITY_EVENT, onVisibility);
      motion.removeEventListener("change", setupScroll);
      canvas.removeEventListener("webglcontextlost", onLoss);
      canvas.removeEventListener("webglcontextrestored", onRestore);
      view?.dispose();
      worker?.postMessage({type: "dispose"});
      worker?.terminate();
      canvas.remove();
      delete host.dataset.ready;
    };
  }, [mode, enabled]);

  return (
    <div ref={hostRef} className={`science-scene ${className}`} data-science-scene={mode} aria-hidden="true">
      {/* Decorative fallback, visible during loading or without WebGL. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="science-scene__fallback science-object-fade" src={assetUrl("/images/g02/g02-04-layered-2d-material.sm.webp")} alt="" loading={mode === "hero" ? "eager" : "lazy"} fetchPriority={mode === "hero" ? "high" : undefined} />
    </div>
  );
}
