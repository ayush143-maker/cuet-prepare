import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 py-16", className)}>
      {children}
    </div>
  );
}
