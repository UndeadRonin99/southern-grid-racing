import { cp, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "dist");
await mkdir(output, { recursive: true });
for (const file of ["index.html", "404.html", "styles.css", "script.js"]) {
  await cp(path.join(root, file), path.join(output, file));
}
await cp(path.join(root, "assets"), path.join(output, "assets"), {
  recursive: true,
});
await writeFile(path.join(output, ".nojekyll"), "");
console.log("Built static website in dist/");
