import {test} from "node:test";
import {deepStrictEqual, ok} from "node:assert";
import {storyHoldDistance} from "../src/lib/story-scroll";

test("reading holds scale with the viewport and remain bounded on small and large screens", () => {
  deepStrictEqual([600, 844, 900, 1440].map(height => storyHoldDistance(height)), [390, 549, 585, 680]);
  for (const height of [320, 600, 844, 900, 1440, 2160]) {
    const distance = storyHoldDistance(height);
    ok(distance >= 360 && distance <= 680);
  }
});

test("only the final four sections receive the longer reading hold", () => {
  for (const id of ["research", "results", "infrastructure", "console"]) {
    deepStrictEqual([320, 844, 900, 1440].map(height => storyHoldDistance(height, id)), [560, 844, 900, 1000]);
  }
  for (const id of ["platform", "engine", "simulation", "ai-science", "workflow"]) {
    deepStrictEqual(storyHoldDistance(900, id), 585);
  }
});
