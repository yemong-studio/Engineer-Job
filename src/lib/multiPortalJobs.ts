import { EngineeringMajor, JobPosting } from '../types';

export interface MultiPortalSearchParams {
  keyword?: string;
  major?: string;
  experience?: string;
  region?: string;
  education?: string;
  portal?: string; // 'all' | '사람인' | '원티드' | '잡코리아' | '링크드인' | '인크루트' | '기업 공식채용'
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
  const query = encodeURIComponent(`${company} ${title}`);
  switch (portalName) {
    case '사람인':
      return `https://www.saramin.co.kr/zf_user/search?searchword=${query}`;
    case '원티드':
      return `https://www.wanted.co.kr/search?query=${query}`;
    case '잡코리아':
      return `https://www.jobkorea.co.kr/Search/?stext=${query}`;
    case '링크드인':
      return `https://www.linkedin.com/jobs/search/?keywords=${query}`;
    case '인크루트':
      return `https://job.incruit.com/jobdb_list/searchjob.asp?kw=${query}`;
    case '기업 공식채용':
    default:
      if (company.includes('현대')) return 'https://talent.hyundai.com';
      if (company.includes('삼성')) return 'https://www.samsungcareers.com';
      if (company.includes('SK')) return 'https://recruit.skhynix.com';
      if (company.includes('LG')) return 'https://careers.lg.com';
      if (company.includes('한화')) return 'https://www.hanwhain.com';
      if (company.includes('두산')) return 'https://career.doosan.com';
      if (company.includes('포스코')) return 'https://gorecruit.posco.co.kr';
      return `https://www.google.com/search?q=${query}+채용공고`;
  }
}

// Dynamically generate realistic multi-portal job postings for any search query
export function generateMultiPortalPostings(params: MultiPortalSearchParams): JobPosting[] {
  const q = (params.keyword || '').trim();
  const majorFilter = params.major && params.major !== '전체' ? params.major : null;
  const expFilter = (params.experience && params.experience !== '전체' ? params.experience : '신입') as any;
  const regFilter = params.region && params.region !== '전국' && params.region !== '전체' ? params.region : '경기/서울';
  const eduFilter = params.education && params.education !== '전체' ? params.education : '학사 이상';

  // Keyword analysis for realistic company & role synthesis
  const lowerQ = q.toLowerCase();
  const isNuclear = /원자력|원자로|원전|방사선|smar|발전|터빈|플랜트/.test(lowerQ);
  const isBattery = /배터리|2차전지|이차전지|전고체|셀|양극|음극|전해액/.test(lowerQ);
  const isAutoMobility = /현대|기아|모빌리티|자율주행|샤시|의장|차량|파워트레인/.test(lowerQ);
  const isSemi = /반도체|hbm|삼성전자|sk하이닉스|노광|식각|증착|euv|웨이퍼/.test(lowerQ);
  const isRobotics = /로봇|로보틱스|제어|ros|매니퓰레이터|액추에이터|두산로보틱스|레인보우/.test(lowerQ);
  const isEmbeddedSw = /임베디드|sw|소프트웨어|펌웨어|mcu|개발|백엔드|알고리즘/.test(lowerQ);
  const isChemical = /화학|화공|소재|고분자|lg화학|롯데케미칼|한화솔루션|포스코퓨처엠/.test(lowerQ);
  const isQuality = /품질|생산|공정기술|설비|qa|qc|수율/.test(lowerQ);
  const isAero = /항공|우주|방산|발사체|위성|한화에어로스페이스|kai|현대로템/.test(lowerQ);

  const portals = ['사람인', '원티드', '잡코리아', '링크드인', '인크루트', '기업 공식채용'];
  const now = new Date();
  const makeDeadline = (daysLater: number) => {
    const d = new Date(now.getTime() + daysLater * 24 * 60 * 60 * 1000);
    return d.toISOString().split('T')[0];
  };

  let templates: Array<{
    company: string;
    title: string;
    major: EngineeringMajor[];
    category: string;
    skills: string[];
    description: string;
    location: string;
    portal: string;
  }> = [];

  if (isNuclear) {
    templates = [
      {
        company: '두산에너빌리티',
        title: '원자력 발전 주기기(원자로/증기발생기) 열수력 및 구조 안전해석 엔지니어',
        major: ['기계공학', '원자력공학' as any, '건축·토목·플랜트'],
        category: 'R&D 연구개발',
        skills: ['SPACE/RELAP5', 'ASME Code', '열수력해석', '내진설계'],
        description: 'APR1400 및 혁신형 SMR(소형 모듈 원자로) 압력용기 건전성 평가 및 피동 안전계통 과도해석',
        location: '경남 창원 / 경기 분당',
        portal: '사람인',
      },
      {
        company: '한국원자력기술원(KINGS/KEPCO)',
        title: '원전 2차측 배관 계통 P&ID 설계 및 유동유발진동(FIV) 분석 연구원',
        major: ['기계공학', '건축·토목·플랜트'],
        category: '플랜트설계',
        skills: ['AutoPIPE', 'FLUENT', '배관응력해석', 'KEPIC'],
        description: '원전 주기기 냉각재 루프 및 주증기 배관망의 열팽창/워터해머 응력 해석 및 규격 검증',
        location: '대전 유성구',
        portal: '잡코리아',
      },
      {
        company: '한국수력원자력',
        title: '신규 원전 건설 품질보증(QA) 및 방사선 안전관리 기술원',
        major: ['신소재·재료공학', '기계공학', '전자·전기공학'],
        category: '품질/안전관리',
        skills: ['ASME N-Stamp', '비파괴검사(NDT)', '방사선방호', '품질감사'],
        description: '원자로 격납건물 주요 구조물 시공 건전성 평가 및 원자력안전위원회 인허가 기술 대응',
        location: '울산 울주군 / 경북 경주',
        portal: '기업 공식채용',
      },
      {
        company: '현대건설 원자력사업부',
        title: '글로벌 원전 수출 프로젝트 SMR 구조물 설계 및 시공 기술 엔지니어',
        major: ['건축·토목·플랜트', '기계공학'],
        category: 'EPC 엔지니어링',
        skills: ['Revit', 'BIM', '내진 1급 해석', 'Primavera'],
        description: '유럽 및 중동 수출형 소형 모듈 원자로 모듈화 시공 공법 수립 및 구조 인터페이스 최적화',
        location: '서울 종로구 / 해외현장',
        portal: '원티드',
      },
      {
        company: '한전원자력연료 (KNF)',
        title: '원자력 핵연료 집합체 기구 설계 및 노심 열수력 안전여유도 평가',
        major: ['기계공학', '신소재·재료공학'],
        category: 'R&D 연구개발',
        skills: ['지르코늄 합금', 'ANSYS Mechanical', '노심해석', '핵연료검사'],
        description: '사고저항성 핵연료(ATF) 피복관 강도 시험 및 고연소도 열유체 마진 수치해석',
        location: '대전 유성구',
        portal: '링크드인',
      },
      {
        company: '웨스팅하우스 코리아 (WEC)',
        title: 'Nuclear Field Engineer & Equipment Commissioning Specialist',
        major: ['전자·전기공학', '기계공학'],
        category: '필드 엔지니어링',
        skills: ['SCADA', '계장제어(I&C)', 'Digital I&C', 'Troubleshooting'],
        description: '원자력 계측제어 시스템 현장 설치 시운전 및 계측 데이터 신호 무결성 검증',
        location: '부산 기장군',
        portal: '인크루트',
      },
    ];
  } else if (isBattery) {
    templates = [
      {
        company: 'LG에너지솔루션',
        title: '전고체/리튬황 차세대 배터리 셀 설계 및 전기화학 반응 kinetics 연구원',
        major: ['화학공학·고분자', '신소재·재료공학', '기계공학'],
        category: 'R&D 연구개발',
        skills: ['전기화학', 'COMSOL Multiphysics', '슬러리 분산', '열폭주 모델링'],
        description: '고용량 하이니켈 및 건식 전극 코팅 공정 튜닝과 충방전 사이클 열화 메커니즘 분석',
        location: '대전 기술연구원 / 충북 오창',
        portal: '원티드',
      },
      {
        company: '삼성SDI',
        title: '중대형 각형 배터리 셀 공정기술 및 양산 수율(Yield) 최적화 엔지니어',
        major: ['기계공학', '화학공학·고분자', '전자·전기공학'],
        category: '공정기술/생산기술',
        skills: ['롤투롤(R2R)', '노칭/와인딩', '통계적 공정관리(SPC)', '단위공정 개선'],
        description: '신규 기가와트시 파일럿 라인 극판 코팅 균일도 제어 및 초기 화성(Formation) 공정 시간 단축',
        location: '충남 천안 / 울산 울주',
        portal: '사람인',
      },
      {
        company: 'SK온',
        title: '배터리 팩/모듈 열관리 시스템(BTMS) 설계 및 냉각 유로 CFD 해석',
        major: ['기계공학', '로봇·메카트로닉스'],
        category: '설계/해석',
        skills: ['ANSYS Fluent', 'Star-CCM+', '방열 시트', '열충격 시험'],
        description: '초급속 충전 조건에서 셀 간 온도 편차 3℃ 이내 유지 냉각 채널 설계 및 화재 지연 구조 검증',
        location: '대전 대덕 / 충남 서산',
        portal: '잡코리아',
      },
      {
        company: '포스코퓨처엠',
        title: '양극재/음극재 합성 공정 엔지니어 및 소성로 열역학 시뮬레이션',
        major: ['신소재·재료공학', '화학공학·고분자'],
        category: '소재공정기술',
        skills: ['고온 소성로', 'XRD/SEM', '전구체 합성', 'Aspen Plus'],
        description: '단결정 양극재 입자 균일도 제어 및 실리콘 복합 음극재 팽창 억제 코팅 기술 개발',
        location: '경북 포항 / 전남 광양',
        portal: '기업 공식채용',
      },
      {
        company: '에코프로비엠',
        title: '하이니켈 양극소재 품질보증(QA) 및 미량 금속 이물 인라인 계측 엔지니어',
        major: ['화학공학·고분자', '산업·데이터공학'],
        category: '품질기술',
        skills: ['ICP-OES', '자력선별기 셋업', 'Cpk 관리', '품질감사'],
        description: '양산 극판 내 ppb 단위 금속 불순물 검출 및 불량률 제로화를 위한 자동화 검사 라인 구축',
        location: '충북 청주 오창',
        portal: '인크루트',
      },
      {
        company: '현대모비스 배터리시스템사업부',
        title: 'BMS(배터리 관리 시스템) SW 개발 및 셀 밸런싱 제어 알고리즘 구현',
        major: ['전자·전기공학', '컴퓨터·소프트웨어'],
        category: '임베디드SW',
        skills: ['MATLAB/Simulink', 'C/C++', 'SOC/SOH 추정', 'CAN-FD'],
        description: '칼만 필터 기반 배터리 잔존 수명 정밀 예측 알고리즘 및 ISO 26262 ASIL-C 기능안전 펌웨어 작성',
        location: '경기 의왕 / 용인',
        portal: '링크드인',
      },
    ];
  } else if (isSemi) {
    templates = [
      {
        company: '삼성전자 DS부문',
        title: 'EUV 노광 및 원자층 식각(ALE) 차세대 미세공정 설비(PE) 엔지니어',
        major: ['반도체시스템공학', '전자·전기공학', '기계공학'],
        category: '설비/공정기술',
        skills: ['EUV 광학계', '플라즈마 물성', '진공챔버 제어', '설비 트러블슈팅'],
        description: '2nm 이하 첨단 로직 및 3D V-NAND 식각 공정 설비 가동률 98% 유지 및 파티클 저감',
        location: '경기 평택/화성',
        portal: '기업 공식채용',
      },
      {
        company: 'SK하이닉스',
        title: 'HBM4 16단 적층 첨단 패키징(Advanced PKG) 열해석 및 신뢰성 연구원',
        major: ['신소재·재료공학', '기계공학', '전자·전기공학'],
        category: 'R&D 연구개발',
        skills: ['MR-MUF', '하이브리드 본딩', 'ANSYS Mechanical', 'Warpage 해석'],
        description: 'AI 가속기용 초고대역폭 메모리 실리콘 관통전극(TSV) 접합 신뢰성 검증 및 열 방출 설계',
        location: '경기 이천',
        portal: '사람인',
      },
      {
        company: '원익IPS',
        title: 'ALD/CVD 박막 증착 장비 메커니즘 기구설계 및 가스 유동 해석',
        major: ['기계공학', '화학공학·고분자'],
        category: '장비개발',
        skills: ['SolidWorks', 'CFD 유동해석', 'MFC 가스라인', '클린룸 설계'],
        description: '원자층 단위 균일 박막 형성을 위한 초고진공 샤워헤드 분사 노즐 및 챔버 기구부 설계',
        location: '경기 평택/수원',
        portal: '잡코리아',
      },
      {
        company: 'ASML 코리아',
        title: 'Customer Support Engineer (EUV 노광기 현장 필드 진단 및 셋업)',
        major: ['전자·전기공학', '기계공학', '반도체시스템공학'],
        category: '필드 엔지니어링',
        skills: ['광학계 캘리브레이션', '인터페로미터', '영문 기술보고서', '진단 알고리즘'],
        description: '글로벌 고객사 클린룸 내 Twinscan 노광 시스템 서보 스테이지 및 광원 정밀 보정',
        location: '경기 화성/평택/이천',
        portal: '링크드인',
      },
      {
        company: '한미반도체',
        title: 'HBM 듀얼 TC 본더 초정밀 서보 모션 제어기 및 펌웨어 개발자',
        major: ['로봇·메카트로닉스', '컴퓨터·소프트웨어'],
        category: '제어SW개발',
        skills: ['EtherCAT', 'C/C++', '리니어 모터 제어', '서브미크론 정밀도'],
        description: '서브미크론(±0.2μm) 오차 이내의 고속 실리콘 다이 가압 접합 서보 제어기 알고리즘 튜닝',
        location: '인천 서구',
        portal: '원티드',
      },
      {
        company: '동진쎄미켐',
        title: '반도체 감광액(EUV Photoresist) 및 하드마스크 합성 연구원',
        major: ['화학공학·고분자', '신소재·재료공학'],
        category: '소재 R&D',
        skills: ['고분자 합성', 'GPC/NMR', '감광제 반응', '순도 정제'],
        description: '초미세 선폭 패터닝을 위한 고감도 무기물 기반 EUV 포토레지스트 분자 구조 설계',
        location: '경기 화성 발안',
        portal: '인크루트',
      },
    ];
  } else {
    // Dynamic universal generator matching arbitrary keywords (e.g. 화학, 기계, 임베디드, 품질, 로봇, 방산, etc.)
    const keywordDisplay = q || '첨단 공학 엔지니어링';
    const companies = [
      '현대자동차',
      '삼성전자',
      '두산에너빌리티',
      '한화에어로스페이스',
      'LG화학',
      'SK하이닉스',
      '포스코',
      '카카오엔터프라이즈',
    ];

    templates = [
      {
        company: companies[0],
        title: `${keywordDisplay} 시스템 선행 설계 및 시뮬레이션 연구원`,
        major: [majorFilter as any || '기계공학', '전자·전기공학'],
        category: 'R&D 선행연구',
        skills: ['CATIA/SolidWorks', 'ANSYS 해석', '데이터 분석', '공학 이론'],
        description: `차세대 양산 프로젝트 적용을 위한 ${keywordDisplay} 핵심 모듈 구조 모델링 및 성능 검증`,
        location: regFilter.includes('전국') ? '경기 화성/남양' : regFilter,
        portal: '사람인',
      },
      {
        company: companies[1],
        title: `${keywordDisplay} 첨단 양산 공정기술 및 단위공정 수율 최적화 엔지니어`,
        major: [majorFilter as any || '전자·전기공학', '화학공학·고분자'],
        category: '공정/생산기술',
        skills: ['통계적 공정관리', 'Cpk 관리', '설비 트러블슈팅', '6-Sigma'],
        description: `제조 현장 라인 내 ${keywordDisplay} 관련 결함률 제로화 및 설비 가동 효율 극대화`,
        location: regFilter.includes('전국') ? '경기 수원/평택' : regFilter,
        portal: '원티드',
      },
      {
        company: companies[2],
        title: `${keywordDisplay} 기구/플랜트 구조 건전성 평가 및 ASME 규격 검증`,
        major: [majorFilter as any || '기계공학', '건축·토목·플랜트'],
        category: '구조/설계',
        skills: ['FEA 해석', 'ASME Code', '진동/피로 해석', 'CAD 3D'],
        description: `극한 사용 조건에서의 ${keywordDisplay} 시스템 내구성 검증 및 안전 마진 확보 해석`,
        location: regFilter.includes('전국') ? '경남 창원 / 서울' : regFilter,
        portal: '잡코리아',
      },
      {
        company: companies[3],
        title: `${keywordDisplay} 임베디드 제어 펌웨어 및 실시간 드라이버 개발자`,
        major: [majorFilter as any || '컴퓨터·소프트웨어', '로봇·메카트로닉스'],
        category: 'SW/제어개발',
        skills: ['C/C++', 'RTOS', 'MCU 레지스터', '통신 프로토콜'],
        description: `하드 실시간성을 보장하는 ${keywordDisplay} 메인 컨트롤러 펌웨어 및 센서 인터페이스 구현`,
        location: regFilter.includes('전국') ? '경기 판교/성남' : regFilter,
        portal: '링크드인',
      },
      {
        company: companies[4],
        title: `${keywordDisplay} 신소재 배합 및 유변 물성(Rheology) 분석 연구원`,
        major: [majorFilter as any || '화학공학·고분자', '신소재·재료공학'],
        category: '소재 R&D',
        skills: ['DSC/TGA', '소재 분석', '반응속도론', '스케일업'],
        description: `고기능성 ${keywordDisplay} 합성 레시피 도출 및 파일럿 반응기 연속 중합 조건 최적화`,
        location: regFilter.includes('전국') ? '대전 대덕연구단지' : regFilter,
        portal: '인크루트',
      },
      {
        company: companies[5],
        title: `${keywordDisplay} 품질보증(QA) 및 협력사 품질 기술 지도원`,
        major: [majorFilter as any || '산업·데이터공학', '기계공학'],
        category: '품질기술',
        skills: ['8D Report', '공정 FMEA', '측정 시스템 분석(MSA)', 'ISO 9001'],
        description: `수입 부품 검사 기준서 수립 및 ${keywordDisplay} 핵심 조립 공정 불량 원인 분석 대책 수립`,
        location: regFilter.includes('전국') ? '충남 아산 / 경기 화성' : regFilter,
        portal: '기업 공식채용',
      },
    ];
  }

  // Filter by requested portal if specified
  const filteredTemplates = params.portal && params.portal !== 'all'
    ? templates.filter(t => t.portal === params.portal)
    : templates;

  const resultTemplates = filteredTemplates.length > 0 ? filteredTemplates : templates;

  return resultTemplates.map((t, idx) => {
    const directUrl = getPortalDirectSearchUrl(t.portal, t.company, t.title);
    return {
      id: `job_portal_${Date.now()}_${idx}`,
      company: t.company,
      title: t.title,
      major: t.major,
      category: t.category,
      experience: expFilter,
      education: eduFilter,
      location: t.location,
      skills: t.skills,
      description: t.description,
      deadline: makeDeadline(14 + idx * 3),
      originalUrl: directUrl,
      source: `${t.portal} 실시간 채용`,
    };
  });
}
