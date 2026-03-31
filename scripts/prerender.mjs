/**
 * Applyza Static Pre-render Script (Phase 0 SEO Bridge)
 * ======================================================
 * Converts the Vite SPA build into a collection of pre-rendered HTML files —
 * one per public route. Googlebot and other crawlers receive full HTML with
 * correct <title>, meta description, OG tags, and JSON-LD schema instead of
 * a blank page waiting for JavaScript.
 *
 * HOW IT WORKS
 * 1. Run `npm run build` to produce the standard Vite SPA in /dist
 * 2. This script starts `vite preview` on a random port
 * 3. Playwright visits every public route
 * 4. Waits for react-helmet-async to inject all <head> tags
 * 5. Captures `document.documentElement.outerHTML`
 * 6. Writes dist/{path}/index.html (or dist/index.html for "/")
 * 7. Done — deploy /dist as usual; each route now has its own HTML file
 *
 * USAGE
 *   node --experimental-vm-modules scripts/prerender.mjs
 *   # or via npm: npm run build:seo
 *
 * REQUIREMENTS
 *   - @playwright/test installed (already in devDependencies)
 *   - VITE_SUPABASE_URL + VITE_SUPABASE_PUBLISHABLE_KEY in .env (for dynamic routes)
 */

import { chromium } from "playwright";
import { execSync, spawn } from "child_process";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "net";
import { config as dotenvConfig } from "dotenv";

// Load .env so Supabase keys are available
dotenvConfig();

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getFreePort() {
  return new Promise((resolve) => {
    const server = createServer();
    server.listen(0, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForHelmet(page, timeout = 12000) {
  /**
   * react-helmet-async updates <head> synchronously with the React render.
   * We wait until:
   *   a) document.title is no longer the Vite default ("Vite + React + TS")
   *   b) the meta[name="description"] has a non-empty content attribute
   * If neither condition is met within `timeout` ms we proceed anyway — better
   * to pre-render with partial tags than to skip the page.
   */
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const ready = await page.evaluate(() => {
      const desc = document.querySelector('meta[name="description"]');
      const hasDesc = desc && desc.getAttribute("content") && desc.getAttribute("content").length > 0;
      const hasTitle = document.title && document.title !== "Vite + React + TS" && document.title !== "";
      return hasDesc || hasTitle;
    });
    if (ready) return;
    await sleep(200);
  }
  console.warn(`  ⚠  Helmet did not update within ${timeout}ms — proceeding with partial head`);
}

function injectNoScriptFallback(html, route) {
  /**
   * Adds a <noscript> tag so that JS-disabled crawlers still see a meaningful
   * message. Also adds a canonical link if not already present.
   */
  const canonical = `https://applyza.com${route === "/" ? "" : route}`;
  const canonicalTag = `<link rel="canonical" href="${canonical}" />`;

  // Inject canonical if missing
  if (!html.includes('rel="canonical"')) {
    html = html.replace("</head>", `  ${canonicalTag}\n</head>`);
  }

  // Inject noscript fallback
  if (!html.includes("<noscript>")) {
    html = html.replace(
      "<body>",
      `<body><noscript>Please enable JavaScript to use Applyza — the free, AQF-certified study abroad consultancy.</noscript>`
    );
  }

  return html;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🚀  Applyza Pre-render Script — Phase 0 SEO Bridge\n");

  // 1. Verify dist exists
  if (!existsSync(DIST)) {
    console.log("📦  dist/ not found — running npm run build first...");
    execSync("npm run build", { cwd: ROOT, stdio: "inherit" });
  } else {
    console.log("📦  Found existing dist/ — using it. (Run `npm run build` first for a fresh build.)");
  }

  // 2. Collect routes
  const { STATIC_ROUTES, DATA_HEAVY_ROUTES } = await import("./static-routes.mjs");

  let dynamicRoutes = [];
  try {
    const { fetchDynamicRoutes } = await import("./fetch-dynamic-routes.mjs");
    dynamicRoutes = await fetchDynamicRoutes();
  } catch (e) {
    console.warn("[prerender] Could not import fetch-dynamic-routes:", e.message);
  }

  const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes];
  console.log(`\n📋  Pre-rendering ${allRoutes.length} routes (${STATIC_ROUTES.length} static + ${dynamicRoutes.length} dynamic)\n`);

  // 3. Start vite preview
  const port = await getFreePort();
  console.log(`🌐  Starting vite preview on port ${port}...`);

  const preview = spawn("npx", ["vite", "preview", "--port", String(port), "--strictPort"], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, FORCE_COLOR: "0" },
  });

  // Wait for preview server to be ready
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Preview server timed out")), 15000);
    preview.stdout.on("data", (d) => {
      if (d.toString().includes("localhost")) {
        clearTimeout(timeout);
        resolve();
      }
    });
    preview.stderr.on("data", (d) => {
      if (d.toString().includes("localhost")) {
        clearTimeout(timeout);
        resolve();
      }
    });
  });

  await sleep(500); // Small buffer
  console.log(`✅  Preview server ready at http://localhost:${port}\n`);

  // 4. Launch Playwright
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      // Keep WebGL enabled so Three.js doesn't throw
      "--use-gl=swiftshader",
    ],
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    // Inject a flag so app code can detect pre-render mode
    extraHTTPHeaders: { "X-Prerender": "1" },
  });

  // Inject __PRERENDER__ global before each page loads
  await context.addInitScript(() => {
    window.__PRERENDER__ = true;
  });

  let successCount = 0;
  let errorCount = 0;

  // 5. Visit and capture each route
  for (const route of allRoutes) {
    const url = `http://localhost:${port}${route}`;
    const page = await context.newPage();

    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

      const isDataHeavy = DATA_HEAVY_ROUTES.has(route) || route.startsWith("/blog/") || route.startsWith("/find-a-course/") || route.startsWith("/study-destinations/");
      if (isDataHeavy) {
        await sleep(3000); // Extra time for Supabase data
      } else {
        await waitForHelmet(page);
      }

      let html = await page.evaluate(() => document.documentElement.outerHTML);
      html = "<!DOCTYPE html>\n" + html;
      html = injectNoScriptFallback(html, route);

      // Write file
      if (route === "/") {
        writeFileSync(join(DIST, "index.html"), html, "utf-8");
      } else {
        const dir = join(DIST, ...route.split("/").filter(Boolean));
        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, "index.html"), html, "utf-8");
      }

      const title = await page.title();
      console.log(`  ✅  ${route.padEnd(52)} "${title}"`);
      successCount++;
    } catch (err) {
      console.error(`  ❌  ${route} — ${err.message}`);
      errorCount++;
    } finally {
      await page.close();
    }
  }

  // 6. Cleanup
  await browser.close();
  preview.kill();

  console.log(`\n────────────────────────────────────────────────────`);
  console.log(`Pre-render complete: ${successCount} succeeded, ${errorCount} failed`);
  console.log(`Pre-rendered HTML files written to: ${DIST}`);
  console.log(`\nDeploy the /dist folder as usual — each route now has`);
  console.log(`its own index.html with full <head> meta tags for SEO.\n`);

  if (errorCount > 0) process.exit(1);
}

main().catch((err) => {
  console.error("\n💥  Pre-render script crashed:", err);
  process.exit(1);
});
