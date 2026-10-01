// Set at build time so the same source can run at / or under /official/.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetUrl(path: string): string {
  return `${basePath}${path}`;
}
