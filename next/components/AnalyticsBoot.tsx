'use client';

import { useEffect } from 'react';
import { trackCtaClick, type CtaLocation } from '@/lib/gtag';

/**
 * 글로벌 CTA 클릭 리스너.
 * `data-cta-location="header|hero|page_bottom"` 속성이 붙은 요소(및 그 자식)를
 * 클릭하면 GTM 데이터레이어에 consultation_cta_click 이벤트를 push합니다.
 *
 * 서버 컴포넌트(Nav/Footer/각 페이지)를 클라이언트로 전환할 필요 없이,
 * Link에 data 속성만 붙이면 계측됩니다.
 */
export function AnalyticsBoot() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest('[data-cta-location]');
      if (!el) return;
      const loc = el.getAttribute('data-cta-location') as CtaLocation | null;
      if (loc === 'header' || loc === 'hero' || loc === 'page_bottom') {
        trackCtaClick(loc);
      }
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);
  return null;
}
