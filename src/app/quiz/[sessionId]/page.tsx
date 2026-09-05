"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  Send,
  Sparkles,
} from "lucide-react";

type Props = {
  params: Promise<{
    sessionId: string;
  }>;
};

const questions = [
  {
    id: "q1",
    subject: "Mathematics",
    topic: "Matrices",
    question:
      "If A is a 2x3 matrix and B is a 3x2 matrix, what is the order of AB?",
    options: ["2x2", "3x3", "2x3", "3x2"],
    correctIndex: 0,
    explanation:
      "Matrix multiplication me A(m x n) * B(n x p) ka result m x p hota hai.",
  },
  {
    id: "q2",
    subject: "Mathematics",
    topic: "Probability",
    question: "Probability of getting a head in a single coin toss is?",
    options: ["0", "1/2", "1", "2"],
    correctIndex: 1,
    explanation: "Coin toss me head aur tail equally likely hote hain.",
  },
  {
    id: "q3",
    subject: "General",
    topic: "Logical Reasoning",
    question:
      "If all roses are flowers and some flowers fade quickly, can we conclude that some roses fade quickly?",
    options: ["Yes", "No", "Cannot be determined", "Only in summer"],
    correctIndex: 2,
    explanation:
      "Some flowers fade quickly, par ye necessary nahi ki wo flowers roses hi hon.",
  },
];

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function QuizPage({ params }: Props) {
  const { sessionId } = use(params);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [remainingSeconds, setRemainingSeconds] = useState(15 * 60);
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (submitted) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [submitted]);

  useEffect(() => {
    if (remainingSeconds === 0) {
      setSubmitted(true);
    }
  }, [remainingSeconds]);

  const attemptedCount = useMemo(() => {
    return Object.values(answers).filter((value) => value !== null && value !== undefined)
      .length;
  }, [answers]);

  const score = useMemo(() => {
    return questions.reduce((total, question) => {
      const selected = answers[question.id];

      if (selected === undefined || selected === null) {
        return total;
      }

      if (selected === question.correctIndex) {
        return total + 5;
      }

      return total - 1;
    }, 0);
  }, [answers]);

  const selectOption = (optionIndex: number) => {
    if (submitted) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const toggleMark = () => {
    setMarked((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-0 h-[400px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-cyan-400/10 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="glass-card mb-8 flex flex-col justify-between gap-6 p-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Session: {sessionId}
            </div>

            <h1 className="mt-2 text-2xl font-bold">
              {currentQuestion.subject} • {currentQuestion.topic}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
              <Clock className="h-5 w-5 text-emerald-300" />
              <span className="text-lg font-semibold">
                {formatTime(remainingSeconds)}
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
              <span className="text-sm text-zinc-400">Attempted</span>
              <span className="ml-2 font-semibold">
                {attemptedCount}/{questions.length}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="glass-card p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                Question {currentIndex + 1} of {questions.length}
              </span>

              <button
                onClick={toggleMark}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  marked[currentQuestion.id]
                    ? "border-amber-300/50 bg-amber-400/10 text-amber-200"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                }`}
              >
                <Flag className="h-4 w-4" />
                Mark for Review
              </button>
            </div>

            <h2 className="mt-6 text-2xl font-semibold leading-9">
              {currentQuestion.question}
            </h2>

            <div className="mt-8 space-y-4">
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected = answers[currentQuestion.id] === optionIndex;
                const isCorrect =
                  submitted && optionIndex === currentQuestion.correctIndex;
                const isWrong =
                  submitted &&
                  isSelected &&
                  optionIndex !== currentQuestion.correctIndex;

                return (
                  <button
                    key={option}
                    onClick={() => selectOption(optionIndex)}
                    disabled={submitted}
                    className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
                      isCorrect
                        ? "border-emerald-300/50 bg-emerald-400/10"
                        : isWrong
                          ? "border-rose-300/50 bg-rose-400/10"
                          : isSelected
                            ? "border-cyan-300/50 bg-cyan-400/10"
                            : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span>{option}</span>

                    {isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    )}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-cyan-300">
                  Explanation
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() =>
                  setCurrentIndex((prev) => Math.max(prev - 1, 0))
                }
                className="btn-secondary"
              >
                <ChevronLeft className="h-5 w-5" />
                Previous
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      Math.min(prev + 1, questions.length - 1)
                    )
                  }
                  className="btn-primary"
                >
                  Next
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={() => setSubmitted(true)}
                  className="btn-primary"
                >
                  <Send className="h-5 w-5" />
                  Submit Quiz
                </button>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold">Question Palette</h3>

              <div className="mt-4 grid grid-cols-5 gap-3">
                {questions.map((question, index) => {
                  const isCurrent = index === currentIndex;
                  const isAnswered =
                    answers[question.id] !== null &&
                    answers[question.id] !== undefined;
                  const isMarked = marked[question.id];

                  return (
                    <button
                      key={question.id}
                      onClick={() => setCurrentIndex(index)}
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-semibold transition ${
                        isCurrent
                          ? "border-cyan-300/60 bg-cyan-400/10 text-white"
                          : isMarked
                            ? "border-amber-300/50 bg-amber-400/10 text-amber-200"
                            : isAnswered
                              ? "border-emerald-300/50 bg-emerald-400/10 text-emerald-200"
                              : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                      }`}
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

            {submitted && (
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold">Instant Summary</h3>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                    <span>Score</span>
                    <span className="font-semibold">{score}</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                    <span>Attempted</span>
                    <span className="font-semibold">
                      {attemptedCount}/{questions.length}
                    </span>
                  </div>
                </div>

                <Link
                  href="/results/demo-attempt"
                  className="btn-primary mt-6 w-full"
                >
                  View Full Result
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
