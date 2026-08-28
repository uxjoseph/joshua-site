import type { Metadata } from 'next';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: '빠른 PDF 뷰어 개인정보처리방침',
  robots: { index: false },
  alternates: { canonical: '/privacy/pdf-viewer' },
};

const SECTIONS: [string, string[]][] = [
  [
    '제1조 (회사가 직접 수집하지 않는 정보)',
    [
      '앱은 회원가입 기능이 없으며, 이름·이메일·전화번호 등 이용자를 직접 식별할 수 있는 정보를 회사 서버로 수집하거나 전송하지 않습니다.',
      '이용자가 앱에서 여는 PDF 문서의 내용과 파일은 이용자의 기기 내에서만 처리되며 외부로 전송되지 않습니다.',
    ],
  ],
  [
    '제2조 (기기에만 저장되는 정보)',
    [
      '최근 문서 목록(파일 경로 및 마지막 열람 시각)은 이용자 편의를 위해 기기 내부 저장소에만 보관되며 외부로 전송되지 않습니다. 앱을 삭제하면 함께 삭제됩니다.',
    ],
  ],
  [
    '제3조 (광고를 통해 수집되는 정보)',
    [
      '앱은 무료 제공을 위해 Google AdMob 배너 광고를 게재합니다. 이 과정에서 Google LLC 및 그 파트너가 아래 정보를 수집·이용할 수 있습니다.',
      '① 광고 식별자(AAID): 광고 게재 및 성과 측정',
      '② 기기 정보(모델·운영체제 버전·언어): 광고 최적화',
      '③ 대략적 위치(IP 주소 기반 국가·지역 수준): 지역별 광고 게재',
      '④ 앱 사용 이벤트(광고 노출·클릭): 광고 성과 측정 및 무효 트래픽 방지',
      'Google의 데이터 처리에 관한 자세한 내용은 policies.google.com/technologies/partner-sites 에서 확인하실 수 있습니다.',
    ],
  ],
  [
    '제4조 (광고 맞춤설정 거부 방법)',
    [
      '이용자는 기기 설정에서 언제든지 맞춤 광고를 거부할 수 있습니다.',
      '① Android: 설정 > Google > 광고 > 광고 ID 삭제 또는 맞춤 광고 선택 해제',
      '② Google 광고 설정(adssettings.google.com)에서 직접 관리',
    ],
  ],
  [
    '제5조 (파일 접근 권한)',
    [
      '앱은 이용자가 선택한 PDF 파일을 열기 위해서만 저장소에 접근합니다.',
      '파일 관리자·메신저·브라우저 등 다른 앱에서 PDF를 열도록 선택한 경우 해당 파일만 전달받아 화면에 표시하며, 이용자가 선택하지 않은 파일을 임의로 읽거나 수집하지 않습니다.',
    ],
  ],
  [
    '제6조 (개인정보의 보유 및 파기)',
    [
      '회사는 이용자의 개인정보를 서버에 보유하지 않습니다. 기기 내 저장 정보는 앱 삭제 시 즉시 파기됩니다.',
      '광고 관련 정보의 보유기간은 Google의 정책을 따릅니다.',
    ],
  ],
  [
    '제7조 (만 14세 미만 아동의 개인정보)',
    [
      '앱은 만 14세 미만 아동을 주 대상으로 하지 않으며, 아동의 개인정보를 고의로 수집하지 않습니다.',
    ],
  ],
  [
    '제8조 (정보주체의 권리·의무 및 행사 방법)',
    [
      '정보주체는 개인정보 열람·정정·삭제·처리정지를 요구할 수 있습니다. 회사가 별도로 보유하는 개인정보는 없으나, 문의사항은 제9조의 연락처로 접수해 주시기 바랍니다.',
    ],
  ],
  [
    '제9조 (개인정보 보호책임자 및 문의처)',
    [
      '① 이메일: hello@joshua.site',
      '② 전화: 02-3149-6920',
      '③ 주소: 서울특별시 구로구 디지털로26길 43, 엘동 5층 502·503호',
    ],
  ],
  [
    '제10조 (권익침해 구제방법)',
    [
      '정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에 분쟁 해결이나 상담 등을 신청할 수 있습니다.',
      '① 개인정보침해 신고센터 (한국인터넷진흥원): 국번 없이 118 / privacy.kisa.or.kr',
      '② 개인정보 분쟁조정위원회: 1833-6972 / kopico.go.kr',
      '③ 대검찰청 사이버수사과: 국번 없이 1301',
      '④ 경찰청 사이버수사국: 국번 없이 182',
    ],
  ],
  [
    '제11조 (개인정보처리방침의 변경)',
    [
      '이 개인정보처리방침의 내용이 추가·삭제·수정되는 경우 시행 최소 7일 전에 본 페이지를 통해 고지합니다.',
    ],
  ],
];

export default function PrivacyPdfViewerPage() {
  return (
    <main>
      <section className="section" style={{ paddingTop: '9rem' }}>
        <div className="inner" style={{ maxWidth: 720 }}>
          <h2>빠른 PDF 뷰어 개인정보처리방침</h2>
          <p className="lead" style={{ marginBottom: '2rem' }}>
            {SITE.legalName}(이하 &ldquo;회사&rdquo;)가 제공하는 Android 앱 &ldquo;빠른 PDF 뷰어&rdquo;
            (패키지명 com.appfactory.pdf_viewer)에 적용되는 개인정보처리방침입니다. 회사 웹사이트에
            적용되는 방침은 별도 페이지(/privacy)를 참고해 주시기 바랍니다.
          </p>
          {SECTIONS.map(([h, paras]) => (
            <div key={h} style={{ marginBottom: '1.6rem' }}>
              <h3 style={{ marginBottom: '.4rem' }}>{h}</h3>
              {paras.map((p) => (
                <p key={p} style={{ color: 'var(--body)', fontSize: '.95rem', marginBottom: '.35rem' }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p style={{ color: 'var(--muted)', fontSize: '.85rem' }}>시행일: 2026년 8월 28일</p>
        </div>
      </section>
    </main>
  );
}
