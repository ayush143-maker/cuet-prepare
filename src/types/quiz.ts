import type { Difficulty, ExamSection } from "./question";
import type { TopicStat, SubjectStat } from "./analytics";

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

export type DifficultyFilter = Difficulty | "mixed";

export interface QuizConfig {
  mode: QuizMode;
  title: string;
  section?: ExamSection;
  subject?: string;
  topics?: string[];
  difficulty?: DifficultyFilter;
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
  scoreDelta: number;
}

export interface QuizResult {
  id: string;
  sessionId: string;
  title: string;
  date: string;
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
