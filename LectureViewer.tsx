import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  User,
  Building,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Bookmark,
  Share2,
  FileCheck,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { COURSES_DATA } from '../data/coursesData';
import { useLearning } from '../context/LearningContext';
import { useAuth } from '../context/AuthContext';
import { InteractiveDiagram } from './InteractiveDiagram';
import { VideoPlayer } from './VideoPlayer';

export const LectureViewer: React.FC = () => {
  const { user } = useAuth();
  const {
    activeLectureId,
    activePartNumber,
    setActiveLecture,
    markPartCompleted,
    markLectureCompleted,
    progress,
    setMCQModalOpen,
  } = useLearning();

  const currentCourse = COURSES_DATA.find((c) => c.id === activeLectureId) || COURSES_DATA[0];
  const parts = currentCourse.parts;
  const currentPart = parts.find((p) => p.partNumber === activePartNumber) || parts[0];

  const completedPartsForThisCourse = progress.completedParts[currentCourse.id] || [];
  const isCurrentPartCompleted = completedPartsForThisCourse.includes(currentPart.partNumber);
  const isCourseCompleted = progress.completedLectures.includes(currentCourse.id);

  const handleNextPart = () => {
    markPartCompleted(currentCourse.id, currentPart.partNumber);
    if (currentPart.partNumber < parts.length) {
      setActiveLecture(currentCourse.id, currentPart.partNumber + 1);
    } else {
      markLectureCompleted(currentCourse.id);
    }
  };

  const handlePrevPart = () => {
    if (currentPart.partNumber > 1) {
      setActiveLecture(currentCourse.id, currentPart.partNumber - 1);
    }
  };

  return (
    <div id="lecture-container" className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
      {/* Course Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-slate-900 text-white p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-saffron-500 text-white shadow-sm">
              {currentCourse.domain}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-white/10 text-slate-200">
              Curriculum ID: {currentCourse.id}
            </span>
          </div>
          {isCourseCompleted && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Course Completed
            </span>
          )}
        </div>

        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
          {currentCourse.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          <strong>Aim:</strong> {currentCourse.aim}
        </p>

        {/* Author / Cadre Info */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-saffron-400" />
              <span>
                <strong>Faculty:</strong> {currentCourse.author}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentCourse.ministryDepartment}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Target Competency:</span>
            <span className="font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              {currentCourse.targetSkill}
            </span>
          </div>
        </div>
      </div>

      {/* Lengthy Topic Segmentation: Multi-Part Stepper */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-navy-800" />
            Structured Curriculum Parts ({parts.length} Sequential Modules)
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Part {currentPart.partNumber} of {parts.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          {parts.map((p) => {
            const isCompleted = completedPartsForThisCourse.includes(p.partNumber);
            const isCurrent = p.partNumber === currentPart.partNumber;

            return (
              <button
                key={p.partNumber}
                onClick={() => setActiveLecture(currentCourse.id, p.partNumber)}
                className={`p-3 rounded-xl border text-left transition relative flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-white border-navy-800 shadow-md ring-2 ring-navy-800/20'
                    : isCompleted
                    ? 'bg-emerald-50/70 border-emerald-200 hover:bg-emerald-50'
                    : 'bg-white/60 border-slate-200 hover:bg-white text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isCurrent
                        ? 'bg-navy-800 text-white'
                        : isCompleted
                        ? 'bg-emerald-200 text-emerald-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    Part {p.partNumber}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{p.estimatedMinutes}m</span>
                    {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-1" />}
                  </div>
                </div>
                <div
                  className={`text-xs font-bold line-clamp-1 ${
                    isCurrent ? 'text-navy-950' : isCompleted ? 'text-emerald-950' : 'text-slate-700'
                  }`}
                >
                  {p.title.replace(/^Part \d+:\s*/, '')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Part Content Body */}
      <div className="p-6 sm:p-8">
        {/* Part Title & Summary Box */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Part {currentPart.partNumber}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {currentPart.estimatedMinutes} Mins Read & Practice
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 mt-1">
            {currentPart.title}
          </h2>
          <p className="text-sm text-slate-600 mt-2 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
            {currentPart.summary}
          </p>
        </div>

        {/* Section 1: Overview */}
        <div className="prose prose-slate max-w-none mb-8">
          <h3 className="text-base font-bold text-navy-900 mb-2">Executive Overview</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            {currentPart.content.overview}
          </p>
        </div>

        {/* Detailed Content Sections with Circular References */}
        <div className="space-y-6 mb-8">
          {currentPart.content.sections.map((sec, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h4 className="text-base font-bold text-navy-950 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-navy-100 text-navy-800 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                {sec.heading}
              </h4>
              <div className="space-y-2 text-sm text-slate-700 leading-relaxed pl-8">
                {sec.body.map((pText, pIdx) => (
                  <p key={pIdx}>{pText}</p>
                ))}
              </div>

              {sec.keyTakeaway && (
                <div className="mt-4 ml-8 p-3 rounded-xl bg-saffron-50 border border-saffron-200 text-xs text-saffron-950 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-saffron-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-saffron-900">Key Policy Takeaway:</strong>{' '}
                    {sec.keyTakeaway}
                  </div>
                </div>
              )}

              {sec.circularRef && (
                <div className="mt-2 ml-8 text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-govgreen-600" />
                  <span>Statutory Reference: {sec.circularRef}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Diagram Component (if provided in part) */}
        {currentPart.content.diagram && (
          <InteractiveDiagram
            type={currentPart.content.diagram.type}
            title={currentPart.content.diagram.title}
            caption={currentPart.content.diagram.caption}
            nodes={currentPart.content.diagram.nodes}
            connections={currentPart.content.diagram.connections}
          />
        )}

        {/* Video Player Component (if provided in part) */}
        {currentPart.content.video && (
          <VideoPlayer
            title={currentPart.content.video.title}
            duration={currentPart.content.video.duration}
            instructor={currentPart.content.video.instructor}
            transcriptSnippet={currentPart.content.video.transcriptSnippet}
          />
        )}

        {/* Bottom Actions Bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handlePrevPart}
            disabled={currentPart.partNumber === 1}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition ${
              currentPart.partNumber === 1
                ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                : 'hover:bg-slate-100 border-slate-300 text-slate-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Part</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            {/* Launch Adaptive MCQ Assessment button */}
            <button
              onClick={() => setMCQModalOpen(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition ring-2 ring-saffron-500/20"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Launch Adaptive MCQ Assessment</span>
            </button>

            {/* Complete & Next Part */}
            <button
              onClick={handleNextPart}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-900 text-white text-xs font-bold shadow-md hover:shadow-lg transition"
            >
              <span>
                {currentPart.partNumber < parts.length
                  ? `Complete Part ${currentPart.partNumber} & Proceed`
                  : 'Complete Full Course'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
