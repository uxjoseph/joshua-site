import Link from 'next/link';
import Image from 'next/image';
import { LOGOS, PROJECTS, EDUCATION, TEAM, FAQS, SITE } from '@/lib/data';
import { ContactForm } from '@/components/ContactForm';
import { HeroFunnel } from '@/components/HeroFunnel';
import { WorkFocusRail } from '@/components/WorkFocusRail';
import { TechScroller } from '@/components/TechScroller';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

/* 증거(proof)는 히어로 숫자 밴드·기술 섹션에 이미 공개한 수치만 쓴다 — 새 수치를 만들지 않는다 */
const PAINS = [
  {
    q: '교육은 했는데, 다음 날 아무도 안 써요.',
    answer: '강의를 실제 업무 과제로 설계합니다.',
    detail: '없애고 싶은 반복 업무를 그대로 실습 주제로 써서 각자 스킬과 도구를 만들어 가고, 4주 뒤 재진단으로 실제로 달라졌는지 확인합니다.',
    proof: '기업교육·강연 100곳+',
  },
  {
    q: 'PoC만 벌써 세 번째예요.',
    answer: '데모가 아니라 현업 화면에 올립니다.',
    detail: '첫 유스케이스는 4~8주 안에 현업이 실제로 쓰는 시스템으로 배포합니다. 보고서를 두고 떠나지 않습니다.',
    proof: '엔터프라이즈 AX 프로젝트 30건+',
  },
  {
    q: '우리 회사 데이터는 너무 많고, 흩어져 있어요.',
    answer: '양이 많을수록 구조부터 잡습니다.',
    detail: 'SK그룹 경영 지식 75,000건을 RAG로 체계화해, 근거를 대며 답하는 시스템으로 배포했습니다.',
    proof: '75,000건 지식자산 체계화',
  },
  {
    q: '만든 사람이 떠나면 멈출까 봐 걱정이에요.',
    answer: '시스템과 운영 역량을 함께 남깁니다.',
    detail: '안정화 기간과 월 단위 유지보수로 시스템을 지키고, 사내 담당자가 직접 운영할 수 있게 넘겨드립니다.',
    proof: 'SK그룹 15개 계열사 운영 시스템',
  },
];

/* 기간은 공개된 값(상담 30분 · MVP 4~8주)만 적는다. 진단 기간은 과제마다 달라 숫자를 두지 않는다 */
const STEPS = [
  { no: '01', title: '무료 상담', dur: '30분', body: '지금의 AI 활용 수준과 시간이 가장 많이 새는 업무를 듣고, 교육과 구축 중 어디서 시작할지 정합니다.' },
  { no: '02', title: '과제 진단', dur: '첫 과제 선정', body: '현업 인터뷰와 데이터 확인으로 효과가 가장 큰 첫 과제를 고르고, 범위와 일정을 확정합니다.' },
  { no: '03', title: '교육 · 구축', dur: 'MVP 4~8주', body: '직무별 교육으로 조직이 AI를 이해하게 하고, 첫 유스케이스를 현업이 쓰는 화면으로 배포합니다.' },
  { no: '04', title: '운영 · 확산', dur: '유지보수 · 확장', body: '안정화와 유지보수로 시스템을 지키고, 검증된 방식을 다음 부서와 과제로 넓힙니다.' },
];

export default function Home() {
  const eduFeatured = EDUCATION.filter((e) => e.image).slice(0, 4);
  const eduRest = EDUCATION.filter((e) => !eduFeatured.includes(e));

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-inner">
          {/* .line 은 마스크(overflow:hidden), .w 는 그 뒤에서 올라오는 단어다.
              단어를 각각 감싸는 이유 — CSS 는 텍스트 노드를 겨냥할 수 없다. */}
          <h1 className="reveal">
            <span className="line">
              {/* 강조를 두 .w 로 나눈다 — inline-block 한 덩어리면 모바일에서 줄바꿈되지 못하고 넘친다 */}
              <span className="w">AI를</span>{' '}
              <strong className="w">매일 쓰는</strong>{' '}
              <strong className="w">조직으로</strong>
            </span>
          </h1>
          {/* 제목은 고객이 얻는 결과, 문제행은 그 결과가 드문 이유, 리드는 방법(한 팀·끝까지).
              '첫 AX 파트너'는 이미 도입해 본 기업(핵심 타깃)을 밀어내서 내렸다.
              '온톨로지'는 Technology 섹션의 무기라 첫 화면에서 소모하지 않는다. */}
          <p className="hero-problem reveal">AI를 도입한 회사는 많지만,<br className="br-m" /> 일하는 방식이 바뀐 곳은 드뭅니다.</p>
          <p className="lead reveal">
            교육부터 구축, 운영까지<br />
            <strong>한 팀이 끝까지 맡습니다.</strong>
          </p>
          <div className="hero-cta reveal">
            <Link className="btn btn-primary" href="/contact" data-cta-location="hero">30분 무료 상담</Link>
            {/* 라우트가 아니라 정적 파일이라 next/link 가 아닌 <a> 로 건다.
                새 탭으로 여는 이유 — 8MB PDF 를 같은 탭에서 열면 사이트가 뷰어에 덮여
                뒤로가기 말고는 돌아올 길이 없다. */}
            <a className="btn btn-outline" href="https://feat.page/u/Vwynf5we" target="_blank" rel="noopener noreferrer">회사소개서 보기</a>
          </div>
        </div>
        {/* 카피 블록이 끝난 지점부터 시작하는 비주얼 밴드 */}
        <HeroFunnel />
        <div className="hero-inner">
          <div className="proof-band reveal">
            <div><span className="n">100곳+</span><span className="l">기업교육·강연 진행 조직</span></div>
            <div><span className="n">30건+</span><span className="l">엔터프라이즈 AX 프로젝트</span></div>
            <div><span className="n">75,000건</span><span className="l">RAG로 체계화한 지식자산</span></div>
            <div><span className="n">8주→1일</span><span className="l">조직문화 진단 리포트 자동화</span></div>
          </div>
        </div>
        <div className="logos reveal">
          {/* 로고 16개가 이미 '국내외 선도 기업'을 말한다 — 라벨만 남긴다 */}
          <p>Partners &amp; Clients</p>
          <div className="marquee">
            <div className="marquee-track" id="logo-track">
              {LOGOS.map((l) => (
                <div key={l.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.src} alt={`조슈아앤컴퍼니 고객사 ${l.name} 로고`} height={26} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PAINS — 구매자가 실제로 하는 말을 제목으로 쓰고, 답 → 증거 순서로 받는다.
          '우리가 무엇을 하는지'보다 '내 문제를 아는 팀인지'가 먼저 판단되기 때문이다. */}
      <section className="section" id="why">
        <div className="inner">
          <p className="overline reveal">Why Joshua</p>
          <h2 className="reveal">이런 고민이라면,<br /><strong>이미 풀어본 문제입니다</strong></h2>
          <p className="lead reveal">100곳이 넘는 조직을 교육하고, 30건이 넘는 프로젝트를 현업에 올리며 가장 자주 들은 이야기들입니다.</p>
          <div className="pains reveal">
            {PAINS.map((p) => (
              <article className="pain" key={p.q}>
                <p className="q">&ldquo;{p.q}&rdquo;</p>
                <p className="a"><strong>{p.answer}</strong> {p.detail}</p>
                <span className="proof">{p.proof}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="section" id="journey">
        <div className="inner">
          <p className="overline reveal">The AX Journey</p>
          <h2 className="reveal">교육 따로, 구축 따로면<br /><strong>AI는 조직에 남지 않습니다</strong></h2>
          {/* 세 단계 나열은 바로 아래 카드가 01·02·03 으로 반복한다 — 결론만 남긴다 */}
          <p className="lead reveal">교육한 팀이 구축하고, 구축한 팀이 운영합니다. 그래서 중간에 끊기지 않습니다.</p>
          <div className="grid3 reveal">
            <article className="card">
              <span className="step-en">01 · Learn, 기업교육</span>
              <Image className="card-fig" src="/journey-learn.webp" alt="" aria-hidden="true" width={480} height={320} sizes="240px" />
              <h3>조직이 AI를 이해하게 만듭니다</h3>
              <p>카카오뱅크·신한은행·LG전자가 선택한,<br className="br-card" /> 다음 날 업무에 바로 쓰는 AI 교육.</p>
              <ul>
                <li>90분 실기 진단 → 교육 → 4주 뒤 재진단</li>
                <li>구성원 기초 8시간: 내 업무 스킬·웹 도구 완성</li>
                <li>팀장 4시간 · 경영자 2시간 · 오피스아워</li>
              </ul>
              <Link className="more" href="/education">교육 사례 보기</Link>
            </article>
            <article className="card">
              <span className="step-en">02 · Build, AX 구축</span>
              <Image className="card-fig" src="/journey-build.webp" alt="" aria-hidden="true" width={480} height={320} sizes="240px" />
              <h3>현업이 매일 쓰는 시스템을 만듭니다</h3>
              <p>데모로 끝나는 AI가 아니라, 75,000건 지식자산을<br className="br-card" /> 답하게 만든 실전 구축력.</p>
              <ul>
                <li>업무 자동화: 8주 걸리던 리포트를 1일로</li>
                <li>SKT·디자인 에이전시 출신의 UX 설계</li>
                <li>MVP 4~8주: 발견부터 정착까지 책임 리드</li>
              </ul>
              <Link className="more" href="/work">구축 사례 보기</Link>
            </article>
            <article className="card">
              <span className="step-en">03 · Run, 운영·내재화</span>
              <Image className="card-fig" src="/journey-run.webp" alt="" aria-hidden="true" width={480} height={320} sizes="240px" />
              <h3>만든 시스템이 계속 돌아가게 합니다</h3>
              <p>구축이 끝나도 AX는 계속됩니다.<br className="br-card" /> 시스템을 지키고, 운영할 사람을 조직 안에 키웁니다.</p>
              <ul>
                <li>안정화 기간 + 월 단위 유지보수·모니터링</li>
                <li>사내 운영 담당자 핸드오버 교육</li>
                <li>쌓인 지식을 온톨로지로 연결해 다음 과제로 확장</li>
              </ul>
              <Link className="more" href="#process">진행 방식 보기</Link>
            </article>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY — 스티키 스크롤리텔링. 콘텐츠·데이터는 components/TechScroller.tsx */}
      <TechScroller />
      <section className="section tech-foot is-dark">
        <div className="inner">
          <p className="tech-proof reveal">
            <span>검증 환경: <strong>SK그룹 15개 계열사</strong> 운영 시스템</span>
            <span>데이터 규모: <strong>75,000건 지식 · 34,000건 응답 분석</strong></span>
            <span>납품 형태: <strong>웹 앱 · 대시보드 · 에이전트 · 온톨로지</strong></span>
          </p>
        </div>
      </section>

      {/* WORK */}
      <section className="section" id="work">
        <div className="inner">
          <div className="sec-head">
            <div>
              <p className="overline reveal">Featured Case Studies</p>
              <h2 className="reveal" style={{ marginBottom: 0 }}>SK그룹 현업에 <strong>배포한 시스템</strong></h2>
            </div>
            <Link className="sec-link reveal" href="/work">전체 프로젝트 보기</Link>
          </div>
          <p className="lead reveal">경영 지식, 조직문화 진단, 임원 포럼, 인재개발까지. 그룹 전반에서 실제로 돌아가는 프로젝트 중 일부입니다.</p>
          {/* 포커스 레일 — 활성 카드만 원래 크기, 양옆은 멀어질수록 작아진다.
              카드 안에 텍스트를 두지 않는 이유: 축소된 카드에서는 어차피 읽히지 않는다.
              제목은 레일 아래 캡션 한 곳에서 활성 항목만 교차 페이드로 보여준다. */}
          <WorkFocusRail projects={PROJECTS} />
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section" id="education">
        <div className="inner">
          <div className="sec-head">
            <div>
              <p className="overline reveal">Corporate Education</p>
              <h2 className="reveal" style={{ marginBottom: 0 }}>100곳이 넘는 조직이 <strong>다시 찾는 교육</strong></h2>
            </div>
            <Link className="sec-link reveal" href="/education">교육 전체 보기</Link>
          </div>
          <p className="lead reveal">90분 실기 진단으로 레벨을 나누고, 자기 업무로 실습하고, 4주 뒤 같은 잣대로 다시 잽니다. 만족도 설문이 아니라 레벨 변화로 성과를 보고하실 수 있습니다.</p>
          <div className="edu-feature reveal">
            {eduFeatured.map((e) => (
              <article className="edu-card" key={e.client + e.title}>
                <div className="thumb">
                  <Image src={e.image!} alt={`${e.client} ${e.title} 현장`} width={480} height={360} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="pad">
                  <span className="client">{e.client}</span>
                  <h3>{e.title}</h3>
                  <span className="yr">{e.year}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="edu-tbl reveal">
            {eduRest.map((e) => (
              <div className="edu-row" key={e.client + e.title}>
                <span className="yr">{e.year}</span>
                <span className="cl">{e.client}</span>
                <span className="ti">{e.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — 상담 버튼을 누르기 전 '누르면 무슨 일이 생기는지'를 보여준다 */}
      <section className="section" id="process">
        <div className="inner">
          <p className="overline reveal">How We Work</p>
          <h2 className="reveal">첫 상담부터 현업 배포까지,<br /><strong>이렇게 진행합니다</strong></h2>
          <p className="lead reveal">단계마다 무엇이 나오는지 미리 아실 수 있도록, 진행 과정을 그대로 공개합니다.</p>
          <ol className="steps reveal">
            {STEPS.map((s) => (
              <li key={s.no}>
                <span className="no">{s.no}</span>
                <h3>{s.title}</h3>
                <span className="dur">{s.dur}</span>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ABOUT + TEAM + FAQ */}
      {/* 인사이트 홈 섹션은 조쉬 지시(2026-07-22)로 비노출 — /insights 라우트는 SEO용으로 유지 */}
      <section className="section" id="about">
        <div className="inner">
          <div className="about">
            <div className="reveal">
              <p className="overline">About Joshua &amp; Company</p>
              <h2>프로젝트가 끝나도,<br /><strong>시스템은 남습니다</strong></h2>
            </div>
            <div className="reveal">
              <p className="lead">보고서를 두고 떠나는 컨설팅과 다릅니다. 조슈아앤컴퍼니는 특정 벤더에 종속되지 않는 독립 AX 구현사로서, 현업이 매일 쓰는 시스템과 스스로 운영할 수 있는 역량을 조직 안에 남깁니다. SKT·디자인 에이전시 출신 전문가가 UX까지 책임집니다.</p>
              <div className="team reveal">
                {TEAM.map((t) => (
                  <div className="tm" key={t.name}>
                    {/* 썸네일과 본문을 각각 한 덩어리로 묶어야 가로 2열이 성립한다.
                        원형 아바타 때는 형제 나열로 충분했지만 이제는 컬럼이 필요하다. */}
                    {t.image && (
                      <div className="ph">
                        <Image src={t.image} alt={t.name} width={56} height={56} />
                      </div>
                    )}
                    <div className="body">
                      <p className="n">{t.name}</p>
                      <p className="r">{t.role}</p>
                      <p className="d">{t.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="faq reveal" style={{ marginTop: '3.5rem' }}>
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section cta" id="contact">
        <div className="inner">
          {/* 배경 이미지를 깐 라운드 카드. 이미지는 CSS 배경이라 마크업에 <Image> 를 두지 않는다 */}
          <div className="cta-card">
            <div className="contact-grid">
              <div className="reveal contact-copy">
                <p className="overline">Contact</p>
                <h2>어디서부터 시작할지,<br /><strong>30분이면 정리됩니다</strong></h2>
                <p className="lead">교육이 먼저인지, 구축이 먼저인지. 무료 상담에서 귀사에 맞는 순서부터 잡아드립니다.</p>
                <p className="sla">
                  영업일 1일 내 답변드립니다.{' · '}
                  <a href={`mailto:${SITE.email}`} style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>{SITE.email}</a>
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
