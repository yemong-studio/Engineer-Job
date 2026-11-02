import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, Cpu, Layers, ShieldCheck, Newspaper } from 'lucide-react';
import { HERO_IMAGE } from '../lib/constants';
import { NavTab } from './Navbar';

interface HeroBannerProps {
  onSearch: (keyword: string) => void;
  onNavigate: (tab: NavTab) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSearch, onNavigate }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-900 border-b border-slate-800 text-white">
      {/* Background Image with Dark Vignette Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Engineering Research Cleanroom"
          className="w-full h-full object-cover object-center opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl">
          {/* Natural editorial kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-300 uppercase mb-3">
            <span>Engineering Career Intelligence</span>
            <span aria-hidden="true">·</span>
            <span>Serverless Full-Stack</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 text-balance">
            공학도를 위한 <span className="text-blue-400">AI 기반 취업·산업 분석</span> 플랫폼
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
            기업·직무별 실시간 채용 통합 검색, <strong>Industry HINT</strong> AI 3줄 뉴스 요약, 
            3단계 기업 심층 분석 및 지원서 첨삭까지 한 곳에서 경험하세요.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-xl max-w-2xl">
              <div className="flex items-center flex-1 px-3 py-2 bg-white rounded-lg text-slate-900">
                <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="기업명(현대차, 삼성전자), 직무, 기술 스택(CATIA, ROS, HBM)"
                  className="w-full bg-transparent border-none text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm"
              >
                <span>통합 검색</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Jump Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400 font-medium">빠른 바로가기:</span>
            <button
              type="button"
              onClick={() => onNavigate('hint')}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Newspaper className="w-3.5 h-3.5 text-indigo-400" />
              <span>Industry HINT 뉴스 요약</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('company')}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>3단계 AI 기업 분석</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('recommend')}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>맞춤 직무·기업 매칭</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feature Strip below Hero */}
      <div className="bg-slate-950/70 border-t border-slate-800/80 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>기계·전자·컴퓨터·화공 등 11대 공학 전공별 정밀 매핑</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>경쟁사·과제·직무 연결 3단계 심층 분석</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Serverless Functions & Supabase 안전 데이터 격리</span>
          </div>
        </div>
      </div>
    </div>
  );
};
