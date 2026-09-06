import type { Question, QuestionSource } from "@/types/question";
import type { DifficultyFilter } from "@/types/quiz";

import { shuffleArray } from "./utils";

import sampleQuestionsRaw from "../../data/questions/sample.json";
import mathematicsQuestionsRaw from "../../data/questions/mathematics.json";
import generalTestQuestionsRaw from "../../data/questions/general-test.json";
import englishQuestionsRaw from "../../data/questions/english.json";
import scienceQuestionsRaw from "../../data/questions/science.json";
import physicsQuestionsRaw from "../../data/questions/physics.json";
import physics2QuestionsRaw from "../../data/questions/physics-2.json";
import chemistry1QuestionsRaw from "../../data/questions/chemistry-1.json";
import chemistry2QuestionsRaw from "../../data/questions/chemistry-2.json";
import maths1QuestionsRaw from "../../data/questions/maths-1.json";
import maths2QuestionsRaw from "../../data/questions/maths-2.json";
import biology1QuestionsRaw from "../../data/questions/biology-1.json";
import biology2QuestionsRaw from "../../data/questions/biology-2.json";
import english1QuestionsRaw from "../../data/questions/english-1.json";
import english2QuestionsRaw from "../../data/questions/english-2.json";
import gat1QuestionsRaw from "../../data/questions/gat-1.json";
import gat2QuestionsRaw from "../../data/questions/gat-2.json";
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
  ...normalizeQuestions(mathematicsQuestionsRaw, "sample"),
  ...normalizeQuestions(generalTestQuestionsRaw, "sample"),
  ...normalizeQuestions(englishQuestionsRaw, "sample"),
  ...normalizeQuestions(scienceQuestionsRaw, "sample"),
  ...normalizeQuestions(physicsQuestionsRaw, "sample"),
  ...normalizeQuestions(physics2QuestionsRaw, "sample"),
  ...normalizeQuestions(chemistry1QuestionsRaw, "sample"),
  ...normalizeQuestions(chemistry2QuestionsRaw, "sample"),
  ...normalizeQuestions(maths1QuestionsRaw, "sample"),
  ...normalizeQuestions(maths2QuestionsRaw, "sample"),
  ...normalizeQuestions(biology1QuestionsRaw, "sample"),
  ...normalizeQuestions(biology2QuestionsRaw, "sample"),
  ...normalizeQuestions(english1QuestionsRaw, "sample"),
  ...normalizeQuestions(english2QuestionsRaw, "sample"),
  ...normalizeQuestions(gat1QuestionsRaw, "sample"),
  ...normalizeQuestions(gat2QuestionsRaw, "sample"),
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
