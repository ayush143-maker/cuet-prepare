import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    number: "01",
    title: "Pick your arena",
    description:
      "Subject, PYQ year aur timer choose karo. Engine session ready kar deta hai.",
  },
  {
    number: "02",
    title: "Fight the clock",
    description:
      "Negative marking, question palette aur mark-for-review ke saath real exam feel.",
  },
  {
    number: "03",
    title: "Level up",
    description:
      "Analytics weak topics nikalta hai. Unhe target karo aur dobara attempt karo.",
  },
];

export function HowItWorks() {
  return (
    <section className="mt-28">
      <SectionHeading
        align="center"
        eyebrow="How it works"
        title={
          <>
            Three steps to{" "}
            <span className="gradient-text">exam readiness</span>
          </>
        }
        subtitle="Loop simple hai — attempt, analyze, improve."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="glass-card relative p-8 transition hover:border-white/20"
          >
            <span className="bg-gradient-to-b from-white/25 to-transparent bg-clip-text font-display text-5xl font-bold text-transparent">
              {step.number}
            </span>

            <h3 className="mt-4 font-display text-xl font-semibold">
              {step.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {step.description}
            </p>

            {index < steps.length - 1 ? (
              <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-white/20 to-transparent md:block" />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
