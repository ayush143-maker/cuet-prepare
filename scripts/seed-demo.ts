import { existsSync } from "node:fs";
import { promises as fs } from "node:fs";
import path from "node:path";

import type { QuestionInput } from "../src/lib/validators";

const demoQuestions: QuestionInput[] = [
  {
    id: "demo_math_algebra_001",
    section: "domain",
    subject: "Mathematics",
    topic: "Algebra",
    subtopic: "Quadratic Equations",
    difficulty: "medium",
    question: "The roots of x² - 5x + 6 = 0 are?",
    options: ["1, 6", "2, 3", "-2, -3", "5, 6"],
    correctIndex: 1,
    explanation: "x² - 5x + 6 factors into (x - 2)(x - 3).",
    source: "sample",
    tags: ["algebra", "quadratic"],
  },
  {
    id: "demo_general_reasoning_001",
    section: "general",
    subject: "General Test",
    topic: "Logical Reasoning",
    subtopic: "Odd One Out",
    difficulty: "easy",
    question: "Choose the odd one out:",
    options: ["Dog", "Cat", "Lion", "Rose"],
    correctIndex: 3,
    explanation: "Dog, Cat and Lion are animals. Rose is a plant.",
    source: "sample",
    tags: ["reasoning", "odd-one-out"],
  },
  {
    id: "demo_english_vocabulary_001",
    section: "language",
    subject: "English",
    topic: "Vocabulary",
    subtopic: "Synonyms",
    difficulty: "easy",
    question: "Choose the synonym of 'Rapid':",
    options: ["Slow", "Fast", "Late", "Weak"],
    correctIndex: 1,
    explanation: "Rapid means fast.",
    source: "sample",
    tags: ["vocabulary", "synonyms"],
  },
];

async function main() {
  const questionsDirectory = path.join(process.cwd(), "data", "questions");

  await fs.mkdir(questionsDirectory, { recursive: true });

  const outputPath = path.join(questionsDirectory, "demo.json");

  if (existsSync(outputPath)) {
    console.log(`Demo file already exists: ${outputPath}`);
    return;
  }

  await fs.writeFile(
    outputPath,
    JSON.stringify(demoQuestions, null, 2),
    "utf-8"
  );

  console.log(`Created demo question bank at ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
