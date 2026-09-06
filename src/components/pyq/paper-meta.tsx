import type { LucideIcon } from "lucide-react";

interface PaperMetaProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function PaperMeta({ icon: Icon, label, value }: PaperMetaProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-zinc-300">
      <Icon className="h-4 w-4 text-emerald-300" />
      <span className="text-zinc-400">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
