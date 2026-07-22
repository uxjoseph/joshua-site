import type { Metadata } from 'next';
import Link from 'next/link';

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
              <span className="mark">TALOS <span className="sol-no">Solution 01 · 제조</span></span>
              <h3>제조 AX 온톨로지의 시작, <strong>탈로스</strong></h3>
              <p>설비·공정·문서·사람의 지식을 하나의 온톨로지로 연결하고, 6주 안에 현업이 쓰는 AI 앱을 만듭니다.</p>
              <div className="chips"><span>산업 지식그래프</span><span>근본원인분석</span><span>예지보전</span><span>현장점검 디지털화</span></div>
              <Link className="btn" href="/solutions/talos">TALOS 자세히 보기</Link>
            </article>
            <article className="sol-micky">
              <span className="mark">MICKY <span className="sol-no">Solution 02 · 팀 지능</span></span>
              <h3>회의에만 집중하세요,<br /><strong>나머지는 미키가</strong></h3>
              <p>봇 없이 회의를 녹음·분석해 요약·액션·발표자료까지 자동 생성하고, 쌓인 회의 맥락이 팀만 아는 에이전트가 됩니다.</p>
              <div className="chips"><span>Bot-Free 녹음</span><span>Meeting-to-X</span><span>팀 지식그래프</span><span>미이행 약속 추적</span></div>
              <Link className="btn btn-outline" href="/solutions/micky">MICKY 자세히 보기</Link>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
