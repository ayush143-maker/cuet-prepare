import type { Question } from "@/types/question";
import type { QuizConfig, QuizSession } from "@/types/quiz";
import { generateId, shuffleArray } from "./utils";

export function createQuizSession(
  config: QuizConfig,
  questions: Question[]
): QuizSession {
  const preparedQuestions = config.shuffleQuestions
    ? shuffleArray(questions)
    : questions;

  return {
    id: generateId("session"),
    config,
    status: "active",
    startedAt: new Date().toISOString(),
    currentIndex: 0,
    remainingSeconds: config.timeLimitSeconds,
    answers: Object.fromEntries(
      preparedQuestions.map((question) => [question.id, null])
    ),
    markedForReview: {},
  };
}

export function getAttemptedCount(
  answers: Record<string, number | null>
): number {
  return Object.values(answers).filter(
    (value) => value !== null && value !== undefined
  ).length;
}
