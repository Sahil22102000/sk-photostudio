# Design Brief: SK PHOTOSTUDIO

## Purpose & Context
Premium photography studio website for SK PHOTOSTUDIO, Khapri, Maharashtra. Clean light mode with warm amber/gold accents reflecting photography warmth. Showcases 4 core services, portfolio gallery, testimonials, appointment booking, and WhatsApp integration. Emphasizes beautiful imagery, editorial composition, and approachable professionalism.

## Tone
Premium photography aesthetic, warm and inviting. Editorial composition with sophisticated restraint. Warm amber accent used sparingly on CTAs and highlights. Light, airy backgrounds let imagery shine.

## Differentiation
Warm amber/gold accent system paired with crisp whites and deep charcoal. Realistic photography images dominate (Unsplash URLs). Clean card layouts with minimal shadows. Portfolio gallery as hero showcase. Warm color temperature throughout creates premium, photography-focused identity distinct from generic studio websites.

## Color Palette (Light Mode OKLCH)

| Role | OKLCH | Usage |
|------|-------|-------|
| **Background** | 0.99 0.01 75 | Crisp warm white, photography-neutral |
| **Foreground** | 0.25 0.02 0 | Deep charcoal text, high contrast |
| **Card** | 0.98 0.02 75 | Warm off-white card surface |
| **Primary** | 0.65 0.18 75 | Warm amber/gold — CTAs, highlights |
| **Secondary** | 0.75 0.05 75 | Soft taupe — editorial accents |
| **Accent** | 0.25 0.02 0 | Deep charcoal — sparingly for active states |
| **Muted** | 0.92 0.02 0 | Light grey — subtle borders |
| **Border** | 0.88 0.02 75 | Warm grey — card edges |

## Typography

| Layer | Font | Usage |
|-------|------|-------|
| **Display** | General Sans | Headings, service titles, emphasis |
| **Body** | DMSans/Inter | Body copy, navigation, descriptions |
| **Mono** | JetBrains Mono | Stats, ratings, technical content |

**Type Scale:** 12px (sm), 14px (base), 16px (lg), 24px (xl), 32px (2xl), 48px (3xl)

## Elevation & Depth
- **Card:** `bg-card` with 1px `border-border/40`, minimal shadow
- **Elevated:** `shadow-elevated` for hover/active states
- **Glass:** Semi-transparent card with warm backdrop blur
- **Hero:** Full-width photography imagery with text overlay

## Structural Zones

| Zone | Background | Border | Purpose |
|------|------------|--------|---------|
| **Header** | `bg-card/95` | `border-b border-border/20` | Logo, navigation, contact button, sticky |
| **Hero** | Imagery full-bleed | None | Photography showcase with CTA overlay |
| **Service Cards** | `bg-card` | `border border-border/30` | 4 service boxes, grid layout |
| **Portfolio Grid** | `bg-background` | None | 9 work card gallery, alternating rhythm |
| **Testimonials** | `bg-card/40` | None | Carousel, 5-star ratings |
| **Booking Form** | `bg-card` | `border border-border/30` | Input fields, warm accent submit |
| **CTA Button** | `bg-primary` | None | Warm amber, rounded-sm, glow on hover |
| **Footer** | `bg-muted/5` | `border-t border-border/20` | Contact, hours, copyright, warm accents |

## Spacing & Rhythm
- **Horizontal padding:** 20px (sm), 40px (lg), 80px (xl screens)
- **Vertical gap:** 48px (sections), 20px (cards within grid)
- **Gutter:** 16px between grid items
- **Breathing room:** Hero min 50vh, sections min 40vh

## Component Patterns
- **Buttons:** Warm amber primary, deep charcoal text. Minimal rounded-sm. Subtle glow on hover.
- **Cards:** Solid card background with warm border. Hover: lift + warm shadow.
- **Inputs:** Warm card background, amber accent on focus.
- **Links:** Warm amber underline on hover.
- **Badges:** Muted background, foreground text, amber accent for ratings.

## Motion & Choreography
- **Entrance:** Fade-in (0.5s) + scale-in for cards, portfolio images
- **Hover:** Scale (0.98 → 1.02) + warm glow on interactive elements
- **Gallery:** Smooth image transitions, lazy loading for performance
- **Form:** Smooth input focus transitions, success state feedback
- **Transition Default:** 0.3s cubic-bezier(0.4, 0, 0.2, 1) on all state changes

## Constraints
- Light mode only — no dark mode artifacts
- Warm amber used sparingly on CTAs, not scattered
- Realistic photography images required (Unsplash URLs)
- Minimal shadows — editorial lightness prioritized
- High contrast foreground/background for readability
- Phone number 080554 69120 must be prominently visible
- WhatsApp button opens pre-filled message on click

## Signature Detail
Warm amber accent system paired with premium photography imagery creates sophisticated, approachable studio identity. Clean white backgrounds let photography shine. Minimal UI chrome emphasizes content over decoration.
