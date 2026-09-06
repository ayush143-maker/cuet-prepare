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

  return raw
    .map((item) => {
      const subject = {
        ...(item as Record<string, unknown>),
      } as SubjectMeta;

      return subject;
    })
    .filter((subject) => {
      return (
        typeof subject.id === "string" &&
        subject.id.length > 0 &&
        typeof subject.name === "string" &&
        subject.name.length > 0 &&
        isValidSection(subject.section)
      );
    });
}

function normalizeTopics(raw: unknown): TopicMeta[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .map((item) => {
      const topic = {
        ...(item as Record<string, unknown>),
      } as TopicMeta;

      return topic;
    })
    .filter((topic) => {
      return (
        typeof topic.id === "string" &&
        topic.id.length > 0 &&
        typeof topic.subjectId === "string" &&
        topic.subjectId.length > 0 &&
        typeof topic.name === "string" &&
        topic.name.length > 0
      );
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
