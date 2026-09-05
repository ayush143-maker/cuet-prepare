import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { DashboardStats, QuizResult } from "@/types";
import { STORAGE_KEYS } from "@/lib/storage";

interface AnalyticsState {
  attempts: QuizResult[];
  addAttempt: (attempt: QuizResult) => void;
  clearHistory: () => void;
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set) => ({
      attempts: [],

      addAttempt: (attempt) => {
        set((state) => ({
          attempts: [attempt, ...state.attempts].slice(0, 50),
        }));
      },

      clearHistory: () => {
        set({
          attempts: [],
        });
      },
    }),
    {
      name: STORAGE_KEYS.attempts,
    }
  )
);

export function getDashboardStats(attempts: QuizResult[]): DashboardStats {
  const totalAttempts = attempts.length;

  const totalQuestionsSolved = attempts.reduce(
    (total, attempt) => total + attempt.answers.length,
    0
  );

  const averageAccuracy =
    totalAttempts > 0
      ? Math.round(
          attempts.reduce((total, attempt) => total + attempt.accuracy, 0) /
            totalAttempts
        )
      : 0;

  const totalTimeTakenSeconds = attempts.reduce(
    (total, attempt) => total + attempt.totalTimeTakenSeconds,
    0
  );

  const averageTimePerQuestionSeconds =
    totalQuestionsSolved > 0
      ? Math.round(totalTimeTakenSeconds / totalQuestionsSolved)
      : 0;

  const average = (items: QuizResult[]) => {
    if (items.length === 0) return 0;

    return Math.round(
      items.reduce((total, item) => total + item.accuracy, 0) / items.length
    );
  };

  const recentAttempts = attempts.slice(0, 3);
  const previousAttempts = attempts.slice(3, 6);

  const recentAverage = average(recentAttempts);
  const previousAverage = average(previousAttempts);

  let weeklyGrowthPercentage = recentAverage - previousAverage;

  if (previousAverage === 0 && recentAverage > 0) {
    weeklyGrowthPercentage = recentAverage;
  }

  if (previousAverage === 0 && recentAverage === 0) {
    weeklyGrowthPercentage = 0;
  }

  return {
    totalAttempts,
    totalQuestionsSolved,
    averageAccuracy,
    averageTimePerQuestionSeconds,
    weeklyGrowthPercentage,
  };
}
