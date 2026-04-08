import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../components/FadeIn';
import { ArrowRight, ImageIcon, Loader2 } from 'lucide-react';
import { getPosts, GhostPost, subscribeMember } from '../lib/ghost';

type SubscribeStatus = 'idle' | 'submitting' | 'success' | 'error';

export const Newsletter: React.FC = () => {
  const [posts, setPosts] = useState<GhostPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<SubscribeStatus>('idle');
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const fetchedPosts = await getPosts(10, 1);
      setPosts(fetchedPosts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('submitting');
    setSubscribeError(null);
    const result = await subscribeMember(email);
    if (result.ok) {
      setSubscribeStatus('success');
      setEmail('');
    } else {
      setSubscribeStatus('error');
      setSubscribeError(result.error || '알 수 없는 오류가 발생했습니다.');
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="pt-40 pb-32 px-6 bg-white min-h-screen">
      <div className="max-w-[90rem] mx-auto">
        <FadeIn>
          <div className="text-center mb-24">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6 block">
              JOSHUA Articles
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-zinc-900 mb-12">뉴스레터</h1>

            <p className="text-xl text-zinc-500 font-light leading-relaxed mb-10 break-keep max-w-2xl mx-auto">
              최신 AX 트렌드와 비즈니스 자동화 인사이트를 가장 먼저 메일함으로 받아보세요.
            </p>
            <div className="max-w-xl mx-auto">
            <form
              onSubmit={handleSubscribe}
              className="relative group shadow-2xl shadow-zinc-200/50 rounded-full overflow-hidden"
            >
              <input
                type="email"
                required
                disabled={subscribeStatus === 'submitting' || subscribeStatus === 'success'}
                placeholder="이메일 주소를 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-100 rounded-full py-5 px-8 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-300 transition-all duration-300 pr-32 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={subscribeStatus === 'submitting' || subscribeStatus === 'success'}
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-black text-white px-8 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-800 transition-colors disabled:opacity-60"
              >
                {subscribeStatus === 'submitting' ? '신청 중…' : subscribeStatus === 'success' ? '신청 완료' : '구독하기'}
              </button>
            </form>
            {subscribeStatus === 'success' && (
              <p className="mt-4 text-sm text-zinc-600">
                메일함에서 확인 링크를 눌러주시면 구독이 완료됩니다.
              </p>
            )}
            {subscribeStatus === 'error' && (
              <p className="mt-4 text-sm text-red-500">{subscribeError}</p>
            )}
            </div>
          </div>
        </FadeIn>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-zinc-300" size={48} />
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 mb-24">
            {posts.map((post, idx) => (
              <FadeIn key={post.id} delay={idx * 0.1}>
                <Link
                  to={`/newsletter/${post.slug}`}
                  className="group cursor-pointer block"
                >
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-8 bg-zinc-100 shadow-sm transition-shadow hover:shadow-xl border border-zinc-100">
                    {post.feature_image ? (
                      <img 
                        src={post.feature_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-300 bg-zinc-50">
                        <ImageIcon size={48} />
                      </div>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="absolute top-6 left-6">
                        <span className="bg-white/90 backdrop-blur-md text-zinc-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-zinc-200/50">
                          {post.tags[0].name}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="text-sm font-mono text-zinc-400">{formatDate(post.published_at)}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-xl line-clamp-2">
                      {post.excerpt || '내용이 없습니다.'}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mt-4 group-hover:translate-x-2 transition-transform">
                      Read Article <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-t border-zinc-100">
            <p className="text-zinc-400 mb-4">발행된 아티클이 아직 없습니다.</p>
            <p className="text-[10px] text-zinc-300 uppercase tracking-[0.2em] font-bold">Ghost CMS API Connected</p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="text-center py-20 border-t border-zinc-100">
            <p className="text-zinc-400 mb-2">모든 아티클을 확인하셨습니다.</p>
            <p className="text-[10px] text-zinc-300 uppercase tracking-[0.2em] font-bold">Ghost CMS API Connected</p>
          </div>
        )}
      </div>
    </div>
  );
};
