import { Home, RefreshCcw, Target } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";

interface ResultActionsProps {
  retryHref?: string;
}

export function ResultActions({
  retryHref = "/practice",
}: ResultActionsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <ButtonLink href="/practice" variant="primary">
        <Target className="h-5 w-5" />
        Practice Weak Topics
      </ButtonLink>

      <ButtonLink href={retryHref} variant="secondary">
        <RefreshCcw className="h-5 w-5" />
        Retry Quiz
      </ButtonLink>

      <ButtonLink href="/dashboard" variant="ghost">
        <Home className="h-5 w-5" />
        Dashboard
      </ButtonLink>
    </div>
  );
}
