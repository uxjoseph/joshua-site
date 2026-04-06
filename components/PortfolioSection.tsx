import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: "SK그룹 전사 경영 지식 AX 전환 및 멀티모달 오케스트레이션",
    description: "7만 5천 건의 기업 핵심 지식 자산을 RAG 기반으로 체계화하고, 선대회장의 화법과 음성으로 응답 및 발표자료를 자동 생성하는 엔터프라이즈 AX 시스템입니다.",
    category: "Enterprise AX",
    year: "2026",
    image: "/portfolio/ax-2026-02.png"
  },
  {
    title: "SK그룹 전사 AI 역량 혁신 플랫폼 및 구성원 활동 데이터 인텔리전스",
    description: "SK그룹 교육 조직의 AI 내재화를 가속하기 위해 4단계 역할 기반 권한 체계와 AI 에이전트 마켓플레이스, 성과 정량 측정 시스템을 통합한 엔터프라이즈 AX 거버넌스 플랫폼입니다.",
    category: "AX Governance",
    year: "2026",
    image: "/portfolio/ax-2026-12.png"
  },
  {
    title: "SK그룹 HRD 교육운영 지능화 및 AI 에이전트 오케스트레이션 시스템",
    description: "복잡한 교육과정 관리와 신규 담당자의 온보딩을 돕기 위해 Slack 연동 Q&A, D-day 기반 마일스톤 자동 생성 및 체크리스트 추적 기능을 통합한 SK그룹 전사적 AX 솔루션입니다.",
    category: "Enterprise AX",
    year: "2026",
    image: "/portfolio/ax-2026-21.png"
  },
  {
    title: "SK그룹 교육그룹 전사 성과지표(PI) 실시간 통합 관리 및 데이터 인텔리전스",
    description: "SK그룹 교육 영역의 11개 핵심 성과지표(KPI)를 실시간으로 통합 조망하고 데이터 기반의 빠른 의사결정을 지원하기 위해 수작업 프로세스를 자동화한 엔터프라이즈 PI 대시보드입니다.",
    category: "Data Intelligence",
    year: "2026",
    image: "/portfolio/ax-2026-30.png"
  },
  {
    title: "SK그룹 인재개발 AI 오케스트레이션 및 오프라인 교육 운영 통합 플랫폼",
    description: "15개 계열사, 수만 명 대상의 오프라인 집합교육 운영 시 발생하는 학습자 취합, 분과 편성, 좌석 배치, 7종 인쇄물 제작 및 AI 설문 분석을 통합 오케스트레이션하는 엔터프라이즈 운영 대시보드입니다.",
    category: "Enterprise AX",
    year: "2026",
    image: "/portfolio/ax-2026-42.png"
  },
  {
    title: "SK그룹 사내 교육 플랫폼 AI 멀티모달 이미지 생성 및 자동 QA 시스템",
    description: "교육 홍보물 제작 시간을 수일에서 수 분으로 단축하기 위해 멀티모달 AI 기반 이미지 생성 워크플로우와 Vision QA 자동 품질 검증 파이프라인을 구축한 SK그룹의 창의적 AX 솔루션입니다.",
    category: "Creative AI & AX",
    year: "2026",
    image: "/portfolio/ax-2026-52.png"
  }
];

export const PortfolioSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-32 px-6 bg-zinc-950 text-white relative min-h-screen">
      
      {/* Sticky Mockup Wrapper - Single Static Image Showcase (Desktop only) */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="sticky top-0 h-screen w-full hidden lg:flex items-center justify-end pr-12 z-30">
           <AnimatePresence mode="wait">
              {hoveredIndex !== null && (
                 <motion.div 
                   key={hoveredIndex}
                   initial={{ opacity: 0, x: 150, rotateY: -25, scale: 0.8 }}
                   animate={{ opacity: 1, x: 0, rotateY: -15, scale: 1 }}
                   exit={{ opacity: 0, x: -100, rotateY: 0, scale: 0.9 }}
                   transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                   className="relative w-[45%] aspect-video rounded-xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-zinc-800 bg-zinc-900 overflow-hidden"
                   style={{ perspective: "1500px" }}
                 >
                   {/* Browser Mockup Header */}
                   <div className="absolute top-0 left-0 right-0 h-7 bg-zinc-800/90 backdrop-blur-md flex items-center px-4 gap-2 z-20">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                   </div>

                   {/* Static Representative Image */}
                   <div className="relative w-full h-full mt-7">
                        <img 
                          src={projects[hoveredIndex].image}
                          alt="Project Preview"
                          className="w-full h-full object-cover contrast-110"
                        />
                   </div>
                   
                   <div className="absolute inset-0 bg-gradient-to-l from-zinc-950/0 via-transparent to-zinc-950/40 z-10" />
                 </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
           <FadeIn>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6 block">
                Featured Case Studies
              </span>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tight">AX 포트폴리오</h2>
           </FadeIn>
           <FadeIn delay={0.2}>
             <a href="#" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-zinc-400 transition-colors">
               View All Projects <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
             </a>
           </FadeIn>
        </div>

        <div className="flex flex-col relative" onMouseLeave={() => setHoveredIndex(null)}>
          {projects.map((project, idx) => (
            <FadeIn key={idx} delay={idx * 0.05} fullWidth>
              <div 
                className="group border-t border-zinc-800/50 py-12 flex flex-col lg:flex-row lg:items-start justify-between cursor-pointer relative transition-all duration-500 hover:pl-6"
                onMouseEnter={() => setHoveredIndex(idx)}
                onClick={() => setHoveredIndex(hoveredIndex === idx ? null : idx)}
              >
                <div className="flex flex-col gap-4 z-20 pointer-events-none w-full lg:max-w-xl xl:max-w-2xl">
                   <div className="flex items-baseline gap-6 md:gap-12">
                      <span className="text-base font-mono font-bold text-zinc-600 group-hover:text-zinc-400 transition-colors">0{idx + 1}</span>
                      <h3 className="text-2xl md:text-4xl font-medium text-zinc-400 group-hover:text-white transition-colors duration-300 text-balance">
                        {project.title}
                      </h3>
                   </div>
                   
                   {/* Summary Text Reveal */}
                   <motion.p 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: hoveredIndex === idx ? "auto" : 0, 
                        opacity: hoveredIndex === idx ? 0.6 : 0,
                        marginTop: hoveredIndex === idx ? 8 : 0
                      }}
                      className="ml-12 md:ml-24 text-base text-zinc-400 font-light leading-relaxed overflow-hidden pr-8"
                   >
                     {project.description}
                   </motion.p>

                   {/* Mobile Image Display (Only on < lg) */}
                   <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: hoveredIndex === idx ? "auto" : 0, 
                        opacity: hoveredIndex === idx ? 1 : 0,
                        marginTop: hoveredIndex === idx ? 24 : 0
                      }}
                      className="lg:hidden ml-12 md:ml-24 overflow-hidden"
                   >
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                   </motion.div>
                </div>
                
                <div className="flex items-center gap-8 md:gap-12 mt-6 lg:mt-0 z-20 opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shrink-0 ml-12 md:ml-24 lg:ml-0">
                   <span className="text-sm font-medium tracking-wide uppercase border border-zinc-700 px-4 py-1.5 rounded-full">{project.category}</span>
                   <span className="text-sm font-mono font-bold">{project.year}</span>
                </div>
              </div>
            </FadeIn>
          ))}
          <div className="border-t border-zinc-800/50" />
        </div>

      </div>
    </section>
  );
};