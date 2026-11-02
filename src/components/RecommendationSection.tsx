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

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  userProfile,
  onUpdateProfile,
  onSearchJobsByRole,
  onAnalyzeCompany,
}) => {
  const [profile, setProfile] = useState<UserProfile>(userProfile);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<JobRecommendation[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleGetRecommendations = async () => {
    setLoading(true);
    setErrorMsg(null);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const data = await res.json();
      if (data.success && data.data) {
        setRecommendations(data.data);
      } else {
        setErrorMsg(data.message || '추천 분석 도중 오류가 발생했습니다.');
      }
    } catch (err: any) {
      clearTimeout(timeout);
      console.error(err);
      if (err.name === 'AbortError') {
        setErrorMsg('응답 시간이 지연되었습니다. 다시 한 번 시도해 주세요.');
      } else {
        setErrorMsg('서버리스 엔드포인트 통신 실패: 잠시 후 다시 시도해 주세요.');
      }
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

      {/* Error message */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs mb-6">
          {errorMsg}
        </div>
      )}

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
