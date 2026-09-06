"use client";

import { useRouter } from "next/navigation";
import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quiz-store";
import type { PyqPaper } from "@/types/cuet";
import type { QuizConfig } from "@/types/quiz";

interface StartPaperButtonProps {
  paper: PyqPaper;
  className?: string;
}

export function StartPaperButton({
  paper,
  className,
}: StartPaperButtonProps) {
  const router = useRouter();

  const startQuiz = useQuizStore((state) => state.startQuiz);

  const handleStartPaper = () => {
    const config: QuizConfig = {
      mode: "pyq",
      title: paper.title,
      section: paper.section,
      subject: paper.subject,
      topics: [],
      difficulty: "mixed",
      year: paper.year,
      questionCount: paper.totalQuestions,
      timeLimitSeconds: paper.durationMinutes * 60,
      shuffleQuestions: true,
      shuffleOptions: false,
      showExplanationAfterSubmit: true,
      showExplanationInstantly: false,
    };

    startQuiz(config);

    const sessionId = useQuizStore.getState().session?.id;

    if (sessionId) {
      router.push(`/quiz/${sessionId}`);
    }
  };

  return (
    <Button onClick={handleStartPaper} className={className} size="lg">
      <Play className="h-5 w-5" />
      Start Paper
    </Button>
  );
}
