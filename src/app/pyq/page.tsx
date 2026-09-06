import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  FileText,
  GraduationCap,
  Layers,
} from "lucide-react";

import { AppShell, PageShell } from "@/components/layout";
import {
  Badge,
  Card,
  SectionHeading,
} from "@/components/ui";
import { PYQ_PAPERS, PYQ_YEARS } from "@/lib/constants";

export default function PyqPage() {
  return (
    <AppShell>
      <PageShell>
        <SectionHeading
          eyebrow="PYQ Mode"
          title={
            <>
              Previous Year <span className="gradient-text">Question Papers</span>
            </>
          }
          subtitle="Exam-like timer, marking scheme aur detailed analysis ke saath PYQ practice karo."
        />

        <div className="mt-8 flex flex-wrap gap-3">
          {PYQ_YEARS.map((year) => (
            <Badge key={year} variant="default">
              CUET UG {year}
            </Badge>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PYQ_PAPERS.map((paper) => (
            <Link
              key={paper.id}
              href={`/pyq/${paper.id}`}
              className="block h-full"
            >
              <Card className="h-full p-6 transition hover:scale-[1.02] hover:border-white/20">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                    <FileText className="h-6 w-6 text-cyan-300" />
                  </div>

                  <Badge variant="info">{paper.year}</Badge>
                </div>

                <h2 className="mt-5 text-xl font-bold">{paper.title}</h2>

                <p className="mt-2 text-sm text-zinc-400">
                  {paper.subject} • {paper.section} section
                </p>

                <div className="mt-6 space-y-3 text-sm text-zinc-300">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-emerald-300" />
                    {paper.durationMinutes} minutes
                  </div>

                  <div className="flex items-center gap-3">
                    <Layers className="h-4 w-4 text-fuchsia-300" />
                    {paper.totalQuestions} questions
                  </div>

                  <div className="flex items-center gap-3">
                    <BadgeCheck className="h-4 w-4 text-cyan-300" />+
                    {paper.markingScheme.correct} /{" "}
                    {paper.markingScheme.incorrect} marking
                  </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  Open Paper
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="mt-10 flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-fuchsia-300" />
              <h2 className="text-xl font-semibold">
                Exam Mode Recommended
              </h2>
            </div>

            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              PYQ solve karte waqt full timer on rakho. Real exam pressure me
              accuracy aur time management dono improve hota hai.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-zinc-300">
            <Clock className="h-5 w-5 text-emerald-300" />
            Target: 60 seconds per question
          </div>
        </Card>
      </PageShell>
    </AppShell>
  );
}
