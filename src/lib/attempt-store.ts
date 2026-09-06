import type { QuizResult } from "@/types/quiz";

const attempts = new Map<string, QuizResult>();

export function saveAttempt(attempt: QuizResult): QuizResult {
  attempts.set(attempt.id, attempt);

  return attempt;
}

export function getAttempts(): QuizResult[] {
  return Array.from(attempts.values()).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getAttemptById(id: string): QuizResult | undefined {
  const directMatch = attempts.get(id);

  if (directMatch) {
    return directMatch;
  }

  return Array.from(attempts.values()).find(
    (attempt) => attempt.sessionId === id
  );
}

export function clearAttempts(): void {
  attempts.clear();
}
