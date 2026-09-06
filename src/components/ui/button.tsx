import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-white hover:opacity-90",
        secondary:
          "border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10",
        ghost: "text-zinc-300 hover:bg-white/5 hover:text-white",
        danger: "bg-rose-500/90 text-white hover:bg-rose-500",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export interface ButtonLinkProps extends VariantProps<typeof buttonVariants> {
  href: string;
  className?: string;
  children: React.ReactNode;
}

function ButtonLink({
  href,
  className,
  variant,
  size,
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size, className }))}
    >
      {children}
    </Link>
  );
}

export { Button, ButtonLink, buttonVariants };
