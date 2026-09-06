import { existsSync } from "node:fs";
import { promises as fs } from "node:fs";
import path from "node:path";

import type { QuestionInput } from "../src/lib/validators";
import { questionBankSchema } from "../src/lib/validators";

async function main() {
  const pyqDirectory = path.join(process.cwd(), "data", "pyq");

  if (!existsSync(pyqDirectory)) {
    console.error(`PYQ directory not found: ${pyqDirectory}`);
    process.exit(1);
  }

  const files = await fs.readdir(pyqDirectory);

  const jsonFiles = files
    .filter((file) => file.endsWith(".json"))
    .sort();

  const questionMap = new Map<string, QuestionInput>();

  for (const file of jsonFiles) {
    const filePath = path.join(pyqDirectory, file);

    const rawContent = await fs.readFile(filePath, "utf-8");

    const jsonContent = JSON.parse(rawContent);

    const parsed = questionBankSchema.parse(jsonContent);

    for (const question of parsed) {
      questionMap.set(question.id, {
        ...question,
        source: "pyq",
      });
    }

    console.log(`Loaded ${parsed.length} questions from ${filePath}`);
  }

  const allQuestions = Array.from(questionMap.values());

  const outputDirectory = path.join(process.cwd(), "data", "generated");

  await fs.mkdir(outputDirectory, { recursive: true });

  const outputPath = path.join(
    outputDirectory,
    "pyq-question-bank.json"
  );

  await fs.writeFile(
    outputPath,
    JSON.stringify(allQuestions, null, 2),
    "utf-8"
  );

  console.log(
    `Imported ${allQuestions.length} PYQ questions to ${outputPath}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
