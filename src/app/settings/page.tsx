"use client";

import { useEffect, useState } from "react";
import { RotateCcw, Settings as SettingsIcon } from "lucide-react";

import { AppShell, PageShell } from "@/components/layout";
import { SettingSelect, SettingToggle } from "@/components/settings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/ui";
import { TIMER_OPTIONS } from "@/lib/constants";
import { useSettingsStore } from "@/store/settings-store";

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);

  const settings = useSettingsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <AppShell>
        <PageShell>
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-cyan-300" />
          </div>
        </PageShell>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageShell>
        <SectionHeading
          eyebrow="Settings"
          title={
            <>
              App <span className="gradient-text">Preferences</span>
            </>
          }
          subtitle="Quiz experience ko apne hisaab se control karo."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-cyan-300" />
                General Settings
              </CardTitle>

              <CardDescription>
                Theme, default timer aur quiz behaviour yahan manage hota hai.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <SettingSelect
                label="Theme"
                description="Abhi dark theme primary hai. Light theme future me fully polish hoga."
                value={settings.theme}
                options={[
                  {
                    label: "Dark",
                    value: "dark",
                  },
                  {
                    label: "Light",
                    value: "light",
                  },
                ]}
                onChange={(value) => {
                  settings.setTheme(value === "light" ? "light" : "dark");
                }}
              />

              <SettingSelect
                label="Default Timer"
                description="Practice quiz start karte waqt default timer."
                value={String(settings.defaultTimeLimitSeconds)}
                options={TIMER_OPTIONS.map((option) => ({
                  label: option.label,
                  value: String(option.value),
                }))}
                onChange={(value) => {
                  settings.setDefaultTimeLimitSeconds(Number(value));
                }}
              />

              <Button
                variant="secondary"
                onClick={settings.resetSettings}
              >
                <RotateCcw className="h-5 w-5" />
                Reset to Defaults
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <SettingToggle
              label="Auto Submit"
              description="Timer khatam hone par quiz automatically submit ho jayegi."
              checked={settings.autoSubmit}
              onChange={settings.toggleAutoSubmit}
            />

            <SettingToggle
              label="Instant Explanation"
              description="Option select karte hi explanation dikh jayegi. Practice mode ke liye useful hai."
              checked={settings.showExplanationInstantly}
              onChange={settings.toggleShowExplanationInstantly}
            />

            <SettingToggle
              label="Sound Effects"
              description="UI interactions ke liye sound effects enable karo."
              checked={settings.soundEnabled}
              onChange={settings.toggleSound}
            />

            <Card>
              <CardHeader>
                <CardTitle>Pro Tip</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-6 text-zinc-400">
                  Exam se 2 hafta pehle instant explanation band kar do aur
                  auto submit on rakho. Isse real exam pressure simulate hota
                  hai.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageShell>
    </AppShell>
  );
}
