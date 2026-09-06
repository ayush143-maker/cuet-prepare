import { AlertTriangle, CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeakTopics } from "@/lib/analytics";
import type { TopicStat } from "@/types/analytics";

interface WeakTopicsProps {
  topicStats: TopicStat[];
}

export function WeakTopics({ topicStats }: WeakTopicsProps) {
  const weakTopics = getWeakTopics(topicStats, 1, 60);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weak Topics</CardTitle>
      </CardHeader>

      <CardContent>
        {weakTopics.length === 0 ? (
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-400/5 p-5">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />

            <div>
              <p className="font-semibold text-emerald-200">
                No major weak topics detected
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                Tumhara performance balanced hai. Ab timed PYQ practice pe
                focus karo.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {weakTopics.map((topic) => (
              <div
                key={`${topic.subject}-${topic.topic}`}
                className="flex items-start justify-between gap-4 rounded-2xl border border-rose-300/20 bg-rose-400/5 p-5"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-300" />

                  <div>
                    <p className="font-semibold">{topic.topic}</p>
                    <p className="text-sm text-zinc-400">{topic.subject}</p>

                    <p className="mt-2 text-sm text-zinc-400">
                      Accuracy {topic.accuracy}%. Is topic ko 15 targeted
                      questions se revise karo.
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-200">
                  {topic.accuracy}%
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
