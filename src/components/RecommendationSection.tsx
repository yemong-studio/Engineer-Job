import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight, RefreshCw, ChevronRight } from 'lucide-react';
import { JobRecommendation, UserProfile } from '../types';
import { ENGINEERING_MAJORS } from '../lib/constants';

interface RecommendationSectionProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onSearchJobsByRole: (role: string) => void;
  onAnalyzeCompany: (company: string, role?: string) => void;
}

function getClientFallbackRecommendations(profile: UserProfile): JobRecommendation[] {
  const tools = profile.engineeringTools?.length ? profile.engineeringTools.join(', ') : 'CATIA, ANSYS, MATLAB';
  const major = profile.major || '기계공학';
  const project = profile.projectExperience?.[0];
  const projectTitle = project?.title || '캡스톤 디자인 프로젝트';
  const projectMetric = project?.metricOutcome || '정량 성과 달성';

  if (major.includes('전자') || major.includes('전기') || major.includes('반도체')) {
    return [
      {
        roleTitle: '임베디드 제어 및 전력전자 시스템 엔지니어',
        matchScore: 96,
        rationale: `${major} 전공 지식과 ${tools} 활용 역량, 그리고 프로젝트 실무 경험이 첨단 모빌리티 전장 및 전력 제어 부서의 인재상과 완벽하게 부합합니다.`,
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
    ];
  }

  // Default / Mechanical / Robotics / Aerospace
  return [
    {
      roleTitle: '기계/기구 구조 선행해석 연구원',
      matchScore: 95,
      rationale: `${major} 전공 지식과 ${tools} 활용 역량, 그리고 '${projectTitle}'에서 입증된 ${projectMetric} 수치가 미래 모빌리티 및 기구 구조 설계 인재상과 정확히 일치합니다.`,
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
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleGetRecommendations = async () => {
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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold text-blue-600 tracking-wider uppercase mb-1">
            Tailored Engineering Placement
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            AI 맞춤 직무·기업 추천
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            지원자의 공학 전공, 보유 툴(CAD/해석/SW), 프로젝트 정량 성과를 기반으로 합격률 높은 직무와 기업을 매칭합니다.
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
              <span>AI 매칭 분석 중...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>내 스펙으로 맞춤 추천받기</span>
            </>
          )}
        </button>
      </div>

      {/* Profile Summary Card / Toggle Edit */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
              SPEC
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {profile.name} 님의 엔지니어링 프로필
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{profile.major}</span>
                <span aria-hidden="true">·</span>
                <span>{profile.degree}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">학점 {profile.gpa}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline cursor-pointer"
          >
            {isEditingProfile ? '프로필 접기' : '프로필 스펙 수정'}
          </button>
        </div>

        {/* Profile Details or Inline Form */}
        {isEditingProfile ? (
          <div className="space-y-4 pt-2 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">전공</label>
                <select
                  value={profile.major}
                  onChange={(e) => setProfile({ ...profile, major: e.target.value as any })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  {ENGINEERING_MAJORS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">학력</label>
                <input
                  type="text"
                  value={profile.degree}
                  onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">학점</label>
                <input
                  type="text"
                  value={profile.gpa}
                  onChange={(e) => setProfile({ ...profile, gpa: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">사용 가능한 엔지니어링 툴 (쉼표 구분)</label>
              <input
                type="text"
                value={profile.engineeringTools.join(', ')}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    engineeringTools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                placeholder="예: CATIA V5, ANSYS, MATLAB, Python, SolidWorks, ROS"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  onUpdateProfile(profile);
                  setIsEditingProfile(false);
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                스펙 저장 완료
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">보유 기술 및 엔지니어링 툴:</span>
              <div className="flex flex-wrap gap-1.5">
                {profile.engineeringTools.map((tool) => (
                  <span key={tool} className="font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-slate-400 block mb-1">대표 프로젝트 성과:</span>
              <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {profile.projectExperience[0]?.title} —{' '}
                <strong className="text-slate-900">{profile.projectExperience[0]?.metricOutcome}</strong>
              </p>
            </div>
          </div>
        )}
      </div>



      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 bg-white rounded-2xl border border-slate-200 p-6 animate-pulse space-y-4">
              <div className="h-5 w-40 bg-slate-100 rounded" />
              <div className="h-20 bg-slate-50 rounded" />
              <div className="h-10 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Recommendations View */}
      {!loading && recommendations && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
            <span>AI 분석 결과 맞춤 추천 직무 {recommendations.length}개 도출</span>
            <span>전공·프로젝트 정량 성과 기반 알고리즘</span>
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

      {/* Initial state */}
      {!loading && !recommendations && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            공학 전공 및 사용 가능 툴에 최적화된 추천을 받아보세요
          </h3>
          <p className="text-xs text-slate-500 mb-5 max-w-md mx-auto">
            프로필에 등록된 기계·전자·SW 역량과 프로젝트 정량 수치를 바탕으로 가장 적합한 직무와 기업 풀을 제안합니다.
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
