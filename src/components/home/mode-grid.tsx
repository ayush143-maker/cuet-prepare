import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Sparkles,
  Trophy,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";

const modes = [
  {
    number: "01",
    title: "Quick Practice",
    description: "10-15 questions ka fast session. Warmup ke liye perfect.",
    href: "/practice",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "PYQ Arena",
    description: "Exam pressure ke saath previous year papers.",
    href: "/pyq",
    icon: GraduationCap,
  },
  {
    number: "03",
    title: "Dashboard",
    description: "Progress, weak topics aur growth tracking.",
    href: "/dashboard",
    icon: Trophy,
  },
];

export function ModeGrid() {
  return (
    <section className="mt-28">
      <SectionHeading
        eyebrow="Modes"
        title="Choose your arena"
        subtitle="Teen tarike se prep karo — mood ke hisaab se."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {modes.map((mode) => (
          <Link
            key={mode.title}
            href={mode.href}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-white/20 hover:bg-white/10"
          >
            <div className="pointer-events-none absolute -inset-20 bg-gradient-to-tr from-indigo-500/10 via-fuchsia-500/5 to-cyan-400/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                  <mode.icon className="h-6 w-6 text-fuchsia-300 transition group-hover:scale-110" />
                </div>

                <span className="font-display text-sm text-zinc-600">
                  {mode.number}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-semibold">
                {mode.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {mode.description}
              </p>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                Enter Arena
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
