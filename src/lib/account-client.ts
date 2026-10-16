export const ACCOUNT_API =
  process.env.NEXT_PUBLIC_COMMUNITY_API_BASE || "/official-api";
const ACCESS = "aethericai-community-access-token";
const REFRESH = "aethericai-community-refresh-token";
const EXPIRES = "aethericai-community-access-expires";
// Shared with the homepage's first-paint session hint; never an access check.
export const ACCOUNT_SESSION_STORAGE_KEYS = [ACCESS, REFRESH] as const;
let refreshing: Promise<void> | null = null;

// Absolute URL for API-served resources such as avatar images.
export function accountUrl(path: string) {
  return `${ACCOUNT_API}${path}`;
}

export class AccountError extends Error {
  constructor(
    message: string,
    public status: number,
    public retryAfterSeconds?: number,
  ) {
    super(message);
  }
}

export type AccountSession = {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAtEpochMs: number;
};

export function getSession(): AccountSession | null {
  if (typeof window === "undefined") return null;
  const accessToken = window.localStorage.getItem(ACCESS);
  const refreshToken = window.localStorage.getItem(REFRESH);
  if (!accessToken && !refreshToken) return null;
  return {
    accessToken,
    refreshToken,
    accessTokenExpiresAtEpochMs:
      Number(window.localStorage.getItem(EXPIRES)) || 0,
  };
}

export function setSession(tokens: {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAtEpochMs: number;
}) {
  window.localStorage.setItem(ACCESS, tokens.accessToken);
  window.localStorage.setItem(REFRESH, tokens.refreshToken);
  window.localStorage.setItem(
    EXPIRES,
    String(tokens.accessTokenExpiresAtEpochMs),
  );
  window.dispatchEvent(new Event("account-session-changed"));
}

export function hasAccountSession() {
  return getSession() !== null;
}

export function clearAccountSession() {
  [ACCESS, REFRESH, EXPIRES].forEach((key) =>
    window.localStorage.removeItem(key),
  );
  window.dispatchEvent(new Event("account-session-changed"));
}

export async function accountApi<T>(
  path: string,
  init: RequestInit = {},
  retry = true,
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (init.body && !(init.body instanceof FormData))
    headers.set("Content-Type", "application/json");
  const token = window.localStorage.getItem(ACCESS);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(
    `${ACCOUNT_API}${path.startsWith("/api/") ? path : "/api/v1/console" + path}`,
    { ...init, headers },
  );
  if (
    response.status === 401 &&
    retry &&
    window.localStorage.getItem(REFRESH)
  ) {
    refreshing ??= (async () => {
      const refreshed = await fetch(`${ACCOUNT_API}/api/v1/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: window.localStorage.getItem(REFRESH),
        }),
      });
      if (!refreshed.ok) {
        if (refreshed.status === 401) clearAccountSession();
        throw new AccountError("登录已过期，请重新登录", refreshed.status);
      }
      const next = await refreshed.json();
      window.localStorage.setItem(ACCESS, next.accessToken);
      window.localStorage.setItem(REFRESH, next.refreshToken);
      window.localStorage.setItem(
        EXPIRES,
        String(next.accessTokenExpiresAtEpochMs),
      );
    })().finally(() => {
      refreshing = null;
    });
    await refreshing;
    return accountApi<T>(path, init, false);
  }
  const data =
    response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok)
    throw new AccountError(
      data?.error?.message || "操作未完成，请稍后重试",
      response.status,
      data?.error?.retryAfterSeconds,
    );
  return data as T;
}

// Unauthenticated JSON POST (login, SMS request). Shares the base URL and the
// error shape with accountApi but never attaches tokens or refreshes them.
export async function publicPost<T = Record<string, unknown>>(
  path: string,
  body: object,
): Promise<T> {
  const response = await fetch(`${ACCOUNT_API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data =
    response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok)
    throw new AccountError(
      data?.error?.message || "操作未完成，请稍后重试",
      response.status,
      data?.error?.retryAfterSeconds,
    );
  return data as T;
}

export async function signOut() {
  await accountApi("/api/v1/auth/logout", { method: "POST" });
  clearAccountSession();
}

export function fetchAccount() {
  return accountApi<AccountProfile>("/me");
}

export function fetchDashboard(days = 7, product = "all") {
  return accountApi<DashboardData>(
    `/dashboard?days=${days}&product=${encodeURIComponent(product)}`,
  );
}

export type RedeemResult = {
  balance: number;
  credits: number;
  units: number;
  days: number;
  productId: string | null;
};

export function redeemActivationCode(code: string, targetUserId?: string) {
  return accountApi<RedeemResult>("/redeem", {
    method: "POST",
    body: JSON.stringify(targetUserId ? { code, targetUserId } : { code }),
  });
}

export type AccountProfile = {
  userId: string;
  displayName: string;
  phoneMasked: string;
  role: "OWNER" | "ADMIN" | "USER";
  balance: number;
  productIds: string[];
};
export type AccountProduct = {
  id: string;
  name: string;
  name_en: string;
  description: string;
  image: string;
  entry_url: string;
  status: "AVAILABLE" | "COMING_SOON";
  price: number;
  package_units: number;
  package_days: number;
  unit_point_cost: number;
};
export type UsagePoint = {
  day?: string;
  calls: number;
  units: number;
  points: number;
  inputTokens: number;
  cachedTokens: number;
  outputTokens: number;
};
export type Entitlement = {
  product_id: string;
  name: string;
  name_en: string;
  units: number;
  expires_at_ms: number | null;
  active: boolean;
  entry_url: string;
  image: string;
};
export type LedgerEntry = {
  id: string;
  delta: number;
  balance_after: number;
  kind: string;
  reason: string;
  created_at_ms: number;
};
export type DashboardData = {
  profile: AccountProfile;
  summary: { today: UsagePoint; week: UsagePoint; total: UsagePoint };
  trend: UsagePoint[];
  heatmap: UsagePoint[];
  ranking: (UsagePoint & { product_id: string })[];
  products: AccountProduct[];
  entitlements: Entitlement[];
  ledger: LedgerEntry[];
  orders: {
    id: string;
    name: string;
    price: number;
    units: number;
    days: number;
    created_at_ms: number;
  }[];
  walletTotals: { credited: number; spent: number };
  asOf: number;
  timezone: string;
};
