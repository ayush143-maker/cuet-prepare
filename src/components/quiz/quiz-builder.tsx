"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Flame } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DIFFICULTY_OPTIONS,
  QUESTION_COUNT_OPTIONS,
  SUBJECTS,
  TIMER_OPTIONS,
} from "@/lib/constants";
import { useQuizStore } from "@/store/quiz-store";
import type { DifficultyFilter, QuizConfig } from "@/types/quiz";
import { cn } from "@/lib/utils";

export function QuizBuilder() {
  const router = useRouter();
  const startQuiz = useQuizStore((state) => state.startQuiz);

  const [subject, setSubject] = useState("Mathematics");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("mixed");
  const [questionCount, setQuestionCount] = useState(15);
  const [timeLimitSeconds, setTimeLimitSeconds] = useState(900);

  const handleStartQuiz = () => {
    const config: QuizConfig = {
      mode: "practice",
      title: `${subject} Practice`,
      subject,
      topics: [],
      difficulty,
      questionCount,
      timeLimitSeconds,
      shuffleQuestions: true,
      shuffleOptions: false,
      showExplanationAfterSubmit: true,
      showExplanationInstantly: false,
    };

    startQuiz(config);

    const sessionId = useQuizStore.getState().session?.id;

    if (sessionId) {
      router.push(`/quiz/${sessionId}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Builder</CardTitle>
        <CardDescription>
          Subject, difficulty, question count aur timer choose karo.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        <section>
          <h3 className="mb-3 text-sm font-semibold text-zinc-300">
            Subject
          </h3>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {SUBJECTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSubject(item.name)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-left text-sm font-medium transition",
                  subject === item.name
                    ? "border-cyan-300/50 bg-cyan-400/10 text-white"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-semibold text-zinc-300">
            Difficulty
          </h3>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {DIFFICULTY_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setDifficulty(option as DifficultyFilter)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-left text-sm font-medium capitalize transition",
                  difficulty === option
                    ? "border-fuchsia-300/50 bg-fuchsia-400/10 text-white"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-semibold text-zinc-300">
            Questions
          </h3>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
            {QUESTION_COUNT_OPTIONS.map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setQuestionCount(count)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-center text-sm font-medium transition",
                  questionCount === count
                    ? "border-indigo-300/50 bg-indigo-400/10 text-white"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                )}
              >
                {count}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-semibold text-zinc-300">
            Timer
          </h3>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
            {TIMER_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setTimeLimitSeconds(option.value)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-center text-sm font-medium transition",
                  timeLimitSeconds === option.value
                    ? "border-emerald-300/50 bg-emerald-400/10 text-white"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        <Button className="w-full" onClick={handleStartQuiz}>
          <Flame className="h-5 w-5" />
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
}
