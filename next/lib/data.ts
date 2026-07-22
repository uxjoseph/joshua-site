// 실데이터 — 기존 joshua-site(metadata.json, PortfolioSection, ClientLogos)에서 이식.
// Education Data Rule: 이 파일의 사례·수치는 조쉬 제공 1차 자료 기반만 허용.

export const SITE = {
  name: 'JOSHUA',
  legalName: '주식회사 조슈아앤컴퍼니',
  nameKo: '조슈아앤컴퍼니',
  url: 'https://joshua.site',
  email: 'hello@joshua.site',
  phone: '010-7565-9060',
  address: '서울특별시 구로구 디지털로26길 43, 엘동 5층 502, 503호 (구로동, 대륭포스트타워8차)',
  bizNo: '189-87-03956',
  ceo: '김승권',
  calendly: 'https://calendly.com/ahnwh331-joshua/30min',
  sns: {
    youtube: 'https://www.youtube.com/@builderjoshkim',
    linkedin: 'https://www.linkedin.com/in/uxjosh/',
    threads: 'https://www.threads.com/@joshproductletter',
  },
} as const;

export const LOGOS = [
  { name: '삼성', src: '/logos/samsung.svg' },
  { name: 'LG전자', src: '/logos/lg.svg' },
  { name: 'SK하이닉스', src: '/logos/skhynix.svg' },
  { name: 'SK이노베이션', src: '/logos/skinnovation.svg' },
  { name: 'SK주식회사', src: '/logos/sk.svg' },
  { name: '카카오뱅크', src: '/logos/kakaobank.svg' },
  { name: '카카오모빌리티', src: '/logos/kakaomobility.svg' },
  { name: '델 테크놀로지스', src: '/logos/dell.svg' },
  { name: '세일즈포스', src: '/logos/salesforce.svg' },
  { name: '신한', src: '/logos/shinhan.svg' },
  { name: '매드업', src: '/logos/madup.svg' },
  { name: '이노션', src: '/logos/innocean.svg' },
  { name: '뷰티셀렉션', src: '/logos/beautyselection.png' },
  { name: 'LG U+', src: '/logos/lguplus.svg' },
  { name: '밀리의서재', src: '/logos/millie.png' },
  { name: '월급쟁이부자들', src: '/logos/weolbu.png' },
] as const;

export interface Project {
  title: string;
  hook?: string; // 수치 훅 헤드라인 (피처 카드용)
  description: string;
  category: string;
  year: string;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'SK그룹 전사 경영 지식 AX 전환 및 멀티모달 오케스트레이션',
    hook: '지식자산 75,000건 — 전사 경영 지식이 답하기 시작하다',
    description:
      'SK그룹의 핵심 지식 자산 7만 5천 건을 RAG 기반으로 체계화하고, 선대회장의 화법과 음성으로 응답 및 발표자료를 자동 생성하는 엔터프라이즈 AX 시스템입니다.',
    category: 'Enterprise AX',
    year: '2026',
    image: '/portfolio/ax-2026-02.png',
  },
  {
    title: 'SK그룹 22개 계열사 조직문화 진단 통합 분석 및 데이터 인텔리전스 대시보드',
    hook: '8주 → 1일 — 22개 계열사 조직문화 진단 자동화',
    description:
      '22개 계열사 약 3만 4천 건 응답 데이터를 PPT로 수기 정리하며 8주가 소요되던 조직문화 진단 사이클을, Raw XLS 업로드만으로 5개 영역 점수·주관식 분석·Heatmap·Alert까지 1일 내 자동화한 SK그룹 전사 조직문화 인텔리전스 대시보드입니다.',
    category: 'Data Intelligence',
    year: '2026',
    image: '/portfolio/ax-2026-70.png',
  },
  {
    title: 'SK그룹 임원 리더십 포럼 AI 페르소나 라이브 인터랙션 시스템',
    hook: '이천포럼 — 사장단 토론에 AI 페르소나가 라이브로 답하다',
    description:
      '사장단 토론이 사회자 진행에 전적으로 의존하던 SK 이천포럼에서, 사전 학습된 AI 페르소나가 라이브 아바타로 응답하고 모더레이터가 단일 컨트롤 패널에서 송출·자막·패널을 실시간 조정할 수 있도록 구축한 컨버세이셔널 AI 시스템입니다.',
    category: 'Conversational AI',
    year: '2026',
    image: '/portfolio/ax-2026-60.png',
  },
  {
    title: 'SK그룹 전사 AI 역량 혁신 플랫폼 및 구성원 활동 데이터 인텔리전스',
    description:
      'SK그룹 교육 조직의 AI 내재화를 가속하기 위해 4단계 역할 기반 권한 체계와 AI 에이전트 마켓플레이스, 성과 정량 측정 시스템을 통합한 엔터프라이즈 AX 거버넌스 플랫폼입니다.',
    category: 'AX Governance',
    year: '2026',
    image: '/portfolio/ax-2026-12.png',
  },
  {
    title: 'SK그룹 HRD 교육운영 지능화 및 AI 에이전트 오케스트레이션 시스템',
    description:
      '복잡한 교육과정 관리와 신규 담당자의 온보딩을 돕기 위해 Slack 연동 Q&A, D-day 기반 마일스톤 자동 생성 및 체크리스트 추적 기능을 통합한 SK그룹 전사적 AX 솔루션입니다.',
    category: 'Enterprise AX',
    year: '2026',
    image: '/portfolio/ax-2026-21.png',
  },
  {
    title: 'SK그룹 교육그룹 전사 성과지표(PI) 실시간 통합 관리 및 데이터 인텔리전스',
    description:
      'SK그룹 교육 영역의 11개 핵심 성과지표(KPI)를 실시간으로 통합 조망하고 데이터 기반의 빠른 의사결정을 지원하기 위해 수작업 프로세스를 자동화한 엔터프라이즈 PI 대시보드입니다.',
    category: 'Data Intelligence',
    year: '2026',
    image: '/portfolio/ax-2026-30.png',
  },
  {
    title: 'SK그룹 인재개발 AI 오케스트레이션 및 오프라인 교육 운영 통합 플랫폼',
    description:
      '15개 계열사, 수만 명 대상의 오프라인 집합교육 운영 시 발생하는 학습자 취합, 분과 편성, 좌석 배치, 7종 인쇄물 제작 및 AI 설문 분석을 통합 오케스트레이션하는 엔터프라이즈 운영 대시보드입니다.',
    category: 'Enterprise AX',
    year: '2026',
    image: '/portfolio/ax-2026-42.png',
  },
  {
    title: 'SK그룹 사내 교육 플랫폼 AI 멀티모달 이미지 생성 및 자동 QA 시스템',
    description:
      '교육 홍보물 제작 시간을 수일에서 수 분으로 단축하기 위해 멀티모달 AI 기반 이미지 생성 워크플로우와 Vision QA 자동 품질 검증 파이프라인을 구축한 창의적 AX 솔루션입니다.',
    category: 'Creative AI & AX',
    year: '2026',
    image: '/portfolio/ax-2026-52.png',
  },
  {
    title: 'SK그룹 CEO 시그널 인텔리전스 및 일일 자동 브리핑 시스템',
    description:
      '다양한 채널에 분산된 시장·경쟁사 시그널을 페르소나별 코멘트와 경쟁사 매트릭스까지 자동 큐레이션하여 매일 텔레그램으로 자동 브리핑하는 CEO 전용 인사이트 인텔리전스 플랫폼입니다.',
    category: 'Data Intelligence',
    year: '2026',
    image: '/portfolio/ax-2026-80.png',
  },
  {
    title: 'SK그룹 글로벌 비즈니스 영어 자료 작성·발표 통합 코칭 AI 에이전트',
    description:
      '직무·산업별 영문 콘텐츠 큐레이션과 발음 코칭, 압박 Q&A 롤플레잉, 사내 글로서리 연동까지 단일 에이전트로 통합한 글로벌 비즈니스 커뮤니케이션 AI 코칭 솔루션입니다.',
    category: 'AI Coaching',
    year: '2026',
    image: '/portfolio/ax-2026-90.png',
  },
];

export interface Education {
  year: string;
  client: string;
  title: string;
  description: string;
  image?: string;
}

export const EDUCATION: Education[] = [
  { year: '2026', client: '카카오뱅크', title: "임원 대상 'AI Agent 시대' 특강", description: '카카오뱅크 임원진을 대상으로 AI 에이전트가 가져올 비즈니스 패러다임 전환과 금융 서비스의 미래를 다뤘습니다. 의사결정자가 반드시 알아야 할 AI 도입 전략과 실행 우선순위를 제시했습니다.', image: '/portfolio/education/IMG_0340.jpg' },
  { year: '2026', client: '카카오모빌리티', title: '디자인과 AI 에이전트', description: '프로덕트 디자이너 관점에서 AI 에이전트를 활용한 디자인 워크플로우 혁신과 사용자 경험 설계 방법론을 공유했습니다.' },
  { year: '2026', client: '신한은행', title: 'AI Transformation 전략 및 실습', description: '금융권의 AI Transformation 전략 수립부터 실무 적용까지, 실습 중심의 워크숍을 진행했습니다. 참가자들이 직접 AI 에이전트를 구축하며 업무 자동화의 가능성을 체득했습니다.', image: '/portfolio/education/IMG_0627.jpg' },
  { year: '2025', client: 'SK이노베이션', title: 'Claude Co-Work 강의', description: 'SK이노베이션 구성원을 대상으로 Claude를 활용한 협업·자동화 방법론을 강의했습니다. 실제 업무 시나리오에 바로 적용 가능한 Claude Co-Work 프레임워크를 전수했습니다.', image: '/portfolio/education/IMG_0344.jpg' },
  { year: '2026', client: 'LG전자', title: 'AI 시대의 디자인 & Figma MCP 디자인 자동화', description: 'AI 시대 디자이너의 역할 재정의와 Figma MCP를 활용한 디자인 자동화 워크플로우를 다뤘습니다.' },
  { year: '2025', client: '삼성전자', title: 'AI 교육 영상 콘텐츠 정기 납품', description: '삼성전자 사내 AI 교육 프로그램에 정기적으로 영상 콘텐츠를 납품하고 있습니다. 임직원의 AI 리터러시 향상을 위한 실무형 커리큘럼을 지속 제작합니다.' },
  { year: '2025', client: '밀리의 서재', title: '멀티에이전트 시스템 강의', description: '여러 AI 에이전트가 협업하는 멀티에이전트 시스템 설계 방법과 콘텐츠·서비스 영역에서의 적용 사례를 다뤘습니다.', image: '/portfolio/education/IMG_0872.jpg' },
  { year: '2025', client: '뷰티셀렉션', title: '8주 Claude Code 트레이닝', description: '8주간의 집중 트레이닝으로 비개발자도 Claude Code로 실제 업무 자동화 도구를 직접 만들 수 있도록 지원했습니다. 조직의 AI 역량을 내재화하는 장기 프로그램입니다.' },
  { year: '2025', client: '월급쟁이부자들', title: '멀티에이전트 & Claude Co-Work 자동화 사례', description: '멀티에이전트 시스템과 Claude Co-Work을 활용한 실제 자동화 사례를 공유하고, 콘텐츠·운영 업무에 즉시 적용 가능한 워크플로우를 함께 설계했습니다.', image: '/portfolio/education/IMG_0723.png' },
  { year: '2025', client: 'SK하이닉스', title: 'AI 활용 기업 교육', description: 'SK하이닉스 임직원을 대상으로 실무에 바로 적용 가능한 AI 활용법과 자동화 사례를 강의했습니다. 제조업 환경에서의 생산성 향상 시나리오를 함께 모색했습니다.', image: '/portfolio/education/IMG_0346.jpg' },
  { year: '2025', client: '삼성금융연수원', title: 'AI 활용 기업 교육', description: '삼성금융 계열사 임직원을 대상으로 금융 업무 환경에 특화된 AI 활용 방법과 보안을 고려한 도입 가이드라인을 제시했습니다.' },
  { year: '2025', client: '충남대학교', title: 'AI RISE 학술회 초청 강의', description: '충남대학교 AI RISE 학술회에 초청 연사로 참여해, 산업 현장의 AI 에이전트 도입 사례와 학계가 주목해야 할 실무 이슈를 공유했습니다.', image: '/portfolio/education/IMG_0345.jpg' },
];

export const TEAM = [
  { name: '조쉬', role: 'CEO / Visionary', description: 'AI 오케스트레이션 총괄 및 비즈니스 전략 설계. 다양한 기업의 AX 혁신을 이끌고 있습니다.', image: '/team-josh.png' },
  { name: '정재호', role: '개발팀장 / FDE', description: '다양한 산업군의 비즈니스 워크플로우를 기술적으로 해석하고 최적의 AI 아키텍처를 구현합니다.', image: '/team-jaeho.jpg' },
  { name: '이안', role: '개발 스태프', description: '프로덕트 구현과 운영을 담당하며, 요구사항을 빠르고 견고한 코드로 옮깁니다.', image: '/team-ian.png' },
] as const;

export const FAQS = [
  { q: '조슈아앤컴퍼니는 어떤 기업에게 적합한가요?', a: 'AI 도입을 고민하지만 시작점을 모르는 기업, 반복 업무로 인한 비효율을 겪는 기업, 그리고 구성원들의 디지털 리터러시를 높이고 싶은 모든 조직에 적합합니다.' },
  { q: '개발 지식이 전혀 없어도 의뢰할 수 있나요?', a: '물론입니다. 조슈아앤컴퍼니는 비개발자도 이해할 수 있는 언어로 소통하며, 기획부터 설계, 개발, 교육까지 전 과정을 책임지고 리드합니다.' },
  { q: '프로젝트 기간은 보통 얼마나 걸리나요?', a: '프로젝트 규모에 따라 다르지만, MVP(최소 기능 제품) 기준 보통 4주~8주 정도 소요됩니다. 발견 단계부터 정착까지 꼼꼼하게 관리합니다.' },
  { q: '유지보수는 어떻게 진행되나요?', a: '프로젝트 종료 후에도 안정화 기간을 제공하며, 필요 시 월 단위 유지보수 계약을 통해 지속적인 업데이트와 모니터링을 지원합니다.' },
] as const;
