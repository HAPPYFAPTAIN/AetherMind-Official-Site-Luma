"use client";

import { useEffect, useRef, useState } from "react";
import {
  accountApi,
  hasAccountSession,
  type AccountProduct,
} from "@/lib/account-client";
import { assetUrl } from "@/lib/asset-url";

export function ProductPurchase({
  productId,
  zh,
}: {
  productId: string;
  zh: boolean;
}) {
  const [product, setProduct] = useState<AccountProduct | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);
  const requestId = useRef("");
  useEffect(() => {
    let active = true;
    accountApi<{ items: AccountProduct[] }>("/products")
      .then((r) => {
        if (active) setProduct(r.items.find((p) => p.id === productId) || null);
      })
      .catch((e) => {
        if (active) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, [productId]);
  async function buy() {
    if (!product || busy) return;
    if (!hasAccountSession()) {
      window.location.assign(
        assetUrl("/login/") +
          "?returnTo=" +
          encodeURIComponent(assetUrl("/products/")),
      );
      return;
    }
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setBusy(true);
    setError("");
    requestId.current ||= crypto.randomUUID();
    try {
      await accountApi("/purchases", {
        method: "POST",
        body: JSON.stringify({
          productId,
          requestId: requestId.current,
          expectedPrice: product.price,
        }),
      });
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }
  if (done)
    return (
      <div className="product-purchase">
        <p role="status">
          {zh
            ? "购买成功，产品权益已到账。"
            : "Purchased. Your product access is ready."}
        </p>
        <a className="product-primary" href={assetUrl("/dashboard/")}>
          {zh ? "前往工作台" : "Go to workspace"} →
        </a>
      </div>
    );
  return (
    <div className="product-purchase">
      {product?.status === "AVAILABLE" ? (
        <>
          <dl>
            <div>
              <dt>{zh ? "积分价格" : "Price in credits"}</dt>
              <dd>{product.price.toLocaleString()}</dd>
            </div>
            <div>
              <dt>{zh ? "套餐权益" : "Included access"}</dt>
              <dd>
                {product.package_units > 0 &&
                  `${product.package_units} ${zh ? "次" : "uses"} `}
                {product.package_days > 0 &&
                  `${product.package_days} ${zh ? "天" : "days"}`}
              </dd>
            </div>
          </dl>
          {confirming && (
            <p>
              {zh
                ? `确认使用 ${product.price} 积分购买？`
                : `Confirm purchase for ${product.price} credits?`}
            </p>
          )}
          <button
            className="product-primary"
            disabled={busy}
            onClick={() => void buy()}
          >
            {busy
              ? zh
                ? "正在购买…"
                : "Purchasing…"
              : confirming
                ? zh
                  ? "确认购买"
                  : "Confirm purchase"
                : zh
                  ? "使用积分购买"
                  : "Buy with credits"}
          </button>
        </>
      ) : (
        <p>
          {product
            ? zh
              ? "该产品尚未开放购买。持有激活码可前往工作台兑换权益。"
              : "Not for sale yet. You can redeem an access code in your workspace."
            : !error
              ? zh
                ? "正在读取产品权益…"
                : "Loading access packages…"
              : ""}
        </p>
      )}
      {error && <p role="alert">{error}</p>}
      <a className="product-account-link" href={assetUrl("/dashboard/")}>
        {zh ? "兑换激活码 / 查看我的产品" : "Redeem a code / My products"} →
      </a>
    </div>
  );
}
