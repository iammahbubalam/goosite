# GOOWALI v3 — "Floating Over a Milk River"

**Status:** Proposed · **Owner:** Creative Director + FE Architect · **Doc type:** Production design doc (read before building)

---

## 0. One-line vision

The whole site sits on a single, continuous **river of milk** that flows beneath
every section. You don't scroll *through* pages — you **drift down a milk
stream**, and the content floats on its surface like leaves on water.

This is the organizing metaphor. Every motion, transition, and visual decision
answers to it. If a change doesn't serve "floating over a milk river — calm,
pure, premium," it is cut.

---

## 1. Brand & StoryBrand spine (unchanged, reinforced)

The customer is the hero. GOOWALI is the guide. The river is the proof of
purity made visible — an unbroken, honest line from farm to family.

| StoryBrand beat | Where it lives on the river |
|---|---|
| Hero has a problem (can't trust milk) | Hero — calm authority, the river begins |
| Guide shows empathy + authority | Story + Trust — the source, the testing |
| The plan | Milk Journey — 7 steps *are* the river's course |
| Call to action | Subscription / Order — step into the stream |
| Avoids failure | "no preservatives, tested daily" proof points |
| Achieves success | Family at the table — the river's mouth |

Copy stays warm, short, emotional. Commerce stays secondary and quiet.

---

## 2. What "Google-level / production-grade" means here

Non-negotiable engineering bar:

- **Perf budget:** LCP < 2.5s (mobile, throttled), CLS < 0.05, INP < 200ms,
  main-thread long tasks minimized. JS shipped to first paint stays lean; all
  WebGL/canvas is lazy + offscreen-paused (already our pattern).
- **60fps scroll.** The river is *one* render loop (shared Lenis ↔ GSAP ticker),
  not N competing rAFs. One WebGL context for the river, reused — never one
  canvas per section.
- **Accessibility floor:** keyboard focus visible, `prefers-reduced-motion`
  fully honored (river freezes to a still gradient, content still readable),
  semantic landmarks, alt text, color contrast AA.
- **Determinism:** seeded generative art; no layout that depends on animation
  having run; SSR renders complete, legible content.
- **Graceful degradation:** no WebGL → CSS gradient river. Old device → reduced
  particle counts via `matchMedia`/devicePixelRatio caps.

---

## 3. The Milk River system (core technical design)

### 3.1 Concept
A **single fixed full-viewport layer** (`<MilkRiver/>`) behind all content. It
renders a slow vertical flow of milk — cream and white folding, faint blue
depth, soft caustic light. Content sections are translucent/floating cards that
let the river show at their edges and seams.

### 3.2 Rendering approach (decision)
**Primary:** one full-screen WebGL shader plane (custom GLSL fbm/curl-noise milk
flow) driven by scroll progress + time. Rationale: one context, GPU-cheap,
scales to any height, scroll-reactive (flow speed couples to scroll velocity).

- Library: `@react-three/fiber` *only if* we need the ecosystem; otherwise a
  raw WebGL/`ogl`-style single-shader mount (lighter). **Decision: raw single
  fragment shader via a tiny mount** (no R3F) to keep bundle small — we removed
  three.js earlier for weight; we reintroduce *only* a single shader, not a
  scene graph.
- Driver: Lenis scroll → normalized progress + velocity uniform → shader
  `u_scroll`, `u_velocity`, `u_time`.
- **Fallback chain:** WebGL shader → existing `MeshGradient` (paper-design) →
  static CSS gradient (reduced-motion / no-GL).

### 3.3 "Floating" treatment
- Sections become **floating slabs**: rounded, soft drop + ambient shadow,
  subtle backdrop-blur at edges so the river bleeds at the seams.
- Between sections: **milk-wave seams** (existing `MilkWave`) so one slab pours
  into the next.
- Depth via **parallax tiers**: river (slowest) < ambient leaves/motes < content
  (1:1). GSAP ScrollTrigger scrub.
- Optional drifting **leaf/cream motes** (very few, GPU-instanced or CSS) for
  life — strictly < 8 on screen, reduced-motion off.

### 3.4 Scroll architecture
- Keep **Lenis** + **GSAP ScrollTrigger** (already wired, one ticker).
- Add **scroll-velocity coupling**: faster scroll = river ripples faster, then
  eases back (premium "weight").
- Evaluate **GSAP ScrollSmoother** — skip if Lenis already smooth (avoid double
  smoothing). **Decision: stay on Lenis**, do not add ScrollSmoother.
- Pin moments stay sparse (Milk Journey only). Add **one** new orchestrated pin:
  hero → first section "dissolve into the river."

---

## 4. Imagery pipeline (Gemini / Vertex → real assets)

User has Gemini CLI logged in; can call Google models (Imagen on Vertex).
Brand reference assets live in `/home/m8m/Agnos/goosite/assets/{logo,banner,leaflate,pkging}` — **reference only, never shipped directly** (except the logo we already use).

### 4.1 Tooling (to build in P1)
- `scripts/gen-images.mjs` — a small Node tool that:
  1. reads a prompt manifest `scripts/image-manifest.json`
     (slot id, prompt, aspect, output path),
  2. shells out to the Gemini CLI (or Vertex Imagen REST) to generate,
  3. post-processes (sharp): resize, convert to AVIF/WebP, generate blur
     placeholder (LQIP), write to `public/brand/photos/`,
  4. updates a `photos.generated.json` map consumed by `<Photo>`.
- **Probe step first:** detect the actual Gemini CLI invocation + auth before
  wiring (one throwaway call). Document the exact command in this file once
  known. If image-gen models aren't reachable, pipeline degrades to generative
  `<Photo>` fallbacks (already built) — zero blockers.

### 4.2 Art direction for generated images
Derived from brand refs, never copied:
- Soft Bangladeshi morning light, cream/ivory tones, shallow DOF.
- Subjects: cows at dawn, hands milking, green fields, a family breakfast, glass
  of milk with condensation, farmer portraits.
- Mood: calm, honest, editorial. **No** supermarket/stock lighting, no garish
  saturation, no busy backgrounds.
- Consistent palette LUT toward `#FFF9F2 / #153B7A / #6B9D38`.

### 4.3 Slots (already wired via `<Photo>`)
farms hero, founder portrait, blog covers, + new: story section, journey steps,
testimonial faces. Drop-in `src` → instant upgrade. Documented in
`docs/PHOTO-SLOTS.md`.

---

## 5. Design language v3 (refinements)

- **Type:** keep Fraunces (display) + Inter (text). Push contrast: larger
  display, more dramatic italic accents, tighter optical sizing. Add a
  small-caps utility face role for labels/data (Inter tnum + tracking).
- **Color:** introduce **river depth tones** (deeper ink for "deep water"
  sections) for rhythm; keep cream dominance. No new hues.
- **Surfaces:** floating slabs, hairline borders, soft inset rings, grain
  (already added). Slightly more glass at seams.
- **Motion vocabulary (canon):**
  - reveal = mask wipe (clip-path) for visuals, line-mask for headlines
  - drift = parallax tiers on the river
  - ripple = scroll-velocity coupling
  - pour = milk-wave section seams
  - settle = expo.out easing everywhere (no bouncy)
- **Restraint rule:** one signature moment per viewport. River is ambient, not
  attention-grabbing.

---

## 6. Per-page scope

- **Home:** hero "dissolves into river"; Story floats; Milk Journey = the
  river's course (enhance pin); Marquee; Testimonials with faces; CTA = "step
  into the stream."
- **Products / Product:** range floats over river; product hero = vessel on
  water; quiet commerce.
- **Subscription:** the river as a calendar/flow of mornings.
- **Farms:** immersive real imagery (generated) over river; transparency.
- **Bulk:** professional, ink "deep water" section, case studies.
- **About:** founder portrait (generated), mission floats.
- **Blog:** editorial covers (generated), river behind.
- **Contact:** quiet, the river narrows to a single drop.

---

## 7. Performance & quality gates (acceptance)

A phase is "done" only when:
- `npm run build` green, `npm run lint` clean (0 errors).
- All routes 200; SSR content complete without JS.
- Lighthouse (mobile, throttled) **Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95**.
- CLS < 0.05; no hydration warnings; no console errors.
- `prefers-reduced-motion`: river static, no autoplay motion, fully usable.
- One WebGL context total; verified offscreen-pause; mobile (<640px) gets the
  cheap river.
- Screenshot self-review (system Chrome + Playwright) on every changed page.

---

## 8. Phased rollout

- **P0 — Foundations & probes (no visual risk):** confirm Gemini CLI command;
  build `MilkRiver` shader scaffold behind a feature flag (off by default);
  scroll-velocity uniform plumbing; perf harness/screenshot script restored.
- **P1 — Image pipeline:** `gen-images.mjs` + manifest; generate first 6 hero
  images; wire into `<Photo>` slots; LQIP placeholders.
- **P2 — River layer live:** enable `MilkRiver` globally; convert sections to
  floating slabs; seam waves; parallax tiers; reduced-motion fallback.
- **P3 — Hero & signature scroll:** hero "dissolve into river" pin; refine Milk
  Journey as the river's course; ripple velocity coupling.
- **P4 — Page-by-page polish:** apply float treatment + real imagery across all
  8 routes; testimonial faces; CTA rewrites to StoryBrand.
- **P5 — Perf & a11y hardening:** Lighthouse, CLS, bundle audit, device caps,
  final screenshot review. Deploy-ready.

Each phase ends with build+lint+screenshot gate (Section 7).

---

## 9. Risks & mitigations

| Risk | Mitigation |
|---|---|
| WebGL river hurts perf/battery | one context, offscreen pause, DPR cap, mobile cheap path, reduced-motion freeze |
| Double smoothing (Lenis+ScrollSmoother) jank | stay Lenis-only |
| Gemini image-gen unreachable/auth | probe first; generative `<Photo>` fallback already ships; no blocker |
| "River" becomes distracting | ambient only, low contrast, one signature/viewport |
| Transform ancestors break ScrollTrigger pins | keep page transition opacity-only (already fixed); audit transforms |
| Scope creep | feature-flag river; phases shippable independently |

---

## 10. Architecture / file map (new + touched)

```
src/components/river/milk-river.tsx        # fixed WebGL milk flow + fallbacks
src/components/river/milk-river.glsl.ts     # fragment shader source
src/lib/scroll.ts                           # shared scroll progress/velocity store
src/components/ui/slab.tsx                   # floating section wrapper
scripts/gen-images.mjs                       # Gemini/Vertex image tool
scripts/image-manifest.json                  # prompt slots
public/brand/photos/*                         # generated, optimized assets
docs/MILK-RIVER-PLAN.md                       # this doc
```
Touched: `layout.tsx` (mount river + scroll store), `globals.css` (river/slab
tokens), every section (slab treatment), `<Photo>` (LQIP), `PageHero`.

---

## 11. Decisions (LOCKED 2026-06-23)

1. River intensity: **Subtle ambient** — barely moves, content-first, Apple/Aesop calm.
2. Drifting motes/leaves: **Yes, sparse** (<8 on screen, off under reduced-motion).
3. Image realism: **Photoreal incl. people** — cows, farmers, families via Gemini/Imagen.
4. Scope: **All 8 pages in one pass.**

---

## 12. Definition of success

A first-time visitor scrolls once and feels **calm, trust, and premium** — like
gliding over still milk at dawn. They cannot tell it was built by anyone but a
top global agency. Commerce is felt only when sought. The brand, not the store,
is what they remember.
```
