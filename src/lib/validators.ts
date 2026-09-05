import { z } from "zod";

export const examSectionSchema = z.enum(["language", "domain", "general"]);

export const difficultySchema = z.enum(["easy", "medium", "hard"]);

export const questionSourceSchema = z.enum([
  "sample",
  "pyq",
  "mock",
  "user",
]);

export const questionSchema = z
  .object({
    id: z.string().min(1),
    section: examSectionSchema,
    subject: z.string().min(1),
    topic: z.string().min(1),
    subtopic: z.string().optional(),
    difficulty: difficultySchema,
    question: z.string().min(1),
    options: z.array(z.string()).min(2),
    correctIndex: z.number().int().min(0),
    explanation: z.string().optional(),
    year: z.number().int().optional(),
    paperId: z.string().optional(),
    source: questionSourceSchema,
    tags: z.array(z.string()).optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .refine((data) => data.correctIndex < data.options.length, {
    message: "correctIndex must be within options array",
    path: ["correctIndex"],
  });

export const questionBankSchema = z.array(questionSchema);

export const quizConfigSchema = z.object({
  mode: z.enum(["practice", "pyq", "mock"]),
  title: z.string().min(1),
  section: examSectionSchema.optional(),
  subject: z.string().optional(),
  topics: z.array(z.string()).optional(),
  difficulty: z.enum(["easy", "medium", "hard", "mixed"]).optional(),
  year: z.number().int().optional(),
  questionCount: z.number().int().positive(),
  timeLimitSeconds: z.number().int().min(0),
  shuffleQuestions: z.boolean(),
  shuffleOptions: z.boolean(),
  showExplanationAfterSubmit: z.boolean(),
  showExplanationInstantly: z.boolean(),
});

export const attemptPayloadSchema = z.object({
  sessionId: z.string().min(1),
  config: quizConfigSchema.partial().optional(),
  answers: z.record(
    z.string(),
    z.union([z.number().int().min(0), z.null()])
  ),
  submittedAt: z.string().optional(),
});

export type QuestionInput = z.infer<typeof questionSchema>;
export type QuestionBankInput = z.infer<typeof questionBankSchema>;
export type QuizConfigInput = z.infer<typeof quizConfigSchema>;
export type AttemptPayloadInput = z.infer<typeof attemptPayloadSchema>;
