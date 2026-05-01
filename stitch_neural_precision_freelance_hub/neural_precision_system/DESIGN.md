---
name: Neural Precision System
colors:
  surface: '#0f1417'
  surface-dim: '#0f1417'
  surface-bright: '#353a3d'
  surface-container-lowest: '#0a0f12'
  surface-container-low: '#171c1f'
  surface-container: '#1b2023'
  surface-container-high: '#262b2e'
  surface-container-highest: '#313539'
  on-surface: '#dfe3e7'
  on-surface-variant: '#bbc9cf'
  inverse-surface: '#dfe3e7'
  inverse-on-surface: '#2c3134'
  outline: '#859398'
  outline-variant: '#3c494e'
  surface-tint: '#3cd7ff'
  primary: '#a8e8ff'
  on-primary: '#003642'
  primary-container: '#00d4ff'
  on-primary-container: '#00586b'
  inverse-primary: '#00677e'
  secondary: '#d2bbff'
  on-secondary: '#3f008e'
  secondary-container: '#6001d1'
  on-secondary-container: '#c9aeff'
  tertiary: '#66fa8c'
  on-tertiary: '#003915'
  tertiary-container: '#45dd73'
  on-tertiary-container: '#005d27'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b4ebff'
  primary-fixed-dim: '#3cd7ff'
  on-primary-fixed: '#001f27'
  on-primary-fixed-variant: '#004e5f'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#6bff8f'
  tertiary-fixed-dim: '#4ae176'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005321'
  background: '#0f1417'
  on-background: '#dfe3e7'
  surface-variant: '#313539'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  code:
    fontFamily: monospace
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2.5rem
  xl: 4rem
  gutter: 24px
  container-max: 1280px
---

## Brand & Style

This design system is engineered to project a persona of high-tech reliability, surgical accuracy, and futuristic sophistication. It targets high-growth AI startups and data-driven enterprises that require the precision of a machine with the oversight of a specialist.

The visual style is a fusion of **Glassmorphism** and **Technical Minimalism**. It utilizes deep, layered canvases to create a sense of digital "space," punctuated by vibrant, neon-functional accents that guide the eye to critical data points. The atmosphere is quiet, focused, and authoritative—evoking the feeling of a high-end command center or a sophisticated IDE. Key stylistic markers include light-refracting borders, monospaced data readouts, and a structured grid-based layout that prioritizes information density without sacrificing clarity.

## Colors

The color palette is anchored in a "Dark Tech" spectrum, optimized for long-form data annotation tasks and high-contrast information display. 

- **Core Canvas:** The deep navy and slate tones provide a low-fatigue environment for focused work, using subtle shifts in hue to define hierarchy.
- **Electric Accents:** The Primary Cyan acts as the "action" color for navigation and primary buttons. The Secondary Violet is reserved for specialty AI/Machine Learning categories, while the Neon Green serves strictly as a "Highlight" for successful data validation or status indicators.
- **Functional Grays:** Text secondary and border colors are tuned to a cool temperature to maintain harmony with the dark blue base, ensuring the UI feels cohesive rather than fragmented.

## Typography

This design system utilizes a dual-typeface approach to balance technical authority with human readability.

- **Headings:** `spaceGrotesk` is used for all headlines and display text. Its geometric, slightly eccentric terminals provide the "cutting-edge" feel necessary for an AI-centric portfolio.
- **Body:** `manrope` serves as the workhorse for long-form content. Its balanced proportions ensure that descriptions of complex workflows remain legible and professional.
- **Specialty Labels:** For tags, small UI labels, and data points, use `spaceGrotesk` with increased letter spacing and uppercase styling to mimic a monospaced terminal readout without losing modern polish.

## Layout & Spacing

The layout philosophy is built on a **Fixed Grid** system to reflect mathematical precision. 

- **Grid:** Use a 12-column grid for desktop layouts with a fixed 24px gutter. Content should be centered within a 1280px container.
- **Rhythm:** Spacing follows a 4px baseline. Vertical margins between sections should be generous (`xl`) to allow the dark aesthetic to "breathe," while internal card padding should be tighter (`md`) to suggest high information density.
- **Patterns:** Implement a subtle 24px dot-matrix or circuit-line pattern in the background of hero sections and large containers to reinforce the technical theme.

## Elevation & Depth

Depth in this design system is achieved through **Glassmorphism and Tonal Layering** rather than traditional drop shadows.

- **Stacking:** The background (`#0A0E1A`) acts as the base. Surfaces (`#111827`) sit slightly above, and Cards (`#1A2235`) occupy the highest functional plane.
- **The Glass Effect:** Cards must utilize a backdrop-blur (12px to 20px) and a semi-transparent background fill. 
- **Luminous Borders:** Instead of shadows, use 1px solid or gradient strokes (`#1E293B`). On hover or for active states, these borders should glow using the Primary or Secondary accent colors with a soft outer glow (0px 0px 8px).
- **Scanlines:** A low-opacity (2-4%) horizontal scanline overlay can be applied to the highest-level surfaces to simulate a digital monitor effect.

## Shapes

The shape language is **Soft-Technical**. We avoid fully round "bubble" shapes to maintain a professional, serious tone, but we avoid 0px sharp corners to prevent the UI from feeling dated or aggressive.

- **Primary Radius:** Use `0.25rem` for buttons and small input fields.
- **Secondary Radius:** Use `0.5rem` for cards and larger containers.
- **Visual Accents:** Decorative elements like progress bar ends or circuit nodes should remain squared or use a 45-degree chamfered corner for a more "military-tech" aesthetic.

## Components

- **Buttons:** Primary buttons use a solid Cyan fill with dark text. Secondary buttons use a ghost style with a Cyan 1px border and a subtle glow on hover.
- **Glass Cards:** Feature a 1px top-left highlight border to simulate light hitting glass. Internal padding is consistent at `1.5rem`.
- **Data Visualizations:** Progress bars are rendered as thin, segmented lines rather than solid bars. Use the Neon Green (`Highlight`) for completed states and Cyan for active states.
- **Chips/Tags:** Small, rectangular tags with `label-mono` typography. Backgrounds should be low-opacity versions of the accent colors (e.g., 10% Cyan fill with 100% Cyan text).
- **Input Fields:** Dark slate background with a 1px border that transitions to Cyan on focus. Use a monospaced font for data input to emphasize precision.
- **Circuit Elements:** Decorative lines that connect cards or sections should be 1px wide, using the Border color, with small 4px squares (nodes) at terminal points.