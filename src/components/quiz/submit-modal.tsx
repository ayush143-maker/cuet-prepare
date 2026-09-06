"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SubmitModalProps {
  open: boolean;
  attempted: number;
  total: number;
  onCancel: () => void;
  onSubmit: () => void;
}

export function SubmitModal({
  open,
  attempted,
  total,
  onCancel,
  onSubmit,
}: SubmitModalProps) {
  if (!open) return null;

  const unanswered = total - attempted;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
      onClick={onCancel}
    >
      <Card
        className="w-full max-w-md"
        onClick={(event) => event.stopPropagation()}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10">
              <AlertTriangle className="h-6 w-6 text-amber-300" />
            </span>

            <div>
              <h3 className="text-lg font-semibold">Submit quiz?</h3>
              <p className="text-sm text-zinc-400">
                Ek baar submit karne ke baad answers lock ho jayenge.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              <span>Attempted</span>
              <span className="font-semibold">{attempted}</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              <span>Unanswered</span>
              <span className="font-semibold">{unanswered}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="secondary"
              className="w-full"
              onClick={onCancel}
            >
              Keep Reviewing
            </Button>

            <Button className="w-full" onClick={onSubmit}>
              Submit Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
