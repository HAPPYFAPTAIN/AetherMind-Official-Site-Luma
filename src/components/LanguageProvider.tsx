"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { LANGUAGE_STORAGE_KEY, type Language } from "@/lib/i18n";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LANGUAGE_CHANGE_EVENT = "angsheng-language-change";
let fallbackLanguage: Language | null = null;

function detectLanguage(): Language {
  if (typeof navigator === "undefined") return "en";
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function getLanguageSnapshot(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "zh" || stored === "en") return stored;
  } catch {
    // Storage can be unavailable in hardened browsing contexts.
  }
  return fallbackLanguage ?? detectLanguage();
}

function subscribeToLanguage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore<Language>(
    subscribeToLanguage,
    getLanguageSnapshot,
    () => "en",
  );

  const setLanguage = useCallback((nextLanguage: Language) => {
    fallbackLanguage = nextLanguage;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // The in-memory DOM state still updates through the custom event.
    }
    document.documentElement.dataset.language = nextLanguage;
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    const updateMetadata = () => {
      document.title =
        language === "zh" ? "ANGSHENG — 科学智能计算平台" : "ANGSHENG — AI for Science";

      const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (description) {
        description.content =
          language === "zh"
            ? "面向分子动力学、材料研究、LAMMPS 工作流与科学发现的 AI 原生科学计算平台。"
            : "AI-native scientific computing for molecular dynamics, materials research, LAMMPS workflows and AI for Science.";
      }
    };

    updateMetadata();
    const timeout = window.setTimeout(updateMetadata, 100);

    return () => window.clearTimeout(timeout);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "en" ? "zh" : "en"),
    }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
