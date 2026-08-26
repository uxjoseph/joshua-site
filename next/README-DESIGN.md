# joshua-site next/ — 디자인용 번들

`uxjoseph/joshua-site` 저장소의 `next/` 디렉터리(현재 상용 서비스 중인 Next.js 15 App Router 앱)에서
**소스와 실제로 참조되는 이미지만** 추린 묶음입니다.

- 추출 기준 커밋: `f44b753`
- 추출일: 2026-07-28

## 구성

| 경로 | 내용 |
|---|---|
| `app/` | 페이지 + 레이아웃 + `globals.css` (전역 스타일 전부 여기에 있음) |
| `components/` | `Nav` / `Footer` / `ContactForm` / `Effects` |
| `lib/data.ts` | 프로젝트·로고·팀·교육 데이터 (이미지 경로가 여기서 연결됨) |
| `lib/articles.ts` | 인사이트 아티클 데이터 |
| `public/` | 소스에서 참조되는 이미지 38개만 |

## 화면 목록

```
/                        app/page.tsx           홈 (히어로·지표·솔루션·팀)
/work                    app/work/page.tsx      프로젝트 목록
/work/[slug]             app/work/[slug]/       프로젝트 상세
/solutions               app/solutions/         솔루션 목록
/solutions/micky         app/solutions/micky/   MICKY
/solutions/talos         app/solutions/talos/   TALOS (준비 중)
/education               app/education/         교육
/insights                app/insights/          인사이트 목록
/insights/[slug]         app/insights/[slug]/   인사이트 상세
/contact                 app/contact/           문의
/privacy                 app/privacy/           개인정보처리방침
```

## 이미지 연결 지점

| 자산 | 쓰이는 곳 |
|---|---|
| `JOSHUA.png` | 로고 — `components/Nav.tsx`, `components/Footer.tsx`, OG 이미지(`app/layout.tsx`) |
| `micky-app.webp` | MICKY 목업 — `app/page.tsx`, `app/solutions/page.tsx` |
| `logos/*` (16) | 고객사 로고 스트립 — `lib/data.ts` |
| `portfolio/ax-2026-*.png` (10) | 프로젝트 카드 썸네일 — `lib/data.ts` |
| `portfolio/education/*` (7) | 교육 이력 이미지 — `lib/data.ts` |
| `team-josh.png` / `team-jaeho.jpg` / `team-ian.png` | 팀 프로필 — `lib/data.ts` |

## 이 번들에서 제외한 것

- `node_modules/`, `.next/` — 빌드 산출물
- `public/portfolio/skms/` (13개) — 소스 어디에서도 참조되지 않음
- 미참조 `portfolio/ax-2026-*.png` 16개 (`-00 -01 -03 -10 -11 -20 -22 -31 -32 -33 -40 -41 -43 -50 -51 -53`)
- `public/llms.txt` — 이미지·레이아웃과 무관한 LLM 크롤러용 텍스트
- `public/logos/.claude/worklog/` — Claude Code 세션 로그 (디자인 자산 아님)

## 로컬 실행

```bash
npm ci
npm run dev   # http://localhost:3100
```
