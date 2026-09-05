"use client";

import { useEffect, useRef } from "react";

export type KeyboardShortcutHandlers = Record<
  string,
  (event: KeyboardEvent) => void
>;

export function useKeyboardShortcuts(
  handlers: KeyboardShortcutHandlers,
  enabled = true
) {
  const handlersRef = useRef(handlers);

  handlersRef.current = handlers;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        target &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      const handler = handlersRef.current[key];

      if (handler) {
        event.preventDefault();
        handler(event);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [enabled]);
}
