import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { Briefcase, Calendar, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import metadata from '../metadata.json';

export const Education: React.FC = () => {
  return (
    <div className="pt-40 pb-32 px-6 bg-white min-h-screen">
      <div className="max-w-[90rem] mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-24">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6 block">
              Corporate Education
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-zinc-900 mb-12">기업 교육</h1>
            <p className="text-xl md:text-2xl text-zinc-500 font-light max-w-3xl mx-auto leading-relaxed break-keep">
              JOSHUA는 실무 중심의 AI 기술 내재화를 지원합니다. <br className="hidden md:block" />
              국내 유수 기업들과 함께한 AX 역량 강화의 기록입니다.
            </p>
          </div>
        </FadeIn>

        {/* Education List with Images */}
        <div className="space-y-24">
          {metadata.education.map((edu, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="group flex flex-col lg:flex-row gap-12 md:gap-24 items-center">
                {/* Image Section */}
                <div className="w-full lg:w-1/2 aspect-[16/10] overflow-hidden rounded-3xl bg-zinc-100 shadow-2xl shadow-zinc-200/50 flex items-center justify-center">
                  {edu.image ? (
                    <motion.img
                      src={edu.image}
                      alt={edu.title}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-950 text-white flex flex-col justify-between p-10 md:p-14 relative overflow-hidden">
                      {/* Subtle gradient accent */}
                      <div className="absolute -top-1/3 -right-1/3 w-2/3 h-2/3 rounded-full bg-gradient-to-bl from-white/[0.04] to-transparent blur-2xl pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />

                      <div className="flex items-center gap-3 text-zinc-500 relative z-10">
                        <GraduationCap size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
                          Enterprise Training
                        </span>
                      </div>

                      <div className="relative z-10">
                        <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-[0.95] break-keep text-white">
                          {edu.client}
                        </h3>
                        <div className="mt-4 h-px w-12 bg-white/30" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Calendar size={14} />
                      <span className="text-xs font-mono font-bold uppercase tracking-widest">{edu.year}</span>
                    </div>
                    <div className="h-px w-8 bg-zinc-200" />
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{edu.client}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 leading-tight">
                    {edu.title}
                  </h2>
                  
                  <p className="text-lg md:text-xl text-zinc-500 font-light leading-relaxed">
                    {edu.description}
                  </p>

                  <div className="flex items-center gap-3 text-zinc-400 mt-4">
                    <GraduationCap size={20} />
                    <span className="text-sm font-medium tracking-wide uppercase">AI Competency Program</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.4}>
          <div className="mt-48 bg-zinc-950 rounded-3xl p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
               <Briefcase size={400} className="absolute -right-20 -bottom-20" />
            </div>
            
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-8 relative z-10">
              우리 기업에 맞는 <br className="md:hidden" /> AI 교육이 필요하신가요?
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto relative z-10">
              초급자 대상의 생성형 AI 활용부터 전문 개발자를 위한 RAG 아키텍처 실습까지, <br className="hidden md:block" />
              고객사의 환경에 최적화된 맞춤형 커리큘럼을 제안해 드립니다.
            </p>
            <a 
              href="#contact"
              className="inline-block bg-white text-zinc-950 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all shadow-xl relative z-10"
            >
              교육 상담 신청하기
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
