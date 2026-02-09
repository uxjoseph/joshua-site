# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Joshua AI Automation Agency 공식 웹사이트 - Korean AI automation agency landing page built with React 19, Vite, and Framer Motion animations.

## Commands

```bash
npm install    # Install dependencies
npm run dev    # Start dev server on http://localhost:3000
npm run build  # Production build
npm run preview # Preview production build
```

## Architecture

**Entry Flow:** `index.html` → `index.tsx` → `App.tsx` → Section components

**Styling:** Tailwind CSS loaded via CDN in `index.html` with custom Tailwind config inline. Uses Pretendard font (Korean-optimized).

**Animation System:** Framer Motion wrappers in `components/FadeIn.tsx`:
- `FadeIn` - Scroll-triggered fade with direction/blur/scale options
- `CharReveal` - Staggered character animation for headlines
- `TextReveal` - Slide-up text reveal
- `ParallaxImage` - Scroll-linked parallax effect
- `ScrollRevealText` - Opacity fade on scroll progress

**Component Structure:** Single-page app with section components rendered in order:
- `Navbar` (fixed navigation)
- `Hero` → `Manifesto` → `FeatureSection` → `ProcessSection` → `PortfolioSection` → `FAQSection`
- `ContactFooter`

**Type Definitions:** `types.ts` contains shared interfaces for `NavItem`, `FeatureProps`, `ProcessStepProps`, `PortfolioItemProps`, `FaqItemProps`.

**Path Alias:** `@/` maps to project root via Vite config.

## Key Conventions

- Korean language content (ko locale)
- Zinc color palette (zinc-900 primary, zinc-100 secondary)
- All animation components should use `useInView` with `once: true` for scroll-triggered effects
- Lucide React for icons
