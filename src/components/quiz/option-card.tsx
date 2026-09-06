"use client";

import { CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface OptionCardProps {
  option: string;
  index: number;
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
  disabled?: boolean;
  onSelect: (index: number) => void;
}

const optionLabels = ["A", "B", "C", "D", "E", "F"];

export function OptionCard({
  option,
  index,
  selected,
  correct,
  incorrect,
  disabled,
  onSelect,
}: OptionCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(index)}
      className={cn(
        "flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition disabled:cursor-not-allowed",
        correct
          ? "border-emerald-300/50 bg-emerald-400/10"
          : incorrect
            ? "border-rose-300/50 bg-rose-400/10"
            : selected
              ? "border-cyan-300/50 bg-cyan-400/10"
              : "border-white/10 bg-white/5 hover:bg-white/10"
      )}
    >
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-sm font-bold",
            correct
              ? "border-emerald-300/40 bg-emerald-400/10 text-emerald-200"
              : incorrect
                ? "border-rose-300/40 bg-rose-400/10 text-rose-200"
                : selected
                  ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-200"
                  : "border-white/10 bg-white/5 text-zinc-300"
          )}
        >
          {optionLabels[index] ?? index + 1}
        </span>

        <span>{option}</span>
      </div>

      {correct ? (
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
      ) : null}
    </button>
  );
}
