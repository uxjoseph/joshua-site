# TALOS design.md — Editorial Light System (ElevenLabs 벤치마크)

> 2026-07-20 전면 개편 기준. 다크 브론즈 v1을 폐기하고 에디토리얼 라이트로 전환.
> 원본 레퍼런스: ElevenLabs design system (사용자 제공 분석 문서 기반).

## Overview
조용한 인쇄 매거진처럼 읽히는 산업 AI 랜딩. 오프화이트 캔버스 위에 웜 니어블랙 잉크.
브랜드 볼티지는 **채도가 아니라 분위기(atmosphere)** — 파스텔 그라디언트 오브(민트·피치·라벤더·스카이·로즈)가
유일한 "컬러" 순간. 네온 액센트 금지, 채도 높은 CTA 컬러 금지, 다크 캔버스 금지(희소한 다크 인버전 밴드 제외).

## Colors
### Brand & Accent
- `--primary`: #292524 (잉크 필 CTA — 유일한 액션 컬러)
- `--primary-active`: #0c0a09

### Surface
- `--canvas`: #f5f5f5 · `--canvas-soft`: #fafafa · `--surface-card`: #ffffff
- `--surface-strong`: #f0efed (배지, 아이콘 플레이트)
- `--surface-dark`: #0c0a09 · `--surface-dark-elevated`: #1c1917 (희소 다크 밴드)

### Hairlines
- `--hairline`: #e7e5e4 · `--hairline-soft`: #f0efed · `--hairline-strong`: #d6d3d1

### Text
- `--ink`: #0c0a09 · `--body`: #4e4e4e · `--body-strong`: #292524
- `--muted`: #777169 · `--muted-soft`: #a8a29e
- `--on-primary` / `--on-dark`: #ffffff · `--on-dark-soft`: #a8a29e

### Atmospheric Gradient Stops (시그니처 — 장식 전용)
- mint #a7e5d3 · peach #f4c5a8 · lavender #c8b8e0 · sky #a8c8e8 · rose #e8b8c4
- 오직 radial-gradient 오브·히어로 배경 블룸으로만. 버튼 fill·텍스트 컬러 금지.

### Semantic
- success #16a34a · error #dc2626

## Typography (2026-07-20 개정: Pretendard 단일 패밀리)
- Display: **Pretendard 300 (Light)** — 네거티브 자간(-0.03~-0.04em). 강조는 볼드가 아니라
  같은 문장 안 **weight 대비(300 vs 600)** 로. 워드마크는 700 + 0.22em 트래킹.
- Body: **Pretendard 400/500**. 자간 +0.16px (에디토리얼 트래킹).
- 숫자(stat): Pretendard 200, tabular-nums.
- Scale: display-mega 64/300/-1.92px · display-xl 48 · display-lg 36 · display-md 32 · display-sm 24
  title-md 20/500(Inter) · body-md 16/400/+0.16px · caption-uppercase 12/600/+0.96px · button 15/500

## Layout
- 4px base unit. 섹션 리듬 96px. 컨테이너 max 1200px.
- 카드 그리드: 3-up(혜택) / 2-up(히어로 스플릿) → 태블릿 2-up → 모바일 1-up.

## Elevation
- hairline(1px #e7e5e4) + 단일 소프트 섀도 `0 4px 16px rgba(0,0,0,0.04)` (호버 카드).
- 깊이는 그라디언트 오브가 담당.

## Shapes
- pill 9999px (모든 CTA·배지) · xl 16px (피처 카드·프라이싱) · xxl 24px (오브 카드) · md 8px (인풋)

## Components (TALOS 적용)
- top-nav: 캔버스 배경, 64px, 워드마크 좌 / 메뉴 중 / 잉크 필 CTA 우
- hero-band: display-mega 헤드라인 + 배경 그라디언트 오브 + 잉크 필 CTA + 아웃라인 CTA
- gradient-orb-card: canvas-soft, 24px 라운드, 오브 1종 배경
- feature-card: white, 16px 라운드, 1px hairline, padding 24
- pricing-tier-featured(→ AX 진단 카드): 다크 인버전 #0c0a09 + white 텍스트
- text-input: white, 8px 라운드, 44px, 1px hairline-strong, focus 시 2px 잉크
- badge-pill: surface-strong, caption-uppercase
- cta-band / footer: 캔버스, 에디토리얼 페이싱

## Do / Don't
- DO: 잉크 필 = 유일한 CTA. 디스플레이 300 유지. 오브는 장식만. 필 지오메트리.
- DON'T: 채도 CTA 도입 금지. 디스플레이 볼드 금지. 오브를 버튼/텍스트에 사용 금지.
  본문을 300으로 낮추지 말 것(가독성).

## TALOS 고유 규칙 (PRD 유지 사항)
- 브랜드명·태그라인·키는 main.js CONFIG + CSS 변수로만 (하드코딩 금지)
- 수치(6주·2일·70%)는 반드시 출처 각주와 함께
- Cognite/Palantir 언급은 S4 주석 1회 한정, 로고 금지
- 고객사 익명 표기 (SHOW_CLIENT_LOGOS=false)
- 폼: 기존 조슈아 Resend 파이프라인 → hello@joshua.site
