import { NextResponse } from "next/server";

import { PYQ_PAPERS } from "@/lib/constants";
import { getPyqQuestions } from "@/lib/question-bank";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const yearRaw = searchParams.get("year");

  const year = yearRaw ? Number(yearRaw) : undefined;

  const safeYear = Number.isFinite(year) ? year : undefined;

  const papers = safeYear
    ? PYQ_PAPERS.filter((paper) => paper.year === safeYear)
    : PYQ_PAPERS;

  const questions = getPyqQuestions(safeYear);

  return NextResponse.json({
    year: safeYear ?? null,
    count: questions.length,
    papers,
    questions,
  });
}
