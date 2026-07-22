import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/lib/articles';
import { SITE } from '@/lib/data';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: { type: 'article', title: article.title, description: article.description, publishedTime: article.datePublished },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    inLanguage: 'ko',
    author: { '@type': 'Person', name: '조쉬 (Josh Kim)', worksFor: { '@type': 'Organization', name: SITE.legalName } },
    publisher: { '@type': 'Organization', name: SITE.legalName, url: SITE.url, logo: { '@type': 'ImageObject', url: `${SITE.url}/JOSHUA.png` } },
    mainEntityOfPage: `${SITE.url}/insights/${article.slug}`,
  };
  const faqLd = article.faq && {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <article className="section" style={{ paddingTop: '9rem' }}>
        <div className="inner" style={{ maxWidth: 720 }}>
          <p className="overline">{article.category} · {article.datePublished} · {article.readMinutes}분 읽기</p>
          <h2>{article.title}</h2>
          {article.body.map((b, i) => (
            <div key={i} style={{ marginTop: b.h ? '2.2rem' : '1.2rem' }}>
              {b.h && <h3 style={{ marginBottom: '.5rem' }}>{b.h}</h3>}
              {b.p && <p style={{ color: 'var(--body)', fontSize: '1rem', lineHeight: 1.75, wordBreak: 'keep-all' }}>{b.p}</p>}
            </div>
          ))}
          {article.faq && (
            <div className="faq" style={{ marginTop: '3rem' }}>
              <h3 style={{ margin: '0 0 .5rem' }}>자주 묻는 질문</h3>
              {article.faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          )}
          <div className="hero-cta" style={{ justifyContent: 'flex-start', marginTop: '3rem' }}>
            <Link className="btn btn-primary" href="/contact">AX 상담하기</Link>
            <Link className="btn btn-outline" href="/insights">목록으로</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
