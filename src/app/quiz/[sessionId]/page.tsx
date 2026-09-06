"use client";

import { use, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  FileSearch,
  Send,
  Trophy,
} from "lucide-react";

import { AppShell, PageShell } from "@/components/layout";
import {
  QuestionCard,
  QuestionPalette,
  QuizHeader,
  SubmitModal,
} from "@/components/quiz";
import { Button, ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { useQuizSession } from "@/hooks";
import { getAttemptedCount } from "@/lib/quiz";
import { formatTime } from "@/lib/utils";

type Props = {
  params: Promise<{
    sessionId: string;
  }>;
};

export default function QuizPage({ params }: Props) {
  const { sessionId } = use(params);

  const [submitOpen, setSubmitOpen] = useState(false);

  const {
    session,
    questions,
    result,
    currentQuestion,
    selectAnswer,
    toggleMark,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitQuiz,
  } = useQuizSession();

  if (!session || session.id !== sessionId) {
    return (
      <AppShell>
        <PageShell>
          <EmptyState
            icon={FileSearch}
            title="Quiz session not found"
            description="Session expire ho gaya hai ya page refresh ke baad session reset ho gaya. Naya quiz start karo."
            action={
              <ButtonLink href="/practice">
                Go to Practice
              </ButtonLink>
            }
          />
        </PageShell>
      </AppShell>
    );
  }

  if (session.status === "submitted" && result) {
    return (
      <AppShell>
        <PageShell>
          <div className="glass-card mx-auto max-w-xl p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10">
              <Trophy className="h-7 w-7 text-emerald-300" />
            </div>

            <h1 className="mt-6 text-3xl font-black">Quiz Submitted</h1>

            <p className="mt-3 text-zinc-400">
              Score: {result.score}/{result.maxScore} • Accuracy:{" "}
              {result.accuracy}% • Time:{" "}
              {formatTime(result.totalTimeTakenSeconds)}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={`/results/${result.id}`}>
                View Full Result
              </ButtonLink>

              <ButtonLink href="/dashboard" variant="secondary">
                Dashboard
              </ButtonLink>
            </div>
          </div>
        </PageShell>
      </AppShell>
    );
  }

  if (!currentQuestion) {
    return (
      <AppShell>
        <PageShell>
          <EmptyState
            icon={FileSearch}
            title="No question found"
            description="Is quiz session ke liye questions load nahi ho paye."
            action={
              <ButtonLink href="/practice">
                Start New Quiz
              </ButtonLink>
            }
          />
        </PageShell>
      </AppShell>
    );
  }

  const attempted = getAttemptedCount(session.answers);
  const isLastQuestion = session.currentIndex === questions.length - 1;
  const isMarked = Boolean(session.markedForReview[currentQuestion.id]);

  return (
    <AppShell>
      <PageShell className="py-10">
        <QuizHeader session={session} />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <QuestionCard
              question={currentQuestion}
              selectedIndex={session.answers[currentQuestion.id] ?? null}
              submitted={false}
              showExplanation={false}
              onSelect={(optionIndex) =>
                selectAnswer(currentQuestion.id, optionIndex)
              }
            />

            <div className="glass-card flex flex-wrap items-center justify-between gap-4 p-6">
              <Button
                variant="secondary"
                onClick={previousQuestion}
                disabled={session.currentIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" />
                Previous
              </Button>

              <Button
                variant="secondary"
                onClick={() => toggleMark(currentQuestion.id)}
                className={
                  isMarked
                    ? "border-amber-300/40 bg-amber-400/10 text-amber-200"
                    : undefined
                }
              >
                <Flag className="h-5 w-5" />
                {isMarked ? "Marked" : "Mark for Review"}
              </Button>

              {isLastQuestion ? (
                <Button onClick={() => setSubmitOpen(true)}>
                  <Send className="h-5 w-5" />
                  Submit Quiz
                </Button>
              ) : (
                <Button onClick={nextQuestion}>
                  Next
                  <ChevronRight className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>

          <aside>
            <QuestionPalette
              questions={questions}
              answers={session.answers}
              marked={session.markedForReview}
              currentIndex={session.currentIndex}
              onSelect={goToQuestion}
            />
          </aside>
        </div>

        <SubmitModal
          open={submitOpen}
          attempted={attempted}
          total={questions.length}
          onCancel={() => setSubmitOpen(false)}
          onSubmit={() => {
            setSubmitOpen(false);
            submitQuiz();
          }}
        />
      </PageShell>
    </AppShell>
  );
}
