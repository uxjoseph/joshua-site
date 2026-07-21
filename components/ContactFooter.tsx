import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { FadeIn } from './FadeIn';

type ContactStatus = 'idle' | 'submitting' | 'success' | 'error';

const CATEGORIES = [
  '프로젝트 의뢰',
  '기업 교육',
  '강연·외부 활동',
  '기타 문의',
];

const SOURCES = [
  '검색 (구글·네이버)',
  '소셜 (LinkedIn · YouTube · Threads)',
  '뉴스레터',
  '지인 추천',
  '컨퍼런스·행사',
  '뉴스·아티클',
  '기타',
];

export const ContactFooter: React.FC = () => {
  const [status, setStatus] = useState<ContactStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || ''),
      company: String(formData.get('company') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      category: String(formData.get('category') || ''),
      message: String(formData.get('message') || ''),
      source: String(formData.get('source') || ''),
      consent: formData.get('consent') === 'on',
    };

    setStatus('submitting');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || '문의 전송에 실패했습니다.');
      }
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    }
  };

  const isLocked = status === 'submitting' || status === 'success';
  const inputClass = "w-full bg-transparent border-b-2 border-zinc-100 py-6 text-xl md:text-2xl focus:outline-none focus:border-black transition-colors placeholder:text-zinc-300 font-bold disabled:opacity-60";
  const selectClass = `${inputClass} appearance-none pr-10 cursor-pointer`;

  return (
    <footer id="contact" className="bg-white text-zinc-900 pt-32 md:pt-48 px-6 border-t border-zinc-100">
      <div className="max-w-[90rem] mx-auto">
        
        <FadeIn className="mb-24 md:mb-40 text-center md:text-left">
          <h2 className="text-[10vw] font-extrabold tracking-tighter leading-[0.85]">
            LET'S WORK<br />
            <span className="text-zinc-200">TOGETHER.</span>
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-20 mb-32">
          <FadeIn delay={0.2} className="space-y-12">
             <div className="space-y-4">
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 block mb-4">연락처</span>
               <a href="mailto:hello@joshua.site" className="text-2xl md:text-4xl font-semibold hover:text-blue-600 transition-colors block">hello@joshua.site</a>
               <p className="text-2xl md:text-4xl font-medium text-zinc-500">010-7565-9060</p>
             </div>

             <div className="space-y-4">
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 block mb-4">오피스</span>
               <p className="text-xl font-medium text-zinc-600 max-w-sm">
                 서울특별시 구로구 디지털로26길 43,<br/>
                 L동 502,503호
               </p>
             </div>
          </FadeIn>

          <FadeIn delay={0.3} className="w-full">
             <form
               onSubmit={handleSubmit}
               className="space-y-8"
             >
               <div className="group relative">
                 <input
                    type="text"
                    name="name"
                    required
                    disabled={isLocked}
                    placeholder="이름 *"
                    className={inputClass}
                 />
               </div>
               <div className="group relative">
                 <input
                    type="text"
                    name="company"
                    required
                    disabled={isLocked}
                    placeholder="회사 이름 *"
                    className={inputClass}
                 />
               </div>
               <div className="group relative">
                 <input
                    type="email"
                    name="email"
                    required
                    disabled={isLocked}
                    placeholder="이메일 주소 *"
                    className={inputClass}
                 />
               </div>
               <div className="group relative">
                 <input
                    type="tel"
                    name="phone"
                    required
                    disabled={isLocked}
                    placeholder="연락처 *  (- 없이 번호만 입력)"
                    inputMode="numeric"
                    pattern="[0-9]+"
                    className={inputClass}
                 />
               </div>
               <div className="group relative">
                 <select
                    name="category"
                    required
                    disabled={isLocked}
                    defaultValue=""
                    className={selectClass}
                 >
                    <option value="" disabled>문의 유형을 선택해주세요 *</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                 </select>
                 <ChevronDown size={24} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
               </div>
               <div className="group relative">
                 <textarea
                    name="message"
                    rows={1}
                    required
                    disabled={isLocked}
                    placeholder="문의 내용을 알려주세요 *"
                    className={`${inputClass} resize-none h-32`}
                 ></textarea>
               </div>
               <div className="group relative">
                 <select
                    name="source"
                    required
                    disabled={isLocked}
                    defaultValue=""
                    className={selectClass}
                 >
                    <option value="" disabled>유입 경로를 선택해주세요 *</option>
                    {SOURCES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                 </select>
                 <ChevronDown size={24} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
               </div>

               <label className="flex items-start gap-3 pt-4 cursor-pointer select-none group">
                 <input
                    type="checkbox"
                    name="consent"
                    required
                    disabled={isLocked}
                    className="mt-1 w-5 h-5 accent-black cursor-pointer disabled:cursor-not-allowed"
                 />
                 <span className="text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-900 transition-colors">
                   개인정보 수집·이용에 동의합니다 <span className="text-zinc-400">(필수)</span>
                 </span>
               </label>

               <div className="pt-8">
                 <button
                   type="submit"
                   disabled={isLocked}
                   className="flex items-center gap-6 text-xl font-extrabold uppercase tracking-widest group hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {status === 'submitting' ? '전송 중…' : status === 'success' ? '전송 완료' : '문의 보내기'}
                   <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                 </button>
               </div>

               {status === 'success' && (
                 <p className="text-sm text-zinc-600 font-medium pt-4">
                   문의해주셔서 감사합니다. 곧 회신 메일을 보내드리겠습니다.
                 </p>
               )}
               {status === 'error' && (
                 <p className="text-sm text-red-500 font-medium pt-4">{errorMessage}</p>
               )}
             </form>
          </FadeIn>
        </div>

        <div className="pt-12 pb-8 border-t border-zinc-100">
          <div className="text-xs text-zinc-400 leading-relaxed space-y-1 not-italic">
            <p>
              <span className="text-zinc-500">(주)조슈아앤컴퍼니</span>
              <span className="mx-2 text-zinc-300">|</span>대표 김승권
              <span className="mx-2 text-zinc-300">|</span>개인정보보호책임자 김승권
              <span className="mx-2 text-zinc-300">|</span>사업자등록번호 189-87-03956
            </p>
            <p>
              주소 서울특별시 구로구 디지털로26길 43, L동 502,503호
              <span className="mx-2 text-zinc-300">|</span>
              이메일 <a href="mailto:hello@joshua.site" className="hover:text-black transition-colors">hello@joshua.site</a>
            </p>
            <p className="pt-2">
              <Link to="/privacy" className="font-semibold text-zinc-500 hover:text-black transition-colors">개인정보 처리방침</Link>
            </p>
          </div>
        </div>

        <div className="py-12 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-400 uppercase tracking-widest border-t border-zinc-100 font-bold">
          <p>© {new Date().getFullYear()} (주)조슈아앤컴퍼니 All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
             <a href="https://www.youtube.com/@builderjoshkim" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">YouTube</a>
             <a href="https://www.linkedin.com/in/uxjosh/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LinkedIn</a>
             <a href="https://www.threads.com/@joshproductletter" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Threads</a>
          </div>
        </div>
      </div>
    </footer>
  );
};