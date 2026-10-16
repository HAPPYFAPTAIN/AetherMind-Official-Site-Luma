import { test } from "node:test";
import { strictEqual, ok } from "node:assert";
import { createMolecularQualityMonitor, molecularPixelRatio } from "../src/lib/molecular-quality";

test("retina and oversized displays respect both pixel and GPU limits", () => {
  for (const quality of ["medium", "low"] as const) {
    const budget = quality === "medium" ? 2_073_600 : 1_048_576;
    for (const [w, h, dpr] of [[1440, 900, 2], [390, 844, 3], [7680, 4320, 3]]) {
      const ratio = molecularPixelRatio(w, h, dpr, 4096, quality);
      ok(w * h * ratio * ratio <= budget + .01);
      ok(w * ratio <= 4096 && h * ratio <= 4096);
    }
  }
});

test("healthy interactive and intentional idle cadence do not lower quality", () => {
  const monitor = createMolecularQualityMonitor();
  let now = 1;
  for (let i = 0; i < 240; i++) {
    now += i < 120 ? 1000 / 30 : 1000 / 15;
    strictEqual(monitor.sample(now, i < 120), false);
  }
});

test("isolated stalls and resuming a hidden scene do not lower quality", () => {
  const monitor = createMolecularQualityMonitor();
  let now = 1;
  for (let i = 0; i < 180; i++) {
    now += i === 30 ? 250 : i === 90 ? 5000 : 1000 / 30;
    strictEqual(monitor.sample(now, true), false);
  }
  monitor.reset();
  strictEqual(monitor.sample(now + 10000, true), false);
});

test("sustained slow frames lower quality once after two observation windows", () => {
  for (const active of [true, false]) {
    const monitor = createMolecularQualityMonitor();
    let changes = 0, firstChange = 0;
    const interval = active ? 80 : 140;
    for (let now = 1; now < 10000; now += interval) {
      if (monitor.sample(now, active)) { changes++; firstChange ||= now; }
    }
    strictEqual(changes, 1);
    ok(firstChange >= 3000 && firstChange < 4000);
  }
});
