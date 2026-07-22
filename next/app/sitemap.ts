import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/lib/articles';
import { SITE } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ['', '/education', '/solutions', '/solutions/talos', '/solutions/micky', '/work', '/insights', '/contact'].map((r) => ({
    url: `${SITE.url}${r}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: r === '' ? 1 : 0.8,
  }));
  const articles = ARTICLES.map((a) => ({
    url: `${SITE.url}/insights/${a.slug}`,
    lastModified: new Date(a.datePublished),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  return [...routes, ...articles];
}
