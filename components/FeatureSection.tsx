import React from 'react';
import { FadeIn } from './FadeIn';
import { Bot, Layers, BarChart3, Plus } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: "업무 자동화",
    description: "기업 업무 중심의 현장 진단 및 기회 포착. 반복 작업을 자동화하여 수작업을 줄이고 비용을 절감합니다."
  },
  {
    icon: Layers,
    title: "심미적인 AI 소프트웨어",
    description: "보기 별로인 소프트웨어는 만들지 않습니다. SKT, 거대 디자인 에이전시 출신의 전문가가 UX가 담긴 제품을 만듭니다."
  },
  {
    icon: BarChart3,
    title: "AI 리터러시 교육",
    description: "만드는 데서 그치지 않습니다. 구성원의 AI 리터러시를 올리고, 변화 관리 및 운영 내재화를 돕습니다."
  }
];

export const FeatureSection: React.FC = () => {
  return (
    <section id="features" className="py-40 px-6 bg-white relative">
       <div className="max-w-[90rem] mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <FadeIn>
              <h2 className="text-7xl md:text-[8rem] font-extrabold tracking-tighter text-zinc-950 leading-[0.9]">
                Services
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} className="hidden md:block pb-4">
              <p className="text-xl font-bold text-zinc-400 max-w-sm text-right leading-relaxed">
                우리는 비즈니스의 본질을 꿰뚫는<br/>
                가장 효율적인 AI 솔루션을 제안합니다.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <FadeIn key={index} delay={index * 0.15} className="h-full">
                <div className="group relative bg-zinc-50 rounded-[2rem] p-10 h-[500px] flex flex-col transition-all duration-500 ease-out hover:bg-zinc-950 hover:shadow-2xl hover:shadow-zinc-900/30 overflow-hidden cursor-pointer">
                  
                  {/* Top Header: Icon + Plus Button */}
                  <div className="flex justify-between items-start mb-auto">
                     <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-zinc-800 transition-all duration-500">
                        <service.icon strokeWidth={1.5} size={32} className="text-zinc-900 group-hover:text-white transition-colors duration-500" />
                     </div>
                     <div className="text-zinc-300 group-hover:text-zinc-600 transition-colors duration-500 group-hover:rotate-90 transform">
                        <Plus size={32} strokeWidth={1.5} />
                     </div>
                  </div>

                  {/* Content Area */}
                  <div className="relative z-10 space-y-6">
                     <h3 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight group-hover:text-white transition-colors duration-500 leading-tight">
                       {service.title}
                     </h3>
                     <p className="text-xl text-zinc-500 font-semibold leading-relaxed break-keep group-hover:text-zinc-400 transition-colors duration-500">
                       {service.description}
                     </p>
                  </div>

                </div>
              </FadeIn>
            ))}
          </div>
       </div>
    </section>
  );
};