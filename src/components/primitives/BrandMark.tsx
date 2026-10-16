import { assetUrl } from "@/lib/asset-url";

// Crop only the SVG viewport. The user's transparent source artwork is unchanged.
export const BRAND_ICON_VIEWBOX = "64 28 76 84";

/** Straight-edge outline traced from the supplied mark, including both cutouts. */
export function BrandSilhouette() {
  return (
    <path fill="black" fillRule="evenodd" d="M102 31 66 52 66 99 84 110 84 98 102 108 120 98 120 110 138 99 138 52Z M76 66 102 50 128 66 120 72 102 62 84 72Z M102 72 114 79 114 92 102 99 90 92 90 79Z" />
  );
}

export function BrandArtwork({ filter }: { filter?: string }) {
  return <image href={assetUrl("/images/brand/aethermind-logo.png")} width="479" height="150" filter={filter} />;
}

export function BrandMark() {
  return (
    <svg width="30" height="33" viewBox={BRAND_ICON_VIEWBOX} fill="none" aria-hidden="true" className="shrink-0" style={{ overflow: "hidden" }}>
      <BrandArtwork />
    </svg>
  );
}
