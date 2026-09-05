import type { Difficulty, Question } from "@/types/question";
import type { DifficultyFilter } from "@/types/quiz";
import { shuffleArray } from "./utils";

export type QuestionFilter = {
  subject?: string;
  topic?: string;
  difficulty?: DifficultyFilter;
  year?: number;
  limit?: number;
  shuffle?: boolean;
};

export const sampleQuestions: Question[] = [
  {
    id: "math_matrices_001",
    section: "domain",
    subject: "Mathematics",
    topic: "Matrices",
    subtopic: "Matrix Multiplication",
    difficulty: "medium",
    question:
      "If A is a 2x3 matrix and B is a 3x2 matrix, what is the order of AB?",
    options: ["2x2", "3x3", "2x3", "3x2"],
    correctIndex: 0,
    explanation:
      "Matrix multiplication me A(m x n) * B(n x p) ka result m x p hota hai. Isliye 2x3 * 3x2 = 2x2.",
    year: 2023,
    source: "sample",
    tags: ["matrices", "order", "cuet"],
  },
  {
    id: "math_probability_001",
    section: "domain",
    subject: "Mathematics",
    topic: "Probability",
    subtopic: "Basic Probability",
    difficulty: "easy",
    question: "Probability of getting a head in a single coin toss is?",
    options: ["0", "1/2", "1", "2"],
    correctIndex: 1,
    explanation: "Coin toss me head aur tail equally likely hote hain.",
    year: 2022,
    source: "sample",
    tags: ["probability", "coin toss"],
  },
  {
    id: "math_calculus_001",
    section: "domain",
    subject: "Mathematics",
    topic: "Calculus",
    subtopic: "Differentiation",
    difficulty: "medium",
    question: "Derivative of x^2 with respect to x is?",
    options: ["x", "2x", "x/2", "2"],
    correctIndex: 1,
    explanation: "Power rule ke according d/dx(x^n) = n*x^(n-1).",
    year: 2023,
    source: "sample",
    tags: ["calculus", "derivative"],
  },
  {
    id: "physics_mechanics_001",
    section: "domain",
    subject: "Physics",
    topic: "Mechanics",
    subtopic: "Units",
    difficulty: "easy",
    question: "SI unit of force is?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    correctIndex: 1,
    explanation: "Force ka SI unit Newton hota hai.",
    year: 2022,
    source: "sample",
    tags: ["mechanics", "units"],
  },
  {
    id: "english_grammar_001",
    section: "language",
    subject: "English",
    topic: "Grammar",
    subtopic: "Subject-Verb Agreement",
    difficulty: "easy",
    question:
      "Choose the correct sentence: 'Each of the boys ___ present.'",
    options: ["are", "is", "were", "have"],
    correctIndex: 1,
    explanation: "'Each' singular subject maana jaata hai, isliye 'is' aayega.",
    year: 2023,
    source: "sample",
    tags: ["grammar", "subject-verb agreement"],
  },
  {
    id: "general_logical_reasoning_001",
    section: "general",
    subject: "General Test",
    topic: "Logical Reasoning",
    subtopic: "Syllogism",
    difficulty: "medium",
    question:
      "If all roses are flowers and some flowers fade quickly, can we conclude that some roses fade quickly?",
    options: ["Yes", "No", "Cannot be determined", "Only in summer"],
    correctIndex: 2,
    explanation:
      "Some flowers fade quickly, par ye necessary nahi ki wo flowers roses hi hon.",
    year: 2024,
    source: "sample",
    tags: ["reasoning", "syllogism"],
  },
  {
    id: "general_quant_001",
    section: "general",
    subject: "General Test",
    topic: "Quantitative Aptitude",
    subtopic: "Percentage",
    difficulty: "easy",
    question: "20% of 250 is?",
    options: ["25", "40", "50", "75"],
    correctIndex: 2,
    explanation: "250 ka 20% = 250 * 20 / 100 = 50.",
    year: 2023,
    source: "sample",
    tags: ["percentage", "quant"],
  },
  {
    id: "history_modern_india_001",
    section: "domain",
    subject: "History",
    topic: "Modern India",
    subtopic: "Freedom Movement",
    difficulty: "medium",
    question: "The Quit India Movement was launched in which year?",
    options: ["1930", "1942", "1947", "1919"],
    correctIndex: 1,
    explanation: "Quit India Movement 1942 me launch hua tha.",
    year: 2022,
    source: "sample",
    tags: ["modern india", "freedom movement"],
  },
];

export function getQuestions(filter: QuestionFilter = {}): Question[] {
  let result = [...sampleQuestions];

  if (filter.subject) {
    result = result.filter((question) =>
      question.subject.toLowerCase().includes(filter.subject!.toLowerCase())
    );
  }

  if (filter.topic) {
    result = result.filter((question) =>
      question.topic.toLowerCase().includes(filter.topic!.toLowerCase())
    );
  }

  if (filter.year) {
    result = result.filter((question) => question.year === filter.year);
  }

  if (filter.difficulty && filter.difficulty !== "mixed") {
    result = result.filter(
      (question) => question.difficulty === (filter.difficulty as Difficulty)
    );
  }

  if (filter.shuffle) {
    result = shuffleArray(result);
  }

  if (filter.limit) {
    result = result.slice(0, filter.limit);
  }

  return result;
}
