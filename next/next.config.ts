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
};

export default nextConfig;
