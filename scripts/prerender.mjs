/**
 * Post-build pre-rendering.
 *   1. Builds client/src/entry-server.tsx for Node (Vite SSR build).
 *   2. Renders each public route to HTML with its own title, description,
 *      canonical, and social tags, written to dist/public/<route>/index.html.
 *   3. Keeps an un-rendered shell at dist/public/spa.html for client-only
 *      routes (admin, 404) and regenerates sitemap.xml from the route list.
 * Run after `vite build`.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "dist/public");
const serverDir = path.join(root, "dist/prerender");

await build({
  configFile: path.join(root, "vite.config.ts"),
  logLevel: "warn",
  build: {
    ssr: path.join(root, "client/src/entry-server.tsx"),
    outDir: serverDir,
    emptyOutDir: true,
    rollupOptions: { output: { format: "esm" } },
  },
});

const { render, ROUTES, SITE_ORIGIN } = await import(pathToFileURL(path.join(serverDir, "entry-server.js")).href);

const template = fs.readFileSync(path.join(publicDir, "index.html"), "utf8");
fs.writeFileSync(path.join(publicDir, "spa.html"), template);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function withMeta(html, { title, description, url }) {
  const t = esc(title);
  const d = esc(description);
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta name="title" content=")[^"]*"/, `$1${t}"`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${d}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${t}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${d}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
    .replace(/(<meta property="twitter:title" content=")[^"]*"/, `$1${t}"`)
    .replace(/(<meta property="twitter:description" content=")[^"]*"/, `$1${d}"`)
    .replace(/(<meta property="twitter:url" content=")[^"]*"/, `$1${url}"`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = [];

for (const route of ROUTES.filter((r) => r.prerender)) {
  const url = `${SITE_ORIGIN}${route.path === "/" ? "/" : route.path}`;
  const body = await render(route.path);
  if (!body || body.length < 500) throw new Error(`Pre-render produced no content for ${route.path}`);
  const html = withMeta(template, { ...route, url }).replace(
    '<div id="root"></div>',
    `<div id="root" data-prerendered="true">${body}</div>`,
  );
  const outFile =
    route.path === "/" ? path.join(publicDir, "index.html") : path.join(publicDir, route.path.slice(1), "index.html");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  sitemap.push(
    `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority.toFixed(1)}</priority>\n  </url>`,
  );
  console.log(`prerendered ${route.path.padEnd(12)} ${(html.length / 1024).toFixed(0)} KB`);
}

fs.writeFileSync(
  path.join(publicDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap.join("\n")}\n</urlset>\n`,
);
fs.rmSync(serverDir, { recursive: true, force: true });
console.log(`sitemap.xml: ${sitemap.length} urls`);
