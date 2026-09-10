import React, { useState } from 'react';
import {
  X,
  History,
  CheckCircle2,
  Clock,
  Search,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  RotateCcw,
  Target
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { COURSES_DATA } from '../data/coursesData';

export const HistoryDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    setDrawerOpen,
    progress,
    setActiveLecture,
    getLecturesCompletedCount,
    getLecturesNeedToCompleteCount,
  } = useLearning();

  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'pending' | 'searches'>('all');

  if (!isDrawerOpen) return null;

  const completedCourses = COURSES_DATA.filter((c) =>
    progress.completedLectures.includes(c.id)
  );

  const pendingCourses = COURSES_DATA.filter(
    (c) => !progress.completedLectures.includes(c.id)
  );

  const handleResumeCourse = (courseId: string, partNumber: number = 1) => {
    setActiveLecture(courseId, partNumber);
    setDrawerOpen(false);
    document.getElementById('lecture-container')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReRunSearch = (searchItem: typeof progress.recentSearches[0]) => {
    // Find matching course
    const target = COURSES_DATA.find(
      (c) =>
        c.aim.toLowerCase().includes(searchItem.aim.toLowerCase()) ||
        c.title.toLowerCase().includes(searchItem.queryText.toLowerCase())
    ) || COURSES_DATA[0];

    setActiveLecture(target.id, 1);
    setDrawerOpen(false);
    document.getElementById('lecture-container')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Dark backdrop */}
      <div
        onClick={() => setDrawerOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col border-l border-slate-200">
          {/* Top Tricolor Strip */}
          <div className="tricolor-strip" />

          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-navy-800 text-white flex items-center justify-center font-bold">
                <History className="w-5 h-5 text-saffron-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy-950">
                  Cadre Learning Activity Hub
                </h3>
                <p className="text-xs text-slate-500">
                  History, progress, pending lectures & search logs
                </p>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Summary Metric Counters */}
          <div className="grid grid-cols-3 gap-2 p-4 bg-navy-950 text-white text-center text-xs">
            <div className="p-2 rounded-lg bg-white/5">
              <span className="text-[10px] text-slate-400 block">Completed</span>
              <span className="text-lg font-bold text-emerald-400">
                {getLecturesCompletedCount()}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/5">
              <span className="text-[10px] text-slate-400 block">Need to Complete</span>
              <span className="text-lg font-bold text-amber-400">
                {getLecturesNeedToCompleteCount()}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/5">
              <span className="text-[10px] text-slate-400 block">Searches</span>
              <span className="text-lg font-bold text-saffron-400">
                {progress.recentSearches.length}
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 px-4 bg-slate-50/70 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-3 px-3 font-bold border-b-2 whitespace-nowrap transition ${
                activeTab === 'all'
                  ? 'border-navy-800 text-navy-950'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              All History ({progress.historyLog.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-3 px-3 font-bold border-b-2 whitespace-nowrap transition ${
                activeTab === 'pending'
                  ? 'border-amber-600 text-amber-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Need to Complete ({pendingCourses.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-3 px-3 font-bold border-b-2 whitespace-nowrap transition ${
                activeTab === 'completed'
                  ? 'border-emerald-600 text-emerald-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Completed ({completedCourses.length})
            </button>
            <button
              onClick={() => setActiveTab('searches')}
              className={`py-3 px-3 font-bold border-b-2 whitespace-nowrap transition ${
                activeTab === 'searches'
                  ? 'border-saffron-600 text-saffron-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Searches ({progress.recentSearches.length})
            </button>
          </div>

          {/* Tab Content List */}
          <div className="p-4 flex-1 overflow-y-auto custom-scrollbar space-y-3">
            {/* 1. NEED TO COMPLETE / IN PROGRESS */}
            {activeTab === 'pending' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 mb-2">
                  Curriculum modules in progress or queued for your cadre specialization:
                </p>
                {pendingCourses.map((course) => {
                  const completedParts = progress.completedParts[course.id] || [];
                  const pct = Math.round((completedParts.length / course.parts.length) * 100);

                  return (
                    <div
                      key={course.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-navy-400 hover:shadow-sm transition"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {pct > 0 ? `${pct}% in progress` : 'Not Started'}
                        </span>
                        <span className="text-slate-400">
                          {completedParts.length} of {course.parts.length} parts done
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-navy-950 mt-1">{course.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {course.aim}
                      </p>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden my-2.5">
                        <div
                          className="bg-amber-500 h-full rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-400 font-mono">
                          {course.author}
                        </span>
                        <button
                          onClick={() => handleResumeCourse(course.id, completedParts.length + 1)}
                          className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-900 text-white text-[11px] font-bold transition flex items-center gap-1"
                        >
                          <span>{pct > 0 ? 'Resume Lecture' : 'Start Lecture'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. COMPLETED LECTURES */}
            {activeTab === 'completed' && (
              <div className="space-y-3">
                {completedCourses.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">
                    No completed courses yet. Complete all module parts to earn certificates!
                  </div>
                ) : (
                  completedCourses.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Certificate Issued
                        </span>
                        <span className="text-[10px] font-mono text-emerald-700">All Parts Done</span>
                      </div>
                      <h4 className="font-bold text-emerald-950 text-sm">{course.title}</h4>
                      <p className="text-[11px] text-slate-600 mt-1">{course.aim}</p>
                      <button
                        onClick={() => handleResumeCourse(course.id, 1)}
                        className="mt-3 text-xs font-bold text-navy-800 hover:underline flex items-center gap-1"
                      >
                        <span>Review Lecture Notes & Diagram</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 3. RECENT SEARCHES */}
            {activeTab === 'searches' && (
              <div className="space-y-2.5">
                <p className="text-xs text-slate-500 mb-1">
                  Past requirement prompts submitted for automatic topic generation:
                </p>
                {progress.recentSearches.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 transition flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-navy-950 flex items-center gap-1">
                        <Search className="w-3.5 h-3.5 text-saffron-500" />
                        <span>{s.aim || s.queryText}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Skill: <span className="font-medium text-slate-700">{s.skill || 'All'}</span> • Faculty:{' '}
                        <span className="font-medium text-slate-700">{s.author || 'Official'}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1">
                        {new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <button
                      onClick={() => handleReRunSearch(s)}
                      className="p-2 rounded-lg bg-white hover:bg-navy-800 hover:text-white border border-slate-200 text-slate-600 transition shadow-sm"
                      title="Re-run Prompt"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 4. ALL ACTIVITY HISTORY LOG */}
            {activeTab === 'all' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 mb-1">
                  Chronological trail of your study sessions, assessments, and search prompts:
                </p>
                {progress.historyLog.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-xs flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-navy-100 text-navy-800 flex items-center justify-center shrink-0 mt-0.5">
                      {log.type === 'search' ? (
                        <Search className="w-3.5 h-3.5 text-saffron-600" />
                      ) : log.type === 'mcq_finished' ? (
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      ) : log.type === 'part_completed' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{log.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(log.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                        {log.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
