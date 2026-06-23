import fs from "node:fs";
import { getAccessToken, getProjectId } from "./lib/gauth.mjs";

const REGION = process.env.VERTEX_REGION || "us-central1";
const MODELS = [
  "gemini-3-pro-image-preview",
  "gemini-3-pro-image",
  "gemini-2.5-flash-image",
];

const token = await getAccessToken();
const project = getProjectId();

const b64 = (p) => fs.readFileSync(p).toString("base64");
const logo = b64("assets/logo/goowali_logo_with_bg.png");
const banner = b64("assets/banner/Milk_brand_banner_design_idea_202606060218.jpeg");

const prompt =
  "Create a premium, photoreal product photograph for the dairy brand in the first reference image (GOOWALI). " +
  "Scene: a clear glass milk bottle with a white cap carrying the GOOWALI cow-crest label, full of fresh milk, " +
  "beside a tall glass of milk with a gentle milk splash, on a warm cream surface with soft morning window light, " +
  "a few green leaves, a softly blurred green pasture in the background. " +
  "Match the warm, clean, premium mood and cream/ivory + deep blue palette of the second reference (the banner). " +
  "No text overlays, no watermark, no extra logos. Vertical portrait composition.";

const host = REGION === "global" ? "aiplatform.googleapis.com" : `${REGION}-aiplatform.googleapis.com`;
async function tryModel(model) {
  const url = `https://${host}/v1/projects/${project}/locations/${REGION}/publishers/google/models/${model}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: "image/png", data: logo } },
            { inlineData: { mimeType: "image/jpeg", data: banner } },
            { text: prompt },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { aspectRatio: "3:4" },
      },
    }),
  });
  const txt = await res.text();
  if (!res.ok) return { model, ok: false, status: res.status, err: txt.slice(0, 220) };
  const j = JSON.parse(txt);
  const parts = j.candidates?.[0]?.content?.parts || [];
  const img = parts.find((p) => p.inlineData?.data);
  if (!img) return { model, ok: false, err: "no image part: " + JSON.stringify(parts).slice(0, 160) };
  fs.writeFileSync("/tmp/gemimg-probe.png", Buffer.from(img.inlineData.data, "base64"));
  return { model, ok: true, bytes: Buffer.from(img.inlineData.data, "base64").length };
}

for (const m of MODELS) {
  try {
    const r = await tryModel(m);
    console.log(JSON.stringify(r));
    if (r.ok) { console.log("WORKING_MODEL=" + m); break; }
  } catch (e) {
    console.log(JSON.stringify({ model: m, ok: false, err: String(e).slice(0, 160) }));
  }
}
