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
              <span className="w">당신의</span> <span className="w">첫</span>{' '}
              <strong className="w">AX 파트너</strong>
            </span>
          </h1>
          {/* 문제 → 약속. 제목이 '누구인지'를 선언했으므로 여기서 'AX 파트너'를 되풀이하지
              않는다. 리드는 정체성이 아니라 방법(한 팀·끝까지)을 맡는다.
              '온톨로지'는 Technology 섹션의 무기라 첫 화면에서 소모하지 않는다. */}
          <p className="hero-problem reveal">AI를 도입했다는 회사는 많지만, 매일 쓰는 조직은 드뭅니다.</p>
          <p className="lead reveal">
            교육부터 구축, 운영까지<br />
            <strong>한 팀이 끝까지 맡습니다.</strong>
          </p>
          <div className="hero-cta reveal">
            <Link className="btn btn-primary" href="/contact">무료 상담하기</Link>
            {/* 라우트가 아니라 정적 파일이라 next/link 가 아닌 <a> 로 건다.
                새 탭으로 여는 이유 — 8MB PDF 를 같은 탭에서 열면 사이트가 뷰어에 덮여
                뒤로가기 말고는 돌아올 길이 없다. */}
            <a className="btn btn-outline" href="/joshua-company-profile.pdf" target="_blank" rel="noopener noreferrer">회사소개서 보기</a>
          </div>
        </div>
        {/* 카피 블록이 끝난 지점부터 시작하는 비주얼 밴드 */}
        <HeroFunnel />
        <div className="hero-inner">
          <div className="proof-band reveal">
            <div><span className="n">30곳+</span><span className="l">기업교육·강연 진행 조직</span></div>
            <div><span className="n">20건+</span><span className="l">엔터프라이즈 AX 프로젝트</span></div>
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
                  <img src={l.src} alt={l.name} height={26} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="section" id="journey">
        <div className="inner">
          <p className="overline reveal">The AX Journey</p>
          <h2 className="reveal">AX는 일회성 프로젝트가 아니라<br /><strong>여정</strong>입니다</h2>
          {/* 세 단계 나열은 바로 아래 카드가 01·02·03 으로 반복한다 — 결론만 남긴다 */}
          <p className="lead reveal">세 단계가 한 팀 안에서 이어질 때, AX는 조직에 남습니다.</p>
          <div className="grid3 reveal">
            <article className="card">
              <span className="step-en">01 · Learn — 기업교육</span>
              <Image className="card-fig" src="/journey-learn.webp" alt="" aria-hidden="true" width={480} height={320} sizes="240px" />
              <h3>조직이 AI를 이해하게 만듭니다</h3>
              <p>카카오뱅크·신한은행·LG전자가 선택한,<br className="br-card" /> 실무에 바로 적용되는 AI 교육.</p>
              <ul>
                <li>임원 특강 — &lsquo;AI Agent 시대&rsquo; 의사결정 전략</li>
                <li>직무별 실습 워크숍 — 금융·디자인·제조</li>
                <li>8주 집중 트레이닝 — 비개발자도 자동화 도구 제작</li>
              </ul>
              <Link className="more" href="/education">교육 사례 보기</Link>
            </article>
            <article className="card">
              <span className="step-en">02 · Build — AX 구축</span>
              <Image className="card-fig" src="/journey-build.webp" alt="" aria-hidden="true" width={480} height={320} sizes="240px" />
              <h3>현업이 매일 쓰는 시스템을 만듭니다</h3>
              <p>데모로 끝나는 AI가 아니라, 75,000건 지식자산을<br className="br-card" /> 답하게 만든 실전 구축력.</p>
              <ul>
                <li>업무 자동화 — 8주 걸리던 리포트를 1일로</li>
                <li>SKT·디자인 에이전시 출신의 UX 설계</li>
                <li>MVP 4~8주 — 발견부터 정착까지 책임 리드</li>
              </ul>
              <Link className="more" href="/work">구축 사례 보기</Link>
            </article>
            <article className="card">
              <span className="step-en">03 · Run — 솔루션</span>
              <Image className="card-fig" src="/journey-run.webp" alt="" aria-hidden="true" width={480} height={320} sizes="240px" />
              <h3>온톨로지 위에서 지속 운영합니다</h3>
              <p>구축이 끝나도 AX는 계속됩니다.<br className="br-card" /> 산업 지식을 온톨로지로 연결한 설치형 솔루션.</p>
              <ul>
                <li>산업 지식그래프(온톨로지) 설계·설치</li>
                <li>현업 앱 배포 — 6주 내 프로덕션</li>
                <li>자사 솔루션 — MICKY(팀 지능) · TALOS(제조, 준비 중)</li>
              </ul>
              <Link className="more" href="/solutions">솔루션 보기</Link>
            </article>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="section" id="solutions">
        <div className="inner">
          <p className="overline reveal">Solutions</p>
          <h2 className="reveal">AX 성공 도입을 위한 <strong>솔루션</strong></h2>
          {/* '어디서부터 시작할지'는 Contact 섹션 제목이 맡는다 — 전환 지점에 한 번만 쓴다 */}
          <p className="lead reveal">솔루션을 직접 만들어 운영합니다. 검증된 엔진은 귀사 프로젝트에도 그대로 쓰입니다.</p>
          <div className="sol-grid reveal">
            <article className="sol-talos">
              <div className="sol-copy">
                <span className="mark">MICKY <span className="sol-no">Solution 01 · 팀 지능</span></span>
                <h3>AI 네이티브 조직을 위한<br /><strong>회의록 에이전트 솔루션</strong></h3>
                {/* 둘째 문장(봇 없이 녹음 / 한국어 존댓말)은 칩과 같은 내용이라 칩으로 넘겼다 */}
                <p>회의만 진행하면 요약·액션·발표자료 같은 산출물이 자동으로 만들어지고, 쌓인 회의 맥락은 팀만 아는 에이전트로 자라납니다.</p>
                <div className="chips"><span>Bot-Free 녹음</span><span>Meeting-to-X</span><span>팀 지식그래프</span><span>미이행 약속 추적</span><span>한국어 존댓말</span></div>
                <Link className="btn" href="/solutions/micky">MICKY 자세히 보기</Link>
              </div>
              {/* 카드 오른쪽 절반을 패딩 없이 채우는 풀블리드 비주얼 */}
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

      {/* TECHNOLOGY — 스티키 스크롤리텔링. 콘텐츠·데이터는 components/TechScroller.tsx */}
      <TechScroller />
      <section className="section tech-foot is-dark">
        <div className="inner">
          <p className="tech-proof reveal">
            <span>검증 환경 — <strong>SK그룹 15개 계열사</strong> 운영 시스템</span>
            <span>데이터 규모 — <strong>75,000건 지식 · 34,000건 응답 분석</strong></span>
            <span>납품 형태 — <strong>웹 앱 · 대시보드 · 에이전트 · 온톨로지</strong></span>
          </p>
        </div>
      </section>

      {/* WORK */}
      <section className="section" id="work">
        <div className="inner">
          <div className="sec-head">
            <div>
              <p className="overline reveal">Featured Case Studies</p>
              <h2 className="reveal" style={{ marginBottom: 0 }}>결과로 증명한 <strong>프로젝트</strong></h2>
            </div>
            <Link className="sec-link reveal" href="/work">전체 프로젝트 보기</Link>
          </div>
          <p className="lead reveal">데모와 PoC로 끝나는 AI는 만들지 않습니다. 첫 유스케이스는 4~8주 안에 현업 화면에 올라갑니다.</p>
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
              <h2 className="reveal" style={{ marginBottom: 0 }}>기업이 다시 찾는 <strong>교육</strong></h2>
            </div>
            <Link className="sec-link reveal" href="/education">교육 전체 보기</Link>
          </div>
          <p className="lead reveal">들으면 끝나는 특강이 아니라, 다음 날 업무가 달라지는 교육을 설계합니다. 강의를 마친 조직이 구축 프로젝트로 이어지는 이유입니다.</p>
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
                <h2>어디서부터 시작할지,<br /><strong>무료로 빠르게 상담해보세요</strong></h2>
                <p className="lead">교육이든, 구축이든, 솔루션이든 — 무엇이 먼저인지부터 함께 정리해드립니다.</p>
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
