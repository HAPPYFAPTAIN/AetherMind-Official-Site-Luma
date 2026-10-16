export const HERO_PROGRESS_EVENT = "hero-scene-progress";
export const HERO_CHAPTERS = [
  {at: 0, phase: 0, en: "Structure", zh: "整体结构"},
  {at: .25, phase: .32, en: "Fragments", zh: "分子解构"},
  {at: .5, phase: .58, en: "Explode", zh: "爆炸展开"},
  {at: .75, phase: .82, en: "Rebuild", zh: "旋转重组"},
  {at: 1, phase: 1, en: "New form", zh: "新的形态"},
] as const;

/** Hold around each page stop, then ease through the middle of its travel.
 * Text and geometry consume the same result, including reverse scrolling. */
export function sampleHeroScroll(progress: number) {
  const normalized = Number.isFinite(progress) ? Math.max(0, Math.min(1, progress)) : 0;
  const scaled = normalized * (HERO_CHAPTERS.length - 1);
  const segment = Math.min(HERO_CHAPTERS.length - 2, Math.floor(scaled));
  const travel = Math.max(0, Math.min(1, (scaled - segment - .22) / .56));
  const blend = travel * travel * (3 - 2 * travel);
  const position = segment + blend;
  const from = HERO_CHAPTERS[segment].phase;
  const to = HERO_CHAPTERS[segment + 1].phase;
  return {position, phase: from + (to - from) * blend, active: Math.round(position)};
}
