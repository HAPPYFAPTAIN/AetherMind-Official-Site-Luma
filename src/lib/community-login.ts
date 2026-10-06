import { assetUrl } from "./asset-url";

export const COMMUNITY_TERMS_VERSION = "2026-10-01";
export function communityReturnPath(candidate: string | null): string {
  const fallback = assetUrl("/dashboard/");
  if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//"))
    return fallback;
  try {
    const url = new URL(candidate, "https://local.invalid");
    const community = assetUrl("/community/");
    if (
      url.origin !== "https://local.invalid" ||
      ![community, fallback, assetUrl("/products/")].includes(url.pathname)
    )
      return fallback;
    if (url.pathname !== community) return url.pathname;
    const params = new URLSearchParams();
    const topic = url.searchParams.get("topic");
    if (topic && /^[A-Za-z0-9_-]{1,80}$/.test(topic))
      params.set("topic", topic);
    if (url.searchParams.get("compose") === "1") params.set("compose", "1");
    return community + (params.size ? "?" + params.toString() : "");
  } catch {
    return fallback;
  }
}
