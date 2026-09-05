import type { Difficulty, ExamSection } from "./question";

export type QuizMode =
  | "practice"
  | "pyq"
  | "mock";

export type QuizStatus =
  | "not-started"
  | "active"
  | "paused"
  | "submitted";

export type AnswerStatus =
  | "correct"
  | "incorrect"
  | "skipped";

export interface QuizConfig {
  mode: QuizMode;
  title: string;
  section?: ExamSection;
  subject?: string;
  topics?: string[];
  difficulty?: Difficulty;
  year?: number;
  questionCount: number;
  timeLimitSeconds: number;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  showExplanationAfterSubmit: boolean;
  showExplanationInstantly: boolean;
}

export interface QuizSession {
  id: string;
  config: QuizConfig;
  status: QuizStatus;
  startedAt?: string;
  submittedAt?: string;
  currentIndex: number;
  remainingSeconds: number;
  answers: Record<string, number | null>;
  markedForReview: Record<string, boolean>;
}

export interface AnswerRecord {
  questionId: string;
  selectedIndex: number | null;
  correctIndex: number;
  status: AnswerStatus;
  timeTakenSeconds: number;
}

export interface QuizResult {
  id: string;
  sessionId: string;
  score: number;
  maxScore: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  accuracy: number;
  totalTimeTakenSeconds: number;
  answers: AnswerRecord[];
  topicStats: TopicStat[];
  subjectStats: SubjectStat[];
}

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
