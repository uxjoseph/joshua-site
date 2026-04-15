import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from './FadeIn';

type ContactStatus = 'idle' | 'submitting' | 'success' | 'error';

export const ContactFooter: React.FC = () => {
  const [status, setStatus] = useState<ContactStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      message: String(formData.get('message') || ''),
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
                 서울특별시 동작구 시흥대로 606,<br/>
                 오피스동 532호
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
                    disabled={status === 'submitting' || status === 'success'}
                    placeholder="이름 / 회사명"
                    className="w-full bg-transparent border-b-2 border-zinc-100 py-6 text-xl md:text-2xl focus:outline-none focus:border-black transition-colors placeholder:text-zinc-300 font-bold disabled:opacity-60"
                 />
               </div>
               <div className="group relative">
                 <input
                    type="email"
                    name="email"
                    required
                    disabled={status === 'submitting' || status === 'success'}
                    placeholder="이메일 주소"
                    className="w-full bg-transparent border-b-2 border-zinc-100 py-6 text-xl md:text-2xl focus:outline-none focus:border-black transition-colors placeholder:text-zinc-300 font-bold disabled:opacity-60"
                 />
               </div>
               <div className="group relative">
                 <textarea
                    name="message"
                    rows={1}
                    required
                    disabled={status === 'submitting' || status === 'success'}
                    placeholder="프로젝트에 대해 알려주세요"
                    className="w-full bg-transparent border-b-2 border-zinc-100 py-6 text-xl md:text-2xl focus:outline-none focus:border-black transition-colors placeholder:text-zinc-300 font-bold resize-none h-32 disabled:opacity-60"
                 ></textarea>
               </div>

               <div className="pt-8">
                 <button
                   type="submit"
                   disabled={status === 'submitting' || status === 'success'}
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

        <div className="py-12 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-400 uppercase tracking-widest border-t border-zinc-100 font-bold">
          <p>© 2025 JOSHUA All rights reserved.</p>
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