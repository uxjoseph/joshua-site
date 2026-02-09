import React from 'react';
import { FadeIn, TextReveal, ScrollRevealText } from './FadeIn';

export const Manifesto: React.FC = () => {
  return (
    <section id="intro" className="py-32 md:py-64 px-6 bg-white relative">
      <div className="max-w-screen-lg mx-auto">
        
        {/* Headline */}
        <div className="mb-40 md:mb-64 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.3] break-keep">
            <TextReveal>많은 기업들이 AI를 도입하고 싶지만,</TextReveal>
            <TextReveal className="text-zinc-300" delay={0.1}>방법을 모르고 있습니다.</TextReveal>
          </h2>
        </div>

        {/* Scroll Reveal Text Content */}
        <div className="space-y-32 md:space-y-48">
           
           <div className="relative pl-6 md:pl-12 border-l-4 border-zinc-100">
              <ScrollRevealText className="text-3xl md:text-5xl font-semibold text-zinc-900 leading-[1.4] break-keep">
                너무나 많은 기업들이 그럴듯한 프레젠테이션, 실패한 프로토타입만 남긴 채, 실질적인 진전은 이루지 못했습니다.
              </ScrollRevealText>
           </div>

           <div className="relative pl-6 md:pl-12 border-l-4 border-zinc-100">
              <ScrollRevealText className="text-3xl md:text-5xl font-semibold text-zinc-900 leading-[1.4] break-keep">
                생산성 둔화, 치열해지는 경쟁. 이제 비효율과 미흡한 성과를 마주할 여유는 사라졌습니다.
              </ScrollRevealText>
           </div>
           
           {/* Quote Section */}
           <div className="py-20 md:py-32 flex justify-center">
             <FadeIn scale duration={1.2}>
               <div className="text-center max-w-4xl mx-auto">
                 <blockquote className="text-4xl md:text-7xl font-serif italic font-medium text-zinc-900 leading-[1.1] mb-8 break-keep">
                   "AI가 바로 그 답입니다."
                 </blockquote>
                 <p className="text-2xl font-medium text-zinc-400">
                   AI는 큰 도약을 위한, 비즈니스 성과를 내는 도구입니다.
                 </p>
               </div>
             </FadeIn>
           </div>

           <div className="relative pl-6 md:pl-12 border-l-4 border-zinc-100">
              <ScrollRevealText className="text-3xl md:text-5xl font-semibold text-zinc-900 leading-[1.4] break-keep">
                 우리는 지금 당장 눈에 보이는, <span className="text-blue-600">작동하는 AI</span>를 만듭니다. 
              </ScrollRevealText>
           </div>

           <div className="relative pl-6 md:pl-12 border-l-4 border-zinc-100">
              <ScrollRevealText className="text-3xl md:text-5xl font-semibold text-zinc-900 leading-[1.4] break-keep">
                  단순히 AI를 도입하지 않습니다. <br/> 10년의 성장을 위한 AI 소프트웨어를 구축합니다.
              </ScrollRevealText>
           </div>
        </div>
        
      </div>
    </section>
  );
};