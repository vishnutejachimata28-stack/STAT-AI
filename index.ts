export type StudyMode = 'beginner' | 'moderate' | 'expert';

export type DifficultyLevel = 'easy' | 'moderate' | 'hard' | 'expert';

export interface UserPro {
  id: string;
  aadhaarName: string;
  dob: string;
  phone: string;
  email: string;
  govtId: string; // e.g. "IOSS-2024-8921" or "MoSPI/ISS/0442"
  organization: string; // Ministry / Department / Cadre
  modeOfStudy: StudyMode;
  pin: string;
  registeredAt: string;
  baselineDifficulty: DifficultyLevel;
  totalScore: number;
  normalizedScore: number;
  allIndiaRank: number;
  percentile: number;
}

export interface LecturePart {
  partNumber: number;
  title: string;
  estimatedMinutes: number;
  summary: string;
  content: {
    overview: string;
    sections: {
      heading: string;
      body: string[];
      keyTakeaway?: string;
      circularRef?: string;
    }[];
    diagram?: {
      type: 'flow' | 'matrix' | 'hierarchy';
      title: string;
      caption: string;
      nodes: { id: string; label: string; subtext?: string; type?: 'input' | 'process' | 'output' | 'highlight' }[];
      connections: { from: string; to: string; label?: string }[];
    };
    video?: {
      title: string;
      duration: string;
      instructor: string;
      videoUrl: string; // e.g. embedded video player preview
      transcriptSnippet: string;
    };
  };
}

export interface CourseLecture {
  id: string;
  title: string;
  domain: string; // e.g., "Indian Official Statistical System (IOSS)", "Civil Service Governance"
  aim: string;
  targetSkill: string;
  author: string;
  authorDesignation: string;
  ministryDepartment: string;
  parts: LecturePart[];
  recommendedLevel: StudyMode;
  tags: string[];
}

export interface MCQQuestion {
  id: string;
  lectureId: string;
  partNumber?: number;
  difficulty: DifficultyLevel; // 'easy' | 'moderate' | 'hard' | 'expert'
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
  statConceptRef?: string; // Reference to official statistics manual or act
}

export interface MCQAttempt {
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
  difficulty: DifficultyLevel;
  timestamp: string;
}

export interface QuizSessionResult {
  lectureId: string;
  lectureTitle: string;
  date: string;
  attempts: MCQAttempt[];
  startingDifficulty: DifficultyLevel;
  endingDifficulty: DifficultyLevel;
  nextRecommendedDifficulty: DifficultyLevel;
  rawScore: number;
  normalizedScore: number;
  accuracy: number;
}

export interface UserProgressState {
  completedLectures: string[]; // lecture IDs
  completedParts: { [lectureId: string]: number[] }; // lectureId -> completed partNumbers
  inProgressLectures: string[]; // lecture IDs
  recentSearches: {
    queryText: string;
    aim: string;
    skill: string;
    author: string;
    timestamp: string;
  }[];
  historyLog: {
    id: string;
    type: 'search' | 'lecture_view' | 'part_completed' | 'mcq_finished' | 'mode_changed';
    title: string;
    detail: string;
    timestamp: string;
  }[];
  quizSessions: QuizSessionResult[];
  calibratedBaselineDifficulty: DifficultyLevel;
}

export interface CumulativeAssessment {
  id: string;
  title: string;
  domain: string;
  description: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  topicsCovered: string[];
}
