import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DifficultyLevel,
  QuizSessionResult,
  UserProgressState,
} from '../types';
import { useAuth } from './AuthContext';
import {
  recalibrateBaselineDifficulty,
  computeAllIndiaRanking,
} from '../utils/adaptiveEngine';

interface LearningContextType {
  progress: UserProgressState;
  activeLectureId: string | null;
  activePartNumber: number;
  isDrawerOpen: boolean;
  isMCQModalOpen: boolean;
  isLeaderboardOpen: boolean;
  isAuthModalOpen: boolean;
  isCumulativeModalOpen: boolean;
  isModeModalOpen: boolean;
  setActiveLecture: (lectureId: string | null, partNumber?: number) => void;
  setDrawerOpen: (open: boolean) => void;
  setMCQModalOpen: (open: boolean) => void;
  setLeaderboardOpen: (open: boolean) => void;
  setAuthModalOpen: (open: boolean) => void;
  setCumulativeModalOpen: (open: boolean) => void;
  setModeModalOpen: (open: boolean) => void;
  markPartCompleted: (lectureId: string, partNumber: number) => void;
  markLectureCompleted: (lectureId: string) => void;
  addSearchHistory: (aim: string, skill: string, author: string, queryText: string) => void;
  recordQuizSession: (sessionResult: QuizSessionResult) => void;
  getLecturesCompletedCount: () => number;
  getLecturesInProgressCount: () => number;
  getLecturesNeedToCompleteCount: () => number;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

const INITIAL_PROGRESS: UserProgressState = {
  completedLectures: ['ioss-stat-system'],
  completedParts: {
    'ioss-stat-system': [1, 2],
    'cpi-inflation-compilation': [1],
  },
  inProgressLectures: ['cpi-inflation-compilation', 'national-accounts-gdp'],
  recentSearches: [
    {
      queryText: 'Learn CPI base year revision and urban-rural weighting by MoSPI PSD',
      aim: 'Master CPI and Inflation Indexation',
      skill: 'Jevons Formula & Base Year Weighting',
      author: 'Price Statistics Division (PSD)',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      queryText: 'Understand Collection of Statistics Act 2008 provisions and penalties',
      aim: 'Legal Framework of Official Statistics',
      skill: 'Statutory Data Auditing',
      author: 'Dr. T.C.A. Anant',
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    }
  ],
  historyLog: [
    {
      id: 'h-1',
      type: 'lecture_view',
      title: 'Accessed Indian Official Statistical System',
      detail: 'Completed Part 1: Constitutional Mandate & Historical Evolution',
      timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    },
    {
      id: 'h-2',
      type: 'mcq_finished',
      title: 'Adaptive Assessment: IOSS Statutory Act',
      detail: 'Solved Moderate & Hard MCQs with 85% accuracy. Baseline set to Moderate.',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'h-3',
      type: 'part_completed',
      title: 'Completed CPI Part 1: Basket Structure',
      detail: 'Reviewed Food & Beverage 45.86% weight and rural housing zero-weight rationale.',
      timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    }
  ],
  quizSessions: [],
  calibratedBaselineDifficulty: 'moderate',
};

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateUserBaseline, updateUserScores } = useAuth();

  const [progress, setProgress] = useState<UserProgressState>(() => {
    const saved = localStorage.getItem('igot_learning_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing saved progress', e);
      }
    }
    return INITIAL_PROGRESS;
  });

  const [activeLectureId, setActiveLectureId] = useState<string | null>('ioss-stat-system');
  const [activePartNumber, setActivePartNumber] = useState<number>(1);
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isMCQModalOpen, setMCQModalOpen] = useState<boolean>(false);
  const [isLeaderboardOpen, setLeaderboardOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [isCumulativeModalOpen, setCumulativeModalOpen] = useState<boolean>(false);
  const [isModeModalOpen, setModeModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('igot_learning_progress', JSON.stringify(progress));
  }, [progress]);

  // Sync user's baseline difficulty if user changes
  useEffect(() => {
    if (user?.baselineDifficulty && user.baselineDifficulty !== progress.calibratedBaselineDifficulty) {
      setProgress((prev) => ({ ...prev, calibratedBaselineDifficulty: user.baselineDifficulty }));
    }
  }, [user?.baselineDifficulty]);

  const setActiveLecture = (lectureId: string | null, partNumber: number = 1) => {
    setActiveLectureId(lectureId);
    setActivePartNumber(partNumber);
    if (lectureId) {
      setProgress((prev) => {
        const inProg = prev.inProgressLectures.includes(lectureId)
          ? prev.inProgressLectures
          : [...prev.inProgressLectures, lectureId];
        return {
          ...prev,
          inProgressLectures: inProg,
          historyLog: [
            {
              id: `h-${Date.now()}`,
              type: 'lecture_view',
              title: `Opened Lecture: ${lectureId}`,
              detail: `Navigated to Part ${partNumber}`,
              timestamp: new Date().toISOString(),
            },
            ...prev.historyLog.slice(0, 49),
          ],
        };
      });
    }
  };

  const markPartCompleted = (lectureId: string, partNumber: number) => {
    setProgress((prev) => {
      const existing = prev.completedParts[lectureId] || [];
      const updatedParts = existing.includes(partNumber) ? existing : [...existing, partNumber];

      return {
        ...prev,
        completedParts: {
          ...prev.completedParts,
          [lectureId]: updatedParts,
        },
        historyLog: [
          {
            id: `h-${Date.now()}`,
            type: 'part_completed',
            title: `Completed Part ${partNumber}`,
            detail: `Progress recorded in lecture ${lectureId}`,
            timestamp: new Date().toISOString(),
          },
          ...prev.historyLog.slice(0, 49),
        ],
      };
    });
  };

  const markLectureCompleted = (lectureId: string) => {
    setProgress((prev) => {
      const isCompleted = prev.completedLectures.includes(lectureId);
      const completed = isCompleted ? prev.completedLectures : [...prev.completedLectures, lectureId];
      const inProg = prev.inProgressLectures.filter((id) => id !== lectureId);

      return {
        ...prev,
        completedLectures: completed,
        inProgressLectures: inProg,
        historyLog: [
          {
            id: `h-${Date.now()}`,
            type: 'lecture_view',
            title: `Completed Course: ${lectureId}`,
            detail: 'All module parts and assessments marked satisfied.',
            timestamp: new Date().toISOString(),
          },
          ...prev.historyLog.slice(0, 49),
        ],
      };
    });
  };

  const addSearchHistory = (aim: string, skill: string, author: string, queryText: string) => {
    setProgress((prev) => ({
      ...prev,
      recentSearches: [
        {
          aim,
          skill,
          author,
          queryText,
          timestamp: new Date().toISOString(),
        },
        ...prev.recentSearches.filter((s) => s.queryText !== queryText).slice(0, 19),
      ],
      historyLog: [
        {
          id: `h-${Date.now()}`,
          type: 'search',
          title: `Goal Search: ${aim || queryText}`,
          detail: `Skill: ${skill || 'General'} | Faculty: ${author || 'Official'}`,
          timestamp: new Date().toISOString(),
        },
        ...prev.historyLog.slice(0, 49),
      ],
    }));
  };

  const recordQuizSession = (sessionResult: QuizSessionResult) => {
    // 1. Recalibrate baseline difficulty for subsequent lectures
    const currentBaseline = progress.calibratedBaselineDifficulty;
    const newBaseline = recalibrateBaselineDifficulty(currentBaseline, sessionResult.attempts);

    // 2. Compute updated normalized ranking
    const allSessions = [sessionResult, ...progress.quizSessions];
    const avgNormalized = Math.round(
      allSessions.reduce((acc, s) => acc + s.normalizedScore, 0) / allSessions.length
    );
    const rankingInfo = computeAllIndiaRanking(
      avgNormalized,
      allSessions.length,
      user?.modeOfStudy || 'moderate'
    );

    // 3. Update learning progress state
    setProgress((prev) => ({
      ...prev,
      quizSessions: [sessionResult, ...prev.quizSessions],
      calibratedBaselineDifficulty: newBaseline,
      historyLog: [
        {
          id: `h-${Date.now()}`,
          type: 'mcq_finished',
          title: `Completed Quiz on ${sessionResult.lectureTitle}`,
          detail: `Score: ${sessionResult.normalizedScore}% (${sessionResult.accuracy}% Accuracy). Baseline calibrated to: ${newBaseline.toUpperCase()}`,
          timestamp: new Date().toISOString(),
        },
        ...prev.historyLog.slice(0, 49),
      ],
    }));

    // 4. Update auth user state
    updateUserBaseline(newBaseline);
    updateUserScores(avgNormalized, rankingInfo.rank, rankingInfo.percentile);
  };

  const getLecturesCompletedCount = () => progress.completedLectures.length;
  const getLecturesInProgressCount = () => progress.inProgressLectures.length;
  const getLecturesNeedToCompleteCount = () => {
    // Total courses (4) minus completed
    return Math.max(0, 4 - progress.completedLectures.length);
  };

  return (
    <LearningContext.Provider
      value={{
        progress,
        activeLectureId,
        activePartNumber,
        isDrawerOpen,
        isMCQModalOpen,
        isLeaderboardOpen,
        isAuthModalOpen,
        isCumulativeModalOpen,
        isModeModalOpen,
        setActiveLecture,
        setDrawerOpen,
        setMCQModalOpen,
        setLeaderboardOpen,
        setAuthModalOpen,
        setCumulativeModalOpen,
        setModeModalOpen,
        markPartCompleted,
        markLectureCompleted,
        addSearchHistory,
        recordQuizSession,
        getLecturesCompletedCount,
        getLecturesInProgressCount,
        getLecturesNeedToCompleteCount,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
