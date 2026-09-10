import React, { useState } from 'react';
import {
  X,
  Layers,
  Clock,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CUMULATIVE_ASSESSMENTS, MCQ_QUESTIONS_BANK } from '../data/mcqQuestions';
import { useLearning } from '../context/LearningContext';

export const CumulativeAssessmentModal: React.FC = () => {
  const { isCumulativeModalOpen, setCumulativeModalOpen } = useLearning();

  const [selectedAssessmentId, setSelectedAssessmentId] = useState(CUMULATIVE_ASSESSMENTS[0].id);
  const [examStarted, setExamStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const activeAssessment = CUMULATIVE_ASSESSMENTS.find((a) => a.id === selectedAssessmentId) || CUMULATIVE_ASSESSMENTS[0];

  // Subset of questions for cumulative exam
  const examQuestions = MCQ_QUESTIONS_BANK.slice(0, 6);

  if (!isCumulativeModalOpen) return null;

  const handleSelectOption = (optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleFinishExam = () => {
    let correct = 0;
    examQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) {
        correct++;
      }
    });
    const calculatedScore = Math.round((correct / examQuestions.length) * 100);
    setScore(calculatedScore);
    setIsCompleted(true);

    if (calculatedScore >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  };

  const resetExam = () => {
    setExamStarted(false);
    setIsCompleted(false);
    setCurrentIdx(0);
    setAnswers({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col">
        {/* Tricolor */}
        <div className="tricolor-strip rounded-t-2xl" />

        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-navy-800 text-saffron-500 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy-950">
                Cumulative Cadre Assessments
              </h3>
              <p className="text-xs text-slate-500">
                Multi-topic comprehensive retention tests & certifications
              </p>
            </div>
          </div>
          <button
            onClick={() => setCumulativeModalOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          {!examStarted ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Select a cumulative examination to benchmark your combined proficiency across constitutional statistics, CPI compilation, and National Accounts:
              </p>

              <div className="space-y-3">
                {CUMULATIVE_ASSESSMENTS.map((exam) => (
                  <div
                    key={exam.id}
                    onClick={() => setSelectedAssessmentId(exam.id)}
                    className={`p-4 rounded-xl border transition cursor-pointer ${
                      selectedAssessmentId === exam.id
                        ? 'bg-navy-50/70 border-navy-800 ring-2 ring-navy-800/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-saffron-100 text-saffron-800">
                        {exam.domain}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {exam.timeLimitMinutes} Mins
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-navy-950 mt-2">{exam.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{exam.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {exam.topicsCovered.map((t, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setExamStarted(true)}
                className="w-full mt-4 py-3 rounded-xl bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Begin Cumulative Examination</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : !isCompleted ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-600">
                  Question {currentIdx + 1} of {examQuestions.length}
                </span>
                <span className="text-slate-400 font-mono">
                  Total Answered: {Object.keys(answers).length}/{examQuestions.length}
                </span>
              </div>

              {/* Question */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-saffron-600 block mb-1">
                  Tier: {examQuestions[currentIdx].difficulty.toUpperCase()}
                </span>
                <p className="text-sm font-bold text-slate-900 leading-relaxed">
                  {examQuestions[currentIdx].question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {examQuestions[currentIdx].options.map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition flex items-start gap-2.5 ${
                      answers[currentIdx] === oIdx
                        ? 'bg-navy-800 text-white border-navy-800 shadow'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span className="font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                    <span>{opt}</span>
                  </div>
                ))}
              </div>

              {/* Exam Controls */}
              <div className="flex justify-between items-center pt-4">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((p) => p - 1)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 disabled:opacity-40"
                >
                  Previous
                </button>

                {currentIdx + 1 < examQuestions.length ? (
                  <button
                    onClick={() => setCurrentIdx((p) => p + 1)}
                    className="px-4 py-1.5 text-xs font-bold rounded-lg bg-navy-800 text-white shadow"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={handleFinishExam}
                    className="px-5 py-2 text-xs font-bold rounded-lg bg-govgreen-700 hover:bg-govgreen-800 text-white shadow"
                  >
                    Submit Complete Assessment
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Completed cumulative exam */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-navy-950">Assessment Evaluated</h3>
              <div className="text-3xl font-black text-navy-900">{score}%</div>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                {score >= 70
                  ? 'Excellent proficiency! Your multi-topic cumulative mastery has been credited to your IOSS official training transcript.'
                  : 'Assessment recorded. Review the lecture modules to enhance your cumulative retention.'}
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={resetExam}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 text-slate-700"
                >
                  Try Another Assessment
                </button>
                <button
                  onClick={() => setCumulativeModalOpen(false)}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-navy-800 text-white"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
