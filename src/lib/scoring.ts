import type { MarkingScheme } from "@/types/cuet";
import type { Question } from "@/types/question";
import type { AnswerRecord, QuizResult } from "@/types/quiz";
import { DEFAULT_MARKING } from "./constants";
import { buildSubjectStats, buildTopicStats } from "./analytics";
import { calculateAccuracy, generateId } from "./utils";

export interface EvaluateAttemptInput {
  sessionId: string;
  title: string;
  questions: Question[];
  answers: Record<string, number | null>;
  markingScheme?: MarkingScheme;
  timePerQuestion?: Record<string, number>;
}

export function getScoreDelta(
  status: "correct" | "incorrect" | "skipped",
  markingScheme: MarkingScheme
) {
  if (status === "correct") {
    return markingScheme.correct;
  }

  if (status === "incorrect") {
    return markingScheme.incorrect;
  }

  return markingScheme.unanswered;
}

export function evaluateAttempt({
  sessionId,
  title,
  questions,
  answers,
  markingScheme = DEFAULT_MARKING,
  timePerQuestion = {},
}: EvaluateAttemptInput): QuizResult {
  const answerRecords: AnswerRecord[] = questions.map((question) => {
    const selectedIndex = answers[question.id] ?? null;

    const status =
      selectedIndex === null
        ? "skipped"
        : selectedIndex === question.correctIndex
          ? "correct"
          : "incorrect";

    return {
      questionId: question.id,
      selectedIndex,
      correctIndex: question.correctIndex,
      status,
      timeTakenSeconds: timePerQuestion[question.id] ?? 0,
      scoreDelta: getScoreDelta(status, markingScheme),
    };
  });

  const correctCount = answerRecords.filter(
    (record) => record.status === "correct"
  ).length;

  const incorrectCount = answerRecords.filter(
    (record) => record.status === "incorrect"
  ).length;

  const skippedCount = answerRecords.filter(
    (record) => record.status === "skipped"
  ).length;

  const score = answerRecords.reduce(
    (total, record) => total + record.scoreDelta,
    0
  );

  const maxScore = questions.length * markingScheme.correct;

  const totalTimeTakenSeconds = answerRecords.reduce(
    (total, record) => total + record.timeTakenSeconds,
    0
  );

  return {
    id: generateId("attempt"),
    sessionId,
    title,
    date: new Date().toISOString(),
    score,
    maxScore,
    correctCount,
    incorrectCount,
    skippedCount,
    accuracy: calculateAccuracy(correctCount, questions.length),
    totalTimeTakenSeconds,
    answers: answerRecords,
    topicStats: buildTopicStats(questions, answerRecords),
    subjectStats: buildSubjectStats(questions, answerRecords),
  };
}
