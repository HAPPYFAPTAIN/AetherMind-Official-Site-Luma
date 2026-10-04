export const BRAND = { en: "AethericAI", zh: "以太智元" } as const;
export const BRAND_DESC = "AI for Science";

export const ENTERPRISE_NAV = { label: { en: "Enterprise", zh: "企业服务" }, key: "enterprise" } as const;
export const NAV_LINKS = [
  { label: { en: "Products", zh: "产品" }, href: "/products/", externalPath: true },
  { label: { en: "Community", zh: "社区" }, href: "/community/", externalPath: true },
] as const;
export const AUX_NAV_LINKS = [
  { label: { en: "Join us", zh: "加入我们" }, href: "#careers" },
  { label: { en: "About us", zh: "关于我们" }, href: "#about" },
] as const;

export const BRAND_NAME = BRAND;
