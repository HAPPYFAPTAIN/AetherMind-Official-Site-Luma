import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const files = [];
async function collect(relative) {
  for (const entry of await readdir(resolve(root, relative), {withFileTypes: true})) {
    if (entry.name === ".DS_Store" || entry.name.startsWith("._")) continue;
    const path = `${relative}/${entry.name}`;
    if (entry.isDirectory()) await collect(path);
    else if (entry.isFile()) files.push(path);
    else throw new Error(`Unexpected non-regular release entry: ${path}`);
  }
}
for (const directory of ["src", "public", "assets", "scripts", "tests", "docs", "deploy", "out"]) await collect(directory);
files.push("package.json", "bun.lock", "next.config.ts", "tsconfig.json", "next-env.d.ts", "postcss.config.mjs", "eslint.config.mjs", "README.md", ".gitignore");
const lines = [];
for (const file of files.sort()) {
  lines.push(`${createHash("sha256").update(await readFile(resolve(root, file))).digest("hex")}  ${file}`);
}
await writeFile(resolve(root, "release.sha256"), lines.join("\n") + "\n");
console.log(`Release manifest: ${files.length} source and runtime files`);
