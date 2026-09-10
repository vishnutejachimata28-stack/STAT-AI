import { DifficultyLevel, MCQAttempt, StudyMode } from '../types';

export const DIFFICULTY_WEIGHTS: Record<DifficultyLevel, number> = {
  easy: 1.0,
  moderate: 2.0,
  hard: 3.5,
  expert: 5.0,
};

export const DIFFICULTY_LABELS: Record<DifficultyLevel, { label: string; color: string; bg: string; badge: string }> = {
  easy: {
    label: 'Foundational / Easy',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50 border-emerald-200',
    badge: '1.0x Weight',
  },
  moderate: {
    label: 'Moderate / Standard',
    color: 'text-amber-700',
    bg: 'bg-amber-50 border-amber-200',
    badge: '2.0x Weight',
  },
  hard: {
    label: 'Advanced / Hard',
    color: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-200',
    badge: '3.5x Weight',
  },
  expert: {
    label: 'Expert / Apex Policy',
    color: 'text-purple-700',
    bg: 'bg-purple-50 border-purple-200',
    badge: '5.0x Weight',
  },
};

/**
 * Calculates the next difficulty level based on whether the current question was answered correctly
 */
export function getNextDifficulty(current: DifficultyLevel, isCorrect: boolean): DifficultyLevel {
  if (isCorrect) {
    switch (current) {
      case 'easy':
        return 'moderate';
      case 'moderate':
        return 'hard';
      case 'hard':
        return 'expert';
      case 'expert':
        return 'expert'; // already at top
    }
  } else {
    switch (current) {
      case 'expert':
        return 'hard';
      case 'hard':
        return 'moderate';
      case 'moderate':
        return 'easy';
      case 'easy':
        return 'easy'; // already at floor
    }
  }
}

/**
 * Calculates a normalized score (0 - 100) taking into account:
 * - Difficulty weight of each attempted question
 * - Accuracy ratio
 * - Consistency streak bonus
 */
export function calculateNormalizedScore(attempts: MCQAttempt[]): {
  normalizedScore: number;
  rawAccuracy: number;
  weightedScore: number;
  maxPossibleWeighted: number;
} {
  if (attempts.length === 0) {
    return { normalizedScore: 0, rawAccuracy: 0, weightedScore: 0, maxPossibleWeighted: 0 };
  }

  let totalWeight = 0;
  let earnedWeight = 0;
  let correctCount = 0;
  let currentStreak = 0;
  let maxStreak = 0;

  attempts.forEach((att) => {
    const weight = DIFFICULTY_WEIGHTS[att.difficulty];
    totalWeight += weight;
    if (att.isCorrect) {
      earnedWeight += weight;
      correctCount++;
      currentStreak++;
      if (currentStreak > maxStreak) maxStreak = currentStreak;
    } else {
      currentStreak = 0;
    }
  });

  const rawAccuracy = correctCount / attempts.length;
  const weightedRatio = totalWeight > 0 ? earnedWeight / totalWeight : 0;
  
  // Streak multiplier gives up to 10% bonus for consecutive correct answers
  const streakBonus = Math.min(1.10, 1 + (maxStreak * 0.025));

  // Normalized score scaled out of 100
  let norm = weightedRatio * 100 * (0.85 + 0.15 * rawAccuracy) * streakBonus;
  norm = Math.min(100, Math.max(0, Math.round(norm * 10) / 10));

  return {
    normalizedScore: norm,
    rawAccuracy: Math.round(rawAccuracy * 100),
    weightedScore: Math.round(earnedWeight * 10) / 10,
    maxPossibleWeighted: Math.round(totalWeight * 10) / 10,
  };
}

/**
 * Calibrates the permanent baseline difficulty for subsequent lectures based on performance
 */
export function recalibrateBaselineDifficulty(
  currentBaseline: DifficultyLevel,
  recentAttempts: MCQAttempt[]
): DifficultyLevel {
  if (recentAttempts.length < 3) return currentBaseline;

  // Examine the last 4 attempts or all if fewer
  const lastN = recentAttempts.slice(-4);
  const correctCount = lastN.filter(a => a.isCorrect).length;
  const hardOrExpertCorrect = lastN.filter(a => a.isCorrect && (a.difficulty === 'hard' || a.difficulty === 'expert')).length;
  const easyOrModFailed = lastN.filter(a => !a.isCorrect && (a.difficulty === 'easy' || a.difficulty === 'moderate')).length;

  if (hardOrExpertCorrect >= 2 && correctCount >= 3) {
    // Elevate baseline
    if (currentBaseline === 'easy') return 'moderate';
    if (currentBaseline === 'moderate') return 'hard';
    if (currentBaseline === 'hard') return 'expert';
    return 'expert';
  }

  if (easyOrModFailed >= 2 && correctCount <= 1) {
    // Drop baseline for foundation support
    if (currentBaseline === 'expert') return 'hard';
    if (currentBaseline === 'hard') return 'moderate';
    if (currentBaseline === 'moderate') return 'easy';
    return 'easy';
  }

  return currentBaseline;
}

/**
 * Computes All-India rank and percentile based on cumulative normalized score and study mode
 */
export function computeAllIndiaRanking(
  normalizedScore: number,
  totalQuizzes: number,
  mode: StudyMode
): { rank: number; percentile: number; designationTier: string; cadreTotal: number } {
  const CADRE_POPULATION = 48500; // Simulated active national civil service / statistical cadre
  
  // Base percentile mapped to normalized score
  let basePercentile = Math.min(99.8, Math.max(15, (normalizedScore * 0.95) + (Math.min(totalQuizzes, 10) * 0.5)));
  if (mode === 'expert') basePercentile = Math.min(99.9, basePercentile + 1.5);
  if (mode === 'beginner') basePercentile = Math.max(10, basePercentile - 1.0);

  const roundedPercentile = Math.round(basePercentile * 10) / 10;
  const rank = Math.max(1, Math.round(CADRE_POPULATION * (1 - (roundedPercentile / 100))));

  let designationTier = 'Junior Statistical Trainee (Probation)';
  if (roundedPercentile >= 98) {
    designationTier = 'Principal Statistical Advisor / Fellow';
  } else if (roundedPercentile >= 90) {
    designationTier = 'Director (National Accounts / MoSPI)';
  } else if (roundedPercentile >= 75) {
    designationTier = 'Senior Statistical Officer (SSO)';
  } else if (roundedPercentile >= 50) {
    designationTier = 'Junior Statistical Officer (JSO)';
  }

  return {
    rank,
    percentile: roundedPercentile,
    designationTier,
    cadreTotal: CADRE_POPULATION,
  };
}
