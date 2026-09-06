import { existsSync } from "node:fs";
import { promises as fs } from "node:fs";
import path from "node:path";

import { questionBankSchema } from "../src/lib/validators";

const questionDirectories = [
  path.join(process.cwd(), "data", "questions"),
  path.join(process.cwd(), "data", "pyq"),
];

async function validateDirectory(directory: string) {
  if (!existsSync(directory)) {
    console.warn(`Directory not found: ${directory}`);
    return {
      totalQuestions: 0,
      invalidFiles: 0,
    };
  }

  const files = await fs.readdir(directory);

  const jsonFiles = files.filter((file) => file.endsWith(".json"));

  let totalQuestions = 0;
  let invalidFiles = 0;

  for (const file of jsonFiles) {
    const filePath = path.join(directory, file);

    const rawContent = await fs.readFile(filePath, "utf-8");

    let jsonContent: unknown;

    try {
      jsonContent = JSON.parse(rawContent);
    } catch (error) {
      invalidFiles += 1;
      console.error(`Invalid JSON in ${filePath}`);
      console.error(error);
      continue;
    }

    const result = questionBankSchema.safeParse(jsonContent);

    if (!result.success) {
      invalidFiles += 1;
      console.error(`Validation failed in ${filePath}`);

      for (const issue of result.error.issues.slice(0, 5)) {
        console.error(`- ${issue.path.join(".")}: ${issue.message}`);
      }

      continue;
    }

    totalQuestions += result.data.length;

    console.log(`Validated ${result.data.length} questions in ${filePath}`);
  }

  return {
    totalQuestions,
    invalidFiles,
  };
}

async function main() {
  let totalQuestions = 0;
  let totalInvalidFiles = 0;

  for (const directory of questionDirectories) {
    const result = await validateDirectory(directory);

    totalQuestions += result.totalQuestions;
    totalInvalidFiles += result.invalidFiles;
  }

  if (totalInvalidFiles > 0) {
    console.error(
      `Validation completed with ${totalInvalidFiles} invalid file(s).`
    );
    process.exit(1);
  }

  console.log(`All question files valid. Total questions: ${totalQuestions}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
