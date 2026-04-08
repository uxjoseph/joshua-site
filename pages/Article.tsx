import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { getPostBySlug, GhostPost } from '../lib/ghost';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};

export const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<GhostPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const data = await getPostBySlug(slug);
      if (cancelled) return;
      if (!data) {
        setNotFound(true);
      } else {
        setPost(data);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 pb-32 px-6 bg-white min-h-screen flex justify-center items-start">
        <Loader2 className="animate-spin text-zinc-300" size={48} />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="pt-40 pb-32 px-6 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6">아티클을 찾을 수 없습니다</h1>
          <p className="text-lg text-zinc-500 font-light mb-12">
            요청하신 아티클이 삭제되었거나 주소가 잘못되었을 수 있습니다.
          </p>
          <Link
            to="/newsletter"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-900 hover:text-zinc-600"
          >
            <ArrowLeft size={16} /> 뉴스레터 목록으로
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="pt-40 pb-32 px-6 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <Link
            to="/newsletter"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 mb-12"
          >
            <ArrowLeft size={14} /> All Articles
          </Link>

          <div className="flex items-center gap-4 text-zinc-400 mb-6">
            {post.tags?.[0] && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                {post.tags[0].name}
              </span>
            )}
            {post.tags?.[0] && <span className="h-px w-6 bg-zinc-200" />}
            <span className="text-xs font-mono">{formatDate(post.published_at)}</span>
            {post.reading_time != null && (
              <>
                <span className="h-px w-6 bg-zinc-200" />
                <span className="text-xs font-mono">{post.reading_time} min read</span>
              </>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.1] mb-12 break-keep">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed mb-16 break-keep">
              {post.excerpt}
            </p>
          )}
        </FadeIn>

        {post.feature_image && (
          <FadeIn delay={0.1}>
            <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-16 bg-zinc-100">
              <img src={post.feature_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.2}>
          <div
            className="ghost-content prose prose-lg max-w-none text-zinc-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-24 pt-12 border-t border-zinc-100 flex justify-between items-center">
            <Link
              to="/newsletter"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-900 hover:text-zinc-600"
            >
              <ArrowLeft size={16} /> 뉴스레터 목록
            </Link>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-zinc-400 hover:text-zinc-900"
            >
              View on Ghost ↗
            </a>
          </div>
        </FadeIn>
      </div>
    </article>
  );
};
