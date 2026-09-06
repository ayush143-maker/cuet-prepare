import type { QuizResult } from "@/types/quiz";

import { ButtonLink } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatTime } from "@/lib/utils";

interface AttemptListProps {
  attempts: QuizResult[];
  maxItems?: number;
}

export function AttemptList({
  attempts,
  maxItems = 8,
}: AttemptListProps) {
  const items = attempts.slice(0, maxItems);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Attempts</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-zinc-400">
            Abhi tak koi attempt nahi hai. Pehla quiz start karo.
          </p>
        ) : (
          items.map((attempt) => (
            <div
              key={attempt.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{attempt.title}</h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    Score: {attempt.score}/{attempt.maxScore} • Correct:{" "}
                    {attempt.correctCount} • Incorrect:{" "}
                    {attempt.incorrectCount}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-zinc-400">Time</p>
                  <p className="font-semibold">
                    {formatTime(attempt.totalTimeTakenSeconds)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Progress
                  value={attempt.accuracy}
                  max={100}
                  className="flex-1"
                />

                <span className="text-sm font-semibold">
                  {attempt.accuracy}%
                </span>
              </div>

              <div className="mt-4">
                <ButtonLink
                  href={`/results/${attempt.id}`}
                  variant="secondary"
                  size="sm"
                >
                  View Result
                </ButtonLink>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
