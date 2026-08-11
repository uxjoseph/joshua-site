import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/data';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 검색·AI 봇은 명시적으로 환영한다. GEO 관점에서 이 봇들이 곧 유통 채널이다.
      { userAgent: ['Googlebot', 'Bingbot', 'Yeti'], allow: '/' },
      { userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'anthropic-ai', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'cohere-ai'], allow: '/' },
      // SEO 스크레이퍼는 노출에 기여하지 않으면서 트래픽만 소모한다.
      { userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'BLEXBot', 'DataForSeoBot', 'PetalBot'], disallow: '/' },
      // 그 외 봇은 API 경로만 제외하고 허용.
      { userAgent: '*', allow: '/', disallow: '/api/' },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
