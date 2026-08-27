/**
 * GA4 이벤트 발화 유틸 (via GTM dataLayer)
 *
 * GTM 컨테이너(GTM-WJ4BDQT2)가 dataLayer의 이벤트를 받아 GA4로 dispatch합니다.
 * 인디코 GA4 스펙 (2026-08-26 노션):
 *   page_view (자동) / consultation_cta_click / consultation_form_view /
 *   form_start (자동) / form_submit (자동) / generate_lead / consultation_form_error
 */

// GTM/GA4 dataLayer 타입
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type CtaLocation = 'header' | 'hero' | 'page_bottom';
export type InquiryType = 'ax_build' | 'education' | 'solution' | 'other';

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}

export const trackCtaClick = (location: CtaLocation) =>
  trackEvent('consultation_cta_click', { cta_location: location });

export const trackFormView = () => trackEvent('consultation_form_view');

export const trackGenerateLead = (inquiryType: InquiryType) =>
  trackEvent('generate_lead', { inquiry_type: inquiryType });

export const trackFormError = (errorType: string) =>
  trackEvent('consultation_form_error', { error_type: errorType });

/**
 * ContactForm의 문의 유형 카테고리를 인디코 스펙의 inquiry_type으로 매핑.
 * - '프로젝트 의뢰 (AX 구축)' → 'ax_build'
 * - '기업 교육' → 'education'
 * - '솔루션 도입 (TALOS · MICKY)' → 'solution'
 * - '강연·외부 활동' / '기타 문의' → 'other'
 */
export function mapInquiryType(category: string): InquiryType {
  if (category.includes('AX 구축')) return 'ax_build';
  if (category.includes('기업 교육')) return 'education';
  if (category.includes('솔루션')) return 'solution';
  return 'other';
}
