"use client";

import type { Question } from "@/types/question";

import { Badge } from "@/components/ui/badge";
import { OptionCard } from "./option-card";

interface QuestionCardProps {
  question: Question;
  selectedIndex: number | null;
  submitted?: boolean;
  showExplanation?: boolean;
  onSelect: (index: number) => void;
}

export function QuestionCard({
  question,
  selectedIndex,
  submitted = false,
  showExplanation = false,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="glass-card p-8">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="info">{question.subject}</Badge>
        <Badge>{question.topic}</Badge>
        <Badge variant="warning" className="capitalize">
          {question.difficulty}
        </Badge>
      </div>

      <h2 className="mt-6 text-2xl font-semibold leading-9">
        {question.question}
      </h2>

      <div className="mt-8 space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = submitted && index === question.correctIndex;
          const isIncorrect =
            submitted && isSelected && index !== question.correctIndex;

          return (
            <OptionCard
              key={`${question.id}-${index}`}
              option={option}
              index={index}
              selected={isSelected}
              correct={isCorrect}
              incorrect={isIncorrect}
              disabled={submitted}
              onSelect={onSelect}
            />
          );
        })}
      </div>

      {submitted && showExplanation && question.explanation ? (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm font-semibold text-cyan-300">Explanation</p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {question.explanation}
          </p>
        </div>
      ) : null}
    </div>
  );
}
