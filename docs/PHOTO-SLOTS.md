# Photo Slots — where real imagery drops in

Every photographic area uses the `<Photo>` component
(`src/components/ui/photo.tsx`). With no `src` it renders the generative
`ArtPanel` (gradient / shader / flow-field). Add `src` and it becomes an
optimised `next/image` — no layout change.

Put files in `public/brand/photos/` and add the `src`.

| Location | File in component | Suggested src | Aspect |
|---|---|---|---|
| Farms — immersive hero | `src/app/farms/page.tsx` | `/brand/photos/farm-hero.jpg` | 21/9 |
| About — founder portrait | `src/app/about/page.tsx` | `/brand/photos/founder.jpg` | 4/5 |
| Blog — featured cover | `src/app/blog/page.tsx` | `/brand/photos/post-featured.jpg` | 16/10 |
| Blog — grid covers | `src/app/blog/page.tsx` | per-post `cover` | 4/3 |

### Example

```tsx
// before (generative)
<Photo tone="field" alt="GOOWALI farm at morning" className="aspect-[21/9]" />

// after (real photo)
<Photo
  src="/brand/photos/farm-hero.jpg"
  alt="GOOWALI farm at morning"
  className="aspect-[21/9]"
  priority
/>
```

### Still generative on purpose (decorative, not photo slots)
- Homepage hero → **3D milk bottle** (`MilkBottle3D`)
- Story collage tiles, product detail hero → `ArtPanel` (shader)
- Milk Journey / About & Blog heros → **Milk Turbulence** flow field

### Art direction for real photos
Soft morning light, cream tones, shallow depth of field, Bangladeshi farms,
real families, milk & cream. Avoid hard supermarket/stock lighting. See
`docs/ULTRA-UPGRADE-PLAN.md` §Phase F for AI-generation prompts when needed.
