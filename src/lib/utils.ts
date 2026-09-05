import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function calculateAccuracy(correct: number, total: number) {
  if (total === 0) return 0;

  return Math.round((correct / total) * 100);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function decodeSlug(slug: string) {
  return decodeURIComponent(slug)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function generateId(prefix = "id") {
  const random = Math.random().toString(36).slice(2, 10);
  const time = Date.now().toString(36);

  return `${prefix}_${time}_${random}`;
}

export function shuffleArray<T>(input: T[]): T[] {
  const array = [...input];

  for (let index = array.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));

    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }

  return array;
}
