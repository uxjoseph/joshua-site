import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: "OCR 문서 자동화 솔루션",
    category: "Finance Tech",
    year: "2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "앱스토어 리뷰 분석 에이전트",
    category: "Data Analytics",
    year: "2023",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "물류 관제 대시보드",
    category: "Enterprise",
    year: "2023",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
  },
  {
    title: "법률 상담 AI 챗봇",
    category: "Law Firm",
    year: "2024",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2612&auto=format&fit=crop"
  },
  {
    title: "제조 공정 이상 탐지 AI",
    category: "Smart Factory",
    year: "2024",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop"
  }
];

export const PortfolioSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-32 px-6 bg-zinc-950 text-white relative min-h-screen flex flex-col">
      
      {/* Background Hover Image Reveal */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
         <AnimatePresence mode="wait">
            {hoveredIndex !== null && (
               <motion.div 
                 key={hoveredIndex}
                 initial={{ opacity: 0, scale: 1.1 }}
                 animate={{ opacity: 0.2, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.05 }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="absolute inset-0 w-full h-full"
               >
                 <img 
                    src={projects[hoveredIndex].image}
                    alt="Project Preview"
                    className="w-full h-full object-cover grayscale opacity-50"
                 />
                 <div className="absolute inset-0 bg-zinc-950/40"></div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      <div className="max-w-[90rem] mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
           <FadeIn>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6 block">
                Selected Works
              </span>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tight">포트폴리오</h2>
           </FadeIn>
           <FadeIn delay={0.2}>
             <a href="#" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-zinc-400 transition-colors">
               View All Projects <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
             </a>
           </FadeIn>
        </div>

        <div className="flex flex-col" onMouseLeave={() => setHoveredIndex(null)}>
          {projects.map((project, idx) => (
            <FadeIn key={idx} delay={idx * 0.05} fullWidth>
              <div 
                className="group border-t border-zinc-800 py-12 flex flex-col md:flex-row md:items-center justify-between cursor-pointer relative transition-all duration-500 hover:pl-6"
                onMouseEnter={() => setHoveredIndex(idx)}
              >
                <div className="flex items-baseline gap-6 md:gap-12 z-10 pointer-events-none">
                   <span className="text-base font-mono font-bold text-zinc-600 group-hover:text-zinc-400 transition-colors">0{idx + 1}</span>
                   <h3 className="text-3xl md:text-5xl font-medium text-zinc-300 group-hover:text-white transition-colors duration-300">
                     {project.title}
                   </h3>
                </div>
                
                <div className="flex items-center gap-8 md:gap-12 mt-4 md:mt-0 z-10 opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                   <span className="text-sm font-medium tracking-wide uppercase border border-zinc-700 px-4 py-1.5 rounded-full">{project.category}</span>
                   <span className="text-sm font-medium tracking-wide">{project.year}</span>
                </div>
              </div>
            </FadeIn>
          ))}
          <div className="border-t border-zinc-800" />
        </div>

      </div>
    </section>
  );
};