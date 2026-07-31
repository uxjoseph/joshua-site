import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Effects } from '@/components/Effects';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: '조슈아앤컴퍼니 JOSHUA — 교육부터 구축, 운영까지 AX 파트너',
    template: '%s | JOSHUA 조슈아앤컴퍼니',
  },
  description:
    '배우는 것에서 끝나지 않는 AX. 조슈아앤컴퍼니는 기업교육, AX 구축, 온톨로지 솔루션(TALOS·MICKY)까지 끝까지 책임지는 독립 AX 파트너입니다.',
  keywords: ['AX', 'AI 전환', 'AI 컨설팅', '기업 AI 교육', '온톨로지', '제조 AX', 'AI 자동화', 'TALOS', 'MICKY', '조슈아앤컴퍼니'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE.url,
    siteName: 'JOSHUA 조슈아앤컴퍼니',
    title: '조슈아앤컴퍼니 — 교육부터 구축, 운영까지 AX 파트너',
    description: 'AI 교육 12개 조직 · 엔터프라이즈 AX 10건 · 온톨로지 솔루션 TALOS·MICKY. 독립 AX 파트너 조슈아앤컴퍼니.',
    images: ['/JOSHUA.png'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/JOSHUA.png' },
};

// GEO: Organization 스키마 — AI 검색·지식그래프가 인용할 회사 정본
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.legalName,
  alternateName: ['JOSHUA', '조슈아앤컴퍼니', 'Joshua & Company'],
  url: SITE.url,
  logo: `${SITE.url}/JOSHUA.png`,
  email: SITE.email,
  telephone: SITE.phone,
  taxID: SITE.bizNo,
  founder: { '@type': 'Person', name: SITE.ceo },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KR',
    addressLocality: '서울특별시 구로구',
    streetAddress: '디지털로26길 43, 엘동 502호',
  },
  sameAs: [SITE.sns.youtube, SITE.sns.linkedin, SITE.sns.threads],
  description:
    '독립 AX 컨설팅·구현사. 기업 AI 교육, AX 시스템 구축, 온톨로지 기반 솔루션(TALOS 제조 AX, MICKY AI 회의록)을 제공합니다.',
  knowsAbout: ['AI Transformation', '온톨로지', '지식그래프', 'RAG', 'AI 에이전트', '기업 AI 교육', '제조 AX'],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '기업 AI 교육', description: '임원 특강, 직무별 워크숍, 8주 집중 트레이닝' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AX 구축', description: 'AI 자동화 시스템 설계·구현 — MVP 4~8주' } },
    { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'TALOS', description: '제조 AX 온톨로지 솔루션', applicationCategory: 'BusinessApplication' } },
    { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'MICKY', description: 'AI 회의록·팀 맥락 에이전트', applicationCategory: 'BusinessApplication', url: 'https://micky.joshua.site' } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <Effects />
      </body>
    </html>
  );
}
