import React from 'react';
import {
  BookOpen,
  Award,
  History,
  User,
  Sliders,
  LogOut,
  ChevronDown,
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';
import { StudyMode } from '../types';

export const Navbar: React.FC = () => {
  const { user, logout, updateStudyMode } = useAuth();
  const {
    progress,
    setDrawerOpen,
    setLeaderboardOpen,
    setAuthModalOpen,
    setCumulativeModalOpen,
    getLecturesCompletedCount,
    getLecturesNeedToCompleteCount,
  } = useLearning();

  const handleModeChange = (mode: StudyMode) => {
    updateStudyMode(mode);
  };

  const getModeBadge = (mode: StudyMode) => {
    switch (mode) {
      case 'beginner':
        return { label: 'Beginner', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'moderate':
        return { label: 'Moderate', bg: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'expert':
        return { label: 'Expert', bg: 'bg-purple-100 text-purple-800 border-purple-300' };
    }
  };

  const currentModeInfo = getModeBadge(user?.modeOfStudy || 'moderate');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm border-b border-slate-200">
      {/* Indian National Tricolor Accent Bar */}
      <div className="tricolor-strip" />

      {/* Top Ministerial Sub-header */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Government of India • Ministry of Statistics and Programme Implementation (MoSPI)</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px]">
          <span>National Programme for Civil Services Capacity Building (NPCSCB)</span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-400 font-medium">Mission Karmayogi Bharat</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          {/* Emblem Icon / Logo */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 flex items-center justify-center shadow-md text-white ring-2 ring-saffron/30">
            <GraduationCap className="w-6 h-6 text-saffron-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-navy-950">iGOT</span>
              <span className="text-xs uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-saffron-500 text-white shadow-sm">
                Karmayogi
              </span>
              <span className="text-xs font-semibold text-govgreen-700 hidden sm:inline">
                Statistical Cadre Hub
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Adaptive Competency Platform • Indian Official Statistical System (IOSS)
            </p>
          </div>
        </div>

        {/* Center/Right Navigation & Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Study Mode Selector with easy access dropdown */}
          <div className="relative group">
            <button
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold shadow-sm transition hover:shadow-md ${currentModeInfo.bg}`}
              title="Click or hover to switch your Study Mode anytime"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-slate-600 font-normal">Mode:</span>
              <span>{currentModeInfo.label}</span>
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
            </button>

            {/* Mode Switcher Dropdown */}
            <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-slate-200 p-2 hidden group-hover:block group-focus-within:block z-50">
              <div className="px-2 py-1 border-b border-slate-100 mb-1">
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                  Change Study Mode
                </p>
                <p className="text-[10px] text-slate-500">
                  Instantly adjusts curriculum depth & question baseline
                </p>
              </div>
              <button
                onClick={() => handleModeChange('beginner')}
                className={`w-full text-left p-2 rounded-lg text-xs flex flex-col gap-0.5 transition ${
                  user?.modeOfStudy === 'beginner' ? 'bg-emerald-50 border border-emerald-300' : 'hover:bg-slate-50'
                }`}
              >
                <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                  🟢 Beginner
                  {user?.modeOfStudy === 'beginner' && <span className="text-[10px] bg-emerald-200 px-1 rounded">Active</span>}
                </span>
                <span className="text-[11px] text-slate-600">Foundational concepts, guided walkthroughs & basic MCQs.</span>
              </button>
              <button
                onClick={() => handleModeChange('moderate')}
                className={`w-full text-left p-2 rounded-lg text-xs flex flex-col gap-0.5 transition mt-1 ${
                  user?.modeOfStudy === 'moderate' ? 'bg-blue-50 border border-blue-300' : 'hover:bg-slate-50'
                }`}
              >
                <span className="font-bold text-blue-800 flex items-center gap-1.5">
                  🔵 Moderate (Standard)
                  {user?.modeOfStudy === 'moderate' && <span className="text-[10px] bg-blue-200 px-1 rounded">Active</span>}
                </span>
                <span className="text-[11px] text-slate-600">Standard civil service cadre questions & formula applications.</span>
              </button>
              <button
                onClick={() => handleModeChange('expert')}
                className={`w-full text-left p-2 rounded-lg text-xs flex flex-col gap-0.5 transition mt-1 ${
                  user?.modeOfStudy === 'expert' ? 'bg-purple-50 border border-purple-300' : 'hover:bg-slate-50'
                }`}
              >
                <span className="font-bold text-purple-800 flex items-center gap-1.5">
                  🟣 Expert / Apex Policy
                  {user?.modeOfStudy === 'expert' && <span className="text-[10px] bg-purple-200 px-1 rounded">Active</span>}
                </span>
                <span className="text-[11px] text-slate-600">Statutory edge-cases, deep econometric indexation & SNA.</span>
              </button>
            </div>
          </div>

          {/* All-India Rank / Normalization Button */}
          <button
            onClick={() => setLeaderboardOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold shadow-sm transition"
            title="View Normalized Score & All-India Ranking"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <div className="text-left hidden md:block">
              <div className="text-[10px] text-amber-700 leading-tight">All-India Rank</div>
              <div className="font-extrabold text-amber-950">#{user?.allIndiaRank || 412} ({user?.percentile || 98.4}%ile)</div>
            </div>
            <span className="md:hidden">Rank</span>
          </button>

          {/* Cumulative Assessments Button */}
          <button
            onClick={() => setCumulativeModalOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            title="Open Cumulative Assessments"
          >
            <Layers className="w-3.5 h-3.5 text-slate-600" />
            <span>Assessments</span>
          </button>

          {/* Activity, History & Lectures Drawer Icon */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-lg bg-navy-50 hover:bg-navy-100 border border-navy-100 text-navy-900 text-xs font-semibold shadow-sm transition"
            title="Open Learning History, Completed Lectures & Recent Searches"
          >
            <History className="w-4 h-4 text-navy-700" />
            <span className="hidden sm:inline">My Activity</span>
            {/* Notification Badge with counts */}
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-saffron-600 rounded-full">
              {getLecturesCompletedCount() + getLecturesNeedToCompleteCount()}
            </span>
          </button>

          {/* Profile / Auth Button */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg hover:bg-slate-100 transition text-left"
                title="View Aadhaar & Official Statistical ID Profile"
              >
                <div className="w-8 h-8 rounded-full bg-navy-800 text-white flex items-center justify-center text-xs font-bold ring-1 ring-slate-300">
                  {user.aadhaarName.charAt(0)}
                </div>
                <div className="hidden xl:block">
                  <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                    {user.aadhaarName}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    {user.govtId}
                  </p>
                </div>
              </button>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-900 text-white text-xs font-semibold shadow-sm transition"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login / Register</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
