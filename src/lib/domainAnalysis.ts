import { CompanyAnalysisResult, UserProfile } from '../types';

export function generateDomainCompanyAnalysis(
  companyName: string,
  targetJobRole: string,
  applicantProfile?: UserProfile
): CompanyAnalysisResult {
  const comp = (companyName || '지원 기업').trim();
  const role = (targetJobRole || '엔지니어링 R&D').trim();
  const text = `${comp} ${role}`.toLowerCase();

  const isAeroDefense = /항공|우주|발사체|위성|방산|미사일|엔진|드론|가스터빈|국방|에어로스페이스|kai|넥스원|로템/.test(text);
  const isBattery = /배터리|2차전지|셀|양극|음극|전해액|분리막|전고체|bms|energy/.test(text);
  const isNuclearPlant = !isAeroDefense && /원자력|원자로|원전|발전|플랜트|보일러|수소|epc|배관/.test(text);
  const isSemiconductor = /반도체|hbm|메모리|파운드리|노광|식각|증착|pkg|패키징|euv|dram|nand|웨이퍼/.test(text);
  const isSoftware = /소프트웨어|sw|개발자|백엔드|프론트엔드|ai|인공지능|알고리즘|머신러닝|딥러닝|클라우드|devops|data|데이터/.test(text);
  const isEmbedded = /임베디드|firmware|펌웨어|mcu|rtos|제어기|can|lin|센서|드라이버|회로|pcb/.test(text);
  const isRobotics = /로봇|로보틱스|매니퓰레이터|ros|액추에이터|감속기|자율주행|agv|amr|서보/.test(text);
  const isChemical = /화학|화공|고분자|신소재|합성|촉매|정유|석유화학|소재|바이오/.test(text);
  const isQualityProd = /품질|생산기술|공정기술|생기|설비|qa|qc|수율|troubleshooting|유지보수/.test(text);

  let step1Competitors: string[] = ['글로벌 선도 동종 제조사', '국내 유력 티어1 전문기업', '신흥 테크 혁신기업'];
  let businessDomain = `${comp}의 주력 엔지니어링 및 첨단 기술 솔루션 사업`;
  let keyProductsAndTech: string[] = ['차세대 주력 제품 라인업', '핵심 제조 및 공정 플랫폼', '고신뢰성 엔지니어링 시스템'];
  let techStrength = '독자적인 기술 특허와 수직 계열화된 글로벌 양산·운영 경쟁력';
  let marketCompetitiveness = '국내 최상위권 시장 지배력 및 글로벌 시장 내 견고한 점유율 유지';
  let differentiators: string[] = [
    '자체 핵심 기술 내재화를 통한 높은 원가 및 기술 자립도',
    '글로벌 표준 규격에 부합하는 엄격한 엔지니어링 신뢰성 검증 체계',
    '고객사 맞춤형 통합 솔루션 제공 및 신속한 기술 대응력',
  ];

  let industryShifts: string[] = [
    '디지털 전환 및 AI 기반 지능형 시스템/공정 고도화 가속',
    '글로벌 친환경 규제 및 공급망 신뢰성 확보 요구 증대',
  ];
  let technicalChallenges: string[] = [
    '고효율·고내구성 시스템 구현을 위한 복합 물리 현상 제어 및 신소재 적용',
    '차세대 아키텍처 전환에 따른 시스템 신뢰성 및 인터페이스 정밀 최적화',
  ];
  let productivityAndQualityHurdles: string[] = [
    '신규 라인/프로젝트의 조기 안정화 및 공정 불량률 최소화',
    '설계-해석-실물 시험 간 오차 감소 및 데이터 기반 실시간 품질 관리',
  ];
  let processAndCostIssues: string[] = [
    '핵심 원자재 및 부품 조달 리스크 대응을 위한 공급망 다변화',
    '제조 사이클 타임 단축 및 단위당 생산 비용 절감 공법 혁신',
  ];
  let futureGrowthDirection = `${comp}의 차세대 미래 먹거리 원천 기술 선점 및 글로벌 시장 주도권 강화`;

  let keyResponsibilities: string[] = [
    `${comp}의 ${role} 관련 핵심 시스템 설계 및 기술 사양 검토`,
    '성능 최적화 및 신뢰성 검증을 위한 공학 시뮬레이션 및 데이터 분석',
    '현장 공정/양산 부서 및 유관 팀과의 기술 협업 및 트러블슈팅 피드백',
  ];
  let requiredCompetencies: string[] = ['공학 기초 이론', '데이터 분석 및 문제해결력', '설계/해석 전문 도구', '팀 협업 및 기술 커뮤니케이션'];
  let applicantMatchPoints: string[] = [
    applicantProfile?.projectExperience?.[0]?.title
      ? `'${applicantProfile.projectExperience[0].title}' 수행 경험(${applicantProfile.projectExperience[0].metricOutcome})을 ${role} 실무와 직접 연결`
      : '학부 캡스톤 디자인 및 전공 프로젝트에서의 공학적 문제 정의 및 해결 경험 부각',
    '시뮬레이션 해석과 실물 실험/검증 데이터 간 정량적 오차 보정 경험 강조',
  ];
  let coverLetterKeyPhrases: string[] = ['공학적 인과관계', '신뢰성 검증', '정량적 성과', '문제해결 프로세스'];
  let interviewPrepQuestions: string[] = [
    `${comp}의 최신 기술 로드맵에서 ${role} 직무가 해결해야 할 가장 시급한 엔지니어링 과제는 무엇이라고 생각합니까?`,
    `본인이 수행한 프로젝트에서 예기치 못한 기술적 결함을 맞닥뜨렸을 때 어떻게 원인을 규명하고 해결했습니까?`,
  ];

  if (isBattery) {
    step1Competitors = ['LG에너지솔루션', '삼성SDI', 'SK온', 'CATL', '파나소닉'];
    businessDomain = `${comp}의 고에너지밀도 차세대 2차전지 배터리 셀 및 팩/모듈 제조`;
    keyProductsAndTech = ['고용량 하이니켈 양극재 셀', '실리콘 음극재 적용 초급속 충전 배터리', '전고체 배터리(All-Solid-State)', '지능형 배터리 관리 시스템(BMS)'];
    techStrength = '전기화학 반응 제어 원천 특허 및 기가와트시(GWh)급 초고속 양산 코팅/와인딩 공정 노하우';
    marketCompetitiveness = '글로벌 완성차 Tier-1 공급망 핵심 벤더로서의 확고한 수주 잔고와 안전성 레퍼런스';
    differentiators = [
      '열폭주 방지 특수 세라믹 코팅 분리막 및 내열 설계 기술',
      '전극 슬러리 균일 분산 및 극판 롤프레싱 두께 정밀 제어(±1μm)',
      '셀 레벨부터 팩 레벨까지 다단 신뢰성 및 극한 관통·화재 시험 안전 체계',
    ];

    industryShifts = [
      '전기차 캐즘 극복을 위한 LFP/미드니켈 등 보급형 라인업과 프리미엄 전고체 양극화 대응',
      'EU 배터리 여권 및 탄소발자국 규제에 따른 친환경 리사이클링 공정 의무화',
    ];
    technicalChallenges = [
      '충방전 사이클 증가에 따른 전극 부피 팽창 및 덴드라이트 형성 억제',
      '고출력 급속 충전 시 발생하는 국소 핫스팟 발열 제어 및 냉각 채널 최적화',
    ];
    productivityAndQualityHurdles = [
      '고속 전극 코팅 및 노칭 라인의 슬리팅 버(Burr) 불량 제로화',
      '초기 활성화(Formation) 공정 시간 단축 및 잔존 가스 디개싱(Degassing) 효율화',
    ];
    processAndCostIssues = [
      '리튬, 니켈 등 핵심 광물 공급망 내재화 및 양극 바인더 원가 절감',
      '건식 전극(Dry Coating) 공정 도입을 통한 에너지 소모량 30% 감축 과제',
    ];
    futureGrowthDirection = '차세대 전고체 전지 파일럿 양산과 도심항공교통(UAM)/ESS 등 고안전성 에너지 솔루션 시장 선점';

    keyResponsibilities = [
      '배터리 셀 구조 설계 및 전기화학 반응 kinetics 모델링',
      '전극 슬러리 조성 최적화 및 코팅/압연 공정 파라미터 셋업',
      '충방전 사이클 수명 평가, 열화 메커니즘 분석 및 열폭주 방지 테스트',
    ];
    requiredCompetencies = ['전기화학 기초', 'COMSOL/배터리 열해석', '충방전 사이클 분석기(Maccor/Arbin)', 'SEM/XRD 소재 분석', '공정 수율 개선'];
    coverLetterKeyPhrases = ['에너지밀도(Wh/kg)', '쿨롱 효율', 'SEI 피막 안정성', '열폭주 방지 메커니즘'];
    interviewPrepQuestions = [
      `급속 충전 조건에서 리튬 석출(Lithium Plating)이 발생하는 공학적 원인과 이를 방지하기 위한 설계적 대책은 무엇입니까?`,
      `${comp}의 배터리 제품군에서 셀 제조 공정 수율을 저해하는 가장 핵심적인 인자와 본인의 개선 접근법을 말씀해 주세요.`,
    ];
  } else if (isNuclearPlant) {
    step1Competitors = ['한국수력원자력', '두산에너빌리티', '한전기술', '웨스팅하우스', '프라마톰', '현대건설'];
    businessDomain = `${comp}의 원자력 발전 설비, SMR(소형 모듈 원자로), 에너지 플랜트 주기기 엔지니어링`;
    keyProductsAndTech = ['APR1400 원전 주기기(원자로용기/증기발생기)', '혁신형 SMR(i-SMR) 모듈러 시스템', '가스터빈·수소 혼소 발전 터빈', '방사성 폐기물 건식 저장 용기'];
    techStrength = '초대형 단조 성형 기술 및 고온·고압 방사선 환경 극한 신뢰성 기기 제작 역량';
    marketCompetitiveness = '체코/폴란드 등 글로벌 원전 르네상스 수주 경쟁력 및 세계 최고 수준의 공기 준수(On Time On Budget) 실적';
    differentiators = [
      '원자로 압력용기 단일체 일체형 단조 기술을 통한 용접부 최소화 및 내구성 극대화',
      'ASME Section III N-Stamp 등 전 세계 최고 등급 원자력 품질 보증 체계',
      '열수력 안전해석 코드(SPACE, RELAP5) 기반 고정밀 다중 방호 시스템 설계',
    ];

    industryShifts = [
      '인공지능(AI) 데이터센터 전력 수요 폭증에 따른 무탄소 기저부하(SMR/원전) 재조명',
      '탄소중립 목표 달성을 위한 원전-청정수소 생산 플랜트 연계 시스템 확대',
    ];
    technicalChallenges = [
      '피동형 안전계통(Passive Safety System)의 무전원 냉각 신뢰성 해석 및 실증',
      '고온 용융염(MSR) 및 소듐냉각고속로(SFR) 내 극한 부식·방사화 환경 재료 건전성 확보',
    ];
    productivityAndQualityHurdles = [
      '대형 압력용기 협개선 용접(Narrow Gap Welding) 시 미세 균열 제로화',
      '원전 배관망 내 유동유발 진동(FIV) 및 워터해머(Water Hammer) 응력 규격 엄격 충족',
    ];
    processAndCostIssues = [
      'SMR 모듈의 공장 내 표준화 제작 및 현장 설치 기간 획기적 단축',
      '원전 해체 및 사용후핵연료 저장 설비의 장기 안전성 차폐 비용 최적화',
    ];
    futureGrowthDirection = '글로벌 대형 원전 패키지 수출과 제4세대 차세대 SMR 시장 글로벌 표준 선도';

    keyResponsibilities = [
      '원자로 냉각재 계통 및 2차측 배관·열교환기 열수력 안전 해석',
      'ASME/KEPIC 코드 기반 압력용기 및 구조물 내진·구조 건전성 평가',
      '플랜트 P&ID 설계 검토 및 밸브/펌프 계통 과도 상태 응답 시뮬레이션',
    ];
    requiredCompetencies = ['열수력 해석(RELAP5/MARS)', 'ASME Section III/KEPIC 규격', 'ANSYS Mechanical/배관응력(AutoPIPE)', '유체역학/열전달', '안전여유도 평가'];
    coverLetterKeyPhrases = ['피동 잔열제거계통', 'LOCA(냉각재상실사고) 해석', '내진 1급 구조 건전성', '중대사고 완화 전략'];
    interviewPrepQuestions = [
      `설계기준사고(DBA) 발생 시 원자로 노심의 용융을 방지하기 위한 안전 해석 접근법과 마진(Margin) 확보 방안을 설명해 주십시오.`,
      `${comp}이 추진하는 SMR 주기기 설계에서 기존 대형 원전 대비 해결해야 할 가장 핵심적인 기구·열수력적 과제는 무엇입니까?`,
    ];
  } else if (isSemiconductor) {
    step1Competitors = ['삼성전자', 'SK하이닉스', 'TSMC', '인텔', '마이크론', 'ASML'];
    businessDomain = `${comp}의 초미세 반도체 칩, 첨단 패키징(HBM) 및 반도체 공정 설비 개발`;
    keyProductsAndTech = ['HBM3E/HBM4 초고대역폭 메모리', '2nm 이하 GAA(Gate-All-Around) 로직 트랜지스터', 'EUV 노광 및 원자층 증착(ALD) 공정', 'Advanced 2.5D/3D 패키징'];
    techStrength = '나노미터 단위 미세 패터닝 기술 및 테라바이트급 초고속 데이터 전송 패키징 신뢰성';
    marketCompetitiveness = '글로벌 AI 가속기 시장 핵심 필수 부품 독점적 지위 및 높은 영업이익률';
    differentiators = [
      'MR-MUF 및 하이브리드 본딩을 적용한 발열 억제 및 수율 안정화',
      '빅데이터 기반 지능형 APC(Advanced Process Control) 공정 편차 실시간 보정',
      '초청정 클린룸 내 결함 입자 제로(Zero-Defect) 수율 방어 시스템',
    ];

    industryShifts = [
      '온디바이스 AI 확산에 따른 맞춤형 커스텀 HBM 및 NPU 칩 설계 수요 급증',
      '미세화 한계(Moore의 법칙 한계)를 돌파하기 위한 이종 칩렛(Chiplet) 패키징 가속화',
    ];
    technicalChallenges = [
      '적층 두께 박막화에 따른 다이 워피지(Warpage, 휨) 현상 및 열 방출 경로 확보',
      'High-NA EUV 도입에 따른 펠리클 투과율 및 포토레지스트 결함 억제',
    ];
    productivityAndQualityHurdles = [
      '초기 16단 적층 HBM 양산 라인 수율 골든 수치 조기 달성',
      '플라즈마 식각 시 웨이퍼 외곽부 균일도(Uniformity) 오차 편차 축소',
    ];
    processAndCostIssues = [
      '고가 특수 희귀 가스(크립톤, 제논) 재활용 공정 구축 및 소재 원가 절감',
      '웨이퍼 스크랩 방지를 위한 가상 계측(Virtual Metrology) 시스템 전면 적용',
    ];
    futureGrowthDirection = '차세대 CXL 메모리와 광학 인터커넥트(Silicon Photonics) 기술을 접목한 초연결 컴퓨팅 아키텍처 선점';

    keyResponsibilities = [
      '반도체 8대 공정 조건 최적화 및 신규 레시피 튜닝',
      '첨단 패키징 패키지 응력/열팽창 계수(CTE) 미스매치 시뮬레이션',
      '인라인(In-line) 계측 데이터 기반 결함 원인 분석 및 공정 수율 향상',
    ];
    requiredCompetencies = ['반도체 물성/소자 이론', '통계적 공정관리(SPC/DOE)', 'TCAD/ANSYS 열해석', 'SEM/TEM 결함 분석', '웨이퍼 수율 트러블슈팅'];
    coverLetterKeyPhrases = ['HBM 적층 신뢰성', 'GAA 채널 제어', 'EUV 오버레이 마진', '양산 수율(Yield) 최적화'];
    interviewPrepQuestions = [
      `HBM 패키징 과정에서 발생하는 열팽창 불일치(Warpage) 문제를 해결하기 위한 공학적 접근 방식은 무엇입니까?`,
      `${comp}의 첨단 공정 라인에서 수율 변동이 감지되었을 때 본인은 어떤 단계로 원인 규명 프로세스를 전개하겠습니까?`,
    ];
  } else if (isSoftware) {
    step1Competitors = ['네이버', '카카오', '라인', '쿠팡', '토스', '구글코리아'];
    businessDomain = `${comp}의 대규모 분산 웹/앱 플랫폼, 클라우드 인프라 및 AI 엔지니어링`;
    keyProductsAndTech = ['초대규모 분산 백엔드 아키텍처', '실시간 대용량 트래픽 처리 엔진', '클라우드 네이티브(Kubernetes/MSA)', 'LLM 기반 도메인 특화 AI 서빙 파이프라인'];
    techStrength = '수천만 사용자의 동시 요청을 밀리초(ms) 단위 지연시간으로 처리하는 안정적 고가용성 인프라';
    marketCompetitiveness = '풍부한 사용자 데이터셋 기반 네트워크 효과 및 빠른 피처 릴리즈 속도';
    differentiators = [
      '장애 격리를 위한 도메인 주도 설계(DDD) 기반 MSA 시스템 구축',
      '무중단 배포(Canary/Blue-Green) 및 관찰 가능성(Observability) 통합 모니터링',
      '자체 최적화 캐시 계층 및 비동기 이벤트 스트리밍(Kafka) 파이프라인',
    ];

    industryShifts = [
      '생성형 AI 모델의 경량화 및 실시간 서빙(Serving) 인프라 최적화 경쟁',
      'FinOps 기반 클라우드 인프라 비용 절감 및 그린 컴퓨팅 전환',
    ];
    technicalChallenges = [
      '대용량 DB 샤딩 및 읽기/쓰기 분제 환경에서의 데이터 최종 일관성(Eventual Consistency) 보장',
      '실시간 API 응답 지연을 유발하는 GC(Garbage Collection) 및 네트워크 I/O 병목 해소',
    ];
    productivityAndQualityHurdles = [
      '레거시 모놀리스 시스템의 마이크로서비스 전환 중 무장애 마이그레이션 유지',
      '단위/통합 테스트 자동화 커버리지 80% 이상 상시 유지',
    ];
    processAndCostIssues = [
      '비효율적인 쿼리 및 불필요한 클라우드 리소스 사용에 따른 인프라 비용 누수 방지',
      'CI/CD 빌드 타임 단축을 통한 개발 생산성 및 배포 빈도 향상',
    ];
    futureGrowthDirection = '글로벌 엔터프라이즈 솔루션 확장 및 자체 AI 에이전트 생태계 구축';

    keyResponsibilities = [
      '고가용성 RESTful/gRPC API 설계 및 대용량 트래픽 백엔드 서비스 개발',
      'RDBMS 및 NoSQL 데이터 모델링, 인덱스 튜닝 및 쿼리 최적화',
      'Kafka 기반 비동기 이벤트 처리 파이프라인 및 분산 캐시 설계',
    ];
    requiredCompetencies = ['Java/Spring Boot or Python/Go', 'MySQL/PostgreSQL 및 Redis', 'Docker/Kubernetes', '동시성 제어 및 자료구조', '시스템 디자인'];
    coverLetterKeyPhrases = ['트래픽 병목 해소', 'QPS 향상', '동시성 락 제어', '분산 트랜잭션'];
    interviewPrepQuestions = [
      `동일한 데이터에 수천 건의 동시 갱신 요청이 유입될 때 데이터 정합성을 보장하기 위한 락(Lock) 전략과 성능 트레이드오프를 설명해 주십시오.`,
      `${comp} 서비스 환경에서 특정 API의 응답 속도가 급격히 저하되었을 때 트러블슈팅하는 본인만의 프로파일링 절차를 말씀해 주세요.`,
    ];
  } else if (isEmbedded) {
    step1Competitors = ['현대모비스', 'HL만도', 'LG전자 VS본부', '보쉬', '콘티넨탈', 'TI'];
    businessDomain = `${comp}의 차량용/산업용 전장 제어기(ECU), 임베디드 펌웨어 및 센서 시스템 개발`;
    keyProductsAndTech = ['AUTOSAR 기반 차량용 ECU 펌웨어', '모터 구동 인버터 제어기(MCU)', 'CAN/CAN-FD/이더넷 차량 네트워크 스택', '기능안전(ISO 26262 ASIL-D) 제어 시스템'];
    techStrength = '마이크로초 단위의 엄격한 하드 실시간성(Hard Real-time) 제어 및 고신뢰성 하드웨어 설계';
    marketCompetitiveness = '가장 까다로운 차량용 환경 신뢰성 시험(AEC-Q100)을 통과한 양산 납품 실적';
    differentiators = [
      '하드웨어 추상화 계층(MCAL) 및 BSW 모듈 독자 커스터마이징 역량',
      '부트로더(Bootloader) 기반 안전한 무선 펌웨어 업데이트(OTA) 기술',
      'EMI/EMC 전자파 차폐 및 전원단 써지 보호 특화 회로 설계',
    ];

    industryShifts = [
      '분산형 분리 ECU에서 고성능 중앙 집중형 도메인 컨트롤러(DCU)로의 통합 추세',
      '소프트웨어 중심 자동차(SDV) 전환에 따른 차량용 이더넷 통신 비중 확대',
    ];
    technicalChallenges = [
      '인터럽트 지연시간(Interrupt Latency) 최소화 및 실시간 태스크 스케줄링 마진 확보',
      '고전압 전력선 인접 환경에서의 노이즈 유입 차단 및 신호 무결성(SI) 확보',
    ];
    productivityAndQualityHurdles = [
      'HIL(Hardware-in-the-Loop) 시뮬레이터 기반 가상 주행 시나리오 검증 커버리지 확대',
      'MISRA-C 정적 분석 룰 위반율 제로(Zero-Violation) 달성',
    ];
    processAndCostIssues = [
      '글로벌 MCU 수급 불안정에 대응하기 위한 핀투핀(Pin-to-Pin) 호환 멀티 칩 펌웨어 아키텍처 구축',
      'PCB 레이어 수 최적화를 통한 제조 원가 절감',
    ];
    futureGrowthDirection = '자율주행 및 통합 전동화 플랫폼용 차세대 고성능 제어기 시장 글로벌 선도';

    keyResponsibilities = [
      'ARM Cortex-M/R 코어 기반 펌웨어 및 디바이스 드라이버 작성',
      'CAN, SPI, I2C, UART 등 하드웨어 통신 프로토콜 구현 및 패킷 분석',
      '오실로스코프 및 로직 분석기를 활용한 보드 bring-up 및 하드웨어 디버깅',
    ];
    requiredCompetencies = ['C/C++ 프로그래밍', 'ARM 아키텍처 및 레지스터 제어', 'FreeRTOS / AUTOSAR', '통신 프로토콜(CAN, SPI)', '오실로스코프/계측기'];
    coverLetterKeyPhrases = ['하드 실시간성', '인터럽트 서비스 루틴(ISR)', 'CAN-FD 통신', '메모리 맵 최적화'];
    interviewPrepQuestions = [
      `임베디드 시스템에서 태스크 간 공유 자원 접근 시 발생하는 우선순위 역전(Priority Inversion) 문제와 해결책을 설명해 주십시오.`,
      `하드웨어 보드 셋업 과정에서 간헐적으로 발생하는 통신 패킷 드롭 문제를 어떻게 분석하고 해결하겠습니까?`,
    ];
  } else if (isChemical) {
    step1Competitors = ['LG화학', '롯데케미칼', '한화솔루션', '금호석유화학', '바스프', '다우'];
    businessDomain = `${comp}의 첨단 고분자 소재, 친환경 정밀화학 및 배터리/반도체 공정용 화학소재 개발`;
    keyProductsAndTech = ['고기능성 엔지니어링 플라스틱', '친환경 바이오매스 플라스틱', '반도체용 고순도 전자소재(PR, 세정액)', '이차전지용 바인더 및 분리막 코팅제'];
    techStrength = '분자 구조 설계부터 연속 반응 파일럿 양산까지의 종합 고분자 합성 플랫폼';
    marketCompetitiveness = '글로벌 화학 시장 내 고부가 스페셜티(Specialty) 제품 비중 지속 확대';
    differentiators = [
      '촉매 반응 효율 극대화를 통한 부반응 억제 및 반응 수율 95% 이상 달성',
      '고온·고내후성 복합 배합 컴파운딩 기술 내재화',
      '엄격한 유해물질 규제(REACH/RoHS) 충족 친환경 인증 체계',
    ];

    industryShifts = [
      '석유화학 범용 제품 공급과잉 극복을 위한 스페셜티 고부가가치 화학 소재 체질 개선',
      '탄소포집활용(CCU) 및 폐플라스틱 열분해 화학적 재활용 기술 상용화',
    ];
    technicalChallenges = [
      '연속 반응기(CSTR/PFR) 내 열전달 한계 극복 및 폭주 반응 방지 안전 설계',
      '나노 입자 분산 시 응집 현상 방지 및 장기 저장 안정성 확보',
    ];
    productivityAndQualityHurdles = [
      '배합 로트(Lot) 간 물성(점도, 인장강도, 굴절률) 편차 최소화',
      '증류탑 및 정제 공정 내 미량 불순물 파트퍼빌리언(ppb) 단위 제거',
    ];
    processAndCostIssues = [
      '에너지 다소비 분리 공정(증류)의 분리막 대체 또는 열통합 공정 설계',
      '바이오 유래 원료의 조달 안정성 확보 및 단가 절감',
    ];
    futureGrowthDirection = '차세대 모빌리티 경량화 복합소재 및 차세대 전지용 핵심 소재 글로벌 공급사 도약';

    keyResponsibilities = [
      '신규 고분자 수지 합성 및 배합 레시피 도출',
      '연속 중합 공정 Aspen Plus 시뮬레이션 및 물질/에너지 수지 계산',
      'DSC, TGA, GPC, NMR을 활용한 소재 열적·기계적 물성 분석',
    ];
    requiredCompetencies = ['고분자 화학/유기합성', '반응공학 및 열역학', 'Aspen Plus 공정 모사', '소재 기기분석(DSC/TGA/FT-IR)', '공정안전관리(PSM)'];
    coverLetterKeyPhrases = ['중합 수율 최적화', '유변 물성(Rheology) 제어', '분자량 분포(PDI)', '고순도 정제 공정'];
    interviewPrepQuestions = [
      `발열이 심한 중합 반응기에서 반응 속도 제어와 열 제거가 원활하지 않을 때 취할 수 있는 화학공학적 조치는 무엇입니까?`,
      `${comp}의 신소재 제품이 양산 라인으로 스케일업(Scale-up)될 때 가장 주의 깊게 검토해야 할 공정 변수를 설명해 주십시오.`,
    ];
  } else if (isQualityProd) {
    step1Competitors = ['동종 산업 선도 제조사', '국내 최고 수준 완성품 제조공장', '글로벌 스마트팩토리 벤치마크 기업'];
    businessDomain = `${comp}의 첨단 스마트 제조 설비, 양산 공정 최적화 및 무결점 품질 보증 시스템`;
    keyProductsAndTech = ['AI 비전 검사 시스템', '통계적 공정관리(SPC) 및 예지보전 플랫폼', '자동화 로봇 조립 라인', '디지털 트윈 기반 공정 시뮬레이션'];
    techStrength = '초당 수십 개의 부품을 마이크론 오차로 양산하는 초정밀 공정 능력(Cpk > 1.67) 보유';
    marketCompetitiveness = '글로벌 최고 수준의 수율과 단납기 생산 대응력으로 고객사 신뢰 확보';
    differentiators = [
      '실시간 공정 센서 데이터 기반 이상 징후 조기 감지 및 자동 라인 셋업',
      '설계 단계부터 양산성을 고려한 DFM(Design for Manufacturing) 검증 프로세스',
      '공정 FMEA 및 6-Sigma 기법을 결합한 근본 원인(Root-Cause) 박멸 체계',
    ];

    industryShifts = [
      '숙련공 경험 의존 생산에서 머신러닝 기반 자율 제어 스마트팩토리 전환',
      '부품 이력 추적성(Traceability) 100% 디지털화 의무화',
    ];
    technicalChallenges = [
      '공정 택트 타임(Tact Time) 단축과 불량률 저감 간의 상충 관계 최적화',
      '다품종 소량 생산 라인의 신속한 품종 교체(Change-over) 메커니즘 구축',
    ];
    productivityAndQualityHurdles = [
      '간헐적으로 발생하는 미세 스크래치 및 딤플 결함의 검출 누락 제로화',
      '설비 종합 효율(OEE) 90% 이상 상시 유지 및 돌발 정지 시간 최소화',
    ];
    processAndCostIssues = [
      '가공 툴(Tool) 마모 예측을 통한 교체 수명 연장 및 소모품비 절감',
      '공정 부산물 재활용 및 제조 폐기물 감축을 통한 ESG 지표 개선',
    ];
    futureGrowthDirection = '소프트웨어 정의 제조(SDM) 기반 글로벌 통합 관제 스마트팩토리 완성';

    keyResponsibilities = [
      '신규 양산 라인 설비 셋업 및 공정 밸리데이션(IQ/OQ/PQ) 수행',
      '불량 데이터 원인 분석(8D Report) 및 재발 방지 대책 수립',
      '공정 능력 평가(Cp, Cpk) 및 병목 구간 개선을 통한 수율 향상',
    ];
    requiredCompetencies = ['통계적 공정관리(SPC/Minitab)', '공정 FMEA / 품질 매뉴얼', '설비 트러블슈팅 및 가동률 분석', '기계 도면/공차 해석(GD&T)', '6-Sigma 방법론'];
    coverLetterKeyPhrases = ['공정 능력 지수(Cpk)', '수율(Yield) 개선', '택트 타임(Tact time) 단축', '근본 원인 규명'];
    interviewPrepQuestions = [
      `양산 라인에서 Cpk가 기준치 이하로 떨어졌을 때 본인이 주도할 품질 개선 5단계 로드맵을 설명해 주십시오.`,
      `설계 부서와 제조 현장 간의 공차 문제로 인한 갈등이 발생했을 때 엔지니어로서 어떻게 합리적 접점을 도출하겠습니까?`,
    ];
  } else if (isRobotics) {
    step1Competitors = ['두산로보틱스', '레인보우로보틱스', '뉴로메카', '화낙', '야스카와', '보스턴다이내믹스'];
    businessDomain = `${comp}의 협동로봇, 자율이동로봇(AMR) 및 지능형 매니퓰레이터 시스템`;
    keyProductsAndTech = ['고정밀 협동로봇 암(Cobot Arm)', '다관절 매니퓰레이터 제어기', '자율이동로봇(AMR) 플랫폼', 'AI 비전 연동 로봇 핸드'];
    techStrength = '반복 정밀도(±0.02mm) 확보 및 충돌 감지 토크센서 기반 인간-로봇 안전 협업 제어 알고리즘';
    marketCompetitiveness = '제조 자동화 및 물류 현장 도입 가속화에 따른 글로벌 수주 확대';
    differentiators = [
      '초경량 고강성 복합재 링크 설계 및 하모닉 드라이브 관절 최적화',
      '외란 관측기(DOB) 기반 중력 보상 및 잔류 진동 감쇄 모션 제어',
      'ROS2 및 EtherCAT 실시간 인터페이스 기반 개방형 플랫폼 아키텍처',
    ];

    industryShifts = [
      '스마트 제조 및 서비스 산업 전반의 피지컬 AI(Physical AI) 및 자율 로봇 확산',
      '작업자와 동일 공간에서 안전하게 작업할 수 있는 안전 규격(ISO 10218/TS 15066) 의무화',
    ];
    technicalChallenges = [
      '다자유도 관절 간 비선형 동역학 상호작용 및 고속 동작 시 관성 오차 보정',
      '다양한 비정형 물체를 미끄러짐 없이 파지하기 위한 촉각 그리퍼 센서 퓨전',
    ];
    productivityAndQualityHurdles = [
      '조립 로봇 관절의 장시간 연속 운전 시 감속기 백래시 및 열변형 억제',
      '다품종 공정에 신속히 적응하는 다이렉트 티칭(Direct Teaching) 직관성 개선',
    ];
    processAndCostIssues = [
      '핵심 부품인 서보모터, 정밀 감속기, 중공축 엔코더 국산화 및 모듈화',
      '로봇 설치 및 시운전 공수 단축을 위한 디지털 트윈 사전 검증 체계',
    ];
    futureGrowthDirection = '피지컬 AI 파운데이션 모델과 휴머노이드 로봇 관절 메커니즘 상용화 선도';

    keyResponsibilities = [
      '다관절 로봇 기구학/역기구학 해석 및 궤적 생성 알고리즘 개발',
      '모터 드라이버 및 실시간 EtherCAT 통신 모션 제어 펌웨어 튜닝',
      '동역학 시뮬레이션(MATLAB/Gazebo) 및 반복 정밀도 계측 검증',
    ];
    requiredCompetencies = ['로봇 기구학/동역학', 'ROS/ROS2 및 C++', '모터 제어(FOC, PID)', 'MATLAB/Simulink', '센서 퓨전(IMU/LiDAR)'];
    coverLetterKeyPhrases = ['기구학 해석(Kinematics)', '토크 리플 저감', '반복 위치 정밀도', '충돌 감지 알고리즘'];
    interviewPrepQuestions = [
      `다축 매니퓰레이터에서 특이점(Singularity) 문제를 회피하고 궤적을 부드럽게 유지하기 위한 제어 기법은 무엇입니까?`,
      `${comp}의 로봇 제품에 적용된 액추에이터의 응답 속도와 내구성을 동시에 확보하기 위한 설계 전략을 제시해 주십시오.`,
    ];
  } else if (isAeroDefense) {
    step1Competitors = ['한화에어로스페이스', 'KAI (한국항공우주산업)', 'LIG넥스원', '현대로템', '록히드마틴', '보잉'];
    businessDomain = `${comp}의 항공 가스터빈 엔진, 우주 발사체 구조체 및 고정밀 방위산업 시스템`;
    keyProductsAndTech = ['차세대 항공용 터보팬/터보샤프트 엔진', '우주 발사체 액체로켓 연소기 및 터보펌프', '초음속 전투기 기체 구조물', '유도무기 항법 및 추진체'];
    techStrength = '1,500℃ 이상 초고온 극한 환경 단결정 초합금 터빈 블레이드 주조 및 진동 내구성 해석 역량';
    marketCompetitiveness = '글로벌 방산 수출 르네상스 주도 및 우주 발사체 체계종합 역량 보유';
    differentiators = [
      'MIL-STD 군사 규격 및 감항 인증(Airworthiness) 충족 엄격한 품질 보증 체계',
      '천음속/초음속 압축성 공기역학 CFD 해석 및 플러터(Flutter) 진동 억제 기술',
      '초경량 복합재(CFRP) 일체 성형 공법 및 고온 구조 건전성 검증 기술',
    ];

    industryShifts = [
      '국산 독자 항공 엔진 개발 가속화 및 민간 주도 뉴 스페이스(New Space) 전환',
      '유무인 복합 체계(MUM-T) 및 스텔스 성능 고도화 요구',
    ];
    technicalChallenges = [
      '초고온·고압 연소 가스에 노출되는 노즐/블레이드의 열차폐 코팅(TBC) 박리 방지',
      '초음속 비행 시 기체 표면 충격파 항력 저감 및 공력 탄성학적 안정성 확보',
    ];
    productivityAndQualityHurdles = [
      '대형 티타늄/인코넬 난삭재 부품 5축 정밀 가공 사이클 타임 단축',
      '용접부 및 복합재 내부 미세 박리 검출을 위한 위상배열 초음파(PAUT) 비파괴검사',
    ];
    processAndCostIssues = [
      '발사체 재사용 및 부품 3D 금속 적층제조(AM) 확대를 통한 제작 원가 절감',
      '항공/우주 특수 원자재 글로벌 공급망 다변화',
    ];
    futureGrowthDirection = '독자 첨단 전투기 가스터빈 엔진 국산화 완성 및 재사용 우주 수송 플랫폼 글로벌 진출';

    keyResponsibilities = [
      '항공 엔진 압축기/터빈 공력 성능 평가 및 유한요소(FEA) 구조 해석',
      '고온 열피로 및 저주기/고주기 피로(LCF/HCF) 안전수명 예측',
      '추진계통 배관 밸브 유동 해석 및 비파괴검사(NDI) 사양 검토',
    ];
    requiredCompetencies = ['압축성 유체역학/열전달', '구조 동역학 및 피로수명(ANSYS/Nastran)', '항공우주재료학(인코넬/티타늄)', 'MIL 규격/감항인증', 'CAD 3D 서피스 모델링'];
    coverLetterKeyPhrases = ['고온 크리프(Creep) 저항성', '열차폐 코팅(TBC)', '천음속 충격파 제어', '구조 안전여유도(MS)'];
    interviewPrepQuestions = [
      `가스터빈 블레이드가 고속 회전 시 원심력과 고온 열응력을 동시에 받을 때 발생하는 파손 메커니즘과 이를 방지하기 위한 냉각 유로 설계 원리는 무엇입니까?`,
      `${comp}의 방산/항공 시스템에서 비행 신뢰성과 경량화를 동시에 만족시키기 위해 고려해야 할 최우선 공학적 기준은 무엇입니까?`,
    ];
  }

  return {
    companyName: comp,
    targetJobRole: role,
    analysisDate: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    basisSource: `${comp} 공식 기술 백서, 최신 IR 사업보고서 및 ${role} 직무 공학 표준 분석`,
    step1: {
      majorCompetitors: step1Competitors,
      businessDomain,
      keyProductsAndTech,
      techStrength,
      marketCompetitiveness,
      differentiators,
    },
    step2: {
      industryShifts,
      technicalChallenges,
      productivityAndQualityHurdles,
      processAndCostIssues,
      futureGrowthDirection,
    },
    step3: {
      targetJobRole: role,
      keyResponsibilities,
      requiredCompetencies,
      applicantMatchPoints,
      coverLetterKeyPhrases,
      interviewPrepQuestions,
    },
    cautionNotice: `본 분석은 공개된 산업 기술 자료와 최신 IR 보고서를 바탕으로 [${comp}]의 [${role}] 직무에 맞추어 생성된 자료이며, 실제 채용 시점의 세부 요건은 각 기업 채용 공고를 최종 확인하시기 바랍니다.`,
  };
}
