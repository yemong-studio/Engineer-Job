import React from 'react';
import { Briefcase, Newspaper, Building2, Compass, FileEdit } from 'lucide-react';
import { AVATAR_USER_IMAGE } from '../lib/constants';

export type NavTab = 'jobs' | 'hint' | 'company' | 'recommend' | 'resume' | 'mypage';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  savedJobsCount: number;
  userName?: string;
  onSwitchUser?: (key: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  savedJobsCount,
  userName = '김공학',
  onSwitchUser,
}) => {
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => onSelectTab('jobs')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-sm tracking-tight transition-transform group-hover:scale-105">
              EJ
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
                ENGINEER JOB
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                공학 전공자 AI 취업·산업 플랫폼
              </span>
            </div>
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectTab('jobs')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'jobs'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Briefcase className="w-4 h-4 text-slate-500" />
              <span>채용정보 검색</span>
            </button>

            <button
              onClick={() => onSelectTab('hint')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'hint'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Newspaper className="w-4 h-4 text-indigo-600" />
              <span>Industry HINT</span>
            </button>

            <button
              onClick={() => onSelectTab('company')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'company'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>AI 기업 분석</span>
            </button>

            <button
              onClick={() => onSelectTab('recommend')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'recommend'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4 text-blue-600" />
              <span>맞춤 직무 추천</span>
            </button>

            <button
              onClick={() => onSelectTab('resume')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'resume'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileEdit className="w-4 h-4 text-amber-600" />
              <span>자소서 첨삭 연구소</span>
            </button>
          </nav>

          {/* Zone 3: Primary action & User Profile */}
          <div className="relative flex items-center gap-2 shrink-0">
            {/* Guest / login-free badge */}
            <span className="hidden sm:inline-block text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
              로그인 없이 이용 가능
            </span>

            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                activeTab === 'mypage'
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
              }`}
              title="프로필 및 사용자 모드 변경"
            >
              <img
                src={AVATAR_USER_IMAGE}
                alt={userName}
                className="w-6 h-6 rounded-full object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs font-semibold whitespace-nowrap">{userName}</span>
              {savedJobsCount > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums ${
                  activeTab === 'mypage' ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                }`}>
                  {savedJobsCount}
                </span>
              )}
            </button>

            {/* User Profile / Guest Mode Popover */}
            {showUserMenu && (
              <div className="absolute right-0 top-12 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 text-xs">
                <div className="pb-2 border-b border-slate-100 mb-2">
                  <div className="font-bold text-slate-900 text-sm">{userName}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    로그인 없이 모든 검색·분석 기능을 자유롭게 이용할 수 있습니다.
                  </div>
                </div>

                {onSwitchUser && (
                  <div className="space-y-1 mb-2">
                    <div className="text-[11px] font-medium text-slate-400 mb-1">사용자 모드 전환:</div>
                    <button
                      type="button"
                      onClick={() => {
                        onSwitchUser('guest');
                        setShowUserMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                        userName === '게스트' ? 'bg-slate-100 font-bold text-slate-900' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>👤 게스트 모드 (비로그인)</span>
                      {userName === '게스트' && <span className="text-emerald-600 font-bold text-[10px]">선택됨</span>}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onSwitchUser('kim');
                        setShowUserMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                        userName === '김공학' ? 'bg-slate-100 font-bold text-slate-900' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>⚙️ 김공학 (기계공학 프리셋)</span>
                      {userName === '김공학' && <span className="text-emerald-600 font-bold text-[10px]">선택됨</span>}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onSwitchUser('park');
                        setShowUserMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                        userName === '박전자' ? 'bg-slate-100 font-bold text-slate-900' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>⚡ 박전자 (전자공학 프리셋)</span>
                      {userName === '박전자' && <span className="text-emerald-600 font-bold text-[10px]">선택됨</span>}
                    </button>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTab('mypage');
                      setShowUserMenu(false);
                    }}
                    className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                  >
                    마이페이지 이동
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUserMenu(false)}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto py-2.5 border-t border-slate-100 no-scrollbar text-xs">
          <button
            onClick={() => onSelectTab('jobs')}
            className={`px-2.5 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'jobs' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-slate-50'
            }`}
          >
            채용정보
          </button>
          <button
            onClick={() => onSelectTab('hint')}
            className={`px-2.5 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'hint' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-slate-50'
            }`}
          >
            Industry HINT
          </button>
          <button
            onClick={() => onSelectTab('company')}
            className={`px-2.5 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'company' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-slate-50'
            }`}
          >
            기업 분석
          </button>
          <button
            onClick={() => onSelectTab('recommend')}
            className={`px-2.5 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'recommend' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-slate-50'
            }`}
          >
            직무 추천
          </button>
          <button
            onClick={() => onSelectTab('resume')}
            className={`px-2.5 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'resume' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-slate-50'
            }`}
          >
            자소서 첨삭
          </button>
          <button
            onClick={() => onSelectTab('mypage')}
            className={`px-2.5 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'mypage' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-slate-50'
            }`}
          >
            마이페이지
          </button>
        </div>
      </div>
    </header>
  );
};
