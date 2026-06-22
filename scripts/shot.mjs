import { chromium } from "playwright";

const routes = process.argv.slice(2).length
  ? process.argv.slice(2).map((p) => [p.replace(/\W+/g, "_") || "home", p])
  : [
      ["home", "/"],
      ["products", "/products"],
      ["product", "/products/raw-milk"],
      ["subscription", "/subscription"],
      ["farms", "/farms"],
      ["bulk", "/bulk-supply"],
      ["about", "/about"],
      ["blog", "/blog"],
      ["contact", "/contact"],
    ];

const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const [name, path] of routes) {
  await page.goto("http://localhost:3000" + path, {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: `/tmp/shot-${name}.png` });
  console.log("shot", name);
}
await browser.close();
