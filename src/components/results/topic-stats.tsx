import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { TopicStat } from "@/types/analytics";

interface TopicStatsProps {
  topicStats: TopicStat[];
}

export function TopicStats({ topicStats }: TopicStatsProps) {
  if (topicStats.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Topic Analysis</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-zinc-400">
            Is attempt me topic-wise data available nahi hai.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Analysis</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {topicStats.map((stat) => (
          <div
            key={`${stat.subject}-${stat.topic}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold">{stat.topic}</h3>
                <p className="text-sm text-zinc-400">{stat.subject}</p>
              </div>

              <div className="text-right text-sm text-zinc-400">
                <p>Accuracy: {stat.accuracy}%</p>
                <p>Avg Time: {stat.avgTimeSeconds}s</p>
              </div>
            </div>

            <div className="mt-4">
              <Progress value={stat.accuracy} max={100} />
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-400">
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-200">
                Correct: {stat.correct}
              </span>

              <span className="rounded-full bg-rose-400/10 px-3 py-1 text-rose-200">
                Incorrect: {stat.incorrect}
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1 text-zinc-300">
                Skipped: {stat.skipped}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
