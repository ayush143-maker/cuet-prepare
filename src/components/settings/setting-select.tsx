"use client";

interface SettingSelectOption {
  label: string;
  value: string;
}

interface SettingSelectProps {
  label: string;
  description?: string;
  value: string;
  options: SettingSelectOption[];
  onChange: (value: string) => void;
}

export function SettingSelect({
  label,
  description,
  value,
  options,
  onChange,
}: SettingSelectProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold">{label}</p>

          {description ? (
            <p className="mt-1 text-sm leading-6 text-zinc-400">
              {description}
            </p>
          ) : null}
        </div>

        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="rounded-2xl border border-white/10 bg-[#0b0d1a] px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-cyan-300/40"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
