import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/lib/articles';

export const metadata: Metadata = {
  title: '인사이트 & 뉴스레터 - AX를 먼저 겪은 사람의 기록',
  description: 'AX·온톨로지·AI 에이전트에 대한 정의형 인사이트와 조쉬의 뉴스레터. 현장에서 직접 구축하며 배운 것들을 기록합니다.',
  alternates: { canonical: '/insights' },
};

export default function InsightsPage() {
  return (
    <main>
      <section className="section" style={{ paddingTop: '9rem' }}>
        <div className="inner">
          <p className="overline reveal">Insights &amp; Newsletter</p>
          <h2 className="reveal">AX를 먼저 겪은 사람의 <strong>기록</strong></h2>
          <p className="lead reveal">현장에서 직접 구축하며 배운 것들을 기록합니다. 조쉬의 뉴스레터 아카이브도 이곳으로 통합될 예정입니다.</p>
          <div className="ins reveal" style={{ marginTop: '3rem' }}>
            {ARTICLES.map((a) => (
              <Link className="card" href={`/insights/${a.slug}`} key={a.slug}>
                <span className="cat">{a.category}</span>
                <h3>{a.title}</h3>
                <p>{a.description}</p>
                <p style={{ marginTop: '.8rem', fontSize: '.8rem' }}>{a.datePublished} · {a.readMinutes}분 읽기</p>
              </Link>
            ))}
            <article className="card">
              <span className="cat">Newsletter</span>
              <h3>조쉬의 뉴스레터 (아카이브 통합 예정)</h3>
              <p>기존 발행분을 joshua.site로 이전하고 있습니다. 새 회차 소식은 문의 페이지에서 구독 신청으로 받아보실 수 있습니다.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
