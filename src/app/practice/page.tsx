"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Brain,
  Clock,
  Flame,
  Layers,
  Sparkles,
  Target,
} from "lucide-react";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Political Science",
  "Economics",
  "English",
];

const difficulties = ["Easy", "Medium", "Hard", "Mixed"];

const questionCounts = [10, 15, 20, 25, 30];

const timers = ["Off", "10 min", "15 min", "20 min", "30 min"];

export default function PracticePage() {
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Mixed");
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(15);
  const [selectedTimer, setSelectedTimer] = useState("15 min");

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -top-32 right-0 h-[400px] w-[500px] rounded-full bg-fuchsia-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Practice Mode
          </div>

          <h1 className="section-title">
            Create your <span className="gradient-text">custom quiz</span>
          </h1>

          <p className="section-subtitle mt-3">
            Subject, difficulty, timer aur question count choose karo. Baaki
            kaam arena sambhal lega.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <section className="glass-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-cyan-300" />
                <h2 className="text-lg font-semibold">Subject</h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                      selectedSubject === subject
                        ? "border-cyan-300/50 bg-cyan-400/10 text-white"
                        : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </section>

            <section className="glass-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <Brain className="h-5 w-5 text-fuchsia-300" />
                <h2 className="text-lg font-semibold">Difficulty</h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                      selectedDifficulty === difficulty
                        ? "border-fuchsia-300/50 bg-fuchsia-400/10 text-white"
                        : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </section>

            <section className="glass-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <Layers className="h-5 w-5 text-indigo-300" />
                <h2 className="text-lg font-semibold">Questions</h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
                {questionCounts.map((count) => (
                  <button
                    key={count}
                    onClick={() => setSelectedQuestionCount(count)}
                    className={`rounded-2xl border px-4 py-3 text-center text-sm font-medium transition ${
                      selectedQuestionCount === count
                        ? "border-indigo-300/50 bg-indigo-400/10 text-white"
                        : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </section>

            <section className="glass-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-emerald-300" />
                <h2 className="text-lg font-semibold">Timer</h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
                {timers.map((timer) => (
                  <button
                    key={timer}
                    onClick={() => setSelectedTimer(timer)}
                    className={`rounded-2xl border px-4 py-3 text-center text-sm font-medium transition ${
                      selectedTimer === timer
                        ? "border-emerald-300/50 bg-emerald-400/10 text-white"
                        : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                    }`}
                  >
                    {timer}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit space-y-6 lg:sticky lg:top-8">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold">Quiz Summary</h3>

              <div className="mt-4 space-y-3 text-sm text-zinc-300">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Subject</span>
                  <span className="font-semibold text-white">
                    {selectedSubject}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Difficulty</span>
                  <span className="font-semibold text-white">
                    {selectedDifficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Questions</span>
                  <span className="font-semibold text-white">
                    {selectedQuestionCount}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Timer</span>
                  <span className="font-semibold text-white">
                    {selectedTimer}
                  </span>
                </div>
              </div>

              <Link href="/quiz/demo-practice-session" className="btn-primary mt-6 w-full">
                <Flame className="h-5 w-5" />
                Start Quiz
              </Link>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-amber-300" />
                <h3 className="text-lg font-semibold">Pro Tip</h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Har din 20 questions ka timed practice lo. Accuracy ke saath
                speed bhi track karo. CUET me consistency hi final game hai.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
