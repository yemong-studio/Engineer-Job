import React, { useState, useEffect } from 'react';
import { Briefcase, Newspaper, Building2, ShieldCheck, Database, Check, ExternalLink, Trash2, Edit3, Save } from 'lucide-react';
import { UserProfile, JobPosting, IndustryNewsItem, CompanyAnalysisResult } from '../types';
import { AVATAR_USER_IMAGE, ENGINEERING_MAJORS } from '../lib/constants';

interface MyPageSectionProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  savedJobs: JobPosting[];
  onRemoveSavedJob: (jobId: string) => void;
  savedNews: IndustryNewsItem[];
  savedAnalyses: CompanyAnalysisResult[];
  onSelectTab: (tab: any) => void;
  onSwitchUser?: (userKey: string) => void;
}

export const MyPageSection: React.FC<MyPageSectionProps> = ({
  userProfile,
  onUpdateProfile,
  savedJobs,
  onRemoveSavedJob,
  savedNews,
  savedAnalyses,
  onSelectTab,
  onSwitchUser,
}) => {
  const [profile, setProfile] = useState<UserProfile>(userProfile);
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'jobs' | 'news' | 'analyses' | 'serverless'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [serverlessStatus, setServerlessStatus] = useState<any>(null);
  const [newSkill, setNewSkill] = useState('');
  const [newTool, setNewTool] = useState('');

  useEffect(() => {
    fetch('/api/supabase/status')
      .then((r) => r.json())
      .then((data) => setServerlessStatus(data))
      .catch(() => setServerlessStatus({ error: '상태 확인 불가' }));
  }, []);

  const handleSaveProfile = () => {
    onUpdateProfile(profile);
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.techSkills.includes(newSkill.trim())) {
      setProfile({ ...profile, techSkills: [...profile.techSkills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setProfile({ ...profile, techSkills: profile.techSkills.filter((s) => s !== skill) });
  };

  const handleAddTool = () => {
    if (newTool.trim() && !profile.engineeringTools.includes(newTool.trim())) {
      setProfile({ ...profile, engineeringTools: [...profile.engineeringTools, newTool.trim()] });
      setNewTool('');
    }
  };

  const handleRemoveTool = (tool: string) => {
    setProfile({ ...profile, engineeringTools: profile.engineeringTools.filter((t) => t !== tool) });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Profile Identity Strip */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={AVATAR_USER_IMAGE}
            alt={profile.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>{profile.degree}</span>
              <span aria-hidden="true">·</span>
              <span>학점 {profile.gpa}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                RLS 세션 격리 활성
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{profile.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {profile.email} · {profile.major}
            </p>
          </div>
        </div>

        {/* Quick Multi-User Test Switcher */}
        {onSwitchUser && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">사용자 계정 전환:</span>
            <button
              onClick={() => onSwitchUser('kim')}
              className={`px-3 py-1.5 rounded-lg border font-medium cursor-pointer ${
                profile.name === '김공학' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700'
              }`}
            >
              김공학 (기계)
            </button>
            <button
              onClick={() => onSwitchUser('park')}
              className={`px-3 py-1.5 rounded-lg border font-medium cursor-pointer ${
                profile.name === '박전자' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700'
              }`}
            >
              박전자 (전기/전자)
            </button>
          </div>
        )}
      </div>

      {/* Sub Tabs Navigation */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl mb-6 text-xs font-semibold overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveSubTab('profile')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeSubTab === 'profile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          엔지니어링 프로필 관리
        </button>
        <button
          onClick={() => setActiveSubTab('jobs')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeSubTab === 'jobs' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          관심 채용공고 ({savedJobs.length})
        </button>
        <button
          onClick={() => setActiveSubTab('news')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeSubTab === 'news' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          스크랩한 산업 뉴스 ({savedNews.length})
        </button>
        <button
          onClick={() => setActiveSubTab('analyses')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeSubTab === 'analyses' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          저장된 기업 분석 ({savedAnalyses.length})
        </button>
        <button
          onClick={() => setActiveSubTab('serverless')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeSubTab === 'serverless' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Serverless & 보안 현황
        </button>
      </div>

      {/* Sub Tab 1: Profile View / Edit */}
      {activeSubTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">공학 전공 및 기술 스펙 설정</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                AI 직무 추천 및 기업 분석 대시보드와 자동 연동되는 핵심 스펙입니다.
              </p>
            </div>
            <button
              onClick={() => {
                if (isEditing) handleSaveProfile();
                else setIsEditing(true);
              }}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-slate-800 transition-colors"
            >
              {isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
              <span>{isEditing ? '저장 완료' : '정보 수정'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Major & Education */}
            <div className="space-y-4">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">공학 전공</label>
                {isEditing ? (
                  <select
                    value={profile.major}
                    onChange={(e) => setProfile({ ...profile, major: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  >
                    {ENGINEERING_MAJORS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="font-semibold text-slate-900 text-sm">{profile.major}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">학력 및 학점</label>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={profile.degree}
                      onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                      className="p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={profile.gpa}
                      onChange={(e) => setProfile({ ...profile, gpa: e.target.value })}
                      className="p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                ) : (
                  <p className="text-slate-800">{profile.degree} · 학점 {profile.gpa}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">희망 직무 및 지역</label>
                <p className="text-slate-800">{profile.preferredRoles.join(', ')} / {profile.preferredRegions.join(', ')}</p>
              </div>
            </div>

            {/* Tools and Skills */}
            <div className="space-y-4">
              <div>
                <label className="block text-slate-600 font-semibold mb-1.5">사용 가능한 엔지니어링 툴 (CAD / 해석 / SW)</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {profile.engineeringTools.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-medium flex items-center gap-1.5"
                    >
                      <span>{tool}</span>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTool(tool)}
                          className="text-slate-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={newTool}
                      onChange={(e) => setNewTool(e.target.value)}
                      placeholder="새로운 툴 추가 (예: SolidWorks, ROS2)"
                      className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddTool}
                      className="px-3 py-2 bg-slate-900 text-white rounded-lg cursor-pointer"
                    >
                      추가
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1.5">보유 전공 핵심 역량</label>
                <div className="flex flex-wrap gap-1.5">
                  {profile.techSkills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project experiences */}
          <div className="pt-6 border-t border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 mb-3">대표 프로젝트 경험 및 정량 성과</h4>
            <div className="space-y-3">
              {profile.projectExperience.map((proj, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 text-sm">{proj.title}</span>
                    <span className="text-slate-400">{proj.duration}</span>
                  </div>
                  <p className="text-slate-600 mb-2">역할: {proj.role} · 스택: {proj.techStack}</p>
                  <p className="text-slate-700 mb-1">{proj.description}</p>
                  <div className="text-blue-700 font-semibold bg-blue-50/70 p-2 rounded-lg">
                    정량 성과: {proj.metricOutcome}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub Tab 2: Saved Jobs */}
      {activeSubTab === 'jobs' && (
        <div className="space-y-4">
          {savedJobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-800">보관된 관심 공고가 없습니다.</p>
              <button
                onClick={() => onSelectTab('jobs')}
                className="mt-3 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                채용공고 검색하러 가기
              </button>
            </div>
          ) : (
            savedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-slate-900">{job.company}</span>
                    <span aria-hidden="true">·</span>
                    <span>{job.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{job.location}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{job.title}</h4>
                  <div className="flex flex-wrap gap-1">
                    {job.skills.map((s) => (
                      <span key={s} className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onRemoveSavedJob(job.id)}
                    className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50 cursor-pointer"
                    title="보관 해제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <a
                    href={job.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>원문 링크</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Sub Tab 3: Saved News */}
      {activeSubTab === 'news' && (
        <div className="space-y-4">
          {savedNews.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
              <Newspaper className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-800">스크랩한 산업 뉴스가 없습니다.</p>
              <button
                onClick={() => onSelectTab('hint')}
                className="mt-3 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Industry HINT 뉴스 보러가기
              </button>
            </div>
          ) : (
            savedNews.map((n) => (
              <div key={n.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span className="font-semibold text-blue-600">{n.origin}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-slate-800">{n.source}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{n.publishedAt}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{n.title}</h4>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1 mb-3">
                  {n.threeLineSummary?.map((l, i) => (
                    <div key={i}>· {l}</div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <a
                    href={n.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-slate-700 hover:text-indigo-600 flex items-center gap-1"
                  >
                    <span>기사 원문 바로가기</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Sub Tab 4: Saved Analyses */}
      {activeSubTab === 'analyses' && (
        <div className="space-y-4">
          {savedAnalyses.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
              <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-800">저장된 기업 분석 리포트가 없습니다.</p>
              <button
                onClick={() => onSelectTab('company')}
                className="mt-3 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                AI 기업 분석 시작하기
              </button>
            </div>
          ) : (
            savedAnalyses.map((a, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-bold text-slate-900">
                    {a.companyName} / {a.targetJobRole}
                  </h4>
                  <span className="text-xs text-slate-400 tabular-nums">분석일: {a.analysisDate}</span>
                </div>
                <p className="text-xs text-slate-600 mb-2">사업영역: {a.step1.businessDomain}</p>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-700">
                  <strong>핵심 차별점: </strong> {a.step1.differentiators[0]}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Sub Tab 5: Serverless Architecture & Security Audit */}
      {activeSubTab === 'serverless' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Serverless & 보안 아키텍처 감사</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              별도의 상시 가동 레거시 서버 없이 관리형 서버리스 함수와 분리된 사용자 세션을 활용합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>API 키 서버 측 관리 (Zero Client Exposure)</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Gemini API Key, Google News 엔드포인트 및 관리자 비밀키는 전량 서버리스 환경변수로 보호되며 브라우저에 절대 노출되지 않습니다.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Database className="w-4 h-4 text-blue-600" />
                <span>Row Level Security (RLS) 및 사용자 격리</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                사용자별 고유 ID(`{profile.id}`)를 기준으로 데이터베이스 접근 권한이 분리되어 타인의 개인 이력서나 스크랩 정보에 접근할 수 없습니다.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Briefcase className="w-4 h-4 text-amber-600" />
                <span>On-Demand 뉴스 및 채용 검색</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                사용자의 검색 요청 시점에만 실행되며 정기 수집(Cron)이나 불필요한 스케줄러가 없어 클라우드 비용을 최소화합니다.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Check className="w-4 h-4 text-indigo-600" />
                <span>저작권 준수 & 공식 원문 링크 이동</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                외부 채용정보 및 기사 전문을 무단 복제하지 않고 순수 AI 분석 요약과 공식 원문 직결 URL만을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
