export type Language = "en" | "zh";

export type Bilingual = {
  en: string;
  zh: string;
};

export const LANGUAGE_STORAGE_KEY = "angsheng-language";

export function tr(language: Language, en: string, zh: string) {
  return language === "zh" ? zh : en;
}
