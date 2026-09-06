import { cn, formatTime } from "@/lib/utils";

interface TimerRingProps {
  totalSeconds: number;
  remainingSeconds: number;
  size?: number;
}

export function TimerRing({
  totalSeconds,
  remainingSeconds,
  size = 96,
}: TimerRingProps) {
  if (totalSeconds <= 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
        No Timer
      </div>
    );
  }

  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(Math.min(remainingSeconds / totalSeconds, 1), 0);
  const strokeDashoffset = circumference * (1 - progress);

  const color =
    progress > 0.5
      ? "text-emerald-300"
      : progress > 0.2
        ? "text-amber-300"
        : "text-rose-300";

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="6"
          fill="none"
          className="stroke-white/10"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn("stroke-current transition-all duration-500", color)}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold">
          {formatTime(remainingSeconds)}
        </span>
      </div>
    </div>
  );
}
