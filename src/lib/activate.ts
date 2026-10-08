import {
  fetchDashboard,
  redeemActivationCode,
  type DashboardData,
} from "./account-client";

export { redeemActivationCode };

// Redeem an ACT- activation code, then re-read the dashboard so callers can
// verify what the code granted (credits and/or product entitlement).
export async function redeemAndReload({
  code,
  days = 7,
  product = "all",
  targetUserId,
}: {
  code: string;
  days?: number;
  product?: string;
  targetUserId?: string;
}): Promise<DashboardData> {
  await redeemActivationCode(code, targetUserId);
  return fetchDashboard(days, product);
}

export function hasActiveEntitlement(data: DashboardData, productId: string) {
  return data.entitlements.some(
    (item) => item.product_id === productId && item.active,
  );
}
