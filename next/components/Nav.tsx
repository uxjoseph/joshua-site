import Link from 'next/link';
import Image from 'next/image';

export function Nav() {
  return (
    <header className="nav" id="nav">
      <div className="nav-inner">
        <Link className="brand" href="/" aria-label="JOSHUA 홈">
          <Image src="/JOSHUA.png" alt="JOSHUA" width={110} height={22} style={{ height: 22, width: 'auto' }} priority />
        </Link>
        <nav className="links" aria-label="주요 메뉴">
          <Link href="/work">프로젝트</Link>
          <div className="drop">
            <button type="button" aria-haspopup="true">
              솔루션 <span className="caret" />
            </button>
            <div className="drop-menu" role="menu">
              <Link className="drop-item" href="/solutions/talos" role="menuitem">
                <span className="t">
                  TALOS <span className="tag new">Solution 01</span>
                </span>
                <span className="d">제조 AX 온톨로지 — 데이터를 연결하면 공장이 답합니다</span>
              </Link>
              <Link className="drop-item" href="/solutions/micky" role="menuitem">
                <span className="t">
                  MICKY <span className="tag new">Solution 02</span>
                </span>
                <span className="d">AI 회의록 — 쌓인 회의 맥락이 곧 팀의 에이전트가 됩니다</span>
              </Link>
            </div>
          </div>
          <Link href="/education">교육</Link>
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
