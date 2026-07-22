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
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
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
