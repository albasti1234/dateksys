# Dateksys Brand Guidelines v1.0

> Last updated: 2026-04-05
> Status: Active

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | Sky Blue `#38BDF8` |
| Background | Dark `#09090B` |
| Heading Font | Space Grotesk |
| Body Font | DM Sans |
| Arabic Font | IBM Plex Sans Arabic |
| Voice | Technical, Trustworthy, Clear |

---

## 1. Brand Identity

### Mission
Dateksys delivers enterprise-grade IT infrastructure and fiber optic solutions that keep businesses connected, secure, and performing at their best.

### Brand Personality

| Trait | Description |
|-------|-------------|
| **Technical** | Deep expertise in networking, fiber optics, and infrastructure |
| **Trustworthy** | 12+ years of proven reliability, 99.9% uptime track record |
| **Clear** | Complex technology explained simply, no unnecessary jargon |
| **Responsive** | 2-hour response time commitment, 24/7 availability |

### Voice Chart

| Trait | We Are | We Are Not |
|-------|--------|------------|
| Technical | Expert, precise, knowledgeable | Overly academic, condescending |
| Trustworthy | Reliable, transparent, proven | Making empty promises |
| Clear | Direct, concise, accessible | Vague, jargon-heavy |
| Responsive | Proactive, available, attentive | Reactive, slow, bureaucratic |

### Tone by Context

| Context | Tone | Example |
|---------|------|---------|
| Website Hero | Confident, impactful | "Infrastructure That Never Sleeps" |
| Service Pages | Informative, solution-focused | "Fiber optic networks engineered for zero downtime" |
| Technical Docs | Precise, instructional | "Configure the OLT using the following parameters" |
| Contact/Support | Warm, responsive | "Our team is ready to help — reach out anytime" |
| Error States | Calm, reassuring | "We're looking into this. Your network is still protected." |

### Prohibited Terms

| Avoid | Use Instead | Reason |
|-------|-------------|--------|
| Revolutionary | Advanced, next-generation | Overused |
| Seamless | Reliable, uninterrupted | Overused |
| Synergy | Integration, collaboration | Corporate jargon |
| Best-in-class | Industry-leading, proven | Unsubstantiated claim |
| Leverage | Use, deploy, implement | Corporate jargon |

---

## 2. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Sky Blue (Accent) | `#38BDF8` | rgb(56, 189, 248) | CTAs, highlights, active states, brand mark |
| Sky Blue Light | `#7DD3FC` | rgb(125, 211, 252) | Gradients, secondary accents |
| Sky Blue Deep | `#0EA5E9` | rgb(14, 165, 233) | Hover states, emphasis |

### Dark Palette (Backgrounds)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Base | `#09090B` | rgb(9, 9, 11) | Page backgrounds |
| Surface | `#111113` | rgb(17, 17, 19) | Cards, elevated surfaces |
| Surface Raised | `#1A1A1D` | rgb(26, 26, 29) | Buttons, inputs, nav items |

### Text Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Primary Text | `#F4F4F5` | rgb(244, 244, 245) | Headings, primary content |
| Secondary Text | `#A1A1AA` | rgb(161, 161, 170) | Body text, descriptions |
| Muted Text | `#52525B` | rgb(82, 82, 91) | Placeholders, disabled states |

### Border & Glow

| Name | Value | Usage |
|------|-------|-------|
| Border | `rgba(255, 255, 255, 0.06)` | Card borders, dividers |
| Border Glow | `rgba(56, 189, 248, 0.15)` | Hover borders, active states |
| Accent Dim | `rgba(56, 189, 248, 0.08)` | Focus rings, subtle highlights |

### Semantic Colors

| State | Hex | Usage |
|-------|-----|-------|
| Success | `#22C55E` | Positive states, uptime indicators |
| Warning | `#F59E0B` | Cautions, pending states |
| Error | `#EF4444` | Errors, critical alerts |
| Info | `#38BDF8` | Informational (uses brand accent) |

### Gradient Specifications

| Name | CSS Value | Usage |
|------|-----------|-------|
| Brand Gradient | `linear-gradient(135deg, #FFFFFF 0%, #7DD3FC 40%, #38BDF8 100%)` | Hero text, emphasis headlines |
| Fiber Glow | `linear-gradient(135deg, #7DD3FC 0%, #38BDF8 50%, #0EA5E9 100%)` | Logo mark, accents |
| Vignette | `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(9,9,11,0.6) 100%)` | Background depth |

### Accessibility

- Text on dark background: **15.2:1** contrast ratio (AAA)
- Accent on dark background: **7.8:1** contrast ratio (AAA)
- All interactive elements meet **WCAG 2.1 AA** standards
- Never place accent text below 14px on dark backgrounds

---

## 3. Typography

### Font Stack

```css
--font-heading: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
--font-body: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
--font-arabic: 'IBM Plex Sans Arabic', sans-serif;
--font-mono: ui-monospace, 'JetBrains Mono', monospace;
```

### Type Scale

| Element | Desktop | Mobile | Weight | Line Height | Letter Spacing |
|---------|---------|--------|--------|-------------|----------------|
| Display / Hero | clamp(3rem, 6vw, 6.5rem) | 3rem | 700 | 1.05 | -0.03em |
| H1 | 48px | 36px | 700 | 1.1 | -0.03em |
| H2 | 36px | 28px | 700 | 1.15 | -0.03em |
| H3 | 28px | 24px | 600 | 1.2 | -0.02em |
| H4 | 24px | 20px | 600 | 1.25 | -0.01em |
| Body | 16px | 16px | 400 | 1.6 | -0.01em |
| Body Large | 17-18px | 17px | 400 | 1.82 | 0 |
| Small / Caption | 14px | 14px | 400 | 1.5 | 0 |
| Label | 11px | 11px | 700 | 1.2 | 0.2em |
| Mono / Data | 10-11px | 10px | 500-600 | 1.3 | 0.08em |

### Typography Rules

1. **Headings** always use Space Grotesk, weight 600-700
2. **Body text** always uses DM Sans, weight 400
3. **Labels and badges** use uppercase + wide letter-spacing (0.2em)
4. **Arabic text** switches to IBM Plex Sans Arabic, letter-spacing resets to 0
5. **Monospace** for technical data (uptime stats, latency, node counts)
6. Minimum body text size: **16px** (prevents iOS auto-zoom)
7. Maximum line length: **65-75 characters** for readability
8. Never use font weights below 400 on dark backgrounds

### Font Loading Strategy

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

Fonts loaded via `next/font` with `display: swap` to prevent FOIT. Only critical weights are loaded (400, 500, 600, 700).

---

## 4. Logo Usage

### Variants

| Variant | File | Use Case |
|---------|------|----------|
| Full Horizontal | `public/images/logo.svg` | Website header, documents, presentations |
| Logo JPEG | `public/logo.jpg` | Social media, fallback |

### Logo Construction

The Dateksys logo consists of:
- **Logomark**: Hexagonal frame with three converging fiber strands meeting at a central luminous core — representing fiber optic convergence and network infrastructure
- **Wordmark**: "DATEK" in white + "SYS" in sky blue gradient, Space Grotesk Bold
- **Tagline**: "IT INFRASTRUCTURE & FIBER OPTICS" in muted gray, DM Sans

### Clear Space

Minimum clear space = **height of the logomark** on all sides

### Minimum Size

| Context | Minimum Width |
|---------|---------------|
| Digital - Full Logo | 200px |
| Digital - Mark Only | 32px |
| Print - Full Logo | 50mm |
| Print - Mark Only | 12mm |

### Color Usage

| Background | Logomark | Wordmark | Tagline |
|------------|----------|----------|---------|
| Dark (#09090B) | Sky blue gradient | White + Sky blue | Muted gray |
| White | Sky blue | Dark gray | Medium gray |
| Photo/Busy | Use with dark overlay | White | White (optional) |

### Logo Don'ts

- Don't rotate or skew the logo
- Don't change the fiber strand colors independently
- Don't add drop shadows or outer effects beyond the defined glow
- Don't separate the mark from the wordmark at sizes > 200px
- Don't place on backgrounds that reduce contrast below 3:1
- Don't modify the hexagonal frame proportions

---

## 5. Spacing System

### Base Unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight inline spacing |
| `space-2` | 8px | Compact element gaps |
| `space-3` | 12px | Input padding, small gaps |
| `space-4` | 16px | Standard padding, card internal |
| `space-6` | 24px | Section sub-gaps, grid gaps |
| `space-8` | 32px | Component spacing |
| `space-10` | 40px | Section title to content |
| `space-12` | 48px | Between major sections (mobile) |
| `space-16` | 64px | Section padding (mobile) |
| `space-24` | 96px | Section padding (desktop) |
| `space-32` | 128px | Hero vertical padding |

### Section Padding

| Viewport | Horizontal | Vertical |
|----------|-----------|----------|
| Mobile (<768px) | 5% | 64px |
| Tablet (768-1024px) | 5% | 80px |
| Desktop (>1024px) | 6% | 96px |

### Component Spacing Rules

1. **Cards**: 24px internal padding, 24px gap between cards
2. **Buttons**: 14px vertical, 32px horizontal padding
3. **Inputs**: 12px vertical, 16px horizontal padding
4. **Badge/Pills**: 8px vertical, 16px horizontal padding
5. **Icon + Text**: 8px gap
6. **Navbar height**: 80px fixed

---

## 6. Border & Radius System

### Border Radius

| Element | Radius |
|---------|--------|
| Buttons | 8px |
| Inputs | 8px |
| Cards | 20px |
| Bento Items | 24px |
| Modals | 16px |
| Badges/Pills | 9999px (full) |
| Status Dots | 9999px (full) |

### Border Weights

| Usage | Width | Color |
|-------|-------|-------|
| Card borders | 1px | `var(--color-border)` |
| Active/hover borders | 1px | `var(--color-border-glow)` |
| Focus rings | 3px | `var(--color-accent-dim)` |
| Dividers | 1px | `var(--color-border)` gradient |

---

## 7. Animation & Motion

### Timing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `duration-fast` | 150ms | Hover states, micro-interactions |
| `duration-base` | 300ms | Transitions, reveals |
| `duration-slow` | 600ms | Section animations |
| `duration-cinematic` | 1000ms | Hero entrance, page transitions |

### Easing Curves

| Name | Value | Usage |
|------|-------|-------|
| Expo Out | `cubic-bezier(0.16, 1, 0.3, 1)` | Primary easing — entrance, reveals |
| Quad In-Out | `cubic-bezier(0.45, 0, 0.55, 1)` | Symmetric transitions |
| Spring | `type: "spring", damping: 20, stiffness: 90` | Modal/sheet entrance |

### Motion Rules

1. **Entrance animations**: Always use `ease-out-expo`, max 1000ms
2. **Micro-interactions**: 150-300ms, transform/opacity only
3. **Stagger delays**: 30-100ms between sequential items
4. **Parallax**: Subtle (max 80px displacement), respect `prefers-reduced-motion`
5. **Hover effects**: translateY(-2px) + scale(1.03) max, 200ms duration
6. **Exit animations**: 60-70% of entrance duration
7. **Never animate**: width, height, top, left — use transform only
8. **Reduced motion**: All animations collapse to 0.01ms via media query

---

## 8. Imagery & Icons

### Photography Style

- **Lighting**: Cool-toned, dramatic, with sky blue accent lighting
- **Subjects**: Server rooms, fiber optic cables, network infrastructure, data centers
- **Color treatment**: Desaturated with sky blue highlights
- **Composition**: Clean, focused, with depth-of-field for tech focus
- **Format**: WebP primary, AVIF for next-gen, JPEG fallback

### Icon System

- **Library**: Lucide React
- **Style**: Outlined, 24px base grid
- **Stroke**: 1.5-2px consistent weight
- **Color**: `var(--color-accent)` for primary, `var(--color-text-secondary)` for secondary
- **Size tokens**: 16px (inline), 20px (buttons), 24px (cards), 32px (features), 48px (heroes)

---

## 9. Component Specifications

### Buttons

| Variant | Background | Text | Border | Hover Effect |
|---------|-----------|------|--------|--------------|
| Primary | `rgba(56,189,248,0.1)` | `#F4F4F5` | `rgba(56,189,248,0.35)` | Glow + lift + border brighten |
| Ghost | `transparent` | `#A1A1AA` → `#F4F4F5` | `rgba(255,255,255,0.1)` | Subtle bg + border lighten |
| Solid | `var(--color-surface-2)` | `#F4F4F5` | `var(--color-border)` | Border accent + shadow + lift |

### Cards

| Property | Default | Hover |
|----------|---------|-------|
| Background | `var(--color-surface)` | — |
| Border | `1px solid var(--color-border)` | `rgba(56,189,248,0.15)` |
| Radius | 20px | — |
| Shadow | none | `0 20px 60px -20px rgba(0,0,0,0.6)` |
| Transform | none | `translateY(-4px)` for bento items |

### GlowCard (Special)

Mouse-tracking spotlight effect with:
- Radial gradient centered on cursor position
- 300px radius, sky blue tinted
- Opacity: 0.08 base, enhanced on hover
- Border brightens on hover

---

## 10. Responsive Breakpoints

| Name | Width | Target |
|------|-------|--------|
| Mobile | <640px | Phones |
| Small Tablet | 640-767px | Small tablets, large phones |
| Tablet | 768-1023px | Tablets |
| Desktop | 1024-1439px | Laptops, small desktops |
| Large Desktop | ≥1440px | Large monitors |

### Layout Rules

1. **Mobile-first**: Design for mobile, enhance for desktop
2. **Grid**: 12-column on desktop, stack on mobile
3. **Max content width**: `max-w-7xl` (1280px) centered
4. **Hero layout**: 2-column (44%/56%) on desktop, single on mobile
5. **Navigation**: Hamburger on mobile, horizontal on desktop
6. **Network visualization**: Hidden on mobile, full on desktop (lg+)

---

## 11. Dark Theme Specifications

Dateksys uses a dark-first design. The entire palette is designed for dark backgrounds.

### Surface Elevation

```
Base (#09090B)           ← Page background
  └── Surface (#111113)  ← Cards, panels
      └── Surface-2 (#1A1A1D)  ← Inputs, buttons, nested elements
```

### Glow & Light Effects

- **Background blobs**: Radial gradients at 4-11% opacity, 140-160px blur
- **Grid overlay**: Sky blue at 4.5% opacity, 80px grid
- **Noise grain**: SVG turbulence at 2.5% opacity, fixed position
- **Vignette**: Radial fade from transparent to 60% dark at edges

---

## AI Image Generation

### Base Prompt Template

```
Dark, premium, technical atmosphere. Deep black (#09090B) background with subtle sky blue (#38BDF8) accent lighting. Cool-toned, high contrast. Clean composition with modern geometric elements. Professional IT infrastructure aesthetic.
```

### Style Keywords

| Category | Keywords |
|----------|----------|
| Lighting | Cool-toned, dramatic, accent glow, sky blue rim light |
| Mood | Professional, technical, premium, reliable |
| Composition | Clean, centered, minimal, geometric |
| Treatment | High contrast, desaturated base, single accent color |
| Aesthetic | Modern dark, cinematic, infrastructure-grade |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-05 | Initial brand guidelines |
