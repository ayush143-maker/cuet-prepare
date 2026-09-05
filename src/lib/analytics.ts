import type {
  SubjectStat,
  TopicStat,
} from "@/types/analytics";
import type { AnswerRecord } from "@/types/quiz";
import type { Question } from "@/types/question";
import { calculateAccuracy } from "./utils";

type TopicAccumulator = {
  subject: string;
  topic: string;
  total: number;
  correct: number;
  incorrect: number;
  skipped: number;
  totalTime: number;
};

type SubjectAccumulator = {
  subject: string;
  total: number;
  correct: number;
  incorrect: number;
  skipped: number;
  totalTime: number;
};

export function buildTopicStats(
  questions: Question[],
  answerRecords: AnswerRecord[]
): TopicStat[] {
  const recordMap = new Map(
    answerRecords.map((record) => [record.questionId, record])
  );

  const accumulator = new Map<string, TopicAccumulator>();

  for (const question of questions) {
    const record = recordMap.get(question.id);

    const key = `${question.subject}__${question.topic}`;

    const existing = accumulator.get(key) ?? {
      subject: question.subject,
      topic: question.topic,
      total: 0,
      correct: 0,
      incorrect: 0,
      skipped: 0,
      totalTime: 0,
    };

    existing.total += 1;

    if (record?.status === "correct") {
      existing.correct += 1;
    }

    if (record?.status === "incorrect") {
      existing.incorrect += 1;
    }

    if (!record || record.status === "skipped") {
      existing.skipped += 1;
    }

    existing.totalTime += record?.timeTakenSeconds ?? 0;

    accumulator.set(key, existing);
  }

  return Array.from(accumulator.values()).map(
    ({ totalTime, ...stat }) => ({
      ...stat,
      accuracy: calculateAccuracy(stat.correct, stat.total),
      avgTimeSeconds: stat.total > 0 ? Math.round(totalTime / stat.total) : 0,
    })
  );
}

export function buildSubjectStats(
  questions: Question[],
  answerRecords: AnswerRecord[]
): SubjectStat[] {
  const recordMap = new Map(
    answerRecords.map((record) => [record.questionId, record])
  );

  const accumulator = new Map<string, SubjectAccumulator>();

  for (const question of questions) {
    const record = recordMap.get(question.id);

    const existing = accumulator.get(question.subject) ?? {
      subject: question.subject,
      total: 0,
      correct: 0,
      incorrect: 0,
      skipped: 0,
      totalTime: 0,
    };

    existing.total += 1;

    if (record?.status === "correct") {
      existing.correct += 1;
    }

    if (record?.status === "incorrect") {
      existing.incorrect += 1;
    }

    if (!record || record.status === "skipped") {
      existing.skipped += 1;
    }

    existing.totalTime += record?.timeTakenSeconds ?? 0;

    accumulator.set(question.subject, existing);
  }

  return Array.from(accumulator.values()).map(
    ({ totalTime, ...stat }) => ({
      ...stat,
      accuracy: calculateAccuracy(stat.correct, stat.total),
      avgTimeSeconds: stat.total > 0 ? Math.round(totalTime / stat.total) : 0,
    })
  );
}

export function getWeakTopics(
  topicStats: TopicStat[],
  minimumAttempts = 1,
  accuracyThreshold = 50
): TopicStat[] {
  return topicStats
    .filter(
      (stat) =>
        stat.total >= minimumAttempts && stat.accuracy < accuracyThreshold
    )
    .sort((a, b) => a.accuracy - b.accuracy);
}

export function getStrongTopics(
  topicStats: TopicStat[],
  minimumAttempts = 1,
  accuracyThreshold = 80
): TopicStat[] {
  return topicStats
    .filter(
      (stat) =>
        stat.total >= minimumAttempts && stat.accuracy >= accuracyThreshold
    )
    .sort((a, b) => b.accuracy - a.accuracy);
}

export function getRecommendation(topicStats: TopicStat[]): {
  title: string;
  description: string;
} {
  const weakTopics = getWeakTopics(topicStats);

  if (weakTopics.length > 0) {
    const weakest = weakTopics[0];

    return {
      title: `Focus on ${weakest.topic}`,
      description: `${weakest.topic} me accuracy ${weakest.accuracy}% hai. Aaj 15 targeted questions solve karo.`,
    };
  }

  const totalQuestions = topicStats.reduce(
    (total, stat) => total + stat.total,
    0
  );

  const totalCorrect = topicStats.reduce(
    (total, stat) => total + stat.correct,
    0
  );

  const overallAccuracy = calculateAccuracy(totalCorrect, totalQuestions);

  if (overallAccuracy >= 80) {
    return {
      title: "Great momentum",
      description:
        "Accuracy strong hai. Ab full-length timed PYQ attempt karo.",
    };
  }

  return {
    title: "Balanced practice",
    description:
      "Mixed practice continue karo. Weak topics ko alternate days pe target karo.",
  };
}
