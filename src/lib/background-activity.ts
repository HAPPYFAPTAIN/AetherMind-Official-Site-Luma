/** Decorative rendering yields to dialogs and other foreground tasks. */
export const BACKGROUND_ACTIVITY_EVENT = "aethermind:background-activity";

const holds = new Set<symbol>();

export function isBackgroundSuspended() {
  return holds.size > 0;
}

export function suspendBackgroundActivity() {
  const hold = Symbol();
  const wasSuspended = isBackgroundSuspended();
  holds.add(hold);
  if (!wasSuspended) window.dispatchEvent(new Event(BACKGROUND_ACTIVITY_EVENT));
  return () => {
    if (holds.delete(hold) && !isBackgroundSuspended()) {
      window.dispatchEvent(new Event(BACKGROUND_ACTIVITY_EVENT));
    }
  };
}
