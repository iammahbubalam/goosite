import fs from "node:fs";
import { getAccessToken, getProjectId } from "./lib/gauth.mjs";

const REGION = process.env.VERTEX_REGION || "us-central1";
const MODELS = [
  "imagen-4.0-generate-001",
  "imagen-4.0-generate-preview-06-06",
  "imagen-3.0-generate-002",
];

const token = await getAccessToken();
const project = getProjectId();
console.log("project:", project, "| region:", REGION);

async function tryModel(model) {
  const url = `https://${REGION}-aiplatform.googleapis.com/v1/projects/${project}/locations/${REGION}/publishers/google/models/${model}:predict`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      instances: [{ prompt: "a single glass of fresh milk on a cream table, soft morning light, editorial" }],
      parameters: { sampleCount: 1, aspectRatio: "1:1", addWatermark: false },
    }),
  });
  const txt = await res.text();
  if (!res.ok) return { model, ok: false, status: res.status, err: txt.slice(0, 300) };
  const j = JSON.parse(txt);
  const b64 = j.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) return { model, ok: false, status: res.status, err: "no image bytes" };
  fs.writeFileSync("/tmp/imagen-probe.png", Buffer.from(b64, "base64"));
  return { model, ok: true, bytes: Buffer.from(b64, "base64").length };
}

for (const m of MODELS) {
  try {
    const r = await tryModel(m);
    console.log(JSON.stringify(r));
    if (r.ok) {
      console.log("WORKING_MODEL=" + m);
      process.exit(0);
    }
  } catch (e) {
    console.log(JSON.stringify({ model: m, ok: false, err: String(e).slice(0, 200) }));
  }
}
console.log("NO_MODEL_WORKED");
process.exit(1);
