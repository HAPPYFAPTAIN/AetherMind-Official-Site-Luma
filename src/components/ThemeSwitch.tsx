"use client";
import { useRef, type CSSProperties, type KeyboardEvent } from "react";
import { useTheme, type ThemePreference } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";

const modes: ThemePreference[] = ["system", "light", "dark"];

function ThemeIcon({ mode }: { mode: ThemePreference }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {mode === "system" ? <><rect x="3" y="4" width="18" height="13" rx="2.5" /><path d="M8 21h8m-4-4v4" /></> : mode === "light" ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" /></> : <path d="M20.6 13.1A8.7 8.7 0 0 1 10.9 3.4a8.7 8.7 0 1 0 9.7 9.7Z" />}
  </svg>;
}

export function ThemeSwitch() {
  const { preference, choose } = useTheme();
  const { language } = useLanguage();
  const zh = language === "zh";
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = modes.indexOf(preference);
  const next = modes[(selected + 1) % modes.length];
  const label = (mode: ThemePreference) => ({ system: zh ? "跟随系统" : "System", light: zh ? "亮色" : "Light", dark: zh ? "深色" : "Dark" })[mode];
  const cycleLabel = zh ? `外观：${label(preference)}；切换为${label(next)}` : `Appearance: ${label(preference)}; switch to ${label(next)}`;
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let target = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") target = (index + 1) % modes.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") target = (index + modes.length - 1) % modes.length;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = modes.length - 1;
    else return;
    event.preventDefault();
    choose(modes[target]);
    buttons.current[target]?.focus();
  }
  return <div className="theme-switch" style={{ "--theme-position": selected } as CSSProperties}>
    <div className="theme-options" role="radiogroup" aria-label={zh ? "外观主题" : "Appearance theme"}>
      <span className="theme-switch-indicator" aria-hidden="true" />
      {modes.map((mode, index) => <button key={mode} ref={element => { buttons.current[index] = element; }} type="button" className="theme-option" role="radio" aria-checked={preference === mode} aria-label={label(mode)} title={label(mode)} tabIndex={preference === mode ? 0 : -1} onClick={() => choose(mode)} onKeyDown={event => navigate(event, index)}><ThemeIcon mode={mode} /></button>)}
    </div>
    <button type="button" className="theme-cycle" aria-label={cycleLabel} title={cycleLabel} onClick={() => choose(next)}><span key={preference}><ThemeIcon mode={preference} /></span></button>
  </div>;
}
