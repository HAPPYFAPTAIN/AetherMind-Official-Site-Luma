"use client";
import Image from "next/image";
import { assetUrl } from "@/lib/asset-url";
import { productAssets } from "@/data/productAssets";

const lightAssets: Record<string, string> = {
  [productAssets.enterpriseHero]: "/images/theme-light/compute-v2",
  [productAssets.platform]: "/images/products/light-derived-v1/platform",
  [productAssets.materials]: "/images/products/light-derived-v1/materials",
  [productAssets.chemistry]: "/images/products/light-derived-v1/chemistry",
  [productAssets.lammps]: "/images/products/light-derived-v1/lammps",
  [productAssets.mdExp]: "/images/products/light-derived-v1/md-exp",
  [productAssets.aiAgent]: "/images/products/light-derived-v1/agent",
  [productAssets.learning]: "/images/products/light-derived-v1/learning",
  [productAssets.biology]: "/images/products/light-derived-v1/biology",
  "/images/community/conversation-v2": "/images/theme-light/community",
};
export function ThemedProductArt({ base, alt = "", sizes = "100vw", priority = false }: { base: string; alt?: string; sizes?: string; priority?: boolean }) {
  const light = lightAssets[base];
  return <span className="themed-art">
    <picture><source srcSet={[640,1280,1536].map(w => `${assetUrl(`${base}-${w}.webp`)} ${w}w`).join(",")} sizes={sizes}/><Image src={assetUrl(`${base}-1536.webp`)} alt={alt} fill sizes={sizes} priority={priority} /></picture>
    {light && <picture className="art-light"><source srcSet={`${assetUrl(`${light}-640.webp`)} 640w, ${assetUrl(`${light}.webp`)} 1536w`} sizes={sizes}/><Image src={assetUrl(`${light}.webp`)} alt="" aria-hidden="true" fill sizes={sizes} loading={priority ? "eager" : "lazy"} /></picture>}
  </span>;
}
