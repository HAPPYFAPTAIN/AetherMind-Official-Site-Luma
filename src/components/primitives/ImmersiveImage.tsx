import { assetUrl } from "@/lib/asset-url";

/** Responsive, project-owned artwork; fixed layout prevents loading shifts. */
export function ImmersiveImage({
  name,
  className = "",
  priority = false,
  alt = "",
  sizes = "100vw",
}: {
  name: "hero-lattice" | "crystal-matter";
  className?: string;
  priority?: boolean;
  alt?: string;
  sizes?: string;
}) {
  const path = `/images/immersive/${name}`;
  return (
    // Pre-compressed local artwork is intentionally served without an image server.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`luma-artwork ${className}`}
      src={assetUrl(`${path}.full.webp`)}
      srcSet={`${assetUrl(`${path}.sm.webp`)} 640w, ${assetUrl(`${path}.md.webp`)} 1024w, ${assetUrl(`${path}.full.webp`)} 1672w`}
      sizes={sizes}
      width={1672}
      height={941}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
