import Link from 'next/link';
import { SITE } from '@/lib/data';

export function Footer() {
  return (
    <footer className="site-foot">
      <div className="foot">
        <div className="foot-top">
          <div className="foot-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/joshua-logo.svg" alt="조슈아앤컴퍼니" width={128} height={44} />
            <p>교육부터 구축, 운영까지 함께하는 독립 AX 컨설팅·구현사 조슈아앤컴퍼니입니다.</p>
          </div>
          <div className="foot-cols">
            <div>
              <h4>Services</h4>
              <Link href="/education">기업교육</Link>
              <Link href="/work">AX 구축</Link>
              <Link href="/solutions/micky">솔루션 · MICKY</Link>
              <span className="dim">솔루션 · TALOS (준비 중)</span>
            </div>
            <div>
              <h4>Company</h4>
              <Link href="/#about">회사소개</Link>
              <Link href="/contact">문의하기</Link>
              <Link href="/privacy">개인정보처리방침</Link>
            </div>
            <div>
              <h4>Contact</h4>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <span>{SITE.phone}</span>
              <span>
                서울특별시 구로구 디지털로26길 43,
                <br />
                엘동 5층 502, 503호
              </span>
            </div>
          </div>
        </div>
        <div className="foot-legal">
          <div className="row">
            <span>상호: {SITE.legalName}</span>
            <span>대표: {SITE.ceo}</span>
            <span>사업자등록번호: {SITE.bizNo}</span>
            <span>전화: 02-3149-6920</span>
          </div>
          <div className="row">
            <a href={SITE.sns.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href={SITE.sns.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={SITE.sns.threads} target="_blank" rel="noopener noreferrer">Threads</a>
          </div>
          <div className="row">
            <Link href="/privacy" style={{ fontWeight: 700 }}>개인정보처리방침</Link>
          </div>
          <span>© {new Date().getFullYear()} JOSHUA All rights reserved.</span>
        </div>
      </div>
      {/* 초대형 워드마크 밴드 — 흰 패널이 위로 걷히면서 드러난다.
          장식이라 스크린리더는 건너뛴다(위 .foot-brand 에 이미 같은 로고가 있다). */}
      <div className="foot-mark" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/joshua-logo.svg" alt="" width={601} height={207} />
      </div>
    </footer>
  );
}
