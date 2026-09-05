export type ExamSection =
  | "language"
  | "domain"
  | "general";

export type Difficulty =
  | "easy"
  | "medium"
  | "hard";

export type QuestionSource =
  | "sample"
  | "pyq"
  | "mock"
  | "user";

export interface Question {
  id: string;
  section: ExamSection;
  subject: string;
  topic: string;
  subtopic?: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  year?: number;
  paperId?: string;
  source: QuestionSource;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}
