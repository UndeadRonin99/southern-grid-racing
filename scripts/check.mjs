import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const html = await readFile(path.join(root, "index.html"), "utf8");
const css = await readFile(path.join(root, "styles.css"), "utf8");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(ids.length, new Set(ids).size, "HTML IDs must be unique");
assert.equal(
  (html.match(/<h1\b/g) || []).length,
  1,
  "Page needs one primary heading",
);
const localAssets = new Set(
  [
    ...html.matchAll(
      /(?:src|href)="(assets\/[^"\s]+|styles\.css|script\.js)"/g,
    ),
  ].map((match) => match[1]),
);
for (const match of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g))
  localAssets.add(match[1]);
for (const match of html.matchAll(/(?:assets\/images\/[^\s",]+\.jpg)/g))
  localAssets.add(match[0]);
for (const file of localAssets) await access(path.join(root, file));
for (const match of html.matchAll(/href="#([^"]*)"/g)) {
  assert.ok(
    !match[1] || ids.includes(match[1]),
    `Broken section link: #${match[1]}`,
  );
}
for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
  assert.ok(match[0].includes("noopener"), "External tabs must use noopener");
}
assert.ok(
  !html.includes('href="/assets'),
  "Assets must support the GitHub project subpath",
);
console.log(
  `Checked ${localAssets.size} local assets, ${ids.length} section IDs, external-tab safety and project-relative paths.`,
);
