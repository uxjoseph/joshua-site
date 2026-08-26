# joshua.site 배포 안내

조슈아앤컴퍼니 웹사이트 소스입니다. 아래 내용만 확인하시면 바로 배포 가능합니다.

## 스택

| 항목 | 값 |
|---|---|
| 프레임워크 | Next.js 15.5 (App Router) |
| 런타임 | React 19, TypeScript 5.8 |
| 메일 발송 | Resend (`/api/contact`, Edge Runtime) |
| 로컬 검증 환경 | Node v24.13.1 / npm 11.8.0 |
| 스타일 | CSS 단일 파일 (`app/globals.css`) — Tailwind 등 별도 빌드 없음 |

## 실행

```bash
npm install
npm run dev     # 개발 서버 — http://localhost:3100
npm run build   # 프로덕션 빌드
npm start       # 빌드 결과 실행 — http://localhost:3100
```

포트는 `package.json`의 scripts에 `-p 3100`으로 고정돼 있습니다. 호스팅 환경에 맞춰 바꾸셔도 됩니다.

**빌드 확인 완료** — 2026-08-08 기준 `npm run build` 정상 통과, 26개 페이지 정적 생성.

## 필수 환경변수

문의 폼(`/api/contact`) 동작에 **1개**가 필요합니다.

```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

- 이 값이 없으면 폼 제출 시 500이 떨어집니다. 페이지 렌더링 자체는 영향 없습니다.
- 소스에는 키가 포함돼 있지 않습니다. 호스팅 플랫폼의 환경변수에 직접 넣어주세요.
- 키는 조슈아앤컴퍼니 측 Resend 계정에서 발급받으시면 됩니다.

## Resend 도메인 인증

`app/api/contact/route.ts`가 아래 주소로 메일을 보냅니다.

- 발신: `JOSHUA <hello@joshua.site>`
- 알림 수신: `hello@joshua.site`
- 문의자에게 자동 회신 1통 추가 발송

Resend 대시보드에서 **`joshua.site` 도메인이 verified 상태**여야 발송됩니다. DNS(SPF/DKIM) 레코드 등록이 필요합니다.

## 배포 시 확인할 것

1. **사이트 URL** — `lib/data.ts`의 `SITE.url`이 `https://joshua.site`로 하드코딩돼 있습니다. sitemap·robots·OG 메타태그가 이 값을 씁니다. 다른 도메인에 올리면 이 값을 바꿔주세요.
2. **리다이렉트 3건** — `next.config.ts`에 301 설정이 있습니다. 기존 사이트 경로 호환용이니 유지해주세요.
   - `/newsletter`, `/newsletter/:slug` → `/insights`
   - `/talos` → `/solutions/talos`
3. **Edge Runtime** — `/api/contact`는 `runtime = 'edge'`입니다. Vercel·Cloudflare 계열은 그대로 동작하고, Node 전용 환경에 올리실 경우 이 선언을 지우면 Node 런타임으로 돕니다.
4. **회사소개서 PDF** — `public/joshua-company-profile.pdf` (8MB). 메인 히어로의 `회사소개서 보기` 버튼이 새 탭으로 엽니다. `public/` 전체가 16MB라 일부 호스팅의 무료 플랜 용량 제한을 확인해주세요. 소개서 갱신 시 **같은 파일명으로 덮어쓰면** 코드 수정이 필요 없습니다.
5. **이미지 최적화** — `next/image` 기본 설정을 씁니다. 별도 로더 설정은 없습니다.

## 포함되지 않은 것

`node_modules`, `.next`(빌드 산출물), `.DS_Store`, 에디터·툴 설정은 제외했습니다. `npm install` 후 사용해주세요.

## 파일 구조

```
app/              페이지 (App Router)
  globals.css     디자인 시스템 전체 — 토큰·컴포넌트 스타일 단일 구현체
  api/contact/    문의 폼 API
components/       Nav, Footer, ContactForm, TechScroller 등
lib/data.ts       프로젝트·교육·팀·FAQ 실데이터 + 사이트 상수(SITE)
public/           이미지·로고·회사소개서 PDF
design.md         디자인 스펙 문서
README-DESIGN.md  디자인 가이드
```

카피·프로젝트 목록 등 콘텐츠 수정은 대부분 `lib/data.ts`와 `app/page.tsx`에서 이뤄집니다.
