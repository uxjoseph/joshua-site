import Link from 'next/link';

export function Nav() {
  return (
    <header className="nav" id="nav">
      <div className="nav-inner">
        <Link className="brand" href="/" aria-label="조슈아앤컴퍼니 홈">
          {/* SVG 는 next/image 의 최적화 대상이 아니다(벡터라 리사이즈가 무의미하고,
              next.config 에 dangerouslyAllowSVG 를 켜야 한다). 그냥 <img> 로 넣는다.
              2줄 워드마크라 1줄 로고보다 높이가 커야 각 줄이 읽힌다(32px → 한 줄 약 13px). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/joshua-logo.svg" alt="조슈아앤컴퍼니" width={93} height={32} />
        </Link>
        <nav className="links" aria-label="주요 메뉴">
          <Link href="/work">프로젝트</Link>
          <div className="drop">
            <button type="button" aria-haspopup="true">
              솔루션 <span className="caret" />
            </button>
            <div className="drop-menu" role="menu">
              <Link className="drop-item" href="/solutions/micky" role="menuitem">
                <span className="t">
                  MICKY <span className="tag new">Solution 01</span>
                </span>
                <span className="d">AI 네이티브 조직을 위한 회의록 에이전트 솔루션</span>
              </Link>
              <div className="drop-item" role="menuitem" aria-disabled="true">
                <span className="t" style={{ color: 'var(--muted-soft)' }}>
                  TALOS <span className="tag">준비 중</span>
                </span>
                <span className="d">제조 AX 온톨로지 솔루션, 준비하고 있습니다</span>
              </div>
            </div>
          </div>
          <Link href="/education">교육</Link>
          <Link href="/blog">블로그</Link>
          {/* 인사이트 메뉴는 콘텐츠 준비 전까지 비노출 (조쉬 지시, 2026-07-22) */}
          <Link href="/#about">회사소개</Link>
        </nav>
        <Link className="btn btn-primary btn-sm" href="/contact">
          문의하기
        </Link>
      </div>
    </header>
  );
}
