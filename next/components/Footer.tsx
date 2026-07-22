import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/lib/data';

export function Footer() {
  return (
    <footer>
      <div className="foot">
        <div className="foot-top">
          <div className="foot-brand">
            <Image src="/JOSHUA.png" alt="JOSHUA" width={120} height={24} style={{ height: 24, width: 'auto' }} />
            <p>교육부터 구축, 운영까지 — 독립 AX 컨설팅·구현사 조슈아앤컴퍼니입니다.</p>
          </div>
          <div className="foot-cols">
            <div>
              <h4>Services</h4>
              <Link href="/education">기업교육</Link>
              <Link href="/work">AX 구축</Link>
              <Link href="/solutions/micky">솔루션 — MICKY</Link>
              <span className="dim">솔루션 — TALOS (준비 중)</span>
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
          </div>
          <div className="row">
            <a href={SITE.sns.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href={SITE.sns.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={SITE.sns.threads} target="_blank" rel="noopener noreferrer">Threads</a>
          </div>
          <span>© {new Date().getFullYear()} JOSHUA All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
