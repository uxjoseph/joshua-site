import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'AX 포트폴리오 - 결과로 증명한 프로젝트',
  description: 'SK그룹 전사 AX 전환, 75,000건 지식자산 RAG 체계화, 8주→1일 조직문화 진단 자동화, 이천포럼 AI 페르소나 라이브까지, 조슈아앤컴퍼니의 엔터프라이즈 AX 프로젝트.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <main>
      <section className="section" style={{ paddingTop: '9rem' }}>
        <div className="inner">
          <p className="overline reveal">Featured Case Studies</p>
          <h2 className="reveal">결과로 증명한 <strong>프로젝트</strong></h2>
          <p className="lead reveal">엔터프라이즈 환경에서 실제로 운영 중인 AX 시스템들입니다. 데모가 아니라 배포된 결과물로 말합니다.</p>
          <div className="pf-feature reveal" style={{ marginTop: '3rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {PROJECTS.map((p) => (
              <Link className="pf-card" href={`/work/${p.slug}`} key={p.slug}>
                <div className="thumb">
                  <Image src={p.image} alt={p.title} width={640} height={400} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div className="pad">
                  <span className="cat">{p.category} · {p.year}</span>
                  <h3>{p.hook ?? p.title}</h3>
                  <p>{p.description}</p>
                  <span className="more">자세히 보기 →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="hero-cta reveal" style={{ justifyContent: 'flex-start', marginTop: '3rem' }}>
            <Link className="btn btn-primary" href="/contact">프로젝트 문의하기</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
