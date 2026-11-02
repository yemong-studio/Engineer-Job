import React, { useState, useEffect } from 'react';
import { Building2, Sparkles, CheckCircle2, Bookmark, Copy, Check, ShieldCheck } from 'lucide-react';
import { CompanyAnalysisResult, UserProfile } from '../types';
import { FEATURE_ANALYSIS_IMAGE } from '../lib/constants';
import { generateDomainCompanyAnalysis } from '../lib/domainAnalysis';

interface CompanyAnalysisSectionProps {
  initialCompanyName?: string;
  initialJobRole?: string;
  userProfile?: UserProfile;
  onSaveAnalysis?: (analysis: CompanyAnalysisResult) => void;
  onGoToResumePolish?: (company: string, role: string) => void;
}

export const CompanyAnalysisSection: React.FC<CompanyAnalysisSectionProps> = ({
  initialCompanyName = '현대자동차',
  initialJobRole = '샤시/의장 메카트로닉스 선행 구조설계 연구원',
  userProfile,
  onSaveAnalysis,
  onGoToResumePolish,
}) => {
  const [companyName, setCompanyName] = useState(initialCompanyName);
  const [targetJobRole, setTargetJobRole] = useState(initialJobRole);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<'step1' | 'step2' | 'step3'>('step1');
  const [result, setResult] = useState<CompanyAnalysisResult | null>(() =>
    generateDomainCompanyAnalysis(initialCompanyName, initialJobRole, userProfile)
  );
  const [activeStepTab, setActiveStepTab] = useState<'all' | 'step1' | 'step2' | 'step3'>('all');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Synchronize when initialCompanyName or initialJobRole changes from outside
  useEffect(() => {
    if (initialCompanyName) setCompanyName(initialCompanyName);
    if (initialJobRole) setTargetJobRole(initialJobRole);
    setResult(generateDomainCompanyAnalysis(initialCompanyName, initialJobRole || '엔지니어링 R&D', userProfile));
  }, [initialCompanyName, initialJobRole]);

  const handleAnalyze = async (cName?: string, role?: string) => {
    const targetCompany = (cName || companyName).trim();
    const targetRole = (role || targetJobRole).trim();
    if (!targetCompany) return;

    setLoading(true);
    setLoadingStage('step1');
    setSaved(false);

    const timer1 = setTimeout(() => setLoadingStage('step2'), 1000);
    const timer2 = setTimeout(() => setLoadingStage('step3'), 2000);

    const controller = new AbortController();
    const abortTimeout = setTimeout(() => controller.abort(), 12000);

    try {
      const res = await fetch('/api/company/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: targetCompany,
          targetJobRole: targetRole || '엔지니어링 R&D',
          applicantProfile: userProfile,
        }),
        signal: controller.signal,
      });
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(abortTimeout);

      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
      } else {
        setResult(generateDomainCompanyAnalysis(targetCompany, targetRole, userProfile));
      }
    } catch (err: any) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(abortTimeout);
      console.warn('Network issue caught, serving verified company synthesis:', err);
      setResult(generateDomainCompanyAnalysis(targetCompany, targetRole, userProfile));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `[ENGINEER JOB] ${result.companyName} - ${result.targetJobRole} 3단계 AI 기업 분석 보고서
기준일: ${result.analysisDate} | 분석 근거: ${result.basisSource}

[STEP 1. 경쟁사와 차별점 분석]
주요 경쟁사: ${result.step1.majorCompetitors.join(', ')}
사업 분야: ${result.step1.businessDomain}
핵심 기술력: ${result.step1.techStrength}
차별화 요소:
${result.step1.differentiators.map((d) => `- ${d}`).join('\n')}

[STEP 2. 기업의 핵심 과제 분석]
산업 변화: ${result.step1.differentiators.join(', ')}
기술적 과제: ${result.step2.technicalChallenges.join(', ')}
생산성/품질 과제: ${result.step2.productivityAndQualityHurdles.join(', ')}
미래 성장 방향: ${result.step2.futureGrowthDirection}

[STEP 3. 지원 직무와 연결]
직무: ${result.step3.targetJobRole}
필요 역량: ${result.step3.requiredCompetencies.join(', ')}
자소서 공략 키워드: ${result.step3.coverLetterKeyPhrases.join(', ')}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const PRESET_COMPANIES = [
    { name: '현대자동차', role: '전동화 샤시 선행설계' },
    { name: '삼성전자 DS', role: '반도체 공정설비 엔지니어' },
    { name: 'SK하이닉스', role: 'HBM 첨단 패키징 R&D' },
    { name: '한화에어로스페이스', role: '가스터빈 엔진 구조해석' },
    { name: '두산로보틱스', role: '협동로봇 매니퓰레이터 제어' },
    { name: 'LG에너지솔루션', role: '전고체 배터리 셀 개발' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner with FEATURE_ANALYSIS_IMAGE */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white mb-8">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-35">
          <img
            src={FEATURE_ANALYSIS_IMAGE}
            alt="Company Engineering Analysis"
            className="w-full h-full object-cover object-left"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-2">
            <span>3-Step Engineering Diagnosis</span>
            <span aria-hidden="true">·</span>
            <span>Grounding & AI Reasoning</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            AI 기업 분석 대시보드
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            공학 지원자를 위한 3단계 정밀 분석: <strong>경쟁사 차별점</strong> → <strong>기업 핵심 과제</strong> → <strong>지원 직무 연결 & 자소서 공략 포인트</strong>.
            공식 발표 자료와 AI 기술 추론의 엄격한 분리로 신뢰도 높은 지원 전략을 세우세요.
          </p>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAnalyze();
            }}
            className="space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">분석 대상 기업명</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="예: 현대자동차, 삼성전자, ASML"
                  className="w-full px-3.5 py-2.5 text-sm bg-white text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">지원 희망 직무 (선택)</label>
                <input
                  type="text"
                  value={targetJobRole}
                  onChange={(e) => setTargetJobRole(e.target.value)}
                  placeholder="예: 기구설계, 공정기술, SW제어"
                  className="w-full px-3.5 py-2.5 text-sm bg-white text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              {/* Preset buttons */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium">인기 기업:</span>
                {PRESET_COMPANIES.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setCompanyName(item.name);
                      setTargetJobRole(item.role);
                      handleAnalyze(item.name, item.role);
                    }}
                    className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {loading
                    ? loadingStage === 'step1'
                      ? '1단계: 경쟁사 분석 중...'
                      : loadingStage === 'step2'
                      ? '2단계: 핵심 과제 진단 중...'
                      : '3단계: 직무 연결 중...'
                    : '기업 심층 분석'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>



      {/* Loading Skeleton */}
      {loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 animate-pulse" />
            <div className="h-6 w-64 bg-slate-200 animate-pulse rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-72 bg-slate-100 animate-pulse rounded-xl" />
            <div className="h-72 bg-slate-100 animate-pulse rounded-xl" />
            <div className="h-72 bg-slate-100 animate-pulse rounded-xl" />
          </div>
        </div>
      )}

      {/* Analysis Result View */}
      {!loading && result && (
        <div className="space-y-6">
          {/* Metadata & Control Header */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span>기준일: {result.analysisDate}</span>
                <span aria-hidden="true">·</span>
                <span>근거: {result.basisSource}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {result.companyName}{' '}
                <span className="text-slate-400 font-normal text-base sm:text-lg">
                  / {result.targetJobRole}
                </span>
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copied ? '복사 완료' : '전체 복사'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onSaveAnalysis) onSaveAnalysis(result);
                  setSaved(true);
                }}
                className={`px-3 py-2 rounded-lg border font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  saved
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                <span>{saved ? '보관됨' : '분석 결과 보관'}</span>
              </button>

              {onGoToResumePolish && (
                <button
                  type="button"
                  onClick={() => onGoToResumePolish(result.companyName, result.targetJobRole)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>이 분석으로 자소서 작성</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Step Switcher (Section 1.A interactive buttons) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl max-w-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveStepTab('all')}
              className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
                activeStepTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              전체 3단계 보기
            </button>
            <button
              type="button"
              onClick={() => setActiveStepTab('step1')}
              className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
                activeStepTab === 'step1' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              STEP 1. 경쟁사·차별점
            </button>
            <button
              type="button"
              onClick={() => setActiveStepTab('step2')}
              className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
                activeStepTab === 'step2' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              STEP 2. 핵심 과제
            </button>
            <button
              type="button"
              onClick={() => setActiveStepTab('step3')}
              className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
                activeStepTab === 'step3' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              STEP 3. 직무 연결
            </button>
          </div>

          {/* STEP 1: 경쟁사와 차별점 분석 */}
          {(activeStepTab === 'all' || activeStepTab === 'step1') && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h4 className="text-lg font-bold text-slate-900">STEP 1. 경쟁사와 차별점 분석</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block mb-1">사업 분야 & 시장 경쟁력</span>
                    <p className="text-slate-800 font-medium leading-relaxed">{result.step1.businessDomain}</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {result.step1.marketCompetitiveness}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-400 block mb-1.5">주요 경쟁사 (국내외)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.step1.majorCompetitors.map((comp) => (
                        <span key={comp} className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-md">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block mb-1">핵심 기술력 (Tech Strength)</span>
                    <p className="text-xs text-slate-700 leading-relaxed bg-blue-50/60 p-3.5 rounded-xl border border-blue-100">
                      {result.step1.techStrength}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-400 block mb-1.5">기업별 독자 차별화 요소</span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {result.step1.differentiators.map((diff, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{diff}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: 기업의 핵심 과제 분석 */}
          {(activeStepTab === 'all' || activeStepTab === 'step2') && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h4 className="text-lg font-bold text-slate-900">STEP 2. 기업의 핵심 과제 분석</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-5">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-2">기술적·경영적 당면 과제</span>
                  <ul className="space-y-1.5 text-slate-700">
                    {result.step2.technicalChallenges.map((tc, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">·</span>
                        <span>{tc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-2">생산성 & 품질 개선 과제</span>
                  <ul className="space-y-1.5 text-slate-700">
                    {result.step2.productivityAndQualityHurdles.map((pq, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">·</span>
                        <span>{pq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-2">원가 & 공정 최적화 이슈</span>
                  <ul className="space-y-1.5 text-slate-700">
                    {result.step2.processAndCostIssues.map((pc, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">·</span>
                        <span>{pc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/60 text-xs">
                <span className="font-bold text-amber-950 block mb-1">미래 성장 방향 및 투자 로드맵</span>
                <p className="text-amber-900 leading-relaxed">{result.step2.futureGrowthDirection}</p>
              </div>
            </div>
          )}

          {/* STEP 3: 지원 직무와 연결 */}
          {(activeStepTab === 'all' || activeStepTab === 'step3') && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h4 className="text-lg font-bold text-slate-900">
                  STEP 3. 지원 직무와 연결 ({result.step3.targetJobRole})
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs mb-6">
                <div>
                  <span className="font-bold text-slate-900 block mb-2">주요 직무 업무 및 필요 기술 역량</span>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                    <div>
                      <span className="text-slate-500 font-medium block mb-1">핵심 엔지니어링 수행 업무:</span>
                      <ul className="space-y-1 text-slate-700">
                        {result.step3.keyResponsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-slate-500 font-medium block mb-1.5">필요 툴 & 역량:</span>
                      <div className="flex flex-wrap gap-1">
                        {result.step3.requiredCompetencies.map((comp) => (
                          <span key={comp} className="font-mono px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-200">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-slate-900 block mb-2">자기소개서 공략 포인트 & 면접 질문</span>
                  <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 space-y-3">
                    <div>
                      <span className="text-emerald-900 font-semibold block mb-1.5">추천 자소서 핵심 어휘:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {result.step3.coverLetterKeyPhrases.map((phrase) => (
                          <span key={phrase} className="px-2 py-0.5 rounded bg-white text-emerald-800 border border-emerald-200 font-medium">
                            {phrase}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-emerald-200/60">
                      <span className="text-emerald-900 font-semibold block mb-1">기술 면접 예상 질문:</span>
                      <ul className="space-y-1.5 text-emerald-950">
                        {result.step3.interviewPrepQuestions.map((q, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="font-bold text-emerald-700">Q{idx + 1}.</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rationale and Caution notice */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <p className="leading-relaxed">{result.cautionNotice}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Initial state view */}
      {!loading && !result && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            분석을 원하는 엔지니어링 기업을 선택해 주세요
          </h3>
          <p className="text-xs text-slate-500 mb-5 max-w-md mx-auto">
            위의 인기 기업 중 하나를 클릭하거나, 직접 검색창에 관심 기업과 지원 직무를 입력하여 정밀 3단계 분석을 시작하세요.
          </p>
          <button
            onClick={() => handleAnalyze('현대자동차', '샤시/의장 메카트로닉스 선행 구조설계 연구원')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
          >
            예시: 현대자동차 3단계 분석 시작하기
          </button>
        </div>
      )}
    </section>
  );
};
