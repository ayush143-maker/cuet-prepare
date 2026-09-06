import { Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

interface ExplanationBoxProps {
  explanation?: string;
  title?: string;
  className?: string;
}

export function ExplanationBox({
  explanation,
  title = "Explanation",
  className,
}: ExplanationBoxProps) {
  if (!explanation) return null;

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-5",
        className
      )}
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
        <Lightbulb className="h-4 w-4" />
        {title}
      </div>

      <p className="mt-2 text-sm leading-6 text-zinc-300">
        {explanation}
      </p>
    </div>
  );
}
