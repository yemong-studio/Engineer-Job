/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { JobsSection } from './components/JobsSection';
import { IndustryHintSection } from './components/IndustryHintSection';
import { CompanyAnalysisSection } from './components/CompanyAnalysisSection';
import { RecommendationSection } from './components/RecommendationSection';
import { ResumeStudioSection } from './components/ResumeStudioSection';
import { MyPageSection } from './components/MyPageSection';
import { JobPosting, IndustryNewsItem, CompanyAnalysisResult, UserProfile } from './types';
import { INITIAL_USER_PROFILE } from './lib/constants';

// Alternative profile for multi-user test
const PARK_PROFILE: UserProfile = {
  id: 'usr_eng_002',
  name: '박전자',
  email: 'electronics.park@univ.ac.kr',
  major: '전자·전기공학',
  degree: '학사 (졸업예정)',
  gpa: '4.02 / 4.5',
  techSkills: ['회로설계', 'PCB Layout', '신호처리', 'C/C++', 'Verilog HDL', 'FPGA'],
  engineeringTools: ['Altium Designer', 'PSpice', 'Vivado', 'MATLAB', 'Python'],
  projectExperience: [
    {
      title: '고속 ADC 인터페이스용 고신뢰성 다층 PCB 설계 및 노이즈 저감',
      duration: '2025.04 - 2025.11 (연구실 학부연구생)',
      role: '신호 무결성(SI) 시뮬레이션 및 전원 무결성(PI) 분석',
      techStack: 'Altium, HyperLynx, PSpice',
      description: '고주파 클록 라인 차동 임피던스 매칭 및 접지 플레인 분리 설계',
      metricOutcome: '클록 지터(Jitter) 24% 감소 및 SNR 68dB 달성',
    },
  ],
  preferredRoles: ['하드웨어 회로설계', '전력전자 엔지니어', '반도체 공정설계'],
  preferredRegions: ['경기·판교', '화성/평택', '서울'],
  targetCompanies: ['삼성전자 DS', 'SK하이닉스', 'LG이노텍', 'ASML 코리아'],
};

// Guest profile (unauthenticated / login-free mode)
const GUEST_PROFILE: UserProfile = {
  id: 'usr_guest',
  name: '게스트',
  email: 'guest@engineerjob.kr',
  major: '기계공학',
  degree: '학사 (졸업예정)',
  gpa: '3.80 / 4.5',
  techSkills: ['공학 기초', '데이터 분석', 'CAD/도면 해석', 'Python'],
  engineeringTools: ['3D CAD', 'MATLAB', 'Excel', '기초 시뮬레이션'],
  projectExperience: [
    {
      title: '공학 전공 캡스톤 디자인 및 종합 설계 프로젝트',
      duration: '2025.03 - 2025.11',
      role: '설계 및 데이터 분석 총괄',
      techStack: 'CAD, Python, 수치해석',
      description: '시스템 효율 최적화 및 정량적 성능 지표 개선 연구',
      metricOutcome: '초기 대비 효율 15% 개선 및 신뢰성 검증 완료',
    },
  ],
  preferredRoles: ['엔지니어링 R&D', '공정기술 / 생산기술', '품질관리'],
  preferredRegions: ['전국'],
  targetCompanies: ['현대자동차', '삼성전자', '두산에너빌리티', 'LG에너지솔루션', '한화에어로스페이스'],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('jobs');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // User session state
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);

  // User-isolated saved items
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set(['job_001', 'job_002']));
  const [savedJobs, setSavedJobs] = useState<JobPosting[]>([]);
  const [savedNews, setSavedNews] = useState<IndustryNewsItem[]>([]);
  const [savedAnalyses, setSavedAnalyses] = useState<CompanyAnalysisResult[]>([]);

  // Pre-fill target for company analysis or resume
  const [analysisTarget, setAnalysisTarget] = useState<{ company: string; role: string }>({
    company: '현대자동차',
    role: '샤시/의장 메카트로닉스 선행 구조설계 연구원',
  });

  const handleHeroSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setActiveTab('jobs');
  };

  const handleToggleSaveJob = (job: JobPosting) => {
    const nextSet = new Set(savedJobIds);
    if (nextSet.has(job.id)) {
      nextSet.delete(job.id);
      setSavedJobs(savedJobs.filter((j) => j.id !== job.id));
    } else {
      nextSet.add(job.id);
      setSavedJobs([job, ...savedJobs]);
    }
    setSavedJobIds(nextSet);

    // Call serverless endpoint
    fetch('/api/user/save-job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userProfile.id,
        jobId: job.id,
        save: nextSet.has(job.id),
      }),
    }).catch(console.error);
  };

  const handleSaveNews = (newsItem: IndustryNewsItem) => {
    if (!savedNews.some((n) => n.id === newsItem.id)) {
      setSavedNews([newsItem, ...savedNews]);
      fetch('/api/user/save-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userProfile.id, newsItem }),
      }).catch(console.error);
    }
  };

  const handleSaveAnalysis = (analysis: CompanyAnalysisResult) => {
    if (!savedAnalyses.some((a) => a.companyName === analysis.companyName)) {
      setSavedAnalyses([analysis, ...savedAnalyses]);
    }
  };

  const handleAnalyzeCompanyDirect = (company: string, role?: string) => {
    setAnalysisTarget({ company, role: role || '엔지니어링 R&D' });
    setActiveTab('company');
  };

  const handleGoToResumePolish = (company: string, role: string) => {
    setAnalysisTarget({ company, role });
    setActiveTab('resume');
  };

  const handleSwitchUser = (key: string) => {
    if (key === 'guest') {
      setUserProfile(GUEST_PROFILE);
      setSavedJobIds(new Set(['job_001']));
      setSavedJobs([]);
    } else if (key === 'park') {
      setUserProfile(PARK_PROFILE);
      setSavedJobIds(new Set(['job_003']));
      setSavedJobs([]);
    } else {
      setUserProfile(INITIAL_USER_PROFILE);
      setSavedJobIds(new Set(['job_001', 'job_002']));
      setSavedJobs([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        savedJobsCount={savedJobIds.size}
        userName={userProfile.name}
        onSwitchUser={handleSwitchUser}
      />

      {/* 2. Hero Section on Landing/Jobs view */}
      {activeTab === 'jobs' && (
        <HeroBanner
          onSearch={handleHeroSearch}
          onNavigate={(tab) => setActiveTab(tab)}
        />
      )}

      {/* 3. Main Views */}
      <main className="flex-1">
        {activeTab === 'jobs' && (
          <JobsSection
            onToggleSaveJob={handleToggleSaveJob}
            savedJobIds={savedJobIds}
            onAnalyzeCompany={handleAnalyzeCompanyDirect}
            initialKeyword={searchKeyword}
          />
        )}

        {activeTab === 'hint' && (
          <IndustryHintSection
            onSaveNews={handleSaveNews}
            savedNewsIds={new Set(savedNews.map((n) => n.id))}
            onAnalyzeCompany={handleAnalyzeCompanyDirect}
          />
        )}

        {activeTab === 'company' && (
          <CompanyAnalysisSection
            initialCompanyName={analysisTarget.company}
            initialJobRole={analysisTarget.role}
            userProfile={userProfile}
            onSaveAnalysis={handleSaveAnalysis}
            onGoToResumePolish={handleGoToResumePolish}
          />
        )}

        {activeTab === 'recommend' && (
          <RecommendationSection
            userProfile={userProfile}
            onUpdateProfile={setUserProfile}
            onSearchJobsByRole={(role) => {
              setSearchKeyword(role);
              setActiveTab('jobs');
            }}
            onAnalyzeCompany={handleAnalyzeCompanyDirect}
          />
        )}

        {activeTab === 'resume' && (
          <ResumeStudioSection
            initialCompany={analysisTarget.company}
            initialRole={analysisTarget.role}
          />
        )}

        {activeTab === 'mypage' && (
          <MyPageSection
            userProfile={userProfile}
            onUpdateProfile={setUserProfile}
            savedJobs={savedJobs}
            onRemoveSavedJob={(id) => {
              const next = new Set(savedJobIds);
              next.delete(id);
              setSavedJobIds(next);
              setSavedJobs(savedJobs.filter((j) => j.id !== id));
            }}
            savedNews={savedNews}
            savedAnalyses={savedAnalyses}
            onSelectTab={setActiveTab}
            onSwitchUser={handleSwitchUser}
          />
        )}
      </main>

      {/* 4. Quiet, anti-slop Footer (§1.B zero ornamental footer engines) */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-900 tracking-tight">ENGINEER JOB</span>
            <span aria-hidden="true">·</span>
            <span>공학 전공자를 위한 Serverless AI 산업·취업 분석 플랫폼</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>저작권 보호 및 외부 공식 채용 원문 링크 제공</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">© 2026 ENGINEER JOB. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
