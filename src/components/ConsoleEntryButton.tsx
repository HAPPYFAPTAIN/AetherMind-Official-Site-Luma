"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { LoginPage } from "./LoginPage";
import { hasAccountSession } from "@/lib/account-client";
import { assetUrl } from "@/lib/asset-url";

export function ConsoleEntryButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [loginOpen, setLoginOpen] = useState(false);
  const enter = () => {
    if (hasAccountSession()) window.location.assign(assetUrl("/dashboard/"));
    else setLoginOpen(true);
  };
  return (
    <>
      <button type="button" className={className} onClick={enter}>
        {children}
      </button>
      {loginOpen && (
        <LoginPage
          overlay
          returnTo={assetUrl("/dashboard/")}
          onClose={() => setLoginOpen(false)}
        />
      )}
    </>
  );
}
