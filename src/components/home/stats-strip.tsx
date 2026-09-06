import { Card } from "@/components/ui/card";

const stats = [
  {
    label: "Practice Questions",
    value: "500+",
  },
  {
    label: "PYQ Papers",
    value: "5 Years",
  },
  {
    label: "Analytics",
    value: "Topic-wise",
  },
  {
    label: "Exam Mode",
    value: "Timer + Marking",
  },
];

export function StatsStrip() {
  return (
    <section className="mt-20 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6 text-center">
          <p className="text-3xl font-black">{stat.value}</p>
          <p className="mt-2 text-sm text-zinc-400">{stat.label}</p>
        </Card>
      ))}
    </section>
  );
}
