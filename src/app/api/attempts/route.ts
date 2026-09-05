import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    count: 3,
    attempts: [
      {
        id: "attempt_001",
        title: "Mathematics Practice",
        score: 42,
        maxScore: 60,
        accuracy: 70,
        timeTaken: "12:48",
        date: "2026-03-12",
      },
      {
        id: "attempt_002",
        title: "CUET UG 2024 Paper",
        score: 118,
        maxScore: 175,
        accuracy: 76,
        timeTaken: "41:03",
        date: "2026-03-11",
      },
      {
        id: "attempt_003",
        title: "Reasoning Drill",
        score: 18,
        maxScore: 30,
        accuracy: 60,
        timeTaken: "09:22",
        date: "2026-03-10",
      },
    ],
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    return NextResponse.json({
      success: true,
      attemptId: "attempt_demo_001",
      received: data,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body",
      },
      {
        status: 400,
      }
    );
  }
}
