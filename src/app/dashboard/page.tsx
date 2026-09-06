"use client";

import { useEffect, useState } from "react";
import {
  Brain,
  Clock,
  GraduationCap,
  History,
  Target,
  Timer,
  Trash2,
  TrendingUp,
  Trophy,
} from "lucide-react";

import {
  AttemptList,
  InsightCard,
  StatCard,
} from "@/components/dashboard";
import { AppShell, PageShell } from "@/components/layout";
import { Button, ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui";
import { getRecommendation } from "@/lib/analytics";
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
  const latestAttempt = attempts[0];

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

  const recommendation = latestAttempt
    ? getRecommendation(latestAttempt.topicStats)
    : null;

  return (
    <AppShell>
      <PageShell>
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Dashboard"
            title={
              <>
                Your <span className="gradient-text">Prep HQ</span>
              </>
            }
            subtitle="Attempts, accuracy, time management aur smart recommendations — sab ek jagah."
          />

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/practice">
              New Practice
            </ButtonLink>

            <ButtonLink href="/pyq" variant="secondary">
              Solve PYQ
            </ButtonLink>

            <Button variant="ghost" onClick={clearHistory}>
              <Trash2 className="h-5 w-5" />
              Clear History
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Trophy}
            label="Total Attempts"
            value={String(stats.totalAttempts)}
            description="Quiz attempts completed so far."
            iconClassName="text-amber-300"
          />

          <StatCard
            icon={Target}
            label="Average Accuracy"
            value={`${stats.averageAccuracy}%`}
            description="Overall correctness across attempts."
            iconClassName="text-cyan-300"
          />

          <StatCard
            icon={Clock}
            label="Avg Time / Question"
            value={formatTime(stats.averageTimePerQuestionSeconds)}
            description="Speed matters, but accuracy first."
            iconClassName="text-emerald-300"
          />

          <StatCard
            icon={TrendingUp}
            label="Weekly Growth"
            value={`${stats.weeklyGrowthPercentage}%`}
            description="Based on recent attempt accuracy."
            iconClassName="text-fuchsia-300"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <AttemptList attempts={attempts} maxItems={8} />

          <div className="space-y-6">
            {recommendation ? (
              <InsightCard
                icon={Brain}
                tone="warning"
                title={recommendation.title}
                description={recommendation.description}
              />
            ) : null}

            <InsightCard
              icon={Target}
              tone="info"
              title="Accuracy Focus"
              description="Agar average accuracy 70% se kam hai, to pehle bina timer ke concept-based questions solve karo."
            />

            <InsightCard
              icon={Timer}
              tone="success"
              title="Time Focus"
              description="Agar average time per question 70s se zyada hai, to short drills karo: 10 questions, 8 minutes."
            />

            <InsightCard
              icon={GraduationCap}
              tone="info"
              title="PYQ Focus"
              description="Week me kam se kam 2 PYQ papers exam mode me solve karo."
            />
          </div>
        </div>
      </PageShell>
    </AppShell>
  );
}
