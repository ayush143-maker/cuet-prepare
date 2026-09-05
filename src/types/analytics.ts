export interface TopicStat {
  subject: string;
  topic: string;
  total: number;
  correct: number;
  incorrect: number;
  skipped: number;
  accuracy: number;
  avgTimeSeconds: number;
}

export interface SubjectStat {
  subject: string;
  total: number;
  correct: number;
  incorrect: number;
  skipped: number;
  accuracy: number;
  avgTimeSeconds: number;
}

export interface AttemptHistoryItem {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  accuracy: number;
  timeTaken: string;
  date: string;
}

export interface DashboardStats {
  totalAttempts: number;
  totalQuestionsSolved: number;
  averageAccuracy: number;
  averageTimePerQuestionSeconds: number;
  weeklyGrowthPercentage: number;
}

export interface Recommendation {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}
