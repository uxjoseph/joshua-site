import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FadeIn, CharReveal } from './FadeIn';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  
  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-white text-center">
      
      {/* Background: Clean & Subtle Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-white" />

        {/* Moving Soft Gradient Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-100/20 blur-[150px] mix-blend-multiply" 
        />
        
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-50/30 blur-[150px] mix-blend-multiply" 
        />

         <motion.div 
          animate={{ 
            x: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-violet-50/20 blur-[120px] mix-blend-multiply" 
        />
      </div>

      <motion.div style={{ y }} className="max-w-[90rem] mx-auto px-6 w-full relative z-10 flex flex-col items-center">
        
        <FadeIn delay={0.2} className="mb-12 hidden md:block">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-zinc-100 bg-white/60 backdrop-blur-md shadow-sm cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-900 opacity-20"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-900"></span>
            </span>
            <span className="text-[11px] font-bold text-zinc-800 tracking-[0.2em] uppercase">AI Automation Partner</span>
          </div>
        </FadeIn>

        {/* Hero Headline with Enhanced Motion */}
        <div className="flex flex-col items-center mb-10 leading-[0.9] select-none">
           <h1 className="text-[12vw] md:text-[8.5rem] lg:text-[10rem] font-extrabold tracking-tighter text-zinc-900 flex justify-center">
             <CharReveal text="AI 비즈니스" delay={0.4} />
           </h1>
           <h1 className="text-[12vw] md:text-[8.5rem] lg:text-[10rem] font-extrabold tracking-tighter text-zinc-300 flex justify-center">
             <CharReveal text="혁신의 파트너" delay={0.7} />
           </h1>
        </div>
        
        <FadeIn delay={1.1} className="max-w-2xl mx-auto mb-16">
          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed font-semibold break-keep text-balance">
            복잡한 기술을 가장 단순한 비즈니스 언어로 재해석합니다.<br/>
            JOSHUA는 당신의 팀이 본질에 집중할 수 있도록 돕습니다.
          </p>
        </FadeIn>

        <FadeIn delay={1.3}>
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

      </motion.div>
    </section>
  );
};
