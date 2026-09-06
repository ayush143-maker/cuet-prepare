"use client";

import { useMemo, useState } from "react";
import { Clock, FileSearch, GraduationCap } from "lucide-react";

import { AppShell, PageShell } from "@/components/layout";
import { PaperCard, YearFilter } from "@/components/pyq";
import { Card, SectionHeading } from "@/components/ui";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { PYQ_PAPERS, PYQ_YEARS } from "@/lib/constants";

export default function PyqPage() {
  const [activeYear, setActiveYear] = useState<number | null>(null);

  const filteredPapers = useMemo(() => {
    if (!activeYear) {
      return PYQ_PAPERS;
    }

    return PYQ_PAPERS.filter((paper) => paper.year === activeYear);
  }, [activeYear]);

  return (
    <AppShell>
      <PageShell>
        <SectionHeading
          eyebrow="PYQ Mode"
          title={
            <>
              Previous Year{" "}
              <span className="gradient-text">Question Papers</span>
            </>
          }
          subtitle="Exam-like timer, marking scheme aur detailed analysis ke saath PYQ practice karo."
        />

        <div className="mt-8">
          <YearFilter
            years={PYQ_YEARS}
            activeYear={activeYear}
            onSelect={setActiveYear}
          />
        </div>

        {filteredPapers.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              icon={FileSearch}
              title="No papers found"
              description="Is year ke liye abhi koi PYQ paper available nahi hai. Dusri year choose karo ya all years dekho."
              action={
                <ButtonLink
                  href="/pyq"
                  variant="secondary"
                >
                  Reset Filters
                </ButtonLink>
              }
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredPapers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        )}

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
