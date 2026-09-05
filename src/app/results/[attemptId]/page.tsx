import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  Clock,
  RefreshCcw,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

type Props = {
  params: Promise<{
    attemptId: string;
  }>;
};

const topicStats = [
  {
    topic: "Matrices",
    accuracy: 80,
    time: "52s",
  },
  {
    topic: "Probability",
    accuracy: 60,
    time: "68s",
  },
  {
    topic: "Logical Reasoning",
    accuracy: 40,
    time: "81s",
  },
];

export default async function ResultsPage({ params }: Props) {
  const { attemptId } = await params;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -top-32 right-0 h-[400px] w-[500px] rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm text-zinc-400">Attempt ID: {attemptId}</p>

          <h1 className="section-title mt-2">
            Your <span className="gradient-text">Result Analysis</span>
          </h1>

          <p className="section-subtitle mt-3">
            Score sirf number nahi hai. Ye bata raha hai ki next improvement
            kahan karni hai.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="glass-card p-6">
            <Trophy className="h-6 w-6 text-amber-300" />
            <p className="mt-4 text-sm text-zinc-400">Score</p>
            <p className="mt-2 text-3xl font-black">42/60</p>
          </div>

          <div className="glass-card p-6">
            <BadgeCheck className="h-6 w-6 text-emerald-300" />
            <p className="mt-4 text-sm text-zinc-400">Accuracy</p>
            <p className="mt-2 text-3xl font-black">70%</p>
          </div>

          <div className="glass-card p-6">
            <Clock className="h-6 w-6 text-cyan-300" />
            <p className="mt-4 text-sm text-zinc-400">Time Taken</p>
            <p className="mt-2 text-3xl font-black">12:48</p>
          </div>

          <div className="glass-card p-6">
            <TrendingUp className="h-6 w-6 text-fuchsia-300" />
            <p className="mt-4 text-sm text-zinc-400">Improvement</p>
            <p className="mt-2 text-3xl font-black">+8%</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="glass-card p-6">
            <div className="flex items-center gap-3">
              <Brain className="h-5 w-5 text-fuchsia-300" />
              <h2 className="text-lg font-semibold">Weak Topics</h2>
            </div>

            <div className="mt-4 space-y-4">
              {topicStats.map((item) => (
                <div
                  key={item.topic}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{item.topic}</h3>
                    <span className="text-sm text-zinc-400">
                      Avg Time: {item.time}
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-300"
                      style={{ width: `${item.accuracy}%` }}
                    />
                  </div>

                  <p className="mt-3 text-sm text-zinc-400">
                    Accuracy: {item.accuracy}%
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card p-6">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-cyan-300" />
              <h2 className="text-lg font-semibold">Recommended Next Step</h2>
            </div>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Tumhara Logical Reasoning thoda weak lag raha hai. Aaj 15 medium
              level reasoning questions practice karo. Phir kal ek timed PYQ
              attempt lo.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="font-semibold">Today</p>
                <p className="mt-1 text-sm text-zinc-400">
                  15 Logical Reasoning questions, no timer
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="font-semibold">Tomorrow</p>
                <p className="mt-1 text-sm text-zinc-400">
                  1 timed PYQ paper, full exam mode
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/practice" className="btn-primary">
                Practice Weak Topics
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link href="/quiz/demo-retry-session" className="btn-secondary">
                <RefreshCcw className="h-5 w-5" />
                Retry Quiz
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
