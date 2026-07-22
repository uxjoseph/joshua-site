import type { Metadata } from 'next';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  robots: { index: false },
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="section" style={{ paddingTop: '9rem' }}>
        <div className="inner" style={{ maxWidth: 720 }}>
          <h2>개인정보처리방침</h2>
          <p className="lead" style={{ marginBottom: '2rem' }}>
            {SITE.legalName}(이하 &ldquo;회사&rdquo;)는 문의 응대를 위해 아래와 같이 개인정보를 수집·이용합니다.
          </p>
          {[
            ['1. 수집 항목', '필수: 이름, 회사명, 이메일 주소, 연락처 / 선택: 문의 내용, 유입 경로'],
            ['2. 수집·이용 목적', '문의에 대한 상담 응대 및 안내 연락.'],
            ['3. 보유 및 이용 기간', '목적 달성 후 1년간 보관하며, 기간 경과 시 또는 삭제 요청 시 지체 없이 파기합니다.'],
            ['4. 처리 위탁', '이메일 발송 처리를 위해 Resend(클라우드 이메일 서비스)에 발송 처리를 위탁합니다. 수집된 정보는 상담 응대 외 제3자에게 제공되지 않습니다.'],
            ['5. 동의 거부 권리', '개인정보 수집·이용에 동의하지 않을 권리가 있습니다. 다만 필수 항목 미동의 시 문의 접수가 불가합니다.'],
            ['6. 개인정보 보호책임자', `${SITE.legalName} · 대표 ${SITE.ceo} · ${SITE.email}`],
          ].map(([h, b]) => (
            <div key={h} style={{ marginBottom: '1.6rem' }}>
              <h3 style={{ marginBottom: '.4rem' }}>{h}</h3>
              <p style={{ color: 'var(--body)', fontSize: '.95rem' }}>{b}</p>
            </div>
          ))}
          <p style={{ color: 'var(--muted)', fontSize: '.85rem' }}>시행일: 2026년 7월 22일</p>
        </div>
      </section>
    </main>
  );
}
