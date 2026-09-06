import {
  BookOpen,
  GraduationCap,
  LineChart,
  Timer,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { PYQ_YEARS, SUBJECTS } from "@/lib/constants";

export function FeatureGrid() {
  return (
    <section className="mt-28">
      <SectionHeading
        eyebrow="Features"
        title={
          <>
            Built like a real{" "}
            <span className="gradient-text">exam engine</span>
          </>
        }
        subtitle="Har feature exam-day pressure ko simulate karne ke liye design kiya gaya hai."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-6">
        <div className="group glass-card p-8 transition hover:border-white/20 md:col-span-4">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
              <GraduationCap className="h-6 w-6 text-cyan-300 transition group-hover:scale-110" />
            </div>

            <span className="font-display text-sm text-zinc-600">
              01
            </span>
          </div>

          <h3 className="mt-6 font-display text-2xl font-semibold">
            PYQ Mode
          </h3>

          <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">
            Previous year papers ko real exam jaise timer aur negative
            marking ke saath solve karo. Submit ke baad full analysis milta
            hai.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {PYQ_YEARS.map((year) => (
              <span
                key={year}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:border-cyan-300/40 hover:text-white"
              >
                {year}
              </span>
            ))}
          </div>
        </div>

        <div className="group glass-card p-8 transition hover:border-white/20 md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
              <Timer className="h-6 w-6 text-emerald-300 transition group-hover:scale-110" />
            </div>

            <span className="font-display text-sm text-zinc-600">
              02
            </span>
          </div>

          <h3 className="mt-6 font-display text-2xl font-semibold">
            Time Control
          </h3>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Timer ring, auto submit aur time tracking.
          </p>

          <p className="mt-6 font-mono text-4xl font-bold text-emerald-300">
            15:00
          </p>
        </div>

        <div className="group glass-card p-8 transition hover:border-white/20 md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
              <LineChart className="h-6 w-6 text-fuchsia-300 transition group-hover:scale-110" />
            </div>

            <span className="font-display text-sm text-zinc-600">
              03
            </span>
          </div>

          <h3 className="mt-6 font-display text-2xl font-semibold">
            Analytics
          </h3>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Weak topics pakdo accuracy se pehle.
          </p>

          <div className="mt-6 flex items-end gap-2">
            <div className="h-8 w-4 rounded-t-lg bg-gradient-to-t from-indigo-500 to-indigo-300" />
            <div className="h-12 w-4 rounded-t-lg bg-gradient-to-t from-fuchsia-500 to-fuchsia-300" />
            <div className="h-6 w-4 rounded-t-lg bg-gradient-to-t from-cyan-500 to-cyan-300" />
            <div className="h-14 w-4 rounded-t-lg bg-gradient-to-t from-emerald-500 to-emerald-300" />
          </div>
        </div>

        <div className="group glass-card p-8 transition hover:border-white/20 md:col-span-4">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
              <BookOpen className="h-6 w-6 text-indigo-300 transition group-hover:scale-110" />
            </div>

            <span className="font-display text-sm text-zinc-600">
              04
            </span>
          </div>

          <h3 className="mt-6 font-display text-2xl font-semibold">
            Practice Mode
          </h3>

          <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">
            Subject, difficulty aur timer choose karke custom session banao.
            Engine tumhare liye questions pick karta hai.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {SUBJECTS.slice(0, 6).map((subject) => (
              <span
                key={subject.id}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:border-fuchsia-300/40 hover:text-white"
              >
                {subject.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
