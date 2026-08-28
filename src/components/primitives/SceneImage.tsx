"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ASSETS, type AssetKey } from "@/lib/assets";

type Props = {
  id: AssetKey;
  alt?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  variant?: "full" | "md" | "sm";
  fit?: "cover" | "contain";
  objectPosition?: string;
  style?: CSSProperties;
};

/**
 * Fill-layer scientific image with a blurred LQIP underneath so large scenes
 * never flash empty. Uses the pre-optimized full/md/sm WebP variants via
 * srcSet. The parent controls position & size; this fills it.
 *
 * The fade-in is gated on BOTH onLoad and an already-complete check, so a
 * cached image that finished before hydration still becomes visible (never
 * stuck at opacity 0).
 */
export function SceneImage({
  id,
  alt = "",
  className = "",
  imgClassName = "",
  sizes = "100vw",
  priority = false,
  variant = "full",
  fit = "cover",
  objectPosition = "center",
  style,
}: Props) {
  const asset = ASSETS[id];
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const fitClass = fit === "cover" ? "object-cover" : "object-contain";

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} style={style}>
      <img
        src={asset.src.lqip}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full scale-110 ${fitClass} blur-xl`}
      />
      <img
        ref={imgRef}
        src={asset.src[variant]}
        srcSet={`${asset.src.sm} 640w, ${asset.src.md} 960w, ${asset.src.full} 1600w`}
        sizes={sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        onLoad={() => setLoaded(true)}
        style={{ objectPosition }}
        className={`absolute inset-0 h-full w-full ${fitClass} transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
}
