import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  LineChart,
  Sparkles,
  Timer,
  Trophy,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Practice Mode",
    description:
      "Custom quizzes by subject, topic, difficulty, and timer settings.",
  },
  {
    icon: Timer,
    title: "PYQ Mode",
    description:
      "Solve previous-year style questions with exam-like pressure.",
  },
  {
    icon: LineChart,
    title: "Smart Analytics",
    description:
      "Track accuracy, weak topics, time management, and progress.",
  },
  {
    icon: Trophy,
    title: "Score Tracking",
    description:
      "See your improvement after every attempt and stay motivated.",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-cyan-400/10 blur-[100px]" />

      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl">
          <Sparkles className="h-4 w-4 text-cyan-300" />
          Built for CUET 2027 aspirants
        </div>

        <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
          Master CUET with
          <span className="gradient-text"> deadly practice</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
          Practice quizzes, solve PYQs, track your score, and find your weak
          topics before the real exam does.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/practice" className="btn-primary">
            Start Practice
            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link href="/pyq" className="btn-secondary">
            Explore PYQs
          </Link>
        </div>

        <div className="mt-16 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card p-6 text-left transition hover:scale-[1.02] hover:border-white/20"
            >
              <feature.icon className="h-10 w-10 rounded-2xl bg-white/5 p-2 text-cyan-300" />
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
