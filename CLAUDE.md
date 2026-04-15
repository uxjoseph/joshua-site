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

---

## 하네스 규칙 (실제 incident 기반)

### SPA Fallback Rule — CRITICAL
첫 프로덕션 배포에서 /newsletter, /education이 404를 리턴했다. vercel.json의 `"rewrites": [{"source":"/(.*)", "destination":"/index.html"}]`가 없었기 때문이다.
- **하지 말 것**: vercel.json을 삭제하거나 rewrite 규칙을 제거하지 마라.
- **할 것**: 새 라우트를 추가할 때 `curl -sI https://joshua.site/<새경로>`로 200 확인.

### Ghost Integrity Token Rule
Ghost Members API(`/members/api/send-magic-link/`)를 integrity token 없이 호출하면 `BadRequestError`가 떨어진다.
- **하지 말 것**: `send-magic-link`에 body만 던지지 마라.
- **할 것**: 반드시 `GET /members/api/integrity-token/` → 응답값을 body의 `integrityToken` 필드에 포함. `lib/ghost.ts:fetchIntegrityToken()` 참고.

### Deploy Order Rule
환경변수(`VITE_GHOST_*`)가 Vercel에 미등록된 상태로 배포하면 Ghost 연동이 전부 깨진다. 빌드는 성공하지만 런타임에 undefined URL로 fetch한다.
- **배포 순서**: env var 등록 → `vercel --prod --yes`. 순서 뒤집지 마라.

### Infra Verification Rule
배포 플랫폼·도메인·Git 권한을 간접 단서(.vercel in gitignore, public repo 접근 등)로 단정하면 안 된다. 이 프로젝트에서 3회 연속 틀렸다.
- **할 것**: `dig` (DNS), `curl -sI` (호스팅), `git ls-remote` (push 가능 여부)로 검증한 뒤 말해라.

### Education Data Rule
기업 교육 이력에 더미 기업명이 들어간 채로 배포된 적이 있다. B2B 사이트에서 고객 레퍼런스는 영업 자산이다.
- **하지 말 것**: metadata.json의 education 항목에 실제 자료 없이 기업명·강의 내용을 지어내지 마라.
- **할 것**: 반드시 조쉬님이 제공한 1차 자료 기반으로만 작성.
