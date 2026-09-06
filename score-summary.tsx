import {
  Clock,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatTime } from "@/lib/utils";
import type { QuizResult } from "@/types/quiz";

interface ScoreSummaryProps {
  result: QuizResult;
}

export function ScoreSummary({ result }: ScoreSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Score Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <Trophy className="h-5 w-5 text-amber-300" />
            <p className="mt-3 text-sm text-zinc-400">Score</p>
            <p className="mt-1 text-2xl font-black">
              {result.score}/{result.maxScore}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <Target className="h-5 w-5 text-cyan-300" />
            <p className="mt-3 text-sm text-zinc-400">Accuracy</p>
            <p className="mt-1 text-2xl font-black">{result.accuracy}%</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <Clock className="h-5 w-5 text-emerald-300" />
            <p className="mt-3 text-sm text-zinc-400">Time Taken</p>
            <p className="mt-1 text-2xl font-black">
              {formatTime(result.totalTimeTakenSeconds)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <TrendingUp className="h-5 w-5 text-fuchsia-300" />
            <p className="mt-3 text-sm text-zinc-400">Attempted</p>
            <p className="mt-1 text-2xl font-black">
              {result.correctCount + result.incorrectCount}/
              {result.answers.length}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Correct</span>
            <span className="font-semibold text-emerald-300">
              {result.correctCount}
            </span>
          </div>

          <Progress value={result.correctCount} max={result.answers.length} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Incorrect</span>
            <span className="font-semibold text-rose-300">
              {result.incorrectCount}
            </span>
          </div>

          <Progress
            value={result.incorrectCount}
            max={result.answers.length}
            indicatorClassName="bg-gradient-to-r from-rose-500 to-orange-400"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Skipped</span>
            <span className="font-semibold text-zinc-300">
              {result.skippedCount}
            </span>
          </div>

          <Progress
            value={result.skippedCount}
            max={result.answers.length}
            indicatorClassName="bg-gradient-to-r from-zinc-500 to-zinc-300"
          />
        </div>
      </CardContent>
    </Card>
  );
}
