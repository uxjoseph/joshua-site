import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: "Joshua는 어떤 기업에게 적합한가요?", a: "AI 도입을 고민하지만 시작점을 모르는 기업, 반복 업무로 인한 비효율을 겪는 기업, 그리고 구성원들의 디지털 리터러시를 높이고 싶은 모든 조직에 적합합니다." },
  { q: "개발 지식이 전혀 없어도 의뢰할 수 있나요?", a: "물론입니다. Joshua는 비개발자도 이해할 수 있는 언어로 소통하며, 기획부터 설계, 개발, 교육까지 전 과정을 책임지고 리드합니다." },
  { q: "프로젝트 기간은 보통 얼마나 걸리나요?", a: "프로젝트 규모에 따라 다르지만, MVP(최소 기능 제품) 기준 보통 4주~8주 정도 소요됩니다. 발견 단계부터 정착까지 꼼꼼하게 관리합니다." },
  { q: "유지보수는 어떻게 진행되나요?", a: "프로젝트 종료 후에도 안정화 기간을 제공하며, 필요 시 월 단위 유지보수 계약을 통해 지속적인 업데이트와 모니터링을 지원합니다." }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-40 px-6 max-w-[90rem] mx-auto">
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
           <FadeIn>
             <div className="flex items-center gap-3 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Q&A</span>
             </div>
             <h2 className="text-4xl font-semibold text-zinc-900 leading-tight">Frequently<br/>Asked Questions</h2>
           </FadeIn>
        </div>

        <div className="md:col-span-8">
          <div className="space-y-0 divide-y divide-zinc-200 border-t border-b border-zinc-200">
            {faqs.map((faq, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="group">
                  <button 
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full flex justify-between items-start py-10 text-left hover:bg-zinc-50 transition-colors -mx-4 px-6 rounded-lg"
                  >
                    <span className="text-xl md:text-2xl font-semibold text-zinc-900 w-[90%] leading-snug">
                      {faq.q}
                    </span>
                    <motion.span 
                      animate={{ rotate: openIndex === idx ? 45 : 0 }}
                      className="text-zinc-400 group-hover:text-black transition-colors mt-1"
                    >
                      <Plus strokeWidth={1.5} size={32} />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden px-6"
                      >
                        <div className="pb-10 text-xl font-medium text-zinc-500 leading-relaxed max-w-3xl">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};