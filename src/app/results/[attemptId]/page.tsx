"use client";

import { use, useEffect, useState } from "react";
import { FileSearch } from "lucide-react";

import { AppShell, PageShell } from "@/components/layout";
import {
  ResultActions,
  ScoreSummary,
  TopicStats,
  WeakTopics,
} from "@/components/results";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { useAnalyticsStore } from "@/store/analytics-store";

type Props = {
  params: Promise<{
    attemptId: string;
  }>;
};

export default function ResultsPage({ params }: Props) {
  const { attemptId } = use(params);

  const [mounted, setMounted] = useState(false);

  const attempts = useAnalyticsStore((state) => state.attempts);

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

  const result = attempts.find(
    (attempt) =>
      attempt.id === attemptId || attempt.sessionId === attemptId
  );

  if (!result) {
    return (
      <AppShell>
        <PageShell>
          <EmptyState
            icon={FileSearch}
            title="Result not found"
            description="Ye attempt local analytics me nahi mila. Ho sakta hai history clear ho gayi ho."
            action={
              <ButtonLink href="/practice">
                Practice Now
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
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm text-zinc-400">
              Attempt ID: {result.id}
            </p>

            <h1 className="mt-2 text-3xl font-black md:text-5xl">
              Result <span className="gradient-text">Analysis</span>
            </h1>

            <p className="mt-3 max-w-2xl text-zinc-400">
              {result.title} •{" "}
              {new Date(result.date).toLocaleDateString()}
            </p>
          </div>

          <ResultActions retryHref="/practice" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <ScoreSummary result={result} />
            <WeakTopics topicStats={result.topicStats} />
          </div>

          <TopicStats topicStats={result.topicStats} />
        </div>
      </PageShell>
    </AppShell>
  );
}
