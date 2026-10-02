import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { EDUCATION } from '@/lib/data';

export const metadata: Metadata = {
  title: '기업 AI 교육 - 진단하고, 가르치고, 다시 진단합니다',
  description:
    '90분 실기 진단으로 레벨을 나누고, 구성원·팀장·경영자 트랙으로 가르치고, 4주 뒤 다시 진단합니다. 카카오뱅크·신한은행·SK·삼성 등 100곳 이상의 조직이 선택한 기업 AI 교육.',
  alternates: { canonical: '/education' },
};

/* 이 페이지의 수치·트랙·시간은 조슈아앤컴퍼니 교육 제안서(2026-10) 원문 그대로다.
   고객사 제안서에서 옮겼으므로 특정 고객사명·사정은 싣지 않는다. */
const CYCLE = [
  { no: '01', title: '사전 진단', dur: '90분 실기', body: '설문이 아니라 실제로 AI에게 일을 시키는 과제로, 구성원마다 L1~L5 레벨과 네 가지 축의 점수를 확인합니다.' },
  { no: '02', title: '기초 교육', dur: '레벨별 트랙', body: '진단 결과로 반을 나누고, 각자 없애고 싶은 반복 업무를 그대로 실습 주제로 씁니다.' },
  { no: '03', title: '재진단', dur: '수료 4주 후', body: '같은 방식으로 다시 진단해, 레벨이 실제로 올랐는지와 현업에 적용했는지를 숫자로 확인합니다.' },
  { no: '04', title: '심화 연결', dur: 'L4 이상', body: '여러 에이전트를 지휘하는 수준에 오른 구성원은 사내 심화 과정과 해커톤 멘토로 이어집니다.' },
];

const TRACKS = [
  {
    img: '/edu/track-member.webp',
    time: '8시간 · 4시간 × 2일',
    title: '구성원 기초',
    goal: '목표 L1 → L3 · 비개발 직군 포함 전 구성원',
    body: '에이전트에게 일을 맡기고, 결과를 검증할 줄 아는 사람을 만듭니다. 코드는 AI가 씁니다.',
    outputs: ['내 업무용 스킬 1개', '동료 PC에서도 도는 웹 도구 1개'],
  },
  {
    img: '/edu/track-lead.webp',
    time: '4시간 · 1회',
    title: '팀장',
    goal: '목표 L3 + 팀 적용',
    body: '팀 업무를 잘게 나눠 자동화 후보를 고르고, 한 사람의 요령을 팀 전체의 스킬로 만듭니다.',
    outputs: ['팀 자동화 백로그 상위 3개', '팀 공용 스킬 저장소'],
  },
  {
    img: '/edu/track-exec.webp',
    time: '2시간 · 1회',
    title: '경영자',
    goal: '목표 이해와 의사결정',
    body: '에이전트 여러 개가 회의록을 기획서와 프로토타입으로 바꾸는 장면을 직접 보고, 경영진이 정할 것을 정리합니다.',
    outputs: ['AI 네이티브 조직 운영 체크리스트', '항목별 담당 임원이 붙은 결정 목록'],
  },
  {
    img: '/edu/track-office.webp',
    time: '2시간 · 월 2회',
    title: '오피스아워',
    goal: '목표 현업 정착 · 수료자 대상',
    body: '교육이 끝난 뒤 실제 업무에 쓰다 막힌 지점을 1:1로 풀어, 배운 것이 현업에 남게 합니다.',
    outputs: ['과제 피드백', '막힌 지점 해결'],
  },
];

const FLOW = [
  { when: 'D-7', title: '사전 진단', body: '90분 실기 진단 · 레벨별 반 편성' },
  { when: 'D-3', title: '설치 지원', body: '환경 설정 가이드 · 원격 지원 30분' },
  { when: 'Day 1', title: '에이전트 기초', body: '4시간 · 내 업무 스킬 1개 완성' },
  { when: '+1주', title: '현업 적용 과제', body: '스킬을 실제 업무에 2회 · 전후 시간 기록' },
  { when: 'Day 2', title: '에이전트 지휘', body: '4시간 · 웹 도구 1개 완성' },
  { when: '+2주', title: '오피스아워', body: '막힌 과제 1:1 피드백' },
  { when: '+4주', title: '재진단', body: '레벨 상승률 리포트' },
];

const PRINCIPLES = [
  { t: '도구 중립', d: 'Claude Code와 Codex를 같은 개념으로 가르칩니다. 사내 도구가 바뀌어도 교육이 유효합니다.' },
  { t: '내 업무 과제', d: '교육 전에 없애고 싶은 반복 업무 3가지를 받아, 그대로 실습 주제로 씁니다.' },
  { t: '검증 습관', d: '모든 실습에 결과를 확인하고 승인하는 단계가 있습니다.' },
  { t: '보안 대응', d: '로컬에서 끝나는 실습이 기본이고, 사내 데이터 대신 같은 형식의 가상 데이터로도 끝까지 진행됩니다.' },
  { t: '산출물로 수료', d: '출석이 아니라 스킬·웹 도구·재진단 응시로 수료를 판단해, 교육팀이 결과물로 바로 확인합니다.' },
];

const AXES = [
  { t: '위임 설계', d: '문제를 정의하고 AI에게 목표·제약·완료 기준을 넘기는가' },
  { t: '지휘', d: '여러 에이전트에 역할을 나누고 동시에 운용하는가' },
  { t: '통제 · 검증', d: 'AI 결과를 확인하고 승인·수정·중단을 스스로 결정하는가' },
  { t: '성과', d: '산출물이 요구사항을 충족하고 실제로 쓸 수 있는가' },
];

const LEVELS = [
  { l: 'L5', n: '설계자', d: '팀의 일을 에이전트 구조로 다시 짠다' },
  { l: 'L4', n: '지휘자', d: '에이전트 여러 개를 나눠 동시에 굴린다' },
  { l: 'L3', n: '위임자', d: '반복 업무를 스킬·지침 파일로 맡긴다' },
  { l: 'L2', n: '활용자', d: '업무 파일을 AI로 처리하고 결과를 확인한다' },
  { l: 'L1', n: '사용자', d: '챗봇에 질문·요약·번역을 맡긴다' },
];

const FORMATS = [
  { len: '1시간', kind: '임원 특강', who: '카카오뱅크 · 현대카드', what: 'AI 에이전트 시대에 조직이 무엇을 바꿔야 하는지' },
  { len: '4시간', kind: '실습 워크숍', who: '아산나눔재단 · 밀리의서재', what: '비개발자가 에이전트와 웹 프로토타입을 직접 제작' },
  { len: '2일 · 16시간', kind: '집중 과정', who: 'SK mySUNI', what: 'Day 1 스킬·커넥터·서브에이전트, Day 2 웹 서비스 제작과 배포' },
  { len: '8주', kind: '사내 정규 과정', who: '뷰티셀렉션', what: '주 1회 실습과 주간 과제, 스킬에서 실전 프로젝트까지' },
  { len: '7차시', kind: '온라인 과정', who: '휴넷', what: '차시당 10분 영상, 스킬·커넥터·프로젝트 순' },
  { len: '120분', kind: '라이브 시연', who: 'OpenAI Codex 스폰서 라이브', what: 'Codex 스킬로 문서 자동화부터 웹앱 배포까지 실시간 제작' },
];

/* 일러스트는 빌드 시점에 파일이 있을 때만 그린다 — 생성 전이면 깨진 이미지 대신 글만 남는다 */
const hasImg = (src: string) => existsSync(path.join(process.cwd(), 'public', src));

const KIT = ['환경 설정 가이드', '샘플 데이터 3종', '프롬프트 북', '스킬 템플릿 5종', '과제 워크시트', '강사용 운영 매뉴얼'];

export default function EducationPage() {
  return (
    <main>
      {/* 헤드 — 정체성(무엇을 가르치나)을 결과물 기준으로 말하고, 숫자로 받친다 */}
      <section className="section" style={{ paddingTop: '9rem' }}>
        <div className="inner">
          <p className="overline reveal">Corporate Education</p>
          <h2 className="reveal">AI에게 일을 맡기고,<br /><strong>결과를 검증할 줄 아는 조직</strong></h2>
          <p className="lead reveal">
            설명만 듣고 끝나는 특강이 아닙니다. 구성원 각자가 자기 업무의 스킬과 도구를 직접 만들어 돌아가고,
            4주 뒤 다시 진단해 실제로 달라졌는지 확인합니다.
          </p>
          <div className="proof-band edu-proof reveal">
            <div><span className="n">100곳+</span><span className="l">기업·기관 교육</span></div>
            <div><span className="n">300+</span><span className="l">AI 솔로프리너 클럽 수료생</span></div>
            <div><span className="n">70%</span><span className="l">수료생 중 비개발자 비율</span></div>
            <div><span className="n">7.5만</span><span className="l">YouTube 빌더조쉬 구독자</span></div>
          </div>
        </div>
      </section>

      {/* 사이클 */}
      <section className="section" id="cycle">
        <div className="inner">
          <p className="overline reveal">How It Works</p>
          <h2 className="reveal">진단하고, 가르치고,<br /><strong>다시 진단합니다</strong></h2>
          <p className="lead reveal">교육 전후를 같은 잣대로 재기 때문에, 교육팀은 만족도 설문이 아니라 레벨 변화로 성과를 보고할 수 있습니다.</p>
          <ol className="steps reveal">
            {CYCLE.map((s) => (
              <li key={s.no}>
                <span className="no">{s.no}</span>
                <h3>{s.title}</h3>
                <span className="dur">{s.dur}</span>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 트랙 */}
      <section className="section" id="tracks">
        <div className="inner">
          <p className="overline reveal">Tracks</p>
          <h2 className="reveal">대상별로 <strong>네 개의 트랙</strong></h2>
          <p className="lead reveal">중심은 구성원 기초 과정입니다. 팀장·경영자 과정과 오피스아워는 필요한 만큼만 붙이시면 됩니다.</p>
          <div className="grid4 reveal">
            {TRACKS.map((t) => (
              <article className="card track" key={t.title}>
                <span className="step-en">{t.time}</span>
                {hasImg(t.img) && <Image className="card-fig" src={t.img} alt="" aria-hidden="true" width={480} height={320} sizes="220px" />}
                <h3>{t.title}</h3>
                <p className="goal">{t.goal}</p>
                <p>{t.body}</p>
                <ul>
                  {t.outputs.map((o) => <li key={o}>{o}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6주 흐름 + 원칙 + 자료 */}
      <section className="section" id="flow">
        <div className="inner">
          <p className="overline reveal">Member Track · 6 Weeks</p>
          <h2 className="reveal">이틀 교육 앞뒤로<br /><strong>진단과 과제가 붙은 6주</strong></h2>
          <p className="lead reveal">교육 당일보다, 만든 스킬을 실제 업무에 써 보는 1주일이 더 중요합니다. 그 사이를 비워두지 않습니다.</p>
          <ol className="flow reveal">
            {FLOW.map((f) => (
              <li key={f.when} data-key={f.when.startsWith('Day') ? 'day' : undefined}>
                <span className="when">{f.when}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ol>

          <div className="principles reveal">
            {PRINCIPLES.map((p, i) => (
              <div key={p.t}>
                <span className="pno">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>

          <div className="kit reveal">
            <p className="kit-h">강의와 함께 드리는 실습 자료 · 과정이 끝나도 귀사에 남습니다</p>
            <div className="chips">{KIT.map((k) => <span key={k}>{k}</span>)}</div>
          </div>
        </div>
      </section>

      {/* 진단 */}
      <section className="section" id="diagnosis">
        <div className="inner">
          <div className="diag">
            <div className="diag-copy">
              <p className="overline reveal">AI Competency Diagnosis</p>
              <h2 className="reveal">설문으로는<br /><strong>AI 역량이 보이지 않습니다</strong></h2>
              <p className="lead reveal">
                &lsquo;써 본 적 있다&rsquo;와 &lsquo;잘 다룬다&rsquo;는 다릅니다. 실제 업무 환경에서 AI를 지휘하는 모습을 그대로 기록하고,
                네 가지 축으로 채점합니다. 한 사람당 90분, 전부 실기입니다.
              </p>
              {hasImg('/edu/diagnosis.webp') && (
                <Image className="diag-fig reveal" src="/edu/diagnosis.webp" alt="" aria-hidden="true" width={720} height={480} sizes="(min-width:900px) 360px, 80vw" />
              )}
              <div className="axes reveal">
                {AXES.map((a) => (
                  <div key={a.t}>
                    <h3>{a.t} <span>25점</span></h3>
                    <p>{a.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <ol className="levels reveal" aria-label="AI 역량 5단계 레벨">
              {LEVELS.map((v) => (
                <li key={v.l}>
                  <span className="lv">{v.l}</span>
                  <div>
                    <h3>{v.n}</h3>
                    <p>{v.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 형식 */}
      <section className="section" id="formats">
        <div className="inner">
          <p className="overline reveal">Formats</p>
          <h2 className="reveal">1시간 특강부터 8주 과정까지,<br /><strong>모두 운영해 봤습니다</strong></h2>
          <div className="edu-tbl fmt reveal">
            {FORMATS.map((f) => (
              <div className="edu-row" key={f.len + f.kind}>
                <span className="yr">{f.len}</span>
                <span className="cl">{f.kind}</span>
                <span className="ti"><strong>{f.who}</strong> {f.what}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 현장 사례 */}
      <section className="section" id="cases">
        <div className="inner">
          <p className="overline reveal">Field</p>
          <h2 className="reveal">현장에서 <strong>직접 가르쳐 왔습니다</strong></h2>
          <div className="pf-feature reveal" style={{ marginTop: '3rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {EDUCATION.map((e) => (
              <article className="pf-card" key={e.client + e.title}>
                {e.image && (
                  <div className="thumb">
                    <Image src={e.image} alt={`조슈아앤컴퍼니 기업 AI 교육, ${e.client} ${e.title} 현장`} width={560} height={360} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div className="pad">
                  <span className="cat">{e.client} · {e.year}</span>
                  <h3>{e.title}</h3>
                  <p>{e.description}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="more-orgs reveal">그 밖에 현대카드, 이노션, 아산나눔재단, 휴넷, 아시아경제, 강남구 창업아카데미 등 100곳 이상</p>
          <div className="hero-cta reveal" style={{ justifyContent: 'flex-start', marginTop: '3rem' }}>
            <Link className="btn btn-primary" href="/contact" data-cta-location="page_bottom">교육 문의하기</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
