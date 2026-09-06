import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  description?: string;
  iconClassName?: string;
  className?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  description,
  iconClassName,
  className,
}: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5",
            iconClassName
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        <p className="mt-4 text-sm text-zinc-400">{label}</p>

        <p className="mt-2 text-3xl font-black">{value}</p>

        {description ? (
          <p className="mt-2 text-xs text-zinc-500">{description}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
