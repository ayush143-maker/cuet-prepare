"use client";

import type { Question } from "@/types/question";

import { cn } from "@/lib/utils";

interface QuestionPaletteProps {
  questions: Question[];
  answers: Record<string, number | null>;
  marked?: Record<string, boolean>;
  currentIndex: number;
  onSelect: (index: number) => void;
}

export function QuestionPalette({
  questions,
  answers,
  marked = {},
  currentIndex,
  onSelect,
}: QuestionPaletteProps) {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold">Question Palette</h3>

      <div className="mt-4 grid grid-cols-5 gap-3">
        {questions.map((question, index) => {
          const isCurrent = index === currentIndex;
          const isAnswered =
            answers[question.id] !== null &&
            answers[question.id] !== undefined;
          const isMarked = Boolean(marked[question.id]);

          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onSelect(index)}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-semibold transition",
                isCurrent
                  ? "border-cyan-300/60 bg-cyan-400/10 text-white"
                  : isMarked
                    ? "border-amber-300/50 bg-amber-400/10 text-amber-200"
                    : isAnswered
                      ? "border-emerald-300/50 bg-emerald-400/10 text-emerald-200"
                      : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
              )}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-3 text-sm text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          Answered
        </div>

        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          Marked
        </div>

        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-cyan-400" />
          Current
        </div>
      </div>
    </div>
  );
}
