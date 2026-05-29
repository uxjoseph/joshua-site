import React from 'react';

type Logo = { name: string; src?: string; noInvert?: boolean };

const LOGOS: Logo[] = [
  { name: '삼성',           src: '/logos/samsung.svg' },
  { name: 'LG전자',         src: '/logos/lg.svg' },
  { name: 'SK하이닉스',     src: '/logos/skhynix.svg' },
  { name: 'SK이노베이션',   src: '/logos/skinnovation.svg' },
  { name: 'SK주식회사',     src: '/logos/sk.svg' },
  { name: '카카오뱅크',     src: '/logos/kakaobank.svg' },
  { name: '카카오모빌리티', src: '/logos/kakaomobility.svg' },
  { name: '델 테크놀로지스', src: '/logos/dell.svg' },
  { name: '세일즈포스',     src: '/logos/salesforce.svg' },
  { name: '신한',           src: '/logos/shinhan.svg' },
  { name: '매드업',         src: '/logos/madup.svg' },
  { name: '이노션',         src: '/logos/innocean.svg' },
  { name: '뷰티셀렉션',     src: '/logos/beautyselection.png' },
  { name: 'LG U+',          src: '/logos/lguplus.svg' },
  { name: '밀리의서재',     src: '/logos/millie.png' },
  { name: '월급쟁이부자들', src: '/logos/weolbu.png' },
];

const LogoItem: React.FC<{ logo: Logo }> = ({ logo }) =>
  logo.src ? (
    <img
      src={logo.src}
      alt={logo.name}
      className={`h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity ${
        logo.noInvert ? '' : 'brightness-0 invert'
      }`}
    />
  ) : (
    <span className="text-xl md:text-2xl font-bold text-white opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap tracking-tight">
      {logo.name}
    </span>
  );

export const ClientLogos: React.FC = () => {
  // Render the list twice for seamless marquee loop.
  const reel = [...LOGOS, ...LOGOS];

  return (
    <section className="bg-zinc-950 text-white py-20 md:py-24 overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
          Partners &amp; Clients
        </span>
        <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-white">
          국내외 선도 기업이 JOSHUA와 함께합니다
        </h2>
      </div>

      <div
        className="relative group"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div
          className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        >
          {reel.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="flex items-center justify-center shrink-0 px-10 md:px-14 h-16"
            >
              <LogoItem logo={logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
