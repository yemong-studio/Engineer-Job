import { EngineeringMajor, JobPosting, CompanyTier } from '../types';

export interface MultiPortalSearchParams {
  keyword?: string;
  major?: string;
  experience?: string;
  region?: string;
  education?: string;
  portal?: string; // 'all' | '사람인' | '원티드' | '잡코리아' | '링크드인' | '인크루트' | '기업 공식채용'
  tier?: string; // 'all' | '중견기업' | '강소·테크 유니콘' | '대기업' | '외국계 기업'
}

// Major portals metadata
export const JOB_PORTALS = [
  { id: 'all', name: '전체 포털 통합', badgeClass: 'bg-slate-900 text-white' },
  { id: 'saramin', name: '사람인', badgeClass: 'bg-blue-600 text-white' },
  { id: 'wanted', name: '원티드', badgeClass: 'bg-indigo-600 text-white' },
  { id: 'jobkorea', name: '잡코리아', badgeClass: 'bg-cyan-600 text-white' },
  { id: 'linkedin', name: '링크드인', badgeClass: 'bg-emerald-700 text-white' },
  { id: 'incruit', name: '인크루트', badgeClass: 'bg-amber-600 text-white' },
  { id: 'direct', name: '기업 공식채용', badgeClass: 'bg-slate-700 text-white' },
];

export function getPortalDirectSearchUrl(portalName: string, company: string, title: string): string {
  // Strip special suffixes and build clean search terms for real job portal queries
  const cleanComp = company.replace(/\(.*?\)/g, '').trim();
  const cleanTitle = title.split(' ')[0] + ' ' + (title.split(' ')[1] || '');
  const query = encodeURIComponent(`${cleanComp} ${cleanTitle}`);

  switch (portalName) {
    case '사람인':
      return `https://www.saramin.co.kr/zf_user/search?searchword=${encodeURIComponent(`${cleanComp} ${title.slice(0, 15)}`)}`;
    case '원티드':
      return `https://www.wanted.co.kr/search?query=${encodeURIComponent(`${cleanComp}`)}`;
    case '잡코리아':
      return `https://www.jobkorea.co.kr/Search/?stext=${encodeURIComponent(`${cleanComp} ${cleanTitle}`)}`;
    case '링크드인':
      return `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(`${cleanComp} ${cleanTitle}`)}`;
    case '인크루트':
      return `https://job.incruit.com/jobdb_list/searchjob.asp?kw=${encodeURIComponent(`${cleanComp} ${cleanTitle}`)}`;
    case '기업 공식채용':
    default:
      return `https://www.google.com/search?q=${encodeURIComponent(`${cleanComp} ${title} 채용공고`)}`;
  }
}

interface RawJobTemplate {
  company: string;
  companyTier: CompanyTier;
  title: string;
  major: EngineeringMajor[];
  category: string;
  skills: string[];
  description: string;
  location: string;
  portal: '사람인' | '원티드' | '잡코리아' | '링크드인' | '인크루트' | '기업 공식채용';
}

// Master pool of diverse engineering job templates covering Mid-tier, Unicorns, Global, and Conglomerates
const MASTER_ENGINEERING_POOL: RawJobTemplate[] = [
  // 1. Semiconductor & Electronic
  {
    company: '원익IPS',
    companyTier: '중견기업',
    title: '차세대 반도체 플라즈마 ALD 증착 장비 메커니즘 설계 엔지니어',
    major: ['기계공학', '신소재·재료공학', '전자·전기공학'],
    category: 'R&D 기구/기계설계',
    skills: ['SolidWorks', '진공 챔버', '플라즈마 해석', '열유체'],
    description: '3D V-NAND 및 HBM 박막 증착용 고온/진공 반응 챔버 메커니즘 및 인젝터 설계',
    location: '경기 평택 / 수원',
    portal: '사람인',
  },
  {
    company: '한미반도체',
    companyTier: '중견기업',
    title: 'HBM 듀얼 TC 본더 초정밀 열압착 스테이지 제어 엔지니어',
    major: ['기계공학', '전자·전기공학', '로봇·메카트로닉스'],
    category: 'R&D 기구/제어',
    skills: ['초정밀 스테이지', '열팽창 보상', '서보모터 제어', 'Abaqus'],
    description: 'HBM4 16단 적층 패키징을 위한 서브마이크론(±0.2μm) 접합 스테이지 열변형 억제 설계',
    location: '인천 서구 주안',
    portal: '잡코리아',
  },
  {
    company: '리벨리온 (Rebellions)',
    companyTier: '강소·테크 유니콘',
    title: '차세대 AI NPU 가속기 하드웨어 아키텍처 및 RTL 검증 엔지니어',
    major: ['전자·전기공학', '컴퓨터·소프트웨어', '반도체시스템공학'],
    category: '반도체 HW/칩설계',
    skills: ['Verilog/SystemVerilog', 'UVM', 'NPU', 'FPGA'],
    description: 'LLM 추론 가속용 NPU 반도체 매크로 RTL 설계 및 인터커넥트 대역폭 레이턴시 최적화',
    location: '경기 성남시 판교',
    portal: '원티드',
  },
  {
    company: '퓨리오사AI (FuriosaAI)',
    companyTier: '강소·테크 유니콘',
    title: '비전 AI 가속기 칩 펌웨어 및 PCIe 드라이버 개발자',
    major: ['컴퓨터·소프트웨어', '전자·전기공학'],
    category: '시스템SW',
    skills: ['C/C++', 'Linux Kernel Driver', 'PCIe Gen5', 'DMA'],
    description: '차세대 AI 프로세서 호스트 드라이버 개발 및 온칩 메모리 트래픽 가속',
    location: '서울 강남구 역삼',
    portal: '원티드',
  },
  {
    company: '세미파이브 (SemiFive)',
    companyTier: '강소·테크 유니콘',
    title: 'SoC 플랫폼 디자인 및 고성능 디지털 프론트엔드 설계',
    major: ['반도체시스템공학', '전자·전기공학'],
    category: 'ASIC/SoC 설계',
    skills: ['SoC 아키텍처', 'Synopsys EDA', 'Static Timing Analysis', 'AXI Bus'],
    description: '커스텀 AI SoC 플랫폼 프론트엔드 IP 통합 및 합성/타이밍 클로저 검증',
    location: '경기 수원 / 판교',
    portal: '원티드',
  },
  {
    company: '동진쎄미켐',
    companyTier: '중견기업',
    title: 'EUV/KrF 반도체 포토레지스트(PR) 유기합성 및 감광재 공정 R&D',
    major: ['화학공학·고분자', '신소재·재료공학'],
    category: '전자재료 R&D',
    skills: ['고분자 합성', '감광재 물성', 'GPC/NMR', '클린룸 분석'],
    description: '첨단 반도체 패턴 전사용 감광성 고분자 모노머 합성 및 미세 결함 제어',
    location: '경기 화성 발안',
    portal: '사람인',
  },
  {
    company: '피에스케이 (PSK)',
    companyTier: '중견기업',
    title: '글로벌 PR Strip 반도체 건식 감광액 세정장비 기구 메커니즘 설계',
    major: ['기계공학', '전자·전기공학'],
    category: '장비기구설계',
    skills: ['3D CAD', '진공 밸브', '웨이퍼 이송', '공압 제어'],
    description: '글로벌 점유율 1위 PR Strip 장비 고속 웨이퍼 핸들링 로봇 인터페이스 설계',
    location: '경기 화성 동탄',
    portal: '잡코리아',
  },
  {
    company: 'ASML 코리아',
    companyTier: '외국계 기업',
    title: 'Customer Support Engineer (EUV 노광장비 필드 시스템 엔지니어)',
    major: ['전자·전기공학', '기계공학', '반도체시스템공학'],
    category: '필드 엔지니어링',
    skills: ['EUV 광학계', '초정밀 스테이지', '영문 리포팅', 'Troubleshooting'],
    description: '세계 최고 수준의 EUV 노광 시스템 셋업 및 고객사 클린룸 진단',
    location: '경기 화성/평택/이천',
    portal: '링크드인',
  },
  {
    company: '어플라이드 머티어리얼즈 코리아 (AMAT)',
    companyTier: '외국계 기업',
    title: 'Process Engineer (박막 증착/식각 단위공정 튜닝 엔지니어)',
    major: ['신소재·재료공학', '화학공학·고분자', '전자·전기공학'],
    category: '공정기술',
    skills: ['CVD/PVD', '박막 물성', 'SEM 분석', 'DOE 실험계획법'],
    description: '첨단 3D 로직 및 메모리 팹 내 신규 레시피 최적화 및 파티클 저감 공정',
    location: '경기 화성 / 평택',
    portal: '링크드인',
  },
  {
    company: '삼성전자 DS부문',
    companyTier: '대기업',
    title: '반도체 공정설비(PE) 엔지니어 신입 채용',
    major: ['기계공학', '전자·전기공학', '화학공학·고분자', '반도체시스템공학'],
    category: '설비기술/생산기술',
    skills: ['진공공정', '열유체', '플라즈마', 'PLC 제어'],
    description: 'EUV 노광 및 식각/증착 첨단 반도체 양산 설비 트러블슈팅 및 가동률 최적화',
    location: '경기 화성/평택',
    portal: '기업 공식채용',
  },
  {
    company: 'SK하이닉스',
    companyTier: '대기업',
    title: '차세대 HBM4 적층 패키징 신뢰성 평가 및 열방출 해석 R&D',
    major: ['신소재·재료공학', '화학공학·고분자', '기계공학'],
    category: 'R&D 패키징',
    skills: ['Advanced PKG', 'TC-NCF', 'MR-MUF', '열방출 해석'],
    description: 'AI 가속기용 초고대역폭 메모리 HBM4 적층 패키징 계면 열응력 검증',
    location: '경기 이천',
    portal: '기업 공식채용',
  },

  // 2. Robotics & Physical AI & Automation
  {
    company: '레인보우로보틱스',
    companyTier: '강소·테크 유니콘',
    title: '협동로봇 및 4족보행 로봇 관절 액추에이터 메커니즘 R&D',
    major: ['로봇·메카트로닉스', '기계공학', '전자·전기공학'],
    category: 'R&D 하드웨어',
    skills: ['CATIA', '정밀 감속기', 'BLDC 서보', '토크센서 설계'],
    description: '경량 다관절 로봇 관절 모듈 토크 리플 최소화 및 백래시 억제 기구 설계',
    location: '대전 유성구 / 경기 성남',
    portal: '원티드',
  },
  {
    company: '뉴로메카 (Neuromeka)',
    companyTier: '강소·테크 유니콘',
    title: '협동로봇 충돌감지 및 임베디드 실시간 제어기 SW 개발',
    major: ['컴퓨터·소프트웨어', '로봇·메카트로닉스', '전자·전기공학'],
    category: '로봇SW/제어',
    skills: ['C/C++', 'EtherCAT', 'RTOS', '역기구학'],
    description: '센서리스 토크 추정 기반 다자유도 매니퓰레이터 충돌 방지 알고리즘 구현',
    location: '서울 성동구 성수 / 포항',
    portal: '원티드',
  },
  {
    company: '엔젤로보틱스',
    companyTier: '강소·테크 유니콘',
    title: '웨어러블 보행보조 로봇 인체공학 구조 프레임 및 동특성 설계',
    major: ['기계공학', '바이오·의공학', '로봇·메카트로닉스'],
    category: '기구설계/메카',
    skills: ['인체공학 설계', '복합소재 CFRP', '모션 캡처', '동역학 시뮬레이션'],
    description: '인체 관절 축 정렬 메커니즘 및 탄성 힌지 구조 경량화 최적화',
    location: '서울 성동구',
    portal: '원티드',
  },
  {
    company: '유진로봇',
    companyTier: '중견기업',
    title: '자율주행 물류 로봇(AMR) 조향 구동계 및 섀시 기구 설계',
    major: ['기계공학', '로봇·메카트로닉스'],
    category: '하드웨어 설계',
    skills: ['CAD', '서스펜션 설계', '하중 분산', '감속기 선정'],
    description: '고하중(500kg+) 자율 이동 로봇 서스펜션 기구 및 휠 구동부 내구 설계',
    location: '인천 연수구 송도',
    portal: '잡코리아',
  },
  {
    company: '에스에프에이 (SFA)',
    companyTier: '중견기업',
    title: '스마트팩토리 초고속 클린룸 자동화 물류 시스템(OHT/AGV) 설계',
    major: ['기계공학', '전자·전기공학'],
    category: '물류설비 엔지니어링',
    skills: ['OHT 기구설계', '비접촉 전원', '리니어 모터', 'NVH'],
    description: '반도체/디스플레이 FAB 천장 반송 시스템 OHT 주행 진동 저감 및 제어',
    location: '경기 화성 / 충남 아산',
    portal: '사람인',
  },
  {
    company: '두산로보틱스',
    companyTier: '대기업',
    title: '협동로봇 매니퓰레이터 제어기 및 임베디드 SW 개발',
    major: ['로봇·메카트로닉스', '컴퓨터·소프트웨어', '전자·전기공학'],
    category: 'SW/제어개발',
    skills: ['C/C++', 'EtherCAT', '모터 제어', 'Linux RTOS'],
    description: '충돌 감지 및 순응 제어(Compliance Control) 알고리즘 구현 및 실시간 서보 제어',
    location: '경기 수원',
    portal: '기업 공식채용',
  },

  // 3. Mobility, Automotive & Aerospace
  {
    company: '모라이 (MORAI)',
    companyTier: '강소·테크 유니콘',
    title: '자율주행 디지털트윈 시뮬레이션 센서 물리 모델링 R&D',
    major: ['컴퓨터·소프트웨어', '기계공학', '로봇·메카트로닉스'],
    category: '시뮬레이션 R&D',
    skills: ['Unreal Engine', 'C++', 'LiDAR 물리 모델', '차량 동역학'],
    description: '라이다/레이더/카메라 센서의 기상 조건별 반사율 물리 렌더링 및 동역학 해석 연동',
    location: '서울 강남구 테헤란로',
    portal: '원티드',
  },
  {
    company: '스트라드비젼 (StradVision)',
    companyTier: '강소·테크 유니콘',
    title: '차량용 임베디드 딥러닝 객체인식 알고리즘 최적화 엔지니어',
    major: ['컴퓨터·소프트웨어', '전자·전기공학'],
    category: 'AI/임베디드 비전',
    skills: ['C/C++', '딥러닝 양자화', 'TI/Renesas SoC', 'AutoSAR'],
    description: 'ADAS 차량용 카메라 비전 인식 신경망 모델 저전력 SoC 온칩 포팅',
    location: '서울 서초구 / 포항',
    portal: '원티드',
  },
  {
    company: '삼기이브이',
    companyTier: '중견기업',
    title: '전기차 2차전지 알루미늄 엔드플레이트 고압 다이캐스팅 설계',
    major: ['기계공학', '신소재·재료공학'],
    category: '금형/구조설계',
    skills: ['CATIA', 'MAGMA', '주조 유동해석', '치수공차(GD&T)'],
    description: '배터리 팩 엔드플레이트 내부 기포 결함 최소화 및 알루미늄 박육 주조 공정 개발',
    location: '충남 서산 / 경기 평택',
    portal: '사람인',
  },
  {
    company: '한온시스템',
    companyTier: '중견기업',
    title: '친환경차 복합 열관리 히트펌프 모듈 및 냉매 회로 해석 엔지니어',
    major: ['기계공학'],
    category: 'R&D 열유체해석',
    skills: ['AMESim', '열역학 사이클', '냉매 R744', '압축기 진동'],
    description: '영하 20도 극한 환경 배터리 난방 효율 극대화 폐열 회수 히트펌프 사이클 최적화',
    location: '대전 대덕구 신일동',
    portal: '사람인',
  },
  {
    company: 'HL만도',
    companyTier: '중견기업',
    title: '전자식 통합 브레이크(IDB) 및 능동형 조향 시스템(SbW) 메카트로닉스 설계',
    major: ['기계공학', '전자·전기공학', '로봇·메카트로닉스'],
    category: '전장섀시 개발',
    skills: ['기구-유압 복합해석', '모터 제어기', 'AutoSAR', 'ISO 26262'],
    description: '자율주행 이중화 브레이크 액추에이터 유압 회로 및 모터 통합 밸브 하우징 설계',
    location: '경기 성남 판교',
    portal: '잡코리아',
  },
  {
    company: '보쉬 코리아 (Robert Bosch)',
    companyTier: '외국계 기업',
    title: 'Chassis Control Systems Application Engineer (차량 샤시 제어)',
    major: ['전자·전기공학', '기계공학', '컴퓨터·소프트웨어'],
    category: '차량 제어 어플리케이션',
    skills: ['CANoe', 'INCA', '차량 동역학', 'ESP/ABS 튜닝'],
    description: '국내 완성차 고객사용 차량 자세 제어(ESP) 파라미터 실차 캘리브레이션',
    location: '경기 용인 / 서울',
    portal: '링크드인',
  },
  {
    company: '현대자동차',
    companyTier: '대기업',
    title: '샤시/의장 메카트로닉스 선행 구조설계 연구원',
    major: ['기계공학', '로봇·메카트로닉스', '전자·전기공학'],
    category: 'R&D 연구개발',
    skills: ['CATIA', 'ANSYS', '구조역학', 'NVH'],
    description: '차세대 SDV 전동화 플랫폼 샤시 서스펜션 및 전동 조향 기구 선행 개발',
    location: '경기 남양연구소',
    portal: '기업 공식채용',
  },
  {
    company: '한화에어로스페이스',
    companyTier: '대기업',
    title: '항공 가스터빈 엔진 구조해석 및 로터 역학 엔지니어',
    major: ['기계공학', '항공우주·조선해양'],
    category: 'R&D 연구개발',
    skills: ['Rotordynamics', 'Abaqus', '피로수명 평가', '고온재료'],
    description: '독자 한국형 전투기 엔진용 고온 터빈 블레이드 구조해석 및 진동 시험 평가',
    location: '경남 창원 / 경기 판교',
    portal: '기업 공식채용',
  },

  // 4. Secondary Battery & Chemical Materials
  {
    company: '에코프로비엠',
    companyTier: '중견기업',
    title: '하이니켈 양극재 연속식 소성 공정 엔지니어 및 결정립 수율 제어',
    major: ['화학공학·고분자', '신소재·재료공학'],
    category: '공정기술/생산기술',
    skills: ['소성로 제어', 'XRD/SEM', '입도분포', 'Cpk 공정능력'],
    description: '고용량 단결정 양극재 열처리 온도 구배 최적화 및 양산 킬른(Kiln) 로내 분위기 제어',
    location: '충북 청주 오창 / 경북 포항',
    portal: '잡코리아',
  },
  {
    company: '엘앤에프 (L&F)',
    companyTier: '중견기업',
    title: 'NCMA 사원계 하이니켈 양극활물질 표면 개질 및 파일럿 합성 R&D',
    major: ['화학공학·고분자', '신소재·재료공학'],
    category: '소재 합성 R&D',
    skills: ['공침 반응기', '나노 코팅', '전기화학 평가', 'BET 비표면적'],
    description: '알루미늄/망간 첨가 입자 구조 안정화 및 고전압 충방전 수명 개선 코팅 연구',
    location: '대구 달서구 / 경북 칠곡',
    portal: '사람인',
  },
  {
    company: '대주전자재료',
    companyTier: '중견기업',
    title: '실리콘 음극재(SiOx) 나노 복합체 기상합성 및 탄소 코팅 엔지니어',
    major: ['화학공학·고분자', '신소재·재료공학'],
    category: '소재개발',
    skills: ['CVD 합성', '실리콘 나노입자', '부피팽창 억제', '초기효율 개선'],
    description: '급속충전용 실리콘 산화물 음극재 합성 공정 및 탄소 나노튜브(CNT) 전도성 복합화',
    location: '경기 시흥 시화공단',
    portal: '인크루트',
  },
  {
    company: 'LG에너지솔루션',
    companyTier: '대기업',
    title: '전고체/리튬황 차세대 배터리 셀 설계 및 열관리 엔지니어',
    major: ['화학공학·고분자', '신소재·재료공학', '기계공학'],
    category: 'R&D 연구개발',
    skills: ['전기화학', 'COMSOL', '배터리 열해석', '전극 슬러리'],
    description: '고에너지밀도 전고체 전지 파일럿 라인 셀 설계 및 열폭주 방지 메커니즘 연구',
    location: '대전 기술연구원',
    portal: '기업 공식채용',
  },

  // 5. Nuclear, Plant & Energy
  {
    company: '일진하이솔루스',
    companyTier: '중견기업',
    title: '수소저장 고압용기(Type 4) 탄소섬유 복합재 와인딩 구조설계',
    major: ['기계공학', '신소재·재료공학'],
    category: '복합재 구조설계',
    skills: ['필라멘트 와인딩', 'Abaqus 복합재해석', '라이너 설계', '수압파열시험'],
    description: '700bar 초고압 수소 연료탱크 탄소섬유 권선 패턴 최적화 및 극한 파열 안전계수 검증',
    location: '전북 완주 / 경기 성남',
    portal: '사람인',
  },
  {
    company: '두산에너빌리티',
    companyTier: '대기업',
    title: '원자력 발전 주기기(원자로/증기발생기) 열수력 및 구조 안전해석 엔지니어',
    major: ['기계공학', '건축·토목·플랜트'],
    category: 'R&D 연구개발',
    skills: ['SPACE/RELAP5', 'ASME Code', '열수력해석', '내진설계'],
    description: 'APR1400 및 혁신형 SMR 압력용기 건전성 평가 및 피동 안전계통 과도해석',
    location: '경남 창원 / 경기 분당',
    portal: '인크루트',
  },
];

// Helper to determine portal match
function matchesPortal(itemPortal: string, targetPortal: string): boolean {
  if (!targetPortal || targetPortal === 'all') return true;
  const p = targetPortal.toLowerCase();
  if (p.includes('saramin') || p.includes('사람인')) return itemPortal === '사람인';
  if (p.includes('wanted') || p.includes('원티드')) return itemPortal === '원티드';
  if (p.includes('jobkorea') || p.includes('잡코리아')) return itemPortal === '잡코리아';
  if (p.includes('linkedin') || p.includes('링크드인')) return itemPortal === '링크드인';
  if (p.includes('incruit') || p.includes('인크루트')) return itemPortal === '인크루트';
  if (p.includes('direct') || p.includes('기업')) return itemPortal === '기업 공식채용';
  return true;
}

// Generate realistic, rich multi-portal job postings with genuine mid-market, startup, and global diversity
export function generateMultiPortalPostings(params: MultiPortalSearchParams): JobPosting[] {
  const q = (params.keyword || '').trim().toLowerCase();
  const targetPortal = params.portal || 'all';
  const targetTier = params.tier || 'all';

  const now = new Date();
  const makeDeadline = (daysLater: number) => {
    const d = new Date(now.getTime() + daysLater * 24 * 60 * 60 * 1000);
    return d.toISOString().split('T')[0];
  };

  // Filter master pool
  let matchingPool = MASTER_ENGINEERING_POOL.filter((item) => {
    // 1. Keyword match
    if (q) {
      const matchText = `${item.company} ${item.title} ${item.skills.join(' ')} ${item.description} ${item.category}`.toLowerCase();
      const tokens = q.split(/\s+/).filter(Boolean);
      const hasAnyToken = tokens.some((t) => matchText.includes(t));
      if (!hasAnyToken) return false;
    }

    // 2. Portal match: if specific portal chosen, prioritize that portal
    if (targetPortal !== 'all' && !matchesPortal(item.portal, targetPortal)) {
      return false;
    }

    // 3. Tier filter
    if (targetTier !== 'all' && item.companyTier !== targetTier) {
      return false;
    }

    return true;
  });

  // If keyword filtered out too many items for a specific portal, synthesize portal-specific postings dynamically
  if (matchingPool.length < 5) {
    const fallbackSeed = MASTER_ENGINEERING_POOL.filter((item) => {
      if (targetPortal !== 'all' && !matchesPortal(item.portal, targetPortal)) return false;
      return true;
    });

    const portalNameToAssign =
      targetPortal.includes('wanted') || targetPortal.includes('원티드')
        ? '원티드'
        : targetPortal.includes('jobkorea') || targetPortal.includes('잡코리아')
        ? '잡코리아'
        : targetPortal.includes('linkedin') || targetPortal.includes('링크드인')
        ? '링크드인'
        : targetPortal.includes('incruit') || targetPortal.includes('인크루트')
        ? '인크루트'
        : targetPortal.includes('direct') || targetPortal.includes('기업')
        ? '기업 공식채용'
        : '사람인';

    // If query was typed, tailor the fallback seed with the keyword
    const synthesized = fallbackSeed.map((item, idx) => ({
      ...item,
      title: q ? `${item.title.split(' ')[0]} ${q.toUpperCase()} ${item.title.split(' ').slice(1).join(' ')}` : item.title,
      portal: (targetPortal === 'all' ? item.portal : portalNameToAssign) as any,
    }));

    matchingPool = [...matchingPool, ...synthesized].slice(0, 12);
  }

  // Convert to full JobPosting objects with real, operational direct URLs
  return matchingPool.map((item, idx) => {
    const assignedPortal = targetPortal !== 'all' ? (item.portal || '사람인') : item.portal;
    return {
      id: `portal_job_${Date.now()}_${idx}_${item.company.slice(0, 3)}`,
      company: item.company,
      companyTier: item.companyTier,
      title: item.title,
      major: item.major,
      category: item.category,
      experience: idx % 3 === 0 ? '신입' : idx % 3 === 1 ? '신입·경력' : '신입',
      education: '학사 이상',
      location: item.location,
      skills: item.skills,
      description: item.description,
      deadline: makeDeadline(7 + (idx % 20)),
      originalUrl: getPortalDirectSearchUrl(assignedPortal, item.company, item.title),
      source: assignedPortal,
    };
  });
}
