import type { Question, QuestionSource } from "@/types/question";
import type { DifficultyFilter } from "@/types/quiz";

import { shuffleArray } from "./utils";

import sampleQuestionsRaw from "../../data/questions/sample.json";
import pyq2022Raw from "../../data/pyq/2022.json";
import pyq2023Raw from "../../data/pyq/2023.json";
import pyq2024Raw from "../../data/pyq/2024.json";
import pyq2025Raw from "../../data/pyq/2025.json";
import pyq2026Raw from "../../data/pyq/2026.json";

export type QuestionFilter = {
  subject?: string;
  topic?: string;
  difficulty?: DifficultyFilter;
  year?: number;
  source?: QuestionSource;
  includePyq?: boolean;
  limit?: number;
  shuffle?: boolean;
};

function isQuestion(value: Partial<Question>): value is Question {
  return (
    typeof value.id === "string" &&
    typeof value.section === "string" &&
    typeof value.subject === "string" &&
    typeof value.topic === "string" &&
    typeof value.difficulty === "string" &&
    typeof value.question === "string" &&
    Array.isArray(value.options) &&
    value.options.length >= 2 &&
    typeof value.correctIndex === "number" &&
    value.correctIndex >= 0 &&
    value.correctIndex < value.options.length
  );
}

function normalizeQuestions(
  raw: unknown,
  fallbackSource: QuestionSource
): Question[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  const normalized = raw.map((item, index) => {
    const question = {
      ...(item as Record<string, unknown>),
    } as Partial<Question>;

    if (!question.id) {
      question.id = `${fallbackSource}_question_${index}`;
    }

    if (!question.source) {
      question.source = fallbackSource;
    }

    return question;
  });

  return normalized.filter(isQuestion);
}

const loadedQuestions: Question[] = [
  ...normalizeQuestions(sampleQuestionsRaw, "sample"),
  ...normalizeQuestions(pyq2022Raw, "pyq"),
  ...normalizeQuestions(pyq2023Raw, "pyq"),
  ...normalizeQuestions(pyq2024Raw, "pyq"),
  ...normalizeQuestions(pyq2025Raw, "pyq"),
  ...normalizeQuestions(pyq2026Raw, "pyq"),
];

const questionMap = new Map<string, Question>();

for (const question of loadedQuestions) {
  questionMap.set(question.id, question);
}

export const questionBank: Question[] = Array.from(questionMap.values());

// Backward compatibility ke liye
export const sampleQuestions: Question[] = questionBank;

export function getQuestions(filter: QuestionFilter = {}): Question[] {
  let result = [...questionBank];

  if (filter.source) {
    result = result.filter(
      (question) => question.source === filter.source
    );
  }

  if (filter.includePyq === false) {
    result = result.filter((question) => question.source !== "pyq");
  }

  if (filter.subject) {
    result = result.filter((question) =>
      question.subject
        .toLowerCase()
        .includes(filter.subject!.toLowerCase())
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
      (question) => question.difficulty === filter.difficulty
    );
  }

  if (filter.shuffle) {
    result = shuffleArray(result);
  }

  if (filter.limit && filter.limit > 0) {
    result = result.slice(0, filter.limit);
  }

  return result;
}

export function getPyqQuestions(year?: number): Question[] {
  return questionBank.filter((question) => {
    if (question.source !== "pyq") {
      return false;
    }

    if (!year) {
      return true;
    }

    return question.year === year;
  });
}
