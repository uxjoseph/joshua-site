import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { FadeIn, CharReveal } from './FadeIn';
import { motion } from 'framer-motion';
import { subscribeMember } from '../lib/ghost';

type SubscribeStatus = 'idle' | 'submitting' | 'success' | 'error';

export const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscribeStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);
    const result = await subscribeMember(email);
    if (result.ok) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
      setErrorMessage(result.error || '알 수 없는 오류가 발생했습니다.');
    }
  };
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white text-center py-28 md:py-32">
      
      {/* Background: Clean & Subtle Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-white" />

        {/* Moving Soft Gradient Orbs — desktop only.
            Mobile freeze incident: 3 large blur-[150px] orbs animating on Infinity
            killed iOS Safari GPU and stalled Hero render. */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-100/20 blur-[150px] mix-blend-multiply"
        />

        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="hidden md:block absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-50/30 blur-[150px] mix-blend-multiply"
        />

        <motion.div
          animate={{
            x: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="hidden md:block absolute top-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-violet-50/20 blur-[120px] mix-blend-multiply"
        />
      </div>

      <div className="max-w-[90rem] mx-auto px-6 w-full relative z-10 flex flex-col items-center">

        <FadeIn delay={0.2} className="mb-8 hidden md:block">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-zinc-100 bg-white/60 backdrop-blur-md shadow-sm cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-900 opacity-20"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-900"></span>
            </span>
            <span className="text-[11px] font-bold text-zinc-800 tracking-[0.2em] uppercase">AI Automation Partner</span>
          </div>
        </FadeIn>

        {/* Hero Headline with Enhanced Motion - Restored Original Text */}
        <div className="flex flex-col items-center mb-5 md:mb-6 leading-[0.9] select-none">
           <h1 className="text-[12vw] md:text-[7.5rem] lg:text-[9rem] font-extrabold tracking-tighter text-zinc-900 flex justify-center">
             <CharReveal text="당신의 첫번째" delay={0.4} />
           </h1>
           <h1 className="text-[12vw] md:text-[7.5rem] lg:text-[9rem] font-extrabold tracking-tighter text-zinc-900 flex justify-center">
             <CharReveal text="AX 파트너" delay={0.7} />
           </h1>
        </div>

        <FadeIn delay={1.1} className="max-w-2xl mx-auto mb-8">
          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed font-medium break-keep text-balance">
            전략 설계부터 실행까지, JOSHUA가 함께합니다.<br/>
            AI를 도입하는 게 아니라, 일하는 방식을 완전히 바꿔드립니다.
          </p>
        </FadeIn>

        {/* CEO Josh's Request: Lead Collection Form integrated between text and button */}
        <FadeIn delay={1.3} className="w-full max-w-xl mx-auto mb-6">
          <form
            onSubmit={handleSubscribe}
            className="relative flex items-center p-1 rounded-full border border-zinc-200 bg-white/80 backdrop-blur-md shadow-2xl shadow-zinc-200/20 group focus-within:border-zinc-400 transition-all duration-300"
          >
            <input
              type="email"
              required
              disabled={status === 'submitting' || status === 'success'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일로 AI 소식 받아보기"
              className="flex-1 bg-transparent px-8 py-3.5 text-base md:text-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === 'submitting' || status === 'success'}
              className="bg-zinc-100 text-zinc-900 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-60"
            >
              {status === 'submitting' ? '신청 중…' : status === 'success' ? '신청 완료' : '구독하기'}
            </button>
          </form>
          {status === 'success' && (
            <p className="mt-3 text-sm text-zinc-600 text-center">
              메일함에서 확인 링크를 눌러주시면 구독이 완료됩니다.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-3 text-sm text-red-500 text-center">{errorMessage}</p>
          )}
        </FadeIn>

        <FadeIn delay={1.5}>
           <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="group relative flex items-center gap-3 md:gap-6 bg-zinc-900 text-white pl-6 md:pl-10 pr-2 md:pr-3 py-2 md:py-3 rounded-full text-base md:text-xl font-bold hover:bg-black transition-all shadow-2xl shadow-zinc-900/10 ring-1 ring-black/5"
          >
            <span>무료 상담하기</span>
            <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-300">
              <ArrowRight size={20} className="md:hidden" strokeWidth={3} />
              <ArrowRight size={24} className="hidden md:block" strokeWidth={3} />
            </div>
          </motion.a>
        </FadeIn>

      </div>
    </section>
  );
};
