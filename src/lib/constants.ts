import type {
  MarkingScheme,
  PyqPaper,
  SubjectMeta,
  TopicMeta,
} from "@/types/cuet";

export const APP_NAME = "CUET Prep Arena";

export const APP_ROUTES = {
  home: "/",
  practice: "/practice",
  pyq: "/pyq",
  dashboard: "/dashboard",
  quiz: "/quiz",
  results: "/results",
} as const;

export const SUBJECTS: SubjectMeta[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    section: "domain",
    color: "#6366f1",
    description: "Algebra, Calculus, Probability, Matrices and more.",
  },
  {
    id: "physics",
    name: "Physics",
    section: "domain",
    color: "#22d3ee",
    description: "Mechanics, Optics, Electricity and modern physics.",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    section: "domain",
    color: "#34d399",
    description: "Organic, Inorganic and Physical chemistry.",
  },
  {
    id: "biology",
    name: "Biology",
    section: "domain",
    color: "#f472b6",
    description: "Botany, Zoology and human biology.",
  },
  {
    id: "english",
    name: "English",
    section: "language",
    color: "#fbbf24",
    description: "Reading comprehension, grammar and vocabulary.",
  },
  {
    id: "history",
    name: "History",
    section: "domain",
    color: "#fb7185",
    description: "Ancient, medieval and modern history.",
  },
  {
    id: "political-science",
    name: "Political Science",
    section: "domain",
    color: "#a78bfa",
    description: "Constitution, political theory and governance.",
  },
  {
    id: "economics",
    name: "Economics",
    section: "domain",
    color: "#38bdf8",
    description: "Micro, macro and Indian economic development.",
  },
  {
    id: "general-test",
    name: "General Test",
    section: "general",
    color: "#e879f9",
    description: "Reasoning, quantitative aptitude and current affairs.",
  },
];

export const TOPICS: TopicMeta[] = [
  {
    id: "math_matrices",
    subjectId: "mathematics",
    name: "Matrices",
    weightage: 8,
    pyqAvailable: true,
  },
  {
    id: "math_probability",
    subjectId: "mathematics",
    name: "Probability",
    weightage: 10,
    pyqAvailable: true,
  },
  {
    id: "math_calculus",
    subjectId: "mathematics",
    name: "Calculus",
    weightage: 12,
    pyqAvailable: true,
  },
  {
    id: "physics_mechanics",
    subjectId: "physics",
    name: "Mechanics",
    weightage: 12,
    pyqAvailable: true,
  },
  {
    id: "physics_current_electricity",
    subjectId: "physics",
    name: "Current Electricity",
    weightage: 9,
    pyqAvailable: true,
  },
  {
    id: "english_grammar",
    subjectId: "english",
    name: "Grammar",
    weightage: 10,
    pyqAvailable: true,
  },
  {
    id: "english_rc",
    subjectId: "english",
    name: "Reading Comprehension",
    weightage: 12,
    pyqAvailable: true,
  },
  {
    id: "general_logical_reasoning",
    subjectId: "general-test",
    name: "Logical Reasoning",
    weightage: 14,
    pyqAvailable: true,
  },
  {
    id: "general_quant",
    subjectId: "general-test",
    name: "Quantitative Aptitude",
    weightage: 12,
    pyqAvailable: true,
  },
  {
    id: "history_modern_india",
    subjectId: "history",
    name: "Modern India",
    weightage: 11,
    pyqAvailable: true,
  },
];

export const PYQ_YEARS = [2022, 2023, 2024, 2025, 2026] as const;

export const DIFFICULTY_OPTIONS = [
  "easy",
  "medium",
  "hard",
  "mixed",
] as const;

export const QUESTION_COUNT_OPTIONS = [10, 15, 20, 25, 30] as const;

export const TIMER_OPTIONS = [
  {
    label: "Off",
    value: 0,
  },
  {
    label: "10 min",
    value: 600,
  },
  {
    label: "15 min",
    value: 900,
  },
  {
    label: "20 min",
    value: 1200,
  },
  {
    label: "30 min",
    value: 1800,
  },
];

export const DEFAULT_MARKING: MarkingScheme = {
  correct: 5,
  incorrect: -1,
  unanswered: 0,
};

export const PYQ_PAPERS: PyqPaper[] = [
  {
    id: "cuet-ug-2024",
    year: 2024,
    title: "CUET UG 2024 Mixed Paper",
    subject: "General Test",
    section: "general",
    durationMinutes: 45,
    totalQuestions: 35,
    markingScheme: DEFAULT_MARKING,
  },
  {
    id: "cuet-ug-2023-mathematics",
    year: 2023,
    title: "CUET UG 2023 Mathematics",
    subject: "Mathematics",
    section: "domain",
    durationMinutes: 45,
    totalQuestions: 35,
    markingScheme: DEFAULT_MARKING,
  },
  {
    id: "cuet-ug-2022-english",
    year: 2022,
    title: "CUET UG 2022 English",
    subject: "English",
    section: "language",
    durationMinutes: 45,
    totalQuestions: 40,
    markingScheme: DEFAULT_MARKING,
  },
];
