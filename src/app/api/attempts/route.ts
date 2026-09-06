import { NextResponse } from "next/server";

import {
  clearAttempts,
  getAttemptById,
  getAttempts,
  saveAttempt,
} from "@/lib/attempt-store";
import { questionBank } from "@/lib/question-bank";
import { evaluateAttempt } from "@/lib/scoring";
import { attemptPayloadSchema } from "@/lib/validators";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const clear = searchParams.get("clear");

  if (clear === "true") {
    clearAttempts();

    return NextResponse.json({
      success: true,
      attempts: [],
    });
  }

  if (id) {
    const attempt = getAttemptById(id);

    if (!attempt) {
      return NextResponse.json(
        {
          success: false,
          message: "Attempt not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      attempt,
    });
  }

  const attempts = getAttempts();

  return NextResponse.json({
    success: true,
    count: attempts.length,
    attempts,
  });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid JSON body",
      },
      {
        status: 400,
      }
    );
  }

  const parsed = attemptPayloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid attempt payload",
        issues: parsed.error.issues.slice(0, 20),
      },
      {
        status: 400,
      }
    );
  }

  const { sessionId, answers, config } = parsed.data;

  const questionIds = Object.keys(answers);

  const questions = questionBank.filter((question) =>
    questionIds.includes(question.id)
  );

  if (questions.length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: "No matching questions found for this attempt",
      },
      {
        status: 400,
      }
    );
  }

  const result = evaluateAttempt({
    sessionId,
    title: config?.title ?? "Quiz Attempt",
    questions,
    answers,
  });

  saveAttempt(result);

  return NextResponse.json({
    success: true,
    attempt: result,
  });
}
