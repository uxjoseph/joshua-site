'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 프로젝트 가로 레일 — 스와이프·트랙패드·드래그·버튼·키보드로 넘긴다.
 *
 * 스크롤 자체는 브라우저 네이티브(overflow-x + scroll-snap)에 맡긴다. JS 로 위치를
 * 흉내내면 터치 관성·스냅·접근성을 전부 다시 만들어야 한다. 여기서는 세 가지만 얹는다.
 *  ① 마우스 드래그 — 트랙패드가 없는 환경에서 가로 스크롤 수단이 없다
 *  ② 앞뒤 버튼    — 가로로 넘길 수 있다는 걸 알리는 유일한 시각 단서
 *  ③ 양 끝 판정   — 끝에 닿으면 버튼을 비활성으로 바꾼다
 */
export function WorkRail({ children }: { children: React.ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /* 양 끝 도달 여부 */
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = el.scrollWidth - el.clientWidth;
      setAtStart(el.scrollLeft <= 1);
      setAtEnd(el.scrollLeft >= max - 1);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    el.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();
    return () => {
      el.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* 마우스 드래그. 터치는 브라우저가 이미 처리하므로 pointerType 으로 걸러낸다 —
     둘 다 받으면 터치에서 네이티브 관성과 겹쳐 스크롤이 뚝뚝 끊긴다. */
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;
    let moved = 0;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true;
      moved = 0;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.classList.add('is-dragging');
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      /* 드래그 중에는 스냅을 꺼야 한다 — 켜져 있으면 손이 움직이는 동안
         브라우저가 계속 가장 가까운 카드로 되돌려 끌리지 않는다. */
      el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.classList.remove('is-dragging');
      /* 드래그로 끝난 클릭은 링크를 열지 않게 한 박자 막는다 */
      if (moved > 6) {
        const block = (ev: MouseEvent) => ev.preventDefault();
        el.addEventListener('click', block, { capture: true, once: true });
        setTimeout(() => el.removeEventListener('click', block, { capture: true }), 0);
      }
    };

    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.pf-card');
    /* 카드 한 장 + 간격만큼 이동 — 임의의 px 로 밀면 스냅 지점과 어긋난다 */
    const by = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: by * dir, behavior: reduced ? 'auto' : 'smooth' });
  }, []);

  return (
    <div className="pf-rail-wrap">
      <div
        className="pf-rail"
        ref={railRef}
        tabIndex={0}
        role="region"
        aria-label="프로젝트 목록 — 좌우로 스와이프하거나 화살표 키로 넘기세요"
      >
        <div className="pf-track">{children}</div>
      </div>
      <div className="pf-nav">
        <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="이전 프로젝트">
          ←
        </button>
        <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="다음 프로젝트">
          →
        </button>
      </div>
    </div>
  );
}
