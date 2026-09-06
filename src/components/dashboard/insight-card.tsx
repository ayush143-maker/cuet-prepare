import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type InsightTone = "info" | "success" | "warning";

interface InsightCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: InsightTone;
  className?: string;
}

const toneStyles: Record<InsightTone, string> = {
  info: "bg-cyan-400/10 text-cyan-300",
  success: "bg-emerald-400/10 text-emerald-300",
  warning: "bg-amber-400/10 text-amber-300",
};

export function InsightCard({
  icon: Icon,
  title,
  description,
  tone = "info",
  className,
}: InsightCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-2xl",
            toneStyles[tone]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        <h3 className="mt-4 font-semibold">{title}</h3>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
