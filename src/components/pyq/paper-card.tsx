import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  FileText,
  Layers,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { PyqPaper } from "@/types/cuet";

import { PaperMeta } from "./paper-meta";

interface PaperCardProps {
  paper: PyqPaper;
}

export function PaperCard({ paper }: PaperCardProps) {
  return (
    <Link
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

        <div className="mt-6 space-y-3">
          <PaperMeta
            icon={Clock}
            label="Duration"
            value={`${paper.durationMinutes} minutes`}
          />

          <PaperMeta
            icon={Layers}
            label="Questions"
            value={`${paper.totalQuestions} questions`}
          />

          <PaperMeta
            icon={BadgeCheck}
            label="Marking"
            value={`+${paper.markingScheme.correct} / ${paper.markingScheme.incorrect}`}
          />
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
          Open Paper
          <ArrowRight className="h-4 w-4" />
        </div>
      </Card>
    </Link>
  );
}
