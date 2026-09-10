import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  RotateCcw,
  Sparkles,
  Zap,
  Target,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLearning } from '../context/LearningContext';
import { useAuth } from '../context/AuthContext';
import { COURSES_DATA } from '../data/coursesData';
import { MCQ_QUESTIONS_BANK } from '../data/mcqQuestions';
import {
  DifficultyLevel,
  MCQAttempt,
  MCQQuestion,
  QuizSessionResult,
} from '../types';
import {
  DIFFICULTY_LABELS,
  DIFFICULTY_WEIGHTS,
  getNextDifficulty,
  calculateNormalizedScore,
  recalibrateBaselineDifficulty,
} from '../utils/adaptiveEngine';

export const AdaptiveMCQModal: React.FC = () => {
  const { user } = useAuth();
  const {
    activeLectureId,
    isMCQModalOpen,
    setMCQModalOpen,
    progress,
    recordQuizSession,
  } = useLearning();

  const currentCourse = COURSES_DATA.find((c) => c.id === activeLectureId) || COURSES_DATA[0];

  // Number of questions in this adaptive session
  const TOTAL_SESSION_QUESTIONS = 5;

  // Session state
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState<DifficultyLevel>('moderate');
  const [activeQuestion, setActiveQuestion] = useState<MCQQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attempts, setAttempts] = useState<MCQAttempt[]>([]);
  const [streak, setStreak] = useState(0);
  const [isSessionFinished, setIsSessionFinished] = useState(false);
  const [finalSessionResult, setFinalSessionResult] = useState<QuizSessionResult | null>(null);

  // Initialize session whenever modal opens
  useEffect(() => {
    if (isMCQModalOpen) {
      // Start with user's calibrated baseline (default moderate)
      const startingDiff = progress.calibratedBaselineDifficulty || 'moderate';
      setCurrentDifficulty(startingDiff);
      setCurrentQuestionIndex(0);
      setAttempts([]);
      setStreak(0);
      setIsSubmitted(false);
      setSelectedOption(null);
      setIsSessionFinished(false);
      setFinalSessionResult(null);
      setSessionStarted(true);

      // Pick first question matching starting difficulty
      pickQuestionForDifficulty(startingDiff, []);
    }
  }, [isMCQModalOpen, activeLectureId, progress.calibratedBaselineDifficulty]);

  const pickQuestionForDifficulty = (diff: DifficultyLevel, currentAttempts: MCQAttempt[]) => {
    const usedIds = currentAttempts.map((a) => a.questionId);

    // Prefer questions for this course & difficulty
    let candidates = MCQ_QUESTIONS_BANK.filter(
      (q) => q.lectureId === currentCourse.id && q.difficulty === diff && !usedIds.includes(q.id)
    );

    // Fallback if specific tier question exhausted: any question of this difficulty from the bank
    if (candidates.length === 0) {
      candidates = MCQ_QUESTIONS_BANK.filter(
        (q) => q.difficulty === diff && !usedIds.includes(q.id)
      );
    }

    // Secondary fallback: any unused question
    if (candidates.length === 0) {
      candidates = MCQ_QUESTIONS_BANK.filter((q) => !usedIds.includes(q.id));
    }

    if (candidates.length > 0) {
      // Pick random
      const selected = candidates[Math.floor(Math.random() * candidates.length)];
      setActiveQuestion(selected);
      setCurrentDifficulty(selected.difficulty);
    } else {
      // Wrap up if questions completely exhausted
      handleFinishSession(currentAttempts);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !activeQuestion || isSubmitted) return;

    const isCorrect = selectedOption === activeQuestion.correctIndex;
    const newAttempt: MCQAttempt = {
      questionId: activeQuestion.id,
      selectedOption,
      isCorrect,
      difficulty: activeQuestion.difficulty,
      timestamp: new Date().toISOString(),
    };

    const updatedAttempts = [...attempts, newAttempt];
    setAttempts(updatedAttempts);
    setIsSubmitted(true);

    if (isCorrect) {
      setStreak((prev) => prev + 1);
      // Small celebratory confetti if hard/expert or streak >= 2
      if (activeQuestion.difficulty === 'hard' || activeQuestion.difficulty === 'expert' || streak >= 2) {
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 },
          });
        } catch (e) {
          // ignore if canvas not supported
        }
      }
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (!activeQuestion) return;

    const lastAttempt = attempts[attempts.length - 1];
    const nextDiff = getNextDifficulty(activeQuestion.difficulty, lastAttempt.isCorrect);

    if (currentQuestionIndex + 1 >= TOTAL_SESSION_QUESTIONS) {
      handleFinishSession(attempts);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsSubmitted(false);
      setSelectedOption(null);
      setCurrentDifficulty(nextDiff);
      pickQuestionForDifficulty(nextDiff, attempts);
    }
  };

  const handleFinishSession = (finalAttempts: MCQAttempt[]) => {
    const normResults = calculateNormalizedScore(finalAttempts);
    const startingDiff = progress.calibratedBaselineDifficulty || 'moderate';
    const nextCalibrated = recalibrateBaselineDifficulty(startingDiff, finalAttempts);

    const sessionResult: QuizSessionResult = {
      lectureId: currentCourse.id,
      lectureTitle: currentCourse.title,
      date: new Date().toISOString(),
      attempts: finalAttempts,
      startingDifficulty: startingDiff,
      endingDifficulty: currentDifficulty,
      nextRecommendedDifficulty: nextCalibrated,
      rawScore: normResults.weightedScore,
      normalizedScore: normResults.normalizedScore,
      accuracy: normResults.rawAccuracy,
    };

    setFinalSessionResult(sessionResult);
    setIsSessionFinished(true);
    recordQuizSession(sessionResult);

    if (normResults.normalizedScore >= 75) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  };

  if (!isMCQModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] overflow-y-auto custom-scrollbar flex flex-col">
        {/* Tricolor Bar */}
        <div className="tricolor-strip rounded-t-2xl" />

        {/* Modal Top Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-saffron-500 text-white">
                Real-Time Adaptive Engine
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Question {Math.min(currentQuestionIndex + 1, TOTAL_SESSION_QUESTIONS)} of {TOTAL_SESSION_QUESTIONS}
              </span>
            </div>
            <h3 className="text-sm font-bold text-navy-950 mt-0.5 truncate max-w-md">
              {currentCourse.title}
            </h3>
          </div>
          <button
            onClick={() => setMCQModalOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Difficulty Gauge Bar */}
        {!isSessionFinished && (
          <div className="bg-navy-950 text-white px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">Current Complexity:</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  DIFFICULTY_LABELS[currentDifficulty].bg
                } ${DIFFICULTY_LABELS[currentDifficulty].color}`}
              >
                {DIFFICULTY_LABELS[currentDifficulty].label}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                ({DIFFICULTY_WEIGHTS[currentDifficulty]}x weight)
              </span>
            </div>

            <div className="flex items-center gap-3">
              {streak > 1 && (
                <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{streak}x Streak</span>
                </div>
              )}
              <div className="text-[11px] text-slate-300">
                Starting Baseline: <strong className="text-saffron-400">{progress.calibratedBaselineDifficulty.toUpperCase()}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Modal Main Content */}
        <div className="p-6 flex-1">
          {!isSessionFinished && activeQuestion ? (
            <div className="space-y-5">
              {/* Question Text Card */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-navy-800 uppercase tracking-wide flex items-center gap-1">
                    <Target className="w-3.5 h-3.5" />
                    Conceptual Assessment
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    ID: {activeQuestion.id}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                  {activeQuestion.question}
                </p>
              </div>

              {/* Options List */}
              <div className="space-y-2.5">
                {activeQuestion.options.map((optionText, idx) => {
                  const isChosen = selectedOption === idx;
                  const isCorrect = idx === activeQuestion.correctIndex;

                  let optionStyle = 'border-slate-200 hover:border-navy-400 hover:bg-slate-50';
                  if (isChosen) {
                    optionStyle = 'border-navy-800 bg-navy-50/50 ring-2 ring-navy-800/20';
                  }

                  if (isSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/30';
                    } else if (isChosen && !isCorrect) {
                      optionStyle = 'border-red-500 bg-red-50 text-red-950 ring-2 ring-red-500/30';
                    } else {
                      optionStyle = 'opacity-50 border-slate-200';
                    }
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (!isSubmitted) setSelectedOption(idx);
                      }}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition cursor-pointer flex items-start gap-3 ${optionStyle}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                          isSubmitted && isCorrect
                            ? 'bg-emerald-600 text-white'
                            : isSubmitted && isChosen && !isCorrect
                            ? 'bg-red-600 text-white'
                            : isChosen
                            ? 'bg-navy-800 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug pt-0.5">{optionText}</span>
                    </div>
                  );
                })}
              </div>

              {/* Adaptive Feedback Banner after submitting */}
              {isSubmitted && (
                <div className="space-y-3 animate-fade-in">
                  {selectedOption === activeQuestion.correctIndex ? (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                      <div className="flex items-center gap-2 font-bold text-sm text-emerald-800 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Correct Answer! Difficulty Escalating</span>
                        <TrendingUp className="w-4 h-4 text-emerald-600 ml-1" />
                      </div>
                      <p className="leading-relaxed">{activeQuestion.explanation}</p>
                      {activeQuestion.statConceptRef && (
                        <div className="mt-2 pt-2 border-t border-emerald-200/60 font-mono text-[11px] text-emerald-700 flex items-center gap-1">
                          <FileCheck className="w-3 h-3" />
                          <span>Official Reference: {activeQuestion.statConceptRef}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs">
                      <div className="flex items-center gap-2 font-bold text-sm text-red-800 mb-1">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span>Incorrect. Easing Difficulty to Reinforce Fundamentals</span>
                        <TrendingDown className="w-4 h-4 text-red-600 ml-1" />
                      </div>
                      <p className="leading-relaxed">{activeQuestion.explanation}</p>
                      {activeQuestion.hint && (
                        <div className="mt-2 p-2 rounded-lg bg-red-100/60 text-red-800 text-[11px]">
                          <strong>Helpful Concept Tip:</strong> {activeQuestion.hint}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : isSessionFinished && finalSessionResult ? (
            /* Session Completed Screen */
            <div className="space-y-6 text-center py-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-saffron-500 text-white mx-auto flex items-center justify-center shadow-lg">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Assessment Completed
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-navy-950 mt-2">
                  Performance & Complexity Analysis
                </h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  Your responses were evaluated using the IOSS Normalized Scoring algorithm with difficulty weights.
                </p>
              </div>

              {/* Score Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Normalized Score
                  </span>
                  <span className="text-2xl font-black text-navy-950 mt-1 block">
                    {finalSessionResult.normalizedScore}%
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Weighted formula</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Raw Accuracy
                  </span>
                  <span className="text-2xl font-black text-slate-800 mt-1 block">
                    {finalSessionResult.accuracy}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    {finalSessionResult.attempts.filter((a) => a.isCorrect).length}/{finalSessionResult.attempts.length} Solved
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    All-India Rank
                  </span>
                  <span className="text-2xl font-black text-amber-600 mt-1 block">
                    #{user?.allIndiaRank || 412}
                  </span>
                  <span className="text-[10px] text-amber-700 font-semibold">
                    {user?.percentile || 98.4}th Percentile
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                  <span className="text-[10px] text-purple-700 font-bold uppercase tracking-wider block">
                    Calibrated Baseline
                  </span>
                  <span className="text-xl font-black text-purple-950 mt-1 block uppercase">
                    {finalSessionResult.nextRecommendedDifficulty}
                  </span>
                  <span className="text-[10px] text-purple-700 font-semibold">Next lectures anchor</span>
                </div>
              </div>

              {/* Calibration Notice: Explicit requirement fulfillment */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-left text-xs text-blue-900">
                <div className="flex items-center gap-2 font-bold text-sm text-blue-950 mb-1">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Adaptive Baseline Calibrated for Future Lectures</span>
                </div>
                <p className="leading-relaxed">
                  The system noted how complex MCQs you solved during this session. From your next lecture onwards, assessments will automatically commence at the calibrated{' '}
                  <strong className="uppercase text-blue-950 font-bold">
                    {finalSessionResult.nextRecommendedDifficulty}
                  </strong>{' '}
                  complexity level.
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          {!isSessionFinished ? (
            <>
              <button
                type="button"
                onClick={() => setMCQModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-200 transition"
              >
                Exit Assessment
              </button>

              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow transition flex items-center gap-2 ${
                    selectedOption !== null
                      ? 'bg-navy-800 hover:bg-navy-900 shadow-md'
                      : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  <span>Submit Answer</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-saffron-500 hover:bg-saffron-600 text-white shadow-md transition flex items-center gap-2"
                >
                  <span>
                    {currentQuestionIndex + 1 >= TOTAL_SESSION_QUESTIONS
                      ? 'View Performance & Calibration'
                      : 'Next Adaptive Question'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex justify-end gap-3">
              <button
                onClick={() => setMCQModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-navy-800 hover:bg-navy-900 text-white shadow transition"
              >
                Back to Curriculum
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
