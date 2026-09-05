import type { ExamSection } from "./question";

export interface SubjectMeta {
  id: string;
  name: string;
  section: ExamSection;
  icon?: string;
  color?: string;
  description?: string;
}

export interface TopicMeta {
  id: string;
  subjectId: string;
  name: string;
  weightage?: number;
  pyqAvailable?: boolean;
}

export interface MarkingScheme {
  correct: number;
  incorrect: number;
  unanswered: number;
}

export interface PyqPaper {
  id: string;
  year: number;
  title: string;
  subject: string;
  section: ExamSection;
  durationMinutes: number;
  totalQuestions: number;
  markingScheme: MarkingScheme;
}
