"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { beginHomeEntry } from "@/lib/home-entry";
import { assetUrl } from "@/lib/asset-url";

/** Keep the app shell mounted; warm a destination only when someone approaches it. */
export function SiteLink({ href, onPointerEnter, onFocus, onClick, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const router = useRouter();
  const warm = () => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (document.hidden || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "")) return;
    router.prefetch(href);
  };
  return <Link {...props} href={href} prefetch={false}
    onPointerEnter={event => { warm(); onPointerEnter?.(event); }}
    onFocus={event => { warm(); onFocus?.(event); }}
    onClick={event => {
      onClick?.(event);
      if (href === "/" && window.location.pathname !== assetUrl("/") && !event.defaultPrevented &&
        event.button === 0 && !event.metaKey && !event.ctrlKey && !event.altKey && !event.shiftKey &&
        (!props.target || props.target === "_self")) beginHomeEntry();
    }}
  />;
}
