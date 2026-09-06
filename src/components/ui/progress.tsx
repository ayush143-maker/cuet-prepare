import * as React from "react";

import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indicatorClassName?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, indicatorClassName, ...props }, ref) => {
    const safeMax = Math.max(max, 1);
    const safeValue = Math.min(Math.max(value, 0), safeMax);
    const percentage = Math.round((safeValue / safeMax) * 100);

    return (
      <div
        ref={ref}
        className={cn(
          "h-2 overflow-hidden rounded-full bg-white/10",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-300 transition-all duration-500",
            indicatorClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
