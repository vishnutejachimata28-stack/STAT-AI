import React from 'react';
import {
  BookOpen,
  Award,
  History,
  Shield,
  Sparkles,
  Layers,
  CheckCircle2,
  Sliders,
  Compass,
  ArrowUpRight,
  GraduationCap
} from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { useLearning } from './context/LearningContext';
import { COURSES_DATA } from './data/coursesData';
import { Navbar } from './components/Navbar';
import { PromptSearch } from './components/PromptSearch';
import { LectureViewer } from './components/LectureViewer';
import { AuthModal } from './components/AuthModal';
import { AdaptiveMCQModal } from './components/AdaptiveMCQModal';
import { CumulativeAssessmentModal } from './components/CumulativeAssessmentModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { HistoryDrawer } from './components/HistoryDrawer';

export const App: React.FC = () => {
  const { user } = useAuth();
  const {
    activeLectureId,
    setActiveLecture,
    progress,
    setAuthModalOpen,
    setLeaderboardOpen,
    setDrawerOpen,
    setCumulativeModalOpen,
    getLecturesCompletedCount,
    getLecturesNeedToCompleteCount,
  } = useLearning();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-saffron-200 selection:text-navy-950 font-sans">
      {/* Top Ministerial & Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome & Cadre Status Banner */}
        <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 text-white rounded-2xl p-5 sm:p-6 shadow-md mb-6 border border-navy-800 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-saffron-400 flex items-center justify-center text-2xl font-bold shadow shrink-0">
                🇮🇳
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-black tracking-tight text-white">
                    {user ? `Namaste, ${user.aadhaarName}` : 'Welcome, Civil Service / Statistical Cadre Officer'}
                  </h1>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Aadhaar Verified
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {user?.organization || 'Indian Official Statistical System (IOSS) & Central Statistics Office'} •{' '}
                  <span className="font-mono text-saffron-300">{user?.govtId || 'Cadre Portal'}</span>
                </p>
              </div>
            </div>

            {/* Quick Status Stats */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="bg-white/10 backdrop-blur px-3.5 py-2 rounded-xl border border-white/10 text-center">
                <span className="text-[10px] text-slate-400 block font-medium">Study Mode</span>
                <span className="text-xs font-bold uppercase tracking-wider text-saffron-400">
                  {user?.modeOfStudy || 'Moderate'}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur px-3.5 py-2 rounded-xl border border-white/10 text-center">
                <span className="text-[10px] text-slate-400 block font-medium">Calibrated Tier</span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {progress.calibratedBaselineDifficulty}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur px-3.5 py-2 rounded-xl border border-white/10 text-center">
                <span className="text-[10px] text-slate-400 block font-medium">Normalized Score</span>
                <span className="text-xs font-bold text-amber-400">
                  {user?.normalizedScore || 84.5}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Natural Language Requirement Prompter (Aim, Skill, Author) */}
        <PromptSearch />

        {/* 2. Structured Multi-Part Lecture Viewer */}
        <LectureViewer />

        {/* 3. Cadre Curriculum Explorer (Available Modules) */}
        <section className="mt-8 mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-navy-950 flex items-center gap-2">
                <Compass className="w-5 h-5 text-saffron-500" />
                <span>IOSS Specialized Cadre Curriculum</span>
              </h2>
              <p className="text-xs text-slate-500">
                Official course modules conforming to National Quality Assurance Framework (India-NQAF)
              </p>
            </div>
            <button
              onClick={() => setCumulativeModalOpen(true)}
              className="text-xs font-bold text-navy-800 hover:text-navy-950 flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"
            >
              <Layers className="w-3.5 h-3.5 text-saffron-500" />
              <span>Cumulative Exams</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {COURSES_DATA.map((course) => {
              const isSelected = course.id === activeLectureId;
              const isDone = progress.completedLectures.includes(course.id);
              const completedPartsCount = (progress.completedParts[course.id] || []).length;

              return (
                <div
                  key={course.id}
                  onClick={() => {
                    setActiveLecture(course.id, 1);
                    document.getElementById('lecture-container')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-navy-800 shadow-lg ring-2 ring-navy-800/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] mb-2">
                      <span className="font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {course.domain.split('&')[0]}
                      </span>
                      {isDone ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Done
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono">
                          {course.parts.length} Parts
                        </span>
                      )}
                    </div>

                    <h3 className="text-xs font-extrabold text-navy-950 line-clamp-2 leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {course.aim}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 truncate max-w-[120px]">
                      {course.author.split('(')[0]}
                    </span>
                    <span className="font-bold text-navy-800 flex items-center gap-0.5">
                      Open <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-bold text-saffron-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">
                iGOT Karmayogi Bharat • Statistical Cadre Competency Platform
              </p>
              <p className="text-[11px] text-slate-400">
                Department of Personnel & Training (DoPT) and MoSPI, Government of India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => setAuthModalOpen(true)} className="hover:text-white transition">
              Profile & Aadhaar ID
            </button>
            <span>•</span>
            <button onClick={() => setLeaderboardOpen(true)} className="hover:text-white transition">
              Normalization Formula
            </button>
            <span>•</span>
            <button onClick={() => setDrawerOpen(true)} className="hover:text-white transition">
              Activity History
            </button>
          </div>
        </div>
      </footer>

      {/* Global Modals & Drawer */}
      <AuthModal />
      <AdaptiveMCQModal />
      <CumulativeAssessmentModal />
      <LeaderboardModal />
      <HistoryDrawer />
    </div>
  );
};
