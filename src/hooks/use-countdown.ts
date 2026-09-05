"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseCountdownOptions {
  autoStart?: boolean;
  onComplete?: () => void;
}

export function useCountdown(
  initialSeconds: number,
  options?: UseCountdownOptions
) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(options?.autoStart ?? true);

  const onCompleteRef = useRef(options?.onComplete);
  const completedRef = useRef(false);

  onCompleteRef.current = options?.onComplete;

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    if (secondsLeft <= 0) {
      setIsRunning(false);

      if (!completedRef.current) {
        completedRef.current = true;
        onCompleteRef.current?.();
      }

      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const start = useCallback(() => {
    completedRef.current = false;
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(
    (nextSeconds = initialSeconds) => {
      completedRef.current = false;
      setSecondsLeft(nextSeconds);
      setIsRunning(false);
    },
    [initialSeconds]
  );

  return {
    secondsLeft,
    isRunning,
    start,
    pause,
    reset,
  };
}
