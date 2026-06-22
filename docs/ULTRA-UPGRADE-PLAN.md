# GOOWALI — Ultra Upgrade Plan

> Goal: move the site from **premium** to **ultra** without relying on real
> photography. Generate every premium visual with code (shaders, generative
> art, 3D, SVG). Layer in orchestrated scroll motion. Keep the brand discipline:
> cream & milk, ink blue, calm, story-first, commerce secondary.

Status legend: ⬜ todo · 🔬 optional/deferred · ✅ done

---

## 0. Problem statement

No commissioned photography exists. Current `ArtPanel` gradient stand-ins are
fine but read as placeholders. Instead of waiting on photos, build an **in-repo
asset factory** + **shader/generative visuals** so the site looks expensive on
day one and only improves when real photos land.

---

## 1. Claude skills to install

| Skill | Purpose | Output | Status |
|---|---|---|---|
| frontend-design | design judgment, anti-template | guidance | ✅ installed |
| algorithmic-art | p5.js generative (flow fields, particles) | PNG/SVG + live canvas | ⬜ install |
| canvas-design | static art, posters, OG images | PNG/PDF | ⬜ install |

Install pattern: copy skill folder into `~/.claude/skills/<name>/` (must contain
`SKILL.md` with name+description frontmatter).

Skipped: webapp-testing (user opted out), theme-factory (brand locked),
brand-guidelines (Anthropic's brand), web-artifacts-builder (claude.ai only).

---

## 2. Library stack to add

### Visual generation (zero external assets — the core fix)
- ⬜ `@paper-design/shaders-react` — animated mesh-gradient / liquid shaders → hero + section backdrops
- 🔬 `@splinetool/react-spline` — 3D milk bottle / pour (no-code editor) — v2 signature
- 🔬 `@react-three/fiber` `@react-three/drei` `three` — full procedural 3D — v2 ceiling
- 🔬 `@rive-app/react-canvas` — interactive vector milk-drop — optional
- 🔬 `lottie-react` — milk-pour micro-anims (free LottieFiles) — optional

### Motion / scroll (premium feel)
- ⬜ `gsap` + ScrollTrigger — orchestrated scroll storytelling (free)
- ⬜ `lenis` — smooth scroll (biggest "expensive" tell)
- ⬜ `split-type` — per-character serif headline reveals
- ✅ `motion` (Framer) — keep for micro-interactions

### Commerce invisible + forms + polish
- ⬜ `vaul` — slide-up cart drawer
- ⬜ `embla-carousel-react` — jank-free testimonial/product carousel
- ⬜ `sonner` — elegant toasts
- ⬜ `react-hook-form` + `zod` — real form validation (contact, subscription)
- ⬜ `@phosphor-icons/react` — elegant icons + brand icons lucide removed
- 🔬 `shadcn/ui` — accessible Dialog/Sheet primitives (pull only what's used)

---

## 3. Build phases

### Phase A — Foundation (skills + deps)
- ⬜ A1. Install algorithmic-art + canvas-design skills
- ⬜ A2. `npm i` the Phase-1/required libs (shaders, gsap, lenis, split-type, vaul, embla, sonner, rhf, zod, phosphor)
- ⬜ A3. Verify build still green

### Phase B — Smooth scroll + motion spine
- ⬜ B1. `SmoothScroll` provider (Lenis) wrapping layout; sync with GSAP ScrollTrigger ticker
- ⬜ B2. Respect `prefers-reduced-motion` (disable Lenis + heavy motion)
- ⬜ B3. `SplitReveal` component — serif headline char/word reveal on view

### Phase C — Shader / generative visuals (kills "no assets")
- ⬜ C1. `ShaderHero` — cream→milk animated mesh-gradient behind hero; logo floats over it
- ⬜ C2. `MilkField` generative backdrop (p5.js via algorithmic-art) for Story / Journey sections
- ⬜ C3. Upgrade `ArtPanel` → optional shader-backed variant (graceful fallback to current gradient)
- ⬜ C4. Generate static brand art via canvas-design: OG image per product, social posters

### Phase D — Scroll storytelling (the signature)
- ⬜ D1. Milk Journey → pin section, scrub the 7 steps with ScrollTrigger
- ⬜ D2. Farm-to-family parallax: layered organic shapes drift on scroll
- ⬜ D3. Hero load sequence: orchestrated single moment (not scattered effects)

### Phase E — Commerce + forms polish
- ⬜ E1. Cart drawer (vaul) + sonner toasts — minimal, elegant
- ⬜ E2. Contact + subscription forms → react-hook-form + zod validation
- ⬜ E3. Testimonials / related products → embla carousel
- ⬜ E4. Swap footer placeholder icons → phosphor real brand marks

### Phase F — Real assets (later, when available)
- 🔬 F1. AI-generated farm/milk imagery (Flux / Imagen / Firefly) — prompt set documented
- 🔬 F2. Or curated free stock (Unsplash/Pexels), hand-picked 6–8 max
- 🔬 F3. Or local photographer — best long-term
- 🔬 F4. Drop real images into `ArtPanel` / hero slots — instant lift

### Phase G — Verify
- ⬜ G1. `npm run build` green, `npm run lint` clean
- ⬜ G2. All routes 200, reduced-motion path works
- ⬜ G3. Perf sanity: lazy-load 3D/shaders, no layout shift

---

## 4. Design guardrails (do not violate)

- Cream/milk palette only — ink #153B7A, green #6B9D38, gold #D4AF37. No red, no black bg, no saturated color.
- Spend boldness in ONE place (shader hero = the signature); keep everything else quiet.
- Serif (Fraunces) display + Inter body. Type is personality, not filler.
- Motion serves story; cut anything that reads "AI-generated."
- Commerce secondary, brand primary. StoryBrand: customer = hero, GOOWALI = guide.
- Quality floor: responsive to mobile, visible focus, reduced-motion respected.

---

## 5. Recommended execution order

1. Phase A (skills + deps)
2. Phase B (Lenis + GSAP spine)
3. Phase C1 (shader hero) — immediate visible jump
4. Phase D1 (pinned milk journey) — the signature scroll moment
5. Phase E (commerce/forms polish)
6. Phase C2–C4 + D2–D3 (deeper generative + parallax)
7. Phase F (real assets) when ready

Defer all 🔬 (Spline/R3F/Rive/Lottie, real photos) to v2.
