import { test } from "node:test";
import { strictEqual, ok } from "node:assert";
import { HERO_CHAPTERS, sampleHeroScroll } from "../src/lib/hero-scroll";

test("all five equal page stops show exactly the corresponding model and text", () => {
  HERO_CHAPTERS.forEach((chapter, index) => {
    const state = sampleHeroScroll(chapter.at);
    strictEqual(state.active, index);
    strictEqual(state.position, index);
    ok(Math.abs(state.phase - chapter.phase) < 1e-10);
  });
});

test("small scroll travel around a chapter holds its presentation in both directions", () => {
  HERO_CHAPTERS.forEach((chapter, index) => {
    for (const offset of [-.04, 0, .04]) {
      const state = sampleHeroScroll(chapter.at + offset);
      strictEqual(state.position, index);
      ok(Math.abs(state.phase - chapter.phase) < 1e-10);
    }
  });
});

test("transitions are continuous and monotonic, with no blank text interval", () => {
  let previous = sampleHeroScroll(0);
  for (let i = 1; i <= 1000; i++) {
    const state = sampleHeroScroll(i / 1000);
    ok(state.phase >= previous.phase && state.position >= previous.position);
    ok(state.phase - previous.phase < .01);
    const opacity = HERO_CHAPTERS.reduce((sum, _, index) => sum + Math.max(0, 1 - Math.abs(index - state.position)), 0);
    ok(Math.abs(opacity - 1) < 1e-10);
    previous = state;
  }
});
