export type MolecularQuality = "medium" | "low";

export const MOLECULAR_QUALITY = {
  medium: {sphereWidth: 12, sphereHeight: 8, bondSides: 6, shells: 2, segments: 120, sides: 24, fibers: 24, fiberSteps: 90, dust: 600, maxDpr: 1.5, maxPixels: 2_073_600},
  low: {sphereWidth: 8, sphereHeight: 6, bondSides: 4, shells: 1, segments: 80, sides: 16, fibers: 12, fiberSteps: 60, dust: 240, maxDpr: 1, maxPixels: 1_048_576},
} as const;

export function molecularPixelRatio(width: number, height: number, dpr: number, maxSide: number, quality: MolecularQuality) {
  const profile = MOLECULAR_QUALITY[quality];
  return Math.min(Math.max(.5, dpr), profile.maxDpr, Math.sqrt(profile.maxPixels / (width * height)), maxSide / width, maxSide / height);
}

/** Completed-frame cadence, not CPU submission time. Ignore pauses and the
 * intentional switch between idle and interactive frame rates. Two slow
 * windows are required; quality stays lowered until the scene is remounted. */
export function createMolecularQualityMonitor() {
  let previous = 0, started = 0, frames = 0, slow = 0, slowWindows = 0;
  let wasActive = false, lowered = false;
  function reset() { previous = 0; started = 0; frames = 0; slow = 0; slowWindows = 0; }
  return {
    reset,
    sample(now: number, active: boolean): boolean {
      if (lowered) return false;
      if (!previous || active !== wasActive || now - previous > 1000) {
        reset(); previous = started = now; wasActive = active; return false;
      }
      const interval = now - previous;
      previous = now;
      frames++;
      if (interval > (active ? 50 : 100)) slow++;
      if (now - started < 1500 || frames < 6) return false;
      slowWindows = slow / frames > .3 ? slowWindows + 1 : 0;
      started = now; frames = slow = 0;
      if (slowWindows < 2) return false;
      lowered = true;
      return true;
    },
  };
}
