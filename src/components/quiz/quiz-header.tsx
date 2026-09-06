import type { QuizSession } from "@/types/quiz";

import { Badge } from "@/components/ui/badge";
import { getAttemptedCount } from "@/lib/quiz";
import { TimerRing } from "./timer-ring";

interface QuizHeaderProps {
  session: QuizSession;
}

export function QuizHeader({ session }: QuizHeaderProps) {
  const attempted = getAttemptedCount(session.answers);
  const totalQuestions = Object.keys(session.answers).length;

  return (
    <div className="glass-card flex flex-col justify-between gap-6 p-6 lg:flex-row lg:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="gradient" className="capitalize">
            {session.config.mode} Mode
          </Badge>

          {session.config.subject ? (
            <Badge>{session.config.subject}</Badge>
          ) : null}

          {session.config.year ? (
            <Badge variant="info">PYQ {session.config.year}</Badge>
          ) : null}
        </div>

        <h1 className="mt-3 text-2xl font-bold">{session.config.title}</h1>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
          <p className="text-xs text-zinc-400">Attempted</p>
          <p className="mt-1 text-lg font-semibold">
            {attempted}/{totalQuestions}
          </p>
        </div>

        <TimerRing
          totalSeconds={session.config.timeLimitSeconds}
          remainingSeconds={session.remainingSeconds}
        />
      </div>
    </div>
  );
}
