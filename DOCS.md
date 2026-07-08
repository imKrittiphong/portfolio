# Portfolio — UI Redesign & Animation Docs

A record of the landing-page–style redesign of this portfolio: what changed, why,
and how the animation system works so it's easy to extend later.

## Goal

Turn the portfolio from a plain scrolling page into a polished **landing page**
with motion — a hero section, a sticky navbar, and content that animates into
view as you scroll. Keep the existing amber/zinc color identity and the Tailwind
v4 + shadcn setup.

## Tech stack (unchanged)

React 19 · TypeScript · Vite 7 · Tailwind CSS v4 · shadcn-style UI components ·
lucide-react icons.

---

## What changed

### 1. Animation system in `src/index.css`

Added a small, reusable set of CSS animations plus a scroll-reveal utility:

| Class | What it does |
| --- | --- |
| `.animate-gradientMove` | Animated gradient sweep for the hero name. **Was referenced in the old Header but never defined — this fixes that broken animation.** |
| `.animate-fadeInUp` | One-shot entrance (fade + slide up). Used by the hero, staggered via `--enter-delay`. |
| `.animate-float` | Gentle up/down float for the floating tech badges around the avatar. |
| `.animate-scrollCue` | Bouncing chevron scroll indicator in the hero. |
| `.reveal` / `.reveal.is-visible` | Scroll-reveal: elements start hidden and animate in when scrolled into view. Delay controlled by `--reveal-delay`. |

Also added:
- `html { scroll-behavior: smooth; }` so anchor-link navigation glides.
- A **`prefers-reduced-motion`** block that disables all of the above for users
  who opt out of motion (accessibility).

### 2. `src/components/Reveal.tsx` (new)

A reusable wrapper that animates its children in on scroll using an
`IntersectionObserver` (fires once, then unobserves for performance).

```tsx
<Reveal delay={100} className="...">...</Reveal>
```

- `delay` (ms) — stagger items by passing incremental delays (`index * 60`).
- `as` — render as any element (`"div"`, `"h3"`, etc.).
- Layout/styling pass through via `className`; `Reveal` only adds the animation.

Used throughout About, Skill, Project, and Contact to create the "content flows
in as you scroll" landing-page feel.

### 3. `src/components/Header.tsx` — sticky navbar

Replaced the old static title + link row with a **sticky glass navbar**:
- Transparent at the top; on scroll it gains a blurred translucent background
  and a bottom border (`scroll` listener toggles the style).
- Animated underline on nav links (scale-x on hover).
- A **light/dark theme toggle** (Sun/Moon) wired to the existing `useTheme` hook.
- "KB." monogram logo linking back to the top.

### 4. `src/components/Hero.tsx` (new) — landing section

A full-height hero, the centerpiece of the redesign:
- "Open to opportunities" status pill with a pinging dot.
- Avatar with three **floating tech badges** (React, TypeScript, Tailwind).
- Big headline with the animated gradient name.
- Role subtitle + two CTAs ("View Projects", "Get My CV").
- Bouncing scroll-down cue.
- Everything enters with staggered `animate-fadeInUp`.

### 5. Section redesigns

All wrapped in `Reveal` with staggered children and a consistent numbered
section header (`01 About Me`, `02 Skills`, …):

- **About** — bio card + a stat grid (Role / Focus / Location), tag chips,
  hover lift.
- **Skill** — skill items in a responsive grid with hover glow + lift and a
  staggered reveal; knowledge shown as pill chips. Reads from the same
  `constance/data` source.
- **Project** — image cards with a zoom-on-hover thumbnail, a "View details"
  overlay, tech-icon row, and hover lift. **Also fixed a bug: the mapped card
  `<div>` was missing its React `key`.** Opens the existing `Modal`.
- **Contact** — a CTA panel ("Let's build something together") with social
  cards that lift and reveal on scroll.

### 6. `src/components/CursorGlow.tsx` (new) — cursor light

A soft amber light that follows the mouse cursor around the page:
- Fixed, `pointer-events-none` blurred radial glow that eases toward the pointer
  (`requestAnimationFrame` lerp) for a smooth trailing feel.
- Uses `mix-blend-multiply` in light mode / `mix-blend-screen` in dark mode so it
  blends naturally against either background.
- **Only enabled on fine-pointer devices** (`(pointer: fine)`), so it never
  shows on touchscreens; fades out when the cursor leaves the window.

Rendered once at the top of `App`.

### 7. `src/App.tsx` — layout

Renders `Header` → `Hero` → `main` (sections) → `footer`. Kept the animated
blob background. Wider section spacing (`space-y-28`) so each section gets room
to animate in.

---

## How to add motion to new content

**Reveal on scroll:**
```tsx
import Reveal from "./Reveal";

<Reveal delay={0}>...</Reveal>
// stagger a list:
{items.map((item, i) => <Reveal key={item.id} delay={i * 80}>...</Reveal>)}
```

**One-shot entrance (no scroll trigger):**
```tsx
<div className="animate-fadeInUp" style={{ ["--enter-delay" as string]: "200ms" }}>
```

All animations automatically turn off under `prefers-reduced-motion`.

---

## Verification

- `npx tsc -b` — passes, no type errors.
- `npm run build` — production build succeeds.
- Run locally with `npm run dev`.

## Files

**New:** `src/components/Reveal.tsx`, `src/components/Hero.tsx`,
`src/components/CursorGlow.tsx`, `DOCS.md`
**Changed:** `src/index.css`, `src/App.tsx`, `src/components/Header.tsx`,
`About.tsx`, `Skill.tsx`, `Project.tsx`, `Contact.tsx`
