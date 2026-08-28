import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // assets are pre-optimized (WebP at full/md/sm) by scripts/process-assets.mjs
    unoptimized: true,
  },
};

export default nextConfig;
