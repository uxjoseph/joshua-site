import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS, SITE } from '@/lib/data';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.hook ?? project.title} - AX 프로젝트`,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { type: 'article', title: project.title, description: project.description, images: [project.image] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const projectLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    dateCreated: project.year,
    inLanguage: 'ko',
    image: `${SITE.url}${project.image}`,
    creator: { '@type': 'Organization', name: SITE.legalName, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/work/${project.slug}`,
  };

  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectLd) }} />

      <article className="section" style={{ paddingTop: '9rem' }}>
        <div className="inner" style={{ maxWidth: 860 }}>
          <p className="overline">{project.category} · {project.year}</p>
          <h2>{project.hook ?? project.title}</h2>
          {project.hook && (
            <p className="lead" style={{ marginTop: '.8rem' }}>{project.title}</p>
          )}

          <div style={{ marginTop: '2.4rem', borderRadius: 'var(--r-xl)', overflow: 'hidden', border: '1px solid var(--hairline)' }}>
            <Image
              src={project.image}
              alt={project.title}
              width={1280}
              height={800}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
          </div>

          <div style={{ marginTop: '2.6rem' }}>
            <h3 style={{ marginBottom: '.6rem' }}>프로젝트 개요</h3>
            <p style={{ color: 'var(--body)', fontSize: '1rem', lineHeight: 1.75, wordBreak: 'keep-all' }}>{project.description}</p>
          </div>

          <dl className="proj-facts">
            <div>
              <dt>클라이언트</dt>
              <dd>SK그룹</dd>
            </div>
            <div>
              <dt>분야</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>연도</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>

          <div className="hero-cta" style={{ justifyContent: 'flex-start', marginTop: '3rem' }}>
            <Link className="btn btn-primary" href="/contact" data-cta-location="page_bottom">이런 프로젝트가 필요하다면</Link>
            <Link className="btn btn-outline" href="/work">전체 프로젝트 보기</Link>
          </div>
        </div>
      </article>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="inner">
          <h3>다른 프로젝트</h3>
          <div className="pf-feature" style={{ marginTop: '1.4rem' }}>
            {others.map((p) => (
              <Link className="pf-card" href={`/work/${p.slug}`} key={p.slug}>
                <div className="thumb">
                  <Image src={p.image} alt={p.title} width={640} height={400} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div className="pad">
                  <span className="cat">{p.category} · {p.year}</span>
                  <h3>{p.hook ?? p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
