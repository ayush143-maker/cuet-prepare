import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Sparkles,
  Trophy,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

const modes = [
  {
    title: "Quick Practice",
    description: "10-15 questions ka fast session.",
    href: "/practice",
    icon: Sparkles,
  },
  {
    title: "PYQ Arena",
    description: "Exam pressure ke saath previous year practice.",
    href: "/pyq",
    icon: GraduationCap,
  },
  {
    title: "Dashboard",
    description: "Progress, streaks aur weak topics.",
    href: "/dashboard",
    icon: Trophy,
  },
];

export function ModeGrid() {
  return (
    <section className="mt-24">
      <SectionHeading
        eyebrow="Modes"
        title="Choose your arena"
        subtitle="Quick practice, PYQ grind ya progress tracking — sab ek click away."
        align="center"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {modes.map((mode) => (
          <Link
            key={mode.title}
            href={mode.href}
            className="block h-full"
          >
            <Card className="h-full p-6 transition hover:scale-[1.02] hover:border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                  <mode.icon className="h-6 w-6 text-fuchsia-300" />
                </div>

                <ArrowRight className="h-5 w-5 text-zinc-500" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">{mode.title}</h3>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {mode.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
