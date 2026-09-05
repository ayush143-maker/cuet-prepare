export interface SubjectMeta {
  id: string;
  name: string;
  section: "language" | "domain" | "general";
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

export interface PyqPaper {
  id: string;
  year: number;
  title: string;
  subject: string;
  section: string;
  durationMinutes: number;
  totalQuestions: number;
  markingScheme: MarkingScheme;
}

export interface MarkingScheme {
  correct: number;
  incorrect: number;
  unanswered: number;
}
