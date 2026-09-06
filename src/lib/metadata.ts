import type { SubjectMeta, TopicMeta } from "@/types/cuet";

import subjectsRaw from "../../data/subjects/subjects.json";
import topicsRaw from "../../data/topics/topics.json";

const validSections = ["language", "domain", "general"] as const;

type ExamSectionValue = (typeof validSections)[number];

function isValidSection(value: unknown): value is ExamSectionValue {
  return (
    typeof value === "string" &&
    validSections.includes(value as ExamSectionValue)
  );
}

function normalizeSubjects(raw: unknown): SubjectMeta[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((item): SubjectMeta[] => {
    const record = item as Record<string, unknown>;

    const id = record.id;
    const name = record.name;
    const section = record.section;

    if (
      typeof id !== "string" ||
      id.length === 0 ||
      typeof name !== "string" ||
      name.length === 0 ||
      !isValidSection(section)
    ) {
      return [];
    }

    const subject: SubjectMeta = {
      id,
      name,
      section,
      icon: typeof record.icon === "string" ? record.icon : undefined,
      color: typeof record.color === "string" ? record.color : undefined,
      description:
        typeof record.description === "string"
          ? record.description
          : undefined,
    };

    return [subject];
  });
}

function normalizeTopics(raw: unknown): TopicMeta[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((item): TopicMeta[] => {
    const record = item as Record<string, unknown>;

    const id = record.id;
    const subjectId = record.subjectId;
    const name = record.name;

    if (
      typeof id !== "string" ||
      id.length === 0 ||
      typeof subjectId !== "string" ||
      subjectId.length === 0 ||
      typeof name !== "string" ||
      name.length === 0
    ) {
      return [];
    }

    const topic: TopicMeta = {
      id,
      subjectId,
      name,
      weightage:
        typeof record.weightage === "number"
          ? record.weightage
          : undefined,
      pyqAvailable:
        typeof record.pyqAvailable === "boolean"
          ? record.pyqAvailable
          : undefined,
    };

    return [topic];
  });
}

export const subjects: SubjectMeta[] = normalizeSubjects(subjectsRaw);

export const topics: TopicMeta[] = normalizeTopics(topicsRaw);

export function getSubjectByIdOrName(
  value: string
): SubjectMeta | undefined {
  const normalized = value.toLowerCase().trim();

  return subjects.find((subject) => {
    const subjectId = subject.id.toLowerCase();
    const subjectName = subject.name.toLowerCase();

    const normalizedWithDash = normalized.replace(/\s+/g, "-");
    const normalizedWithoutSpace = normalized.replace(/\s+/g, "");

    return (
      subjectId === normalized ||
      subjectName === normalized ||
      subjectId === normalizedWithDash ||
      subjectName.replace(/\s+/g, "") === normalizedWithoutSpace
    );
  });
}

export function getTopicsBySubjectId(subjectId: string): TopicMeta[] {
  return topics.filter((topic) => topic.subjectId === subjectId);
}
