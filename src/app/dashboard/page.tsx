import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Flame,
  History,
  LineChart,
  Target,
  Timer,
  Trophy,
} from "lucide-react";

const recentAttempts = [
  {
    id: "attempt_001",
    title: "Mathematics Practice",
    score: "42/60",
    accuracy: "70%",
    time: "12:48",
  },
  {
    id: "attempt_002",
    title: "CUET UG 2024 Paper",
    score: "118/175",
    accuracy: "76%",
    time: "41:03",
  },
  {
    id: "attempt_003",
    title: "Reasoning Drill",
    score: "18/30",
    accuracy: "60%",
    time: "09:22",
  },
];

const subjects = [
  {
    name: "Mathematics",
    mastery: 76,
  },
  {
    name: "English",
    mastery: 68,
  },
  {
    name: "General Test",
    mastery: 61,
  },
  {
    name: "History",
    mastery: 48,
  },
];

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-0 h-[400px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-cyan-400/10 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
              <Flame className="h-4 w-4 text-amber-300" />
              7-day streak active
            </div>

            <h1 className="section-title">
              Your <span className="gradient-text">Prep Dashboard</span>
            </h1>

            <p className="section-subtitle mt-3">
              Yahan se pata chalega ki tumhara consistency kaisa chal raha hai.
            </p>
          </div>

          <Link href="/practice" className="btn-primary">
            <BookOpen className="h-5 w-5" />
            Start New Practice
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="glass-card p-6">
            <Trophy className="h-6 w-6 text-amber-300" />
            <p className="mt-4 text-sm text-zinc-400">Total Attempts</p>
            <p className="mt-2 text-3xl font-black">24</p>
          </div>

          <div className="glass-card p-6">
            <Target className="h-6 w-6 text-cyan-300" />
            <p className="mt-4 text-sm text-zinc-400">Average Accuracy</p>
            <p className="mt-2 text-3xl font-black">71%</p>
          </div>

          <div className="glass-card p-6">
            <Timer className="h-6 w-6 text-emerald-300" />
            <p className="mt-4 text-sm text-zinc-400">Avg Time/Question</p>
            <p className="mt-2 text-3xl font-black">58s</p>
          </div>

          <div className="glass-card p-6">
            <LineChart className="h-6 w-6 text-fuchsia-300" />
            <p className="mt-4 text-sm text-zinc-400">Weekly Growth</p>
            <p className="mt-2 text-3xl font-black">+12%</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <History className="h-5 w-5 text-cyan-300" />
                <h2 className="text-lg font-semibold">Recent Attempts</h2>
              </div>

              <Link
                href="/results/demo-attempt"
                className="text-sm font-medium text-cyan-300 hover:text-white"
              >
                View all
              </Link>
            </div>

            <div className="mt-4 space-y-4">
              {recentAttempts.map((attempt) => (
                <div
                  key={attempt.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{attempt.title}</h3>
                      <p className="mt-1 text-sm text-zinc-400">
                        Score: {attempt.score} • Accuracy: {attempt.accuracy}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-zinc-400">Time</p>
                      <p className="font-semibold">{attempt.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card p-6">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-fuchsia-300" />
              <h2 className="text-lg font-semibold">Subject Mastery</h2>
            </div>

            <div className="mt-5 space-y-5">
              {subjects.map((subject) => (
                <div key={subject.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span>{subject.name}</span>
                    <span className="text-zinc-400">{subject.mastery}%</span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-300"
                      style={{ width: `${subject.mastery}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-amber-300">
                Focus Area
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                History me mastery kam hai. Aaj 20 PYQ questions se revision
                start karo.
              </p>

              <Link
                href="/pyq"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300"
              >
                Open PYQs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
