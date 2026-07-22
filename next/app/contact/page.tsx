import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: '문의하기 — 영업일 1일 내 답변',
  description: '교육·AX 구축·솔루션(TALOS·MICKY) 도입 문의. 영업일 1일 내 답변드리며, 30분 커피챗도 바로 예약할 수 있습니다.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main>
      <section className="section cta" style={{ paddingTop: '9rem' }}>
        <div className="inner contact-grid">
          <div className="reveal contact-copy">
            <p className="overline">Contact</p>
            <h2>어디서부터 시작할지,<br /><strong>무료로 빠르게 상담해보세요</strong></h2>
            <p className="lead">교육이든, 구축이든, 솔루션이든 — 무엇이 먼저인지부터 함께 정리해드립니다.</p>
            <p className="sla">
              영업일 1일 내 답변드립니다.{' · '}
              <a href={`mailto:${SITE.email}`} style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>{SITE.email}</a>
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
