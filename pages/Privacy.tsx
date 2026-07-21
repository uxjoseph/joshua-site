import React from 'react';
import { FadeIn } from '../components/FadeIn';

const EFFECTIVE_DATE = '2026년 07월 21일';

export const Privacy: React.FC = () => {
  return (
    <div className="pt-40 pb-32 px-6 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6 block">
            Privacy Policy
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-8">
            개인정보 처리방침
          </h1>
          <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed break-keep mb-16">
            (주)조슈아앤컴퍼니(이하 '회사')는 「개인정보 보호법」 제30조에 따라 정보주체의
            개인정보를 보호하고 이와 관련한 고충을 신속하게 처리하기 위하여 다음과 같이 개인정보
            처리방침을 수립·공개합니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="space-y-12 text-zinc-700 leading-relaxed break-keep">

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">제1조 (개인정보의 처리 목적)</h2>
              <p>회사는 다음의 목적을 위하여 개인정보를 처리하며, 처리한 개인정보는 다음의 목적 이외의 용도로는 이용하지 않습니다.</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>문의 접수 및 상담, 회신, 서비스 안내</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">제2조 (수집하는 개인정보 항목)</h2>
              <p>회사는 홈페이지 문의 폼을 통해 아래의 개인정보를 수집합니다.</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li><span className="font-semibold text-zinc-900">필수항목</span>: 이름, 회사명, 이메일, 연락처(휴대전화번호), 문의 유형, 유입 경로, 문의 내용</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">제3조 (개인정보의 처리 및 보유 기간)</h2>
              <p>회사는 정보주체로부터 개인정보를 수집할 때 동의받은 보유·이용 기간 내에서 개인정보를 처리·보유합니다.</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>문의 관련 개인정보: 문의 처리 완료 후 <span className="font-semibold text-zinc-900">3년</span> 보관 후 파기</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">제4조 (개인정보의 제3자 제공)</h2>
              <p>회사는 정보주체의 개인정보를 제1조에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">제5조 (개인정보 처리의 위탁)</h2>
              <p>회사는 원활한 개인정보 업무 처리를 위하여 아래와 같이 개인정보 처리 업무를 위탁하고 있습니다.</p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-zinc-200 text-left text-zinc-900">
                      <th className="py-3 pr-4 font-semibold">수탁업체</th>
                      <th className="py-3 pr-4 font-semibold">위탁 업무</th>
                      <th className="py-3 font-semibold">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-100">
                      <td className="py-3 pr-4">Resend (Plus Five Five, Inc.)</td>
                      <td className="py-3 pr-4">문의 알림 및 자동 회신 이메일 발송</td>
                      <td className="py-3">국외(미국) 이전</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-zinc-500">위탁 업무의 내용이나 수탁업체가 변경될 경우, 지체 없이 본 처리방침을 통하여 공개하겠습니다.</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">제6조 (정보주체와 법정대리인의 권리·의무 및 행사방법)</h2>
              <p>정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지를 요구할 수 있습니다. 해당 요청은 <a href="mailto:hello@joshua.site" className="text-zinc-900 underline underline-offset-4 hover:text-blue-600 transition-colors">hello@joshua.site</a>로 접수하실 수 있으며, 회사는 지체 없이 조치하겠습니다.</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">제7조 (개인정보의 파기)</h2>
              <p>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다. 전자적 파일 형태의 정보는 복구 및 재생이 불가능한 방법으로 영구 삭제합니다.</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">제8조 (개인정보의 안전성 확보 조치)</h2>
              <p>회사는 개인정보의 안전성 확보를 위하여 다음과 같은 조치를 취하고 있습니다.</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>개인정보 취급 담당자의 최소화 및 접근권한 관리</li>
                <li>개인정보의 암호화 전송(HTTPS) 및 접속기록의 보관</li>
                <li>해킹 등에 대비한 기술적 대책</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">제9조 (개인정보 보호책임자)</h2>
              <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
              <div className="mt-4 rounded-2xl bg-zinc-50 p-6 text-sm space-y-2">
                <p><span className="inline-block w-32 text-zinc-500">개인정보 보호책임자</span><span className="font-semibold text-zinc-900">김승권 (대표)</span></p>
                <p><span className="inline-block w-32 text-zinc-500">연락처</span><a href="mailto:hello@joshua.site" className="font-semibold text-zinc-900 hover:text-blue-600 transition-colors">hello@joshua.site</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">제10조 (권익침해 구제방법)</h2>
              <p>정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에 분쟁 해결이나 상담 등을 신청할 수 있습니다.</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>개인정보분쟁조정위원회: 1833-6972 (www.kopico.go.kr)</li>
                <li>개인정보침해신고센터: 118 (privacy.kisa.or.kr)</li>
                <li>대검찰청: 1301 (www.spo.go.kr)</li>
                <li>경찰청: 182 (ecrm.cyber.go.kr)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">제11조 (개인정보 처리방침의 변경)</h2>
              <p>본 개인정보 처리방침은 {EFFECTIVE_DATE}부터 적용됩니다. 법령·정책 또는 보안기술의 변경에 따라 내용의 추가·삭제 및 수정이 있을 시에는 변경사항의 시행일 이전부터 홈페이지 공지를 통하여 고지하겠습니다.</p>
            </section>

            <p className="pt-8 text-sm text-zinc-400">시행일자: {EFFECTIVE_DATE}</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
