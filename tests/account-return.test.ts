import { test } from "node:test";
import { strictEqual } from "node:assert";
import { communityReturnPath } from "../src/lib/community-login";
import { assetUrl } from "../src/lib/asset-url";

test("default login enters the workspace and returnTo stays within allowed pages", () => {
  strictEqual(communityReturnPath(null), assetUrl("/dashboard/"));
  strictEqual(
    communityReturnPath("https://example.org"),
    assetUrl("/dashboard/"),
  );
  strictEqual(communityReturnPath("//example.org"), assetUrl("/dashboard/"));
  strictEqual(communityReturnPath("/\\example.org"), assetUrl("/dashboard/"));
  strictEqual(
    communityReturnPath(assetUrl("/products/")),
    assetUrl("/products/"),
  );
  strictEqual(
    communityReturnPath(
      assetUrl("/community/") + "?topic=topic_1&compose=1&secret=x",
    ),
    assetUrl("/community/") + "?topic=topic_1&compose=1",
  );
});
