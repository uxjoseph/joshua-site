'use client';

import { useEffect, useState } from 'react';
import { mapInquiryType, trackFormError, trackFormView, trackGenerateLead } from '@/lib/gtag';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const CATEGORIES = ['프로젝트 의뢰 (AX 구축)', '기업 교육', '솔루션 도입 (TALOS · MICKY)', '강연·외부 활동', '기타 문의'];
const SOURCES = [
  '검색 (구글·네이버)',
  'AI 검색 (ChatGPT·Perplexity 등)',
  '소셜 (LinkedIn · YouTube · Threads)',
  '뉴스레터',
  '지인 추천',
  '컨퍼런스·행사',
  '뉴스·아티클',
  '기타',
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');

  // 인디코 GA4 스펙: 폼이 실제 화면에 노출된 시점에 consultation_form_view 발화.
  useEffect(() => {
    trackFormView();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get('name') || '').trim(),
      company: String(fd.get('company') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      phone: String(fd.get('phone') || '').replace(/[^0-9]/g, ''),
      category: String(fd.get('category') || ''),
      message: String(fd.get('message') || '').trim(),
      source: String(fd.get('source') || ''),
      consent: fd.get('consent') === 'on',
    };
    setStatus('submitting');
    setMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) throw new Error(body.error || '문의 전송에 실패했습니다.');
      setStatus('success');
      setMsg('문의해주셔서 감사합니다. 곧 회신 메일을 보내드리겠습니다.');
      // 인디코 GA4 스펙: 서버 접수 성공 = generate_lead (핵심 전환).
      trackGenerateLead(mapInquiryType(data.category));
      form.reset();
    } catch (err) {
      setStatus('error');
      const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setMsg(message);
      // 인디코 GA4 스펙: 접수 실패 = consultation_form_error.
      trackFormError(message);
    }
  };

  const locked = status === 'submitting' || status === 'success';

  return (
    <form className="contact-form reveal" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="c-name">이름 <span className="req">*</span></label>
        <input id="c-name" name="name" type="text" required disabled={locked} autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="c-company">회사 이름 <span className="req">*</span></label>
        <input id="c-company" name="company" type="text" required disabled={locked} autoComplete="organization" />
      </div>
      <div className="frow">
        <div className="field">
          <label htmlFor="c-email">이메일 주소 <span className="req">*</span></label>
          <input id="c-email" name="email" type="email" required disabled={locked} autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="c-phone">연락처 <span className="req">*</span></label>
          <input id="c-phone" name="phone" type="tel" required disabled={locked} inputMode="numeric" placeholder="- 없이 번호만" autoComplete="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-category">문의 유형 <span className="req">*</span></label>
        <select id="c-category" name="category" required disabled={locked} defaultValue="">
          <option value="" disabled>문의 유형을 선택해주세요</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="c-message">문의 내용 <span className="req">*</span></label>
        <textarea id="c-message" name="message" rows={4} required disabled={locked} placeholder="문의 내용을 알려주세요" />
      </div>
      <div className="field">
        <label htmlFor="c-source">유입 경로 <span className="req">*</span></label>
        <select id="c-source" name="source" required disabled={locked} defaultValue="">
          <option value="" disabled>유입 경로를 선택해주세요</option>
          {SOURCES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required disabled={locked} />
        <span>개인정보 수집·이용에 동의합니다 <span className="req">(필수)</span></span>
      </label>
      <button type="submit" className="btn btn-primary" disabled={locked}>
        {status === 'submitting' ? '전송 중…' : status === 'success' ? '전송 완료' : '무료 상담 신청하기'}
      </button>
      <p className={`form-msg ${status === 'success' ? 'ok' : status === 'error' ? 'err' : ''}`} role="status" aria-live="polite">
        {msg}
      </p>
    </form>
  );
}
