import { Keyboard } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const shortcuts = [
  {
    keys: "1 - 4",
    action: "Select option",
  },
  {
    keys: "← / →",
    action: "Previous / Next question",
  },
  {
    keys: "M",
    action: "Mark for review",
  },
  {
    keys: "S",
    action: "Submit quiz",
  },
];

export function KeyboardShortcutsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Keyboard className="h-5 w-5 text-cyan-300" />
          Keyboard Shortcuts
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.keys}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
          >
            <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs">
              {shortcut.keys}
            </span>

            <span className="text-zinc-300">{shortcut.action}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
