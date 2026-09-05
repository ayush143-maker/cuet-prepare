import Link from "next/link";
import {
  ArrowRight,
  FileText,
  GraduationCap,
  History,
  ScrollText,
  Timer,
} from "lucide-react";

const years = [
  {
    year: "2022",
    papers: 8,
    slug: "cuet-ug-2022",
  },
  {
    year: "2023",
    papers: 12,
    slug: "cuet-ug-2023",
  },
  {
    year: "2024",
    papers: 15,
    slug: "cuet-ug-2024",
  },
  {
    year: "2025",
    papers: 10,
    slug: "cuet-ug-2025",
  },
  {
    year: "2026",
    papers: 6,
    slug: "cuet-ug-2026",
  },
];

export default function PyqPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-0 h-[400px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-cyan-400/10 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            <History className="h-4 w-4 text-cyan-300" />
            PYQ Mode
          </div>

          <h1 className="section-title">
            Previous Year <span className="gradient-text">Question Papers</span>
          </h1>

          <p className="section-subtitle mt-3">
            Exam feel ke saath PYQ practice karo. Timer, marking scheme aur
            solutions ke saath.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {years.map((item) => (
            <Link
              key={item.slug}
              href={`/pyq/${item.slug}`}
              className="glass-card group p-6 transition hover:scale-[1.02] hover:border-white/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                  <ScrollText className="h-6 w-6 text-cyan-300" />
                </div>

                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                  {item.papers} Papers
                </span>
              </div>

              <h2 className="mt-6 text-2xl font-bold">CUET UG {item.year}</h2>

              <p className="mt-2 text-sm text-zinc-400">
                Solve {item.year} questions with exam-like timer and detailed
                analysis.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                Open Papers
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="glass-card mt-10 flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-fuchsia-300" />
              <h2 className="text-xl font-semibold">Exam Mode Recommended</h2>
            </div>

            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              PYQ solve karte waqt full timer on rakho. Real exam pressure me
              accuracy improve hoti hai.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-zinc-300">
            <Timer className="h-5 w-5 text-emerald-300" />
            Average time per question: 60 sec
          </div>
        </div>
      </div>
    </main>
  );
}
