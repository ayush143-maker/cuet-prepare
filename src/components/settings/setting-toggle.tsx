"use client";

import { cn } from "@/lib/utils";

interface SettingToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}

export function SettingToggle({
  label,
  description,
  checked,
  onChange,
}: SettingToggleProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="font-semibold">{label}</p>

          {description ? (
            <p className="mt-1 text-sm leading-6 text-zinc-400">
              {description}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={onChange}
          className={cn(
            "relative h-6 w-11 shrink-0 rounded-full transition",
            checked ? "bg-cyan-400/80" : "bg-white/10"
          )}
        >
          <span
            className={cn(
              "absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white transition",
              checked ? "translate-x-5" : "translate-x-0.5"
            )}
          />
        </button>
      </div>
    </div>
  );
}
