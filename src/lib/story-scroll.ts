/** A reading hold driven by scroll distance, with no timed input lock. */
export function storyHoldDistance(viewportHeight: number, sectionId?: string): number {
  if (["research", "results", "infrastructure", "console"].includes(sectionId ?? "")) {
    return Math.round(Math.min(1000, Math.max(560, viewportHeight)));
  }
  return Math.round(Math.min(680, Math.max(360, viewportHeight * .65)));
}
