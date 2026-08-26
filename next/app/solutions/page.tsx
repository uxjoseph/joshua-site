import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '솔루션 — TALOS · MICKY',
  description: '온톨로지 기술을 제품으로. 제조 AX 온톨로지 TALOS, AI 회의록·팀 맥락 에이전트 MICKY — 조슈아앤컴퍼니가 직접 만들어 운영하는 솔루션입니다.',
  alternates: { canonical: '/solutions' },
};

export default function SolutionsPage() {
  return (
    <main>
      <section className="section" style={{ paddingTop: '9rem' }}>
        <div className="inner">
          <p className="overline reveal">Solutions</p>
          <h2 className="reveal">직접 만들어 팔고 있는 <strong>솔루션</strong></h2>
          <p className="lead reveal">
            컨설팅만 하는 회사가 아닙니다. 산업 지식을 온톨로지로 연결하는 기술을 제품으로 만들어 직접 운영합니다.
            솔루션은 계속 늘어납니다.
          </p>
          <div className="sol-grid reveal" style={{ marginTop: '3rem' }}>
            <article className="sol-talos">
              <div className="sol-copy">
                <span className="mark">MICKY <span className="sol-no">Solution 01 · 팀 지능</span></span>
                <h3>AI 네이티브 조직을 위한<br /><strong>회의록 에이전트 솔루션</strong></h3>
                <p>회의만 진행하면 요약·액션·발표자료 같은 산출물이 자동으로 만들어지고, 쌓인 회의 맥락은 팀만 아는 에이전트로 자라납니다.</p>
                <div className="chips"><span>Bot-Free 녹음</span><span>Meeting-to-X</span><span>팀 지식그래프</span><span>미이행 약속 추적</span></div>
                <Link className="btn" href="/solutions/micky">MICKY 자세히 보기</Link>
              </div>
              <div className="sol-visual">
                <Image
                  src="/img_micky.webp"
                  alt="노트북에 띄운 MICKY 대시보드 — 정리된 회의 6건과 요약·액션 카드"
                  width={2140}
                  height={1160}
                  sizes="(min-width: 900px) 50vw, 100vw"
                />
              </div>
            </article>
            <article className="sol-next">
              <span className="tag">준비 중</span>
              <span className="mark-lite">TALOS</span>
              <span className="t">제조 AX 온톨로지 솔루션</span>
              <p style={{ fontSize: '.9rem' }}>제조업의 설비·공정·문서 지식을 하나의 온톨로지로 연결하는 두 번째 솔루션을 준비하고 있습니다.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
