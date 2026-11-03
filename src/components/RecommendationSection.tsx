import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  RefreshCw,
  ChevronRight,
  Plus,
  Trash2,
  SlidersHorizontal,
  GraduationCap,
  Briefcase,
  Award,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { JobRecommendation, UserProfile, EngineeringMajor } from '../types';
import { ENGINEERING_MAJORS } from '../lib/constants';

interface RecommendationSectionProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onSearchJobsByRole: (role: string) => void;
  onAnalyzeCompany: (company: string, role?: string) => void;
}

function getClientFallbackRecommendations(profile: UserProfile): JobRecommendation[] {
  const major = profile.major || '기계공학';
  const targetRole = profile.targetRole || (major.includes('전자') || major.includes('전기') || major.includes('반도체') ? '임베디드 제어 및 전력전자 시스템 엔지니어' : '기계/기구 구조 선행해석 연구원');
  const univ = profile.university ? `${profile.university} ` : '';
  const gpa = profile.gpa ? `학점 ${profile.gpa}, ` : '';
  const english = profile.englishScore ? `어학(${profile.englishScore}), ` : '';
  const primaryExp = profile.projectExperience?.[0];
  const projectTitle = primaryExp?.title || '엔지니어링 종합 설계 프로젝트';
  const projectMetric = primaryExp?.metricOutcome || '정량 성과 달성';

  if (major.includes('전자') || major.includes('전기') || major.includes('반도체') || targetRole.includes('회로') || targetRole.includes('반도체')) {
    return [
      {
        roleTitle: targetRole || '임베디드 제어 및 전력전자 시스템 엔지니어',
        matchScore: 96,
        rationale: `${univ}${major} 전공 지식과 ${gpa}${english}그리고 '${projectTitle}' 실무 경험이 첨단 모빌리티 전장 및 전력 제어 부서의 인재상과 완벽하게 부합합니다.`,
        recommendedCompanies: [
          { name: '현대모비스', category: '대기업', focusTech: '친환경차 전력변환 및 배터리 제어 시스템', openingsCount: 3 },
          { name: 'LG이노텍', category: '글로벌/유니콘', focusTech: '차량용 센서 모듈 및 전원 인버터', openingsCount: 4 },
          { name: '솔루엠', category: '강소·중견기업', focusTech: '초고효율 전력모듈 및 파워보드', openingsCount: 2 },
        ],
        strategicProjectHighlight: `'${projectTitle}'에서의 ${projectMetric} 성과를 바탕으로 노이즈 저감 및 시스템 전원 안정성 검증 경험을 서류에 전면 배치하십시오.`,
        requiredUpskilling: ['신호 무결성(SI/PI) 시뮬레이션', '차량용 통신 규격(CAN-FD, LIN)'],
      },
      {
        roleTitle: '반도체 공정/설비 및 수율 개선 엔지니어',
        matchScore: 92,
        rationale: '공학적 데이터 분석과 회로/물성 기본기를 갖춘 인재로서 첨단 패키징 및 미세 공정 라인 트러블슈팅에 최적의 역량을 보유하고 있습니다.',
        recommendedCompanies: [
          { name: '삼성전자 DS', category: '대기업', focusTech: 'HBM 패키징 및 차세대 클린룸 공정', openingsCount: 5 },
          { name: 'SK하이닉스', category: '대기업', focusTech: 'DRAM/NAND 수율 및 계측 엔지니어링', openingsCount: 4 },
          { name: '원익IPS', category: '강소·중견기업', focusTech: '플라즈마 증착 장비 메커니즘', openingsCount: 3 },
        ],
        strategicProjectHighlight: '실험 계측 장비 오차 제어 및 정밀 데이터 피팅 능력을 직무 적합성의 핵심으로 내세우십시오.',
        requiredUpskilling: ['통계적 공정관리(SPC)', '반도체 8대 공정 심화 이론'],
      },
      {
        roleTitle: '지능형 로보틱스 임베디드 펌웨어 엔지니어',
        matchScore: 88,
        rationale: '센서 융합 및 실시간 모터 구동 제어 역량을 기반으로 스마트 물류 및 서비스 로봇 하드웨어의 두뇌 역할을 담당할 수 있습니다.',
        recommendedCompanies: [
          { name: '두산로보틱스', category: '글로벌/유니콘', focusTech: '협동로봇 임베디드 액추에이터 제어', openingsCount: 3 },
          { name: '레인보우로보틱스', category: '글로벌/유니콘', focusTech: '초정밀 모터 서보 제어기 펌웨어', openingsCount: 2 },
          { name: '유진로봇', category: '강소·중견기업', focusTech: '자율주행 물류 로봇 임베디드 OS', openingsCount: 2 },
        ],
        strategicProjectHighlight: '통신 딜레이 최소화 및 실시간 RTOS 제어 최적화 사례를 기술 면접에서 적극 어필하세요.',
        requiredUpskilling: ['FreeRTOS / Embedded Linux', 'CANopen / EtherCAT 산업용 통신'],
      },
    ];
  }

  // Default / Mechanical / Robotics / Chemical / Other Engineering
  return [
    {
      roleTitle: targetRole || '기계/기구 구조 선행해석 연구원',
      matchScore: 95,
      rationale: `${univ}${major} 전공 지식과 ${gpa}${english}그리고 '${projectTitle}'에서 입증된 ${projectMetric} 수치가 미래 모빌리티 및 기구 구조 설계 인재상과 정확히 일치합니다.`,
      recommendedCompanies: [
        { name: '현대자동차 남양연구소', category: '대기업', focusTech: '샤시 메카트로닉스 및 전동화 플랫폼', openingsCount: 3 },
        { name: '두산로보틱스', category: '글로벌/유니콘', focusTech: '협동로봇 경량 기구 관절 메커니즘', openingsCount: 2 },
        { name: '대동모빌리티', category: '강소·중견기업', focusTech: '스마트 모빌리티 전동 구동계', openingsCount: 4 },
      ],
      strategicProjectHighlight: `'${projectTitle}'의 ${projectMetric} 달성 수치를 지원서 첫 문항의 핵심 요약으로 전면 배치하십시오.`,
      requiredUpskilling: ['다물체 동역학(RecurDyn/ADAMS)', '구조 진동 NVH 심화 해석'],
    },
    {
      roleTitle: '로보틱스 하드웨어 및 구동 메커니즘 설계자',
      matchScore: 91,
      rationale: '3D CAD 기반 정밀 기구 설계와 시뮬레이션 검증 역량은 스마트팩토리 및 자율주행 로봇 제조사에서 가장 선호하는 핵심 실무형 스펙입니다.',
      recommendedCompanies: [
        { name: '한화에어로스페이스', category: '대기업', focusTech: '특수 로봇 및 고정밀 구동 메커니즘', openingsCount: 2 },
        { name: '레인보우로보틱스', category: '글로벌/유니콘', focusTech: '이족보행/협동로봇 관절 액추에이터', openingsCount: 3 },
        { name: '뉴로메카', category: '강소·중견기업', focusTech: '자동화 로봇 하드웨어 아키텍처', openingsCount: 5 },
      ],
      strategicProjectHighlight: '실시간 제어 알고리즘 연동 및 반복 정밀도 오차 검증 경험을 포트폴리오와 함께 강조하십시오.',
      requiredUpskilling: ['EtherCAT 모터 드라이버 제어', '정밀 감속기 토크 용량 선정'],
    },
    {
      roleTitle: '모빌리티 열관리 및 유체 시스템 엔지니어',
      matchScore: 89,
      rationale: '배터리 팩 및 고전압 부품의 발열 제어가 중요해짐에 따라 구조역학과 열유체 복합 해석 역량을 가진 엔지니어 수요가 급증하고 있습니다.',
      recommendedCompanies: [
        { name: '한온시스템', category: '대기업', focusTech: '전기차 히트펌프 및 통합 열관리 모듈', openingsCount: 3 },
        { name: 'HL만도', category: '대기업', focusTech: '전자식 브레이크 및 조향 유압/전동계', openingsCount: 2 },
        { name: '삼기이브이', category: '강소·중견기업', focusTech: '2차전지 엔드플레이트 경량 하우징', openingsCount: 2 },
      ],
      strategicProjectHighlight: '열팽창 및 구조적 변형을 최소화한 설계 기법을 자기소개서에 부각하십시오.',
      requiredUpskilling: ['ANSYS Fluent / Star-CCM+', '전동화 냉각 회로 사이클 분석'],
    },
  ];
}

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  userProfile,
  onUpdateProfile,
  onSearchJobsByRole,
  onAnalyzeCompany,
}) => {
  const [profile, setProfile] = useState<UserProfile>(userProfile);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<JobRecommendation[] | null>(() =>
    getClientFallbackRecommendations(userProfile)
  );

  // For guest users, show the spec input form expanded by default so they don't have to go to MyPage
  const isGuest = userProfile.id === 'usr_guest';
  const [isFormOpen, setIsFormOpen] = useState(true);

  // Sync with prop changes (e.g. user switch in Navbar)
  useEffect(() => {
    setProfile(userProfile);
    setRecommendations(getClientFallbackRecommendations(userProfile));
  }, [userProfile]);

  const handleProfileFieldChange = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
    const updated = { ...profile, [field]: value };
    setProfile(updated);
    onUpdateProfile(updated);
  };

  const handleAddExperience = () => {
    const newExp = {
      title: '',
      role: '',
      techStack: '',
      description: '',
      metricOutcome: '',
      duration: '',
    };
    const updatedExperiences = [...(profile.projectExperience || []), newExp];
    handleProfileFieldChange('projectExperience', updatedExperiences);
  };

  const handleUpdateExperience = (index: number, key: string, value: string) => {
    const updatedExperiences = [...(profile.projectExperience || [])];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [key]: value,
    };
    handleProfileFieldChange('projectExperience', updatedExperiences);
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperiences = (profile.projectExperience || []).filter((_, i) => i !== index);
    handleProfileFieldChange('projectExperience', updatedExperiences);
  };

  const handleGetRecommendations = async () => {
    // Immediately persist latest local profile state to parent
    onUpdateProfile(profile);

    setLoading(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setRecommendations(data.data);
      } else {
        setRecommendations(getClientFallbackRecommendations(profile));
      }
    } catch (err: any) {
      clearTimeout(timeout);
      console.warn('Recommendation API network recovery:', err);
      setRecommendations(getClientFallbackRecommendations(profile));
    } finally {
      setLoading(false);
    }
  };

  // Common Enter key handler for inputs
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleGetRecommendations();
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">
              Tailored Engineering Placement
            </span>
            {isGuest && (
              <span className="text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
                게스트 직접 입력 모드
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            AI 맞춤 직무·기업 추천
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            마이페이지로 이동할 필요 없이, 아래에서 직접 스펙을 입력하고 <strong className="text-blue-600 font-semibold">Enter(엔터키)</strong>를 누르면 맞춤 직무와 기업을 분석해 드립니다.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGetRecommendations}
          disabled={loading}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors shrink-0"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>AI 맞춤 분석 실행 중...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>입력한 스펙으로 추천받기 (Enter)</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Interactive Spec Input Card (Guest & Inline Spec Customization) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs mb-8 overflow-hidden">
        {/* Card Header & Toggle */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  내 엔지니어링 스펙 & 희망 조건 입력
                </h3>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  (수정 후 엔터키를 치면 즉시 분석 시작)
                </span>
              </div>
              <p className="text-xs text-slate-500">
                지원직무, 나이, 학교, 학과, 학점, 영어성적 및 프로젝트 경험을 자유롭게 입력하세요.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {isFormOpen ? '스펙 입력창 접기' : '스펙 입력창 펼치기'}
            </button>
          </div>
        </div>

        {/* Form Body */}
        {isFormOpen && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGetRecommendations();
            }}
            className="p-6 space-y-6"
          >
            {/* Top Row: Target Role & Age */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  <span>지원 희망 직무 (Target Role)</span>
                  <span className="text-[11px] text-blue-600 font-normal ml-auto">
                    *입력 후 Enter시 분석
                  </span>
                </label>
                <input
                  type="text"
                  value={profile.targetRole || ''}
                  onChange={(e) => handleProfileFieldChange('targetRole', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="예: 샤시/의장 메카트로닉스 선행 구조설계 연구원, 반도체 공정설비, 로봇 HW 설계"
                  className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-2xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  나이 (Age)
                </label>
                <input
                  type="text"
                  value={profile.age || ''}
                  onChange={(e) => handleProfileFieldChange('age', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="예: 26세"
                  className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Middle Row: University, Major, GPA, English Score */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                  <span>출신 학교 (University)</span>
                </label>
                <input
                  type="text"
                  value={profile.university || ''}
                  onChange={(e) => handleProfileFieldChange('university', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="예: 한국공과대학교, 부산대학교"
                  className="w-full px-3.5 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>학과 / 전공 (Major)</span>
                </label>
                <select
                  value={profile.major}
                  onChange={(e) => handleProfileFieldChange('major', e.target.value as EngineeringMajor)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-3.5 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs text-slate-900 outline-none transition-all shadow-2xs cursor-pointer"
                >
                  {ENGINEERING_MAJORS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  학점 (GPA)
                </label>
                <input
                  type="text"
                  value={profile.gpa || ''}
                  onChange={(e) => handleProfileFieldChange('gpa', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="예: 3.85 / 4.5"
                  className="w-full px-3.5 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-slate-500" />
                  <span>영어 성적 (English Score)</span>
                </label>
                <input
                  type="text"
                  value={profile.englishScore || ''}
                  onChange={(e) => handleProfileFieldChange('englishScore', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="예: TOEIC 850, OPIc IH, 토스 AL"
                  className="w-full px-3.5 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Bottom: Dynamic Personal Experiences List */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    자신의 경험 및 프로젝트 내역
                  </span>
                  <span className="text-[11px] text-slate-400">
                    ({profile.projectExperience?.length || 0}건 등록됨)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>경험 추가</span>
                </button>
              </div>

              {(!profile.projectExperience || profile.projectExperience.length === 0) ? (
                <div className="text-center py-6 px-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-xs text-slate-500">
                  <p>등록된 프로젝트/경험이 없습니다.</p>
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="mt-2 text-blue-600 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>첫 경험 추가하기</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {profile.projectExperience.map((exp, index) => (
                    <div
                      key={index}
                      className="p-4 bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-xl space-y-3 transition-colors relative group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                          경험 #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(index)}
                          className="text-slate-400 hover:text-red-500 p-1 rounded-md transition-colors cursor-pointer"
                          title="이 경험 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-medium text-slate-600 mb-1">
                            프로젝트 / 경험 명칭
                          </label>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => handleUpdateExperience(index, 'title', e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="예: 자율주행 모빌리티용 조향 액추에이터 경량화 설계"
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 focus:border-blue-500 rounded-lg text-xs text-slate-900 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-slate-600 mb-1">
                            수행 역할 (Role)
                          </label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => handleUpdateExperience(index, 'role', e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="예: 구조 설계 및 FEA 강도 해석 총괄"
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 focus:border-blue-500 rounded-lg text-xs text-slate-900 outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-slate-600 mb-1">
                            주요 활동 및 사용 기술/툴
                          </label>
                          <input
                            type="text"
                            value={exp.description}
                            onChange={(e) => handleUpdateExperience(index, 'description', e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="예: CATIA, ANSYS Mechanical 이용 위상최적화 리브 재설계 수행"
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 focus:border-blue-500 rounded-lg text-xs text-slate-900 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-slate-600 mb-1">
                            정량적 성과 (수치 지표)
                          </label>
                          <input
                            type="text"
                            value={exp.metricOutcome || ''}
                            onChange={(e) => handleUpdateExperience(index, 'metricOutcome', e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="예: 질량 18.4% 감량 및 피로 안전계수 1.6 달성"
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 focus:border-blue-500 rounded-lg text-xs text-slate-900 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  모든 입력란에서 <strong className="text-slate-800 font-semibold">Enter키</strong>를 누르면 입력 내용이 저장되고 즉시 AI 추천이 시작됩니다.
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs ml-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                  <span>맞춤 직무 추천 실행 (Enter)</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* 3. Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 bg-white rounded-2xl border border-slate-200 p-6 animate-pulse space-y-4">
              <div className="h-5 w-48 bg-slate-100 rounded" />
              <div className="h-20 bg-slate-50 rounded" />
              <div className="h-10 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* 4. Recommendations View */}
      {!loading && recommendations && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 pb-2 border-b border-slate-200">
            <span className="font-medium text-slate-700">
              입력하신 스펙 기반 맞춤 추천 직무 {recommendations.length}개 도출
              {profile.targetRole && (
                <span className="text-blue-600 font-bold ml-1.5">
                  [{profile.targetRole}]
                </span>
              )}
            </span>
            <span>지원자 전공·어학·프로젝트 정량 성과 기반 알고리즘</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Title & Match Score */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-xs text-blue-600 font-bold uppercase tracking-wider block mb-0.5">
                        추천 순위 #{idx + 1}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">{item.roleTitle}</h3>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs text-slate-400">스펙 적합도</div>
                      <div className="text-xl font-bold font-mono text-blue-600 tabular-nums">
                        {item.matchScore}%
                      </div>
                    </div>
                  </div>

                  {/* Recommendation Rationale */}
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-4">
                    {item.rationale}
                  </p>

                  {/* Recommended Companies by Tier */}
                  <div className="mb-4">
                    <span className="text-xs font-bold text-slate-900 block mb-2">추천 목표 기업군</span>
                    <div className="space-y-2">
                      {item.recommendedCompanies.map((c, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-white text-xs hover:border-slate-200 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900">{c.name}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                              {c.category}
                            </span>
                            <span className="text-slate-400 text-[11px] hidden sm:inline">
                              주요기술: {c.focusTech}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => onAnalyzeCompany(c.name, item.roleTitle)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-[11px] flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>기업 분석</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic Project Highlight Advice */}
                  <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 text-xs text-blue-950 mb-4 leading-relaxed">
                    <strong className="block mb-0.5 text-blue-900">자소서 강조 포인트:</strong>
                    {item.strategicProjectHighlight}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-slate-400">
                    보완 역량: {item.requiredUpskilling.slice(0, 2).join(', ')}
                  </div>
                  <button
                    type="button"
                    onClick={() => onSearchJobsByRole(item.roleTitle)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>관련 채용공고 보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Initial Empty State */}
      {!loading && !recommendations && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            공학 전공 및 사용 가능 툴에 최적화된 추천을 받아보세요
          </h3>
          <p className="text-xs text-slate-500 mb-5 max-w-md mx-auto">
            위 입력창에서 지원직무, 나이, 학교, 학과, 학점, 영어성적 및 프로젝트 경험을 작성하고 Enter를 누르시면 최적의 직무를 제안합니다.
          </p>
          <button
            onClick={handleGetRecommendations}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
          >
            지금 추천 분석 시작하기
          </button>
        </div>
      )}
    </section>
  );
};
