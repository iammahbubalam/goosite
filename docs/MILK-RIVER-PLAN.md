# GOOWALI — "Floating Over Milk" (refined)

**Status:** Active · **Doc type:** Living design doc · **Last refined:** 2026-06-23

> Doc started as maximalist "sitewide WebGL milk river" spec. **Scaled back**
> after design review: milk feeling more elegant via strong **hero** + restrained
> per-section milk shaders than heavy full-site river. Keep simple; premium ≠ busy.

---

## 0. Vision (refined)

GOOWALI feel **calm, pure, floating on milk** — content rest on soft milk surface,
never busy "river" behind everything. Metaphor expressed where hits hardest (hero),
echoed quietly elsewhere, not forced behind every pixel.

**Superseded (do NOT build):** single fixed full-viewport WebGL river layer,
frosted `.surface` translucency on every section, drifting motes, parallax tiers,
hero "dissolve into river." Over-engineered for content-first brand. Dropped.

Foundation files from that direction (`src/lib/scroll.ts`,
`src/components/river/milk-river.tsx`) stay committed but **dormant/unused** —
harmless, available if future idea want scoped milk shader.

---

## 1. StoryBrand spine (unchanged — still the law)

Customer = hero; GOOWALI = guide; milk = proof of purity.

| Beat | Where it lives |
|---|---|
| Problem: can't trust milk | Hero — calm authority |
| Guide: empathy + authority | Story + Trust (source, testing) |
| The plan | Milk Journey (7 steps) |
| Call to action | Subscription / Order |
| Avoids failure | "no preservatives, tested daily" |
| Success | Family at the table |

Copy stay warm, short, emotional. Commerce stay quiet, secondary.

---

## 2. Current state (DONE)

- **Hero floats on milk** (`src/components/home/hero.tsx`): full-bleed flowing
  milk `ShaderField` (white/cream/faint-blue palette) as background; heavy
  legibility wash softened to gentle left scrim so milk reads across hero while
  copy stay legible; right card holds **photoreal image**
  (`/brand/photos/story-cows.webp`) with proof chip — `src` swaps for real hero
  shot anytime.
- **Per-page milk visuals** already in place from earlier work: `MilkVessel`
  (milk-tone `PageHero` media + product heroes), shader `ArtPanel`s, `MilkWave`
  seams, grain, GSAP/Lenis motion, masked reveals, marquee, magnetic CTAs,
  counters, cart, forms. All reduced-motion safe.
- **Imagery: 4 photoreal assets** generated + committed
  (`farm-hero`, `story-cows`, `blog-farm-morning`, `blog-mustard-oil`).
- Build green, lint clean (1 known unrelated rhf warning), all 24 routes static.

---

## 3. Imagery pipeline (built + validated, DEFERRED)

**Correction to old doc:** image generation uses **Vertex AI Imagen**, authed by
**gcloud ADC** — *not* Gemini CLI (no gcloud binary in PATH; tokens minted from
ADC refresh creds in `scripts/lib/gauth.mjs`). See memory `goowali-image-pipeline`.

- Validated: `imagen-4.0-generate-001` @ `us-central1`, project
  `project-d97eb506-b9ac-475d-994`. Quality excellent.
- Tool: `scripts/gen-images.mjs` (idempotent, 12s throttle + 429 backoff) +
  `scripts/image-manifest.json` → sharp WebP + LQIP → `public/brand/photos/` →
  `src/lib/photos.generated.json`. Run: `node scripts/gen-images.mjs [--force] [slotId...]`.
- **Deferred by user** pending tighter, precise prompts. Gotchas: low per-minute
  quota (429s), Imagen blocks images of minors (reword to adults).
- Art direction (from brand refs `assets/{logo,banner,leaflate,pkging}`, never
  copied): soft Bangladeshi morning light, cream/ivory, shallow DOF; subjects =
  cows at dawn, hands milking, green fields, glass/bottle with condensation,
  farmer/family portraits; palette → `#FFF9F2 / #153B7A / #6B9D38`. Signature
  product = clear glass bottle + gold cap.
- Slots wired via `<Photo>` (`docs/PHOTO-SLOTS.md`): farms hero, founder, blog
  covers, + hero card. Drop-in `src` = instant upgrade.

---

## 4. Remaining homework ("the rest")

1. **Verify nothing regressed** after hero pivot: build + lint + screenshot all 8
   routes in this box's Chrome; confirm consistency.
2. **Add portrait hero slot** to image manifest (e.g. `hero-glass` — glass of
   milk / GOOWALI bottle, 3:4) so hero card upgrades from interim cows shot to
   purpose-shot hero image later.
3. **Run image pipeline** later with refined prompts to fill all `<Photo>` slots
   (deferred until prompts tightened).
4. **Optional perf/a11y pass:** Lighthouse mobile (Perf ≥90, A11y ≥95), CLS
   <0.05, reduced-motion sanity. (Site already static + lazy + reduced-motion
   aware.)

---

## 4b. Perf/a11y pass — results (2026-06-23, Lighthouse mobile, sim throttle)

- **Performance 90** (was 77) · A11y 95 · Best-practices 96 · SEO 100.
- LCP 5.2s → **3.9s**; TBT 200ms → **30ms**; CLS 0; FCP 0.9s; SI 1.2s.
- Fixes applied (all in `hero.tsx` + `layout.tsx`):
  1. hero image animates clip+scale only (never opacity) → stays painted as LCP.
  2. hero headline: dropped JS-hidden SplitType mask reveal (gated LCP on
     hydration) → plain transform slide; paints at FCP.
  3. Fraunces trimmed to default wght axis (dropped opsz/SOFT) → ~half the woff2,
     which was headline's LCP gate.
- **Caveat:** headless Chrome here has no GPU; WebGL (`ShaderField`) intermittently
  crashes renderer under `--disable-gpu`, producing flaky Lighthouse runs (false
  document-title/meta = 0). Served HTML correct (title+meta present); real GPU
  browsers render fine. Remaining LCP gap = webfont swap + shader on simulated
  mobile — diminishing returns, left as-is.

## 5. Quality gates (per change)

- `npm run build` green, `npm run lint` clean.
- All routes 200; SSR content complete; no console/hydration errors.
- `prefers-reduced-motion`: shaders → static milk gradients, no autoplay, usable.
- Screenshot self-review (system Chrome `/usr/bin/google-chrome` + Playwright
  `scripts/shot.mjs`) on changed pages.

---

## 6. File map (actual)

```
src/components/home/hero.tsx            # hero floats on milk (DONE)
src/components/shader/milk-vessel.tsx   # rich milk panel (PageHero media, products)
src/components/shader/shader-field.tsx  # lazy MeshGradient backdrop
src/components/ui/photo.tsx             # real-image slot, generative fallback
scripts/gen-images.mjs · image-manifest.json · lib/gauth.mjs   # Imagen pipeline
public/brand/photos/*                   # generated assets (4 so far)
src/lib/scroll.ts · components/river/milk-river.tsx            # DORMANT (unused)
```

---

## 7. Decision log

- 2026-06-23: **Sitewide milk river ABANDONED.** Milk feeling delivered via hero
  background + restrained per-section shaders. Hero card = photoreal image, not
  milk vessel. Scope: hero only for "floating on milk" change.
- 2026-06-23: Imagery = Vertex Imagen + gcloud ADC; generation deferred for
  prompt precision.

---

## 8. Definition of success

First-time visitor feels **calm, trust, premium** — content rest on milk at dawn.
Brand, not store, what they remember. Nothing on page feels busy or "AI-generated."