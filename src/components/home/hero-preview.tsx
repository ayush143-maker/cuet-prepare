"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/lib/utils";

const mockQuestions = [
  {
    subject: "Mathematics",
    question: "If A is 2x3 and B is 3x2, order of AB?",
    options: ["2x2", "3x3", "2x3", "3x2"],
    correct: 0,
    pick: 0,
  },
  {
    subject: "English",
    question: "Choose the synonym of 'Rapid':",
    options: ["Slow", "Fast", "Late", "Weak"],
    correct: 1,
    pick: 1,
  },
  {
    subject: "Reasoning",
    question: "Next number: 2, 6, 12, 20, ?",
    options: ["28", "30", "32", "34"],
    correct: 1,
    pick: 2,
  },
];

export function HeroPreview() {
  const [step, setStep] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((prev) => prev + 1);
    }, 2200);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 15 * 60 : prev - 1));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const cycle = Math.floor(step / 2);
  const revealing = step % 2 === 1;

  const question = mockQuestions[cycle % mockQuestions.length];

  let score = 0;

  for (let index = 0; index < cycle; index++) {
    const item = mockQuestions[index % mockQuestions.length];

    score += item.pick === item.correct ? 5 : -1;
  }

  if (revealing) {
    score += question.pick === question.correct ? 5 : -1;
  }

  return (
    <div className="animate-float relative">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/10 to-cyan-400/20 blur-2xl" />

      <div className="glass-card relative overflow-hidden p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
              Live Session
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="info">{question.subject}</Badge>

            <span className="font-mono text-sm font-semibold text-cyan-300">
              {formatTime(secondsLeft)}
            </span>
          </div>
        </div>

        <h3 className="mt-6 text-lg font-semibold leading-7">
          {question.question}
        </h3>

        <div className="mt-5 space-y-3">
          {question.options.map((option, index) => {
            const isPick = index === question.pick;
            const isCorrect = index === question.correct;
            const isWrongPick = revealing && isPick && !isCorrect;

            return (
              <div
                key={option}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-all duration-500 ${
                  revealing && isCorrect
                    ? "border-emerald-300/50 bg-emerald-400/10"
                    : isWrongPick
                      ? "border-rose-300/50 bg-rose-400/10"
                      : !revealing && isPick
                        ? "border-cyan-300/50 bg-cyan-400/10"
                        : "border-white/10 bg-white/5"
                }`}
              >
                <span>{option}</span>

                {revealing && isCorrect ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                ) : null}

                {isWrongPick ? (
                  <XCircle className="h-4 w-4 text-rose-300" />
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {mockQuestions.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === cycle % mockQuestions.length
                    ? "w-6 bg-cyan-300"
                    : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>

          <span className="font-mono text-sm font-semibold text-fuchsia-300">
            Score: {score}
          </span>
        </div>
      </div>
    </div>
  );
}
