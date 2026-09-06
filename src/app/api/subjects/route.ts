import { NextResponse } from "next/server";

import { subjects } from "@/lib/metadata";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const section = searchParams.get("section");
  const q = searchParams.get("q");

  let result = [...subjects];

  if (
    section === "language" ||
    section === "domain" ||
    section === "general"
  ) {
    result = result.filter((subject) => subject.section === section);
  }

  if (q) {
    const query = q.toLowerCase();

    result = result.filter((subject) =>
      subject.name.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    success: true,
    count: result.length,
    subjects: result,
  });
}
