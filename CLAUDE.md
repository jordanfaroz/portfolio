@AGENTS.md

# Portfolio — Jordan Ambrose Faroz

## Stack
- **Next.js 16.2.6** (App Router, Turbopack) — read `node_modules/next/dist/docs/` before touching routing or layout APIs
- **React 19** — server components by default; add `'use client'` for anything using hooks, browser APIs, or WebGL
- **TypeScript 5**, **Tailwind CSS 4**, **shadcn**
- **GSAP 3 + @gsap/react** — scroll animations via `ScrollTrigger`
- **Three.js** — wireframe blob on slide 01
- **WebGL1 / WebGL2** — raw shader canvases on slides 02–05

## Dev server
```
npm run dev   # http://localhost:3000
```
Port 3000 is kept reserved by the persistent dev process (PID stored in `.next/dev/logs/`). A second `npm run dev` will auto-select 3001 and then exit.

## Project layout
```
app/
  page.tsx          — all 5 FlowSection slides
  globals.css       — Tailwind 4 + custom keyframes + shader CSS helpers
  layout.tsx
components/
  ui/
    story-scroll.tsx          — FlowArt + FlowSection scroll engine (GSAP pinning + rotation)
    anomalous-matter-hero.tsx — Slide 01: Three.js wireframe blob (GenerativeArtScene)
    shader-background.tsx     — Slide 02: WebGL1 plasma line shader (ShaderBackground)
    animated-shader-hero.tsx  — Slide 03: WebGL2 nebula/cloud shader (ShaderHeroBackground)
    atc-shader.tsx            — Slide 04: WebGL2 star-field ray-march shader (ATCShaderBackground)
    phosphor-30.tsx           — Slide 05: WebGL2 swirling fire/plasma shader (PhosphorBackground)
    button.tsx
lib/
  utils.ts
```

## Slides
| # | Section | Background |
|---|---------|------------|
| 01 | About — "Build Systems That Think." | Three.js wireframe blob (right-half, 30% opacity) |
| 02 | Skills — "Code Meets AI" | WebGL1 plasma lines (full-slide, dark gradient overlay) |
| 03 | Projects — "Ideas Shipped" | WebGL2 nebula/fire cloud (full-slide, dark gradient overlay) |
| 04 | Experience — "Built Across Industries" | WebGL2 star-field (full-slide, dark gradient overlay) |
| 05 | Contact — "Ready To Build?" | WebGL2 phosphor plasma (full-slide, dark gradient overlay) |

## Shader component pattern
All shader backgrounds follow the same structure — copy this for new ones:
```tsx
'use client';
// 1. canvas ref + IntersectionObserver (pause when off-screen)
// 2. ResizeObserver (canvas matches container, DPR capped at 1.5×)
// 3. RAF loop: only runs while slide is intersecting
// 4. Cleanup: cancelAnimationFrame + ro.disconnect() + io.disconnect() + gl.delete*()
// Return: <canvas className="absolute inset-0 w-full h-full z-0" />
```

In `page.tsx`, each animated slide uses this wrapper:
```tsx
<FlowSection style={{ color: '#ffffff' }}>
  <SomeShaderBackground />
  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-[1] pointer-events-none" />
  <div className="relative z-[2] flex flex-col justify-between gap-6 flex-1">
    {/* slide content */}
  </div>
</FlowSection>
```

## Performance rules
- Every shader component uses `IntersectionObserver` — only the visible slide renders
- DPR capped at 1.5× (some shaders use 1×) to limit GPU fill-rate
- Shader iteration counts reduced: nebula 8 (was 12), ATC ray-march 30 (was 50)
- Three.js geometry detail: IcosahedronGeometry(1.2, 32) (was 64)

## GitHub
- Repo: https://github.com/jordanfaroz/portfolio
- Branch: `master`
