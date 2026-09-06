import { NextResponse } from "next/server";

import { getQuestions } from "@/lib/question-bank";
import type { QuestionSource } from "@/types/question";
import type { DifficultyFilter } from "@/types/quiz";

function parseDifficulty(value: string | null): DifficultyFilter | undefined {
  if (
    value === "easy" ||
    value === "medium" ||
    value === "hard" ||
    value === "mixed"
  ) {
    return value;
  }

  return undefined;
}

function parseSource(value: string | null): QuestionSource | undefined {
  if (
    value === "sample" ||
    value === "pyq" ||
    value === "mock" ||
    value === "user"
  ) {
    return value;
  }

  return undefined;
}

function parseNumber(value: string | null): number | undefined {
  if (value === null || value === "") {
    return undefined;
  }

  const parsed = Number(value);

  if (typeof parsed !== "number" || !Number.isFinite(parsed)) {
    return undefined;
  }

  return parsed;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const subject = searchParams.get("subject") ?? undefined;
  const topic = searchParams.get("topic") ?? undefined;

  const difficulty = parseDifficulty(searchParams.get("difficulty"));
  const source = parseSource(searchParams.get("source"));

  const includePyq =
    searchParams.get("includePyq") === "false" ? false : undefined;

  const shuffle = searchParams.get("shuffle") === "true";

  const year = parseNumber(searchParams.get("year"));

  const parsedLimit = parseNumber(searchParams.get("limit"));

  const limit =
    typeof parsedLimit === "number" && parsedLimit > 0
      ? parsedLimit
      : undefined;

  const questions = getQuestions({
    subject,
    topic,
    difficulty,
    source,
    includePyq,
    shuffle,
    year,
    limit,
  });

  return NextResponse.json({
    count: questions.length,
    questions,
  });
}
