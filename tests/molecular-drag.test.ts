import { test } from "node:test";
import { ok } from "node:assert";
import { dragRadiansPerPixel, rotateFromDrag, type DragRotation } from "../src/lib/molecular-drag";

const identity: DragRotation = [0, 0, 0, 1];
const angle = (a: DragRotation, b: DragRotation) => 2 * Math.acos(Math.min(1, Math.abs(a.reduce((sum, v, i) => sum + v * b[i], 0))));
const near = (a: number, b: number) => ok(Math.abs(a - b) < 1e-6, `${a} != ${b}`);

test("equal screen travel has equal rotation on horizontal, vertical and diagonal axes", () => {
  const scale = dragRadiansPerPixel(1440, 900);
  for (const start of [identity, rotateFromDrag(identity, 450, 300, scale)]) {
    for (const [dx, dy] of [[100, 0], [0, 100], [60, 80]]) {
      near(angle(start, rotateFromDrag(start, dx, dy, scale)), 100 * scale);
    }
  }
});

test("event rate does not change the final angle and reversing travel returns exactly", () => {
  const scale = dragRadiansPerPixel(1440, 900);
  let many = identity;
  for (let i = 0; i < 40; i++) many = rotateFromDrag(many, 5, 0, scale);
  near(angle(many, rotateFromDrag(identity, 200, 0, scale)), 0);
  near(angle(identity, rotateFromDrag(many, -200, 0, scale)), 0);
});

test("multiple complete turns have no edge clamp and retain normalized orientation", () => {
  const scale = dragRadiansPerPixel(1440, 900);
  let result = identity;
  for (let i = 0; i < 10000; i++) result = rotateFromDrag(result, 1.8, 0, scale);
  near(angle(identity, result), 0);
  near(Math.hypot(...result), 1);
});

test("aspect swaps preserve sensitivity and short or very large windows stay usable", () => {
  near(dragRadiansPerPixel(1440, 900), dragRadiansPerPixel(900, 1440));
  ok(dragRadiansPerPixel(390, 844) <= Math.PI / 600);
  ok(dragRadiansPerPixel(3840, 2160) >= Math.PI / 1000);
});
