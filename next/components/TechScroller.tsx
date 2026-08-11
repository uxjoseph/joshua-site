'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

/* 데이터는 컴포넌트 밖으로 뺀다 — 렌더마다 새로 만들 이유가 없고, 문구·이미지 교체가
   컴포넌트 로직과 섞이지 않는다. theme:'dark' 를 주면 그 축이 활성일 때 섹션이 어두워진다. */
type Pillar = {
  no: string;
  label: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  theme?: 'light' | 'dark';
};

/* 섹션 기본 테마. 흰 섹션이 이어지는 흐름에서 기술 파트만 톤을 뒤집어 리듬을 만든다.
   축마다 다르게 하고 싶으면 PILLARS 항목에 theme 를 주면 그 값이 이긴다. */
const SECTION_THEME: 'light' | 'dark' = 'dark';

const PILLARS: Pillar[] = [
  {
    no: '01',
    label: 'Ontology',
    title: '산업 지식그래프 설계',
    body: '설비·문서·회의·사람의 지식을 개념 그래프로 연결하는 온톨로지 엔지니어링. TALOS(제조)와 MICKY 팀 브레인에 실제 구현돼 있습니다.',
    image: '/portfolio/ax-2026-12.png',
    alt: 'SK그룹 전사 AI 역량 혁신 플랫폼, 구성원 활동 데이터를 연결한 인텔리전스 화면',
  },
  {
    no: '02',
    label: 'RAG at Scale',
    title: '75,000건 지식자산 체계화',
    body: 'SK그룹 전사 경영 지식 75,000건을 RAG로 구조화해, 선대회장 화법·음성으로 응답하는 시스템까지 프로덕션 배포했습니다.',
    image: '/portfolio/ax-2026-02.png',
    alt: 'SKMS Talk 발표자료 생성 화면, 경영 지식을 슬라이드와 육성으로 재구성한 시스템',
  },
  {
    no: '03',
    label: 'Agent Orchestration',
    title: '멀티에이전트 오케스트레이션',
    body: 'SK 이천포럼에서 AI 페르소나가 사장단 토론에 라이브로 응답했습니다. 에이전트 마켓플레이스·자동 QA 파이프라인까지 운영 경험 보유.',
    image: '/portfolio/ax-2026-60.png',
    alt: 'SK그룹 임원 리더십 포럼 AI 페르소나 라이브 인터랙션 시스템 화면',
  },
  {
    no: '04',
    label: 'Agentic Delivery',
    title: '에이전틱 개발 방법론',
    body: '8주 걸리던 진단 리포트를 1일로 줄인 자동화, MVP 4~8주·솔루션 앱 6주 프로덕션. 속도 자체가 방법론의 증거입니다.',
    image: '/portfolio/ax-2026-70.png',
    alt: 'SK그룹 22개 계열사 조직문화 진단 통합 분석 대시보드 화면',
  },
];

export function TechScroller() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [inDark, setInDark] = useState(false);

  /* 스크롤 → 활성 인덱스.
     매 프레임 setState 하면 패널 전체가 리렌더된다. 인덱스가 **바뀔 때만** 갱신한다. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    /* 데스크톱에서만 동작한다. 모바일은 세로 목록이라 진행도 개념이 없다. */
    const desktop = window.matchMedia('(min-width: 1024px)');
    let inView = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!desktop.matches) return;
      const rect = el.getBoundingClientRect();
      /* 섹션이 화면을 다 지나가는 거리로 0~1 진행도를 만든다.
         스티키가 붙어 있는 동안 rect.top 은 0에서 -(높이-화면) 까지 내려간다. */
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / travel));
      const next = Math.min(PILLARS.length - 1, Math.floor(p * PILLARS.length));
      setActive((prev) => (prev === next ? prev : next));
    };

    const schedule = () => {
      if (frame || !inView) return;
      frame = requestAnimationFrame(update);
    };

    /* 화면 밖이면 스크롤 핸들러가 즉시 빠져나간다 */
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        if (inView) schedule();
      },
      { rootMargin: '0px' }
    );
    io.observe(el);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* 다크 전환 신호.
     인덱스 계산(위)과 분리한 이유 — 그쪽은 데스크톱 전용이고 매 프레임 도는데,
     테마는 모바일에서도 필요하고 경계를 한 번 넘을 때만 바뀌면 된다.
     rootMargin 아래쪽 -35% — 섹션 상단이 화면의 65% 지점까지 올라와야 켜진다.
     화면 끝에 걸치자마자 어두워지면 아직 위 섹션을 보고 있는데 배경이 먼저 바뀐다. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInDark(e.isIntersecting), {
      rootMargin: '0px 0px -35% 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* 네비처럼 이 섹션 밖에 있는 요소도 같이 어두워져야 하므로 <html> 에 신호를 건다.
     unmount·페이지 이동 시 반드시 지운다 — 남으면 다른 페이지가 어두운 채로 열린다. */
  useEffect(() => {
    const root = document.documentElement;
    if (inDark) root.dataset.storyDark = '';
    else delete root.dataset.storyDark;
    return () => {
      delete root.dataset.storyDark;
    };
  }, [inDark]);

  /* 탭·패널 클릭은 상태만 바꾸지 않고 해당 구간으로 스크롤한다.
     그래야 클릭 상태와 스크롤 상태가 어긋나지 않는다 — 상태만 바꾸면
     사용자가 손가락 하나만 굴려도 스크롤 값이 이겨서 되돌아간다. */
  const goTo = useCallback((i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    if (travel <= 0) return;
    /* 구간의 한가운데로 보낸다 — 경계에 걸치면 인덱스가 떨릴 수 있다 */
    const p = (i + 0.5) / PILLARS.length;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: el.offsetTop + travel * p,
      behavior: reduced ? 'auto' : 'smooth',
    });
  }, []);

  const current = PILLARS[active];
  const dark = inDark && (current.theme ?? SECTION_THEME) === 'dark';

  const head = (
    <>
      <p className="overline">Technology</p>
      <h2>
        온톨로지를 직접 설계하고,<br />
        <strong>고객사에 배포하고 있습니다</strong>
      </h2>
      <p className="lead">
        조슈아앤컴퍼니는 온톨로지를 직접 수행하는 회사입니다. 기술력은 슬라이드가 아니라 고객사에서 지금 돌아가는 시스템으로 증명합니다.
      </p>
    </>
  );

  return (
    <section
      className="storyx"
      id="technology"
      ref={sectionRef}
      data-theme={dark ? 'dark' : 'light'}
      style={{ ['--panels' as string]: PILLARS.length }}
    >
      {/* ── 데스크톱: 스티키 스크롤리텔링 ── */}
      <div className="storyx-sticky">
        {/* 스티키 박스 **안**에 둔다. 섹션(400vh) 직속에 두면 격자가 섹션과 함께 흘러가고,
            파문 링의 중심도 섹션 한가운데(화면 밖)에 찍혀 제대로 보이지 않는다.
            스티키는 화면에 고정돼 있으므로 그 안의 절대배치는 뷰포트에 붙은 것처럼 멈춘다. */}
        <div className="tech-dots" aria-hidden="true" />
        <div className="storyx-head">{head}</div>

        <div className="storyx-body">
          <div className="storyx-tabs">
            {PILLARS.map((p, i) => (
              <button
                key={p.no}
                type="button"
                className="storyx-tab"
                data-on={i === active}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => goTo(i)}
              >
                <span className="storyx-tab-no">{p.no}</span>
                {/* data-label — CSS ::after 가 같은 글자를 겹쳐 그려 색을 교차 페이드한다 */}
                <span className="storyx-tab-label" data-label={p.label}>{p.label}</span>
              </button>
            ))}
            <a className="storyx-cta" href="/work">
              구축 사례 보기
            </a>
          </div>

          <div className="storyx-stage">
            <div className="storyx-acc">
              {PILLARS.map((p, i) => (
                <button
                  key={p.no}
                  type="button"
                  className="storyx-panel"
                  data-on={i === active}
                  aria-label={`${p.label} ${p.no}단계`}
                  onClick={() => goTo(i)}
                >
                  <Image src={p.image} alt={p.alt} width={1440} height={900} sizes="(min-width:1024px) 46vw, 100vw" />
                </button>
              ))}
            </div>
            {/* 전부 겹쳐 두고 활성만 켠다 — 이전 문장이 사라지는 동안 새 문장이 올라와
                교차 페이드가 된다. 하나만 렌더하면 그 사이가 비어 끊겨 보인다. */}
            <div className="storyx-descs">
              {PILLARS.map((p, i) => (
                <p className="storyx-desc" data-on={i === active} key={p.no} aria-hidden={i !== active}>
                  <strong>{p.title}</strong> {p.body}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 모바일: 스티키·탭·아코디언 없이 전부 순서대로 ── */}
      <div className="storyx-list">
        <div className="storyx-head">
          {head}
          <a className="storyx-cta" href="/work">
            구축 사례 보기
          </a>
        </div>
        {PILLARS.map((p) => (
          <article className="storyx-item" key={p.no}>
            <Image src={p.image} alt={p.alt} width={1440} height={900} sizes="100vw" />
            <span className="storyx-item-no">
              {p.no} · {p.label}
            </span>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
