import { Clock, Flag, ListChecks } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { cn, formatTime } from "@/lib/utils";

interface QuizSummaryStripProps {
  total: number;
  attempted: number;
  marked?: number;
  remainingSeconds?: number;
  className?: string;
}

export function QuizSummaryStrip({
  total,
  attempted,
  marked = 0,
  remainingSeconds,
  className,
}: QuizSummaryStripProps) {
  const progress = total > 0 ? Math.round((attempted / total) * 100) : 0;

  return (
    <div
      className={cn(
        "glass-card flex flex-col gap-4 p-4 md:flex-row md:items-center",
        className
      )}
    >
      <div className="flex items-center gap-3 text-sm text-zinc-300">
        <ListChecks className="h-4 w-4 text-emerald-300" />
        <span>
          {attempted}/{total} answered
        </span>
      </div>

      <div className="flex flex-1 items-center gap-3">
        <Progress value={attempted} max={total} className="h-2 flex-1" />
        <span className="text-sm font-semibold">{progress}%</span>
      </div>

      {marked > 0 ? (
        <div className="flex items-center gap-3 text-sm text-zinc-300">
          <Flag className="h-4 w-4 text-amber-300" />
          <span>{marked} marked</span>
        </div>
      ) : null}

      {typeof remainingSeconds === "number" && remainingSeconds > 0 ? (
        <div className="flex items-center gap-3 text-sm text-zinc-300">
          <Clock className="h-4 w-4 text-cyan-300" />
          <span>{formatTime(remainingSeconds)}</span>
        </div>
      ) : null}
    </div>
  );
}
