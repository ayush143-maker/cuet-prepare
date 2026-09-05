import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Clock,
  FileText,
  Play,
  Target,
} from "lucide-react";

type Props = {
  params: Promise<{
    paperId: string;
  }>;
};

export default async function PyqPaperPage({ params }: Props) {
  const { paperId } = await params;

  const paperTitle = decodeURIComponent(paperId)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -top-32 right-0 h-[400px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="mx-auto max-w-5xl px-6 py-16">
        <Link
          href="/pyq"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to PYQs
        </Link>

        <div className="glass-card mt-8 p-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
              <FileText className="h-6 w-6 text-cyan-300" />
            </div>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              Previous Year Paper
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              Exam Mode
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-black md:text-5xl">
            {paperTitle}
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Ye paper exam-like environment me solve karne ke liye best hai.
            Timer ke saath attempt karo aur phir detailed analysis check karo.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Clock className="h-5 w-5 text-emerald-300" />
              <p className="mt-3 text-sm text-zinc-400">Duration</p>
              <p className="mt-1 text-lg font-semibold">45 Minutes</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Target className="h-5 w-5 text-fuchsia-300" />
              <p className="mt-3 text-sm text-zinc-400">Questions</p>
              <p className="mt-1 text-lg font-semibold">35 Questions</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <BadgeCheck className="h-5 w-5 text-cyan-300" />
              <p className="mt-3 text-sm text-zinc-400">Marking</p>
              <p className="mt-1 text-lg font-semibold">+5 / -1</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href={`/quiz/${paperId}`} className="btn-primary">
              <Play className="h-5 w-5" />
              Start Paper
            </Link>

            <Link href="/dashboard" className="btn-secondary">
              View Past Attempts
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
