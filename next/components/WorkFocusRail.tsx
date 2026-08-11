'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Project } from '@/lib/data';

/**
 * 프로젝트 포커스 레일 — 활성 카드만 원래 크기, 양옆은 멀어질수록 작아진다.
 *
 * 위치와 배율을 JS 가 계산해 인라인 transform 으로 넣는다. CSS 만으로는 안 된다 —
 * 다음 카드의 자리를 잡으려면 앞 카드들의 **축소된** 폭을 누적해야 하는데,
 * 그 값은 활성 인덱스가 바뀔 때마다 달라진다.
 *
 * 레이아웃은 transform 하나로만 움직인다(width/height 는 건드리지 않는다).
 * 폭을 애니메이션하면 매 프레임 리플로우가 걸리지만, transform 은 합성만 한다.
 */

/* 크기 감쇠비 — 활성에서 한 칸 멀어질 때마다 곱해진다.
   원본 레퍼런스 실측은 .68 / .62 / .55 로 조금씩 가팔라지지만, 상수 하나로 두는 편이
   항목 수가 바뀌어도 리듬이 유지되고 계산이 예측 가능하다. */
const FALLOFF = 0.62;

/* 인접 카드 사이 간격. 두 카드 중 **큰 쪽** 배율을 따라 줄어든다 —
   상수로 두면 잘게 줄어든 바깥쪽 카드들 사이만 헐렁하게 벌어져 보인다. */
const GAP = 22;

const scaleAt = (distance: number) => FALLOFF ** Math.abs(distance);

export function WorkFocusRail({ projects }: { projects: Project[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [active, setActive] = useState(0);
  /* 첫 배치까지는 전환을 끈다 — 켜 두면 마운트 직후 카드가 왼쪽 위에서 제자리로
     날아오는 게 보인다. 배치가 끝난 다음 프레임에 켠다. */
  const [ready, setReady] = useState(false);
  /* 누른 순간 그 카드가 이미 활성이었는지. onFocus 가 mousedown 단계에서
     setActive 를 먼저 돌려 버리기 때문에, click 시점의 active 로 판단하면
     비활성 카드를 눌러도 항상 '활성이었다'가 되어 곧장 이동해 버린다. */
  const pressedActiveRef = useRef(false);

  const last = projects.length - 1;

  /* 배치 — 활성 카드 중심을 기준점(anchor)에 두고 좌우로 폭을 누적해 나간다. */
  const layout = useCallback(() => {
    const stage = stageRef.current;
    const first = itemsRef.current[0];
    if (!stage || !first) return;

    /* offsetWidth 는 transform 이 걸리기 전의 레이아웃 폭이라 배율에 영향받지 않는다 */
    const base = first.offsetWidth;
    const half = base / 2;
    const stageW = stage.clientWidth;
    /* 스테이지는 좌우 거터만큼 넓혀 풀블리드로 잘라내지만, 카드가 끝에 붙을 때는
       거터 안쪽(= 위 제목과 같은 세로선)에 맞아야 한다. 그 값을 패딩에서 읽는다. */
    const pad = parseFloat(getComputedStyle(stage).paddingLeft) || 0;

    const visualW = (i: number) => base * scaleAt(i - active);
    /* i-1 과 i 사이의 간격 */
    const gapAt = (i: number) => GAP * Math.max(scaleAt(i - 1 - active), scaleAt(i - active));

    /* 활성 카드 양옆으로 뻗어나가는 길이 — 기준점을 끝에서 붙잡아 두는 데 쓴다 */
    let leftSpan = 0;
    for (let i = active; i > 0; i--) leftSpan += gapAt(i) + visualW(i - 1);
    let rightSpan = 0;
    for (let i = active; i < last; i++) rightSpan += gapAt(i + 1) + visualW(i + 1);

    /* 기본은 화면 정중앙. 다만 목록의 처음·끝에서는 그대로 두면 한쪽이 텅 빈다.
       ① 왼쪽에 채울 카드가 모자라면 활성 카드를 왼쪽 거터에 붙인다
       ② 오른쪽도 마찬가지 — 마지막 카드에서 오른쪽이 비지 않게 당긴다 */
    let anchor = stageW / 2;
    anchor = Math.min(anchor, pad + half + leftSpan);
    anchor = Math.max(anchor, stageW - pad - half - rightSpan);

    const centers = new Array<number>(projects.length);
    centers[active] = anchor;
    for (let i = active + 1; i <= last; i++) {
      centers[i] = centers[i - 1] + visualW(i - 1) / 2 + gapAt(i) + visualW(i) / 2;
    }
    for (let i = active - 1; i >= 0; i--) {
      centers[i] = centers[i + 1] - visualW(i + 1) / 2 - gapAt(i + 1) - visualW(i) / 2;
    }

    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      const s = scaleAt(i - active);
      /* translateY(-50%) 는 **배율이 걸리기 전** 높이의 절반이라, 배율이 얼마든
         카드 중심이 스테이지 중앙선에 그대로 남는다. scale 도 중심 기준이다.
         → 카드가 커지고 작아져도 시선이 위아래로 흔들리지 않는다. */
      el.style.transform = `translate(${centers[i] - half}px, -50%) scale(${s})`;
      /* 활성이 항상 위에 오도록 — 겹칠 때 작은 카드가 큰 카드를 덮으면 안 된다 */
      el.style.zIndex = String(projects.length - Math.abs(i - active));
    });
  }, [active, last, projects.length]);

  /* 페인트 전에 배치한다 — useEffect 로 두면 배치 전 프레임이 한 번 그려진다 */
  useLayoutEffect(() => {
    layout();
  }, [layout]);

  /* rAF 가 아니라 타이머로 켠다 — rAF 는 배경 탭에서 아예 발화하지 않아,
     탭이 숨겨진 채 마운트되면 전환이 영영 꺼진 상태로 남는다. */
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(() => layout());
    ro.observe(stage);
    return () => ro.disconnect();
  }, [layout]);

  /* 프레임을 원본 비율에 맞춘다. 고정 16/10 이면 비율이 다른 원본마다 남는 쪽에
     매트(#f8f8f8)가 깔리는데, 스크린샷 배경도 흰색이라 그게 이미지를 덮은 흰 띠로
     보이고 결국 잘린 것처럼 읽힌다. 비율을 맞추면 띠가 아예 생기지 않는다.

     리액트 onLoad 는 쓰지 않는다 — 캐시로 이미 로드가 끝난 이미지는 핸들러가
     붙기 전에 이벤트가 지나가 영영 오지 않는다. complete 를 직접 보고,
     아직이면 네이티브 load 를 건다. 두 경로로 모든 경우가 덮인다. */
  useEffect(() => {
    const offs: (() => void)[] = [];
    itemsRef.current.forEach((el) => {
      const img = el?.querySelector('img');
      if (!el || !img) return;
      const apply = () => {
        if (!img.naturalWidth || !img.naturalHeight) return;
        el.style.setProperty('--pfx-ar', `${img.naturalWidth} / ${img.naturalHeight}`);
      };
      /* 판정 기준은 complete 가 아니라 naturalWidth 다 — 헤더만 파싱되면 치수는
         이미 읽을 수 있는데 complete 는 그보다 늦고, 탭이 백그라운드면 load 가
         아예 오지 않기도 한다. 즉시 한 번, 그리고 load·decode 로 뒤를 받친다. */
      apply();
      if (!img.naturalWidth) {
        img.addEventListener('load', apply);
        offs.push(() => img.removeEventListener('load', apply));
        img.decode().then(apply).catch(() => {});
      }
    });
    return () => offs.forEach((off) => off());
  }, [projects]);

  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => Math.min(last, Math.max(0, i + dir))),
    [last]
  );

  /* 드래그·스와이프 — 놓는 순간 한 칸 넘긴다.
     끄는 동안 실시간으로 따라오게 하려면 활성 인덱스가 소수여야 하는데,
     이 레이아웃은 원래 한 칸씩 끊어 움직이는 스테퍼라 놓을 때 판정하는 게 맞다. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let startX: number | null = null;

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      startX = e.clientX;
    };
    /* is-dragging 은 **실제로 끌기 시작한 뒤에** 붙인다. pointerdown 에서 바로 붙이면
       .is-dragging *{pointer-events:none} 가 즉시 걸려 링크가 포인터를 잃고,
       mousedown 타깃이 스테이지가 되어 클릭이 <a> 에 도달하지 못한다
       (= 카드를 눌러도 상세로 넘어가지 않는다). */
    const onMove = (e: PointerEvent) => {
      if (startX === null) return;
      if (Math.abs(e.clientX - startX) > 6) stage.classList.add('is-dragging');
    };
    const onUp = (e: PointerEvent) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      stage.classList.remove('is-dragging');
      if (Math.abs(dx) < 40) return;
      /* 많이 끌면 여러 칸 — 다만 한 번에 3칸을 넘기지는 않는다 */
      const steps = Math.min(3, Math.round(Math.abs(dx) / 140) || 1);
      setActive((i) => Math.min(last, Math.max(0, i - Math.sign(dx) * steps)));
      /* 끌어서 끝난 클릭은 링크를 열지 않게 한 박자 막는다 */
      const block = (ev: MouseEvent) => ev.preventDefault();
      stage.addEventListener('click', block, { capture: true, once: true });
      setTimeout(() => stage.removeEventListener('click', block, { capture: true }), 0);
    };

    stage.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      stage.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [last]);

  /* 트랙패드 가로 스와이프. 세로 스크롤을 가로채면 페이지가 멈추므로
     가로 성분이 세로보다 클 때만 받는다. 관성 때문에 한 번의 스와이프로
     수십 번 발화하니 잠금을 걸어 한 칸만 넘긴다. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let locked = false;
    let timer = 0;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (locked) return;
      if (Math.abs(e.deltaX) < 12) return;
      locked = true;
      step(e.deltaX > 0 ? 1 : -1);
      timer = window.setTimeout(() => {
        locked = false;
      }, 420);
    };

    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      stage.removeEventListener('wheel', onWheel);
      clearTimeout(timer);
    };
  }, [step]);

  /* 화살표 키는 상태만 바꾸지 않고 초점도 함께 옮긴다 — 상태만 바꾸면
     초점 링이 방금 작아진 카드에 남아 화면과 어긋난다.
     초점이 옮겨가면 onFocus 가 활성 인덱스를 따라 갱신한다. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = Math.min(last, Math.max(0, active + dir));
    itemsRef.current[next]?.focus();
  };

  return (
    <div className="pfx reveal" data-ready={ready || undefined}>
      <div
        className="pfx-stage"
        ref={stageRef}
        role="group"
        aria-roledescription="캐러셀"
        aria-label="주요 프로젝트, 좌우로 넘기세요"
        onKeyDown={onKeyDown}
      >
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="pfx-item"
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            data-on={i === active || undefined}
            aria-label={`${p.category} · ${p.year}, ${p.hook ?? p.title}`}
            /* 활성이 아닌 카드를 누르면 이동이 아니라 그 카드로 초점을 옮긴다.
               활성 카드를 누르면 상세로 이동한다(Link 기본 동작).
               판정은 click 이 아니라 pointerdown 시점의 값으로 한다 — 아래 ref 주석 참고. */
            onPointerDown={() => {
              pressedActiveRef.current = i === active;
            }}
            onClick={(e) => {
              if (!pressedActiveRef.current) {
                e.preventDefault();
                setActive(i);
              }
            }}
            onFocus={() => setActive(i)}
          >
            <Image
              src={p.image}
              alt={p.title}
              width={1280}
              height={800}
              sizes="(min-width:1024px) 42vw, 80vw"
              draggable={false}
            />
          </Link>
        ))}
      </div>

      <div className="pfx-foot">
        {/* 캡션은 전부 겹쳐 두고 활성만 켠다 — 하나만 렌더하면 교차 페이드 사이가 비어 끊긴다 */}
        <div className="pfx-caps">
          {projects.map((p, i) => (
            <p className="pfx-cap" key={p.slug} data-on={i === active || undefined} aria-hidden={i !== active}>
              <span className="cat">
                {p.category} · {p.year}
              </span>
              <span className="t">{p.hook ?? p.title}</span>
            </p>
          ))}
        </div>

        <div className="pfx-nav">
          <span className="pfx-count">
            {String(active + 1).padStart(2, '0')}
            <i>/</i>
            {String(projects.length).padStart(2, '0')}
          </span>
          <div className="pf-nav">
            <button type="button" onClick={() => step(-1)} disabled={active === 0} aria-label="이전 프로젝트">
              ←
            </button>
            <button type="button" onClick={() => step(1)} disabled={active === last} aria-label="다음 프로젝트">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
