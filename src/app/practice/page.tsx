import { Sparkles, Target, Timer } from "lucide-react";

import { AppShell, PageShell } from "@/components/layout";
import { QuizBuilder } from "@/components/quiz";
import { SectionHeading } from "@/components/ui";

export default function PracticePage() {
  return (
    <AppShell>
      <PageShell>
        <SectionHeading
          eyebrow="Practice Mode"
          title={
            <>
              Custom <span className="gradient-text">Quiz Arena</span>
            </>
          }
          subtitle="Subject, difficulty, timer aur question count choose karo. Quiz engine tumhare liye session bana dega."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <QuizBuilder />

          <aside className="space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-cyan-300" />
                <h2 className="text-lg font-semibold">Smart Practice Tip</h2>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Har session ke baad result page check karo. Weak topics ko
                agle din target karo. Accuracy + speed dono track karna zaroori
                hai.
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-fuchsia-300" />
                <h2 className="text-lg font-semibold">Daily Target</h2>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                15 questions ka timed quiz lo. Minimum 80% accuracy aim karo.
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3">
                <Timer className="h-5 w-5 text-emerald-300" />
                <h2 className="text-lg font-semibold">Timer Strategy</h2>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Agar timer ke saath accuracy gir rahi hai, to pehle 10
                questions bina timer solve karo. Phir timer on karo.
              </p>
            </div>
          </aside>
        </div>
      </PageShell>
    </AppShell>
  );
}
