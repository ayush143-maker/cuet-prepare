"use client";

import { cn } from "@/lib/utils";

interface YearFilterProps {
  years: readonly number[];
  activeYear?: number | null;
  onSelect?: (year: number | null) => void;
  className?: string;
}

export function YearFilter({
  years,
  activeYear = null,
  onSelect,
  className,
}: YearFilterProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <button
        type="button"
        onClick={() => onSelect?.(null)}
        className={cn(
          "rounded-full border px-4 py-2 text-sm font-medium transition",
          activeYear === null
            ? "border-cyan-300/50 bg-cyan-400/10 text-white"
            : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
        )}
      >
        All Years
      </button>

      {years.map((year) => (
        <button
          key={year}
          type="button"
          onClick={() => onSelect?.(year)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition",
            activeYear === year
              ? "border-cyan-300/50 bg-cyan-400/10 text-white"
              : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
          )}
        >
          {year}
        </button>
      ))}
    </div>
  );
}
