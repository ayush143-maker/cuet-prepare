import {
  BookOpen,
  GraduationCap,
  LineChart,
  Timer,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

const features = [
  {
    icon: BookOpen,
    title: "Practice Mode",
    description:
      "Subject, topic, difficulty aur timer choose karke custom quiz banao.",
  },
  {
    icon: GraduationCap,
    title: "PYQ Mode",
    description:
      "Previous year papers ko exam-like environment me solve karo.",
  },
  {
    icon: Timer,
    title: "Time Control",
    description:
      "Timer ring, auto submit aur time tracking ke saath real exam feel.",
  },
  {
    icon: LineChart,
    title: "Smart Analytics",
    description:
      "Accuracy, weak topics aur time management ko visually track karo.",
  },
];

export function FeatureGrid() {
  return (
    <section className="mt-24">
      <SectionHeading
        eyebrow="Features"
        title="Everything you need to crack CUET"
        subtitle="Sirf questions solve karna kaafi nahi hai. Tumhe pata hona chahiye ki kahan improvement karni hai."
        align="center"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="p-6 transition hover:scale-[1.02] hover:border-white/20"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
              <feature.icon className="h-6 w-6 text-cyan-300" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
