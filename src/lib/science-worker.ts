import { createScienceRenderer, type ScienceSceneMode } from "./science-renderer";
import type { MolecularQuality } from "./molecular-quality";
import type { DragRotation } from "./molecular-drag";

type Size = { width: number; height: number; pixelRatio: number };
type RenderInput = { progress: number; x: number; y: number; strength: number; time?: number; rotation?: DragRotation };

export type ScienceWorkerRequest =
  | ({ type: "init"; canvas: OffscreenCanvas; mode: ScienceSceneMode } & Size)
  | ({ type: "render" } & RenderInput)
  | ({ type: "resize" } & Size)
  | { type: "quality"; quality: MolecularQuality }
  | { type: "dispose" };

export type ScienceWorkerResponse =
  | { type: "ready" }
  | { type: "rendered"; phase: string; stats?: {quality: MolecularQuality; triangles: number; drawCalls: number; width: number; height: number; rotation: DragRotation} }
  | { type: "lost" }
  | { type: "error"; message: string };

// Keep this entry type-safe under the site's DOM tsconfig without combining
// the conflicting DOM and WebWorker ambient libraries throughout the app.
const scope = self as unknown as {
  onmessage: ((event: MessageEvent<ScienceWorkerRequest>) => void) | null;
  postMessage: (message: ScienceWorkerResponse) => void;
};

let canvas: OffscreenCanvas | undefined;
let mode: ScienceSceneMode = "hero";
let view: Awaited<ReturnType<typeof createScienceRenderer>> | undefined;
let size: Size = { width: 1, height: 1, pixelRatio: 1 };
let latest: RenderInput = { progress: 0, x: 0, y: 0, strength: 0 };
let disposed = false;
let contextLost = false;
let initializing = false;
let generation = 0;
let quality: MolecularQuality = "medium";
let drawTask: ReturnType<typeof setTimeout> | undefined;
let restoreTask: ReturnType<typeof setTimeout> | undefined;

function cancelDraw() {
  if (drawTask !== undefined) clearTimeout(drawTask);
  drawTask = undefined;
}

function reportError(error: unknown) {
  if (disposed || contextLost) return;
  scope.postMessage({
    type: "error",
    message: error instanceof Error ? error.message : String(error),
  });
}

function renderLatest() {
  if (!view || disposed || contextLost) return;
  const phase = view.render(latest.progress, latest.x, latest.y, latest.strength, latest.time || 0, latest.rotation);
  if (typeof phase === "string") scope.postMessage({ type: "rendered", phase, stats: "getStats" in view ? view.getStats() : undefined });
}

function scheduleDraw() {
  if (drawTask !== undefined || !view || disposed || contextLost) return;
  // A single requested task coalesces queued pointer/scroll updates; there is
  // no idle render loop in this worker, even when its canvas remains visible.
  drawTask = setTimeout(() => {
    drawTask = undefined;
    try {
      renderLatest();
    } catch (error) {
      reportError(error);
    }
  }, 0);
}

async function initialize() {
  if (!canvas || disposed || contextLost || initializing || view) return;
  const token = ++generation;
  initializing = true;
  try {
    const created = await createScienceRenderer(canvas, mode);
    if (disposed || contextLost || token !== generation) {
      created.dispose(false);
      return;
    }
    view = created;
    if ("setQuality" in view) view.setQuality(quality);
    // Size and input may have changed while shaders compiled. Only the most
    // recent state is painted, including deep links and reversed scroll.
    view.resize(size.width, size.height, size.pixelRatio);
    renderLatest();
    scope.postMessage({ type: "ready" });
  } catch (error) {
    if (token === generation) {
      view?.dispose(false);
      view = undefined;
      reportError(error);
    }
  } finally {
    if (token === generation) initializing = false;
  }
}

function onContextLost(event: Event) {
  event.preventDefault();
  if (disposed || contextLost) return;
  contextLost = true;
  generation++;
  initializing = false;
  cancelDraw();
  scope.postMessage({ type: "lost" });
}

function onContextRestored() {
  if (disposed || !contextLost) return;
  contextLost = false;
  if (restoreTask !== undefined) clearTimeout(restoreTask);
  // Three also receives this event. Rebuild only after its native restoration
  // listener finishes, without force-losing the newly restored context.
  restoreTask = setTimeout(() => {
    restoreTask = undefined;
    if (disposed || contextLost) return;
    view?.dispose(false);
    view = undefined;
    void initialize();
  }, 0);
}

function attachContextEvents(target: OffscreenCanvas) {
  target.addEventListener("webglcontextlost", onContextLost);
  target.addEventListener("webglcontextrestored", onContextRestored);
  target.addEventListener("contextlost", onContextLost);
  target.addEventListener("contextrestored", onContextRestored);
}

function dispose() {
  disposed = true;
  generation++;
  cancelDraw();
  if (restoreTask !== undefined) clearTimeout(restoreTask);
  if (canvas) {
    canvas.removeEventListener("webglcontextlost", onContextLost);
    canvas.removeEventListener("webglcontextrestored", onContextRestored);
    canvas.removeEventListener("contextlost", onContextLost);
    canvas.removeEventListener("contextrestored", onContextRestored);
  }
  view?.dispose();
  view = undefined;
}

scope.onmessage = ({ data }) => {
  if (disposed) return;
  try {
    switch (data.type) {
      case "init":
        if (canvas) throw new Error("A scientific scene worker accepts one canvas");
        canvas = data.canvas;
        mode = data.mode;
        size = { width: data.width, height: data.height, pixelRatio: data.pixelRatio };
        attachContextEvents(canvas);
        void initialize();
        break;
      case "render":
        latest = { progress: data.progress, x: data.x, y: data.y, strength: data.strength, time: data.time, rotation: data.rotation };
        scheduleDraw();
        break;
      case "resize":
        size = { width: data.width, height: data.height, pixelRatio: data.pixelRatio };
        if (view && !contextLost) view.resize(size.width, size.height, size.pixelRatio);
        scheduleDraw();
        break;
      case "quality":
        quality = data.quality;
        if (view && !contextLost && "setQuality" in view) view.setQuality(quality);
        scheduleDraw();
        break;
      case "dispose":
        dispose();
        break;
    }
  } catch (error) {
    reportError(error);
  }
};
