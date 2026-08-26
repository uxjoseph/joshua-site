'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** 프로토타입의 전역 인터랙션: 네비 스크롤 상태 + 스크롤 리빌 + 로고 마퀴 복제 */
export function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const nav = document.getElementById('nav');
    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in)');
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    /* 같은 섹션 안에서는 DOM 순서대로 지연을 줘 한 덩어리씩 등장시킨다.
       인라인 style 대신 커스텀 프로퍼티를 쓰는 이유는 .reveal 트랜지션에만 지연이
       걸리게 하기 위해서 — transition-delay 를 직접 주면 등장 후 hover 전환까지 늦어진다.
       6단계에서 상한을 둬 항목이 많은 섹션에서 마지막 요소가 지나치게 늦지 않게 한다. */
    const order = new Map<Element, number>();
    els.forEach((el) => {
      const group = el.closest('section, footer') ?? document.body;
      const i = order.get(group) ?? 0;
      order.set(group, i + 1);
      el.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 90}ms`);
    });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));

    const track = document.getElementById('logo-track');
    if (track && !track.dataset.duplicated) {
      track.innerHTML += track.innerHTML;
      track.dataset.duplicated = '1';
    }
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
