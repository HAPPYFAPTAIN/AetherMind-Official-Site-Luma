"use client";

import { useEffect, useRef, useState } from "react";
import { assetUrl } from "@/lib/asset-url";
import { ImmersiveImage } from "./ImmersiveImage";
import { BACKGROUND_ACTIVITY_EVENT, isBackgroundSuspended } from "@/lib/background-activity";

type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };

/** One local, silent film. No decoding when the hero or tab is out of view. */
export function HeroFilm({ pauseLabel, playLabel }: { pauseLabel: string; playLabel: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const failed = useRef(false);
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const film = video.current;
    if (!film) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    let visible = false;
    let disposed = false;
    const update = () => {
      const constrained = failed.current || motion.matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "");
      setAvailable(!constrained);
      if (constrained || paused || !visible || document.hidden || isBackgroundSuspended()) {
        film.pause();
        return;
      }
      if (!film.getAttribute("src")) film.src = assetUrl("/videos/aethermind-h3-subtle-hd.mp4");
      film.play().catch(() => { if (!disposed) setPlaying(false); });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: 0 });
    observer.observe(film.closest("section") ?? film);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    window.addEventListener(BACKGROUND_ACTIVITY_EVENT, update);
    connection?.addEventListener("change", update);
    update();
    return () => {
      disposed = true;
      observer.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener(BACKGROUND_ACTIVITY_EVENT, update);
      connection?.removeEventListener("change", update);
      film.pause();
    };
  }, [paused]);

  return (
    <>
      <div className="luma-hero-environment" aria-hidden="true">
        <ImmersiveImage name="hero-lattice" priority sizes="(max-aspect-ratio: 16/9) 178vh, 100vw" />
        <video
          ref={video}
          className="luma-hero-film"
          muted loop playsInline preload="none" tabIndex={-1}
          onLoadedData={event => { event.currentTarget.dataset.loaded = "true"; }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={event => { failed.current = true; event.currentTarget.dataset.loaded = "false"; setAvailable(false); }}
        />
      </div>
      {available && (
        <button
          type="button"
          className="luma-film-toggle"
          aria-label={playing ? pauseLabel : playLabel}
          title={playing ? pauseLabel : playLabel}
          onClick={() => {
            if (playing) setPaused(true);
            else {
              setPaused(false);
              // Keep an explicit retry in the click gesture for autoplay-blocked browsers.
              if (!isBackgroundSuspended()) video.current?.play().catch(() => setPlaying(false));
            }
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            {playing ? <path d="M4 3h2v10H4zm6 0h2v10h-2z" /> : <path d="m5 3 8 5-8 5z" />}
          </svg>
        </button>
      )}
    </>
  );
}
