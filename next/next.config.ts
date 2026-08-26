import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 기존 라우트 호환: 뉴스레터 경로는 인사이트로 301
  async redirects() {
    return [
      { source: '/newsletter', destination: '/insights', permanent: true },
      { source: '/newsletter/:slug', destination: '/insights', permanent: true },
      { source: '/talos', destination: '/solutions/talos', permanent: true },
    ];
  },
  // inblog 서브디렉토리 연동 (인디코 제공 코드, 2026-08-26)
  // beforeFiles: Next.js 파일 시스템 라우팅 이전에 프록시로 리라이트
  // ⚠️ /robots.txt 도 인블로그 프록시로 넘어가므로 기존 app/robots.ts는 무효화됨
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/blog',
          destination: 'https://proxy.inblog.dev/joshuaandcompany',
        },
        {
          source: '/blog/:path*',
          destination: 'https://proxy.inblog.dev/joshuaandcompany/:path*',
        },
        {
          source: '/robots.txt',
          destination: 'https://proxy.inblog.dev/joshuaandcompany/robots.txt',
        },
      ],
    };
  },
};

export default nextConfig;
