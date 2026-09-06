import { NextResponse } from "next/server";

import { getSubjectByIdOrName, topics } from "@/lib/metadata";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const subjectId = searchParams.get("subjectId");
  const subject = searchParams.get("subject");
  const q = searchParams.get("q");
  const pyq = searchParams.get("pyq");

  let result = [...topics];

  if (subjectId) {
    result = result.filter((topic) => topic.subjectId === subjectId);
  } else if (subject) {
    const foundSubject = getSubjectByIdOrName(subject);

    if (!foundSubject) {
      result = [];
    } else {
      result = result.filter(
        (topic) => topic.subjectId === foundSubject.id
      );
    }
  }

  if (pyq === "true") {
    result = result.filter((topic) => topic.pyqAvailable === true);
  }

  if (q) {
    const query = q.toLowerCase();

    result = result.filter((topic) =>
      topic.name.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    success: true,
    count: result.length,
    topics: result,
  });
}
