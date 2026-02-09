import React from 'react';
import { FadeIn, ScrollProgressLine } from './FadeIn';

const steps = [
  {
    phase: "01",
    title: "Discovery",
    subtitle: "발견 및 진단",
    desc: "현장 인터뷰와 데이터 분석을 통해 비효율이 발생하는 병목 구간을 찾고, AI 적용 시 가장 임팩트가 큰 영역을 정의합니다."
  },
  {
    phase: "02",
    title: "Implementation",
    subtitle: "구축 및 설계",
    desc: "조직 맞춤형 AI 모델과 자동화 워크플로우를 설계합니다. 실제 업무에 즉시 투입 가능한 견고한 소프트웨어를 개발합니다."
  },
  {
    phase: "03",
    title: "Onboarding",
    subtitle: "교육 및 정착",
    desc: "단순 납품에서 그치지 않습니다. 구성원 교육과 운영 내재화 컨설팅을 통해 조직 문화로 정착될 수 있도록 지속적으로 동행합니다."
  }
];

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-32 md:py-64 px-6 bg-white overflow-hidden">
      <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row gap-12 md:gap-32">
        
        {/* Sticky Title */}
        <div className="md:w-1/3 md:sticky md:top-32 h-fit mb-12 md:mb-0">
           <FadeIn>
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Process</span>
             <h2 className="mt-8 text-5xl md:text-7xl font-semibold tracking-tight text-zinc-900 break-keep leading-[1.1]">
               복잡한 문제를<br/>
               <span className="text-zinc-300">가장 단순한 해답으로.</span>
             </h2>
           </FadeIn>
        </div>

        {/* Timeline Steps */}
        <div className="md:w-2/3 relative pl-8 md:pl-16">
          {/* Vertical Progress Line */}
          <div className="absolute left-0 top-0 bottom-0">
            <ScrollProgressLine className="h-full" />
          </div>

          <div className="space-y-32 md:space-y-48">
            {steps.map((step, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} fullWidth>
                <div className="relative group">
                   {/* Dot on line */}
                   <div className="absolute -left-[41px] md:-left-[73px] top-3 w-3.5 h-3.5 rounded-full bg-zinc-200 border-4 border-white group-hover:bg-black transition-colors duration-500 z-10" />
                   
                   <span className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4 block">
                     {step.title}
                   </span>
                   <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight break-keep mb-6">
                     {step.subtitle}
                   </h3>
                   <p className="text-xl text-zinc-500 font-medium leading-relaxed break-keep max-w-lg">
                     {step.desc}
                   </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};