import Link from 'next/link';
import Image from 'next/image';
import { LOGOS, PROJECTS, EDUCATION, TEAM, FAQS, SITE } from '@/lib/data';
import { ContactForm } from '@/components/ContactForm';

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
  const featured = PROJECTS.filter((p) => p.hook);
  const rest = PROJECTS.filter((p) => !p.hook);
  const eduFeatured = EDUCATION.filter((e) => e.image).slice(0, 4);
  const eduRest = EDUCATION.filter((e) => !eduFeatured.includes(e));

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-inner">
          <p className="badge-live reveal"><span className="dot" />독립 AX 파트너</p>
          <h1 className="reveal">
            배우는 것에서 끝나지 않는 AX,<br />
            <strong>교육부터 구축, 운영까지</strong>
          </h1>
          <p className="lead reveal">
            많은 기업이 AI를 도입하고 싶지만, 방법을 모르고 있습니다.<br />
            <strong>조슈아앤컴퍼니는 조직의 이해부터 시스템 구축, 온톨로지 운영까지<br />끝까지 책임지는 독립 AX 파트너입니다.</strong>
          </p>
          <div className="hero-cta reveal">
            <Link className="btn btn-primary" href="/contact">무료 상담하기</Link>
            <Link className="btn btn-outline" href="/work">사례 보기</Link>
          </div>
          <div className="proof-band reveal">
            <div><span className="n">30곳+</span><span className="l">기업교육·강연 진행 조직</span></div>
            <div><span className="n">20건+</span><span className="l">엔터프라이즈 AX 프로젝트</span></div>
            <div><span className="n">75,000건</span><span className="l">RAG로 체계화한 지식자산</span></div>
            <div><span className="n">8주→1일</span><span className="l">조직문화 진단 리포트 자동화</span></div>
          </div>
        </div>
        <div className="logos reveal">
          <p>Partners &amp; Clients — 국내외 선도 기업이 JOSHUA와 함께합니다</p>
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
      <section className="section soft" id="journey">
        <div className="inner">
          <p className="overline reveal">The AX Journey</p>
          <h2 className="reveal">AX는 일회성 프로젝트가 아니라<br /><strong>여정</strong>입니다</h2>
          <p className="lead reveal">이해하고(Learn), 구축하고(Build), 운영합니다(Run). 세 단계가 한 팀 안에서 이어질 때, AX는 조직에 남습니다.</p>
          <div className="grid3 reveal">
            <article className="card orb orb-sky">
              <span className="step-en">01 · Learn — 기업교육</span>
              <h3>조직이 AI를 이해하게 만듭니다</h3>
              <p>카카오뱅크·신한은행·LG전자가 선택한, 실무에 바로 적용되는 AI 교육.</p>
              <ul>
                <li>임원 특강 — &lsquo;AI Agent 시대&rsquo; 의사결정 전략</li>
                <li>직무별 실습 워크숍 — 금융·디자인·제조</li>
                <li>8주 집중 트레이닝 — 비개발자도 자동화 도구 제작</li>
              </ul>
              <Link className="more" href="/education">교육 사례 보기</Link>
            </article>
            <article className="card orb orb-mint">
              <span className="step-en">02 · Build — AX 구축</span>
              <h3>현업이 매일 쓰는 시스템을 만듭니다</h3>
              <p>데모로 끝나는 AI가 아니라, 75,000건 지식자산을 답하게 만든 실전 구축력.</p>
              <ul>
                <li>업무 자동화 — 8주 걸리던 리포트를 1일로</li>
                <li>SKT·디자인 에이전시 출신의 UX 설계</li>
                <li>MVP 4~8주 — 발견부터 정착까지 책임 리드</li>
              </ul>
              <Link className="more" href="/work">구축 사례 보기</Link>
            </article>
            <article className="card orb orb-peach">
              <span className="step-en">03 · Run — 솔루션</span>
              <h3>온톨로지 위에서 지속 운영합니다</h3>
              <p>구축이 끝나도 AX는 계속됩니다. 산업 지식을 온톨로지로 연결한 설치형 솔루션.</p>
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
          <p className="lead reveal">어디서부터 시작해야 할지 막막한 대표님을 위해, AX의 첫 시작을 도와드리는 솔루션을 직접 만들어 운영합니다. 검증된 엔진은 귀사 프로젝트에도 그대로 쓰입니다.</p>
          <div className="sol-grid reveal">
            <article className="sol-talos">
              <span className="mark">MICKY <span className="sol-no">Solution 01 · 팀 지능</span></span>
              <h3>AI 네이티브 조직을 위한<br /><strong>회의록 에이전트 솔루션</strong></h3>
              <p>회의만 진행하면 요약·액션·발표자료 같은 산출물이 자동으로 만들어지고, 쌓인 회의 맥락은 팀만 아는 에이전트로 자라납니다. 봇 없이 녹음하고, 한국어 직급·존댓말 맥락까지 보존합니다.</p>
              <div className="chips"><span>Bot-Free 녹음</span><span>Meeting-to-X</span><span>팀 지식그래프</span><span>미이행 약속 추적</span></div>
              <Link className="btn" href="/solutions/micky">MICKY 자세히 보기</Link>
              <Image className="sol-shot" src="/micky-app.webp" alt="MICKY 앱 화면 — 회의 요약·주요 결정·액션 아이템과 미키 스튜디오" width={896} height={494} />
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

      {/* TECHNOLOGY */}
      <section className="section tech" id="technology">
        <div className="inner">
          <p className="overline reveal">Technology</p>
          <h2 className="reveal">온톨로지를 직접 설계하고,<br /><strong>고객사에 배포하고 있습니다</strong></h2>
          <p className="lead reveal">조슈아앤컴퍼니는 온톨로지를 직접 수행하는 회사입니다. 기술력은 슬라이드가 아니라 고객사에서 지금 돌아가는 시스템으로 증명합니다.</p>
          <div className="tech-grid reveal">
            <article className="tech-card">
              <span className="no">01 · Ontology</span>
              <h3>산업 지식그래프 설계</h3>
              <p>설비·문서·회의·사람의 지식을 개념 그래프로 연결하는 온톨로지 엔지니어링. TALOS(제조)와 MICKY 팀 브레인에 실제 구현돼 있습니다.</p>
            </article>
            <article className="tech-card">
              <span className="no">02 · RAG at Scale</span>
              <h3>75,000건 지식자산 체계화</h3>
              <p>SK그룹 전사 경영 지식 75,000건을 RAG로 구조화해, 선대회장 화법·음성으로 응답하는 시스템까지 프로덕션 배포했습니다.</p>
            </article>
            <article className="tech-card">
              <span className="no">03 · Agent Orchestration</span>
              <h3>멀티에이전트 오케스트레이션</h3>
              <p>SK 이천포럼에서 AI 페르소나가 사장단 토론에 라이브로 응답했습니다. 에이전트 마켓플레이스·자동 QA 파이프라인까지 운영 경험 보유.</p>
            </article>
            <article className="tech-card">
              <span className="no">04 · Agentic Delivery</span>
              <h3>에이전틱 개발 방법론</h3>
              <p>8주 걸리던 진단 리포트를 1일로 줄인 자동화, MVP 4~8주·솔루션 앱 6주 프로덕션. 속도 자체가 방법론의 증거입니다.</p>
            </article>
          </div>
          <p className="tech-proof reveal">
            <span>검증 환경 — <strong>SK그룹 15개 계열사</strong> 운영 시스템</span>
            <span>데이터 규모 — <strong>75,000건 지식 · 34,000건 응답 분석</strong></span>
            <span>납품 형태 — <strong>웹 앱 · 대시보드 · 에이전트 · 온톨로지</strong></span>
          </p>
        </div>
      </section>

      {/* WORK */}
      <section className="section soft" id="work">
        <div className="inner">
          <div className="sec-head">
            <div>
              <p className="overline reveal">Featured Case Studies</p>
              <h2 className="reveal" style={{ marginBottom: 0 }}>결과로 증명한 <strong>프로젝트</strong></h2>
            </div>
            <Link className="sec-link reveal" href="/work">전체 프로젝트 보기</Link>
          </div>
          <p className="lead reveal">데모와 PoC로 끝나는 AI는 만들지 않습니다. 첫 유스케이스는 4~8주 안에 현업 화면에 올라갑니다.</p>
          <div className="pf-feature reveal">
            {featured.map((p) => (
              <article className="pf-card" key={p.title}>
                <div className="thumb">
                  <Image src={p.image} alt={p.title} width={640} height={400} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div className="pad">
                  <span className="cat">{p.category} · {p.year}</span>
                  <h3>{p.hook}</h3>
                  <p>{p.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="pf-list reveal">
            {rest.map((p, i) => (
              <div className="pf-row" key={p.title}>
                <span className="no">{String(i + 4).padStart(2, '0')}</span>
                <span className="t">{p.title}</span>
                <span className="meta"><span className="tag">{p.category}</span><span className="yr">{p.year}</span></span>
              </div>
            ))}
          </div>
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
                  <span className="client">{e.client} · {e.year}</span>
                  <h3>{e.title}</h3>
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
      <section className="section soft" id="about">
        <div className="inner">
          <div className="about">
            <div className="reveal">
              <p className="overline">About Joshua &amp; Company</p>
              <h2>프로젝트가 끝나도,<br /><strong>시스템은 남습니다</strong></h2>
            </div>
            <div className="reveal">
              <p className="lead">보고서를 두고 떠나는 컨설팅과 다릅니다. 조슈아앤컴퍼니는 특정 벤더에 종속되지 않는 독립 AX 구현사로서, 현업이 매일 쓰는 시스템과 스스로 운영할 수 있는 역량을 조직 안에 남깁니다. SKT·디자인 에이전시 출신 전문가가 UX까지 책임집니다.</p>
              <div className="team">
                {TEAM.map((t) => (
                  <div className="tm" key={t.name}>
                    {t.image && (
                      <Image src={t.image} alt={t.name} width={56} height={56} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                    )}
                    <p className="n">{t.name}</p>
                    <p className="r">{t.role}</p>
                    <p>{t.description}</p>
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
        <div className="inner contact-grid">
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
      </section>
    </main>
  );
}
