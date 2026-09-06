import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "glass-card flex flex-col items-center justify-center p-10 text-center",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
        <Icon className="h-7 w-7 text-cyan-300" />
      </div>

      <h3 className="mt-5 text-xl font-semibold">{title}</h3>

      {description ? (
        <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
          {description}
        </p>
      ) : null}

      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
