import React, { useState, useEffect } from 'react';
import { Search, Bookmark, ExternalLink, MapPin, GraduationCap, Briefcase, X, Sparkles, Filter, Globe } from 'lucide-react';
import { JobPosting } from '../types';
import { ENGINEERING_MAJORS, REGIONS, EXPERIENCE_LEVELS, INITIAL_JOB_POSTINGS } from '../lib/constants';
import { JOB_PORTALS, generateMultiPortalPostings } from '../lib/multiPortalJobs';

interface JobsSectionProps {
  onToggleSaveJob: (job: JobPosting) => void;
  savedJobIds: Set<string>;
  onAnalyzeCompany: (companyName: string, role: string) => void;
  initialKeyword?: string;
}

export const JobsSection: React.FC<JobsSectionProps> = ({
  onToggleSaveJob,
  savedJobIds,
  onAnalyzeCompany,
  initialKeyword = '',
}) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedMajor, setSelectedMajor] = useState<string>('전체');
  const [selectedExperience, setSelectedExperience] = useState<string>('전체');
  const [selectedRegion, setSelectedRegion] = useState<string>('전국');
  const [selectedEducation, setSelectedEducation] = useState<string>('전체');
  const [selectedPortal, setSelectedPortal] = useState<string>('all');

  const [jobs, setJobs] = useState<JobPosting[]>(() => [
    ...INITIAL_JOB_POSTINGS,
    ...generateMultiPortalPostings({ keyword: '' }),
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  useEffect(() => {
    if (initialKeyword) {
      setKeyword(initialKeyword);
    }
  }, [initialKeyword]);

  const fetchJobs = async (overrideKeyword?: string) => {
    const activeKeyword = overrideKeyword !== undefined ? overrideKeyword : keyword;
    setLoading(true);
    try {
      const res = await fetch('/api/jobs/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: activeKeyword,
          major: selectedMajor,
          experience: selectedExperience,
          region: selectedRegion,
          education: selectedEducation,
          portal: selectedPortal,
          userId: 'guest_user',
        }),
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.jobs) && data.jobs.length > 0) {
        setJobs(data.jobs);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn('Jobs search endpoint error, using client dataset filter:', err);
    }

    // High fidelity multi-portal client fallback
    const dynamicListings = generateMultiPortalPostings({
      keyword: activeKeyword,
      major: selectedMajor,
      experience: selectedExperience,
      region: selectedRegion,
      education: selectedEducation,
      portal: selectedPortal,
    });

    let baseFiltered = [...INITIAL_JOB_POSTINGS];
    if (activeKeyword && activeKeyword.trim()) {
      const q = activeKeyword.trim().toLowerCase();
      baseFiltered = baseFiltered.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q)) ||
          j.description.toLowerCase().includes(q)
      );
    }

    let combined = [...baseFiltered, ...dynamicListings];
    const seen = new Set<string>();
    let filtered = combined.filter((job) => {
      const key = `${job.company}_${job.title}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (selectedMajor !== '전체') {
      filtered = filtered.filter((j) => (j.major as any[]).includes(selectedMajor));
    }
    if (selectedExperience !== '전체') {
      filtered = filtered.filter((j) => j.experience === selectedExperience || j.experience === '신입·경력');
    }
    if (selectedRegion !== '전체' && selectedRegion !== '전국') {
      filtered = filtered.filter((j) => j.location.includes(selectedRegion));
    }
    if (selectedEducation !== '전체') {
      filtered = filtered.filter((j) => j.education.includes(selectedEducation));
    }
    if (selectedPortal !== 'all') {
      filtered = filtered.filter((j) => j.source.includes(selectedPortal) || j.category.includes(selectedPortal));
    }

    setJobs(filtered);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [selectedMajor, selectedExperience, selectedRegion, selectedEducation, selectedPortal]);

  useEffect(() => {
    if (initialKeyword) {
      setKeyword(initialKeyword);
      fetchJobs(initialKeyword);
    }
  }, [initialKeyword]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(keyword);
  };

  const handleQuickKeywordClick = (k: string) => {
    setKeyword(k);
    fetchJobs(k);
  };

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedMajor('전체');
    setSelectedExperience('전체');
    setSelectedRegion('전국');
    setSelectedEducation('전체');
    setSelectedPortal('all');
    fetchJobs('');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-semibold text-blue-600 tracking-wider uppercase mb-1">
            Verified Engineering Recruitment
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            공학 채용정보 통합 검색
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            외부 공식 채용 포털의 공학·R&D 실시간 공고를 전공 및 직무 조건에 맞춰 검색합니다.
          </p>
        </div>

        {/* Tabular summary */}
        <div className="flex items-center gap-3 text-xs text-slate-500 tabular-nums">
          <span>검색된 공고 <strong>{jobs.length}</strong>건</span>
          <span aria-hidden="true">·</span>
          <span>원문 링크 직접 연동</span>
        </div>
      </div>

      {/* Multi-portal Integrated Search Banner & Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm mb-8 space-y-4">
        {/* Portal selection tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar border-b border-slate-100 pb-3">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1 mr-1">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            포털 연동:
          </span>
          {JOB_PORTALS.map((portal) => {
            const isActive = selectedPortal === (portal.id === 'all' ? 'all' : portal.name);
            return (
              <button
                key={portal.id}
                type="button"
                onClick={() => setSelectedPortal(portal.id === 'all' ? 'all' : portal.name)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {portal.name}
              </button>
            );
          })}
        </div>

        {/* Search Input Row */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="기업명(현대, 삼성, 두산, LG, 한화), 공학 기술(원자력, 배터리, FEA, CATIA, HBM), 직무명"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            통합 검색
          </button>
        </form>

        {/* Quick Engineering Search Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
          <span className="text-slate-400 font-medium mr-1">인기 공학 테마:</span>
          {[
            { label: '원자력·플랜트', query: '원자력' },
            { label: '2차전지 배터리', query: '배터리' },
            { label: '차세대 반도체 HBM', query: '반도체' },
            { label: '임베디드 제어 SW', query: '임베디드' },
            { label: '공정기술 & 품질', query: '공정기술' },
            { label: '로보틱스 & 메카', query: '로봇' },
            { label: '화학공학 & 신소재', query: '화학' },
            { label: '항공우주 & 방산', query: '항공우주' },
          ].map((theme) => (
            <button
              key={theme.label}
              type="button"
              onClick={() => handleQuickKeywordClick(theme.query)}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors cursor-pointer border border-slate-200/60"
            >
              {theme.label}
            </button>
          ))}
        </div>

        {/* Structured Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          {/* Major Select */}
          <div>
            <label className="block text-slate-600 font-medium mb-1">공학 전공</label>
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="전체">모든 공학 전공</option>
              {ENGINEERING_MAJORS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Select */}
          <div>
            <label className="block text-slate-600 font-medium mb-1">경력 구분</label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              {EXPERIENCE_LEVELS.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </div>

          {/* Region Select */}
          <div>
            <label className="block text-slate-600 font-medium mb-1">근무 지역</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Education Select */}
          <div>
            <label className="block text-slate-600 font-medium mb-1">학력 조건</label>
            <select
              value={selectedEducation}
              onChange={(e) => setSelectedEducation(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="전체">학력 무관 / 전체</option>
              <option value="학사">학사 이상</option>
              <option value="석사">석사 이상</option>
            </select>
          </div>
        </div>

        {/* Filter tags & Reset */}
        {(keyword || selectedMajor !== '전체' || selectedExperience !== '전체' || selectedRegion !== '전국' || selectedPortal !== 'all') && (
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span>적용 필터:</span>
              {selectedPortal !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-medium">{selectedPortal}</span>
              )}
              {keyword && <span className="font-semibold text-blue-600">"{keyword}"</span>}
              {selectedMajor !== '전체' && <span className="font-medium text-slate-900">{selectedMajor}</span>}
              {selectedExperience !== '전체' && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-slate-900">{selectedExperience}</span>
                </>
              )}
              {selectedRegion !== '전국' && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-slate-900">{selectedRegion}</span>
                </>
              )}
            </div>
            <button
              onClick={handleResetFilters}
              className="text-slate-500 hover:text-slate-800 underline cursor-pointer"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-44 bg-slate-100 animate-pulse rounded-xl" />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && jobs.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800 mb-1">검색 조건에 맞는 공학 채용공고가 없습니다</h3>
          <p className="text-xs text-slate-500 mb-4 max-w-md mx-auto">
            조건을 완화하거나 다른 기술 키워드로 검색해 보세요.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium cursor-pointer"
          >
            검색 조건 초기화
          </button>
        </div>
      )}

      {/* Jobs Grid */}
      {!loading && jobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => {
            const isSaved = savedJobIds.has(job.id);
            const getPortalBadge = (src: string) => {
              if (src.includes('사람인')) {
                return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">사람인</span>;
              }
              if (src.includes('원티드')) {
                return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">원티드</span>;
              }
              if (src.includes('잡코리아')) {
                return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">잡코리아</span>;
              }
              if (src.includes('링크드인')) {
                return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-700 text-white border border-emerald-800">LinkedIn</span>;
              }
              if (src.includes('인크루트')) {
                return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">인크루트</span>;
              }
              return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300">기업공식</span>;
            };

            return (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all p-5 flex flex-col justify-between group shadow-xs"
              >
                <div>
                  {/* Company & Origin Source row with Portal badge */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-2">
                      {getPortalBadge(job.source)}
                      <span className="font-semibold text-slate-900">{job.company}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-600">{job.category}</span>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      type="button"
                      onClick={() => onToggleSaveJob(job)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isSaved
                          ? 'border-blue-500 text-blue-600 bg-blue-50'
                          : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                      }`}
                      title={isSaved ? '관심 공고 해제' : '관심 공고 저장'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Job Title */}
                  <h3
                    onClick={() => setSelectedJob(job)}
                    className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer mb-2 line-clamp-1"
                  >
                    {job.title}
                  </h3>

                  {/* Qualifications row */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      {job.experience}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      {job.education}
                    </span>
                  </div>

                  {/* Target Majors unboxed list */}
                  <div className="text-xs text-slate-500 mb-3">
                    <span className="text-slate-400 font-medium">대상 전공: </span>
                    {job.major.join(', ')}
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: AI Analyze Shortcut & Official External Link */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <button
                    type="button"
                    onClick={() => onAnalyzeCompany(job.company, job.title)}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    <span>기업·직무 3단계 AI 분석</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(job)}
                      className="px-2.5 py-1 text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                    >
                      상세보기
                    </button>
                    <a
                      href={job.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <span>공고 원문 바로가기</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-xs text-slate-500 font-medium mb-1">
                  {selectedJob.company} · {selectedJob.category}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{selectedJob.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-slate-100 text-xs mb-6 tabular-nums">
              <div>
                <span className="text-slate-400 block mb-0.5">근무지역</span>
                <span className="font-semibold text-slate-800">{selectedJob.location}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">경력구분</span>
                <span className="font-semibold text-slate-800">{selectedJob.experience}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">학력</span>
                <span className="font-semibold text-slate-800">{selectedJob.education}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">마감일</span>
                <span className="font-semibold text-slate-800">{selectedJob.deadline}</span>
              </div>
            </div>

            <div className="space-y-5 text-sm text-slate-700 mb-8">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">직무 주요 개요</h4>
                <p className="leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs sm:text-sm">
                  {selectedJob.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">우대 및 필수 공학 전공</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.major.map((m) => (
                    <span key={m} className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">필요 기술 및 엔지니어링 툴</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJob.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 font-mono rounded bg-slate-100 text-slate-800 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-900">
                <p className="font-semibold mb-0.5">외부 공식 포털 제공 원칙 안내</p>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  ENGINEER JOB은 외부 채용정보 전문을 무단 복제하지 않으며, 구직자의 안전하고 정확한 지원을 위해 공식 기업 채용 페이지로 직접 이동하도록 제공합니다.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  onAnalyzeCompany(selectedJob.company, selectedJob.title);
                  setSelectedJob(null);
                }}
                className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>이 기업·직무 3단계 AI 분석 열기</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleSaveJob(selectedJob)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Bookmark className={`w-4 h-4 ${savedJobIds.has(selectedJob.id) ? 'fill-blue-600 text-blue-600' : ''}`} />
                  <span>{savedJobIds.has(selectedJob.id) ? '관심 공고 저장됨' : '관심 공고 저장'}</span>
                </button>

                <a
                  href={selectedJob.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>공식 채용사이트 지원</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
