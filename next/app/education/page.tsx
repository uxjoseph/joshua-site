import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { EDUCATION } from '@/lib/data';

export const metadata: Metadata = {
  title: '기업 AI 교육 - 임원 특강부터 8주 트레이닝까지',
  description: '카카오뱅크·신한은행·LG전자·삼성전자·SK 등 12개 조직이 선택한 기업 AI 교육. 임원 특강, 직무별 실습 워크숍, 8주 집중 트레이닝으로 조직의 AI 역량을 내재화합니다.',
  alternates: { canonical: '/education' },
};

export default function EducationPage() {
  return (
    <main>
      <section className="section" style={{ paddingTop: '9rem' }}>
        <div className="inner">
          <p className="overline reveal">Corporate Education</p>
          <h2 className="reveal">기업이 다시 찾는 <strong>교육</strong></h2>
          <p className="lead reveal">
            한 번 듣고 끝나는 특강이 아니라, 업무가 바뀌는 교육을 설계합니다. 임원 의사결정 특강부터
            비개발자가 직접 자동화 도구를 만드는 8주 트레이닝까지, 12개 조직이 검증했습니다.
          </p>
          <div className="pf-feature reveal" style={{ marginTop: '3rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {EDUCATION.map((e) => (
              <article className="pf-card" key={e.client + e.title}>
                {e.image && (
                  <div className="thumb">
                    <Image src={e.image} alt={`조슈아앤컴퍼니 기업 AI 교육, ${e.client} ${e.title} 현장`} width={560} height={360} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div className="pad">
                  <span className="cat">{e.client} · {e.year}</span>
                  <h3>{e.title}</h3>
                  <p>{e.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="hero-cta reveal" style={{ justifyContent: 'flex-start', marginTop: '3rem' }}>
            <Link className="btn btn-primary" href="/contact" data-cta-location="page_bottom">교육 문의하기</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
