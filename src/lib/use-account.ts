"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  fetchAccount,
  hasAccountSession,
  type AccountProfile,
} from "./account-client";

type AccountSnapshot = { account: AccountProfile | null; loading: boolean };

let snapshot: AccountSnapshot = { account: null, loading: false };
let inflight: Promise<void> | null = null;
const listeners = new Set<() => void>();

function setSnapshot(next: AccountSnapshot) {
  snapshot = next;
  for (const listener of listeners) listener();
}

function refresh() {
  if (typeof window === "undefined") return Promise.resolve();
  if (!hasAccountSession()) {
    if (snapshot.account || snapshot.loading)
      setSnapshot({ account: null, loading: false });
    return Promise.resolve();
  }
  inflight ??= fetchAccount()
    .then((account) => setSnapshot({ account, loading: false }))
    .catch(() => setSnapshot({ account: null, loading: false }))
    .finally(() => {
      inflight = null;
    });
  if (!snapshot.loading) setSnapshot({ ...snapshot, loading: true });
  return inflight;
}

if (typeof window !== "undefined")
  window.addEventListener("account-session-changed", () => {
    inflight = null;
    void refresh();
  });

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const SERVER_SNAPSHOT: AccountSnapshot = { account: null, loading: false };

// /me is fetched once per session and shared by every consumer; the shared
// copy refreshes whenever the session changes (login, logout, token refresh
// failure) or when a caller asks for a refresh.
export function useAccount() {
  const state = useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => SERVER_SNAPSHOT,
  );
  useEffect(() => {
    void refresh();
  }, []);
  return { ...state, refresh };
}
