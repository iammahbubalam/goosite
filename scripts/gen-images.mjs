import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { getAccessToken, getProjectId } from "./lib/gauth.mjs";

/*
 * GOOWALI brand-locked image pipeline.
 * Generates photoreal, on-brand imagery with Gemini 3 Pro Image (Nano Banana
 * Pro) on the Vertex `global` endpoint, conditioned on the real GOOWALI brand
 * assets (logo + banner) so products carry the actual label and every scene
 * matches the brand palette/mood. Optimises to WebP + LQIP and writes the map
 * the <Photo> component consumes. Idempotent; --force to regenerate.
 *
 *   node scripts/gen-images.mjs               # generate missing
 *   node scripts/gen-images.mjs --force       # regenerate all
 *   node scripts/gen-images.mjs hero-glass    # only named slots
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/brand/photos");
const MANIFEST_OUT = path.join(ROOT, "src/lib/photos.generated.json");
const REGION = "global";
const HOST = "aiplatform.googleapis.com";
const MODEL = process.env.IMAGE_MODEL || "gemini-3-pro-image-preview";

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));

const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, "image-manifest.json"), "utf8"),
);
fs.mkdirSync(OUT_DIR, { recursive: true });

const existing = fs.existsSync(MANIFEST_OUT)
  ? JSON.parse(fs.readFileSync(MANIFEST_OUT, "utf8"))
  : {};

const token = await getAccessToken();
const project = getProjectId();
const endpoint = `https://${HOST}/v1/projects/${project}/locations/${REGION}/publishers/google/models/${MODEL}:generateContent`;
console.log(`${MODEL} @ ${REGION} · project ${project}`);

// load + cache reference images as inlineData parts
const refCache = {};
function refPart(key) {
  if (!refCache[key]) {
    const p = manifest.references[key];
    const mime = p.endsWith(".png") ? "image/png" : "image/jpeg";
    refCache[key] = {
      inlineData: { mimeType: mime, data: fs.readFileSync(path.join(ROOT, p)).toString("base64") },
    };
  }
  return refCache[key];
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generate(slot, attempt = 0) {
  const refs = (slot.refs || []).map(refPart);
  const usesLogo = (slot.refs || []).includes("logo");
  const prompt = [
    slot.prompt,
    usesLogo ? manifest.brandMark : "",
    manifest.style,
  ]
    .filter(Boolean)
    .join("\n\n");
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [...refs, { text: prompt }] }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio: slot.aspectRatio,
          imageSize: slot.imageSize || "2K",
        },
      },
    }),
  });
  if ((res.status === 429 || res.status === 503) && attempt < 4) {
    const wait = 30000 + attempt * 20000;
    process.stdout.write(`${res.status}, backoff ${wait / 1000}s … `);
    await sleep(wait);
    return generate(slot, attempt + 1);
  }
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 200)}`);
  const j = await res.json();
  const parts = j.candidates?.[0]?.content?.parts || [];
  const img = parts.find((p) => p.inlineData?.data);
  if (!img) throw new Error("no image part (filtered?)");
  return Buffer.from(img.inlineData.data, "base64");
}

const out = { ...existing };

for (const slot of manifest.slots) {
  if (only.length && !only.includes(slot.id)) continue;
  const webpPath = path.join(OUT_DIR, `${slot.id}.webp`);
  if (!force && fs.existsSync(webpPath) && existing[slot.id]) {
    console.log(`· skip ${slot.id}`);
    continue;
  }
  process.stdout.write(`· gen  ${slot.id} … `);
  try {
    const raw = await generate(slot);
    const img = sharp(raw).resize({ width: slot.maxWidth, withoutEnlargement: true });
    const meta = await img.metadata();
    await img.clone().webp({ quality: 82 }).toFile(webpPath);
    const lqipBuf = await sharp(raw).resize(24).webp({ quality: 40 }).toBuffer();
    out[slot.id] = {
      src: `/brand/photos/${slot.id}.webp`,
      alt: slot.alt,
      width: meta.width,
      height: meta.height,
      lqip: `data:image/webp;base64,${lqipBuf.toString("base64")}`,
    };
    console.log("ok");
  } catch (e) {
    console.log("FAIL", String(e.message || e).slice(0, 160));
  }
  await sleep(50000); // Nano Banana Pro per-minute quota is tight
}

fs.writeFileSync(MANIFEST_OUT, JSON.stringify(out, null, 2));
console.log(`\nWrote ${MANIFEST_OUT} (${Object.keys(out).length} photos)`);
