import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Target,
  Wrench,
  UserCheck,
  ArrowRight,
  BookOpen,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { COURSES_DATA } from '../data/coursesData';
import { useLearning } from '../context/LearningContext';

export const PromptSearch: React.FC = () => {
  const { setActiveLecture, addSearchHistory } = useLearning();

  const [aim, setAim] = useState('');
  const [skill, setSkill] = useState('');
  const [author, setAuthor] = useState('');
  const [matchedNotification, setMatchedNotification] = useState<string | null>(null);

  const PRESET_PROMPTS = [
    {
      title: 'Retail Inflation & CPI Indexation',
      aim: 'Master CPI combined basket and inflation modeling',
      skill: 'Jevons Formula & Base Year 2012 Weighting',
      author: 'Price Statistics Division (PSD)',
      courseId: 'cpi-inflation-compilation',
    },
    {
      title: 'IOSS Architecture & Statistics Act',
      aim: 'Understand official data governance & Collection of Statistics Act',
      skill: 'Statutory Data Auditing & NQAF Standards',
      author: 'Dr. T.C.A. Anant (Former CSI)',
      courseId: 'ioss-stat-system',
    },
    {
      title: 'GDP & GVA Estimation Framework',
      aim: 'Learn System of National Accounts & MCA-21 Integration',
      skill: 'GVA at Basic Prices Calculation & Double Deflation',
      author: 'Prof. P.C. Mahalanobis Fellow (NAD CSO)',
      courseId: 'national-accounts-gdp',
    },
    {
      title: 'NSSO Stratified Multi-Stage Sampling',
      aim: 'Formulate nationwide socioeconomic sample design',
      skill: 'Primary Sampling Units & Multiplier Weights',
      author: 'Survey Design and Research Division (SDRD)',
      courseId: 'nsso-sampling-design',
    },
  ];

  const handleApplyPreset = (p: typeof PRESET_PROMPTS[0]) => {
    setAim(p.aim);
    setSkill(p.skill);
    setAuthor(p.author);
    executeSearch(p.aim, p.skill, p.author, p.courseId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aim.trim() && !skill.trim() && !author.trim()) return;

    // Search algorithm: score courses based on keywords in aim, skill, author
    const queryTokens = `${aim} ${skill} ${author}`.toLowerCase().split(/\s+/);
    let bestCourse = COURSES_DATA[0];
    let maxScore = -1;

    COURSES_DATA.forEach((course) => {
      let score = 0;
      const searchable = `${course.title} ${course.aim} ${course.targetSkill} ${course.author} ${course.tags.join(' ')}`.toLowerCase();
      queryTokens.forEach((token) => {
        if (token.length > 2 && searchable.includes(token)) {
          score += 2;
        }
      });
      if (score > maxScore) {
        maxScore = score;
        bestCourse = course;
      }
    });

    executeSearch(aim, skill, author, bestCourse.id);
  };

  const executeSearch = (searchAim: string, searchSkill: string, searchAuthor: string, targetCourseId: string) => {
    const course = COURSES_DATA.find((c) => c.id === targetCourseId) || COURSES_DATA[0];
    const fullQuery = `Aim: ${searchAim || 'Any'} | Skill: ${searchSkill || 'Any'} | Faculty: ${searchAuthor || 'Official'}`;

    addSearchHistory(searchAim, searchSkill, searchAuthor, fullQuery);

    setMatchedNotification(`Found matching course: "${course.title}". Guiding you to Part 1...`);
    setTimeout(() => {
      setActiveLecture(course.id, 1);
      setMatchedNotification(null);
      // Smooth scroll to lecture container
      document.getElementById('lecture-container')?.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-saffron-500/10 text-saffron-600 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-navy-950">
              Adaptive Requirement & Goal Prompter
            </h2>
            <p className="text-xs text-slate-500">
              State your learning aim, target competency, and preferred faculty to automatically load the structured lecture
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 self-start">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>Auto-splits lengthy topics into sequential parts</span>
        </div>
      </div>

      {matchedNotification && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{matchedNotification}</span>
        </div>
      )}

      {/* Input Form with Aim, Skill, and Author */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Aim / Goal */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-saffron-500" />
              <span>Aim / Objective</span>
            </label>
            <input
              type="text"
              value={aim}
              onChange={(e) => setAim(e.target.value)}
              placeholder="e.g. Master CPI & Inflation modeling"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-600 text-xs font-medium placeholder:text-slate-400"
            />
          </div>

          {/* Skill to Learn */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Wrench className="w-3.5 h-3.5 text-blue-600" />
              <span>Specific Skill</span>
            </label>
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="e.g. Jevons Formula, Base revision"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-600 text-xs font-medium placeholder:text-slate-400"
            />
          </div>

          {/* Preferred Author / Ministry */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-govgreen-600" />
              <span>Preferred Author / Dept</span>
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. MoSPI PSD, Dr. T.C.A. Anant"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-600 text-xs font-medium placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Quick Prompts:</span>
            {PRESET_PROMPTS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition font-medium text-left"
              >
                {p.title}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-900 text-white text-xs font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Generate Adaptive Lecture</span>
            <ArrowRight className="w-3.5 h-3.5 text-saffron-400" />
          </button>
        </div>
      </form>
    </div>
  );
};
