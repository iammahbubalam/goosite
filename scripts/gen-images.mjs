import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { getAccessToken, getProjectId } from "./lib/gauth.mjs";

/*
 * GOOWALI image pipeline.
 * Generates photoreal brand imagery with Vertex AI Imagen, optimises to WebP,
 * builds a tiny blur placeholder (LQIP), and writes a manifest the <Photo>
 * component consumes. Idempotent: skips slots already generated unless --force.
 *
 *   node scripts/gen-images.mjs            # generate missing
 *   node scripts/gen-images.mjs --force    # regenerate all
 *   node scripts/gen-images.mjs farm-hero  # only named slots
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/brand/photos");
const MANIFEST_OUT = path.join(ROOT, "src/lib/photos.generated.json");
const REGION = process.env.VERTEX_REGION || "us-central1";
const MODEL = process.env.IMAGEN_MODEL || "imagen-4.0-generate-001";

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
const endpoint = `https://${REGION}-aiplatform.googleapis.com/v1/projects/${project}/locations/${REGION}/publishers/google/models/${MODEL}:predict`;

console.log(`Imagen ${MODEL} @ ${REGION} · project ${project}`);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generate(slot, attempt = 0) {
  const prompt = `${slot.prompt} ${manifest.style}`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: slot.aspectRatio,
        addWatermark: false,
        negativePrompt: manifest.negative,
        personGeneration: "allow_adult",
      },
    }),
  });
  if (res.status === 429 && attempt < 4) {
    const wait = 30000 + attempt * 15000;
    process.stdout.write(`429, backoff ${wait / 1000}s … `);
    await sleep(wait);
    return generate(slot, attempt + 1);
  }
  if (!res.ok) throw new Error(`${slot.id}: ${res.status} ${(await res.text()).slice(0, 160)}`);
  const j = await res.json();
  const b64 = j.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error(`${slot.id}: no image bytes (likely safety filter)`);
  return Buffer.from(b64, "base64");
}

const out = { ...existing };

for (const slot of manifest.slots) {
  if (only.length && !only.includes(slot.id)) continue;
  const webpPath = path.join(OUT_DIR, `${slot.id}.webp`);
  if (!force && fs.existsSync(webpPath) && existing[slot.id]) {
    console.log(`· skip ${slot.id} (exists)`);
    continue;
  }
  process.stdout.write(`· gen  ${slot.id} … `);
  try {
    const png = await generate(slot);

    const img = sharp(png).resize({
      width: slot.maxWidth,
      withoutEnlargement: true,
    });
    const meta = await img.metadata();
    await img.clone().webp({ quality: 82 }).toFile(webpPath);

    const lqipBuf = await sharp(png)
      .resize(24)
      .webp({ quality: 40 })
      .toBuffer();
    const lqip = `data:image/webp;base64,${lqipBuf.toString("base64")}`;

    out[slot.id] = {
      src: `/brand/photos/${slot.id}.webp`,
      alt: slot.alt,
      width: meta.width,
      height: meta.height,
      lqip,
    };
    console.log("ok");
  } catch (e) {
    console.log("FAIL", String(e.message || e).slice(0, 160));
  }
  await sleep(12000); // stay under per-minute online prediction quota
}

fs.writeFileSync(MANIFEST_OUT, JSON.stringify(out, null, 2));
console.log(`\nWrote ${MANIFEST_OUT} (${Object.keys(out).length} photos)`);
