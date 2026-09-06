import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/5 text-zinc-300",
        info: "border-cyan-300/30 bg-cyan-400/10 text-cyan-200",
        success: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
        warning: "border-amber-300/30 bg-amber-400/10 text-amber-200",
        danger: "border-rose-300/30 bg-rose-400/10 text-rose-200",
        gradient:
          "border-transparent bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-cyan-400/20 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
