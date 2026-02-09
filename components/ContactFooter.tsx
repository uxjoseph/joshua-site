import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from './FadeIn';

export const ContactFooter: React.FC = () => {
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
               action="https://formspree.io/f/xgolvkaa"
               method="POST"
               className="space-y-8"
             >
               <div className="group relative">
                 <input
                    type="text"
                    name="name"
                    required
                    placeholder="이름 / 회사명"
                    className="w-full bg-transparent border-b-2 border-zinc-100 py-6 text-xl md:text-2xl focus:outline-none focus:border-black transition-colors placeholder:text-zinc-300 font-bold"
                 />
               </div>
               <div className="group relative">
                 <input
                    type="email"
                    name="email"
                    required
                    placeholder="이메일 주소"
                    className="w-full bg-transparent border-b-2 border-zinc-100 py-6 text-xl md:text-2xl focus:outline-none focus:border-black transition-colors placeholder:text-zinc-300 font-bold"
                 />
               </div>
               <div className="group relative">
                 <textarea
                    name="message"
                    rows={1}
                    required
                    placeholder="프로젝트에 대해 알려주세요"
                    className="w-full bg-transparent border-b-2 border-zinc-100 py-6 text-xl md:text-2xl focus:outline-none focus:border-black transition-colors placeholder:text-zinc-300 font-bold resize-none h-32"
                 ></textarea>
               </div>

               <div className="pt-8">
                 <button type="submit" className="flex items-center gap-6 text-xl font-extrabold uppercase tracking-widest group hover:opacity-70 transition-opacity">
                   문의 보내기 <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                 </button>
               </div>
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