/**
 * Meta 픽셀 (Facebook Pixel) 유틸
 *
 * 데이터 세트: "조슈아앤컴퍼니 (joshua.site)" — Meta Business Suite / 이벤트 관리자 (ASC 광고 계정)
 * 기본 코드는 app/layout.tsx에서 로드하고, 여기서는 이벤트 발화만 담당합니다.
 *   PageView  — 최초 로드 + App Router 경로 변경 시 (components/MetaPixel.tsx)
 *   Lead      — 상담 폼 제출 성공 시 (lib/gtag.ts trackGenerateLead 경유)
 */

export const FB_PIXEL_ID = '4121952988102546';

type Fbq = ((...args: unknown[]) => void) & { loaded?: boolean };

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

export function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  if (params) window.fbq('track', event, params);
  else window.fbq('track', event);
}

export const fbqPageView = () => fbqTrack('PageView');
export const fbqLead = (params?: Record<string, unknown>) => fbqTrack('Lead', params);
