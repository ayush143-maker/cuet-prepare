"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Clock,
  FileText,
  Layers,
  Play,
  Target,
} from "lucide-react";

import { AppShell, PageShell } from "@/components/layout";
import { Badge, Button, Card } from "@/components/ui";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { PYQ_PAPERS } from "@/lib/constants";
import { useQuizStore } from "@/store/quiz-store";
import type { QuizConfig } from "@/types/quiz";

type Props = {
  params: Promise<{
    paperId: string;
  }>;
};

export default function PyqPaperPage({ params }: Props) {
  const { paperId } = use(params);
  const router = useRouter();

  const startQuiz = useQuizStore((state) => state.startQuiz);

  const paper = PYQ_PAPERS.find((item) => item.id === paperId);

  if (!paper) {
    return (
      <AppShell>
        <PageShell>
          <EmptyState
            icon={FileText}
            title="Paper not found"
            description="Ye PYQ paper available nahi hai. PYQ page pe wapas jao aur dusra paper choose karo."
            action={
              <ButtonLink href="/pyq">
                Back to PYQs
              </ButtonLink>
            }
          />
        </PageShell>
      </AppShell>
    );
  }

  const startPaper = () => {
    const config: QuizConfig = {
      mode: "pyq",
      title: paper.title,
      section: paper.section,
      subject: paper.subject,
      topics: [],
      difficulty: "mixed",
      year: paper.year,
      questionCount: paper.totalQuestions,
      timeLimitSeconds: paper.durationMinutes * 60,
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
    <AppShell>
      <PageShell>
        <Link
          href="/pyq"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to PYQs
        </Link>

        <Card className="mt-8 p-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
              <FileText className="h-6 w-6 text-cyan-300" />
            </div>

            <Badge variant="info">PYQ {paper.year}</Badge>
            <Badge>{paper.subject}</Badge>
            <Badge variant="warning" className="capitalize">
              {paper.section} Section
            </Badge>
          </div>

          <h1 className="mt-6 text-3xl font-black md:text-5xl">
            {paper.title}
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Ye paper exam-like environment me solve karne ke liye best hai.
            Timer ke saath attempt karo aur phir detailed analysis check karo.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Clock className="h-5 w-5 text-emerald-300" />
              <p className="mt-3 text-sm text-zinc-400">Duration</p>
              <p className="mt-1 text-lg font-semibold">
                {paper.durationMinutes} Minutes
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Target className="h-5 w-5 text-fuchsia-300" />
              <p className="mt-3 text-sm text-zinc-400">Questions</p>
              <p className="mt-1 text-lg font-semibold">
                {paper.totalQuestions} Questions
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <BadgeCheck className="h-5 w-5 text-cyan-300" />
              <p className="mt-3 text-sm text-zinc-400">Marking</p>
              <p className="mt-1 text-lg font-semibold">
                +{paper.markingScheme.correct} / {paper.markingScheme.incorrect}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button onClick={startPaper} size="lg">
              <Play className="h-5 w-5" />
              Start Paper
            </Button>

            <ButtonLink href="/dashboard" variant="secondary" size="lg">
              View Past Attempts
            </ButtonLink>
          </div>
        </Card>

        <Card className="mt-8 p-6">
          <div className="flex items-start gap-3">
            <Layers className="mt-0.5 h-5 w-5 text-cyan-300" />

            <div>
              <h2 className="text-lg font-semibold">Attempt Strategy</h2>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Pehle easy questions clear karo. Phir medium. Last 10 minutes
                me marked questions review karo. Negative marking ko dhyan me
                rakh ke guess karo.
              </p>
            </div>
          </div>
        </Card>
      </PageShell>
    </AppShell>
  );
}
