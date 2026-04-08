import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { subscribeMember } from '../lib/ghost';

type SubscribeStatus = 'idle' | 'submitting' | 'success' | 'error';

export const NewsletterCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscribeStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
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
    <section className="py-32 px-6 bg-white text-zinc-950">
      <div className="max-w-[90rem] mx-auto">
        <div className="bg-zinc-950 rounded-3xl p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
          {/* Subtle Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-50%] left-[-10%] w-[100%] h-[100%] rounded-full bg-blue-500 blur-[150px]" />
          </div>

          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6 block">
              Join Our Newsletter
            </span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-8 text-balance">
              JOSHUA의 AI 인사이트를 <br />메일함으로 받아보세요
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light">
              최신 AX 트렌드, SK그룹 등 선도 기업의 성공 사례, <br className="hidden md:block" /> 
              그리고 비즈니스 자동화 워크플로우를 정기적으로 공유합니다.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} fullWidth>
            <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto w-full group">
              <input
                type="email"
                required
                disabled={status === 'submitting' || status === 'success'}
                placeholder="이메일 주소를 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-transparent rounded-full py-6 px-10 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/50 transition-all duration-300 pr-36 shadow-xl shadow-black/20 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className="absolute right-2 top-2 bottom-2 bg-black text-white px-8 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-60"
              >
                {status === 'submitting' ? '신청 중…' : status === 'success' ? '신청 완료' : (<>구독하기 <Send size={14} /></>)}
              </button>
            </form>
            {status === 'success' && (
              <p className="mt-6 text-sm text-zinc-300 text-center">
                메일함에서 확인 링크를 눌러주시면 구독이 완료됩니다.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-6 text-sm text-red-400 text-center">{errorMessage}</p>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
