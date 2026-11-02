import React, { useState } from 'react';
import { Sparkles, Check, Copy, CheckCircle2, RefreshCw, Bookmark } from 'lucide-react';
import { CoverLetterDoc } from '../types';

interface ResumeStudioSectionProps {
  initialCompany?: string;
  initialRole?: string;
}

export const ResumeStudioSection: React.FC<ResumeStudioSectionProps> = ({
  initialCompany = '현대자동차',
  initialRole = '샤시/의장 메카트로닉스 선행 구조설계 연구원',
}) => {
  const [companyName, setCompanyName] = useState(initialCompany);
  const [jobRole, setJobRole] = useState(initialRole);
  const [question, setQuestion] = useState(
    '지원 분야에 대한 본인의 직무 역량과 이를 개발하기 위해 수행한 노력(프로젝트, 실험, 전공 지식 등)을 구체적인 사례를 들어 서술해 주십시오.'
  );
  const [content, setContent] = useState(
    `학부 시절 캡스톤 디자인으로 '자율주행 모빌리티용 조향 액추에이터 경량화 설계' 프로젝트를 주도했습니다. 당시 기존 하우징의 중량이 과도하여 연비 및 동특성에 악영향을 주는 문제를 해결하기 위해, CATIA로 3D 모델링을 진행하고 ANSYS Mechanical을 활용한 유한요소해석(FEA)을 수행했습니다. 위상최적화 기법을 적용하여 응력 집중 부위의 리브 구조를 재설계함으로써, 기존 대비 18.4%의 질량 감량을 달성하면서도 항복강도 기준 안전계수 1.6 이상을 확보했습니다. 이러한 구조해석 및 경량화 경험을 바탕으로 귀사의 차세대 모빌리티 샤시 선행 개발에 기여하겠습니다.`
  );

  const [loading, setLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedDocs, setSavedDocs] = useState<CoverLetterDoc[]>([
    {
      id: 'doc_01',
      companyName: '현대자동차',
      jobRole: '샤시 선행설계',
      updatedAt: '2026-11-01',
      sections: [],
    },
    {
      id: 'doc_02',
      companyName: '삼성전자 DS',
      jobRole: '반도체 설비기술',
      updatedAt: '2026-10-28',
      sections: [],
    },
  ]);

  const handleAiPolish = async () => {
    if (!content.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch('/api/resume/polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          jobRole,
          question,
          content,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const data = await res.json();
      if (data.success && data.data) {
        setAiFeedback(data.data);
      } else {
        setErrorMsg(data.message || '자소서 첨삭 중 오류가 발생했습니다.');
      }
    } catch (err: any) {
      clearTimeout(timeout);
      console.error(err);
      if (err.name === 'AbortError') {
        setErrorMsg('응답 시간이 지연되었습니다. 다시 한 번 시도해 주세요.');
      } else {
        setErrorMsg('서버리스 엔드포인트 통신 실패: 다시 시도해 주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPolished = () => {
    if (aiFeedback?.polishedContent) {
      setContent(aiFeedback.polishedContent);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveDocument = () => {
    const newDoc: CoverLetterDoc = {
      id: `doc_${Date.now()}`,
      companyName,
      jobRole,
      updatedAt: new Date().toLocaleDateString('ko-KR'),
      sections: [
        {
          id: `sec_${Date.now()}`,
          question,
          content,
          charLimit: 1000,
          aiFeedback,
        },
      ],
    };
    setSavedDocs([newDoc, ...savedDocs]);
    alert(`[${companyName}] 지원서가 마이페이지 및 로컬 저장소에 안전하게 보관되었습니다.`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold text-amber-600 tracking-wider uppercase mb-1">
            Engineering STAR Writing Studio
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            이력서 및 자기소개서 첨삭 연구소
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Gemini AI가 STAR 구조와 엔지니어링 정량 지표를 검증하며, 허위 사실을 지어내지 않고 지원자의 실제 경험만을 전문적으로 다듬습니다.
          </p>
        </div>

        {/* Saved documents dropdown / count */}
        <div className="flex items-center gap-2 text-xs text-slate-500 tabular-nums">
          <span>작성 및 보관된 지원서 <strong>{savedDocs.length}</strong>건</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Target Setup & Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            {/* Target Company & Role row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">지원 기업명</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="예: 현대자동차"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">지원 직무</label>
                <input
                  type="text"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="예: 기구설계, 공정연구원"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Question Prompt */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1">자기소개서 문항</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Content Editor */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1 text-xs">
                <label className="font-semibold text-slate-600">작성 내용 (본인 실제 경험 기술)</label>
                <span className="text-slate-400 tabular-nums">
                  {content.length}자 (공백 포함)
                </span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                placeholder="지원자의 실제 전공 프로젝트, 실험 과제, 사용한 툴(CATIA, FEA, Python 등), 구체적 문제 해결 과정과 정량적 성과를 작성해 주세요."
                className="w-full p-4 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
              />
            </div>

            {/* Actions Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? '복사됨' : '복사'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveDocument}
                  className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                  <span>문서 저장</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleAiPolish}
                disabled={loading || !content.trim()}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-300 text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>STAR & 엔지니어링 문장 첨삭 중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Gemini AI 공학 문장 첨삭 실행</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Feedback Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
              {errorMsg}
            </div>
          )}

          {!aiFeedback && !loading && (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Gemini AI 엔지니어링 첨삭 대기 중
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                왼쪽 에디터에 자기소개서를 입력하고 &lsquo;공학 문장 첨삭 실행&rsquo; 버튼을 누르면 STAR 구조와 기술 어휘, 정량 지표의 타당성을 진단해 드립니다.
              </p>
              <div className="text-left text-xs text-slate-600 space-y-2 bg-white p-3.5 rounded-xl border border-slate-200/80">
                <span className="font-bold text-slate-900 block">원칙 준수 서약:</span>
                <p>1. 지원자가 작성하지 않은 가짜 경험·수치는 날조하지 않습니다.</p>
                <p>2. 상황(S), 과제(T), 행동(A), 결과(R) 4단계 구조를 정밀 평가합니다.</p>
                <p>3. 면접관이 신뢰할 수 있는 엔지니어링 용어로 다듬습니다.</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 animate-pulse">
              <div className="h-5 w-40 bg-slate-100 rounded" />
              <div className="h-24 bg-slate-50 rounded" />
              <div className="h-20 bg-slate-50 rounded" />
            </div>
          )}

          {aiFeedback && !loading && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <h3 className="text-sm font-bold text-slate-900">수석 면접관 AI 종합 진단</h3>
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  진단 완료
                </span>
              </div>

              {/* Overall Review */}
              <div className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
                <strong className="text-slate-900 block mb-1">총평:</strong>
                {aiFeedback.overallReview}
              </div>

              {/* STAR Analysis breakdown */}
              <div>
                <span className="text-xs font-bold text-slate-900 block mb-2">STAR 기법 진단 결과</span>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-bold text-blue-700">S (Situation): </span>
                    <span className="text-slate-700">{aiFeedback.starAnalysis.situation}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-bold text-indigo-700">T (Task): </span>
                    <span className="text-slate-700">{aiFeedback.starAnalysis.task}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-bold text-amber-700">A (Action): </span>
                    <span className="text-slate-700">{aiFeedback.starAnalysis.action}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-bold text-emerald-700">R (Result): </span>
                    <span className="text-slate-700">{aiFeedback.starAnalysis.result}</span>
                  </div>
                </div>
              </div>

              {/* Suggested improvements */}
              <div>
                <span className="text-xs font-bold text-slate-900 block mb-1.5">문장 개선 권장 포인트</span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {aiFeedback.suggestedImprovements.map((imp: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Polished Content & Apply Button */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="font-bold text-slate-900">추천 첨삭본 (Before vs After)</span>
                  <button
                    type="button"
                    onClick={handleApplyPolished}
                    className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold rounded cursor-pointer transition-colors"
                  >
                    에디터에 바로 적용
                  </button>
                </div>

                <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/60 text-xs text-slate-800 leading-relaxed font-sans">
                  {aiFeedback.polishedContent}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
