import { AnimatedCounter } from "@/components/ui/animated-counter";

const stats = [
  {
    label: "Practice Questions",
    value: 500,
    suffix: "+",
  },
  {
    label: "PYQ Years",
    value: 5,
    suffix: "",
  },
  {
    label: "Topics Covered",
    value: 30,
    suffix: "+",
  },
  {
    label: "Avg Accuracy Target",
    value: 80,
    suffix: "%",
  },
];

export function StatsStrip() {
  return (
    <section className="mt-24">
      <div className="glass-card grid gap-8 p-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-1 ${
              index > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""
            }`}
          >
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              className="font-display text-4xl font-bold text-white"
            />

            <span className="text-sm text-zinc-400">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
