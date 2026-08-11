import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'TALOS 탈로스 - 제조 AX 온톨로지 솔루션',
  description:
    '제조 AX 온톨로지의 시작, 탈로스. MES·ERP·도면·현장 기록을 하나의 산업 지식그래프로 연결하고 6주 안에 현업이 쓰는 AI 앱을 배포합니다. 무료 AX 진단으로 시작하세요.',
  alternates: { canonical: '/solutions/talos' },
  keywords: ['제조 AX', '온톨로지', '산업 지식그래프', '제조 AI 솔루션', '근본원인분석', '예지보전', 'TALOS', '탈로스'],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TALOS (탈로스)',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: '제조업을 위한 AX 온톨로지 솔루션. 설비·공정·문서·사람의 지식을 산업 지식그래프로 연결하고 AI 에이전트가 근본원인분석·예지보전·일정 최적화를 수행합니다.',
  provider: { '@type': 'Organization', name: '주식회사 조슈아앤컴퍼니', url: 'https://joshua.site' },
  offers: { '@type': 'Offer', description: '무료 AX 진단 (2주)' },
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '기존 MES·ERP를 바꿔야 하나요?', acceptedAnswer: { '@type': 'Answer', text: '아니요, 연결합니다. 온톨로지는 기존 시스템을 대체하는 것이 아니라 그 위에서 데이터를 연결하는 계층입니다. 운영 중인 시스템은 그대로 유지됩니다.' } },
    { '@type': 'Question', name: '데이터 보안은 어떻게 처리되나요?', acceptedAnswer: { '@type': 'Answer', text: '고객 환경 내 처리를 원칙으로 합니다. 데이터는 귀사의 인프라(온프레미스 또는 귀사 클라우드) 안에서 처리되며, 외부 반출 없이 구축합니다.' } },
    { '@type': 'Question', name: '어떤 공장부터 가능한가요?', acceptedAnswer: { '@type': 'Answer', text: '센서 데이터가 없어도 시작할 수 있습니다. MES·ERP·엑셀·점검일지 등 지금 있는 데이터에서 출발해, 진단 단계에서 가장 효과 큰 지점을 함께 찾습니다.' } },
  ],
};

export default function TalosPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="section" style={{ paddingTop: '9rem' }}>
        <div className="inner">
          <p className="overline reveal">Solution 01 · Industrial AX Ontology</p>
          <h2 className="reveal">제조 AX 온톨로지의 시작,<br /><strong>탈로스 TALOS</strong></h2>
          <p className="lead reveal">
            데이터를 연결하면, 공장이 답하기 시작합니다. 설비·공정·문서·사람의 지식을 하나의 온톨로지로 연결하고,
            6주 안에 현업이 쓰는 AI 앱을 만듭니다.
          </p>
          <div className="hero-cta reveal" style={{ justifyContent: 'flex-start' }}>
            <a className="btn btn-primary" href="https://talos.joshua.site" target="_blank" rel="noopener">무료 AX 진단 신청</a>
            <Link className="btn btn-outline" href="/contact">도입 문의</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <p className="overline reveal">Why Ontology First</p>
          <h2 className="reveal">AI 도입이 실패하는 이유는<br />AI가 아니라, <strong>데이터</strong>입니다</h2>
          <p className="section-lead lead reveal">
            MES는 MES끼리, ERP는 ERP끼리, 현장 점검 기록은 엑셀과 수첩에. 시스템은 많은데 서로를 모릅니다.
            문맥 없는 데이터 위에서는 어떤 AI도 귀사의 질문에 답하지 못합니다. 탈로스는 흩어진 데이터를
            산업 지식그래프로 연결해 문맥을 부여하는 것부터 시작합니다.
          </p>
          <div className="grid3 reveal" style={{ marginTop: '2.5rem' }}>
            <article className="card"><span className="step-en">01 · 연결 Ontology</span><h3>산업 지식그래프</h3><p>흩어진 데이터를 산업 지식그래프로 연결해 문맥을 부여합니다.</p></article>
            <article className="card"><span className="step-en">02 · 지능 AI Agents</span><h3>에이전트 분석</h3><p>온톨로지 위에서 AI 에이전트가 근본원인분석·예지보전·일정 최적화를 수행합니다.</p></article>
            <article className="card"><span className="step-en">03 · 행동 Apps</span><h3>6주 내 현업 앱</h3><p>현장이 실제로 쓰는 앱으로 6주 안에 배포합니다.</p></article>
          </div>
          <p className="footnote reveal" style={{ marginTop: '2rem', fontSize: '.85rem', color: 'var(--muted)' }}>
            글로벌 산업 AI 선도 기업들(Cognite, Palantir 등)이 증명한 접근 방식입니다. TALOS는 특정 벤더에
            종속되지 않는 독립 구현사로서 귀사에 최적인 스택을 설계합니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <p className="overline reveal">Process</p>
          <h2 className="reveal">진단 신청부터 파일럿까지, <strong>군더더기 없이</strong></h2>
          <ol className="timeline reveal" style={{ listStyle: 'none', display: 'grid', gap: '1.5rem', marginTop: '2.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <li className="card"><span className="step-en">Step 1</span><h3>진단 신청</h3><p>폼 1분</p></li>
            <li className="card"><span className="step-en">Step 2</span><h3>화상 미팅</h3><p>30분</p></li>
            <li className="card"><span className="step-en">Step 3</span><h3>현장 워크숍</h3><p>반나절</p></li>
            <li className="card"><span className="step-en">Step 4</span><h3>파일럿 구축</h3><p>6주</p></li>
          </ol>
          <div className="hero-cta reveal" style={{ justifyContent: 'flex-start', marginTop: '2.5rem' }}>
            <a className="btn btn-primary" href="https://talos.joshua.site" target="_blank" rel="noopener">TALOS 전용 페이지에서 무료 진단 신청</a>
          </div>
        </div>
      </section>
    </main>
  );
}
