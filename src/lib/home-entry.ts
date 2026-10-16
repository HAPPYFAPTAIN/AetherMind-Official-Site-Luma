// Explicit "home" navigation is a fresh visit; history restoration keeps its position.
let entry = 0;
const listeners = new Set<() => void>();
export const getHomeEntry = () => entry;
export const getServerHomeEntry = () => 0;
export function subscribeHomeEntry(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
export function beginHomeEntry() {
  entry++;
  listeners.forEach(listener => listener());
}
