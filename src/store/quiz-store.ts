import { create } from "zustand";

import type { Question } from "@/types/question";
import type { QuizConfig, QuizResult, QuizSession } from "@/types/quiz";

import { getQuestions } from "@/lib/question-bank";
import { createQuizSession } from "@/lib/quiz";
import { evaluateAttempt } from "@/lib/scoring";

import { useAnalyticsStore } from "./analytics-store";
import { useSettingsStore } from "./settings-store";

interface QuizState {
  session: QuizSession | null;
  questions: Question[];
  result: QuizResult | null;
  timePerQuestion: Record<string, number>;
  isSubmitting: boolean;

  startQuiz: (config: QuizConfig) => void;
  selectAnswer: (questionId: string, optionIndex: number) => void;
  toggleMark: (questionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  tick: () => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  session: null,
  questions: [],
  result: null,
  timePerQuestion: {},
  isSubmitting: false,

  startQuiz: (config) => {
    const questionCount = Math.max(config.questionCount || 10, 1);

    let questions = getQuestions({
      subject: config.subject,
      topic: config.topics?.[0],
      difficulty: config.difficulty,
      year: config.year,
      limit: questionCount,
      shuffle: config.shuffleQuestions,
    });

    if (questions.length === 0) {
      questions = getQuestions({
        limit: questionCount,
        shuffle: config.shuffleQuestions,
      });
    }

    const session = createQuizSession(config, questions);

    const timePerQuestion = Object.fromEntries(
      questions.map((question) => [question.id, 0])
    );

    set({
      session,
      questions,
      result: null,
      timePerQuestion,
      isSubmitting: false,
    });
  },

  selectAnswer: (questionId, optionIndex) => {
    const { session } = get();

    if (!session || session.status !== "active") {
      return;
    }

    set({
      session: {
        ...session,
        answers: {
          ...session.answers,
          [questionId]: optionIndex,
        },
      },
    });
  },

  toggleMark: (questionId) => {
    const { session } = get();

    if (!session || session.status !== "active") {
      return;
    }

    set({
      session: {
        ...session,
        markedForReview: {
          ...session.markedForReview,
          [questionId]: !session.markedForReview[questionId],
        },
      },
    });
  },

  nextQuestion: () => {
    const { session, questions } = get();

    if (!session || session.status !== "active") {
      return;
    }

    if (session.currentIndex >= questions.length - 1) {
      return;
    }

    set({
      session: {
        ...session,
        currentIndex: session.currentIndex + 1,
      },
    });
  },

  previousQuestion: () => {
    const { session } = get();

    if (!session || session.status !== "active") {
      return;
    }

    if (session.currentIndex <= 0) {
      return;
    }

    set({
      session: {
        ...session,
        currentIndex: session.currentIndex - 1,
      },
    });
  },

  goToQuestion: (index) => {
    const { session, questions } = get();

    if (!session || session.status !== "active") {
      return;
    }

    const maxIndex = Math.max(questions.length - 1, 0);
    const safeIndex = Math.min(Math.max(index, 0), maxIndex);

    set({
      session: {
        ...session,
        currentIndex: safeIndex,
      },
    });
  },

  tick: () => {
    const { session, questions } = get();

    if (!session || session.status !== "active") {
      return;
    }

    if (session.config.timeLimitSeconds <= 0) {
      return;
    }

    if (session.remainingSeconds <= 0) {
      return;
    }

    const currentQuestion = questions[session.currentIndex];

    set((state) => {
      const timePerQuestion = { ...state.timePerQuestion };

      if (currentQuestion) {
        timePerQuestion[currentQuestion.id] =
          (timePerQuestion[currentQuestion.id] ?? 0) + 1;
      }

      return {
        timePerQuestion,
        session: {
          ...state.session!,
          remainingSeconds: state.session!.remainingSeconds - 1,
        },
      };
    });

    const updatedSession = get().session;

    if (updatedSession?.remainingSeconds === 0) {
      const { autoSubmit } = useSettingsStore.getState();

      if (autoSubmit) {
        get().submitQuiz();
      }
    }
  },

  submitQuiz: () => {
    const { session, questions, timePerQuestion } = get();

    if (!session || session.status === "submitted") {
      return;
    }

    set({
      isSubmitting: true,
    });

    const result = evaluateAttempt({
      sessionId: session.id,
      title: session.config.title,
      questions,
      answers: session.answers,
      timePerQuestion,
    });

    set({
      result,
      isSubmitting: false,
      session: {
        ...session,
        status: "submitted",
        submittedAt: new Date().toISOString(),
      },
    });

    useAnalyticsStore.getState().addAttempt(result);
  },

  resetQuiz: () => {
    set({
      session: null,
      questions: [],
      result: null,
      timePerQuestion: {},
      isSubmitting: false,
    });
  },
}));
