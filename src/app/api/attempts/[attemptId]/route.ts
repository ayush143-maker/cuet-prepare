import { NextResponse } from "next/server";

import { getAttemptById } from "@/lib/attempt-store";

type Context = {
  params: Promise<{
    attemptId: string;
  }>;
};

export async function GET(_request: Request, context: Context) {
  const { attemptId } = await context.params;

  const attempt = getAttemptById(attemptId);

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
