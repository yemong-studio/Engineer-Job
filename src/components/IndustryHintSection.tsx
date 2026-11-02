import React, { useState } from 'react';
import { Search, Globe, Newspaper, Bookmark, ExternalLink, Sparkles, BookOpen, ChevronDown, ChevronUp, RefreshCw, Layers } from 'lucide-react';
import { IndustryNewsItem, IndustryHintResult } from '../types';
import { POPULAR_INDUSTRIES, FEATURE_HINT_IMAGE } from '../lib/constants';

interface IndustryHintSectionProps {
  onSaveNews: (item: IndustryNewsItem) => void;
  savedNewsIds: Set<string>;
  onAnalyzeCompany: (company: string, role?: string) => void;
}

export const IndustryHintSection: React.FC<IndustryHintSectionProps> = ({
  onSaveNews,
  savedNewsIds,
  onAnalyzeCompany,
}) => {
  const [query, setQuery] = useState('차세대 반도체 공정');
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<'fetching' | 'analyzing'>('fetching');
  const [result, setResult] = useState<IndustryHintResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [expandedGlossaryId, setExpandedGlossaryId] = useState<string | null>(null);

  const handleSearch = async (targetQuery?: string) => {
    const q = (targetQuery || query).trim();
    if (!q) return;

    setLoading(true);
    setLoadingStage('fetching');
    setErrorMsg(null);

    const stageTimer = setTimeout(() => {
      setLoadingStage('analyzing');
    }, 1200);

    const controller = new AbortController();
    const abortTimeout = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch('/api/news/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
        signal: controller.signal,
      });
      clearTimeout(stageTimer);
      clearTimeout(abortTimeout);

      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
      } else {
        setErrorMsg(data.message || '뉴스 검색 및 AI 요약 중 오류가 발생했습니다.');
      }
    } catch (err: any) {
      clearTimeout(stageTimer);
      clearTimeout(abortTimeout);
      console.error(err);
      if (err.name === 'AbortError') {
        setErrorMsg('네트워크 응답 시간이 초과되었습니다. 다시 한 번 시도해 주세요.');
      } else {
        setErrorMsg('서버리스 엔드포인트 통신 실패: 잠시 후 다시 시도해 주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRelatedKeywordClick = (keyword: string) => {
    setQuery(keyword);
    handleSearch(keyword);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Visual Header Strip with FEATURE_HINT_IMAGE */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white mb-8">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-40">
          <img
            src={FEATURE_HINT_IMAGE}
            alt="Industry Intelligence"
            className="w-full h-full object-cover object-left"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-400 uppercase mb-2">
            <span>AI Industrial Intelligence</span>
            <span aria-hidden="true">·</span>
            <span>On-Demand Realtime Synthesis</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Industry HINT — AI 산업 뉴스 검색 및 요약
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            사용자가 검색할 때만 <strong>국내 언론사 2개 + 해외 기술 매체 1개</strong>의 실시간 기사를 분석합니다. 
            Gemini AI 3줄 요약, 핵심 키워드 5개, 전문용어 해설 및 관련 기사 이어보기를 지원합니다.
          </p>

          {/* Search Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row items-stretch gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="산업명(반도체, 자율주행, 2차전지, 로봇) 또는 기업명(현대차, 한화)"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>
                    {loadingStage === 'fetching'
                      ? '1단계: 뉴스 수집 중...'
                      : '2단계: Gemini AI 3줄 요약 중...'}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>HINT 분석 시작</span>
                </>
              )}
            </button>
          </form>

          {/* Preset Industry Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-4 text-xs">
            <span className="text-slate-400 font-medium mr-1">추천 공학 테마:</span>
            {POPULAR_INDUSTRIES.map((ind) => (
              <button
                key={ind.label}
                type="button"
                onClick={() => {
                  setQuery(ind.label);
                  handleSearch(ind.label);
                }}
                className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
              >
                {ind.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Feedback */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs mb-6">
          {errorMsg}
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4">
          <div className="h-6 w-48 bg-slate-200 animate-pulse rounded mb-4" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-white border border-slate-200 rounded-2xl p-6 animate-pulse space-y-4">
                <div className="h-4 w-24 bg-slate-100 rounded" />
                <div className="h-6 w-full bg-slate-100 rounded" />
                <div className="h-20 bg-slate-50 rounded" />
                <div className="h-16 bg-slate-50 rounded" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results View */}
      {!loading && result && (
        <div>
          {/* Metadata & Composition Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">검색어: &ldquo;{result.query}&rdquo;</span>
              <span aria-hidden="true">·</span>
              <span>국내 기사 {result.domesticCount}건</span>
              <span aria-hidden="true">·</span>
              <span>해외 기사 {result.overseasCount}건</span>
              <span aria-hidden="true">·</span>
              <span>총 {result.news.length}건 선별 완료</span>
            </div>

            <div className="text-slate-400">
              분석 기준시각: {new Date(result.analyzedAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          {/* Domestic & Global Trend Comparison Card */}
          {result.trendComparison && (
            <div className="bg-gradient-to-r from-indigo-50/70 via-blue-50/50 to-white rounded-xl border border-indigo-100 p-5 mb-8">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 mb-2">
                <Globe className="w-4 h-4 text-indigo-600" />
                <span>국내외 산업 트렌드 비교 & 공학 취준생 인사이트</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white/80 p-3.5 rounded-lg border border-indigo-100/60">
                  <span className="font-semibold text-indigo-950 block mb-1">국내 산업 현주소</span>
                  <p className="text-slate-600 leading-relaxed">{result.trendComparison.domesticTrend}</p>
                </div>

                <div className="bg-white/80 p-3.5 rounded-lg border border-indigo-100/60">
                  <span className="font-semibold text-indigo-950 block mb-1">글로벌 기술 격차 및 동향</span>
                  <p className="text-slate-600 leading-relaxed">{result.trendComparison.globalTrend}</p>
                </div>

                <div className="bg-white/80 p-3.5 rounded-lg border border-indigo-100/60">
                  <span className="font-semibold text-indigo-950 block mb-1">자소서 & 면접 활용 포인트</span>
                  <p className="text-slate-600 leading-relaxed">{result.trendComparison.implicationForJobSeekers}</p>
                </div>
              </div>
            </div>
          )}

          {/* 3 News Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {result.news.map((item) => {
              const isSaved = savedNewsIds.has(item.id);
              const isGlossaryOpen = expandedGlossaryId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all p-5 sm:p-6 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    {/* Unboxed Metadata row (Section 1.A zero-pill rule) */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${item.origin === '국내' ? 'text-blue-600' : 'text-emerald-600'}`}>
                          {item.origin}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-slate-800">{item.source}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{item.publishedAt}</span>
                      </div>

                      {/* Bookmark News */}
                      <button
                        type="button"
                        onClick={() => onSaveNews(item)}
                        className={`p-1 rounded-md transition-colors cursor-pointer ${
                          isSaved ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-700'
                        }`}
                        title={isSaved ? '스크랩 취소' : '뉴스 스크랩'}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Auto Industry Category unboxed text */}
                    <div className="text-[11px] font-medium text-slate-500 mb-1.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-slate-400" />
                      <span>분류: {item.industryCategory}</span>
                    </div>

                    {/* News Title */}
                    <h3 className="text-base font-bold text-slate-900 leading-snug mb-4 hover:text-indigo-600 transition-colors">
                      <a href={item.originalUrl} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </h3>

                    {/* Gemini AI 3-Line Summary */}
                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 mb-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Gemini AI 3줄 핵심 요약</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {item.threeLineSummary?.map((line, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                            <span className="text-indigo-600 font-bold shrink-0">{idx + 1}.</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 5 Core Keywords unboxed list with 1-click continuation */}
                    <div className="mb-4">
                      <div className="text-xs text-slate-500 font-medium mb-1.5">핵심 공학 키워드 5선:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.keywords?.map((kw) => (
                          <button
                            key={kw}
                            type="button"
                            onClick={() => handleRelatedKeywordClick(kw)}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors cursor-pointer flex items-center gap-1"
                            title={`"${kw}" 관련 기사 이어보기`}
                          >
                            <span>#{kw}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Engineering Insight Note */}
                    {item.engineeringInsight && (
                      <div className="text-xs text-slate-600 bg-blue-50/60 p-2.5 rounded-lg border border-blue-100 mb-4 leading-relaxed">
                        <strong className="text-blue-900 block mb-0.5">엔지니어 시각:</strong>
                        {item.engineeringInsight}
                      </div>
                    )}

                    {/* Technical Glossary Accordion */}
                    {item.glossary && item.glossary.length > 0 && (
                      <div className="border-t border-slate-100 pt-3 mb-4">
                        <button
                          type="button"
                          onClick={() => setExpandedGlossaryId(isGlossaryOpen ? null : item.id)}
                          className="flex items-center justify-between w-full text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                            <span>어려운 전문용어 해설 ({item.glossary.length}개)</span>
                          </div>
                          {isGlossaryOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </button>

                        {isGlossaryOpen && (
                          <div className="mt-2.5 space-y-2 bg-amber-50/60 p-3 rounded-lg border border-amber-200/50 text-xs text-amber-950">
                            {item.glossary.map((g, gIdx) => (
                              <div key={gIdx} className="border-b border-amber-200/40 last:border-none pb-1.5 last:pb-0">
                                <span className="font-bold text-amber-900">{g.term}: </span>
                                <span className="text-amber-800 leading-relaxed">{g.explanation}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom: Original Article Direct Link */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">저작권 준수 요약</span>
                    <a
                      href={item.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-700 hover:text-indigo-600 font-semibold transition-colors"
                    >
                      <span>원문 기사 바로가기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Related News Explore (관련 기사 이어보기 Section) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              관련 기사 이어보기 (Deep-dive Exploration)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              위 기사에서 추출된 기업명·기술 키워드를 클릭하여 실시간 연관 뉴스를 끊김 없이 심층 탐색하세요.
            </p>

            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(result.news.flatMap((n) => n.keywords || []))).map((kw) => (
                <button
                  key={kw}
                  onClick={() => handleRelatedKeywordClick(kw)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-3 h-3 text-slate-400" />
                  <span>{kw} 뉴스 더보기</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Initial state guide if no search performed yet */}
      {!loading && !result && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            원하는 산업 또는 관심 기업을 검색해 보세요
          </h3>
          <p className="text-xs text-slate-500 mb-5 max-w-md mx-auto">
            국내외 공개 뉴스에서 허용된 정보만을 바탕으로 Gemini AI가 3줄 요약과 핵심 전문용어를 정리해 드립니다.
          </p>
          <button
            onClick={() => handleSearch('차세대 반도체 공정')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
          >
            예시: &ldquo;차세대 반도체 공정&rdquo; 분석 결과 보기
          </button>
        </div>
      )}
    </section>
  );
};
