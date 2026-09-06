"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  History,
  Target,
  Trash2,
  TrendingUp,
  Trophy,
} from "lucide-react";

import { AppShell, PageShell } from "@/components/layout";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Progress } from "@/components/ui/progress";
import { formatTime } from "@/lib/utils";
import {
  getDashboardStats,
  useAnalyticsStore,
} from "@/store/analytics-store";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  const attempts = useAnalyticsStore((state) => state.attempts);
  const clearHistory = useAnalyticsStore((state) => state.clearHistory);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <AppShell>
        <PageShell>
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-cyan-300" />
          </div>
        </PageShell>
      </AppShell>
    );
  }

  const stats = getDashboardStats(attempts);

  if (attempts.length === 0) {
    return (
      <AppShell>
        <PageShell>
          <EmptyState
            icon={History}
            title="No attempts yet"
            description="Abhi tak koi quiz attempt nahi hua. Pehla practice quiz start karo aur apni analytics track karna shuru karo."
            action={
              <ButtonLink href="/practice">
                Start First Quiz
              </ButtonLink>
            }
          />
        </PageShell>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageShell>
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="section-title">
              Your <span className="gradient-text">Dashboard</span>
            </h1>

            <p className="section-subtitle mt-3">
              Attempts, accuracy aur time management ek jagah.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/practice">
              New Practice
            </ButtonLink>

            <Button variant="secondary" onClick={clearHistory}>
              <Trash2 className="h-5 w-5" />
              Clear History
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <Trophy className="h-6 w-6 text-amber-300" />
              <p className="mt-4 text-sm text-zinc-400">Total Attempts</p>
              <p className="mt-2 text-3xl font-black">
                {stats.totalAttempts}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Target className="h-6 w-6 text-cyan-300" />
              <p className="mt-4 text-sm text-zinc-400">Average Accuracy</p>
              <p className="mt-2 text-3xl font-black">
                {stats.averageAccuracy}%
              </p>

              <Progress
                className="mt-4"
                value={stats.averageAccuracy}
                max={100}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Clock className="h-6 w-6 text-emerald-300" />
              <p className="mt-4 text-sm text-zinc-400">
                Avg Time / Question
              </p>
              <p className="mt-2 text-3xl font-black">
                {formatTime(stats.averageTimePerQuestionSeconds)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <TrendingUp className="h-6 w-6 text-fuchsia-300" />
              <p className="mt-4 text-sm text-zinc-400">Weekly Growth</p>
              <p className="mt-2 text-3xl font-black">
                {stats.weeklyGrowthPercentage}%
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Recent Attempts</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {attempts.slice(0, 8).map((attempt) => (
                <div
                  key={attempt.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{attempt.title}</h3>

                      <p className="mt-1 text-sm text-zinc-400">
                        Score: {attempt.score}/{attempt.maxScore} • Accuracy:{" "}
                        {attempt.accuracy}%
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-zinc-400">Time</p>
                      <p className="font-semibold">
                        {formatTime(attempt.totalTimeTakenSeconds)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <ButtonLink
                      href={`/results/${attempt.id}`}
                      variant="secondary"
                      size="sm"
                    >
                      View Result
                    </ButtonLink>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Insight</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-cyan-300">
                  Accuracy Focus
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Agar average accuracy 70% se kam hai, to pehle bina timer ke
                  concept-based questions solve karo.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-fuchsia-300">
                  Time Focus
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Agar average time per question 70s se zyada hai, to short
                  drills karo: 10 questions, 8 minutes.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-emerald-300">
                  PYQ Focus
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Week me kam se kam 2 PYQ papers exam mode me solve karo.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageShell>
    </AppShell>
  );
}
