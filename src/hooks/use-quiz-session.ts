"use client";

import { useEffect } from "react";

import { useQuizStore } from "@/store/quiz-store";
import { useKeyboardShortcuts } from "./use-keyboard-shortcuts";

export function useQuizSession() {
  const session = useQuizStore((state) => state.session);
  const questions = useQuizStore((state) => state.questions);
  const result = useQuizStore((state) => state.result);
  const timePerQuestion = useQuizStore((state) => state.timePerQuestion);
  const isSubmitting = useQuizStore((state) => state.isSubmitting);

  const selectAnswer = useQuizStore((state) => state.selectAnswer);
  const toggleMark = useQuizStore((state) => state.toggleMark);
  const nextQuestion = useQuizStore((state) => state.nextQuestion);
  const previousQuestion = useQuizStore((state) => state.previousQuestion);
  const goToQuestion = useQuizStore((state) => state.goToQuestion);
  const tick = useQuizStore((state) => state.tick);
  const submitQuiz = useQuizStore((state) => state.submitQuiz);

  const currentQuestion =
    session && questions.length > 0
      ? questions[session.currentIndex]
      : null;

  const isActive = Boolean(session && session.status === "active");

  useEffect(() => {
    if (!session || session.status !== "active") {
      return;
    }

    if (session.config.timeLimitSeconds <= 0) {
      return;
    }

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [
    session?.id,
    session?.status,
    session?.config.timeLimitSeconds,
    tick,
  ]);

  const chooseOption = (optionIndex: number) => {
    if (!currentQuestion) {
      return;
    }

    if (optionIndex >= currentQuestion.options.length) {
      return;
    }

    selectAnswer(currentQuestion.id, optionIndex);
  };

  useKeyboardShortcuts(
    {
      "1": () => chooseOption(0),
      "2": () => chooseOption(1),
      "3": () => chooseOption(2),
      "4": () => chooseOption(3),
      arrowright: nextQuestion,
      arrowleft: previousQuestion,
      m: () => {
        if (currentQuestion) {
          toggleMark(currentQuestion.id);
        }
      },
      s: () => {
        submitQuiz();
      },
    },
    isActive
  );

  return {
    session,
    questions,
    result,
    currentQuestion,
    timePerQuestion,
    isSubmitting,
    isActive,
    selectAnswer,
    toggleMark,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitQuiz,
  };
}
