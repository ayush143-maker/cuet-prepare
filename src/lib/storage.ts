import type { AppSettings } from "@/types/settings";
import type { QuizResult } from "@/types/quiz";

export const STORAGE_KEYS = {
  attempts: "cuet-prep-attempts",
  settings: "cuet-prep-settings",
} as const;

export const DEFAULT_SETTINGS: AppSettings = {
  theme: "dark",
  soundEnabled: true,
  autoSubmit: true,
  showExplanationInstantly: false,
  defaultTimeLimitSeconds: 900,
};

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function getStoredAttempts(): QuizResult[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(STORAGE_KEYS.attempts);

  return safeParse<QuizResult[]>(raw, []);
}

export function saveAttempt(attempt: QuizResult): QuizResult[] {
  if (typeof window === "undefined") return [];

  const attempts = getStoredAttempts();
  const nextAttempts = [attempt, ...attempts];

  window.localStorage.setItem(
    STORAGE_KEYS.attempts,
    JSON.stringify(nextAttempts)
  );

  return nextAttempts;
}

export function clearAttempts(): void {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(STORAGE_KEYS.attempts);
}

export function getStoredSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;

  const raw = window.localStorage.getItem(STORAGE_KEYS.settings);

  return safeParse<AppSettings>(raw, DEFAULT_SETTINGS);
}

export function saveSettings(settings: AppSettings): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;

  window.localStorage.setItem(
    STORAGE_KEYS.settings,
    JSON.stringify(settings)
  );

  return settings;
}
