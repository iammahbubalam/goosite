# Algorithmic Philosophy — "Milk Turbulence"

> A generative aesthetic movement for GOOWALI. The brief: milk is a living
> fluid, collected at dawn, never still. The page should breathe like cream
> settling in a pail.

## Manifesto

Milk Turbulence is the study of calm motion — order that emerges from a fluid
left to find its own rest. It rejects the hard edge and the static frame.
Everything drifts, nothing rushes. Where industrial dairy is mechanical and
cold, Milk Turbulence is organic and warm: a field of cream finding equilibrium
under invisible natural law.

The movement is built on **layered noise**. A slow Perlin/value-noise field
defines a vector flow across the canvas. Thousands of fine particles — drops of
cream — ride that field, their faint trails accumulating into soft density maps.
Multiple noise octaves carve turbulent eddies and quiet pools, so the surface is
never uniform: it has weather. The result must read as a **meticulously crafted
algorithm**, the product of deep computational expertise, tuned over countless
iterations until the motion feels inevitable rather than designed.

Colour is restrained to the brand's dawn palette — cream, milk, the faintest
breath of green and morning blue. Particles never shout. Fast streams sit a
shade brighter; slow ones fade toward the background until they vanish. The
palette is the discipline; the motion is the expression.

Time is gentle. The system evolves at a fraction of real speed, so a glance
reads as stillness and a gaze reveals drift. It respects the viewer: under
reduced-motion it freezes into a single quiet composition, and it never competes
with the words on top of it.

Seeded variation gives every surface its own character while keeping the family
resemblance — the same master-level field, sampled at a different origin. This
is painstaking optimization in service of restraint: the hardest kind of
craft, where the work is felt and never noticed.

## Algorithmic expression (as shipped)

Expressed in the app as a performant Canvas2D component
(`src/components/generative/flow-field.tsx`) rather than the p5 runtime, to keep
the site fast:

- value-noise flow field, 2–3 octaves, seeded per placement
- a capped particle population riding the field, soft additive trails
- brand-only palette, velocity-mapped brightness
- slow temporal evolution; pauses when offscreen; static frame under
  `prefers-reduced-motion`
