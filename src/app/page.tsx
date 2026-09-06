import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  GraduationCap,
  LineChart,
  Sparkles,
  Timer,
  Trophy,
} from "lucide-react";

import { AppShell, PageShell } from "@/components/layout";
import {
  Badge,
  ButtonLink,
  Card,
  SectionHeading,
} from "@/components/ui";
import { SUBJECTS } from "@/lib/constants";

const stats = [
  {
    label: "Practice Questions",
    value: "500+",
  },
  {
    label: "PYQ Papers",
    value: "5 Years",
  },
  {
    label: "Analytics",
    value: "Topic-wise",
  },
  {
    label: "Exam Mode",
    value: "Timer + Marking",
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Practice Mode",
    description:
      "Subject, topic, difficulty aur timer choose karke custom quiz banao.",
  },
  {
    icon: GraduationCap,
    title: "PYQ Mode",
    description:
      "Previous year papers ko exam-like environment me solve karo.",
  },
  {
    icon: Timer,
    title: "Time Control",
    description:
      "Timer ring, auto submit aur time tracking ke saath real exam feel.",
  },
  {
    icon: LineChart,
    title: "Smart Analytics",
    description:
      "Accuracy, weak topics aur time management ko visually track karo.",
  },
];

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

export default function HomePage() {
  return (
    <AppShell>
      <PageShell className="py-20">
        <section className="mx-auto max-w-4xl text-center">
          <Badge variant="gradient">
            <Sparkles className="h-3.5 w-3.5" />
            Built for CUET 2027
          </Badge>

          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Master CUET with
            <br />
            <span className="gradient-text">deadly practice</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Practice quizzes, PYQ mode, timer, score tracking aur topic-wise
            analytics. Sab kuch ek premium prep arena me.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href="/practice" size="lg">
              Start Practice
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>

            <ButtonLink href="/pyq" variant="secondary" size="lg">
              Explore PYQs
            </ButtonLink>
          </div>
        </section>

        <section className="mt-20 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 text-center">
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="mt-2 text-sm text-zinc-400">{stat.label}</p>
            </Card>
          ))}
        </section>

        <section className="mt-24">
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to crack CUET"
            subtitle="Sirf questions solve karna kaafi nahi hai. Tumhe pata hona chahiye ki kahan improvement karni hai."
            align="center"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="p-6 transition hover:scale-[1.02] hover:border-white/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                  <feature.icon className="h-6 w-6 text-cyan-300" />
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

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

        <section className="mt-24">
          <SectionHeading
            eyebrow="Subjects"
            title="Coverage for major CUET subjects"
            subtitle="Mathematics, Science, Language, General Test aur domain subjects ke liye practice-ready structure."
          />

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {SUBJECTS.map((subject) => (
              <Card key={subject.id} className="p-5">
                <p className="font-semibold">{subject.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {subject.section}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <Card className="p-10 text-center">
            <Brain className="mx-auto h-10 w-10 text-cyan-300" />

            <h2 className="mt-6 text-3xl font-black md:text-4xl">
              Ready to enter the arena?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-zinc-400">
              Aaj se timed practice shuru karo. Har attempt ke baad analytics
              tumhe batayega ki next kya improve karna hai.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href="/practice" size="lg">
                Start Your First Quiz
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>

              <ButtonLink href="/dashboard" variant="secondary" size="lg">
                View Dashboard
              </ButtonLink>
            </div>
          </Card>
        </section>
      </PageShell>
    </AppShell>
  );
}
