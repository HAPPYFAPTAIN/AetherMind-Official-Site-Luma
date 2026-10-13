import { assetUrl } from "@/lib/asset-url";

/** Responsive, project-owned artwork; fixed layout prevents loading shifts. */
export function ImmersiveImage({
  name,
  className = "",
  priority = false,
  alt = "",
  sizes = "100vw",
}: {
  name: "hero-lattice" | "crystal-matter" | "quiet-compute" | "md-research-graph";
  className?: string;
  priority?: boolean;
  alt?: string;
  sizes?: string;
}) {
  const path = `/images/immersive/${name}`;
  const width = name === "md-research-graph" ? 1324 : 1672;
  const height = name === "md-research-graph" ? 838 : 941;
  return (
    // Pre-compressed local artwork is intentionally served without an image server.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`luma-artwork ${className}`}
      src={assetUrl(`${path}.full.webp`)}
      srcSet={`${assetUrl(`${path}.sm.webp`)} 640w, ${assetUrl(`${path}.md.webp`)} 1024w, ${assetUrl(`${path}.full.webp`)} ${width}w`}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
