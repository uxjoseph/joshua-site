'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

/**
 * 히어로 배경의 수렴 레인 + 시그널 트레일 모션.
 * 원본은 classic script(window.ParticleFunnel)라 번들에 넣지 않고 public/에서 그대로 불러온다.
 */
type FunnelInstance = { start(): FunnelInstance; destroy(): void };
type FunnelCtor = new (canvas: HTMLCanvasElement, options: Record<string, unknown>) => FunnelInstance;

declare global {
  interface Window {
    ParticleFunnel?: FunnelCtor;
  }
}

const OPTIONS = {
  bgColor: null, // 페이지 배경 위에 얹히도록 캔버스는 투명하게
  lineColor: '#0621c4', // --accent (레인은 같은 색을 아주 낮은 불투명도로)
  signalColor: '#0621c4', // --accent
  lineOpacity: 0.18, // 반투명이라 배경 틴트가 그대로 비쳐 이질감이 없다

  lineCount: 10,
  signalCount: 20,
  spreadHeight: 44,
  // 카피가 가운데 정렬이라 수렴점도 화면 중앙에 둔다
  convergePointX: 50,
  convergeSpread: 0.07, // 한 줄로 합치지 않고 좁은 띠로 모은다
  mirror: true, // 중앙에서 조였다가 다시 벌어지는 좌우 대칭 형태
  curvePower: 0.89,
  waveSpeed: 4.4,
  waveHeight: 0,
  dotSpeed: 0.4,
  trailLength: 45,
  blend: 'multiply',
  lineWeight: 1.5,
  signalWeight: 1.1,
};

export function HeroFunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ParticleFunnel = window.ParticleFunnel;
    if (!ready || !canvas || !ParticleFunnel) return;
    const funnel = new ParticleFunnel(canvas, OPTIONS).start();
    return () => funnel.destroy();
  }, [ready]);

  return (
    <>
      <div className="hero-funnel" aria-hidden="true">
        <canvas ref={canvasRef} />
      </div>
      {/* onReady는 최초 로드 + 클라이언트 내비게이션 재마운트 양쪽에서 호출된다 */}
      <Script src="/particle-funnel.js" strategy="afterInteractive" onReady={() => setReady(true)} />
    </>
  );
}
