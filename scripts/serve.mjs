import http from "node:http";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.PORT || 4173);
const prefix = "/southern-grid-racing";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
};
const server = http.createServer(async (request, response) => {
  try {
    let name = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    if (name === prefix) {
      response.writeHead(301, { Location: `${prefix}/` });
      response.end();
      return;
    }
    if (name.startsWith(`${prefix}/`)) name = name.slice(prefix.length);
    const target = path.resolve(
      root,
      `.${name.endsWith("/") ? name + "index.html" : name}`,
    );
    if (
      !target.startsWith(root) ||
      name.includes("..") ||
      name.includes("/.git")
    )
      throw new Error("Invalid path");
    const details = await stat(target);
    if (!details.isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "Content-Type": types[path.extname(target)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(await readFile(target));
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Page not found");
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Local: http://127.0.0.1:${port}/southern-grid-racing/`),
);
