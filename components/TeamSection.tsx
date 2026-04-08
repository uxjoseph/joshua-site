import React from 'react';
import { FadeIn } from './FadeIn';
import { motion } from 'framer-motion';
import metadata from '../metadata.json';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-32 px-6 bg-white text-zinc-950 overflow-hidden">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6 block">
              Our People
            </span>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-zinc-900">About Us</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-zinc-500 max-w-md font-light leading-relaxed">
              비즈니스 통찰력과 기술적 전문성을 결합하여 <br />
              귀사의 완벽한 AI 전환(AX)을 함께 설계합니다.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          {metadata.team.map((member, idx) => (
            <FadeIn key={member.id} delay={idx * 0.1}>
              <div className="group flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 bg-zinc-100">
                  <motion.img 
                    src={member.image}
                    alt={member.name}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-zinc-950/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-zinc-400 mb-2 uppercase tracking-widest">
                    {member.role}
                  </span>
                  <h3 className="text-3xl font-bold text-zinc-900 mb-4">{member.name}</h3>
                  <p className="text-zinc-500 font-light leading-relaxed">
                    {member.description}
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
