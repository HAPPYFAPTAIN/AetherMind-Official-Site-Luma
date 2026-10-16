"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export type ThemePreference = "system" | "light" | "dark";
const KEY = "aethermind-theme";
const EVENT = "aethermind-theme-change";
let memoryPreference: ThemePreference = "system";
const ThemeContext = createContext<{ preference: ThemePreference; choose: (value: ThemePreference) => void }>({ preference: "system", choose: () => {} });
function snapshot(): ThemePreference {
  try { const value = localStorage.getItem(KEY); return value === "light" || value === "dark" ? value : "system"; } catch { return memoryPreference; }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback); window.addEventListener(EVENT, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(EVENT, callback); };
}
let timer: ReturnType<typeof setTimeout>;
function apply(preference: ThemePreference, home: boolean, animate = false) {
  const root = document.documentElement;
  if (animate) { root.classList.add("theme-transition"); clearTimeout(timer); timer = setTimeout(() => root.classList.remove("theme-transition"), 380); }
  root.dataset.theme = home ? "dark" : preference === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : preference;
  root.dataset.themePreference = preference;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", root.dataset.theme === "light" ? "#f3f3ef" : "#05070a");
}
export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const home = pathname === "/" || pathname === "/official" || pathname === "/official/";
  const preference = useSyncExternalStore(subscribe, snapshot, () => "system" as const);
  useEffect(() => {
    apply(preference, home);
    const media = matchMedia("(prefers-color-scheme: dark)");
    const changed = () => { if (preference === "system") apply(preference, home, true); };
    media.addEventListener("change", changed);
    return () => media.removeEventListener("change", changed);
  }, [preference, home]);
  function choose(value: ThemePreference) {
    memoryPreference = value;
    try { localStorage.setItem(KEY, value); } catch { /* Theme still applies if storage is unavailable. */ }
    apply(value, home, true); window.dispatchEvent(new Event(EVENT));
  }
  return <ThemeContext.Provider value={{ preference, choose }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => useContext(ThemeContext);

// Before first paint: prevents a dark flash on a light page or persisted preference.
export const themeBootScript = `(function(){try{var p=localStorage.getItem('${KEY}');if(p!=='light'&&p!=='dark')p='system';var h=/^(\\/official)?\\/?$/.test(location.pathname);document.documentElement.dataset.theme=h?'dark':p==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;document.documentElement.dataset.themePreference=p;}catch(e){document.documentElement.dataset.theme=/^(\\/official)?\\/?$/.test(location.pathname)?'dark':(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}})();`;
