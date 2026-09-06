"use client";

import { useEffect } from "react";

interface ConfettiTriggerProps {
  fire: boolean;
}

export function ConfettiTrigger({ fire }: ConfettiTriggerProps) {
  useEffect(() => {
    if (!fire) return;

    let active = true;

    import("canvas-confetti").then(({ default: confetti }) => {
      if (!active) return;

      confetti({
        particleCount: 120,
        spread: 75,
        origin: {
          y: 0.6,
        },
      });

      setTimeout(() => {
        if (!active) return;

        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: {
            x: 0,
          },
        });

        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: {
            x: 1,
          },
        });
      }, 250);
    });

    return () => {
      active = false;
    };
  }, [fire]);

  return null;
}
