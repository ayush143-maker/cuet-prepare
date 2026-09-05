import { NextResponse } from "next/server";

const questions = [
  {
    id: "math_matrices_001",
    section: "domain",
    subject: "Mathematics",
    topic: "Matrices",
    difficulty: "medium",
    question:
      "If A is a 2x3 matrix and B is a 3x2 matrix, what is the order of AB?",
    options: ["2x2", "3x3", "2x3", "3x2"],
    correctIndex: 0,
    explanation:
      "Matrix multiplication me A(m x n) * B(n x p) ka result m x p hota hai.",
    source: "sample",
    year: 2023,
  },
  {
    id: "math_probability_001",
    section: "domain",
    subject: "Mathematics",
    topic: "Probability",
    difficulty: "easy",
    question: "Probability of getting a head in a single coin toss is?",
    options: ["0", "1/2", "1", "2"],
    correctIndex: 1,
    explanation: "Coin toss me head aur tail equally likely hote hain.",
    source: "sample",
    year: 2022,
  },
  {
    id: "general_reasoning_001",
    section: "general",
    subject: "General Test",
    topic: "Logical Reasoning",
    difficulty: "medium",
    question:
      "If all roses are flowers and some flowers fade quickly, can we conclude that some roses fade quickly?",
    options: ["Yes", "No", "Cannot be determined", "Only in summer"],
    correctIndex: 2,
    explanation:
      "Some flowers fade quickly, par ye necessary nahi ki wo flowers roses hi hon.",
    source: "sample",
    year: 2024,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const subject = searchParams.get("subject");
  const topic = searchParams.get("topic");

  let filtered = questions;

  if (subject) {
    filtered = filtered.filter((question) =>
      question.subject.toLowerCase().includes(subject.toLowerCase())
    );
  }

  if (topic) {
    filtered = filtered.filter((question) =>
      question.topic.toLowerCase().includes(topic.toLowerCase())
    );
  }

  return NextResponse.json({
    count: filtered.length,
    questions: filtered,
  });
}
