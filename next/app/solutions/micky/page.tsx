import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MICKY 미키 — AI 회의록·팀 맥락 에이전트',
  description:
    '봇 없이 회의를 녹음·분석해 요약·액션·발표자료까지 자동 생성하는 AI 회의록 MICKY. 쌓인 회의 맥락이 팀만 아는 에이전트가 됩니다. 한국어 직급·존댓말 맥락 보존.',
  alternates: { canonical: '/solutions/micky' },
  keywords: ['AI 회의록', '회의 요약', 'AI 미팅 노트', '팀 에이전트', '지식그래프', 'MICKY', '미키'],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MICKY (미키)',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'macOS',
  url: 'https://micky.joshua.site',
  description: 'AI 회의록·회의 요약 자동 생성 서비스. 봇 없이 기기에서 직접 녹음하고, 회의가 끝나면 요약·액션·발표자료·문서가 완성됩니다. 누적된 회의 맥락이 팀 전용 에이전트가 됩니다.',
  provider: { '@type': 'Organization', name: '주식회사 조슈아앤컴퍼니', url: 'https://joshua.site' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW', description: 'Free 플랜 — 월 5시간 녹음' },
};

export default function MickyPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="section" style={{ paddingTop: '9rem' }}>
        <div className="inner">
          <p className="overline reveal">Solution 02 · Team Intelligence</p>
          <h2 className="reveal">회의에만 집중하세요,<br /><strong>나머지는 미키가 할게요</strong></h2>
          <p className="lead reveal">
            봇 없이 기기에서 직접 녹음하고, 회의가 끝나면 요약·주요 결정·액션 아이템부터 발표자료·문서까지
            완성됩니다. 그리고 쌓인 회의 맥락은 팀만 아는 에이전트가 됩니다.
          </p>
          <div className="hero-cta reveal" style={{ justifyContent: 'flex-start' }}>
            <a className="btn btn-primary" href="https://micky.joshua.site" target="_blank" rel="noopener">베타 신청하기</a>
            <Link className="btn btn-outline" href="/contact">팀 도입 문의</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <p className="overline reveal">Why MICKY</p>
          <h2 className="reveal">단순 회의록이 아니라,<br /><strong>팀의 맥락 자산</strong></h2>
          <div className="grid3 reveal" style={{ marginTop: '2.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            <article className="card"><span className="step-en">Bot-Free</span><h3>봇 없이 녹음</h3><p>회의에 봇을 초대하지 마세요. macOS에서 조용히, 맥락까지 정확하게. Zoom·Meet·Teams·WebEx 지원.</p></article>
            <article className="card"><span className="step-en">Korean-Native</span><h3>한국어 맥락 보존</h3><p>화자 분리와 함께 한국어 특유의 직급·존댓말 맥락까지 끝까지 보존합니다.</p></article>
            <article className="card"><span className="step-en">Meeting-to-X</span><h3>회의가 산출물로</h3><p>논의가 끝나는 즉시 슬라이드·후속 메일·보고서로. Slack·Notion에 액션 아이템 자동 전송.</p></article>
            <article className="card"><span className="step-en">Team Brain</span><h3>팀 지식그래프</h3><p>회의의 개념·사람·프로젝트를 자동 연결해, 과거 맥락에 근거해 답하는 팀 전용 에이전트를 만듭니다.</p></article>
            <article className="card"><span className="step-en">Follow-through</span><h3>미이행 약속 추적</h3><p>회의에서 한 약속이 이행됐는지 자동 추적하고, 충돌하는 결정을 감지합니다.</p></article>
            <article className="card"><span className="step-en">Security</span><h3>한국 리전 격리 저장</h3><p>서울 리전에 사용자별 격리 저장, 모든 AI 처리에 학습 미사용 정책 적용.</p></article>
          </div>
          <div className="hero-cta reveal" style={{ justifyContent: 'flex-start', marginTop: '2.5rem' }}>
            <a className="btn btn-primary" href="https://micky.joshua.site" target="_blank" rel="noopener">micky.joshua.site에서 자세히 보기</a>
          </div>
        </div>
      </section>
    </main>
  );
}
